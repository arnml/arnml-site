import { Renderer } from 'marked'

export const emailRenderer = new Renderer()

// Block-level renderers: must use regular functions (not arrows) so `this.parser`
// is available to resolve inline markdown (bold, italic, links) within the block.

emailRenderer.heading = function ({ tokens, depth }) {
  const text = this.parser.parseInline(tokens)
  const sizes: Record<number, string> = {
    1: 'font-size:22px;',
    2: 'font-size:20px;',
    3: 'font-size:17px;',
    4: 'font-size:15px;',
  }
  return `<h${depth} style="${sizes[depth] ?? ''}font-weight:600;color:#18181b;margin:24px 0 8px;line-height:1.3;">${text}</h${depth}>`
}

emailRenderer.paragraph = function ({ tokens }) {
  const text = this.parser.parseInline(tokens)
  return `<p style="margin:12px 0;color:#3f3f46;font-size:15px;line-height:1.7;">${text}</p>`
}

emailRenderer.link = function ({ href, tokens }) {
  const text = this.parser.parseInline(tokens)
  return `<a href="${href}" style="color:#2563eb;text-decoration:underline;" target="_blank">${text}</a>`
}

emailRenderer.strong = function ({ tokens }) {
  const text = this.parser.parseInline(tokens)
  return `<strong style="color:#18181b;font-weight:600;">${text}</strong>`
}

emailRenderer.em = function ({ tokens }) {
  const text = this.parser.parseInline(tokens)
  return `<em style="color:#52525b;">${text}</em>`
}

emailRenderer.hr = () =>
  '<hr style="border:none;border-top:1px solid #e4e4e7;margin:24px 0;" />'

emailRenderer.list = function ({ items, ordered }) {
  const tag = ordered ? 'ol' : 'ul'
  const inner = items.map((item) => this.listitem(item)).join('')
  return `<${tag} style="margin:12px 0;padding-left:24px;color:#3f3f46;">${inner}</${tag}>`
}

emailRenderer.listitem = function ({ tokens }) {
  const text = this.parser.parse(tokens)
  return `<li style="margin:4px 0;line-height:1.7;">${text}</li>`
}

emailRenderer.codespan = ({ text }) =>
  `<code style="background:#f4f4f5;padding:2px 6px;border-radius:4px;font-size:13px;color:#7c3aed;">${text}</code>`
