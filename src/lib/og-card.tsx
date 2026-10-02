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
          background: "linear-gradient(140deg, #070708 0%, #0b0f0e 55%, #06231c 100%)",
          padding: 80,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: 999,
              background: "#34d399",
            }}
          />
          <div
            style={{
              color: "#a5a5b0",
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
            color: "#f6f6f8",
            fontSize: 76,
            lineHeight: 1.1,
            letterSpacing: -2,
          }}
        >
          <div style={{ display: "flex" }}>{headline}</div>
          <div style={{ display: "flex", color: "#a5a5b0" }}>{muted}</div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            color: "#74747f",
            fontSize: 24,
          }}
        >
          <div style={{ display: "flex", maxWidth: 720, lineHeight: 1.4 }}>{blurb}</div>
          <div style={{ display: "flex", color: "#34d399" }}>{new URL(siteConfig.url).host}</div>
        </div>
      </div>
    ),
    size,
  );
}
