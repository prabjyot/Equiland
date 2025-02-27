import React, { useState, useEffect, useRef } from "react";

import { FiArrowRight } from "react-icons/fi";
import gsap from "gsap";

function SaaSSection() {
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

    const section = document.getElementById("SaasSection");
    if (section) {
      observer.observe(section);
    }

    // Add scroll event listener
    const handleScroll = () => {
      if (isVisible && window.scrollY > section?.offsetTop) {
        setHasScrolledDown(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      if (section) {
        observer.unobserve(section);
      }
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isVisible]); // Added isVisible to dependencies

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
    <div
      id="SaasSection"
      className="pt-8 sm:pt-32 px-6 sm:pl-24 bg-primary-dark text-secondary-cream flex flex-col gap-8 sm:gap-14"
    >
      <div className="flex flex-col sm:flex-row gap-8 sm:gap-14 items-start sm:items-stretch">
        <img src="/Eq Final Logo-24.png" alt="Logo" className="w-[100px] sm:w-[150px]" />

        {/* Mobile heading */}
        <div className="block sm:hidden text-[28px] leading-tight">
          <div>One SaaS platform</div>
          <div className={`text-primary-light transition-opacity duration-500 ${hasScrolledDown ? "opacity-100" : "opacity-0"}`}>
            for transparent, high-quality, and agile insights,
          </div>
          <div>streamlining the entire primary research funnel</div>
        </div>

        {/* Desktop heading with animations */}
        <div className="hidden sm:flex flex-col text-[40px] leading-tight ease-in-out transition-all duration-500">
          <div className="flex flex-row relative gap-2">
            <div className="whitespace-nowrap">One SaaS platform</div>
            <div
              className={`text-primary-light transition-opacity duration-500 ${
                hasScrolledDown ? "opacity-100 " : "opacity-0 absolute"
              } whitespace-nowrap`}
            >
              for transparent, high-quality,  
            </div>{" "}
          </div>
          <div className="flex flex-row relative gap-2">
            <div
              ref={insightsAgencyRef}
              className={`text-primary-light transition-opacity duration-500 ${
                hasScrolledDown ? "opacity-100 " : "opacity-0 "
              } whitespace-nowrap`}
            >
             and agile insights, 
            </div>
            <div
              className={`transition-all duration-500 whitespace-nowrap ${
                isAbsolute ? "absolute" : ""
              } ${!hasScrolledDown ? "block left-0" : "inline-block"}`}
              style={{
                left: !hasScrolledDown ? 0 : `${insightsWidth}px`,
              }}
            >
              {"  streamlining the entire "}
            </div>
          </div>
          <div className="flex flex-row relative">
            <span className="block whitespace-nowrap">
            primary research funnel
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between">
        <div className="flex flex-col gap-8 sm:gap-16 w-full sm:w-[30%] font-poppins text-base sm:text-lg">
          <div className="flex flex-col gap-6 sm:gap-8">
            <p className="tracking-wide">
              Designed to automate and simplify the research infrastructure,
              tools on the EQ platform act as tailwinds propelling the research
              journey – from designing the research objectives to generating the
              output
            </p>
            <p className="tracking-wide">
              Use the EQ platform for DIY research or reach out to Equilibrium
              for 360° services – the choice is yours
            </p>
          </div>

          <a
            href="https://eqinsights.io/"
            target="_blank"
            className={`w-fit flex items-center gap-3 font-lexend  ${
              hasScrolledDown ? "opacity-100" : "opacity-0"
            } transition-opacity duration-500`}
          >
            <div className={`cursor-pointer`}>
              <h2 className="font-medium sm:whitespace-nowrap">
                Click to visit SaaS platform
              </h2>
              <div className="h-[1px] bg-secondary-cream w-full"></div>
            </div>
            <div className="bg-[#2ED89F] w-10 h-10 rounded-full flex items-center justify-center">
              <FiArrowRight className="text-primary-dark text-xl" />
            </div>
          </a>
        </div>

        {/* Image section */}
        <div className="hidden sm:block">
          {hasScrolledDown && (
            <img
              src={showImage ? "/saas-timeline.svg" : "/saasplat.gif"}
              alt="SaaS platform demonstration"
              className="w-full h-full object-contain object-right"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default SaaSSection;
