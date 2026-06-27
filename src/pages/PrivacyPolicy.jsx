import { useEffect, useRef } from "react";
import { gsap, afterFonts, NO_PREFERENCE, REDUCED_MOTION } from "@/utils/animations";

const SECTIONS = [
  {
    title: "1. About Us",
    content: [
      "1.1 We are Butter Chicken Hospitality Ltd. (Trading name - Bulbul) (referred to in this Policy as \"we\", \"us\" or \"our\"). Our head office and our registered office address is 25 Tudor Street, Victoria house, part ground and lower ground floor, EC4Y 0DD. We are registered at Companies House with company number 16049104.",
      "1.2 Personal data is, in simple terms, any information about you that enables you to be identified. Personal data covers obvious information such as your name and contact details, but it also covers less obvious information such as identification numbers, electronic location data, and other online identifiers (collectively, \"Personal Data\"). We understand that your privacy is important to you and that you care about how your Personal Data is used.",
      "1.3 We respect and value the privacy of everyone who visits our website, https://www.bulbul.com (\"Our Site\"), our social media platforms and/or interact with us in other ways, including accessing wi-fi in our venues. We will only collect and use Personal Data in ways that are described in this Policy, and in a way that is consistent with our obligations and your rights under the law.",
      "1.4 For the purposes of applicable data protection law (including the EU law version of the General Data Protection Regulation (EU 2016/679) and the Data Protection Act 2018) (collectively the \"Data Protection Legislation\") we are a 'data controller' of your Personal Data.",
      "1.5 Where applicable, this policy should be read alongside our: (i) Cookie Policy; (ii) reservation terms (or the reservation terms of any third party who processes bookings on our behalf); (iii) Shipping Policy; and (iv) Wi-fi Terms of Use (or the wi-fi terms of any third party who provides this service on our behalf).",
    ],
  },
  {
    title: "2. What Personal Data do we collect?",
    content: [
      "2.1 We may collect Personal Data when you visit our Site, participate in promotional or marketing activity, come to one of our venues, sign in for our wi-fi, or contact us. This information may include:",
    ],
    list: [
      "Reservation Information: Information you provide when you reserve a table (contact name, phone number, email address, and any additional notes you may provide).",
      "Transaction and Billing Data: Transaction and billing information when you purchase food and drink in our venues or make a purchase from our online store.",
      "Communications: Records of your communications with us via phone, email, or social media.",
      "Feedback & Marketing: Feedback you provide, or information you provide when entering a competition or promotion, and when you buy or redeem vouchers or loyalty cards.",
      "Technical and Analytics Data: Information we receive from other sources, for example Google Analytics and Microsoft Clarity when you visit our Site.",
      "Browsing Behavior: Information about your browsing activity on our Site, such as pages viewed, items placed in a shopping basket, time spent on pages, and your purchase history.",
      "Profiles: Affinity and interest profiles that may be assigned to you based on your browsing, purchases, and engagement with our marketing communications.",
    ],
  },
  {
    title: "3. How do we use Personal Data?",
    content: ["3.1 We process Personal Data for the following purposes:"],
    list: [
      "Fulfilling an agreement with you, communicating with you, and providing customer services.",
      "Managing, operating, and improving our services online, by email, phone, or in our venues.",
      "Determining the popularity of, and improving and marketing, our products.",
      "Managing access to wi-fi services whilst in our venues.",
      "Monitoring our venues via CCTV cameras to prevent, investigate and/or report fraud, security incidents, or crime.",
      "Communicating, investigating, and handling any queries, complaints, or feedback.",
      "Administering our Site and for internal operations, including troubleshooting, data analysis, testing, and research.",
      "In connection with legal claims which concern our company, group, or partners.",
      "Ensuring compliance with applicable laws and regulations.",
      "Delivering tailored and targeted advertising (including via Meta/Facebook look-a-like and custom audiences).",
      "Carrying out market research and surveys.",
      "With your consent and/or where permitted by law, using your Personal Data for marketing purposes. You can always opt out by clicking the unsubscribe link in any email.",
      "Tracking your use of our Site and recording purchase history to create customer profiles and provide personalized recommendations.",
      "Delivering automated email or SMS communications triggered by your browsing or purchasing behavior.",
    ],
  },
  {
    title: "4. Who will your Personal Data be shared with?",
    content: ["4.1 We will share your Personal Data:"],
    list: [
      "With our suppliers and service providers working for us such as payment providers, reservations service providers, communications providers, wi-fi service providers, and advertising platforms.",
      "With our CRM provider, which we use to manage customer engagement, communications, profiling, and marketing automation.",
      "With our professional advisers and insurers.",
      "With third parties engaged in credit verification, fraud prevention, or detection.",
      "With government, regulatory, and law enforcement authorities if required.",
      "With purchasers (and prospective purchasers) of shares or business assets or investors in us.",
    ],
  },
  {
    title: "5. What cookies will be used on the website?",
    content: [
      "5.1 Our Site uses cookies to distinguish you from other users. This helps us to provide you with a good experience when you browse our Site, to collect information to help us improve our Site, products, and services, and to target marketing and advertising to Site visitors.",
    ],
  },
  {
    title: "6. How long will you hold my Personal Data?",
    content: [
      "6.1 We will keep Personal Data for as long as necessary to fulfil the purpose for which we obtained it. Thereafter, subject to certain exceptions, we will retain Personal Data until the earlier of: (i) a short period of time after you ask us to stop doing so; or (ii) 24 months after your last active engagement with us.",
      "6.2 We also keep a record of your email address if you have unsubscribed or asked us not to send you direct marketing, so that you do not receive marketing emails in future.",
      "6.3 By law we have to keep some information about our customers for extended periods after they cease to be a customer for contractual, financial, tax, or regulatory purposes.",
      "6.4 In some circumstances you have a right to ask us to delete your Personal Data (see Section 11).",
      "6.5 We may anonymize your Personal Data for research or statistical purposes, in which case we may use this information indefinitely without further notice to you.",
    ],
  },
  {
    title: "7. Where will we send your Personal Data?",
    content: [
      "7.1 Whilst our servers are kept in the UK, we use service providers around the world. Consequently, your Personal Data may be transferred, stored and/or processed in countries outside of the UK and Europe (the \"EEA\").",
      "7.2 Where this is the case and we transfer Personal Data outside of the UK/EEA, we use specific approved contracts (such as Standard Contractual Clauses or the International Data Transfer Agreement) which ensure the same levels of protection that apply under the Data Protection Legislation.",
    ],
  },
  {
    title: "8. Telephone call monitoring",
    content: [
      "8.1 If you contact us by telephone we may monitor or record the call for training purposes, and to improve the quality of services that we provide to you.",
    ],
  },
  {
    title: "9. Third party links",
    content: [
      "9.1 Our Site contains links to other websites. If you follow these links, please be aware that such sites have their own privacy policies which you should check — we do not accept any liability for these sites or the information they collect.",
    ],
  },
  {
    title: "10. Minors",
    content: [
      "10.1 We do not knowingly collect or store any Personal Data about children under the age of 13 and we do not offer any of our products or services directly to children under the age of 13.",
    ],
  },
  {
    title: "11. What rights do you have regarding Personal Data?",
    content: ["11.1 Under Data Protection Legislation, subject to some exceptions, you have the following rights:"],
    list: [
      "The right to be informed about our collection and use of your Personal Data.",
      "The right to access the Personal Data we hold about you (via a \"subject access request\").",
      "The right to have your Personal Data rectified if it is inaccurate or incomplete.",
      "The right to be forgotten (the right to ask us to delete or dispose of your Personal Data).",
      "The right to restrict (prevent) the processing of your Personal Data.",
      "The right to object to us using your Personal Data for a particular purpose or purposes.",
      "The right to withdraw consent at any time if we are relying on it as our legal basis.",
      "The right to data portability (requesting a copy of your data to use elsewhere).",
      "Rights relating to automated decision-making and profiling.",
    ],
    contentAfterList: [
      "11.2 To exercise these rights, please make your request in writing and send it to us via the details in Section 13. There is no charge unless your request is 'manifestly unfounded or excessive'.",
      "11.3 If you have any cause for complaint about our use of your Personal Data, you have the right to lodge a complaint with the Information Commissioner's Office (ICO).",
    ],
  },
  {
    title: "12. Meta / Facebook Ads",
    content: [
      "12.1 We use Facebook advertising services to deliver content to you while you are using the Meta platforms. You can control how Facebook uses data to show you ads by turning off interest-based ads in your Facebook ad preference settings.",
      "12.2 Please note that even when you have opted out, you may still see our non-targeted adverts online if your general settings align with a broad audience segment defined by Facebook.",
    ],
  },
  {
    title: "13. Contact us",
    content: [
      "13.1 If you have any questions or concerns about how we use your Personal Data or this Privacy Policy, please get in touch with us:",
      "By email at: privacy@bulbul.com",
      "By post to: The Data Protection Officer, 25 Tudor Street, Victoria House, London, EC4Y 0DD",
    ],
  },
  {
    title: "14. Changes to this policy",
    content: [
      "14.1 We may change this policy from time to time. The latest version will be uploaded to our Site and will take precedence over earlier versions. If we consider any changes represent an important shift in how we use your Personal Data, we will notify you directly.",
    ],
  },
];

export default function PrivacyPolicy() {
  const sectionRef = useRef(null);
  const heroRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(NO_PREFERENCE, () => afterFonts(sectionRef, () => {
        // Hero heading animation
        gsap.fromTo(heroRef.current,
          { clipPath: "inset(0 0 100% 0)", opacity: 0, filter: "blur(6px)" },
          { clipPath: "inset(0 0 0% 0)", opacity: 1, filter: "blur(0px)", duration: 1.2, ease: "power4.out" }
        );

        // Content sections stagger in
        gsap.fromTo(contentRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, stagger: 0.05, duration: 0.8, ease: "power3.out",
            scrollTrigger: { trigger: contentRef.current, start: "top 85%" },
          }
        );
      }));

      mm.add(REDUCED_MOTION, () => {
        gsap.set([heroRef.current, contentRef.current.children], { autoAlpha: 1, clearProps: "transform,filter,clipPath" });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="bg-bg-inner min-h-screen">
      {/* Hero banner */}
      <div className="relative w-full h-[280px] sm:h-[340px] lg:h-[400px] overflow-hidden">
        <img
          src="/images/rooms/1.svg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 h-full flex items-end w-full max-w-[900px] mx-auto px-5 sm:px-8 lg:px-0 pb-10 sm:pb-14 lg:pb-16 pt-[100px]">
          <div ref={heroRef}>
            <span className="block font-freight text-[13px] sm:text-[14px] uppercase font-black tracking-widest text-accent-gold mb-2">
              Legal
            </span>
            <h1 className="font-freight text-cream font-black text-[32px] sm:text-[44px] lg:text-[56px] leading-[1.1]">
              Privacy Policy
            </h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="w-full max-w-[900px] mx-auto px-5 sm:px-8 lg:px-0 py-12 sm:py-16 lg:py-20">
        {/* Intro */}
        <p className="font-freight font-semibold text-[16px] sm:text-[18px] leading-[1.6] text-terracotta mb-10">
          Your privacy is deeply important to us. Kindly find further information on our policy below:
        </p>

        {/* Policy sections */}
        <div ref={contentRef} className="flex flex-col gap-8 sm:gap-10">
          {SECTIONS.map((section) => (
            <div key={section.title}>
              <h2 className="font-freight text-[22px] sm:text-[26px] font-semibold text-rust-dark mb-3 leading-tight">
                {section.title}
              </h2>
              {section.content.map((para, i) => (
                <p key={i} className="font-freight text-[15px] sm:text-[16px] leading-[1.7] text-terracotta mb-2">
                  {para}
                </p>
              ))}
              {section.list && (
                <ul className="list-disc list-outside pl-5 mt-3 flex flex-col gap-2">
                  {section.list.map((item, i) => (
                    <li key={i} className="font-freight text-[14px] sm:text-[15px] leading-[1.6] text-terracotta/90">
                      {item}
                    </li>
                  ))}
                </ul>
              )}
              {section.contentAfterList && section.contentAfterList.map((para, i) => (
                <p key={`after-${i}`} className="font-freight text-[15px] sm:text-[16px] leading-[1.7] text-terracotta mt-3 mb-2">
                  {para}
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
