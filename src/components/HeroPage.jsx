import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";

// Define scroll stages with their thresholds and video sources
const SCROLL_STAGES = {
  INITIAL: {
    threshold: 0,
    videoSrc: "/justlinkeloop3.mp4",
  },
  STAGE_1: {
    threshold: 100,
    videoSrc: "/gridloop.mp4",
  },
  STAGE_2: {
    threshold: 300,
    videoSrc: "/maze.mp4",
  },
  STAGE_3: {
    threshold: 500,
    type: "image",
    src: "/101.svg",
  },
  // Add more stages as needed
};

function HeroPage({ canScroll, setCanScroll }) {
  const [activeTab, setActiveTab] = useState("SaaS Platform");
  const [showLogo, setShowLogo] = useState(false);
  const [currentStage, setCurrentStage] = useState("INITIAL");
  const [canProgress, setCanProgress] = useState(false);
  const [isAbsolute, setIsAbsolute] = useState(true);
  const [insightsWidth, setInsightsWidth] = useState(0);
  const [emotionsWidth, setEmotionsWidth] = useState(0);
  const videoRef = useRef(null);
  const insightsAgencyRef = useRef(null);
  const emotionsRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handleWheel = (event) => {
      if (!canScroll && event.deltaY > 0 && canProgress) {
        progressToNextStage();
      }
    };

    const handleTouchStart = (e) => {
      touchStart.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      if (!touchStart.current) return;

      const deltaY = touchStart.current - e.touches[0].clientY;
      if (!canScroll && deltaY > 0 && canProgress) {
        progressToNextStage();
      }
      touchStart.current = null;
    };
    if (canScroll) {
      document.body.style.overflow = "scroll";
    }
    // Add event listeners for both wheel and touch events
    window.addEventListener("wheel", handleWheel);
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove);

    return () => {
      document.body.style.overflow = "scroll";
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [canScroll, canProgress]);
  const touchStart = useRef(null); // Add ref for touch events

  const progressToNextStage = () => {
    if (!canProgress) return;

    const stageSequence = Object.keys(SCROLL_STAGES);
    const currentIndex = stageSequence.indexOf(currentStage);

    if (currentIndex < stageSequence.length - 1) {
      setCanProgress(false);
      const newStage = stageSequence[currentIndex + 1];

      if (videoRef.current && SCROLL_STAGES[newStage].videoSrc) {
        // Store current video time before transition
        const currentTime = videoRef.current.currentTime;

        // Create and prepare the new video element
        const newVideo = document.createElement("video");
        newVideo.src = SCROLL_STAGES[newStage].videoSrc;
        newVideo.muted = true;
        newVideo.playsInline = true;
        newVideo.loop = true;

        // Preload the new video
        newVideo.load();
        newVideo.play().then(() => {
          // Fade out current video
          videoRef.current.src = SCROLL_STAGES[newStage].videoSrc;
          videoRef.current.load();
          videoRef.current.play().then(() => {
            // Set the time of new video to match previous video
            videoRef.current.currentTime = currentTime;
            // Fade in new video
          });
        });
      }

      setCurrentStage(newStage);

      // Enable scrolling if moving to or past STAGE_3
      if (newStage === "STAGE_3") {
        setTimeout(() => {
          document.body.style.overflow = "auto";
          setCanScroll(true);
        }, 2000);
      }

      setTimeout(() => {
        setCanProgress(true);
      }, 2000);
    } else {
      // Enable scrolling when reaching the final stage
      document.body.style.overflow = "auto";
      setCanScroll(true);
      setCanProgress(false); // Prevent further progression attempts
    }
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.code === "Space" || event.code === "ArrowDown") {
        if (!canScroll && canProgress) {
          progressToNextStage();
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [currentStage, canProgress, canScroll]);

  useEffect(() => {
    // Handle video and animations sequence
    const video = videoRef.current;

    // Play video first
    if (video) {
      video.play();
    }

    // Add GSAP animation after 3 seconds
    const timer = setTimeout(() => {
      setShowLogo(true);
      // Animate the hero text elements
      gsap.from(".hero-animation", {
        opacity: 0,
        y: 30,
        duration: 1,
        stagger: 0.3,
        ease: "power3.out",
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Update the GSAP effect for text transition
  useEffect(() => {
    if (currentStage === "STAGE_1") {
      // Staggered reveal animation for each line
      gsap.fromTo(
        ".stage-text",
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
    } else {
      // Elegant exit animation
      gsap.to(".stage-text", {
        opacity: 0,
        y: -30,
        rotateX: 45,
        filter: "blur(8px)",
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.in",
      });
    }

    if (currentStage === "STAGE_3") {
      // Split text animation for stage 3
      gsap.fromTo(
        ".stage-text2",
        {
          opacity: 0,
          scale: 1.1,
          y: 30,
          filter: "blur(10px)",
          transformOrigin: "50% 50%",
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.4,
          stagger: 0.25,
          ease: "elastic.out(1, 0.8)",
          delay: 0.3,
        }
      );

      // Smooth scale animation for the image
      gsap.fromTo(
        ".stage-3-image",
        {
          opacity: 0,
          scale: 0.92,
          rotate: -2,
        },
        {
          opacity: 1,
          scale: 1,
          rotate: 0,
          duration: 1.5,
          ease: "power3.out",
        }
      );
    } else {
      // Elegant exit animation for stage 3 text
      gsap.to(".stage-text2", {
        opacity: 0,
        y: -40,
        scale: 0.95,
        filter: "blur(8px)",
        duration: 0.6,
        stagger: 0.15,
        ease: "power3.in",
      });
    }
  }, [currentStage]);

  // Add new useEffect for initial delay
  useEffect(() => {
    // Set initial delay before allowing progression
    const timer = setTimeout(() => {
      setCanProgress(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []); // Empty dependency array means this runs once on mount

  useEffect(() => {
    const handleScroll = () => {
      const animationElement = document.getElementById("animation");
      if (animationElement) {
        const rect = animationElement.getBoundingClientRect();
        const isInView =
          rect.top - 190 >= 0 && rect.bottom - 190 <= window.innerHeight;
        if (isInView && currentStage !== "STAGE_3") {
          setCanScroll(false);
        } else {
          setCanScroll(true);
        }
      } else {
        setCanScroll(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentStage]);

  // Add new useEffect for handling absolute class
  useEffect(() => {
    if (currentStage !== "INITIAL") {
      const timer = setTimeout(() => {
        setIsAbsolute(false);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setIsAbsolute(true);
    }
  }, [currentStage]);

  // Update useEffect to use setState
  useEffect(() => {
    if (insightsAgencyRef.current) {
      const width = insightsAgencyRef.current.offsetWidth;
      // Add a small buffer (e.g., 8px) to account for the gap
      const buffer = 8;
      setInsightsWidth(width + buffer);
    }
  }, [currentStage]); // Re-run when stage changes

  useEffect(() => {
    if (emotionsRef.current) {
      const width = emotionsRef.current.offsetWidth;
      // Add a small buffer (e.g., 8px) to account for the gap
      const buffer = 8;
      setEmotionsWidth(width + buffer);
    }
  }, [currentStage]); // Re-run when stage changes

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="py-20 px-5 lg:px-24 font-lexend w-full h-full flex items-center justify-center ">
      {!canScroll && (
        <>
          <button
            onClick={progressToNextStage}
            className={`fixed bottom-4 right-4 px-4 py-2 rounded opacity-0 ${
              canProgress
                ? "bg-primary-light cursor-pointer"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            disabled={!canProgress}
          >
            {canProgress ? "Next Stage" : "Please wait..."}
          </button>

          {/* Added loader indicator */}
          <div className="fixed bottom-8 right-5 transform-translate-x-1/2 flex flex-col items-center gap-2">
            <div
              className={`w-5 h-5 rounded-full border-4 border-gray-200 border-t-primary-light ${
                canProgress ? "opacity-0" : "animate-spin"
              }`}
            ></div>
            {/* <p className="text-sm text-gray-600">
              {canProgress ? 'Scroll to continue' : 'Loading...'}
            </p> */}
          </div>
        </>
      )}
      <div
        id="animation"
        className="flex flex-col gap-44 items-center justify-center w-full"
      >
        <div className="grid sm:grid-cols-2 sm:xl:grid-cols-[30vw_1fr] sm:gap-40 gap-6 w-full">
          {/* Mobile content */}
          <div className="block sm:hidden">
            <div className="text-[32px] leading-tight mb-6">
              We are a tech-powered consumer insights agency, rooted in classical principles.
            </div>
            <p className="font-poppins text-lg">
              Born from the heart to understand the mind, Equilibrium is a full-service consumer insights agency, committed to providing clients with agile insights through our proprietary AI-enhanced SaaS platform
            </p>
          </div>

          {/* Desktop content */}
          <div className="hidden sm:flex sm:items-start sm:relative sm:flex-col">
            {SCROLL_STAGES[currentStage].type === "image" ? (
              <img
                src={SCROLL_STAGES[currentStage].src}
                alt="101"
                className="object-contain stage-3-image opacity-0 w-full absolute"
              />
            ) : (
              <video
                ref={videoRef}
                className="object-cover aspect-video w-full"
                muted
                playsInline
                loop
              >
                <source
                  src={SCROLL_STAGES[currentStage].videoSrc}
                  type="video/mp4"
                />
              </video>
            )}
            {currentStage != "STAGE_3" && (
              <div className="left-0 w-full h-3 bg-secondary-cream absolute bottom-0"></div>
            )}
          </div>
          <div
            className={`hidden sm:flex sm:flex-col sm:gap-10 ${
              showLogo ? "opacity-100" : "opacity-0"
            }`}
          >
            {(currentStage == "INITIAL" || currentStage == "STAGE_1") && (
              <>
                <div className="flex flex-col text-[40px] leading-tight ease-in-out transition-all duration-500">
                  <div className="flex flex-row relative gap-2">
                    <div
                      className={`${
                        currentStage === "INITIAL" ? "block" : "inline-block"
                      } whitespace-nowrap`}
                    >
                      We are
                    </div>
                    <div
                      className={`text-primary-light transition-opacity duration-500 ${
                        currentStage === "STAGE_1"
                          ? "opacity-100 "
                          : "opacity-0 absolute"
                      } whitespace-nowrap`}
                    >
                      a tech-powered consumer
                    </div>{" "}
                  </div>
                  <div className="flex flex-row relative gap-2">
                    <div
                      ref={insightsAgencyRef}
                      className={`text-primary-light transition-opacity duration-500 ${
                        currentStage === "STAGE_1"
                          ? "opacity-100 "
                          : "opacity-0 "
                      } whitespace-nowrap`}
                    >
                      insights agency,
                    </div>
                    <div
                      className={`transition-all duration-500 whitespace-nowrap ${
                        isAbsolute ? "absolute" : ""
                      } ${
                        currentStage === "INITIAL"
                          ? "block left-0"
                          : "inline-block"
                      }`}
                      style={{
                        left:
                          currentStage === "INITIAL" ? 0 : `${insightsWidth}px`,
                      }}
                    >
                      {"  rooted in"}
                    </div>
                  </div>
                  <div className="flex flex-row relative">
                    <span className="block whitespace-nowrap">
                      classical principles
                    </span>
                  </div>
                </div>
                <p
                  className={` transition-all duration-500 ${
                    currentStage == "STAGE_1" ? "opacity-100" : "opacity-0"
                  } font-poppins text-lg `}
                >
                  Born from the heart to understand the mind, Equilibrium is a
                  full-service consumer insights agency, committed to providing
                  clients with agile insights through our proprietary
                  AI-enhanced SaaS platform
                </p>
              </>
            )}
            {(currentStage == "STAGE_2" || currentStage == "STAGE_3") && (
              <>
                <div className="flex flex-col text-[40px] leading-tight ease-in-out transition-all duration-500">
                  <div className="flex flex-row relative gap-2">
                    <div
                      className={`${
                        currentStage === "STAGE_2" ? "block" : "inline-block"
                      } whitespace-nowrap`}
                    >
                      At the core of any business,
                    </div>
                    <div
                      className={`text-primary-light transition-opacity duration-500 ${
                        currentStage === "STAGE_3"
                          ? "opacity-100 "
                          : "opacity-0 absolute"
                      } whitespace-nowrap`}
                    >
                      insights
                    </div>{" "}
                  </div>
                  <div className="flex flex-row relative gap-2">
                    <div
                      className={`text-primary-light transition-opacity duration-500 ${
                        currentStage === "STAGE_3"
                          ? "opacity-100 "
                          : "opacity-0 absolute"
                      } whitespace-nowrap`}
                    >
                      are driven by human conversations
                    </div>{" "}
                  </div>
                  <div className="flex flex-row relative">
                    <div
                      ref={insightsAgencyRef}
                      className={`text-primary-light transition-opacity duration-500 ${
                        currentStage === "STAGE_3"
                          ? "opacity-100 "
                          : "opacity-0 "
                      } whitespace-nowrap`}
                    >
                      and human emotions,
                    </div>
                    <div
                      className={`transition-all duration-500 whitespace-nowrap ${
                        isAbsolute ? "absolute" : "absolute"
                      } ${
                        currentStage === "STAGE_2"
                          ? "block left-0"
                          : "inline-block"
                      }`}
                      style={{
                        left:
                          currentStage === "STAGE_2" ? 0 : `${insightsWidth}px`,
                      }}
                    >
                      technology
                    </div>
                  </div>
                  <div className="flex flex-row relative">
                    <span className="block whitespace-nowrap">
                      can only augment decision-making{" "}
                    </span>
                  </div>
                </div>

                <p
                  className={`font-poppins text-lg transition-all duration-500 ${
                    currentStage == "STAGE_3" ? "opacity-100" : "opacity-0"
                  }`}
                >
                  Blending conversational and observational insights with other
                  data points can do wonders for your business. However,
                  collecting and processing human insights through primary
                  research can be resource-intensive. That's why,{" "}
                  <span className="text-primary-light ">
                    {" "}
                    to empower your decision-making process, we offer two
                    distinct solutions for you...
                  </span>
                </p>
              </>
            )}
          </div>
        </div>

        <div className="flex items-start justify-center gap-4 sm:gap-20 text-[24px] sm:text-[40px]">
          <div
            className={`cursor-pointer text-center`}
            onClick={() => {
              setActiveTab("SaaS Platform");
              scrollToSection("SaasSection");
              setCanScroll(true);
            }}
          >
            <h2>SaaS Platform</h2>
            {activeTab === "SaaS Platform" && (
              <div className="h-[5px] bg-[#2ED89F] w-full mt-2"></div>
            )}
          </div>
          <div
            className={`cursor-pointer text-center`}
            onClick={() => {
              setActiveTab("Insights Agency");
              scrollToSection("InsightsSection");
              setCanScroll(true);
            }}
          >
            <h2>Insights Agency</h2>
            {activeTab === "Insights Agency" && (
              <div className="h-[5px] bg-[#2ED89F] w-full mt-2"></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroPage;
