import type { Metadata, Viewport } from "next";
import { Archivo, Inter, JetBrains_Mono } from "next/font/google";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { contact, site } from "@/content/site";
import { resolveWordmark } from "@/lib/asset-exists";
import { organizationJsonLd } from "@/lib/seo";
import "./globals.css";

/**
 * Type system.
 *
 * Display, Archivo: a heavy grotesque, set large and tight. It carries the
 *   whole voice of the site, so it is loaded across its weight range rather
 *   than at one weight.
 * Sans   , Inter: the working voice of the interface and all running text.
 * Mono   , JetBrains Mono: small technical labels, indices and filters.
 *
 * All three are self-hosted by next/font: no external requests, no layout
 * shift, automatically subset to latin.
 */
const archivo = Archivo({
  weight: ["600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-archivo",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.seoTitle,
    template: `${site.shortName} | %s`,
  },
  description: site.seoDescription,
  applicationName: site.name,
  authors: [{ name: site.name }],
  creator: site.name,
  publisher: site.name,
  keywords: [
    "documentary filmmaking",
    "visual communication strategy",
    "brand storytelling",
    "NGO documentary",
    "impact storytelling",
    "live production",
    "technical broadcast",
    "SageView Production",
  ],
  formatDetection: { telephone: false },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: "#050607",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      // `js` gates every scroll-reveal. It is set server-side (so there is no
      // flash of hidden content) and neutralised by the <noscript> style below
      // for visitors without JavaScript.
      className={`js ${archivo.variable} ${inter.variable} ${jetbrainsMono.variable} antialiased`}
      // Next 16 no longer overrides `scroll-behavior: smooth` during route
      // transitions unless asked; this keeps navigation instant while anchor
      // links stay smooth.
      data-scroll-behavior="smooth"
    >
      <body className="flex min-h-screen flex-col bg-void text-bone">
        <noscript>
          <style>{`[data-reveal],[data-reveal-inner]{opacity:1 !important;transform:none !important;clip-path:none !important}`}</style>
        </noscript>

        <a
          href="#main"
          className="sr-only z-[70] focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:bg-brass focus:px-5 focus:py-3 focus:text-body-sm focus:font-medium focus:text-void"
        >
          Skip to content
        </a>

        <Navbar wordmark={resolveWordmark()} />

        <main id="main" className="flex-1">
          {children}
        </main>

        <Footer />

        {/* Fixed film grain over the whole surface. Decorative. */}
        <div aria-hidden="true" className="film-grain-layer" />

        <script
          type="application/ld+json"
          // Static, developer-authored JSON-LD: no user input reaches this.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd(contact)),
          }}
        />
      </body>
    </html>
  );
}
