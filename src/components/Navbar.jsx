import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

// const navLinks = [
//   {
//     label: "Our Services",
//     type: "section",
//     to: "SaasSection",
//   },
//   {
//     label: "Our Journey",
//     type: "page",
//     to: "/our-journey",
//   },
//   {
//     label: "Our Product",
//     type: "section",
//     to: "InsightsSection",
//   },
//   {
//     label: "Get In Touch",
//     type: "section",
//     to: "/#ContactUsSection",
//   },
// ];

const navLinks = [
  {
    label: "Our Journey",
    page: "/our-journey",
    section: "",
  },
  {
    label: "Our Services",
    page: "/",
    section: "InsightsSection",
  },
  {
    label: "Our Product",
    page: "/",
    section: "SaasSection",
  },
  {
    label: "Get In Touch",
    page: "/",
    section: "ContactUsSection",
  },
];

const scrollToSection = (id) => {
  const section = document.getElementById(id);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
};

function Navbar({ canScroll, SetCanScroll }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate();

  const handleNavigation = (page, section) => {
    setIsMenuOpen(false); // Close the mobile menu
    navigate(page); // Navigate to the page first

    // Wait a bit before scrolling to ensure the page loads
    setTimeout(() => {
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <div className="py-6 lg:py-12 px-5 lg:px-24 flex items-center justify-between ">
      <a href="/" className="">
        <img src="/Eq Final Logo-14.png" alt="Full Logo" className="w-[10rem]" />
      </a>
      <div className="items-center gap-14 hidden xl:flex">
        {navLinks.map((navLink, index) => (
          <p
            className="text-primary-light font-medium whitespace-nowrap text-base font-poppins cursor-pointer"
            key={index}
            onClick={() => handleNavigation(navLink.page, navLink.section)}
          >
            {navLink.label}
          </p>
        ))}
      </div>
      <div className="block xl:hidden">
        <button onClick={() => setIsMenuOpen(true)} className="">
          <FiMenu size={24} />
        </button>
      </div>
      <div
        className={`bg-secondary-cream border w-full p-8 md:w-[500px] h-screen z-30 fixed top-0 right-0 duration-300 ${
          isMenuOpen ? "" : "translate-x-[600%]"
        }`}
      >
        <div className="w-full text-zinc-900 flex justify-end">
          <button onClick={() => setIsMenuOpen(false)} className="">
            <FiX size={24} />
          </button>
        </div>
        <div className="flex flex-col gap-8 mt-20">
          {navLinks.map((navLink, index) => (
            <p
              className="text-primary-light font-medium whitespace-nowrap text-base font-poppins cursor-pointer"
              key={index}
              onClick={() => handleNavigation(navLink.page, navLink.section)}
            >
              {navLink.label}
            </p>
          ))}
        </div>
      </div>
      <div
        className={`hidden md:block fixed w-full h-screen bg-black opacity-20 z-10 inset-0 duration-300 ${
          isMenuOpen ? "translate-x-0" : "translate-x-[100%]"
        }`}
      ></div>
    </div>
  );
}

export default Navbar;
