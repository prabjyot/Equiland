import { useState, useEffect } from "react";
import { FiArrowRight } from "react-icons/fi";

function ContactUsSection() {

  const words = [
    "Strategy", "Campaign", "Business", "Resource", "Marketing", "Media", 
    "Product", "Vertical", "Geography", "Market", "Agency", 
    "Planning", "Design", "Investment", "Audience"
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 800); 

    return () => clearInterval(interval);
  }, []);

  return (
    <div id="ContactUsSection" className="pt-8 sm:pt-16 pb-16 sm:pb-32 px-6 sm:px-24">
      <h2 className="text-[28px] sm:text-[40px] leading-tight sm:leading-[46px]">
        We are just getting started,{" "}
        <span className="text-primary-light">
          get in touch to explore{" "}
          <span className="hidden sm:inline"><br /></span>
          collaboration opportunities
        </span>{" "}
        on a journey together for
        <span className="hidden sm:inline"><br /></span>{" "}
        Your next{" "}
        <span className="text-[#2ED89F] transition-all ease-in-out duration-300">{words[index]}</span> change
      </h2>
      <div className="mt-10 sm:mt-20 flex flex-col sm:flex-row items-center justify-between sm:gap-44">
        <form className="w-full sm:flex-1 flex flex-col gap-8 sm:gap-12">
          <input
            type="text"
            className="w-full border-b border-text-brownish bg-secondary-cream p-2 text-base sm:text-lg placeholder:text-primary-light placeholder:text-base sm:placeholder:text-lg focus:outline-none"
            placeholder="Name"
          />
          <input
            type="email"
            className="w-full border-b border-text-brownish bg-secondary-cream p-2 text-base sm:text-lg placeholder:text-primary-light placeholder:text-base sm:placeholder:text-lg focus:outline-none"
            placeholder="Email ID"
          />
          {/* <input
            type="number"
            className="w-full border-b border-text-brownish bg-secondary-cream p-2 text-base sm:text-lg placeholder:text-primary-light placeholder:text-base sm:placeholder:text-lg focus:outline-none"
            placeholder="Contact No."
          /> */}
          <div className="border-b border-text-brownish">
            <textarea
              type="text-area"
              className="w-full max-h-40 min-h-20 bg-secondary-cream p-2 text-base sm:text-lg placeholder:text-primary-light placeholder:text-base sm:placeholder:text-lg focus:outline-none"
              placeholder="Leave us a message or upload a written brief"
            />
          </div>
          <div className="w-full flex justify-end">
            <button className="bg-[#2ED89F] text-secondary-cream w-[56px] h-[56px] sm:w-[72px] sm:h-[72px] rounded-full flex items-center justify-center text-3xl sm:text-4xl">
              <FiArrowRight />
            </button>
          </div>
        </form>

        {/* Divider for mobile */}
        <div className="flex sm:hidden items-center gap-4 w-full my-8">
          <div className="h-[1px] flex-1 bg-gray-300"></div>
          <h4 className="text-gray-600">or</h4>
          <div className="h-[1px] flex-1 bg-gray-300"></div>
        </div>

        {/* Vertical divider for desktop */}
        <div className="hidden sm:flex flex-col gap-2 items-center justify-center">
          <h4 className="text-gray-600">or</h4>
          <div className="h-32 w-[1px] bg-gray-300"></div>
        </div>

        <button className="flex flex-col items-center justify-center gap-3 sm:mr-24">
          <img src="/notebook.svg" alt="" className="w-16 sm:w-auto" />
          <a href="#" className="underline text-center">
            Fill out our guided <br /> research brief
          </a>
        </button>
      </div>
    </div>
  );
}

export default ContactUsSection;
