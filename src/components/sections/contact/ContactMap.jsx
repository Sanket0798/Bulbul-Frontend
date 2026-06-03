import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { gsap } from "gsap";

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

// Bandra West, Mumbai coordinates
const POSITION = [19.0596, 72.8295];

export default function ContactMap() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current,
        { autoAlpha: 0, y: 30 },
        { autoAlpha: 1, y: 0, duration: 1, ease: "power3.out" }
      );
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
              <span className="text-sm">Bandra West, Mumbai</span>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </section>
  );
}
