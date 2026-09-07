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
    /**
     * Serve images straight from /public instead of Vercel's Image
     * Optimization API.
     *
     * That API is metered, and on the current plan the quota is exhausted:
     * every /_next/image request returns 402 and so every image on the site
     * fails to render. Unoptimized delivery costs larger payloads but is the
     * difference between images appearing and not appearing at all.
     *
     * To go back to optimized delivery, raise the plan's image quota and
     * remove this flag. The formats/sizes below are kept for that day.
     */
    unoptimized: true,
    // AVIF first, WebP fallback, matters on a site this image-led.
    formats: ["image/avif", "image/webp"],
    // Matches the breakpoints the layouts actually use.
    deviceSizes: [420, 640, 828, 1080, 1280, 1600, 1920, 2560],
    imageSizes: [64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },

  /**
   * Redirects for the pre-2026 architecture.
   *
   * Those pages were absorbed into Services and About rather than deleted, so
   * every old URL still resolves to where its content actually went. Permanent
   * because the old structure is not coming back.
   */
  async redirects() {
    return [
      { source: "/contact", destination: "/start-a-project", permanent: true },
      { source: "/case-studies", destination: "/work", permanent: true },
      { source: "/case-studies/:slug", destination: "/work/:slug", permanent: true },
      { source: "/process", destination: "/services#process", permanent: true },
      { source: "/deliverables", destination: "/services", permanent: true },
      { source: "/services/documentary-filmmaking", destination: "/services#film", permanent: true },
      { source: "/services/visual-communication", destination: "/services#visual-communication", permanent: true },
      { source: "/services/production", destination: "/services#live-production", permanent: true },
      { source: "/vision", destination: "/about#who-we-are", permanent: true },
      { source: "/philosophy", destination: "/about#philosophy", permanent: true },
      { source: "/network", destination: "/about#network", permanent: true },
      { source: "/why-sageview", destination: "/about#approach", permanent: true },
      { source: "/testimonials", destination: "/about", permanent: true },
    ];
  },

  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
