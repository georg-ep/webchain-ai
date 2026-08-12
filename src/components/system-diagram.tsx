/**
 * Before / after system diagrams.
 *
 * Both diagrams share one visual grammar so the two states read as the same
 * system in two conditions: four processing nodes on a single baseline,
 * hairline edges between them, and tokens travelling along those edges.
 *
 *   Fault state — tokens queue against a severed edge, downstream nodes never
 *   light up, and work spins on a retry loop.
 *   Flow state  — every node is live, tokens move end to end, and an outlier
 *   is routed around the main path and rejoined.
 */

const NODE_X = [40, 116, 200, 280] as const;
const BASELINE = 46;
const VIEW_BOX = "0 0 320 92";

function NodeShape({
  x,
  tone,
  dim = false,
}: {
  x: number;
  tone: "fault" | "flow";
  dim?: boolean;
}) {
  const stroke = tone === "fault" ? "#f87171" : "#34d399";

  return (
    <g opacity={dim ? 0.3 : 1}>
      {!dim && tone === "flow" && (
        <rect
          x={x - 13}
          y={BASELINE - 13}
          width="26"
          height="26"
          rx="8"
          fill={stroke}
          fillOpacity="0.08"
        />
      )}
      <rect
        x={x - 10}
        y={BASELINE - 10}
        width="20"
        height="20"
        rx="6"
        fill={tone === "fault" ? "#1c0e11" : "#05261f"}
        stroke={stroke}
        strokeWidth="1"
        strokeOpacity={dim ? 0.7 : 0.9}
        strokeDasharray={dim ? "3 3" : undefined}
      />
      <rect
        x={x - 3.5}
        y={BASELINE - 3.5}
        width="7"
        height="7"
        rx="2"
        fill={stroke}
        opacity={dim ? 0.3 : 0.85}
      />
    </g>
  );
}

export function FaultDiagram() {
  const intake = `M2 ${BASELINE} H${NODE_X[1] - 10}`;

  // A closed circle sitting on top of the node. Two arcs rather than a bezier
  // so the start and end points are identical: an open path made the token
  // jump back to the start on every repeat.
  const retryR = 11;
  const retryCy = BASELINE - 10 - retryR;
  const retry =
    `M${NODE_X[1] - retryR} ${retryCy} ` +
    `A ${retryR} ${retryR} 0 1 1 ${NODE_X[1] + retryR} ${retryCy} ` +
    `A ${retryR} ${retryR} 0 1 1 ${NODE_X[1] - retryR} ${retryCy}`;

  return (
    <svg
      viewBox={VIEW_BOX}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-auto w-full overflow-visible"
      role="img"
      aria-label="Work queues against a broken step and never reaches the rest of the system"
    >
      <defs>
        {/* userSpaceOnUse: a horizontal line has a zero-height bbox, which
            makes objectBoundingBox gradients collapse. */}
        <linearGradient id="faultEdge" gradientUnits="userSpaceOnUse" x1="2" y1="0" x2="140" y2="0">
          <stop offset="0%" stopColor="#f87171" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#f87171" stopOpacity="0.75" />
        </linearGradient>
      </defs>

      {/* Intake edge, still carrying work */}
      <path d={intake} stroke="url(#faultEdge)" strokeWidth="1.25" />
      <circle r="2.5" fill="#f87171">
        <animateMotion dur="1.6s" repeatCount="indefinite" path={intake} calcMode="linear" />
      </circle>

      {/* Backlog piling up in front of the break */}
      {[0, 1, 2].map((i) => (
        <circle key={i} cx={130 + i * 9} cy={BASELINE} r="2.5" fill="#f87171" opacity="0.5">
          <animate
            attributeName="opacity"
            values="0.2;0.8;0.2"
            dur="1.6s"
            begin={`${i * 0.22}s`}
            repeatCount="indefinite"
          />
        </circle>
      ))}

      {/* The break */}
      <g>
        <path d={`M162 ${BASELINE - 14} V${BASELINE + 14}`} stroke="#f87171" strokeWidth="1.5" />
        <path d={`M162 ${BASELINE - 14} V${BASELINE + 14}`} stroke="#f87171" strokeWidth="7" opacity="0.16">
          <animate attributeName="opacity" values="0.04;0.28;0.04" dur="1.6s" repeatCount="indefinite" />
        </path>
        <path d={`M169 ${BASELINE - 6} L177 ${BASELINE + 2}`} stroke="#f87171" strokeWidth="1.25" opacity="0.7" />
        <path d={`M177 ${BASELINE - 6} L169 ${BASELINE + 2}`} stroke="#f87171" strokeWidth="1.25" opacity="0.7" />
      </g>

      {/* Starved downstream edge */}
      <path
        d={`M${NODE_X[2] + 10} ${BASELINE} H${NODE_X[3] - 10}`}
        stroke="#f87171"
        strokeOpacity="0.22"
        strokeWidth="1.25"
        strokeDasharray="3 4"
      />

      {/* Retry loop: work cycling on itself instead of moving on */}
      <path d={retry} stroke="#f87171" strokeWidth="1" strokeDasharray="3 3" strokeOpacity="0.5" fill="none" />
      <circle r="2" fill="#fbbf24">
        <animateMotion dur="2.4s" repeatCount="indefinite" path={retry} calcMode="linear" />
      </circle>

      <NodeShape x={NODE_X[0]} tone="fault" />
      <NodeShape x={NODE_X[1]} tone="fault" />
      <NodeShape x={NODE_X[2]} tone="fault" dim />
      <NodeShape x={NODE_X[3]} tone="fault" dim />

      {/* Flatlined throughput */}
      <g opacity="0.45">
        <path d="M4 80 H316" stroke="#f87171" strokeOpacity="0.18" strokeWidth="1" strokeDasharray="2 5" />
      </g>
    </svg>
  );
}

export function FlowDiagram() {
  const mainPath = `M2 ${BASELINE} H318`;
  const bypassPath = `M${NODE_X[1]} ${BASELINE - 11} C ${NODE_X[1] + 26} ${BASELINE - 40}, ${NODE_X[3] - 26} ${BASELINE - 40}, ${NODE_X[3]} ${BASELINE - 11}`;

  return (
    <svg
      viewBox={VIEW_BOX}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-auto w-full overflow-visible"
      role="img"
      aria-label="Work flows through every step continuously, with outliers routed around the main path and rejoined"
    >
      <defs>
        <linearGradient id="flowEdge" gradientUnits="userSpaceOnUse" x1="2" y1="0" x2="318" y2="0">
          <stop offset="0%" stopColor="#34d399" stopOpacity="0.25" />
          <stop offset="50%" stopColor="#34d399" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#34d399" stopOpacity="0.25" />
        </linearGradient>
        <radialGradient id="flowPulse">
          <stop offset="0%" stopColor="#34d399" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#34d399" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Pulse behind the reasoning node */}
      <circle cx={NODE_X[2]} cy={BASELINE} r="22" fill="url(#flowPulse)">
        <animate attributeName="r" values="12;26;12" dur="4s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.9;0.2;0.9" dur="4s" repeatCount="indefinite" />
      </circle>

      {/* Main line */}
      <path d={mainPath} stroke="url(#flowEdge)" strokeWidth="1.25" />

      {/* Bypass route for the outlier, landing back on the final node */}
      <path d={bypassPath} stroke="#34d399" strokeWidth="1" strokeOpacity="0.4" strokeDasharray="3 3" fill="none" />

      {/* Tokens: a steady main stream plus the rerouted outlier */}
      {[0, 1.1, 2.2].map((begin, i) => (
        <circle key={i} r={i === 0 ? 2.75 : 2} fill="#6ee7b7" opacity={i === 0 ? 1 : 0.65}>
          <animateMotion dur="3.3s" begin={`${begin}s`} repeatCount="indefinite" path={mainPath} calcMode="linear" />
        </circle>
      ))}
      <circle r="2.25" fill="#34d399">
        <animateMotion dur="3.3s" begin="0.7s" repeatCount="indefinite" path={bypassPath} />
      </circle>

      <NodeShape x={NODE_X[0]} tone="flow" />
      <NodeShape x={NODE_X[1]} tone="flow" />
      <NodeShape x={NODE_X[2]} tone="flow" />
      <NodeShape x={NODE_X[3]} tone="flow" />

      {/* Sustained throughput */}
      <g>
        {Array.from({ length: 26 }).map((_, i) => (
          <rect
            key={i}
            x={5 + i * 12}
            y={i % 4 === 0 ? 74 : 78}
            width="2"
            height={i % 4 === 0 ? 10 : 6}
            rx="1"
            fill="#34d399"
            fillOpacity="0.25"
          >
            <animate
              attributeName="fill-opacity"
              values="0.12;0.55;0.12"
              dur="3.3s"
              begin={`${i * 0.11}s`}
              repeatCount="indefinite"
            />
          </rect>
        ))}
      </g>
    </svg>
  );
}
