import { forwardRef } from "react";
import { Link } from "react-router-dom";
import SectionTag from "@/components/common/SectionTag";
import ArrowIcon from "@/components/common/ArrowIcon";

const MENU_ITEMS = [
  { num: "01", name: "Crispy Wings"   },
  { num: "02", name: "Butter Chicken" },
  { num: "03", name: "Grilled Steak"  },
  { num: "04", name: "Classic Slider" },
  { num: "05", name: "Dragon Roll"    },
];

const MenuSection = forwardRef(function MenuSection(_, ref) {
  return (
    <section ref={ref} className="w-full py-24 bg-charcoal">
      <div className="max-w-page mx-auto px-15">

        {/* Header */}
        <div className="text-center mb-16" data-animate>
          <SectionTag label="Our Bestseller" light />
          <h2 className="font-freight text-h2 text-cream font-normal mt-4 mb-4">
            A Menu Crafted to Delight{" "}
            <span className="italic text-accent-gold">Every Craving</span>
          </h2>
          <p className="font-josefin text-body-xs text-cream/60 max-w-[700px] mx-auto">
            From signature classics to chef-inspired specialties, every dish on
            our menu is prepared with fresh ingredients, rich flavors, and a
            passion for unforgettable dining experiences.
          </p>
        </div>

        {/* List + flanking images */}
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="hidden lg:block relative overflow-hidden rounded-sm shrink-0 w-[410px] h-[410px]" data-animate>
            <img src="/images/index/Room2.webp" alt="Featured dish" className="w-full h-full object-cover" />
          </div>

          <div className="flex-1 w-full" data-animate>
            {MENU_ITEMS.map(({ num, name }, i) => (
              <div key={num}
                className={`group flex items-center justify-between py-5 cursor-pointer transition-colors duration-300
                  ${i < MENU_ITEMS.length - 1 ? "border-b border-cream/10" : ""}`}>
                <h3 className="font-freight text-h2-sm text-cream group-hover:text-accent-gold transition-colors duration-300">
                  {name}
                </h3>
                <span className="font-josefin text-caption text-cream/30 shrink-0 ml-4">[{num}]</span>
              </div>
            ))}
          </div>

          <div className="hidden lg:block relative overflow-hidden rounded-sm shrink-0 w-[410px] h-[410px]" data-animate>
            <img src="/images/index/Room3.webp" alt="Featured dish" className="w-full h-full object-cover" />
          </div>
        </div>

        <div className="flex justify-end mt-10" data-animate>
          <Link to="/rooms" className="btn-outline-white inline-flex items-center gap-3">
            See Full Menu <ArrowIcon />
          </Link>
        </div>
      </div>
    </section>
  );
});

export default MenuSection;
