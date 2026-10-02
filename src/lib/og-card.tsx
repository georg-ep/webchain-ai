import { siteConfig } from "@/config/site";
import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * The 1200x630 social card every route shares: brand eyebrow, a two-tone
 * headline and a short blurb with the host. Each route's opengraph-image
 * only supplies the words.
 */
export function ogCard({
  eyebrow = siteConfig.name,
  headline,
  muted,
  blurb,
}: {
  eyebrow?: string;
  /** First line of the headline, in full ink. */
  headline: string;
  /** Second line, in the muted ink. */
  muted: string;
  blurb: string;
}) {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#fdfcfc",
          padding: 80,
          position: "relative",
        }}
      >
        {/* The spark orb from the site's diagrams, bleeding off the corner */}
        <div
          style={{
            position: "absolute",
            right: -80,
            top: -80,
            width: 300,
            height: 300,
            borderRadius: 999,
            background:
              "radial-gradient(circle at 32% 30%, #ffffff 0%, #b9a6ff 18%, #0447ff 45%, #ff4704 80%, #ffb38a 100%)",
            opacity: 0.9,
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: 999,
              background: "#0447ff",
            }}
          />
          <div
            style={{
              color: "#6f6962",
              fontSize: 24,
              letterSpacing: 6,
              textTransform: "uppercase",
            }}
          >
            {eyebrow}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            color: "#0b0b0b",
            fontSize: 76,
            fontWeight: 300,
            lineHeight: 1.1,
            letterSpacing: -2,
          }}
        >
          <div style={{ display: "flex" }}>{headline}</div>
          <div style={{ display: "flex", color: "#9a948c" }}>{muted}</div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            color: "#6f6962",
            fontSize: 24,
          }}
        >
          <div style={{ display: "flex", maxWidth: 720, lineHeight: 1.4 }}>{blurb}</div>
          <div style={{ display: "flex", color: "#0b0b0b" }}>{new URL(siteConfig.url).host}</div>
        </div>
      </div>
    ),
    size,
  );
}
