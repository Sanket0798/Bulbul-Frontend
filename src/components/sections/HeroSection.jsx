import { Link } from "react-router-dom";
import brandLogo from "@/assets/icons/svg/brand-white-logo.svg";
import arrowRight from "@/assets/icons/svg/right-arrow.svg";

export default function HeroSection() {
    return (
        <section className="relative w-full overflow-hidden flex items-end min-h-screen">

            {/* Background image */}
            <img src="/images/pages/home/hero-banner.png" alt=""
                className="absolute inset-0 w-full h-full object-cover" />

            {/* Gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-black/50" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/40" />

            {/* Top accent line */}
            <div className="absolute top-0 left-0 right-0 h-[3px] z-10 accent-line-rust-gold" />

            {/* Content */}
            <div className="relative z-10 w-full px-5 sm:px-8 lg:px-[60px] pb-20 lg:pb-[67px]">
                <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 lg:gap-20">

                    {/* Left column — heading */}
                    <div className="max-w-[630px]">
                        {/* Bird icon */}
                        <img src={brandLogo} alt=""
                            className="w-24" />

                        <span className="font-freight text-base leading-[22px] uppercase font-black mt-1 tracking-widest text-accent-gold">
                            Handcrafted Goodness
                        </span>
                        <h1 className="font-freight text-h1 text-cream font-black text-[63px] mt-1">
                            Flavors That Stay with You{" "}
                            <span className="italic font-medium text-accent-gold">Forever</span>
                        </h1>
                    </div>

                    {/* Right column — quote + CTA */}
                    <div className="max-w-[574px] flex flex-col gap-4">
                        <p className="font-freight font-semibold text-base leading-[25px] text-cream tracking-[1.42px]">
                            “We’ve grown up with a version of Indian food shaped by homes and everyday cooking, the kind that rarely makes it onto restaurant menus. At Bulbul, that is what comes to the table, gathered along the way and shared with you.”
                        </p>
                        <Link to="/rooms"
                            className="inline-flex items-center gap-1 font-semibold leading-[25px] self-start px-8 py-[9px] bg-primary text-cream font-freight text-[18px] transition-all duration-300 hover:bg-rust-dark rounded">
                            View our Menu <img src={arrowRight} alt="" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
