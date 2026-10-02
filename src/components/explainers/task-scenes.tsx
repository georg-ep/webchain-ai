"use client";

import { Glyph, type GlyphKind } from "@/components/explainers/glyph";
import { Scene, useOn } from "@/components/explainers/scene";

/*
 * One small animated story per task on /automation. Each is a 280×140
 * sketch on a paper plate at the top of its card: the work arriving, what
 * we do to it, and the finished result, in four or five beats.
 *
 * Illustrations only: no real names, amounts or figures appear in them.
 */

const INK = "#0b0b0b";
const INK_4 = "#9a948c";
const LINE = "#e7e3de";
const LINE_STRONG = "#d9d3cc";
const PAPER = "#fdfcfc";
const VIOLET = "#0447ff";
const EMBER = "#ff4704";

function Sheet({ x, y, w, h }: { x: number; y: number; w: number; h: number }) {
  return <rect x={x} y={y} width={w} height={h} rx="8" fill={PAPER} stroke={LINE_STRONG} />;
}

/** A text line placeholder; `on` turns it from hairline grey to ink. */
function Bar({
  x,
  y,
  w,
  tone = LINE,
  grow = false,
  on,
}: {
  x: number;
  y: number;
  w: number;
  tone?: string;
  grow?: boolean;
  on?: boolean;
}) {
  return (
    <rect
      x={x}
      y={y}
      width={w}
      height="5"
      rx="2.5"
      fill={tone}
      className={grow ? "x-grow-x" : undefined}
      data-on={on}
    />
  );
}

/** A round badge with an icon, popping in on its beat. */
function Badge({
  cx,
  cy,
  glyph,
  tone = VIOLET,
  on,
}: {
  cx: number;
  cy: number;
  glyph: GlyphKind;
  tone?: string;
  on: boolean;
}) {
  return (
    <g className="x-pop" data-on={on}>
      <circle cx={cx} cy={cy} r="13" fill={tone} />
      <Glyph kind={glyph} x={cx - 8} y={cy - 8} stroke={PAPER} />
    </g>
  );
}

function Caption({ x, y, children, anchor = "start", tone = INK_4, on }: {
  x: number;
  y: number;
  children: React.ReactNode;
  anchor?: "start" | "middle" | "end";
  tone?: string;
  on?: boolean;
}) {
  return (
    <text
      x={x}
      y={y}
      fontSize="8"
      textAnchor={anchor}
      fill={tone}
      className={on === undefined ? "x-mono" : "x-mono x-fade"}
      data-on={on}
    >
      {children}
    </text>
  );
}

function Plate({ children }: { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 280 140" aria-hidden>
      {children}
    </svg>
  );
}

/* ---------- Credit control: chase on a schedule, log replies ---------- */

function ChaseStory() {
  const on = useOn();
  const ticks = [
    { x: 150, label: "Day 1" },
    { x: 200, label: "Day 7" },
    { x: 250, label: "Day 14" },
  ];

  return (
    <Plate>
      <Sheet x={14} y={22} w={100} h={96} />
      <Caption x={26} y={42}>
        INV-1042
      </Caption>
      <Bar x={26} y={52} w={62} />
      <Bar x={26} y={64} w={44} />
      {/* Status pill: overdue until the last beat, then paid */}
      <g className="x-out" {...on(4)}>
        <rect x={26} y={88} width={64} height={18} rx="9" fill="rgba(255,71,4,0.1)" />
        <Caption x={58} y={100} anchor="middle" tone={EMBER}>
          Overdue
        </Caption>
      </g>
      <g className="x-fade" {...on(4)}>
        <rect x={26} y={88} width={64} height={18} rx="9" fill="rgba(4,71,255,0.1)" />
        <Caption x={58} y={100} anchor="middle" tone={VIOLET}>
          Paid
        </Caption>
      </g>

      <path d="M132 76 H266" stroke={LINE_STRONG} strokeDasharray="2 4" />
      {ticks.map(({ x, label }, i) => (
        <g key={label}>
          <circle cx={x} cy={76} r="3" fill={LINE_STRONG} />
          <Caption x={x} y={96} anchor="middle">
            {label}
          </Caption>
          <Badge cx={x} cy={50} glyph="mail" tone={INK} on={on(1 + i)["data-on"]} />
        </g>
      ))}
      <g className="x-rise" {...on(3)}>
        <rect x={196} y={106} width={74} height={18} rx="9" fill="rgba(4,71,255,0.1)" />
        <Caption x={233} y={118} anchor="middle" tone={VIOLET}>
          Reply logged
        </Caption>
      </g>
    </Plate>
  );
}

/* ---------- Purchase ledger: match invoice to PO, post for approval ---------- */

function MatchStory() {
  const on = useOn();
  const rows = [48, 62, 76];

  return (
    <Plate>
      <Sheet x={14} y={18} w={86} h={86} />
      <Caption x={24} y={36}>
        Invoice
      </Caption>
      <Sheet x={180} y={18} w={86} h={86} />
      <Caption x={190} y={36}>
        PO-311
      </Caption>

      {rows.map((y, i) => (
        <g key={y}>
          <Bar x={24} y={y} w={64} />
          <Bar x={190} y={y} w={64} />
          <rect x={24} y={y} width={64} height="5" rx="2.5" fill={VIOLET} className="x-fade" {...on(1 + i)} opacity="0.55" />
          <rect x={190} y={y} width={64} height="5" rx="2.5" fill={VIOLET} className="x-fade" {...on(1 + i)} opacity="0.55" />
          <path
            d={`M92 ${y + 2.5} H186`}
            stroke={VIOLET}
            strokeOpacity="0.5"
            strokeDasharray="2 3"
            className="x-fade"
            {...on(1 + i)}
          />
        </g>
      ))}

      <Badge cx={140} cy={62} glyph="check" on={on(3)["data-on"]} />

      <g className="x-rise" {...on(4)}>
        <rect x={72} y={114} width={136} height={20} rx="10" fill={INK} />
        <text x={140} y={127.5} fontSize="8.5" textAnchor="middle" fill={PAPER} className="x-mono">
          Posted · ready to approve
        </text>
      </g>
    </Plate>
  );
}

/* ---------- Order processing: email/PDF into the system, confirm ---------- */

function OrderStory() {
  const on = useOn();
  const fields = [
    { y: 40, label: "Customer", w: 70 },
    { y: 64, label: "Items", w: 56 },
    { y: 88, label: "Deliver", w: 46 },
  ];

  return (
    <Plate>
      <Sheet x={14} y={22} w={78} h={96} />
      <Glyph kind="doc" x={24} y={32} />
      <Caption x={44} y={44}>
        PDF
      </Caption>
      <Bar x={24} y={60} w={56} />
      <Bar x={24} y={72} w={48} />
      <Bar x={24} y={84} w={52} />
      <Bar x={24} y={96} w={36} />

      <path d="M98 70 H120" stroke={LINE_STRONG} strokeWidth="1.25" className="x-flow" />
      <path d="m116 66 4 4-4 4" fill="none" stroke={LINE_STRONG} strokeWidth="1.25" />

      <Sheet x={126} y={22} w={140} h={96} />
      {fields.map(({ y, label, w }, i) => (
        <g key={label}>
          <Caption x={136} y={y + 6}>
            {label}
          </Caption>
          <rect x={186} y={y - 2} width={70} height={12} rx="4" fill="#f5f3f1" stroke={LINE} />
          <Bar x={190} y={y + 1.5} w={w - 10} tone={INK} grow on={on(1 + i)["data-on"]} />
        </g>
      ))}

      <g className="x-rise" {...on(4)}>
        <rect x={136} y={104} width={120} height={20} rx="10" fill={INK} />
        <text x={196} y={117.5} fontSize="8.5" textAnchor="middle" fill={PAPER} className="x-mono">
          Confirmation sent
        </text>
      </g>
    </Plate>
  );
}

/* ---------- Sales admin: enquiry priced from your list ---------- */

function QuoteStory() {
  const on = useOn();
  const priceRows = [40, 56, 72, 88];

  return (
    <Plate>
      {/* Enquiry bubble */}
      <path d="M14 30 h70 a8 8 0 0 1 8 8 v26 a8 8 0 0 1 -8 8 h-52 l-10 9 v-9 h-8 a8 8 0 0 1 -8 -8 v-26 a8 8 0 0 1 8 -8z" fill={PAPER} stroke={LINE_STRONG} />
      <Caption x={22} y={46}>
        Enquiry
      </Caption>
      <Bar x={22} y={54} w={56} />
      <Bar x={22} y={64} w={40} />

      {/* Price list */}
      <Sheet x={104} y={24} w={72} h={92} />
      <Caption x={112} y={36}>
        Price list
      </Caption>
      {priceRows.map((y, i) => (
        <g key={y}>
          <rect
            x={108}
            y={y - 4}
            width={64}
            height={13}
            rx="4"
            fill="rgba(4,71,255,0.1)"
            className="x-fade"
            {...on(i === 1 ? 1 : i === 3 ? 2 : 99)}
          />
          <Bar x={112} y={y} w={30} />
          <Bar x={152} y={y} w={14} />
        </g>
      ))}

      {/* Quote being drafted */}
      <Sheet x={190} y={18} w={76} h={104} />
      <Caption x={200} y={32}>
        Quote
      </Caption>
      <Bar x={200} y={44} w={52} tone={INK} grow on={on(1)["data-on"]} />
      <Bar x={200} y={56} w={40} tone={INK} grow on={on(2)["data-on"]} />
      <path d="M200 74 H256" stroke={LINE} />
      <g className="x-fade" {...on(3)}>
        <Caption x={200} y={88}>
          Total
        </Caption>
        <Bar x={228} y={83} w={28} tone={INK} />
      </g>
      <g className="x-rise" {...on(4)}>
        <rect x={196} y={98} width={64} height={16} rx="8" fill="rgba(255,71,4,0.12)" />
        <Caption x={228} y={109} anchor="middle" tone={EMBER}>
          Check
        </Caption>
      </g>
    </Plate>
  );
}

/* ---------- Scheduling: book the diary, confirm, remind ---------- */

function BookingStory() {
  const on = useOn();
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const busy = new Set(["0-0", "1-1", "2-0", "3-2", "4-1", "0-2", "2-2"]);
  const slot = "3-1";

  return (
    <Plate>
      <Sheet x={14} y={14} w={176} h={112} />
      {days.map((d, c) => (
        <Caption key={d} x={38 + c * 33} y={32} anchor="middle">
          {d}
        </Caption>
      ))}
      {[0, 1, 2].map((r) =>
        days.map((d, c) => {
          const key = `${c}-${r}`;
          const x = 24 + c * 33;
          const y = 42 + r * 26;
          if (key === slot) {
            return (
              <g key={key}>
                <rect x={x} y={y} width="28" height="20" rx="5" fill="none" stroke={LINE} strokeDasharray="2 2" />
                <rect x={x} y={y} width="28" height="20" rx="5" fill="none" stroke={VIOLET} className="x-fade" {...on(1)} />
                <rect x={x} y={y} width="28" height="20" rx="5" fill={VIOLET} className="x-pop" {...on(2)} />
              </g>
            );
          }
          return (
            <rect
              key={key}
              x={x}
              y={y}
              width="28"
              height="20"
              rx="5"
              fill={busy.has(key) ? "#efece8" : PAPER}
              stroke={LINE}
            />
          );
        }),
      )}

      <g className="x-rise" {...on(3)}>
        <Badge cx={226} cy={46} glyph="mail" tone={INK} on={on(3)["data-on"]} />
        <Caption x={244} y={49}>
          Booked
        </Caption>
      </g>
      <g className="x-rise" {...on(4)}>
        <Badge cx={226} cy={94} glyph="bell" tone={EMBER} on={on(4)["data-on"]} />
        <Caption x={244} y={97}>
          Remind
        </Caption>
      </g>
    </Plate>
  );
}

/* ---------- Office admin: keep the sheet current, send the weekly report ---------- */

function ReportStory() {
  const on = useOn();
  const bars = [
    { h: 34, at: 3 },
    { h: 52, at: 3 },
    { h: 28, at: 3 },
    { h: 64, at: 3 },
  ];

  return (
    <Plate>
      <Sheet x={14} y={18} w={118} h={104} />
      {[0, 1, 2, 3].map((r) => (
        <g key={r}>
          <path d={`M14 ${40 + r * 20} H132`} stroke={LINE} />
          <Bar x={22} y={46 + r * 20} w={30} />
          <Bar x={64} y={46 + r * 20} w={24} tone={INK} grow on={on(r < 2 ? 1 : 2)["data-on"]} />
          <Bar x={100} y={46 + r * 20} w={20} tone={INK} grow on={on(r < 2 ? 1 : 2)["data-on"]} />
        </g>
      ))}
      <path d="M58 18 V122 M94 18 V122" stroke={LINE} />
      <Caption x={22} y={32}>
        Week
      </Caption>

      <Sheet x={146} y={18} w={120} h={104} />
      <path d="M158 104 H254" stroke={LINE_STRONG} />
      {bars.map(({ h }, i) => (
        <rect
          key={i}
          x={164 + i * 22}
          y={104 - h}
          width="14"
          height={h}
          rx="3"
          fill={i === 3 ? VIOLET : "#d9d3cc"}
          className="x-grow-y"
          {...on(3)}
        />
      ))}
      <g className="x-rise" {...on(4)}>
        <rect x={156} y={26} width={100} height={18} rx="9" fill={INK} />
        <text x={206} y={38} fontSize="8" textAnchor="middle" fill={PAPER} className="x-mono">
          Sent Monday
        </text>
      </g>
    </Plate>
  );
}

const STORIES = {
  chase: {
    Story: ChaseStory,
    label: "Reminders go out on day 1, 7 and 14, the customer's reply is logged, and the invoice is marked paid.",
  },
  match: {
    Story: MatchStory,
    label: "Each line of a supplier invoice is matched to the purchase order, then posted ready for approval.",
  },
  order: {
    Story: OrderStory,
    label: "An order arriving as a PDF is keyed into your system field by field, then a confirmation is sent.",
  },
  quote: {
    Story: QuoteStory,
    label: "An enquiry is priced from your own price list into a draft quote, left for you to check.",
  },
  booking: {
    Story: BookingStory,
    label: "A free slot is found in the diary and booked, the customer is confirmed, and a reminder is sent.",
  },
  report: {
    Story: ReportStory,
    label: "The spreadsheet is kept up to date through the week and a report is sent every Monday.",
  },
} as const;

export type TaskStoryKind = keyof typeof STORIES;

/** The animated plate for one task card. */
export function TaskStory({ kind }: { kind: TaskStoryKind }) {
  const { Story, label } = STORIES[kind];
  return (
    <Scene steps={5} interval={1000} hold={3} label={label}>
      <Story />
    </Scene>
  );
}
