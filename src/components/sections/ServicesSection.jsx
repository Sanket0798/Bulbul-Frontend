import { forwardRef } from "react";
import { Link } from "react-router-dom";
// import SectionTag from "@/components/common/SectionTag";
import arrowRight from "@/assets/icons/svg/right-arrow.svg";
import aboutVector from "@/assets/icons/svg/About-vector.svg";

const SERVICE_CARDS = [
  { img: "/images/shared/food/lamb-kadai.png", title: "Explore Menu", subtitle: "Elegant dishes preview", to: "/rooms" },
  { img: "/images/shared/people/restaurant.jpg", title: "Reservations", subtitle: "Reserve table instantly", to: "/contact" },
  { img: "/images/shared/people/delivery.jpg", title: "Online Ordering", subtitle: "Order your favorites", to: "/rooms" },
];

const ServicesSection = forwardRef(function ServicesSection(_, ref) {
  return (
    <section ref={ref} className="w-full pt-[79px] pb-[92px] bg-gradient-to-b from-transparent to-[#787C1D]/10">
      <div className="max-w-container mx-auto px-15">

        {/* Header row */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-10 mb-16">
          <div className="flex flex-col max-w-[510px]" data-animate>
            {/* <SectionTag label="Our Service" /> */}
            <h2 className="font-freight uppercase font-black text-[28px] leading-[37px] mb-2">
              <span className="text-olive">Our Service</span>
            </h2>
            <h2 className="font-freight text-[62px] leading-[73px] mb-6">
              <span className="text-rust-dark font-semibold">The Heart of Great Food &amp;</span>
              <span className="italic font-normal text-gold"> Hospitality</span>
            </h2>
            {/* <Link to="/rooms" className="btn-outline-primary-home inline-flex items-center gap-3 self-start bg-rust text-cream rounded">
              View our Menu <img src={arrowRight} alt="" />
            </Link> */}
            <Link to="/rooms"
              className="inline-flex items-center gap-1 font-semibold leading-[25px] self-start px-8 py-[9px] bg-primary text-cream font-freight text-lg transition-all duration-300 hover:bg-rust-dark rounded">
              View our Menu <img src={arrowRight} alt="" />
            </Link>
          </div>

          <div className="flex flex-col max-w-[587px]" data-animate>
            <p className="font-freight font-medium text-[19px] leading-[25px] text-olive mb-8">
              The menu moves across regions, bringing together dishes, references, and recipes drawn from homes, street-side cooking, and everyday meals. It is presented in a way that feels lighter and more suited to how people like to eat today. It is built around small plates, so you can try more, share across the table, and come back to the things you like.
            </p>
            <div className="flex flex-row gap-11">
              {["Culinary Excellence", "Rich Cultural Flavors", "Inspired Global Cuisine"].map((tag) => (
                <div key={tag} className="flex items-center gap-2">
                  <img src={aboutVector} alt="" />
                  <span className="font-freight text-base leading-[25px] font-semibold text-gold">{tag}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Service cards */}
        <div className="max-w-[1311px] mx-auto flex flex-row justify-between">
          {SERVICE_CARDS.map(({ img, title, subtitle, to }) => (
            <Link key={title} to={to}
              className="group relative overflow-hidden block no-underline w-[391px] h-[436px]"
              data-animate>
              <img src={img} alt={title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 overlay-card-bottom transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 px-[21px] py-[31px] flex flex-col gap-1">
                <span className="font-freight font-black text-[29px] leading-[39px] text-cream">{title}</span>
                <span className="font-freight-text italic text-body text-cream leading-[21px]">{subtitle}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
});

export default ServicesSection;
