import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionTag from "@/components/common/SectionTag";
import arrowRight from "@/assets/icons/svg/right-arrow.svg";

gsap.registerPlugin(ScrollTrigger);

const STAFF = [
  { name: "Rohan D'Souza", role: "Head Chef", email: "rohan@bulbul.com", image: "/images/shared/people/Image-1.jpg" },
  { name: "Twinkle Keswani", role: "Restaurateur", email: "twinkle@bulbul.com", image: "/images/shared/people/Image-2.jpg" },
  { name: "Priya Sharma", role: "Hospitality", email: "priya@bulbul.com", image: "/images/shared/people/Image-4.jpg" },
  { name: "Vikram Mehta", role: "Events Manager", email: "vikram@bulbul.com", image: "/images/shared/people/Image-3.jpg" },
];

export default function ContactStaff() {
  const sectionRef = useRef(null);
  const staffRef = useRef(null);
  const formRef = useRef(null);

  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        staffRef.current.children,
        { autoAlpha: 0, y: 30 },
        {
          autoAlpha: 1, y: 0, stagger: 0.1, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: staffRef.current, start: "top 80%" },
        }
      );
      gsap.fromTo(
        formRef.current,
        { autoAlpha: 0, y: 40 },
        {
          autoAlpha: 1, y: 0, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: formRef.current, start: "top 80%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Show success modal
    setShowSuccess(true);
    setFormData({ name: "", email: "", message: "" });
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <section ref={sectionRef} className="w-full py-16 md:py-20">
      <div className="max-w-container mx-auto px-5 sm:px-8 lg:px-15">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">

          {/* Left — Staff list */}
          <div className="lg:w-1/2">
            <div className="flex flex-col gap-4 mb-8">
              <h2 className="font-freight text-h2 text-rust font-black">
                Meet the Team
              </h2>
              {/* <SectionTag label="Contact" /> */}
            </div>

            <div ref={staffRef} className="flex flex-col gap-6">
              {STAFF.map(({ name, role, email, image }) => (
                <div key={name} className="flex items-center gap-4">
                  <img
                    src={image}
                    alt={name}
                    className="w-14 h-14 rounded-full object-cover shrink-0"
                  />
                  <div className="flex flex-col">
                    <h5 className="font-freight text-xl leading-[20px] text-charcoal font-semibold">
                      {name}
                    </h5>
                    <span className="font-freight font-medium text-lg text-terracotta">
                      {role} : {email}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Contact form */}
          <div className="lg:w-1/2">
            <div ref={formRef} className="flex flex-col">
              <h2 className="font-freight text-h2 text-rust font-black mb-3">
                Send A Message
              </h2>
              <p className="font-freight text-lg leading-[25px] text-terracotta font-semibold mb-6 max-w-[460px]">
                Have a question, want to book a table, or just want to say hello?
                Drop us a line and we'll get back to you shortly.
              </p>

              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name"
                  required
                  className="w-full border border-[#35370E] bg-transparent px-4 py-3 font-freight font-semibold text-lg leading-6 text-rust-dark placeholder:text-[#737373] outline-none focus:border-rust transition-colors duration-300"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  required
                  className="w-full border border-[#35370E] bg-transparent px-4 py-3 font-freight font-semibold text-lg leading-6 text-rust-dark placeholder:text-[#737373] outline-none focus:border-rust transition-colors duration-300"
                />
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Message"
                  required
                  rows={5}
                  className="w-full border border-[#35370E] bg-transparent px-4 py-3 font-freight font-semibold text-lg leading-6 text-rust-dark placeholder:text-[#737373] outline-none focus:border-rust transition-colors duration-300 resize-none"
                />
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 font-semibold leading-[25px] self-start px-8 py-[10px] bg-primary text-cream font-freight text-[16px] sm:text-[17px] transition-all duration-300 hover:bg-rust-dark rounded cursor-pointer"
                >
                  Send Message <img src={arrowRight} alt="" />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Success notification */}
        {showSuccess && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/50">
            <div className="bg-bg-inner rounded-sm p-10 flex flex-col items-center gap-4 shadow-lg animate-fade-in">
              {/* Checkmark */}
              <svg className="w-16 h-16 text-rust" viewBox="0 0 52 52" fill="none">
                <circle cx="26" cy="26" r="25" stroke="currentColor" strokeWidth="2" />
                <path d="M14 27l7 7 16-16" stroke="currentColor" strokeWidth="3"
                  strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <h2 className="font-freight text-h2 text-rust-dark font-black">
                Thank You!
              </h2>
              <p className="font-freight text-lg text-terracotta">
                Your message has been sent successfully.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
