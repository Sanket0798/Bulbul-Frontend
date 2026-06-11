import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import arrowRight from "@/assets/icons/svg/right-arrow.svg";

gsap.registerPlugin(ScrollTrigger);

export default function GroupEnquiryForm() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const formRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    guests: "",
    notes: "",
    consent: false,
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        imageRef.current,
        { autoAlpha: 0, x: -50 },
        {
          autoAlpha: 1, x: 0, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        }
      );

      gsap.fromTo(
        formRef.current,
        { autoAlpha: 0, y: 40 },
        {
          autoAlpha: 1, y: 0, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: formRef.current, start: "top 85%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log("Enquiry submitted:", formData);
  };

  return (
    <section ref={sectionRef} className="w-full pt-10 lg:pt-[67px] pb-10 lg:pb-[57px]">
      <div className="max-w-container mx-auto px-5 sm:px-8 lg:px-0">
        <div className="flex flex-col lg:flex-row items-stretch gap-8 lg:gap-9">

          {/* Left — Image */}
          <div ref={imageRef} className="w-full lg:w-[717px] overflow-hidden rounded-sm shrink-0">
            <img
              src="/images/shared/team/chef-making-pizza.png"
              alt="Friends enjoying a meal"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right — Form */}
          <div ref={formRef} className="flex-1">
            <span className="font-freight uppercase font-black text-[15px] leading-[14px] tracking-widest text-terracotta block mb-[10px]">
              Contact Us
            </span>

            <h2 className="font-freight text-[32px] sm:text-[38px] lg:text-[43px] leading-[1.1] font-black text-rust mb-5">
              Make an Enquiry
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5 sm:gap-6">
              {/* Name */}
              <div className="flex flex-col gap-1">
                <label className="font-freight font-semibold text-base sm:text-lg leading-6 text-terracotta">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter you full name"
                  className="w-full border border-[#35370E] bg-transparent px-4 py-3 font-freight font-semibold text-base sm:text-lg leading-6 text-rust-dark placeholder:text-[#737373] outline-none focus:border-rust transition-colors duration-300"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1">
                <label className="font-freight font-semibold text-base sm:text-lg leading-6 text-terracotta">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full border border-[#35370E] bg-transparent px-4 py-3 font-freight font-semibold text-base sm:text-lg leading-6 text-rust-dark placeholder:text-[#737373] outline-none focus:border-rust transition-colors duration-300"
                />
              </div>

              {/* Phone */}
              <div className="flex flex-col gap-1">
                <label className="font-freight font-semibold text-base sm:text-lg leading-6 text-terracotta">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  className="w-full border border-[#35370E] bg-transparent px-4 py-3 font-freight font-semibold text-base sm:text-lg leading-6 text-rust-dark placeholder:text-[#737373] outline-none focus:border-rust transition-colors duration-300"
                />
              </div>

              {/* Date + Guests row */}
              <div className="flex flex-col sm:flex-row gap-5 sm:gap-4">
                <div className="flex flex-col gap-1 flex-1">
                  <label className="font-freight font-semibold text-base sm:text-lg leading-6 text-terracotta">
                    Date of Booking
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full border border-[#35370E] bg-transparent px-4 py-3 font-freight font-semibold text-base sm:text-lg leading-6 text-rust-dark placeholder:text-[#737373] outline-none focus:border-rust transition-colors duration-300"
                  />
                </div>
                <div className="flex flex-col gap-1 flex-1">
                  <label className="font-freight font-semibold text-base sm:text-lg leading-6 text-terracotta">
                    Number of guests
                  </label>
                  <input
                    type="number"
                    name="guests"
                    value={formData.guests}
                    onChange={handleChange}
                    placeholder="Enter number of guests"
                    min="1"
                    className="w-full border border-[#35370E] bg-transparent px-4 py-3 font-freight font-semibold text-base sm:text-lg leading-6 text-rust-dark placeholder:text-[#737373] outline-none focus:border-rust transition-colors duration-300"
                  />
                </div>
              </div>

              {/* Notes */}
              <div className="flex flex-col gap-1">
                <label className="font-freight font-semibold text-base sm:text-lg leading-6 text-terracotta">
                  Notes
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Dietary preferences, occasion, or anything you'd like us to know"
                  rows={4}
                  className="w-full border border-[#35370E] bg-transparent px-4 py-3 font-freight font-semibold text-base sm:text-lg leading-6 text-rust-dark placeholder:text-[#737373] outline-none focus:border-rust transition-colors duration-300 resize-none"
                />
              </div>

              {/* Consent checkbox */}
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="consent"
                  checked={formData.consent}
                  onChange={handleChange}
                  className="mt-1 w-5 h-5 rounded-none bg-transparent shrink-0 accent-rust"
                />
                <span className="font-freight font-semibold text-base sm:text-lg leading-6 text-terracotta">
                  I consent to receive occasional emails from Bulbul, including updates, events, and news, in line with our Privacy Policy.
                </span>
              </label>

              {/* Submit */}
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-1 font-semibold leading-[25px] self-start px-6 sm:px-8 py-[10px] bg-primary text-cream font-freight text-[16px] sm:text-[17px] transition-all duration-300 hover:bg-rust-dark rounded cursor-pointer"
              >
                Subscribe <img src={arrowRight} alt="" />
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
