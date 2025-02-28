import React from "react";

function JourneyPassion() {
  return (
    <div
      id="JourneyPassion"
      className="px-4 sm:px-5 md:px-24 py-8 sm:py-12 lg:py-32 grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-24"
    >
      <h2 className="text-base sm:text-lg md:text-2xl lg:text-[40px] leading-tight w-full order-2 lg:order-1 lg:col-span-2">
        Passionate about exploring human insights,{" "}
        <span className="text-primary-light">
          dispassionate about your business,
        </span>{" "}
        the founder's equation for Equilibrium
      </h2>
      <div
        className="overflow-hidden inset-0 bg-[url('/dot-grid-spacing.svg')] bg-contain bg-repeat bg-secondary-cream flex items-center justify-center 
        order-1 relative min-h-[150px] sm:min-h-[200px] md:min-h-[300px] rounded-lg"
      >
        <img 
          src="/scopesearch3.gif" 
          alt="Scope Search Animation" 
          className="w-[40%] sm:w-[50%] lg:w-[70%] transition-all duration-300" 
        />
      </div>
      <div className="flex flex-col gap-4 sm:gap-5 font-poppins text-sm sm:text-base lg:text-lg order-3">
        <p className="leading-relaxed">
          A journey that began in the discipline of qualitative research took
          Ameya through leadership roles across research, advertising, and
          marketing, earning accolades from both clients and international
          juries evaluating effectiveness case studies
        </p>
        <p className="leading-relaxed">
          Throughout this journey of collaborating with clients across sectors
          such as BFSI, CPG, real estate, consumer electronics, telecom,
          automotive, media, and fashion & apparel, among others, one constant
          has been a deep passion for a ground-up approach to understanding
          consumer preferences and human psychology
        </p>
        <p className="leading-relaxed">
          Backed by a trifecta of consumer insights, brand strategy, and
          marketing—enriched by life experiences gained through immersion in
          diverse cultures across five continents—Ameya's next chapter took
          shape with the founding of Equilibrium, a company created with the
          vision to democratize not just research but the entire marketing
          funnel
        </p>
      </div>
    </div>
  );
}

export default JourneyPassion;
