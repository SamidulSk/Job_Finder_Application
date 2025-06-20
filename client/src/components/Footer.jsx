import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { FiInstagram } from "react-icons/fi";
import { footerLinks } from "../utils/data";
import { Link } from "react-router-dom";
import TextInput from "./TextInput";
import CustomButton from "./CustomButton";

const Footer = () => {
  return (
    <footer className="text-white mt-20 bg-[#0f172a]">
      <div className="overflow-x-hidden -mb-0.5">
        <svg
          preserveAspectRatio="none"
          viewBox="0 0 1200 120"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            fill: "#0f172a",
            width: "125%",
            height: 112,
            transform: "rotate(180deg)",
          }}
        >
          <path d="M321.39 56.44c58-10.79 114.16-30.13 172-41.86 82.39-16.72 168.19-17.73 250.45-.39C823.78 31 906.67 72 985.66 92.83c70.05 18.48 146.53 26.09 214.34 3V0H0v27.35a600.21 600.21 0 00321.39 29.09z" />
        </svg>
      </div>

      <div className="bg-[#0f172a]">
        <div className="container px-5 py-20 mx-auto">
          <div className="w-full flex flex-wrap gap-10 justify-between -mb-10 -px-4">
            {footerLinks.map(({ id, title, links }) => (
              <div className="w-auto px-4" key={id + title}>
                <h2 className="font-semibold text-gray-100 tracking-wide text-sm mb-3 uppercase">
                  {title}
                </h2>

                <div className="mb-10 flex flex-col gap-3">
                  {links.map((link, index) => (
                    <Link
                      key={link + index}
                      to="/"
                      className="text-gray-400 text-sm hover:text-white transition"
                    >
                      {link}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Section (Optional, uncomment if needed)
        <div className="bg-[#1e293b]">
          <div className="container mx-auto px-5 py-8 flex flex-wrap items-center justify-between">
            <p className="text-white mb-4 md:mb-0 text-lg">Subscribe to our Newsletter</p>
            <div className="w-full md:w-auto flex gap-2">
              <TextInput
                styles="w-full md:w-64 bg-gray-800 text-white placeholder-gray-400 border border-gray-600 px-3 py-2 rounded"
                type="email"
                placeholder="Enter your email"
              />
              <CustomButton
                title="Subscribe"
                containerStyles="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white"
              />
            </div>
          </div>
        </div>
        */}

        <div className="bg-[#0e1a2b] border-t border-gray-700">
          <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row items-center justify-between">
            <p className="text-gray-400 text-sm text-center sm:text-left">
              &copy; 2023 Job Finder — All rights reserved
            </p>

            <div className="flex space-x-4 text-xl text-gray-300 mt-3 sm:mt-0">
              <a href="#" className="hover:text-white transition">
                <FaFacebookF />
              </a>
              <a href="#" className="hover:text-white transition">
                <FaTwitter />
              </a>
              <a href="#" className="hover:text-white transition">
                <FiInstagram />
              </a>
              <a href="#" className="hover:text-white transition">
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
