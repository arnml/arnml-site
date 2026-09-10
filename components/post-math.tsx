import katex from "katex";

type PostMathProps = {
  math: string;
  display?: boolean;
};

/**
 * Renders static, hand-authored LaTeX for blog posts at build/request time.
 * Only pass source content authored in this repo — never user input — since
 * the KaTeX output is injected as raw HTML.
 */
export function PostMath({ math, display = false }: PostMathProps) {
  const html = katex.renderToString(math, {
    throwOnError: false,
    displayMode: display,
  });
  const Tag = display ? "div" : "span";
  return (
    <Tag
      className={display ? "site-equation" : "site-equation-inline"}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
