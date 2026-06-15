export default function SectionTag({
  index,
  label,
  className = "",
}: {
  index: number;
  label: string;
  className?: string;
}) {
  return (
    <div className={`inline-flex items-center gap-4 ${className}`}>
      <span className="font-mono text-sm text-[#74B026] tracking-[0.15em]">
        {String(index).padStart(2, "0")}
      </span>
      <span className="h-px w-12 bg-[#74B026]/40" />
      <span className="text-xs tracking-[0.3em] uppercase text-[var(--muted-4)] font-light">
        {label}
      </span>
    </div>
  );
}
