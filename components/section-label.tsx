export const ACCENT = "#a3e635";

export function SectionLabel({ num, label, id }: { num: string; label: string; id?: string }) {
  return (
    <div className="flex items-baseline gap-3 border-b border-neutral-800 pb-3">
      <span style={{ fontFamily: "var(--font-mono)", color: ACCENT }} className="text-xs">
        §{num}
      </span>
      <h2
        id={id}
        style={{ fontFamily: "var(--font-mono)" }}
        className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-300"
      >
        {label}
      </h2>
    </div>
  );
}
