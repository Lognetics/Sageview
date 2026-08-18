import type { NextConfig } from "next";

/**
 * Security headers.
 *
 * No CSP is set here: this site loads no third-party scripts, so a CSP would
 * only start earning its keep once analytics or an embed is added. Add one at
 * that point rather than shipping a permissive placeholder.
 */
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,

  images: {
    // AVIF first, WebP fallback — matters on a site this image-led.
    formats: ["image/avif", "image/webp"],
    // Matches the breakpoints the layouts actually use.
    deviceSizes: [420, 640, 828, 1080, 1280, 1600, 1920, 2560],
    imageSizes: [64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },

  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
