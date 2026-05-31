import { useState } from "react";
import SectionTag from "@/components/common/SectionTag";
import ArrowIcon from "@/components/common/ArrowIcon";
import FormField from "@/components/common/FormField";
import { OPEN_POSITIONS } from "./CareersPositions";

export default function CareersApplicationForm() {
  const [position, setPosition] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [resumeName, setResumeName] = useState("");
  const [coverName, setCoverName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    e.target.reset();
    setResumeName("");
    setCoverName("");
    setPosition("");
  };

  return (
    <section id="apply" className="w-full py-24 bg-rust/5">
      <div className="max-w-container mx-auto px-5 sm:px-8 lg:px-0">
        <div className="flex flex-col lg:flex-row items-start gap-16 lg:gap-24">

          <div className="shrink-0 lg:w-[420px]">
            <SectionTag label="Application Form" />
            <h2 className="font-freight text-h2 font-normal mt-4 mb-4">
              <span className="text-rust">Make an </span>
              <span className="italic text-accent-gold">Application</span>
            </h2>
            <p className="font-josefin text-body-xs text-rust/70">
              If you'd like to be part of the team, we'd love to hear from you.
            </p>
            <div className="mt-10 overflow-hidden rounded-sm h-[280px]">
              <img src="/images/bg/testimonial.webp" alt="Bulbul team"
                className="w-full h-full object-cover" />
            </div>
          </div>

          <div className="flex-1 w-full">
            {submitted && (
              <div className="mb-6 px-5 py-4 font-josefin text-body-xs bg-olive/15 border border-olive text-olive">
                Application submitted! We'll review it and get back to you soon.
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <FormField label="Name" placeholder="Enter your full name" required />
              <FormField label="Email Address" placeholder="Enter your email" type="email" required />
              <FormField label="Phone Number" placeholder="Enter your phone number" type="tel" />

              <div className="flex flex-col gap-2">
                <label className="font-josefin text-body-xs text-cream/70">
                  Position Applying For <span className="text-accent-gold">*</span>
                </label>
                <select required value={position} onChange={(e) => setPosition(e.target.value)}
                  className="form-field">
                  <option value="" className="bg-charcoal">Select a position</option>
                  {OPEN_POSITIONS.map((p) => (
                    <option key={p.title} value={p.title} className="bg-charcoal">{p.title}</option>
                  ))}
                  <option value="other" className="bg-charcoal">Other / General Application</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-josefin text-body-xs text-cream/70">
                  Upload Resume <span className="text-accent-gold">*</span>
                </label>
                <div className="w-full px-5 py-4 flex items-center gap-4 bg-cream/5 border border-cream/15">
                  <label className="font-josefin text-caption px-4 py-2 cursor-pointer border border-accent-gold text-accent-gold bg-accent-gold/6">
                    Choose file
                    <input type="file" accept=".pdf,.doc,.docx" className="hidden" required
                      onChange={(e) => setResumeName(e.target.files[0]?.name || "")} />
                  </label>
                  <span className={`font-josefin text-caption ${resumeName ? "text-cream" : "text-cream/30"}`}>
                    {resumeName || "No file chosen"}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-josefin text-body-xs text-cream/70">Upload Cover Letter</label>
                <div className="w-full px-5 py-4 flex items-center gap-4 bg-cream/5 border border-cream/15">
                  <label className="font-josefin text-caption px-4 py-2 cursor-pointer border border-cream/30 text-cream/50 bg-transparent">
                    Choose file
                    <input type="file" accept=".pdf,.doc,.docx" className="hidden"
                      onChange={(e) => setCoverName(e.target.files[0]?.name || "")} />
                  </label>
                  <span className={`font-josefin text-caption ${coverName ? "text-cream" : "text-cream/30"}`}>
                    {coverName || "No file chosen"}
                  </span>
                </div>
              </div>

              <button type="submit"
                className="btn-outline-white inline-flex items-center gap-3 self-start mt-2">
                Submit Application <ArrowIcon />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
