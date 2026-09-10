"use client";

import { useEffect, useId, useRef } from "react";

type PostMermaidProps = {
  chart: string;
  caption?: string;
};

/**
 * Renders a static Mermaid diagram authored in this repo. `chart` must be
 * hand-authored source, not user input — the rendered SVG is injected as raw HTML.
 */
export function PostMermaid({ chart, caption }: PostMermaidProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const id = useId().replace(/:/g, "-");

  useEffect(() => {
    let cancelled = false;
    import("mermaid").then(({ default: mermaid }) => {
      mermaid.initialize({ startOnLoad: false, theme: "neutral" });
      mermaid.render(`mermaid-${id}`, chart).then(({ svg }) => {
        if (!cancelled && containerRef.current) {
          containerRef.current.innerHTML = svg;
        }
      });
    });
    return () => {
      cancelled = true;
    };
  }, [chart, id]);

  return (
    <figure className="site-article-diagram">
      <div ref={containerRef} />
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  );
}
