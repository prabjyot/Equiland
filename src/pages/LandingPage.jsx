import React from "react";
import HeroPage from "../components/HeroPage";
import SaaSSection from "../components/SaaSSection";
import InsightsSection from "../components/InsightsSection";
import MarketSection from "../components/MarketSection";
import ContactUsSection from "../components/ContactUsSection";


function LandingPage({ canScroll, setCanScroll }) {
  return (
    <div className="no-scrollbar overflow-x-hidden w-full">
      <HeroPage canScroll={canScroll} setCanScroll={setCanScroll} />
      <SaaSSection canScroll={canScroll} setCanScroll={setCanScroll}  />
      <InsightsSection />
      <MarketSection />
      <ContactUsSection />
    </div>
  );
}

export default LandingPage;
