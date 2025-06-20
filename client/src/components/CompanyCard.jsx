import React from "react";
import { Link } from "react-router-dom";

const CompanyCard = ({ cmp }) => {
  return (
    <div className="w-full h-24 flex gap-4 items-center justify-between bg-gradient-to-r from-[#1e293b] to-[#0f172a] shadow-xl rounded-xl px-5 hover:shadow-2xl transform hover:scale-[1.02] transition duration-300">
      {/* Left: Logo & Company Info */}
      <div className="w-3/4 md:w-2/4 flex items-center gap-4">
        <Link to={`/company-profile/${cmp?._id}`}>
          <img
            src={cmp?.profileUrl}
            alt={cmp?.name}
            className="w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-blue-500 object-cover shadow-md"
          />
        </Link>
        <div className="flex flex-col justify-center">
          <Link
            to={`/company-profile/${cmp?._id}`}
            className="text-white font-semibold text-base md:text-lg truncate hover:underline"
          >
            {cmp?.name}
          </Link>
          <span className="text-sm text-blue-400">{cmp?.email}</span>
        </div>
      </div>

      {/* Middle: Location */}
      <div className="hidden md:flex flex-col items-center justify-center w-1/4">
        <p className="text-sm text-gray-300">{cmp?.location}</p>
      </div>

      {/* Right: Job Post Count */}
      <div className="w-1/4 flex flex-col items-center justify-center">
        <p className="text-xl font-bold text-blue-400 drop-shadow-sm">
          {cmp?.jobPosts?.length}
        </p>
        <span className="text-xs text-gray-400">Jobs Posted</span>
      </div>
    </div>
  );
};

export default CompanyCard;
