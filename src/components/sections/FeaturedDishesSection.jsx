import { forwardRef } from "react";
import SectionTag from "@/components/common/SectionTag";
import ArrowIcon from "@/components/common/ArrowIcon";

const FEATURED_DISHES = [
  { img: "/images/index/Room1.webp", name: "Truffle Pasta",  desc: "Creamy indulgence finished with rich truffle aroma and parmesan perfection." },
  { img: "/images/index/Room2.webp", name: "Butter Chicken", desc: "Slow-cooked tender chicken in a rich, aromatic tomato-cream sauce."          },
  { img: "/images/index/Room3.webp", name: "Crispy Wings",   desc: "Golden-fried wings tossed in our signature spice blend."                     },
  { img: "/images/index/about.webp", name: "Dragon Roll",    desc: "A bold fusion roll with avocado, spicy tuna, and crispy tempura."             },
];

const FeaturedDishesSection = forwardRef(function FeaturedDishesSection(_, ref) {
  return (
    <section ref={ref} className="w-full py-24 bg-charcoal/95">
      <div className="max-w-page mx-auto px-15">

        {/* Header */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8 mb-14">
          <div className="flex flex-col gap-4" data-animate>
            <SectionTag label="Our Menu" light />
            <h2 className="font-freight text-h2 text-cream font-normal">
              Our Signature <span className="italic text-accent-gold">Menu</span>
            </h2>
          </div>
          <div className="flex flex-col gap-4 max-w-[590px]" data-animate>
            <p className="font-josefin text-body-xs text-cream/60">
              A carefully curated selection of bold flavors, handcrafted
              recipes, and timeless favorites made to satisfy every craving.
            </p>
            <div className="flex flex-wrap gap-3">
              {["ALL", "SOUPS", "MAIN", "SALADS"].map((cat, i) => (
                <button key={cat}
                  className={`font-josefin text-caption tracking-widest px-4 py-2 border bg-transparent cursor-pointer transition-all duration-300
                    ${i === 0 ? "border-accent-gold text-accent-gold" : "border-cream/20 text-cream/50"}`}>
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Dish cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURED_DISHES.map(({ img, name, desc }) => (
            <div key={name} className="group flex flex-col" data-animate>
              <div className="relative overflow-hidden h-80">
                <img src={img} alt={name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="flex flex-col gap-2 pt-4 pb-2 border-b border-cream/10">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-freight text-h4 text-cream group-hover:text-accent-gold transition-colors duration-300">
                    {name}
                  </h4>
                  <ArrowIcon className="stroke-accent-gold shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" size={16} />
                </div>
                <p className="font-josefin text-body-xs text-cream/50">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

export default FeaturedDishesSection;
