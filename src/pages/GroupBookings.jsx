import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GroupHero from "@/components/sections/group-bookings/GroupHero";
import GroupGalleryStrip from "@/components/sections/group-bookings/GroupGalleryStrip";
import GroupPartySection from "@/components/sections/group-bookings/GroupPartySection";
import GroupReservations from "@/components/sections/group-bookings/GroupReservations";
import GroupFAQ from "@/components/sections/group-bookings/GroupFAQ";
import GroupEnquiryForm from "@/components/sections/group-bookings/GroupEnquiryForm";

export default function GroupBookings() {
  return (
    <div className="min-h-screen bg-bg-inner">
      <Navbar transparent />
      <GroupHero />
      <GroupGalleryStrip />
      <GroupPartySection />
      <GroupReservations />
      <GroupFAQ />
      <GroupEnquiryForm />
      <Footer />
    </div>
  );
}
