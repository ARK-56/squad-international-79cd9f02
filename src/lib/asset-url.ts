/**
 * Resolves Lovable asset descriptors (src/assets/*.asset.json) to absolute CDN URLs.
 *
 * The descriptors carry a host-relative path (`/__l5e/assets-v1/<id>/<file>`) that only
 * resolves on Lovable's own hosting — the Vite plugin that proxies it is dev-server only.
 * Left relative, those assets 404 on localhost and on any non-Lovable deploy (Vercel,
 * Cloudflare, etc.). Making them absolute points them at the CDN that already serves them,
 * which sends `access-control-allow-origin: *`, immutable caching and range requests.
 *
 * To move to a different CDN, either:
 *   - set VITE_ASSET_CDN_BASE, if the new host mirrors the same `/__l5e/...` path layout, or
 *   - replace the descriptor's `url` with a full absolute URL — those pass through untouched.
 */
const DEFAULT_CDN_BASE = "https://squad-international.lovable.app";

const CDN_BASE = (import.meta.env["VITE_ASSET_CDN_BASE"] || DEFAULT_CDN_BASE).replace(/\/+$/, "");

export function assetUrl(asset: { url: string }): string {
  const url = asset.url;
  if (/^(https?:)?\/\//i.test(url)) return url;
  return `${CDN_BASE}${url.startsWith("/") ? url : `/${url}`}`;
}
