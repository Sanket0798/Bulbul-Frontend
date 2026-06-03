import ContactMap from "@/components/sections/contact/ContactMap";
import ContactInfo from "@/components/sections/contact/ContactInfo";
import ContactStaff from "@/components/sections/contact/ContactStaff";
import ContactCTA from "@/components/sections/contact/ContactCTA";

export default function Contact() {
  return (
    <div className="bg-bg-inner">
      <ContactMap />
      <ContactInfo />
      <ContactStaff />
      <ContactCTA />
    </div>
  );
}
