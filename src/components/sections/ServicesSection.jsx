import { forwardRef } from "react";
import { Link } from "react-router-dom";
import SectionTag from "@/components/common/SectionTag";
import ArrowIcon from "@/components/common/ArrowIcon";

const SERVICE_CARDS = [
  { img: "/images/index/services1.webp", title: "Explore Menu",    subtitle: "Elegant dishes preview",  to: "/rooms"   },
  { img: "/images/index/services2.webp", title: "Reservations",    subtitle: "Reserve table instantly", to: "/contact" },
  { img: "/images/index/Room1.webp",     title: "Online Ordering", subtitle: "Order your favorites",    to: "/rooms"   },
];

const ServicesSection = forwardRef(function ServicesSection(_, ref) {
  return (
    <section ref={ref} className="w-full py-24 bg-olive/5">
      <div className="max-w-page mx-auto px-15">

        {/* Header row */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-10 mb-16">
          <div className="flex flex-col gap-4 max-w-[520px]" data-animate>
            <SectionTag label="Our Service" />
            <h2 className="font-freight text-h2 font-normal">
              <span className="text-rust">The Heart of Great Food &amp; </span>
              <span className="italic text-accent-gold">Hospitality</span>
            </h2>
            <Link to="/rooms" className="btn-outline-primary-home inline-flex items-center gap-3 self-start">
              View our Menu <ArrowIcon className="stroke-rust" />
            </Link>
          </div>

          <div className="flex flex-col gap-5 max-w-[590px]" data-animate>
            <p className="font-josefin text-body-sm text-olive">
              The menu moves across regions, bringing together dishes,
              references, and recipes drawn from homes, street-side cooking,
              and everyday meals. It is presented in a way that feels lighter
              and more suited to how people like to eat today.
            </p>
            <div className="flex flex-wrap gap-6">
              {["Culinary Excellence", "Rich Cultural Flavors", "Inspired Global Cuisine"].map((tag) => (
                <div key={tag} className="flex items-center gap-2">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M9 1L11.09 6.26L17 7.27L13 11.14L14.18 17L9 14.27L3.82 17L5 11.14L1 7.27L6.91 6.26L9 1Z"
                      fill="#EAB932" stroke="#EAB932" strokeWidth="1" strokeLinejoin="round" />
                  </svg>
                  <span className="font-josefin text-body-xs font-semibold text-accent-gold">{tag}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Service cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SERVICE_CARDS.map(({ img, title, subtitle, to }) => (
            <Link key={title} to={to}
              className="group relative overflow-hidden block no-underline h-[436px]"
              data-animate>
              <img src={img} alt={title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 overlay-card-bottom transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 px-5 py-8 flex flex-col gap-1">
                <span className="font-freight text-h4 text-cream">{title}</span>
                <span className="font-freight italic text-body text-cream/70">{subtitle}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
});

export default ServicesSection;
