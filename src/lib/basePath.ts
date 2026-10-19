/**
 * The site lives under the same sub-path as the old WordPress sub-site
 * (muangsamui.com/royalmuangsamuivillas/…). Used by next.config `basePath`
 * and by `asset()`. Set to "" to serve from the domain root.
 */
export const BASE_PATH = "/royalmuangsamuivillas";

/**
 * next/link adds basePath automatically, but plain asset URLs (img src,
 * video src, CSS background-image) do not — run public-folder paths through this.
 */
export const asset = (path: string) => `${BASE_PATH}${path}`;
