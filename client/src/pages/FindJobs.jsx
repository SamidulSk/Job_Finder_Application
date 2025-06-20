import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BiBriefcaseAlt2 } from "react-icons/bi";
import { BsStars } from "react-icons/bs";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

import Header from "../components/Header";
import { experience, jobTypes } from "../utils/data";
import { CustomButton, JobCard, ListBox, Loading } from "../components";
import { apiRequest, updateUrl } from "../config/index.js";

const FindJobs = () => {
  const [sort, setSort] = useState("Newest");
  const [page, setPage] = useState(1);
  const [numPage, setNumPage] = useState(1);
  const [recordCount, setRecordCount] = useState(0);
  const [data, setData] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const [filterJobTypes, setFilterJobTypes] = useState([]);
  const [filterExp, setFilterExp] = useState([]);
  const [expVal, setExpVal] = useState([]);

  const [isFetching, setIsFetching] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const fetchJob = async () => {
    setIsFetching(true);
    const newURL = updateUrl({
      pageNum: page,
      query: searchQuery,
      cmpLoc: jobLocation,
      sort: sort,
      navigate: navigate,
      location: location,
      jType: filterJobTypes,
      exp: filterExp,
    });

    try {
      const res = await apiRequest({
        url: "/jobs/find-jobs" + newURL,
        method: "GET",
      });

      setNumPage(res?.numOfPage);
      setRecordCount(res?.totalJobs);
      setData(res?.data);
      setIsFetching(false);
    } catch (error) {
      console.log(error);
      setIsFetching(false);
    }
  };

  const filterJobs = (val) => {
    if (filterJobTypes.includes(val)) {
      setFilterJobTypes(filterJobTypes.filter((el) => el !== val));
    } else {
      setFilterJobTypes([...filterJobTypes, val]);
    }
  };

  const filterExperience = async (e) => {
    if (expVal.includes(e)) {
      setExpVal(expVal.filter((el) => el !== e));
    } else {
      setExpVal([...expVal, e]);
    }
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    await fetchJob();
  };

  const handleShowMore = async (e) => {
    e.preventDefault();
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    if (expVal.length > 0) {
      let newExpVal = [];

      expVal.forEach((el) => {
        const range = el.split("-");
        newExpVal.push(Number(range[0]), Number(range[1]));
      });

      newExpVal.sort((a, b) => a - b);
      setFilterExp(`${newExpVal[0]}-${newExpVal[newExpVal.length - 1]}`);
    }
  }, [expVal]);

  useEffect(() => {
    fetchJob();
  }, [sort, filterJobTypes, filterExp, page]);

  return (
    <div>
      <Header
        title="Find Your Dream Job with Ease"
        type="home"
        handleClick={handleSearchSubmit}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        location={jobLocation}
        setLocation={setJobLocation}
      />

      <div className="container mx-auto flex gap-6 2xl:gap-10 md:px-5 py-6 bg-[#f0f4f8]">
        {/* Sidebar Filters */}
        <div className="hidden md:flex flex-col w-1/6 h-fit bg-white shadow-lg rounded-xl p-4 space-y-6 border border-slate-100">
          <h2 className="text-lg font-bold text-blue-600 border-b pb-2">🎯 Filter Search</h2>

          {/* Job Type */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <p className="flex items-center gap-2 font-semibold text-gray-700">
                <BiBriefcaseAlt2 />
                Job Type
              </p>
              <MdOutlineKeyboardArrowDown className="text-gray-500" />
            </div>
            <div className="flex flex-col gap-2 text-sm text-gray-600">
              {jobTypes.map((jtype, index) => (
                <label key={index} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value={jtype}
                    onChange={(e) => filterJobs(e.target.value)}
                    className="w-4 h-4 text-blue-500"
                  />
                  {jtype}
                </label>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <p className="flex items-center gap-2 font-semibold text-gray-700">
                <BsStars />
                Experience
              </p>
              <MdOutlineKeyboardArrowDown className="text-gray-500" />
            </div>
            <div className="flex flex-col gap-2 text-sm text-gray-600">
              {experience.map((exp) => (
                <label key={exp.title} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value={exp.value}
                    onChange={(e) => filterExperience(e.target.value)}
                    className="w-4 h-4 text-blue-500"
                  />
                  {exp.title}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Job Listings */}
        <div className="w-full md:w-5/6 px-4 md:px-0">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm md:text-base text-slate-700">
              Showing: <span className="font-semibold text-blue-600">{recordCount}</span> Jobs Available
            </p>

            <div className="flex flex-col md:flex-row gap-0 md:gap-2 md:items-center">
              <p className="text-sm md:text-base text-gray-700">Sort By:</p>
              <ListBox sort={sort} setSort={setSort} />
            </div>
          </div>

          <div className="w-full flex flex-wrap gap-4">
            {data?.map((job, index) => {
              const newJob = {
                name: job?.company?.name,
                logo: job?.company?.profileUrl,
                ...job,
              };
              return <JobCard job={newJob} key={index} />;
            })}
          </div>

          {isFetching && (
            <div className="py-10">
              <Loading />
            </div>
          )}

          {numPage > page && !isFetching && (
            <div className="w-full flex items-center justify-center pt-10">
              <CustomButton
                onClick={handleShowMore}
                title="Load More"
                containerStyles={`text-blue-600 py-2 px-6 rounded-full border border-blue-600 hover:bg-blue-700 hover:text-white transition`}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FindJobs;
