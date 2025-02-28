import React, { useState, useEffect, useRef } from "react";

import gsap from "gsap";
function JourneyHero() {
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

    const section = document.getElementById("JourneyHero");
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

  useEffect(() => {
    gsap.fromTo(
      ".first-text",
      {
        opacity: 0,
        y: 10,
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
  }, []);

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
  const blueRef= useRef(null)
  return (
    <div
      id="JourneyHero"
      className="py-6 sm:py-8 md:py-12 lg:py-28 px-4 sm:px-5 lg:px-24 relative overflow-hidden"
    >
      {/* heading */}

      <div style = {{lineHeight: '2.5rem'}} className="flex flex-col text-base sm:text-lg md:text-xl lg:text-[32px] xl:text-[40px] leading-tight ease-in-out transition-all duration-500">
        <div className="flex flex-row relative gap-2" >
          <div className={`whitespace-nowrap`}>
            Change is the only constant truth,
          </div>
          <div
            className={`text-primary-light transition-opacity duration-500 ${
              hasScrolledDown ? "opacity-100 " : "opacity-0 absolute"
            } whitespace-nowrap`}
          >
            riding
          </div>{" "}
        </div>
      {hasScrolledDown && <><div className="flex flex-row relative gap-2">
          <div
            ref={insightsAgencyRef}
            className={`text-primary-light transition-opacity duration-500 ${
              hasScrolledDown ? "opacity-100 " : "opacity-0 absolute"
            } whitespace-nowrap`}
          >
            the wave of change is as complex for
          </div>
        </div>
        <div className="flex flex-row relative gap-2">
          <div
            ref={insightsAgencyRef}
            className={`text-primary-light transition-opacity duration-500 ${
              hasScrolledDown ? "opacity-100 " : "opacity-0 "
            } whitespace-nowrap`}
          >
            marketers as it is for consumers,
          </div>
          {/* <div
            className={`transition-all duration-500 whitespace-nowrap ${
              isAbsolute ? "absolute" : ""
            } ${!hasScrolledDown ? "block left-0" : "inline-block"}`}
            style={{
              left: !hasScrolledDown ? 0 : `${insightsWidth}px`,
            }}
          >
            and a
          </div>*/}
        </div> </> }
        <div className="flex flex-row relative gap-2">
          <div className={`whitespace-nowrap`}>
          and a determined effort to conquer
          </div>
        </div>
        <div className="flex flex-row relative">
          <span className="block whitespace-nowrap">
          change led us to pursue Equilibrium
          </span>
        </div>
      </div>
      {/* absolute svg */}
      <div className="hidden sm:block absolute left-0 right-0 top-48 md:top-8 lg:top-64 xl:top-[20vh] w-full h-[100vh] z-[10]">
        {hasScrolledDown && (
          <img
            src={showImage ? "/curveLines.svg" : "/ourjourney.gif"}
            alt=""
            className="w-full"
          />
        )}
        {!hasScrolledDown && (
          <img
            src="/curveLines.svg"
            alt=""
            className="w-full"
            style={{
              clipPath: hasScrolledDown ? "none" : "inset(25% 39%)",
            }}
          />
        )}
      </div>
      {/* paragraph */}
      <div className="flex flex-col lg:flex-row  lg:items-start  lg:justify-end gap-4 lg:gap-24 font-poppins ml-[20%] lg:m-0 lg:w-full mt-32 lg:mt-64 xl:mt-72 text-xs lg:text-lg leading-5 lg:leading-7">
        <p className="font-semibold  lg:w-[20%] first-text">
          The binding fabric of this change is the human mindset, which is ever
          evolving and redefining the status-quo across industries and cultures
        </p>

        <div className="flex flex-col gap-4 lg:gap-10 lg:w-[40%] blue-text">
          {hasScrolledDown && (
            <>
              <p className="">
                While macro numbers don't lie, consumers don't tell the complete
                truth either. Exploring the human behaviour from a holistic
                angle of culture, context, and consciousness becomes imperative
              </p>
              <p className="font-semibold">
                Our core belief is that there is no replacement for human
                conversations in any business vertical
              </p>
              <p className="hidden xl:block">
                As the consumer sits at the heart of any business, capturing the
                essence of their sentiments is crucial. But, in a world
                dominated by big-data and analytics, the beauty of the insights
                that lie in human conversations and consumer immersions is often
                overlooked, primarily because of the relatively higher resources
                required for collecting and processing such data
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default JourneyHero;
