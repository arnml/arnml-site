export function SectionHeading({ eyebrow, title }: { eyebrow?: string; title: string }) {
  return <div className="mb-8"><p className="mb-3 font-mono text-xs uppercase tracking-[0.18em] text-blue-700 dark:text-blue-400">{eyebrow}</p><h2 className="max-w-2xl text-3xl font-medium tracking-tight text-zinc-950 dark:text-zinc-50">{title}</h2></div>
}
