import type { NextConfig } from "next";
import { BASE_PATH } from "./src/lib/basePath";

const nextConfig: NextConfig = {
  // URLs mirror the current REVA site: /royalmuangsamuivillas/… with a trailing slash.
  basePath: BASE_PATH,
  trailingSlash: true,
  async redirects() {
    return [
      // The old "News & Events" page was empty; its content lives on Press.
      { source: "/news-events", destination: "/press/", permanent: true },
      // Visiting the bare domain root (e.g. localhost:3000/) lands on the site.
      ...(BASE_PATH ? [{ source: "/", destination: `${BASE_PATH}/`, basePath: false as const, permanent: false }] : []),
    ];
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
