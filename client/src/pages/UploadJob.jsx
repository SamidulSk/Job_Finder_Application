import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

import {
  CustomButton,
  JobCard,
  JobTypes,
  Loading,
  TextInput,
} from "../components";
import { apiRequest } from "../config/index.js";

const UploadJob = () => {
  const { user } = useSelector((state) => state?.user);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const [errMsg, setErrMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [recentPost, setRecentPost] = useState([]);
  const [jobType, setJobType] = useState("Full-Time");

  const onSubmit = async (data) => {
    setIsLoading(true);
    setErrMsg("");

    try {
      const newData = {
        ...data,
        jobType,
      };

      const res = await apiRequest({
        url: "/jobs/upload-job",
        token: user?.token,
        data: newData,
        method: "POST",
      });

      if (res?.status === "failed") {
        setErrMsg(res?.message);
      } else {
        setErrMsg(res?.message);
        window.location.reload();
      }
    } catch (error) {
      setErrMsg(error?.message);
    } finally {
      setIsLoading(false);
    }
  };

  const getRecentPost = async () => {
    try {
      const id = user?._id;
      const res = await apiRequest({
        url: "/companies/get-company/" + id,
        method: "GET",
      });
      setRecentPost(res?.data?.jobPosts);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRecentPost();
  }, []);

  return (
    <div className="container mx-auto flex flex-col md:flex-row gap-8 2xl:gap-14 bg-[#f7fdfd] px-5">
      {/* Upload Form */}
      <div className="w-full h-fit md:w-2/3 2xl:w-2/4 bg-white px-5 py-10 md:px-10 shadow-md">
        <p className="text-gray-500 font-semibold text-2xl mb-4">Job Post</p>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
          <TextInput
            name="jobTitle"
            label="Job Title"
            placeholder="e.g. Software Engineer"
            type="text"
            required
            register={register("jobTitle", { required: "Job Title is required" })}
            error={errors.jobTitle?.message}
          />

          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="text-sm text-gray-600 mb-1 block">Job Type</label>
              <JobTypes jobTitle={jobType} setJobTitle={setJobType} />
            </div>
            <div className="w-1/2">
              <TextInput
                name="salary"
                label="Salary (USD)"
                placeholder="e.g. 1500"
                type="number"
                register={register("salary", { required: "Salary is required" })}
                error={errors.salary?.message}
              />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-1/2">
              <TextInput
                name="vacancies"
                label="No. of Vacancies"
                placeholder="e.g. 3"
                type="number"
                register={register("vacancies", { required: "Vacancies is required" })}
                error={errors.vacancies?.message}
              />
            </div>
            <div className="w-1/2">
              <TextInput
                name="experience"
                label="Years of Experience"
                placeholder="e.g. 2"
                type="number"
                register={register("experience", { required: "Experience is required" })}
                error={errors.experience?.message}
              />
            </div>
          </div>

          <TextInput
            name="location"
            label="Job Location"
            placeholder="e.g. New York"
            type="text"
            register={register("location", { required: "Job Location is required" })}
            error={errors.location?.message}
          />

          {/* Description */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">Job Description</label>
            <textarea
              rows={4}
              className="rounded border border-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 px-4 py-2 resize-none"
              {...register("desc", { required: "Job Description is required!" })}
            />
            {errors.desc && <span className="text-xs text-red-500 mt-1">{errors.desc.message}</span>}
          </div>

          {/* Requirements */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">Requirements</label>
            <textarea
              rows={4}
              className="rounded border border-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 px-4 py-2 resize-none"
              {...register("requirements")}
            />
          </div>

          {/* Error Msg */}
          {errMsg && <span className="text-sm text-red-500">{errMsg}</span>}

          {/* Submit Button */}
          <div className="mt-2">
            {isLoading ? (
              <Loading />
            ) : (
              <CustomButton
                type="submit"
                title="Submit"
                containerStyles="inline-flex justify-center rounded-md bg-blue-600 px-8 py-2 text-sm font-medium text-white hover:bg-[#1d4fd846] hover:text-[#1d4fd8]"
              />
            )}
          </div>
        </form>
      </div>

      {/* Recent Posts */}
      <div className="w-full md:w-1/3 2xl:2/4 p-5 mt-20 md:mt-0">
        <p className="text-gray-500 font-semibold mb-3">Recent Job Posts</p>
        <div className="flex flex-wrap gap-6">
          {recentPost?.slice(0, 4).map((job, index) => (
            <JobCard
              key={index}
              job={{
                name: user?.name,
                email: user?.email,
                logo: user?.profileUrl,
                ...job,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UploadJob;
