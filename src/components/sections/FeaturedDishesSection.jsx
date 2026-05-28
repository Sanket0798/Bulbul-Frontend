import { forwardRef, useState, useRef, useEffect } from "react";
import arrowRight from "@/assets/icons/svg/right-arrow-rust.svg";
import DishModal from "@/components/common/DishModal";

const CATEGORIES = ["ALL", "SOUPS", "MAIN", "SALADS"];

const FEATURED_DISHES = [
  { img: "/images/cuisines/truffle-pasta.jpg", name: "Truffle Pasta", desc: "Creamy indulgence finished with rich truffle aroma and parmesan perfection.", category: "MAIN", highlights: ["Chef's Special", "Vegetarian"] },
  { img: "/images/cuisines/butter-chicken.jpg", name: "Butter Chicken", desc: "Slow-cooked tender chicken in a rich, aromatic tomato-cream sauce.", category: "MAIN", highlights: ["Bestseller", "Gluten Free"] },
  { img: "/images/cuisines/crispy-wings.jpg", name: "Crispy Wings", desc: "Golden-fried wings tossed in our signature spice blend.", category: "SALADS", highlights: ["Spicy", "Shareable"] },
  { img: "/images/cuisines/dragon-roll.jpg", name: "Dragon Roll", desc: "A bold fusion roll with avocado, spicy tuna, and crispy tempura.", category: "SOUPS", highlights: ["Fusion", "Contains Seafood"] },
  { img: "/images/cuisines/Img1.jpg", name: "Spiced Lamb Chops", desc: "Tender lamb chops marinated in aromatic spices and grilled to perfection.", category: "MAIN", highlights: ["Signature", "Grilled"] },
  { img: "/images/cuisines/Img2.jpg", name: "Tom Yum Soup", desc: "A fragrant Thai broth with lemongrass, galangal, and fresh prawns.", category: "SOUPS", highlights: ["Spicy", "Contains Seafood"] },
  { img: "/images/cuisines/Img3.jpg", name: "Garden Fresh Salad", desc: "Seasonal greens with citrus vinaigrette and toasted seeds.", category: "SALADS", highlights: ["Vegan", "Light"] },
  { img: "/images/cuisines/Img4.jpg", name: "Paneer Tikka", desc: "Chargrilled cottage cheese with smoky tandoori spices.", category: "MAIN", highlights: ["Vegetarian", "Tandoor"] },
];

const FeaturedDishesSection = forwardRef(function FeaturedDishesSection(_, ref) {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [selectedDish, setSelectedDish] = useState(null);
  const scrollRef = useRef(null);
  const animationRef = useRef(null);

  const filteredDishes = activeCategory === "ALL"
    ? FEATURED_DISHES
    : FEATURED_DISHES.filter((dish) => dish.category === activeCategory);

  // Duplicate dishes for seamless infinite loop
  const loopDishes = [...filteredDishes, ...filteredDishes];

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let scrollPos = 0;
    const speed = 0.5; // pixels per frame

    const animate = () => {
      scrollPos += speed;
      // Reset when first set scrolls out
      const halfWidth = container.scrollWidth / 2;
      if (scrollPos >= halfWidth) {
        scrollPos = 0;
      }
      container.style.transform = `translateX(-${scrollPos}px)`;
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [filteredDishes]);

  // Pause on hover
  const handleMouseEnter = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
  };

  const handleMouseLeave = () => {
    const container = scrollRef.current;
    if (!container) return;

    const currentTransform = container.style.transform;
    const match = currentTransform.match(/translateX\(-?([\d.]+)px\)/);
    let scrollPos = match ? parseFloat(match[1]) : 0;
    const speed = 0.5;

    const animate = () => {
      scrollPos += speed;
      const halfWidth = container.scrollWidth / 2;
      if (scrollPos >= halfWidth) {
        scrollPos = 0;
      }
      container.style.transform = `translateX(-${scrollPos}px)`;
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
  };

  return (
    <section ref={ref} className="w-full py-[110px] overflow-hidden">

      {/* Header — contained */}
      <div className="max-w-container mx-auto px-5 sm:px-8 lg:px-0">
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8 mb-[66px]">
          <div className="flex flex-col gap-2" data-animate>
            <h2 className="font-freight uppercase font-black text-[28px] leading-[37px]">
              <span className="text-olive">Our Menu</span>
            </h2>
            <h2 className="font-freight text-[62px] leading-[73px]">
              <span className="text-rust-dark font-semibold">Our Signature</span>
              <span className="italic font-normal text-gold"> Menu</span>
            </h2>
          </div>
          <div className="flex flex-col gap-3 max-w-[590px]" data-animate>
            <p className="font-freight font-medium text-[19px] leading-[25px] text-olive">
              A carefully curated selection of bold flavors, handcrafted recipes, and timeless favorites made to satisfy every craving. From comforting classics to chef-inspired specialties, every dish is prepared with
            </p>
            {/* Category filter tabs */}
            <div className="flex flex-wrap gap-3">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`font-playfair text-[14px] font-medium tracking-normal uppercase px-6 py-2 rounded-full cursor-pointer transition-all duration-300
                    ${activeCategory === cat
                      ? "bg-rust text-cream border border-rust"
                      : "bg-transparent text-rust border border-rust/40 hover:border-rust"
                    }`}>
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Dish cards — full width, infinite scroll */}
      <div
        className="w-full"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          ref={scrollRef}
          className="flex gap-6 will-change-transform"
          style={{ width: "max-content" }}
        >
          {loopDishes.map(({ img, name, desc, category, highlights }, i) => (
            <div
              key={`${name}-${i}`}
              className="group flex flex-col w-[429px] shrink-0 cursor-pointer"
              onClick={() => setSelectedDish({ img, name, desc, category, highlights })}
            >
              <div className="relative overflow-hidden w-[429px] h-[426px]">
                <img src={img} alt={name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="flex flex-col gap-2 pt-4 pb-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-freight text-[41px] font-semibold text-rust-dark group-hover:text-accent-gold transition-colors duration-300">
                    {name}
                  </h4>
                  <img src={arrowRight} alt="" />
                </div>
                <p className="font-freight-text font-medium text-[21px] leading-[28px] text-terracotta">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dish detail modal */}
      {selectedDish && (
        <DishModal dish={selectedDish} onClose={() => setSelectedDish(null)} />
      )}
    </section>
  );
});

export default FeaturedDishesSection;
