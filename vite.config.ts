// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  /**
   * Passed through the wrapper's own `plugins` array, which it appends after its
   * internals, rather than through `vite.plugins` where it would collide with
   * them.
   *
   * Build-only by design: the plugin does not touch the dev server, so `npm run
   * dev` still serves the originals and only the built output is compressed.
   * Nothing in src/ is rewritten either, so the source files stay as uploaded.
   *
   * The generated section photos arrived at 1010KB and 720KB while never
   * rendering wider than about 650px, which is what prompted this. 80 is the
   * usual sweet spot for photographs of this kind; the two already in the repo
   * were closer to 140KB, so that is the target.
   */
  plugins: [
    ViteImageOptimizer({
      jpg: { quality: 80 },
      jpeg: { quality: 80 },
      png: { quality: 80 },
      webp: { quality: 80 },
    }),
  ],
});
