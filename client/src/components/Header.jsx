import React from "react";
import { AiOutlineSearch, AiOutlineCloseCircle } from "react-icons/ai";
import { CiLocationOn } from "react-icons/ci";
import CustomButton from "./CustomButton";
import { popularSearch } from "../utils/data";

const SearchInput = ({ placeholder, icon, value, setValue, styles }) => {
  const handleChange = (e) => setValue(e.target.value);
  const clearInput = () => setValue("");

  return (
    <div
      className={`flex w-full md:w-1/3 items-center gap-3 p-2 md:p-3 bg-gradient-to-r from-[#1e293b] to-[#334155] rounded-xl shadow-lg transition-all duration-500 ease-in-out animate-fadeInUp text-white ${styles}`}
    >
      <div className="text-xl text-gray-400">{icon}</div>
      <input
        value={value}
        onChange={handleChange}
        type="text"
        className="w-full bg-transparent text-sm md:text-base text-white placeholder-gray-400 outline-none focus:ring-0"
        placeholder={placeholder}
      />
      <AiOutlineCloseCircle
        className="hidden md:flex text-gray-400 hover:text-white text-xl cursor-pointer transition duration-200"
        onClick={clearInput}
      />
    </div>
  );
};

const Header = ({
  title,
  type,
  handleClick,
  searchQuery,
  setSearchQuery,
  location,
  setLocation,
}) => {
  return (
    <div className="bg-gradient-to-br from-[#0f172a] via-[#0a1629] to-[#1e293b] relative overflow-hidden">
      <div
        className={`container mx-auto px-5 ${
          type ? "h-[500px]" : "h-[350px]"
        } flex items-center justify-center relative`}
      >
        <div className="w-full z-10 animate-fadeInUp text-center">
          <h1 className="text-white font-extrabold text-4xl md:text-5xl mb-8 drop-shadow-md transition-all duration-500 animate-fadeInUp delay-100">
            {title}
          </h1>

          <div className="w-full max-w-5xl mx-auto flex flex-col md:flex-row gap-4 items-center justify-center bg-gradient-to-r from-[#1e293b] to-[#0f172a] shadow-2xl px-5 py-4 md:py-6 rounded-full backdrop-blur-md transition-all duration-500 ease-in-out animate-fadeInUp delay-300">
            <SearchInput
              placeholder="Job Title or Keywords"
              icon={<AiOutlineSearch />}
              value={searchQuery}
              setValue={setSearchQuery}
            />
            <SearchInput
              placeholder="Add Country or City"
              icon={<CiLocationOn />}
              value={location}
              setValue={setLocation}
              styles="hidden md:flex"
            />
            <CustomButton
              onClick={handleClick}
              title="Search"
              containerStyles="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-2 rounded-full text-sm md:text-base shadow-lg hover:shadow-indigo-500 transition-all duration-300"
            />
          </div>

          {/* Optional: Popular search keywords */}
          {type && (
            <div className="w-full flex flex-wrap justify-center gap-3 md:gap-5 mt-10">
              {popularSearch.map((search, i) => (
                <span
                  key={i}
                  className="bg-blue-900/20 border border-blue-700 text-blue-400 px-3 py-1 rounded-full text-sm hover:bg-blue-800/40 cursor-pointer transition-all duration-300"
                >
                  {search}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
