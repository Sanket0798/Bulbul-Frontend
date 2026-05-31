export default function FormField({ label, placeholder, type = "text", required = false }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-josefin text-body-xs text-cream/70">
        {label}{required && <span className="text-accent-gold"> *</span>}
      </label>
      <input type={type} placeholder={placeholder} required={required}
        className="form-field" />
    </div>
  );
}
