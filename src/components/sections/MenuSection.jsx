import { forwardRef } from "react";
import { Link } from "react-router-dom";

const MENU_ITEMS = [
  { num: "01", name: "Crispy", highlight: "Wings" },
  { num: "02", name: "Butter", highlight: "Chicken" },
  { num: "03", name: "Grilled", highlight: "Steak" },
  { num: "04", name: "Classic", highlight: "Slider" },
  { num: "05", name: "Dragon", highlight: "Roll" },
];

const MenuSection = forwardRef(function MenuSection(_, ref) {
  return (
    <section ref={ref} className="w-full pt-[40px] pb-[100px]">
      <div className="max-w-[1207px] mx-auto px-5 sm:px-8 lg:px-0">

        {/* Header */}
        <div className="text-center mb-10" data-animate>
          <h3 className="font-freight font-black text-[28px] leading-[37px] uppercase text-terracotta mb-2">
            Our Bestseller
          </h3>
          <h2 className="font-freight text-[54px] leading-[63px] font-semibold text-rust-dark mb-4">
            A Menu Crafted to Delight{" "}
            <span className="italic font-normal text-gold">Every Craving</span>
          </h2>
          <p className="font-freight-text font-medium text-[19px] leading-[25px] text-terracotta max-w-[920px] mx-auto">
            From signature classics to chef-inspired specialties, every dish on our menu is prepared with fresh ingredients, rich flavors, and a passion for unforgettable dining experiences.
          </p>
        </div>

        {/* Content — images + menu list */}
        <div className="relative flex items-center justify-center" data-animate>

          {/* Left image — tilted */}
          <div className="hidden lg:block absolute left-5 top-[195px] -translate-y-1/2 w-[353px] h-[353px] rotate-[8deg] overflow-hidden shadow-xl z-10">
            <img src="/images/cuisines/Img1.jpg" alt="Featured dish"
              className="w-full h-full object-cover" />
          </div>

          {/* Center — menu list */}
          <div className="flex flex-col items-center gap-1 py-4 z-20">
            {MENU_ITEMS.map(({ num, name, highlight }) => (
              <div key={num} className="flex items-start gap-3 group cursor-pointer">
                <h3 className="font-freight text-[60px] leading-[85px] font-medium text-rust-dark transition-colors duration-300 group-hover:text-gold">
                  {name}{" "}
                  <span className="italic text-gold group-hover:text-rust-dark transition-colors duration-300">
                    {highlight}
                  </span>
                </h3>
                <span className="font-freight-text font-medium text-[19px] leading-[25px]">[{num}]</span>
              </div>
            ))}
          </div>

          {/* Right image — tilted */}
          <div className="hidden lg:block absolute right-7 top-[235px] -translate-y-1/2 w-[353px] h-[353px] -rotate-[8deg] overflow-hidden shadow-xl z-10">
            <img src="/images/cuisines/Img2.jpg" alt="Featured dish"
              className="w-full h-full object-cover" />
          </div>

          {/* See Full Menu circle button */}
          <Link to="/rooms"
            className="hidden lg:flex absolute right-[60px] -top-[10px] w-[100px] h-[100px] rounded-full bg-rust items-center justify-center text-center z-30 hover:bg-rust-dark transition-colors duration-300">
            <span className="font-freight-text text-sm leading-[16px] text-cream font-semibold">
              See Full<br />Menu
            </span>
          </Link>
        </div>

      </div>
    </section>
  );
});

export default MenuSection;
