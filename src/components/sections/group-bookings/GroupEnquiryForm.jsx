import { useState } from "react";
import SectionTag from "@/components/common/SectionTag";
import ArrowIcon from "@/components/common/ArrowIcon";
import FormField from "@/components/common/FormField";

export default function GroupEnquiryForm() {
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    e.target.reset();
    setAgreed(false);
  };

  return (
    <section id="enquiry" className="w-full py-24 bg-rust/5">
      <div className="max-w-container mx-auto px-5 sm:px-8 lg:px-0">
        <div className="flex flex-col lg:flex-row items-start gap-16 lg:gap-24">

          <div className="relative shrink-0 w-full lg:w-[580px] h-[600px] overflow-hidden rounded-sm">
            <img src="/images/bg/testimonial.webp" alt="Group dining"
              className="w-full h-full object-cover" />
            <div className="absolute inset-0 overlay-hero-bottom" />
          </div>

          <div className="flex-1 w-full">
            <SectionTag label="Contact us" />
            <h2 className="font-freight text-h2 font-normal mt-4 mb-8">
              <span className="text-rust">Make an </span>
              <span className="italic text-accent-gold">Enquiry</span>
            </h2>

            {submitted && (
              <div className="mb-6 px-5 py-4 font-josefin text-body-xs bg-olive/15 border border-olive text-olive">
                Thank you! We'll be in touch shortly.
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <FormField label="Name" placeholder="Enter your full name" required />
                <FormField label="Email Address" placeholder="Enter your email" type="email" required />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <FormField label="Phone Number" placeholder="Enter your phone" type="tel" />
                <FormField label="Date of Booking" placeholder="DD / MM / YYYY" type="date" required />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <FormField label="Number of Guests" placeholder="e.g. 12" type="number" required />
                <div className="flex flex-col gap-2">
                  <label className="font-josefin text-body-xs text-cream/70">Occasion</label>
                  <select className="form-field">
                    <option value="" className="bg-charcoal">Select occasion</option>
                    <option value="birthday" className="bg-charcoal">Birthday</option>
                    <option value="anniversary" className="bg-charcoal">Anniversary</option>
                    <option value="corporate" className="bg-charcoal">Corporate Event</option>
                    <option value="other" className="bg-charcoal">Other</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-josefin text-body-xs text-cream/70">Notes</label>
                <textarea rows={4}
                  placeholder="Dietary preferences, occasion, or anything you'd like us to know"
                  className="form-field resize-none" />
              </div>

              <label className="flex items-start gap-3 cursor-pointer">
                <div
                  className={`shrink-0 w-5 h-5 mt-0.5 flex items-center justify-center border transition-all duration-200 cursor-pointer
                    ${agreed ? "bg-accent-gold border-accent-gold" : "bg-transparent border-cream/30"}`}
                  onClick={() => setAgreed((v) => !v)}>
                  {agreed && (
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4L3.5 6.5L9 1" stroke="#232323" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  )}
                </div>
                <span className="font-josefin text-caption text-cream/50">
                  I consent to receive occasional emails from Bulbul, including updates,
                  events, and news, in line with our Privacy Policy.
                </span>
              </label>

              <button type="submit"
                className="btn-outline-white inline-flex items-center gap-3 self-start mt-2">
                Subscribe <ArrowIcon />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
