import { ImageResponse } from "next/og";
import { readFileSync } from "node:fs";
import { join } from "node:path";

import { site } from "@/content/site";

/**
 * The wordmark, inlined as a data URI.
 *
 * ImageResponse renders in an isolated environment that cannot fetch from the
 * site's own origin at build time, so the artwork has to be embedded rather
 * than linked. Read once at module scope: this runs during the build.
 */
function wordmarkDataUri(): string | null {
  try {
    const file = join(
      process.cwd(),
      "public",
      "media",
      "brand",
      "sageview-wordmark.png",
    );
    return `data:image/png;base64,${readFileSync(file).toString("base64")}`;
  } catch {
    return null;
  }
}

const WORDMARK = wordmarkDataUri();

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${site.name}, ${site.tagline}`;

/**
 * Default social card.
 *
 * Generated at build time from the brand's own tokens rather than shipped as
 * a static PNG, so it can never drift out of sync with the wordmark or the
 * tagline. Uses system-safe font stacks, ImageResponse cannot reach the
 * self-hosted next/font files without extra fetching, and the card reads
 * correctly without them.
 */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background:
            "radial-gradient(130% 110% at 18% -10%, #232a2c 0%, #141819 42%, #07090a 100%)",
          color: "#e9e5dd",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
          {WORDMARK ? (
            // 2318x261 artwork, scaled to a 44px cap height.
            // eslint-disable-next-line @next/next/no-img-element -- ImageResponse renders in Satori, which has no next/image
            <img src={WORDMARK} width={391} height={44} alt="" />
          ) : (
            <>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 999,
                  border: "2px solid #c2a05a",
                  display: "flex",
                }}
              />
              <div
                style={{
                  fontSize: 30,
                  letterSpacing: "0.14em",
                  color: "#f6f4ef",
                  display: "flex",
                }}
              >
                SAGEVIEW
              </div>
            </>
          )}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 78,
              lineHeight: 1.03,
              color: "#f6f4ef",
              letterSpacing: "-0.02em",
              display: "flex",
              flexWrap: "wrap",
              maxWidth: 960,
            }}
          >
            Framing the Meaning That Moves Human Minds
          </div>

          <div
            style={{
              marginTop: 34,
              fontSize: 25,
              color: "#8b918e",
              fontFamily: "Helvetica, Arial, sans-serif",
              display: "flex",
              maxWidth: 860,
            }}
          >
            Documentary filmmaking · Visual communication strategy · Full-scale
            production
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderTop: "1px solid rgba(233,229,221,0.16)",
            paddingTop: 26,
            fontSize: 19,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#c2a05a",
            fontFamily: "Helvetica, Arial, sans-serif",
          }}
        >
          <div style={{ display: "flex" }}>SageView Production Ltd</div>
          <div style={{ display: "flex", color: "#545b59" }}>
            Strategic · Cinematic · Human
          </div>
        </div>
      </div>
    ),
    size,
  );
}
