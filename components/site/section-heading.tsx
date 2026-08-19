export function SectionHeading({
  eyebrow,
  title,
}: {
  eyebrow?: string;
  title: string;
}) {
  return (
    <div className="site-section-head">
      <div className="site-section-label">{eyebrow}</div>
      <h2 className="site-section-title">{title}</h2>
    </div>
  );
}
