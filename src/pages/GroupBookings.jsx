import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GroupHero from "@/components/sections/group-bookings/GroupHero";
import GroupFeastMenus from "@/components/sections/group-bookings/GroupFeastMenus";
import GroupPartySection from "@/components/sections/group-bookings/GroupPartySection";
import GroupReservations from "@/components/sections/group-bookings/GroupReservations";
import GroupFAQ from "@/components/sections/group-bookings/GroupFAQ";
import GroupEnquiryForm from "@/components/sections/group-bookings/GroupEnquiryForm";

export default function GroupBookings() {
  return (
    <div className="min-h-screen">
      <Navbar transparent />
      <GroupHero />
      <GroupFeastMenus />
      <GroupPartySection />
      <GroupReservations />
      <GroupFAQ />
      <GroupEnquiryForm />
      <Footer />
    </div>
  );
}
