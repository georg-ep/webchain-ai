/**
 * Tiny line icons drawn straight into explainer SVGs (16×16 units, ink
 * stroke), so a diagram can say "email" or "spreadsheet" without pulling in
 * an icon font or nesting foreign SVG documents.
 */
export type GlyphKind =
  | "mail"
  | "doc"
  | "sheet"
  | "calendar"
  | "chat"
  | "code"
  | "ledger"
  | "check"
  | "bell"
  | "browser";

export function Glyph({
  kind,
  x,
  y,
  stroke,
}: {
  kind: GlyphKind;
  x: number;
  y: number;
  /** Defaults to the ink-2 text colour. */
  stroke?: string;
}) {
  const common = {
    fill: "none",
    stroke: stroke ?? "currentColor",
    strokeWidth: 1.25,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  return (
    <g transform={`translate(${x} ${y})`} className="text-ink-2" {...common}>
      {kind === "mail" && (
        <>
          <rect x="1" y="3" width="14" height="10" rx="2" />
          <path d="M1.8 4.2 8 8.6l6.2-4.4" />
        </>
      )}
      {kind === "doc" && (
        <>
          <path d="M4 1.5h5.5L12.5 4.5v10h-8.5z" />
          <path d="M9.5 1.5v3h3M6.5 8h4M6.5 10.5h4" />
        </>
      )}
      {kind === "sheet" && (
        <>
          <rect x="1.5" y="2" width="13" height="12" rx="1.5" />
          <path d="M1.5 6h13M1.5 10h13M6 2v12" />
        </>
      )}
      {kind === "calendar" && (
        <>
          <rect x="1.5" y="3" width="13" height="11.5" rx="1.5" />
          <path d="M1.5 6.5h13M5 1.5v3M11 1.5v3" />
        </>
      )}
      {kind === "chat" && <path d="M2 3.5h12v8H7l-3 2.5v-2.5H2z" />}
      {kind === "code" && <path d="m5.5 4.5-3.5 3.5 3.5 3.5M10.5 4.5l3.5 3.5-3.5 3.5" />}
      {kind === "ledger" && (
        <>
          <rect x="2" y="1.5" width="12" height="13" rx="1.5" />
          <path d="M5 5h6M5 8h6M5 11h3.5" />
        </>
      )}
      {kind === "check" && <path d="m3 8.5 3.2 3L13 4.5" />}
      {kind === "bell" && (
        <>
          <path d="M4 11V7.5a4 4 0 0 1 8 0V11l1.2 1.5H2.8z" />
          <path d="M6.5 14a1.6 1.6 0 0 0 3 0" />
        </>
      )}
      {kind === "browser" && (
        <>
          <rect x="1.5" y="2.5" width="13" height="11" rx="1.5" />
          <path d="M1.5 5.5h13" />
        </>
      )}
    </g>
  );
}
