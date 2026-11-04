"use client";

import { useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { Pause, Play } from "lucide-react";
import type { Locale } from "@/lib/site/locales";
import styles from "./whiteboard-hero.module.css";

const copy = {
  en: {
    description: "An adviser turns scattered ideas on a whiteboard into an organized system diagram.",
    pause: "Pause animation",
    resume: "Resume animation",
  },
  es: {
    description: "Un asesor transforma ideas dispersas en una pizarra en un diagrama de sistema organizado.",
    pause: "Pausar animación",
    resume: "Reanudar animación",
  },
  pt: {
    description: "Um consultor transforma ideias dispersas em um quadro em um diagrama de sistema organizado.",
    pause: "Pausar animação",
    resume: "Retomar animação",
  },
};

// Final center, scattered center, scattered rotation, and accent color.
const nodes: [number, number, number, number, number, boolean][] = [
  [349, 110, 267, 144, -17, true],
  [261, 169, 410, 122, 19, false],
  [349, 169, 301, 241, -24, false],
  [437, 169, 440, 228, 12, false],
  [261, 226, 351, 161, 28, false],
  [349, 226, 252, 278, -12, true],
  [437, 226, 399, 278, -26, false],
  [261, 283, 249, 208, 16, false],
  [349, 283, 365, 302, 22, false],
  [437, 283, 423, 177, -18, false],
];

const connections = [
  "M349 123V140H261V156", "M349 123V156", "M349 123V140H437V156",
  "M261 182V213", "M349 182V213", "M437 182V213",
  "M261 239V270", "M349 239V270", "M437 239V270",
];

export function WhiteboardHero({ locale }: { locale: Locale }) {
  const [paused, setPaused] = useState(false);
  const scene = useRef<HTMLDivElement>(null);
  const text = copy[locale];

  function resetDepth() {
    scene.current?.style.removeProperty("--pointer-x");
    scene.current?.style.removeProperty("--pointer-y");
  }

  function moveDepth(event: PointerEvent<HTMLDivElement>) {
    if (paused || event.pointerType === "touch" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--pointer-x", String((event.clientX - bounds.left) / bounds.width - 0.5));
    event.currentTarget.style.setProperty("--pointer-y", String((event.clientY - bounds.top) / bounds.height - 0.5));
  }

  return (
    <div className={styles.hero} data-paused={paused}>
      <div ref={scene} className={styles.scene} onPointerMove={moveDepth} onPointerLeave={resetDepth}>
        <svg className={styles.art} viewBox="0 0 560 520" width="560" height="520" role="img" aria-label={text.description}>
          <rect x="40" y="34" width="480" height="452" rx="12" fill="#e8e1ed" />
          <path d="M40 34H195L123 486H40Z" fill="#f0e9e3" />
          <g className={styles.board}>
            <rect x="187" y="75" width="297" height="258" rx="4" fill="#faf8fa" stroke="#c6bbd1" strokeWidth="2" />
            <g className={styles.tangles} fill="none" strokeWidth="1.2">
              <path d="M267 144L399 278L301 241L410 122L249 208L423 177L252 278L440 228L351 161L365 302" stroke="#b8a9ca" />
              <path d="M249 208Q382 93 440 228T267 144M252 278Q332 171 423 177" stroke="#c9b8d6" />
            </g>
            <g fill="none" stroke="#3b3154" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              {connections.map((d) => <path key={d} d={d} className={styles.connection} pathLength="1" />)}
            </g>
            {nodes.map(([x, y, scatteredX, scatteredY, angle, accent]) => (
              <g key={`${x}-${y}`} className={styles.node} style={{
                "--center-x": `${x}px`, "--center-y": `${y}px`,
                "--offset-x": `${scatteredX - x}px`, "--offset-y": `${scatteredY - y}px`,
                "--angle": `${angle}deg`,
              } as CSSProperties}>
                <rect x={x - 25} y={y - 13} width="50" height="26" rx="4" fill={accent ? "#eed1c6" : "#ece5f3"} stroke={accent ? "#d97860" : "#a89abf"} strokeWidth="1.4" />
                <path d={`M${x - 14} ${y - 3}H${x + 14}M${x - 14} ${y + 4}H${x + 5}`} fill="none" stroke={accent ? "#b26b58" : "#aa9abd"} strokeWidth="1.6" strokeLinecap="round" />
              </g>
            ))}
          </g>
          <ellipse cx="200" cy="462" rx="128" ry="15" fill="#c5b8d3" opacity=".4" />
          <g className={styles.person}>
            <g className={styles.breathe}>
              <path d="M110 485L120 330Q134 281 188 284Q225 282 249 313L257 485Z" fill="#544766" />
              <g className={styles.arm}>
                <path d="M220 306Q242 295 260 321L291 357L341 299L361 313L302 396Q291 409 276 399L227 354Q215 338 220 306Z" fill="#544766" />
                <path d="M340 300L356 284Q364 275 371 282L365 298L361 313Z" fill="#d7b5aa" />
                <path d="M359 286L378 266" stroke="#3b3154" strokeWidth="3" strokeLinecap="round" />
                <path d="M240 331L285 380L345 313" fill="none" stroke="#796987" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </g>
              <g className={styles.head}>
                <path d="M167 270L164 298Q190 318 210 293L208 262Z" fill="#c8a29d" />
                <ellipse cx="188" cy="228" rx="43" ry="52" fill="#d7b5aa" />
                <path d="M145 230Q128 169 179 170Q235 160 234 218L216 217L207 202Q177 218 149 207Z" fill="#382f48" />
                <ellipse className={styles.eye} cx="178" cy="229" rx="2" ry="3" fill="#54415b" />
                <ellipse className={styles.eye} cx="211" cy="227" rx="2" ry="3" fill="#54415b" />
                <path d="M192 232L190 244H195" fill="none" stroke="#b98f87" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M184 255Q194 261 203 253" fill="none" stroke="#9b7373" strokeWidth="1.5" strokeLinecap="round" />
              </g>
              <path d="M153 337L142 417M222 367L226 436" fill="none" stroke="#796987" strokeWidth="2" strokeLinecap="round" />
            </g>
          </g>
        </svg>
      </div>
      <button className={styles.toggle} type="button" onClick={() => { resetDepth(); setPaused(!paused); }}>
        {paused ? <Play size={14} aria-hidden="true" /> : <Pause size={14} aria-hidden="true" />}
        {paused ? text.resume : text.pause}
      </button>
    </div>
  );
}
