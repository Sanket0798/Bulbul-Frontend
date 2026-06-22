import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { gsap, NO_PREFERENCE, REDUCED_MOTION } from "@/utils/animations";

// Custom marker icon matching brand colors
const customMarker = new L.DivIcon({
  className: "custom-map-marker",
  html: `
    <svg width="36" height="48" viewBox="0 0 36 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 0C8.06 0 0 8.06 0 18c0 13.5 18 30 18 30s18-16.5 18-30C36 8.06 27.94 0 18 0z" fill="#852C28"/>
      <circle cx="18" cy="18" r="8" fill="#EAB932"/>
    </svg>
  `,
  iconSize: [36, 48],
  iconAnchor: [18, 48],
  popupAnchor: [0, -48],
});

// 25 Tudor St, London EC4Y 0DD coordinates (approximate)
const POSITION = [51.5127, -0.1066];

export default function ContactMap() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add(NO_PREFERENCE, () => {
        gsap.fromTo(
          sectionRef.current,
          { autoAlpha: 0, scale: 1.04 },
          { autoAlpha: 1, scale: 1, duration: 1.2, ease: "power3.out" }
        );
      });
      mm.add(REDUCED_MOTION, () => gsap.set(sectionRef.current, { autoAlpha: 1, clearProps: "transform" }));
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full relative">
      <MapContainer
        center={POSITION}
        zoom={15}
        scrollWheelZoom={false}
        className="w-full h-[400px] md:h-[500px] lg:h-[750px] z-0"
        attributionControl={false}
      >
        {/* Dark/grayscale tiles matching brand aesthetic */}
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        <Marker position={POSITION} icon={customMarker}>
          <Popup>
            <div className="text-center">
              <strong className="text-base">Bulbul Restaurant</strong>
              <br />
              <span className="text-sm">25 Tudor St, London EC4Y 0DD</span>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </section>
  );
}
