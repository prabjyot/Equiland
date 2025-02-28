import React from "react";

function JourneyInfo() {
  return (
    <div className="bg-primary-dark px-4 sm:px-5 md:px-24 py-8 sm:py-12 lg:py-32 text-secondary-cream font-poppins">
      <div className="flex flex-col gap-12 sm:gap-16 lg:gap-24">
        <div className="flex flex-col lg:flex-row items-start gap-6 sm:gap-8 lg:gap-20">
          <h2 className="text-base sm:text-lg font-semibold tracking-wide leading-tight w-full lg:w-1/4 xl:w-[300px] min-w-[250px]">
            Ushering in agility, transparency & accessibility with our one-of-its-kind SaaS platform
          </h2>
          <div className="flex flex-col gap-6 sm:gap-8 lg:gap-10 text-base sm:text-lg w-full lg:w-3/4">
            <p className="font-light">
              The Equilibrium journey started in 2023 with a simple thought of
              trying to find a solve for how can we bring in agility,
              transparency and improved accessibility to the market research and
              consumer insights process, especially in the domain of qualitative
              research. This simple thought evolved into our very own,
              one-of-its kind SaaS platform, which acts as an unstructured data
              pipeline, and much more
            </p>
            <p className="font-light">
              Being mindful of the fact that clients need guidance in the
              insighting process, we chose to continue doing what we do best –
              don our researcher hats and consulting aprons as we cook food for
              your thoughts
            </p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row w-full items-start sm:items-center gap-6 sm:gap-8 lg:gap-14">
          <div className="w-32 sm:w-48 lg:w-[300px] flex items-center justify-center">
            <img
              src="/Eq Final Logo-24.png"
              className="aspect-square w-full sm:w-[65%]"
              alt="Logo"
            />
          </div>
          <h2 className="text-base sm:text-lg md:text-xl lg:text-[40px] leading-tight lg:leading-tight xl:leading-tight w-full">
            One SaaS platform for{" "}
            <span className="text-primary-light">
              transparent, high-quality, and agile insights,
            </span>{" "}
            streamlining the entire primary research funnel
          </h2>
        </div>
      </div>
    </div>
  );
}

export default JourneyInfo;
