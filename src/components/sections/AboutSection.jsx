import { forwardRef } from "react";
import { Link } from "react-router-dom";
import SectionTag from "@/components/common/SectionTag";
import ArrowIcon from "@/components/common/ArrowIcon";

const AboutSection = forwardRef(function AboutSection(_, ref) {
  return (
    <section ref={ref} className="w-full py-24 overflow-hidden bg-rust/5">
      <div className="max-w-page mx-auto px-15">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

          {/* Image collage */}
          <div className="relative shrink-0 w-full lg:w-[480px] h-[420px] lg:h-[500px]" data-animate>
            <div className="absolute top-0 left-[87px] w-[240px] h-[380px] border-2 border-rust rounded-sm" />
            <div className="absolute top-[24px] left-0 w-[234px] h-[334px] overflow-hidden rounded-sm">
              <img src="/images/index/about.webp" alt="Bulbul restaurant interior"
                className="w-full h-full object-cover" />
            </div>
            <div className="absolute top-[206px] left-[170px] w-[310px] h-[257px] overflow-hidden rounded-sm shadow-xl">
              <img src="/images/index/easystay.webp" alt="Bulbul dining experience"
                className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Text */}
          <div className="flex flex-col gap-6 max-w-[620px]" data-animate>
            <SectionTag label="Our Story" />
            <h2 className="font-freight text-h2 font-normal">
              <span className="text-rust">About </span>
              <span className="italic text-accent-gold">Bulbul</span>
            </h2>
            <p className="font-josefin text-body-sm text-rust/90">
              Bulbul started with a simple thought. Indian food is far broader,
              more regional, and more nuanced than the handful of dishes it is
              often reduced to. Cooking styles change every few hundred
              kilometres, sometimes every few streets. It is shaped as much by
              homes and everyday cooking as it is by tradition.
            </p>
            <Link to="/about" className="btn-outline-primary-home inline-flex items-center gap-3 self-start">
              Read More <ArrowIcon className="stroke-rust" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
});

export default AboutSection;
