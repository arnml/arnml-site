"use client";

import { useEffect, useRef, useState, type ReactNode, type RefObject } from "react";
import type { Locale } from "@/lib/site/locales";

/*
 * Animated figures for the ray-to-terrain post. Each figure plays once when it
 * scrolls into view and can be replayed. Colours carry meaning, as in the
 * videos: yellow is the ray, cyan the samples, pink errors, green the right
 * answer, red a failure. All geometry is computed here, so a drawn ray always
 * stops on the drawn ground.
 */

const C = {
  bg: "#0e1320",
  yellow: "#ffd166",
  cyan: "#4cc9f0",
  pink: "#ff6b9a",
  green: "#5ee6a0",
  red: "#ff5a5a",
  ink: "#eef1f6",
  muted: "#8a93a6",
  ground: "#1c2838",
  groundLine: "#4f6782",
  grid: "#26324a",
};

const L = {
  en: {
    replay: "Replay",
    hookQ: "Where on the map is this person?",
    pixel: "pixel",
    ray: "ray",
    ground: "ground",
    cameraImage: "camera image",
    heightGrid: "height grid · one height per cell",
    walk: "1 · walk the ray",
    refine: "2 · refine (bisection)",
    hit: "hit",
    bigSteps: "Big steps: jumps the crest",
    dda: "Cell by cell: nothing skipped",
    wrongHit: "wrong valley",
    notBug: "…and it is not a bug",
    angle: "Looking down",
    hitsAt: "hits at",
    oneLess: "1° less",
    error: "error",
    scale: "drone at 200 m · same scale both axes",
    slider: "Angle below the horizon",
    sources: "± GPS   ± angles   ± time   ± pixel",
    region: "95 % region",
    drone: "drone",
  },
  es: {
    replay: "Repetir",
    hookQ: "¿En qué punto del mapa está esta persona?",
    pixel: "píxel",
    ray: "rayo",
    ground: "suelo",
    cameraImage: "imagen de la cámara",
    heightGrid: "malla de alturas · una altura por celda",
    walk: "1 · caminar el rayo",
    refine: "2 · afinar (bisección)",
    hit: "cruce",
    bigSteps: "Pasos grandes: salta la cresta",
    dda: "Celda por celda: nada se salta",
    wrongHit: "valle equivocado",
    notBug: "…y no es un bug",
    angle: "Mirando hacia abajo",
    hitsAt: "toca a",
    oneLess: "1° menos",
    error: "error",
    scale: "dron a 200 m · misma escala en ambos ejes",
    slider: "Ángulo bajo el horizonte",
    sources: "± GPS   ± ángulos   ± tiempo   ± píxel",
    region: "región del 95 %",
    drone: "dron",
  },
  pt: {
    replay: "Repetir",
    hookQ: "Em que ponto do mapa está esta pessoa?",
    pixel: "pixel",
    ray: "raio",
    ground: "solo",
    cameraImage: "imagem da câmera",
    heightGrid: "malha de alturas · uma altura por célula",
    walk: "1 · caminhar o raio",
    refine: "2 · refinar (bisseção)",
    hit: "cruzamento",
    bigSteps: "Passos grandes: pula a crista",
    dda: "Célula por célula: nada é pulado",
    wrongHit: "vale errado",
    notBug: "…e não é um bug",
    angle: "Olhando para baixo",
    hitsAt: "toca a",
    oneLess: "1° a menos",
    error: "erro",
    scale: "drone a 200 m · mesma escala nos dois eixos",
    slider: "Ângulo abaixo do horizonte",
    sources: "± GPS   ± ângulos   ± tempo   ± pixel",
    region: "região de 95 %",
    drone: "drone",
  },
} satisfies Record<Locale, Record<string, string>>;

type Pt = [number, number];
type FigureProps = { locale: Locale; caption: ReactNode };

// ---------- timing and geometry helpers ----------

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const easeOut = (k: number) => 1 - Math.pow(1 - k, 3);
const easeIO = (k: number) =>
  k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2;
const linear = (k: number) => k;
/** 0 → 1 between seconds a and b, eased, then stays at 1. */
const prog = (t: number, a: number, b: number, ease = easeOut) =>
  ease(clamp01((t - a) / (b - a)));
const lerp = (a: number, b: number, k: number) => a + (b - a) * k;
const along = (p: Pt, q: Pt, k: number): Pt => [
  lerp(p[0], q[0], k),
  lerp(p[1], q[1], k),
];

/** Where a ray from `o` along `d` first meets the ground `f(x) -> y` (y down). */
function firstHit(o: Pt, d: Pt, f: (x: number) => number, maxLen = 2000): Pt {
  const n = Math.hypot(d[0], d[1]);
  const u: Pt = [d[0] / n, d[1] / n];
  for (let s = 0; s < maxLen; s += 0.5) {
    const x = o[0] + u[0] * s;
    const y = o[1] + u[1] * s;
    if (y >= f(x)) return [x, y];
  }
  return [o[0] + u[0] * maxLen, o[1] + u[1] * maxLen];
}

function groundPath(f: (x: number) => number, bottom: number, x0 = 0, x1 = 720) {
  let d = `M ${x0} ${bottom}`;
  for (let x = x0; x <= x1; x += 4) d += ` L ${x} ${f(x).toFixed(1)}`;
  return `${d} L ${x1} ${bottom} Z`;
}

/** Plays 0 → duration seconds once the figure is in view; replay restarts it. */
function useTimeline(duration: number) {
  const ref = useRef<HTMLElement>(null);
  const [t, setT] = useState(0);
  const [visible, setVisible] = useState(false);
  const [run, setRun] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const s = reduce ? duration : Math.min((now - start) / 1000, duration);
      setT(s);
      if (s < duration) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [visible, run, duration]);

  return { ref, t, replay: () => setRun((r) => r + 1) };
}

// ---------- shared drawing pieces ----------

function Frame({
  figRef,
  onReplay,
  locale,
  caption,
  viewBox,
  label,
  children,
  controls,
}: {
  figRef: RefObject<HTMLElement | null>;
  onReplay: () => void;
  locale: Locale;
  caption: ReactNode;
  viewBox: string;
  label: string;
  children: ReactNode;
  controls?: ReactNode;
}) {
  return (
    <figure className="ray-figure" ref={figRef}>
      <div className="ray-figure-screen">
        <svg viewBox={viewBox} role="img" aria-label={label}>
          {children}
        </svg>
        <div className="ray-figure-bar">
          {controls}
          <button
            type="button"
            className="ray-figure-button ray-figure-replay"
            onClick={onReplay}
          >
            ↻ {L[locale].replay}
          </button>
        </div>
      </div>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

/** Side-view quadcopter. The camera sits at (x, y + 10·s). */
function Drone({ x, y, t, s = 1 }: { x: number; y: number; t: number; s?: number }) {
  const spin = 0.45 + 0.55 * Math.abs(Math.sin(t * 38));
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <line x1={-26} y1={0} x2={26} y2={0} stroke={C.ink} strokeWidth={3} />
      <line x1={-26} y1={0} x2={-26} y2={-5} stroke={C.ink} strokeWidth={3} />
      <line x1={26} y1={0} x2={26} y2={-5} stroke={C.ink} strokeWidth={3} />
      <ellipse cx={-26} cy={-6} rx={15 * spin} ry={2.5} fill={C.muted} />
      <ellipse cx={26} cy={-6} rx={15 * spin} ry={2.5} fill={C.muted} />
      <rect x={-12} y={-6} width={24} height={12} rx={4} fill={C.ink} />
      <circle cx={0} cy={9} r={4} fill={C.yellow} />
    </g>
  );
}

function Person({ x, gy, s = 1, opacity = 1 }: { x: number; gy: number; s?: number; opacity?: number }) {
  return (
    <g
      transform={`translate(${x} ${gy}) scale(${s})`}
      stroke={C.ink}
      strokeWidth={3}
      strokeLinecap="round"
      fill="none"
      opacity={opacity}
    >
      <circle cx={0} cy={-31} r={5} fill={C.ink} />
      <line x1={0} y1={-25} x2={0} y2={-11} />
      <line x1={0} y1={-11} x2={-5} y2={0} />
      <line x1={0} y1={-11} x2={5} y2={0} />
      <line x1={-7} y1={-20} x2={7} y2={-20} />
    </g>
  );
}

function Pin({ x, y, color, opacity = 1 }: { x: number; y: number; color: string; opacity?: number }) {
  return (
    <g opacity={opacity}>
      <path
        d={`M ${x} ${y} L ${x - 9} ${y - 22} A 11 11 0 1 1 ${x + 9} ${y - 22} Z`}
        fill={color}
      />
      <circle cx={x} cy={y - 28} r={4} fill={C.bg} />
    </g>
  );
}

function Ray({ from, to, color = C.yellow, width = 4, dash }: { from: Pt; to: Pt; color?: string; width?: number; dash?: string }) {
  return (
    <g strokeLinecap="round">
      <line x1={from[0]} y1={from[1]} x2={to[0]} y2={to[1]} stroke={color} strokeWidth={width * 3} opacity={0.15} />
      <line x1={from[0]} y1={from[1]} x2={to[0]} y2={to[1]} stroke={color} strokeWidth={width} strokeDasharray={dash} />
    </g>
  );
}

function Txt({
  x,
  y,
  children,
  size = 18,
  color = C.ink,
  weight = 600,
  anchor = "middle",
  opacity = 1,
  mono = false,
}: {
  x: number;
  y: number;
  children: ReactNode;
  size?: number;
  color?: string;
  weight?: number;
  anchor?: "start" | "middle" | "end";
  opacity?: number;
  mono?: boolean;
}) {
  return (
    <text
      x={x}
      y={y}
      fontSize={size}
      fill={color}
      fontWeight={weight}
      textAnchor={anchor}
      opacity={opacity}
      className={mono ? "ray-figure-mono" : undefined}
    >
      {children}
    </text>
  );
}

// ---------- 1 · hook: the drone sees a person ----------

const fHook = (x: number) => 305 + 18 * Math.sin(x / 70) + 10 * Math.sin(x / 23 + 1);

export function RayHookFigure({ locale, caption }: FigureProps) {
  const tl = useTimeline(3.4);
  const { t } = tl;
  const l = L[locale];
  const cam: Pt = [140, 150];
  const px = 540;
  const target: Pt = [px, fHook(px) - 16];
  const k = prog(t, 0.7, 1.9, easeIO);
  const q = prog(t, 2.0, 2.5);
  return (
    <Frame figRef={tl.ref} onReplay={tl.replay} locale={locale} caption={caption} viewBox="0 0 720 400" label={l.hookQ}>
      <Txt x={360} y={56} size={28} weight={700} opacity={prog(t, 0, 0.5)}>
        {l.hookQ}
      </Txt>
      <path d={groundPath(fHook, 400)} fill={C.ground} stroke={C.groundLine} strokeWidth={2} />
      <Person x={px} gy={fHook(px)} opacity={prog(t, 0.2, 0.7)} />
      {k > 0 && <Ray from={cam} to={along(cam, target, k)} />}
      <Drone x={cam[0]} y={cam[1] - 10} t={t} s={1.3} />
      <Txt x={px + 46} y={fHook(px) - 60} size={40 + 30 * q} weight={800} color={C.yellow} opacity={q}>
        ?
      </Txt>
    </Frame>
  );
}

// ---------- 2 · intro: pixel → ray → ground ----------

const fIntro = (x: number) => 345 + 12 * Math.sin(x / 60) + 6 * Math.sin(x / 17);

export function RayStepsFigure({ locale, caption }: FigureProps) {
  const tl = useTimeline(5.2);
  const { t } = tl;
  const l = L[locale];
  const steps = [
    { name: l.pixel, color: C.cyan },
    { name: l.ray, color: C.yellow },
    { name: l.ground, color: C.green },
  ];
  const phase = (i: number) => prog(t, 0.3 + i * 1.6, 0.7 + i * 1.6);
  const pixel: Pt = [163, 222];
  const cam: Pt = [380, 140];
  const hit = firstHit(cam, [620 - cam[0], fIntro(620) - cam[1]], fIntro);
  const k = prog(t, 1.9, 3.1, easeIO);
  return (
    <Frame figRef={tl.ref} onReplay={tl.replay} locale={locale} caption={caption} viewBox="0 0 720 400" label={`${l.pixel} → ${l.ray} → ${l.ground}`}>
      {steps.map((step, i) => {
        const a = phase(i);
        const cx = 200 + i * 160;
        return (
          <g key={step.name}>
            <rect
              x={cx - 62}
              y={26}
              width={124}
              height={40}
              rx={20}
              fill={a > 0.5 ? step.color : "transparent"}
              stroke={a > 0.5 ? step.color : C.muted}
              strokeWidth={2}
              opacity={0.35 + 0.65 * a}
            />
            <Txt x={cx} y={53} size={19} weight={700} color={a > 0.5 ? C.bg : C.muted}>
              {step.name}
            </Txt>
            {i < 2 && (
              <Txt x={cx + 80} y={53} size={20} color={C.muted}>
                →
              </Txt>
            )}
          </g>
        );
      })}

      <path d={groundPath(fIntro, 400)} fill={C.ground} stroke={C.groundLine} strokeWidth={2} />

      {/* camera image with the detection */}
      <g opacity={prog(t, 0.2, 0.6)}>
        <rect x={40} y={110} width={220} height={140} rx={8} fill="#151c2c" stroke={C.muted} strokeWidth={1.5} />
        <path d="M 40 200 Q 100 180 150 205 T 260 195 L 260 250 L 40 250 Z" fill="#1f2a3c" />
        <Person x={163} gy={222} s={0.75} />
        <rect x={150} y={190} width={26} height={36} fill="none" stroke={C.cyan} strokeWidth={2} />
        <Txt x={150} y={272} size={15} color={C.muted} mono>
          {l.cameraImage}
        </Txt>
      </g>
      <circle cx={pixel[0]} cy={pixel[1]} r={5 + 3 * phase(0)} fill={C.yellow} opacity={phase(0)} />

      {/* the pixel becomes a direction leaving the camera */}
      <line
        x1={pixel[0]}
        y1={pixel[1]}
        x2={cam[0]}
        y2={cam[1]}
        stroke={C.muted}
        strokeWidth={1.5}
        strokeDasharray="4 5"
        opacity={prog(t, 1.6, 2.0)}
      />
      {k > 0 && <Ray from={cam} to={along(cam, hit, k)} />}
      <Drone x={cam[0]} y={cam[1] - 10} t={t} s={1.2} />
      <circle cx={hit[0]} cy={hit[1]} r={7} fill={C.green} opacity={phase(2)} />
      <Pin x={hit[0]} y={hit[1] - 4} color={C.green} opacity={phase(2)} />
    </Frame>
  );
}

// ---------- 3 · walk the ray over a height grid, then bisect ----------

const CELL = 30;
const heights = Array.from({ length: 25 }, (_, i) =>
  290 + 34 * Math.sin(i * 0.55) + 14 * Math.sin(i * 1.9 + 0.5),
);
const fGrid = (x: number) => heights[Math.min(24, Math.max(0, Math.floor(x / CELL)))];
const MARCH_CAM: Pt = [64, 82];
const MARCH_DIR: Pt = (() => {
  const d: Pt = [560 - MARCH_CAM[0], fGrid(560) - MARCH_CAM[1]];
  const n = Math.hypot(d[0], d[1]);
  return [d[0] / n, d[1] / n];
})();
const marchAt = (s: number): Pt => [MARCH_CAM[0] + MARCH_DIR[0] * s, MARCH_CAM[1] + MARCH_DIR[1] * s];
const isBelow = (s: number) => {
  const p = marchAt(s);
  return p[1] >= fGrid(p[0]);
};
const MARCH_STEP = 52;
const marchSamples: number[] = [];
for (let k = 1; k < 40; k++) {
  marchSamples.push(k * MARCH_STEP);
  if (isBelow(k * MARCH_STEP)) break;
}
const bisection: { lo: number; hi: number }[] = (() => {
  let lo = marchSamples[marchSamples.length - 2];
  let hi = marchSamples[marchSamples.length - 1];
  const out = [{ lo, hi }];
  for (let i = 0; i < 6; i++) {
    const mid = (lo + hi) / 2;
    if (isBelow(mid)) hi = mid;
    else lo = mid;
    out.push({ lo, hi });
  }
  return out;
})();
const M_T0 = 0.6;
const M_DT = 0.42;
const M_TB = M_T0 + marchSamples.length * M_DT + 0.4;
const M_DB = 0.5;
const M_TH = M_TB + bisection.length * M_DB;

function gridPath() {
  let d = `M 0 400`;
  heights.forEach((h, i) => {
    d += ` L ${i * CELL} ${h.toFixed(1)} L ${(i + 1) * CELL} ${h.toFixed(1)}`;
  });
  return `${d} L 750 400 Z`;
}

export function RayMarchFigure({ locale, caption }: FigureProps) {
  const tl = useTimeline(M_TH + 1.2);
  const { t } = tl;
  const l = L[locale];
  const last = marchSamples[marchSamples.length - 1];
  const rayS = Math.min(last, MARCH_STEP * Math.max(0, (t - M_T0) / M_DT));
  const bi = Math.min(bisection.length - 1, Math.floor((t - M_TB) / M_DB));
  const done = t >= M_TH;
  const hitS = bisection[bisection.length - 1].hi;
  return (
    <Frame figRef={tl.ref} onReplay={tl.replay} locale={locale} caption={caption} viewBox="0 0 720 400" label={`${l.walk}, ${l.refine}`}>
      <path d={gridPath()} fill={C.ground} stroke={C.groundLine} strokeWidth={2} />
      {heights.map((h, i) => (
        <line key={i} x1={i * CELL} y1={h} x2={i * CELL} y2={400} stroke={C.grid} strokeWidth={1} />
      ))}
      <Txt x={18} y={388} size={14} color={C.muted} anchor="start" mono>
        {l.heightGrid}
      </Txt>
      <Txt x={700} y={44} size={20} weight={700} anchor="end" color={t < M_TB ? C.cyan : C.pink}>
        {t < M_TB ? l.walk : l.refine}
      </Txt>

      {rayS > 0 && <Ray from={MARCH_CAM} to={marchAt(done ? hitS : rayS)} width={3} />}

      {marchSamples.map((s) => {
        if (rayS < s) return null;
        const p = marchAt(s);
        const below = isBelow(s);
        const col = below ? C.pink : C.cyan;
        return (
          <g key={s} opacity={done ? 0.45 : 1}>
            <line x1={p[0]} y1={p[1]} x2={p[0]} y2={fGrid(p[0])} stroke={col} strokeWidth={1.5} strokeDasharray="3 4" />
            <circle cx={p[0]} cy={p[1]} r={5.5} fill={col} />
          </g>
        );
      })}

      {bi >= 0 && !done && (() => {
        const { lo, hi } = bisection[bi];
        const a = marchAt(lo);
        const b = marchAt(hi);
        const m = marchAt((lo + hi) / 2);
        return (
          <g>
            <line x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={C.pink} strokeWidth={10} strokeLinecap="round" opacity={0.75} />
            <circle cx={m[0]} cy={m[1]} r={4} fill={C.ink} />
          </g>
        );
      })()}

      {done && (() => {
        const h = marchAt(hitS);
        const a = prog(t, M_TH, M_TH + 0.4);
        return (
          <g opacity={a}>
            <circle cx={h[0]} cy={h[1]} r={8} fill={C.green} />
            <Txt x={h[0]} y={h[1] - 20} size={18} weight={700} color={C.green}>
              {l.hit}
            </Txt>
          </g>
        );
      })()}

      <Drone x={MARCH_CAM[0]} y={MARCH_CAM[1] - 10} t={t} s={1.1} />
    </Frame>
  );
}

// ---------- 4 · open loop: the point slides 200 m ----------

const fFlat = (x: number) => 300 + 4 * Math.sin(x / 40);

export function RayOpenLoopFigure({ locale, caption }: FigureProps) {
  const tl = useTimeline(4.2);
  const { t } = tl;
  const l = L[locale];
  const cam: Pt = [90, 200];
  const xA = 330;
  const xB = 620;
  const slide = prog(t, 1.5, 3.0, easeIO);
  const x = lerp(xA, xB, slide);
  const end: Pt = [x, fFlat(x)];
  const grow = prog(t, 0.3, 1.1, easeIO);
  const label = prog(t, 2.8, 3.3);
  return (
    <Frame figRef={tl.ref} onReplay={tl.replay} locale={locale} caption={caption} viewBox="0 0 720 400" label="200 m">
      <path d={groundPath(fFlat, 400)} fill={C.ground} stroke={C.groundLine} strokeWidth={2} />
      {grow > 0 && <Ray from={cam} to={along(cam, end, grow)} />}
      <Drone x={cam[0]} y={cam[1] - 10} t={t} s={1.2} />
      {slide > 0.02 && <Pin x={xA} y={fFlat(xA)} color={C.green} opacity={0.4} />}
      <Pin x={x} y={fFlat(x)} color={slide > 0.02 ? C.pink : C.green} opacity={prog(t, 1.0, 1.3)} />
      <g opacity={label} stroke={C.pink} strokeWidth={2.5}>
        <line x1={xA} y1={330} x2={xB} y2={330} />
        <line x1={xA} y1={320} x2={xA} y2={340} />
        <line x1={xB} y1={320} x2={xB} y2={340} />
      </g>
      <Txt x={(xA + xB) / 2} y={375} size={34} weight={800} color={C.pink} opacity={label}>
        200 m
      </Txt>
      <Txt x={360} y={70} size={26} weight={700} opacity={prog(t, 3.3, 3.8)}>
        {l.notBug}
      </Txt>
    </Frame>
  );
}

// ---------- 5 · big steps jump a thin crest; DDA does not ----------

const RC = 12; // cell width
const CREST = 31; // crest cell, x 372–384
const R_BASE = 150;
const R_TOP = 48;
const R_CAM: Pt = [40, 22];
const ridgeY = (x: number) => R_CAM[1] + ((x - R_CAM[0]) * 80) / 340;
const ridgeCell = (x: number) => (Math.floor(x / RC) === CREST ? R_TOP : R_BASE);
const BIG = 70;
const bigXs = Array.from({ length: 8 }, (_, k) => R_CAM[0] + BIG * (k + 1)); // 110 … 600
const WRONG_X = R_CAM[0] + ((R_BASE - R_CAM[1]) * 340) / 80; // where the ray meets the base level
const CREST_X = CREST * RC; // where the ray enters the crest cell
const firstCell = Math.floor(R_CAM[0] / RC);

function ridgeGround(oy: number) {
  const l = CREST * RC;
  const r = l + RC;
  return `M 0 ${oy + 205} L 0 ${oy + R_BASE} L ${l} ${oy + R_BASE} L ${l} ${oy + R_TOP} L ${r} ${oy + R_TOP} L ${r} ${oy + R_BASE} L 720 ${oy + R_BASE} L 720 ${oy + 205} Z`;
}

export function RayRidgeFigure({ locale, caption }: FigureProps) {
  const tl = useTimeline(8);
  const { t } = tl;
  const l = L[locale];
  // panel A: big steps
  const aX = Math.min(bigXs[bigXs.length - 1], R_CAM[0] + (BIG * Math.max(0, t - 0.4)) / 0.38);
  const aFail = prog(t, 3.5, 3.9);
  // panel B: cell by cell
  const cells = Math.floor(lerp(firstCell, CREST, prog(t, 4.3, 7.0, linear)));
  const bX = Math.min(CREST_X, (cells + 1) * RC);
  const bDone = prog(t, 7.05, 7.4);
  const oyB = 215;
  const P = (x: number, oy: number): Pt => [x, oy + ridgeY(x)];
  return (
    <Frame figRef={tl.ref} onReplay={tl.replay} locale={locale} caption={caption} viewBox="0 0 720 420" label={`${l.bigSteps}. ${l.dda}.`}>
      <line x1={0} y1={210} x2={720} y2={210} stroke={C.grid} strokeWidth={2} />

      {/* panel A */}
      <path d={ridgeGround(0)} fill={C.ground} stroke={C.groundLine} strokeWidth={2} />
      <Txt x={700} y={34} size={19} weight={700} anchor="end" color={aFail > 0.5 ? C.red : C.ink}>
        {l.bigSteps} {aFail > 0.5 ? "✗" : ""}
      </Txt>
      {aX > R_CAM[0] && <Ray from={R_CAM} to={P(aX, 0)} width={3} />}
      {bigXs.map((x) => {
        if (aX < x) return null;
        const below = ridgeY(x) >= ridgeCell(x);
        return <circle key={x} cx={x} cy={ridgeY(x)} r={5.5} fill={below ? C.pink : C.cyan} />;
      })}
      <g opacity={aFail}>
        <line x1={CREST_X} y1={ridgeY(CREST_X)} x2={CREST_X + RC} y2={ridgeY(CREST_X + RC)} stroke={C.red} strokeWidth={7} strokeLinecap="round" />
        <Txt x={CREST_X + 6} y={ridgeY(CREST_X) - 22} size={28} weight={800} color={C.red}>
          ✗
        </Txt>
        <Pin x={WRONG_X} y={R_BASE} color={C.red} />
        <Txt x={WRONG_X} y={R_BASE + 36} size={16} color={C.red} mono>
          {l.wrongHit}
        </Txt>
      </g>
      <Drone x={R_CAM[0]} y={R_CAM[1] - 10} t={t} s={0.9} />

      {/* panel B */}
      <path d={ridgeGround(oyB)} fill={C.ground} stroke={C.groundLine} strokeWidth={2} />
      {Array.from({ length: 60 }, (_, i) => (
        <line key={i} x1={i * RC} y1={oyB + R_BASE} x2={i * RC} y2={oyB + 205} stroke={C.grid} strokeWidth={1} />
      ))}
      <Txt x={700} y={oyB + 34} size={19} weight={700} anchor="end" color={bDone > 0.5 ? C.green : C.ink} opacity={prog(t, 4.0, 4.4)}>
        {l.dda} {bDone > 0.5 ? "✓" : ""}
      </Txt>
      {t > 4.3 &&
        Array.from({ length: cells - firstCell + 1 }, (_, j) => {
          const i = firstCell + j;
          if (i >= CREST) return null;
          const x = Math.max(R_CAM[0], i * RC);
          const y = ridgeY(x);
          const current = i === cells;
          return (
            <rect
              key={i}
              x={i * RC + 1}
              y={oyB + y}
              width={RC - 2}
              height={R_BASE - y}
              fill={C.cyan}
              opacity={current ? 0.55 : 0.12}
            />
          );
        })}
      {t > 4.3 && <Ray from={P(R_CAM[0], oyB)} to={P(bX, oyB)} width={3} />}
      <g opacity={bDone}>
        <circle cx={CREST_X} cy={oyB + ridgeY(CREST_X)} r={8} fill={C.green} />
        <Pin x={CREST_X} y={oyB + R_TOP} color={C.green} />
      </g>
      <Drone x={R_CAM[0]} y={oyB + R_CAM[1] - 10} t={t} s={0.9} />
    </Frame>
  );
}

// ---------- 6 · grazing angle: one degree, very different errors ----------

const G_GROUND = 290;
const G_X0 = 50;
const G_SCALE = 620 / 1800; // px per metre, same on both axes
const G_H = 200;
const G_CAM: Pt = [G_X0, G_GROUND - G_H * G_SCALE];
const rad = (deg: number) => (deg * Math.PI) / 180;
const groundDistance = (deg: number) => G_H / Math.tan(rad(deg));

export function RayGrazingFigure({ locale, caption }: FigureProps) {
  const tl = useTimeline(4);
  const { t } = tl;
  const l = L[locale];
  const [userAngle, setUserAngle] = useState<number | null>(null);
  const angle = userAngle ?? lerp(45, 8, prog(t, 0.8, 3.6, easeIO));
  const d = groundDistance(angle);
  const d1 = groundDistance(angle - 1);
  const err = Math.round(d1 - d);
  const fmt = (m: number) => Math.round(m).toLocaleString(locale);
  const shown = Math.round(angle * 2) / 2;

  const toGround = (dist: number): Pt => {
    const x = G_X0 + dist * G_SCALE;
    if (x <= 705) return [x, G_GROUND];
    return [705, G_CAM[1] + (705 - G_X0) * (G_GROUND - G_CAM[1]) / (dist * G_SCALE)];
  };
  const hit = toGround(d);
  const hit1 = toGround(d1);
  const arcR = 46;
  const arcEnd: Pt = [G_CAM[0] + arcR * Math.cos(rad(angle)), G_CAM[1] + arcR * Math.sin(rad(angle))];

  const replay = () => {
    setUserAngle(null);
    tl.replay();
  };

  return (
    <Frame
      figRef={tl.ref}
      onReplay={replay}
      locale={locale}
      caption={caption}
      viewBox="0 0 720 340"
      label={`${l.angle} ${shown}°: ${l.error} ${err} m`}
      controls={
        <>
          <input
            type="range"
            min={5}
            max={60}
            step={0.5}
            value={shown}
            aria-label={l.slider}
            onChange={(e) => setUserAngle(Number(e.target.value))}
          />
          <button type="button" className="ray-figure-button" onClick={() => setUserAngle(45)}>
            45°
          </button>
          <button type="button" className="ray-figure-button" onClick={() => setUserAngle(8)}>
            8°
          </button>
        </>
      }
    >
      <Txt x={24} y={46} size={18} anchor="start" color={C.muted}>
        {l.angle}
      </Txt>
      <Txt x={24} y={90} size={40} weight={800} anchor="start" color={C.yellow}>
        {shown}°
      </Txt>
      <Txt x={24} y={124} size={17} anchor="start" mono>
        {l.hitsAt} {fmt(d)} m
      </Txt>
      <Txt x={24} y={150} size={17} anchor="start" color={C.pink} mono>
        {l.oneLess}: {fmt(d1)} m
      </Txt>
      <Txt x={696} y={46} size={18} anchor="end" color={C.muted}>
        {l.error}
      </Txt>
      <Txt x={696} y={98} size={52} weight={800} anchor="end" color={C.pink}>
        {fmt(err)} m
      </Txt>

      <rect x={0} y={G_GROUND} width={720} height={60} fill={C.ground} />
      <line x1={0} y1={G_GROUND} x2={720} y2={G_GROUND} stroke={C.groundLine} strokeWidth={2} />
      {Array.from({ length: 10 }, (_, i) => {
        const x = G_X0 + i * 200 * G_SCALE;
        return (
          <g key={i}>
            <line x1={x} y1={G_GROUND} x2={x} y2={G_GROUND + (i % 2 ? 6 : 10)} stroke={C.muted} strokeWidth={1.5} />
            {i % 2 === 0 && (
              <Txt x={x} y={G_GROUND + 28} size={13} color={C.muted} weight={400} mono>
                {(i * 200).toLocaleString(locale)}
              </Txt>
            )}
          </g>
        );
      })}
      <Txt x={696} y={G_GROUND + 44} size={13} anchor="end" color={C.muted} weight={400} mono>
        {l.scale}
      </Txt>

      <line x1={hit[0]} y1={G_GROUND} x2={hit1[0]} y2={G_GROUND} stroke={C.pink} strokeWidth={7} strokeLinecap="round" opacity={hit1[1] >= G_GROUND - 0.5 ? 0.9 : 0.5} />
      <line x1={G_CAM[0]} y1={G_CAM[1]} x2={G_CAM[0] + 70} y2={G_CAM[1]} stroke={C.muted} strokeWidth={1.5} strokeDasharray="4 4" />
      <path d={`M ${G_CAM[0] + arcR} ${G_CAM[1]} A ${arcR} ${arcR} 0 0 1 ${arcEnd[0]} ${arcEnd[1]}`} fill="none" stroke={C.yellow} strokeWidth={2} />
      <Ray from={G_CAM} to={hit1} color={C.pink} width={2.5} dash="6 6" />
      <Ray from={G_CAM} to={hit} width={3.5} />
      <circle cx={hit[0]} cy={hit[1]} r={6} fill={C.yellow} />
      <Drone x={G_CAM[0]} y={G_CAM[1] - 9} t={t} s={0.9} />
    </Frame>
  );
}

// ---------- 7 · not a point: a region ----------

function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let r = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}
const R_CENTER: Pt = [360, 175];
const SIG_ACROSS = 17;
const SIG_ALONG = 46;
const CHI2_95 = 5.991; // chi-square, 2 degrees of freedom, 95 %
const regionPoints = (() => {
  const rnd = mulberry32(7);
  return Array.from({ length: 240 }, () => {
    const u = Math.max(rnd(), 1e-9);
    const v = rnd();
    const r = Math.sqrt(-2 * Math.log(u));
    const gx = r * Math.cos(2 * Math.PI * v);
    const gy = r * Math.sin(2 * Math.PI * v);
    return {
      x: R_CENTER[0] + gx * SIG_ACROSS,
      y: R_CENTER[1] + gy * SIG_ALONG,
      inside: gx * gx + gy * gy <= CHI2_95,
    };
  });
})();

export function RayRegionFigure({ locale, caption }: FigureProps) {
  const tl = useTimeline(6.6);
  const { t } = tl;
  const l = L[locale];
  const drone: Pt = [360, 385];
  const n = Math.floor(regionPoints.length * prog(t, 0.7, 4.7, linear));
  const e = prog(t, 4.9, 5.7);
  const rx = Math.sqrt(CHI2_95) * SIG_ACROSS;
  const ry = Math.sqrt(CHI2_95) * SIG_ALONG;
  return (
    <Frame figRef={tl.ref} onReplay={tl.replay} locale={locale} caption={caption} viewBox="0 0 720 420" label={l.region}>
      {Array.from({ length: 19 }, (_, i) => (
        <line key={`v${i}`} x1={i * 40} y1={0} x2={i * 40} y2={420} stroke={C.grid} strokeWidth={1} opacity={0.6} />
      ))}
      {Array.from({ length: 11 }, (_, i) => (
        <line key={`h${i}`} x1={0} y1={i * 40} x2={720} y2={i * 40} stroke={C.grid} strokeWidth={1} opacity={0.6} />
      ))}
      <Txt x={24} y={40} size={17} anchor="start" color={C.muted} opacity={prog(t, 0, 0.5)} mono>
        {l.sources}
      </Txt>

      {regionPoints.slice(Math.max(0, n - 6), n).map((p, i, arr) => (
        <line
          key={`r${n - arr.length + i}`}
          x1={drone[0]}
          y1={drone[1] - 8}
          x2={p.x}
          y2={p.y}
          stroke={C.yellow}
          strokeWidth={1.5}
          opacity={((i + 1) / arr.length) * 0.6 * (1 - e)}
        />
      ))}
      {regionPoints.slice(0, n).map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={3.2} fill={p.inside ? C.cyan : C.pink} opacity={0.85} />
      ))}

      <g opacity={e}>
        <ellipse
          cx={R_CENTER[0]}
          cy={R_CENTER[1]}
          rx={rx * (0.7 + 0.3 * e)}
          ry={ry * (0.7 + 0.3 * e)}
          fill={C.green}
          fillOpacity={0.08}
          stroke={C.green}
          strokeWidth={3}
        />
        <circle cx={R_CENTER[0]} cy={R_CENTER[1]} r={5} fill={C.green} />
        <Txt x={R_CENTER[0] + rx + 16} y={R_CENTER[1] + 6} size={20} weight={700} anchor="start" color={C.green}>
          {l.region}
        </Txt>
      </g>

      {/* top-down quadcopter */}
      <g transform={`translate(${drone[0]} ${drone[1]})`}>
        <line x1={-14} y1={-14} x2={14} y2={14} stroke={C.ink} strokeWidth={3} />
        <line x1={-14} y1={14} x2={14} y2={-14} stroke={C.ink} strokeWidth={3} />
        {[
          [-14, -14],
          [14, -14],
          [-14, 14],
          [14, 14],
        ].map(([dx, dy]) => (
          <circle key={`${dx}${dy}`} cx={dx} cy={dy} r={7} fill="none" stroke={C.muted} strokeWidth={2} />
        ))}
        <rect x={-6} y={-6} width={12} height={12} rx={3} fill={C.ink} />
      </g>
      <Txt x={drone[0] + 30} y={drone[1] + 6} size={15} anchor="start" color={C.muted} mono>
        {l.drone}
      </Txt>
    </Frame>
  );
}
