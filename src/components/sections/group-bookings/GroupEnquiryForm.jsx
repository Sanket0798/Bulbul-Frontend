import { useEffect, useRef, useState } from "react";
import { gsap, splitLines, afterFonts, NO_PREFERENCE, REDUCED_MOTION } from "@/utils/animations";
import arrowRight from "@/assets/icons/svg/right-arrow.svg";

export default function GroupEnquiryForm() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const formRef = useRef(null);
  const headingRef = useRef(null);

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
      const mm = gsap.matchMedia();

      mm.add(NO_PREFERENCE, () => afterFonts(sectionRef, () => {
        // Image — clip reveal + parallax scale
        gsap.fromTo(imageRef.current,
          { clipPath: "inset(0 100% 0 0)", autoAlpha: 0 },
          {
            clipPath: "inset(0 0% 0 0)", autoAlpha: 1, duration: 1.2, ease: "power4.inOut",
            scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
          }
        );
        gsap.fromTo(imageRef.current.querySelector("img"),
          { scale: 1.2 },
          { scale: 1, ease: "none",
            scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: true } }
        );

        // Heading — line-masked reveal
        const heading = splitLines(headingRef.current);
        gsap.from(heading.lines, {
          yPercent: 120, duration: 1, stagger: 0.1, ease: "power4.out",
          scrollTrigger: { trigger: formRef.current, start: "top 85%" },
        });

        // Eyebrow + each form field staggers up
        gsap.fromTo([formRef.current.querySelector("span"), ...formRef.current.querySelectorAll("form > *")],
          { autoAlpha: 0, y: 28 },
          {
            autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.08, ease: "power3.out", delay: 0.2,
            scrollTrigger: { trigger: formRef.current, start: "top 85%" },
          }
        );

        return () => heading.revert();
      }));

      mm.add(REDUCED_MOTION, () => {
        gsap.set([imageRef.current, formRef.current], { autoAlpha: 1, clearProps: "transform,clipPath" });
      });
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

  const [consentError, setConsentError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.consent) {
      setConsentError("Please tick the consent box before submitting.");
      return;
    }
    setConsentError("");
    setSubmitting(true);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_KEY,
          subject: "New Group Booking Enquiry — Bulbul Restaurant",
          from_name: formData.name,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          date: formData.date,
          guests: formData.guests,
          notes: formData.notes,
        }),
      });

      if (res.ok) {
        setSubmitSuccess(true);
        setFormData({ name: "", email: "", phone: "", date: "", guests: "", notes: "", consent: false });
        setTimeout(() => setSubmitSuccess(false), 4000);
      }
    } catch (err) {
      console.error("Form submission error:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section ref={sectionRef} className="w-full pt-10 lg:pt-[67px] pb-10 lg:pb-[57px]">
      <div className="max-w-container mx-auto px-5 sm:px-8 lg:px-0">
        <div className="flex flex-col lg:flex-row items-stretch gap-8 lg:gap-9">

          {/* Left — Image */}
          <div ref={imageRef} className="w-full lg:w-[717px] overflow-hidden rounded-sm shrink-0">
            <img
              src="/images/pages/group-dining/GB2.png"
              alt="Friends enjoying a meal"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right — Form */}
          <div ref={formRef} className="flex-1">
            <span className="font-freight uppercase font-black text-[15px] leading-[14px] tracking-widest text-terracotta block mb-[10px]">
              Contact Us
            </span>

            <h2 ref={headingRef} className="font-freight text-[32px] sm:text-[38px] lg:text-[43px] leading-[1.1] font-black text-rust mb-5">
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
              <div className="flex flex-col gap-1">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="consent"
                    checked={formData.consent}
                    onChange={(e) => { handleChange(e); setConsentError(""); }}
                    className="mt-1 w-5 h-5 rounded-none bg-transparent shrink-0 accent-rust"
                  />
                  <span className="font-freight font-semibold text-base sm:text-lg leading-6 text-terracotta">
                    I consent to receive occasional emails from Bulbul, including updates, events, and news, in line with our Privacy Policy.
                  </span>
                </label>
                {consentError && (
                  <span className="font-freight text-[13px] text-red-500 pl-8">{consentError}</span>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={!formData.consent || submitting}
                className={`inline-flex items-center justify-center gap-1 font-semibold leading-[25px] self-start px-6 sm:px-8 py-[10px] font-freight text-[16px] sm:text-[17px] rounded transition-all duration-300
                  ${formData.consent && !submitting
                    ? "bg-primary text-cream hover:bg-rust-dark cursor-pointer"
                    : "bg-primary/50 text-cream/70 cursor-not-allowed"
                  }`}
              >
                {submitting ? "Sending..." : "Send Enquiry"} <img src={arrowRight} alt="" className={!formData.consent ? "opacity-50" : ""} />
              </button>

              {/* Success message */}
              {submitSuccess && (
                <p className="font-freight text-[15px] font-semibold text-green-700">
                  ✓ Your enquiry has been sent successfully. We'll be in touch soon!
                </p>
              )}
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
