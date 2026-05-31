const GALLERY = [
  "/images/gallery/gallery1.webp",
  "/images/gallery/gallery2.webp",
  "/images/gallery/gallery3.webp",
  "/images/gallery/gallery4.webp",
];

export default function GroupGalleryStrip() {
  return (
    <section className="w-full bg-charcoal/95">
      <div className="grid grid-cols-2 md:grid-cols-4">
        {GALLERY.map((src, i) => (
          <div key={i} className="group relative overflow-hidden h-[300px]">
            <img src={src} alt={`Group dining ${i + 1}`}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-rust/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        ))}
      </div>
    </section>
  );
}
