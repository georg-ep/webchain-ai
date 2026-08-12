"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

/**
 * The hero's 3D object: a mesh of agents that assembles itself on load, then
 * thinks out loud — activation cascades from node to node along the edges,
 * the way work actually propagates through an autonomous system.
 *
 * Hand-rolled perspective projection onto a 2D canvas rather than a WebGL
 * library, so it ships no extra dependencies and stays cheap: 72 nodes, ~150
 * edges, additive blending only on the glowing parts. It pauses when
 * scrolled out of view or the tab is hidden, and settles into a single
 * static frame when the visitor prefers reduced motion.
 */

const NODE_COUNT = 72;
const NEIGHBOURS = 3;
const MAX_PULSES = 56;
const ASSEMBLE_MS = 2200;

type Vec3 = { x: number; y: number; z: number };
type Edge = { a: number; b: number };
type Pulse = { edge: number; from: number; to: number; t: number; speed: number };

type Node = {
  /** Resting position on the sphere. */
  home: Vec3;
  /** Scattered position the node flies in from. */
  start: Vec3;
  /** 0 → 1 activation, decays over time. */
  charge: number;
  links: number[];
};

const easeOutExpo = (t: number) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));

function buildGraph(): { nodes: Node[]; edges: Edge[] } {
  const golden = Math.PI * (3 - Math.sqrt(5));
  const points: Vec3[] = [];

  for (let i = 0; i < NODE_COUNT; i++) {
    const y = 1 - (i / (NODE_COUNT - 1)) * 2;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = golden * i;
    points.push({ x: Math.cos(theta) * r, y, z: Math.sin(theta) * r });
  }

  const nodes: Node[] = points.map((home) => {
    // Fly in from a much larger, randomised shell.
    const spread = 2.6 + Math.random() * 2.4;
    return {
      home,
      start: {
        x: home.x * spread + (Math.random() - 0.5) * 1.5,
        y: home.y * spread + (Math.random() - 0.5) * 1.5,
        z: home.z * spread + (Math.random() - 0.5) * 1.5,
      },
      charge: 0,
      links: [],
    };
  });

  const seen = new Set<string>();
  const edges: Edge[] = [];

  points.forEach((point, i) => {
    points
      .map((other, j) => ({
        j,
        d: (other.x - point.x) ** 2 + (other.y - point.y) ** 2 + (other.z - point.z) ** 2,
      }))
      .filter((entry) => entry.j !== i)
      .sort((a, b) => a.d - b.d)
      .slice(0, NEIGHBOURS)
      .forEach(({ j }) => {
        const key = i < j ? `${i}-${j}` : `${j}-${i}`;
        if (seen.has(key)) return;
        seen.add(key);
        edges.push({ a: i, b: j });
        nodes[i].links.push(edges.length - 1);
        nodes[j].links.push(edges.length - 1);
      });
  });

  return { nodes, edges };
}

export function HeroMesh({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { nodes, edges } = buildGraph();
    const pulses: Pulse[] = [];
    const projected = nodes.map(() => ({ x: 0, y: 0, scale: 0, depth: 0 }));

    let width = 0;
    let height = 0;
    let frame = 0;
    let running = true;
    let onScreen = true;
    let spin = 0;
    let wobble = 0;
    let startedAt = 0;
    // Scrolling spins the mesh a little faster, then it eases back to its
    // resting drift, so the object feels connected to the page.
    let scrollSpin = 0;
    let lastScrollY = typeof window === "undefined" ? 0 : window.scrollY;

    const reduceMotion =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    /** Fire a pulse down every edge leaving this node. */
    const fireFrom = (nodeIndex: number, energy: number) => {
      const node = nodes[nodeIndex];
      node.charge = Math.min(1, node.charge + energy);

      for (const edgeIndex of node.links) {
        if (pulses.length >= MAX_PULSES) return;
        const edge = edges[edgeIndex];
        const to = edge.a === nodeIndex ? edge.b : edge.a;
        // Not every edge fires, so the cascade branches instead of flooding.
        if (Math.random() > 0.45) continue;
        pulses.push({
          edge: edgeIndex,
          from: nodeIndex,
          to,
          t: 0,
          speed: 0.014 + Math.random() * 0.012,
        });
      }
    };

    const render = (now: number) => {
      const elapsed = now - startedAt;
      const assemble = reduceMotion ? 1 : easeOutExpo(Math.min(1, elapsed / ASSEMBLE_MS));

      const cx = width / 2;
      const cy = height / 2;
      const scale = Math.min(width, height) * 0.42;
      const cameraZ = 3.4;
      const focal = 2.6;

      ctx.clearRect(0, 0, width, height);

      const cosY = Math.cos(spin);
      const sinY = Math.sin(spin);
      const tilt = -0.32 + Math.sin(wobble) * 0.12;
      const cosX = Math.cos(tilt);
      const sinX = Math.sin(tilt);

      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        // Interpolate from the scattered start position into the sphere.
        const px = node.start.x + (node.home.x - node.start.x) * assemble;
        const py = node.start.y + (node.home.y - node.start.y) * assemble;
        const pz = node.start.z + (node.home.z - node.start.z) * assemble;

        const x1 = px * cosY - pz * sinY;
        const z1 = px * sinY + pz * cosY;
        const y2 = py * cosX - z1 * sinX;
        const z2 = py * sinX + z1 * cosX;

        // Clamp the denominator: during the fly-in, a node can start behind
        // the camera plane, which would otherwise yield a negative scale
        // (and a negative circle radius).
        const perspective = focal / Math.max(0.7, cameraZ - z2);
        projected[i].x = cx + x1 * scale * perspective;
        projected[i].y = cy + y2 * scale * perspective;
        projected[i].scale = perspective;
        projected[i].depth = z2;
      }

      // --- Edges, painted back to front so depth reads correctly ---
      const order = edges
        .map((edge, index) => ({
          index,
          depth: (projected[edge.a].depth + projected[edge.b].depth) / 2,
        }))
        .sort((a, b) => a.depth - b.depth);

      ctx.lineCap = "round";
      for (const { index, depth } of order) {
        const edge = edges[index];
        const a = projected[edge.a];
        const b = projected[edge.b];
        const fade = (depth + 1) / 2;
        // Edges brighten while either end is still charged.
        const heat = Math.max(nodes[edge.a].charge, nodes[edge.b].charge);

        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = heat
          ? `rgba(52, 211, 153, ${(0.08 + fade * 0.22) * heat + 0.04})`
          : `rgba(148, 163, 184, ${(0.08 + fade * 0.26) * assemble})`;
        ctx.lineWidth = (0.5 + fade * 0.65) * (1 + heat * 0.8);
        ctx.stroke();
      }

      // --- Nodes ---
      for (let i = 0; i < projected.length; i++) {
        const p = projected[i];
        const node = nodes[i];
        const fade = (p.depth + 1) / 2;
        const r = Math.max(0.2, (1.1 + fade * 2) * p.scale);

        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(226, 232, 240, ${(0.2 + fade * 0.66) * assemble})`;
        ctx.fill();

        if (node.charge > 0.01) {
          // Halo plus an expanding ring on freshly activated nodes.
          ctx.globalCompositeOperation = "lighter";
          ctx.beginPath();
          ctx.arc(p.x, p.y, Math.max(0.2, r + 5 * node.charge * p.scale), 0, Math.PI * 2);
          ctx.fillStyle = `rgba(52, 211, 153, ${0.28 * node.charge * fade})`;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(p.x, p.y, Math.max(0.2, r + (1 - node.charge) * 18 * p.scale), 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(110, 231, 183, ${0.35 * node.charge * node.charge})`;
          ctx.lineWidth = 1;
          ctx.stroke();
          ctx.globalCompositeOperation = "source-over";
        }
      }

      // --- Travelling pulses ---
      ctx.globalCompositeOperation = "lighter";
      for (let i = pulses.length - 1; i >= 0; i--) {
        const pulse = pulses[i];
        const from = projected[pulse.from];
        const to = projected[pulse.to];
        const fade = ((from.depth + to.depth) / 2 + 1) / 2;

        for (let tail = 0; tail < 5; tail++) {
          const t = pulse.t - tail * 0.06;
          if (t < 0 || t > 1) continue;
          const x = from.x + (to.x - from.x) * t;
          const y = from.y + (to.y - from.y) * t;
          const alpha = (1 - tail / 5) * (0.2 + fade * 0.8);

          ctx.beginPath();
          ctx.arc(x, y, Math.max(0.2, (2.6 - tail * 0.42) * (0.55 + fade * 0.65)), 0, Math.PI * 2);
          ctx.fillStyle = `rgba(52, 211, 153, ${alpha})`;
          ctx.fill();
        }

        if (!reduceMotion) {
          pulse.t += pulse.speed;
          if (pulse.t >= 1) {
            pulses.splice(i, 1);
            // Arriving pulse re-ignites the next node: the cascade continues.
            if (pulses.length < MAX_PULSES - 4) fireFrom(pulse.to, 0.9);
          }
        }
      }
      ctx.globalCompositeOperation = "source-over";

      // Charge decays so the mesh keeps breathing rather than saturating.
      if (!reduceMotion) {
        for (const node of nodes) {
          if (node.charge > 0) node.charge = Math.max(0, node.charge - 0.012);
        }
      }
    };

    const tick = (now: number) => {
      if (!running) return;

      if (onScreen) {
        const scrollY = window.scrollY;
        scrollSpin += (scrollY - lastScrollY) * 0.00006;
        lastScrollY = scrollY;
        scrollSpin *= 0.94;

        spin += 0.0015 + scrollSpin;
        wobble += 0.0035;

        // Keep several cascades running so the mesh always reads as thinking,
        // without letting them saturate the whole graph at once.
        if (pulses.length < 10 && Math.random() < 0.09) {
          fireFrom(Math.floor(Math.random() * nodes.length), 1);
        }

        render(now);
      }

      frame = requestAnimationFrame(tick);
    };

    const resizeObserver = new ResizeObserver(() => {
      resize();
      render(performance.now());
    });
    resizeObserver.observe(container);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
      },
      { threshold: 0 },
    );
    intersectionObserver.observe(container);

    const onVisibility = () => {
      onScreen = !document.hidden;
    };

    resize();
    startedAt = performance.now();

    if (reduceMotion) {
      fireFrom(0, 1);
      render(startedAt);
    } else {
      document.addEventListener("visibilitychange", onVisibility);
      frame = requestAnimationFrame(tick);
    }

    return () => {
      running = false;
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div ref={containerRef} className={cn("relative", className)} aria-hidden>
      {/* Core bloom behind the mesh */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-3/5 w-3/5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(52,211,153,0.18),rgba(52,211,153,0.04)_45%,transparent_70%)] blur-2xl" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-1/4 w-1/4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.12),transparent_70%)] blur-xl animate-breathe" />
      <canvas ref={canvasRef} className="relative h-full w-full" />
    </div>
  );
}
