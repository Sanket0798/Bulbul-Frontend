import { useEffect, useRef, useState } from "react";
import { gsap, splitLines, afterFonts, NO_PREFERENCE, REDUCED_MOTION } from "@/utils/animations";
import arrowRight from "@/assets/icons/svg/right-arrow.svg";

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
  const headingRef = useRef(null);

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
      const mm = gsap.matchMedia();

      mm.add(NO_PREFERENCE, () => afterFonts(sectionRef, () => {
        // Heading — line-masked reveal
        const heading = splitLines(headingRef.current);
        gsap.from(heading.lines, {
          yPercent: 120, duration: 1, stagger: 0.1, ease: "power4.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        });

        // Eyebrow + intro + each field stagger up (excluding the submit button)
        const formChildren = formRef.current.querySelectorAll("form > *:not(button):not(.success-msg)");
        gsap.from([
          formRef.current.querySelector("span"),
          ...formChildren,
        ], {
          autoAlpha: 0, y: 26, duration: 0.7, stagger: 0.07, ease: "power3.out", delay: 0.2,
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        });

        // Image — clip reveal + parallax scale
        gsap.fromTo(imageRef.current,
          { clipPath: "inset(0 0 0 100%)", autoAlpha: 0 },
          {
            clipPath: "inset(0 0 0 0%)", autoAlpha: 1, duration: 1.2, ease: "power4.inOut",
            scrollTrigger: { trigger: imageRef.current, start: "top 80%" },
          }
        );
        gsap.fromTo(imageRef.current.querySelector("img"),
          { scale: 1.2 },
          { scale: 1, ease: "none",
            scrollTrigger: { trigger: imageRef.current, start: "top bottom", end: "bottom top", scrub: true } }
        );

        return () => heading.revert();
      }));

      mm.add(REDUCED_MOTION, () => {
        gsap.set([formRef.current, imageRef.current], { autoAlpha: 1, clearProps: "transform,clipPath" });
      });
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

  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Web3Forms supports file uploads via FormData
      const data = new FormData();
      data.append("access_key", import.meta.env.VITE_WEB3FORMS_KEY);
      data.append("subject", "New Job Application — Bulbul Restaurant");
      data.append("from_name", formData.name);
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("phone", formData.phone);
      data.append("position", formData.position);
      if (formData.resume) data.append("resume", formData.resume);
      if (formData.coverLetter) data.append("cover_letter", formData.coverLetter);

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data,
      });

      if (res.ok) {
        setSubmitSuccess(true);
        setFormData({ name: "", email: "", phone: "", position: "", resume: null, coverLetter: null });
        // Reset file inputs
        const fileInputs = e.target.querySelectorAll('input[type="file"]');
        fileInputs.forEach(input => { input.value = ""; });
        setTimeout(() => setSubmitSuccess(false), 4000);
      }
    } catch (err) {
      console.error("Application submission error:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section ref={sectionRef} className="w-full py-[60px] lg:py-[100px] bg-bg">
      <div className="max-w-container mx-auto px-5 sm:px-8 lg:px-0">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-stretch">

          {/* Left — Form */}
          <div ref={formRef} className="flex-1 lg:max-w-[480px]">
            <span className="font-freight uppercase font-black text-[13px] sm:text-[14px] leading-[18px] tracking-widest text-terracotta block mb-2">
              Join our team
            </span>

            <h2 ref={headingRef} className="font-freight text-[36px] sm:text-[44px] lg:text-[50px] leading-[42px] sm:leading-[50px] lg:leading-[56px] font-black text-rust-dark mb-3">
              Make an Application
            </h2>

            {/* <p className="font-freight font-semibold text-[15px] sm:text-[16px] leading-[22px] text-terracotta mb-8">
              If you'd like to be part of the team, we'd love to hear from you.
            </p> */}

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
                disabled={submitting}
                className={`inline-flex items-center justify-center gap-1 font-semibold leading-[25px] self-start px-8 py-[10px] font-freight text-[16px] sm:text-[17px] transition-all duration-300 rounded cursor-pointer mt-2
                  ${submitting ? "bg-primary/50 text-cream/70 cursor-not-allowed" : "bg-primary text-cream hover:bg-rust-dark"}`}
              >
                {submitting ? "Submitting..." : "Submit Application"} <img src={arrowRight} alt="" />
              </button>

              {/* Success message */}
              {submitSuccess && (
                <p className="font-freight text-[15px] font-semibold text-green-700 mt-2">
                  ✓ Your application has been submitted successfully. We'll review it and get back to you!
                </p>
              )}
            </form>
          </div>

          {/* Right — Image */}
          <div ref={imageRef} className="flex-1 hidden lg:block">
            <div className="w-full h-full min-h-[500px] overflow-hidden rounded-sm">
              <img
                src="/images/pages/careers/TP2.png"
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
