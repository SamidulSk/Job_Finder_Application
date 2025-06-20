import { GoLocation } from "react-icons/go";
import moment from "moment";
import { Link } from "react-router-dom";

const JobCard = ({ job }) => {
  return (
    <Link to={`/job-detail/${job?._id}`}>
      <div
        className="w-full md:w-[17rem] 2xl:w-[19rem] h-[18rem] bg-gradient-to-br from-[#1e293b] to-[#111827] 
        hover:from-[#273449] hover:to-[#1f2937] text-white flex flex-col justify-between shadow-lg 
        hover:shadow-2xl transition-all duration-300 rounded-2xl px-5 py-5 cursor-pointer animate-fadeInUp"
      >
        <div className="w-full h-full flex flex-col justify-between gap-3">
          {/* Header */}
          <div className="flex gap-3 items-center">
            <img
              src={job?.logo}
              alt={job?.company?.name}
              className="w-14 h-14 rounded-lg object-cover border border-gray-600 bg-white"
            />

            <div className="w-full flex flex-col justify-center">
              <p className="text-base font-semibold leading-5 line-clamp-2">
                {job?.jobTitle}
              </p>
              <span className="flex items-center gap-1 text-sm text-gray-400">
                <GoLocation className="text-blue-400" />
                {job?.location}
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="text-sm text-gray-300 line-clamp-3 leading-5 px-1">
            {job?.detail[0]?.desc?.slice(0, 150) + "..."}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between mt-2 px-1">
            <span className="bg-blue-800/20 text-blue-400 text-xs px-2 py-1 rounded-full font-semibold">
              {job?.jobType}
            </span>
            <span className="text-gray-500 text-xs">
              {moment(job?.createdAt).fromNow()}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default JobCard;
