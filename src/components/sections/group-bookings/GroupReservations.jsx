import { Link } from "react-router-dom";
import SectionTag from "@/components/common/SectionTag";
import ArrowIcon from "@/components/common/ArrowIcon";

export default function GroupReservations() {
  return (
    <section className="w-full py-24 bg-charcoal">
      <div className="max-w-container mx-auto px-5 sm:px-8 lg:px-0">
        <div className="flex flex-col lg:flex-row items-start gap-16 lg:gap-24">

          <div className="relative shrink-0 w-full lg:w-[580px] h-[500px] overflow-hidden rounded-sm">
            <img src="/images/bg/moment.webp" alt="Group reservation"
              className="w-full h-full object-cover" />
            <div className="absolute inset-0 overlay-hero-bottom" />
          </div>

          <div className="flex flex-col gap-6 flex-1">
            <SectionTag label="Book for a first-class get-together" light />
            <h2 className="font-freight text-h2 text-cream font-normal">
              Group <span className="italic text-accent-gold">Reservations</span>
            </h2>
            <div className="flex flex-col gap-5">
              <p className="font-josefin text-body-sm text-cream/65">
                A good meal can gladden the heart. A fine gathering, more so. Come —
                eat, drink and be joyful. It will be our delight to host you.
              </p>
              <p className="font-josefin text-body-sm text-cream/65">
                We accept bookings online up to four months in advance. For large
                parties of 16+ or for specific event requests, do get in touch with
                us directly to book.
              </p>
              <p className="font-josefin text-body-sm text-cream/65">
                For any group, we do ask for a deposit, which is used against your
                final bill. If you need to cancel, let us know 24 hours in advance
                and we will gladly refund your deposit.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 mt-2">
              <a href="#enquiry" className="btn-outline-white inline-flex items-center gap-3">
                Make an Enquiry <ArrowIcon />
              </a>
              <Link to="/contact" className="btn-outline-white inline-flex items-center gap-3">
                Book Online <ArrowIcon />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
