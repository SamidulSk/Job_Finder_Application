import { useEffect, useState } from "react";
import moment from "moment";
import { AiOutlineSafetyCertificate } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { CustomButton, JobCard, Loading } from "../components";
import { apiRequest } from "../config/index.js";

const JobDetail = () => {
  const { user } = useSelector((state) => state?.user);
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [selected, setSelected] = useState("0");
  const [isFetching, setIsFetching] = useState(false);
  const [similarJobs, setSimilarJobs] = useState([]);

  const fetchJobDetails = async () => {
    setIsFetching(true);
    try {
      const res = await apiRequest({
        url: "/jobs/get-job-detail/" + id,
        method: "GET",
      });
      setJob(res?.data);
      setSimilarJobs(res?.similarJobs);
      setIsFetching(false);
    } catch (error) {
      console.log(error);
      setIsFetching(false);
    }
  };

  const handleDeletePost = async () => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;
    setIsFetching(true);
    try {
      const res = await apiRequest({
        url: "/jobs/delete-job/" + job?._id,
        token: user?.token,
        method: "DELETE",
      });
      if (res?.success) {
        alert(res?.message);
        window.location.replace("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    id && fetchJobDetails();
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [id]);

  return (
    <div className="container mx-auto">
      <div className="w-full flex flex-col md:flex-row gap-10">
        {/* LEFT SIDE */}
        {isFetching ? (
          <Loading />
        ) : (
          <div className="w-full md:w-2/3 bg-white px-5 py-10 md:px-10 shadow-md">
            <div className="flex items-center justify-between">
              <div className="w-3/4 flex gap-2">
                <img
                  src={job?.company?.profileUrl}
                  alt={job?.company?.name}
                  className="w-20 h-20 md:w-24 md:h-20 rounded"
                />
                <div>
                  <p className="text-xl font-semibold text-gray-600">{job?.jobTitle}</p>
                  <span className="text-base">{job?.location}</span>
                  <span className="block text-base text-blue-600">{job?.company?.name}</span>
                  <span className="text-gray-500 text-sm">{moment(job?.createdAt).fromNow()}</span>
                </div>
              </div>
              <AiOutlineSafetyCertificate className="text-3xl text-blue-500" />
            </div>

            {/* Job Details Grid */}
            <div className="flex flex-wrap gap-2 justify-between my-10">
              <DetailCard title="Salary" value={`$ ${job?.salary}`} bg="bg-[#bdf4c8]" />
              <DetailCard title="Job Type" value={job?.jobType} bg="bg-[#bae5f4]" />
              <DetailCard title="Applicants" value={job?.data?.application?.length || 0} bg="bg-[#fed0ab]" />
              <DetailCard title="Vacancies" value={job?.vacancies} bg="bg-[#cecdff]" />
            </div>

            {/* Description Tabs */}
            <div className="flex gap-4 py-5">
              <TabButton title="Job Description" selected={selected === "0"} onClick={() => setSelected("0")} />
              <TabButton title="Company" selected={selected === "1"} onClick={() => setSelected("1")} />
            </div>

            {/* Content */}
            <div className="my-6">
              {selected === "0" ? (
                <>
                  <p className="text-xl font-semibold">Job Description</p>
                  <p className="text-base">{job?.detail?.[0]?.desc}</p>
                  {job?.detail?.[0]?.requirements && (
                    <>
                      <p className="text-xl font-semibold mt-8">Requirements</p>
                      <p className="text-base">{job?.detail?.[0]?.requirements}</p>
                    </>
                  )}
                </>
              ) : (
                <>
                  <p className="text-xl text-blue-600 font-semibold">{job?.company?.name}</p>
                  <p className="text-base">{job?.company?.location}</p>
                  <p className="text-sm mb-4">{job?.company?.email}</p>
                  <p className="text-xl font-semibold">About Company</p>
                  <p className="text-base">{job?.company?.about}</p>
                </>
              )}
            </div>

            <div className="w-full mt-6">
              {user?._id === job?.company?._id ? (
                <CustomButton
                  title="Delete"
                  containerStyles="w-full text-white py-3 px-5 rounded-full text-base bg-black"
                  onClick={handleDeletePost}
                />
              ) : (
                <CustomButton
                  title="Apply Now"
                  containerStyles="w-full text-white bg-black py-3 px-5 rounded-full text-base"
                />
              )}
            </div>
          </div>
        )}

        {/* RIGHT SIDE */}
        <div className="w-full md:w-1/3 p-5 mt-20 md:mt-0">
          <p className="text-gray-500 font-semibold mb-3">Similar Job Posts</p>
          <div className="flex flex-wrap gap-4">
            {similarJobs?.slice(0, 6).map((job, index) => (
              <JobCard
                key={index}
                job={{
                  name: job?.company?.name,
                  logo: job?.company?.profileUrl,
                  ...job,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper Components
const DetailCard = ({ title, value, bg }) => (
  <div className={`${bg} w-40 h-16 rounded-lg flex flex-col items-center justify-center`}>
    <span className="text-sm">{title}</span>
    <p className="text-lg font-semibold text-gray-700">{value}</p>
  </div>
);

const TabButton = ({ title, selected, onClick }) => (
  <CustomButton
    title={title}
    onClick={onClick}
    containerStyles={`w-full py-3 px-5 rounded-full text-sm ${
      selected
        ? "bg-black text-white"
        : "bg-white text-black border border-gray-300"
    }`}
  />
);

export default JobDetail;
