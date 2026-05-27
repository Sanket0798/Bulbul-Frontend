export default function SectionTag({ label, light = false }) {
  const color = light ? "border-accent-gold text-accent-gold" : "border-olive text-olive";
  return (
    <div className="flex items-center gap-3">
      <hr className={`w-12 m-0 opacity-100 ${color}`} />
      <span className={`font-josefin text-caption uppercase tracking-[0.18em] ${color}`}>
        {label}
      </span>
    </div>
  );
}
