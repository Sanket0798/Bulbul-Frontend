import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import arrowRight from "@/assets/icons/svg/right-arrow.svg";

gsap.registerPlugin(ScrollTrigger);

const POSITION_OPTIONS = [
  "Floor Manager",
  "Head Chef",
  "Sous Chef",
  "Bartender",
  "Server",
  "Kitchen Porter",
];

export default function CareersApplicationForm() {
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const imageRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    resume: null,
    coverLetter: null,
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        formRef.current,
        { autoAlpha: 0, x: -40 },
        {
          autoAlpha: 1, x: 0, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        }
      );

      gsap.fromTo(
        imageRef.current,
        { autoAlpha: 0, x: 40 },
        {
          autoAlpha: 1, x: 0, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: imageRef.current, start: "top 80%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({ ...prev, [name]: files[0] || null }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Application submitted:", formData);
  };

  return (
    <section ref={sectionRef} className="w-full py-[60px] lg:py-[100px] bg-bg">
      <div className="max-w-container mx-auto px-5 sm:px-8 lg:px-0">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-stretch">

          {/* Left — Form */}
          <div ref={formRef} className="flex-1 lg:max-w-[480px]">
            <span className="font-freight uppercase font-black text-[13px] sm:text-[14px] leading-[18px] tracking-widest text-terracotta block mb-2">
              Application Form
            </span>

            <h2 className="font-freight text-[36px] sm:text-[44px] lg:text-[50px] leading-[42px] sm:leading-[50px] lg:leading-[56px] font-black text-rust-dark mb-3">
              Make an Application
            </h2>

            <p className="font-freight font-semibold text-[15px] sm:text-[16px] leading-[22px] text-terracotta mb-8">
              If you'd like to be part of the team, we'd love to hear from you.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* Name */}
              <div className="flex flex-col gap-1">
                <label className="font-freight font-semibold text-[14px] sm:text-[15px] leading-[20px] text-rust-dark italic">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter you full name"
                  className="w-full border border-terracotta/40 bg-transparent px-4 py-3 font-freight text-[15px] sm:text-[16px] leading-[22px] text-charcoal placeholder:text-charcoal/40 rounded-sm outline-none focus:border-rust transition-colors duration-300"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1">
                <label className="font-freight font-semibold text-[14px] sm:text-[15px] leading-[20px] text-rust-dark italic">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full border border-terracotta/40 bg-transparent px-4 py-3 font-freight text-[15px] sm:text-[16px] leading-[22px] text-charcoal placeholder:text-charcoal/40 rounded-sm outline-none focus:border-rust transition-colors duration-300"
                />
              </div>

              {/* Phone */}
              <div className="flex flex-col gap-1">
                <label className="font-freight font-semibold text-[14px] sm:text-[15px] leading-[20px] text-rust-dark italic">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  className="w-full border border-terracotta/40 bg-transparent px-4 py-3 font-freight text-[15px] sm:text-[16px] leading-[22px] text-charcoal placeholder:text-charcoal/40 rounded-sm outline-none focus:border-rust transition-colors duration-300"
                />
              </div>

              {/* Position */}
              <div className="flex flex-col gap-1">
                <label className="font-freight font-semibold text-[14px] sm:text-[15px] leading-[20px] text-rust-dark italic">
                  Position Applying For
                </label>
                <select
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  className="w-full border border-terracotta/40 bg-transparent px-4 py-3 font-freight text-[15px] sm:text-[16px] leading-[22px] text-charcoal rounded-sm outline-none focus:border-rust transition-colors duration-300 appearance-none cursor-pointer"
                  style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23852C28' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 16px center' }}
                >
                  <option value="">Select</option>
                  {POSITION_OPTIONS.map((pos) => (
                    <option key={pos} value={pos}>{pos}</option>
                  ))}
                </select>
              </div>

              {/* Resume upload */}
              <div className="flex flex-col gap-1">
                <label className="font-freight font-semibold text-[14px] sm:text-[15px] leading-[20px] text-rust-dark italic">
                  Upload Resume
                </label>
                <div className="w-full border border-terracotta/40 bg-transparent px-4 py-3 rounded-sm">
                  <input
                    type="file"
                    name="resume"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx"
                    className="font-freight text-[14px] sm:text-[15px] text-charcoal file:mr-3 file:px-3 file:py-1 file:border-0 file:bg-cream file:text-rust-dark file:font-freight file:font-semibold file:text-[13px] file:rounded file:cursor-pointer"
                  />
                </div>
              </div>

              {/* Cover Letter upload */}
              <div className="flex flex-col gap-1">
                <label className="font-freight font-semibold text-[14px] sm:text-[15px] leading-[20px] text-rust-dark italic">
                  Upload Cover Letter
                </label>
                <div className="w-full border border-terracotta/40 bg-transparent px-4 py-3 rounded-sm">
                  <input
                    type="file"
                    name="coverLetter"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx"
                    className="font-freight text-[14px] sm:text-[15px] text-charcoal file:mr-3 file:px-3 file:py-1 file:border-0 file:bg-cream file:text-rust-dark file:font-freight file:font-semibold file:text-[13px] file:rounded file:cursor-pointer"
                  />
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-1 font-semibold leading-[25px] self-start px-8 py-[10px] bg-primary text-cream font-freight text-[16px] sm:text-[17px] transition-all duration-300 hover:bg-rust-dark rounded cursor-pointer mt-2"
              >
                Submit Application <img src={arrowRight} alt="" />
              </button>
            </form>
          </div>

          {/* Right — Image */}
          <div ref={imageRef} className="flex-1 hidden lg:block">
            <div className="w-full h-full min-h-[500px] overflow-hidden rounded-sm">
              <img
                src="/images/shared/team/business-people-three.png"
                alt="Handshake — join our team"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
