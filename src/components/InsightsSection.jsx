import React, { useState, useEffect, useRef } from "react";
import SlidingSquare from "./SlidingSquare";
import gsap from "gsap";

const tabsData = {
  1: [
    {
      heading: "Brand Health",
      text: "Brand diagnostics and brand tracking to understand your brand’s performance vis-à-vis competitors",
      colSpan: 1,
      rowSpan: 1,
    },
    {
      heading: "Iterative testing",
      text: "From idea to execution – keep refining and iterating your offering with an agile insighting process of consumer feedback",
      colSpan: 1,
      rowSpan: 1,
    },
    {
      heading: "Consumer profiling for marketing and positioning strategies",
      text: "Segment your audience by profiling basis demographics or psychographics – helps you engineer the ideal strategy for your segments",
      colSpan: 1,
      rowSpan: 2,
    },
    {
      heading: "In-the-moment feedback",
      text: "Capture consumer behavior in a live environment, such as at retail-outlets or at home product usage",
      colSpan: 1,
      rowSpan: 1,
    },
    {
      heading: "Communication evaluation",
      text: "Test any kind of communication – a product or service idea, script testing, pilot shows, T.V. advertisements",
      colSpan: 2,
      rowSpan: 1,
    },
    {
      heading: "Exploratory research",
      text: "Broader and extensive in nature in which we take a blue-sky approach to understand the target audience and their needs",
      colSpan: 1,
      rowSpan: 1,
    },
  ],
  2: [
    {
      heading: "Usage and attitude research",
      text: "Better understand consumer behaviour towards your product or service to enhance its features",
      colSpan: 2,
      rowSpan: 1,
    },
    {
      heading: "Packaging design testing",
      text: "Gain in-depth insights on what’s working and what is not for your brand’s product packaging",
      colSpan: 1,
      rowSpan: 1,
    },
    {
      heading: "Employee Satisfaction",
      text: "Research existing or prospective employees on their expectations from your firm",
      colSpan: 1,
      rowSpan: 2,
    },
    {
      heading: "Consumer co-creation workshops",
      text: "Ideate and brainstorm with consumers to co-create your product or communication idea",
      colSpan: 1,
      rowSpan: 1,
    },
    {
      heading: "Cultural Understanding",
      text: "Understand cultures and sub-cultures and how it impacts your product acceptability",
      colSpan: 1,
      rowSpan: 1,
    },
    {
      heading: "UI and UX Testing",
      text: "Tactical research to understand user experience and journey across digital and physical worlds",
      colSpan: 1,
      rowSpan: 1,
    },
  ],
};

function InsightsSection() {
  const [activeTab, setActiveTab] = useState(1);
  const [showImage, setShowImage] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [hasScrolledDown, setHasScrolledDown] = useState(false);

  const [insightsWidth, setInsightsWidth] = useState(0);
  const insightsAgencyRef = useRef(null);
  const [isAbsolute, setIsAbsolute] = useState(true);

  useEffect(() => {
    if (insightsAgencyRef.current) {
      const width = insightsAgencyRef.current.offsetWidth;
      // Add a small buffer (e.g., 8px) to account for the gap
      const buffer = 8;
      setInsightsWidth(width + buffer);
    }
  }, [hasScrolledDown]); // Re-run when stage changes

  useEffect(() => {
    if (hasScrolledDown) {
      const timer = setTimeout(() => {
        setIsAbsolute(false);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setIsAbsolute(true);
    }
  }, [hasScrolledDown]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 } // Triggers when 10% of the element is visible
    );

    const section = document.getElementById("InsightsSection");
    if (section) {
      observer.observe(section);
    }

    // Add scroll event listener
    const handleScroll = () => {
      if (isVisible && window.scrollY > section?.offsetTop) {
        setHasScrolledDown(true);
      }
    };

    // Add keyboard event listener for down arrow
    const handleKeyPress = (event) => {
      if (event.code === "ArrowDown" && isVisible && !hasScrolledDown) {
        setHasScrolledDown(true);
        // Prevent default scrolling behavior
        event.preventDefault();
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      if (section) {
        observer.unobserve(section);
      }
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [isVisible, hasScrolledDown]); // Added hasScrolledDown to dependencies

  useEffect(() => {
    if (hasScrolledDown) {
      gsap.fromTo(
        ".blue-text",
        {
          opacity: 0,
          y: 50,
          rotateX: -45,
          transformOrigin: "0% 50% -50",
          filter: "blur(8px)",
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          filter: "blur(0px)",
          duration: 1.2,
          stagger: 0.2,
          ease: "power4.out",
          delay: 0.3,
        }
      );
      const timer = setTimeout(() => {
        setShowImage(true);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [hasScrolledDown]);
  useEffect(() => {
    if (hasScrolledDown) {
      document.body.style.overflow = "hidden";

      const timer = setTimeout(() => {
        document.body.style.overflow = "auto";
      }, 2000);

      return () => {
        clearTimeout(timer);
        document.body.style.overflow = "auto";
      };
    }
  }, [hasScrolledDown]);

  useEffect(() => {
    if (hasScrolledDown) {
      gsap.fromTo(
        ".reveal-text",
        { width: 0, opacity: 0 },
        {
          width: "auto",
          opacity: 1,
          duration: 1.5,
          ease: "power1.out",
        }
      );
    }
  }, [hasScrolledDown]);
  const blueRef= useRef(null)
  return (
    <div id="InsightsSection" className="min-h-screen w-full pt-8 sm:pt-32 pb-8 sm:pb-12 px-6 sm:px-24">
      {/* Heading and Paragraph */}
      <div>
        <div className="flex flex-col text-[28px] sm:text-[40px] leading-tight ease-in-out transition-all duration-500">
          {/* Mobile heading */}
          <div className="block sm:hidden">
            <h1 className="mb-3">Industry-agnostic insighting services</h1>
            <h1 className={`text-primary-light transition-opacity duration-500 ${hasScrolledDown ? "opacity-100" : "opacity-0"}`}>
              designed for B2C, B2B, and D2C organisations
            </h1>
            <h1 className="mt-3">to demystify macro trends</h1>
          </div>

          {/* Desktop heading with animations */}
          <div className="hidden sm:block">
            <div className="flex flex-row relative gap-2">
              <div className="whitespace-nowrap">
                Industry-agnostic insighting services
              </div>
              <div
                className={`text-primary-light transition-opacity duration-500 ${
                  hasScrolledDown ? "opacity-100 " : "opacity-0 absolute"
                } whitespace-nowrap`}
              >
                designed for B2C, B2B, and
              </div>
            </div>
            <div className="flex flex-row relative gap-2">
              <div
                ref={insightsAgencyRef}
                className={`text-primary-light transition-opacity duration-500 ${
                  hasScrolledDown ? "opacity-100 " : "opacity-0 "
                } whitespace-nowrap`}
              >
                D2C organisations
              </div>
              <div
                className={`transition-all duration-500 whitespace-nowrap ${
                  isAbsolute ? "absolute" : ""
                } ${!hasScrolledDown ? "block left-0" : "inline-block"}`}
                style={{
                  left: !hasScrolledDown ? 0 : `${insightsWidth}px`,
                }}
              >
                to demystify macro trends
              </div>
            </div>
          </div>
        </div>
        <p className="font-poppins text-base sm:text-lg mt-5">
          Rooted in classical business and research principles, we design every
          project with a blend of methodologies, but customize the approach to
          best-fit your unique business needs. A glimpse at the list of some of our
          use-cases
        </p>
      </div>

      {/* Mobile view - Simple list of services */}
      <div className="block sm:hidden mt-8">
        <div className="flex flex-col gap-6">
          {tabsData[activeTab].map((item, index) => (
            <div key={index} className="p-4 bg-white/5 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">{item.heading}</h3>
              <p className="text-sm text-gray-300">{item.text}</p>
            </div>
          ))}
        </div>
        {/* Simple mobile tabs */}
        <div className="flex items-center justify-center gap-4 mt-8">
          {Object.keys(tabsData).map((tab) => (
            <div
              key={tab}
              onClick={() => setActiveTab(Number(tab))}
              className={`h-2 w-2 rounded-full ${
                activeTab === Number(tab) ? "bg-[#2ED89F]" : "bg-gray-300"
              } cursor-pointer`}
            ></div>
          ))}
        </div>
      </div>

      {/* Desktop Grid */}
      <div className="hidden sm:grid grid-cols-4 mt-16 gap-7">
        {tabsData[activeTab].map((item, index) => (
          <SlidingSquare
            key={index}
            index={index}
            sethov={hasScrolledDown}
            heading={item.heading}
            text={item.text}
            colSpan={item.colSpan}
            rowSpan={item.rowSpan}
          />
        ))}
      </div>

      {/* Desktop Tabs */}
      <div className="hidden sm:flex items-center justify-center gap-10 text-[40px] mt-16">
        {Object.keys(tabsData).map((tab) => (
          <div
            key={tab}
            onClick={() => setActiveTab(Number(tab))}
            className={`h-[5px] w-1/5 ${
              activeTab === Number(tab) ? "bg-[#2ED89F]" : "bg-gray-300"
            } cursor-pointer`}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default InsightsSection;
