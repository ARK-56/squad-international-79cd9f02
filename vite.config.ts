import { defineConfig, loadEnv, type UserConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";

/**
 * Assembled directly rather than through a wrapper.
 *
 * This replaces @lovable.dev/vite-tanstack-config, which composed the same five
 * plugins and settings below and added a set of behaviours that only did anything
 * inside a Lovable sandbox: an HMR gate, a dev-server bridge, an assets proxy that
 * no-ops without LOVABLE_PREVIEW_HOST, build-error diagnostics, a Cloudflare
 * nodejs_compat flag fixup, and pinning the dev server to port 8080 with
 * strictPort. None of that applies here, so none of it is reproduced.
 *
 * Two things it contributed are deliberately dropped rather than replaced:
 * @tanstack/devtools-vite, which it configured for source injection only, adding
 * data-tsd-source attributes for editor click-to-source; and its own dev loggers
 * for SSR and server-function errors, which prettified messages that still reach
 * the console without them.
 *
 * Plugin order is kept exactly as the wrapper had it: Tailwind, the path
 * resolver, TanStack Start, nitro, React. Whether every one of those positions is
 * load-bearing was not tested, only that this order reproduces the wrapper's
 * output byte for byte, so treat reordering as a change that needs verifying.
 */
export default defineConfig(async ({ command, mode }) => {
  const isDevBuild = command === "build" && mode === "development";

  /**
   * VITE_* values are defined explicitly, as the wrapper did. Vite substitutes
   * them into client code on its own, but not into every server environment, and
   * asset-url.ts reads import.meta.env on both sides of the render.
   */
  const clientEnv = loadEnv(mode, process.cwd(), "VITE_");
  const define: Record<string, string> = {};
  for (const [key, value] of Object.entries(clientEnv)) {
    define[`import.meta.env.${key}`] = JSON.stringify(value);
  }

  const config: UserConfig = {
    define,
    css: { transformer: "lightningcss" },
    resolve: {
      alias: { "@": `${process.cwd()}/src` },
      // One copy of each, or hooks break across duplicated instances.
      dedupe: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "react/jsx-dev-runtime",
        "@tanstack/react-query",
        "@tanstack/query-core",
      ],
    },
    optimizeDeps: {
      include: [
        "react",
        "react-dom",
        "react-dom/client",
        "react/jsx-runtime",
        "react/jsx-dev-runtime",
      ],
    },
    server: {
      host: "::",
      port: 8080,
      // Debounces the watcher so a half-written file does not trigger a reload.
      watch: { awaitWriteFinish: { stabilityThreshold: 1000, pollInterval: 100 } },
    },
    plugins: [
      tailwindcss(),
      tsConfigPaths({ projects: ["./tsconfig.json"] }),
      tanstackStart({
        // Keeps server-only modules out of the client bundle, failing the build
        // rather than shipping them.
        importProtection: {
          behavior: "error",
          client: { files: ["**/server/**"], specifiers: ["server-only"] },
        },
        // Points Start's server entry at src/server.ts, our SSR error wrapper.
        server: { entry: "server" },
      }),
      // Build only, as the wrapper had it: nitro has nothing to do while serving.
      // cloudflare-module is the fallback; NITRO_PRESET and platform detection
      // still win, so a Vercel or Netlify build selects its own.
      ...(command === "build" ? [nitro({ defaultPreset: "cloudflare-module" })] : []),
      viteReact(),
      /**
       * Build-only image compression. Quality 80 for photographs: the generated
       * section images arrived between 720KB and 1.6MB while never rendering wider
       * than about 650px. The plugin keeps the original whenever re-encoding would
       * be larger, so it cannot make a file worse.
       */
      ViteImageOptimizer({
        jpg: { quality: 80 },
        jpeg: { quality: 80 },
        png: { quality: 80 },
        webp: { quality: 80 },
      }),
    ],
  };

  /**
   * `build:dev` builds with mode=development, where the client still needs
   * NODE_ENV set or React ships its production branch into a development bundle.
   *
   * The wrapper also set esbuild.keepNames here. That is not an option Vite 8
   * accepts, ESBuildOptions has no such property, so from an untyped config it
   * was being passed and ignored. Not carried over.
   */
  if (isDevBuild) {
    config.environments = {
      client: { define: { "process.env.NODE_ENV": JSON.stringify("development") } },
    };
  }

  return config;
});
