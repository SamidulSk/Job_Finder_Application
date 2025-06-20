import React, { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { HiLocationMarker } from "react-icons/hi";
import { AiOutlineMail } from "react-icons/ai";
import { FiPhoneCall, FiEdit3, FiUpload } from "react-icons/fi";
import { Link, useParams } from "react-router-dom";
import { CustomButton, JobCard, Loading, TextInput } from "../components";
import { apiRequest, handleFileUpload } from "../config/index.js";
import { Login } from "../redux/userSlice";

const CompanyForm = ({ open, setOpen }) => {
  const { user } = useSelector((state) => state.user);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: { ...user },
  });

  const dispatch = useDispatch();
  const [profileImage, setProfileImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState({ status: false, message: "" });

  const onSubmit = async (data) => {
    setIsLoading(true);
    setErrMsg(null);

    const uri = profileImage && (await handleFileUpload(profileImage));
    const newData = uri ? { ...data, profileUrl: uri } : data;

    try {
      const res = await apiRequest({
        url: "/companies/update-company",
        token: user?.token,
        data: newData,
        method: "PUT",
      });
      setIsLoading(false);

      if (res.status === "failed") {
        setErrMsg({ ...res });
      } else {
        const updatedData = { token: res?.token, ...res?.user };
        dispatch(Login(updatedData));
        localStorage.setItem("userInfo", JSON.stringify(updatedData));
        setOpen(false);
        setTimeout(() => window.location.reload(), 1500);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <Transition appear show={open ?? false} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={() => setOpen(false)}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-90"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-90"
            >
              <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-2xl transition-all">
                <Dialog.Title className="text-2xl font-bold text-blue-600 mb-4">
                  ✏️ Edit Company Profile
                </Dialog.Title>

                <form
                  className="flex flex-col gap-4"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <TextInput
                    name="name"
                    label="Company Name"
                    type="text"
                    register={register("name", {
                      required: "Company Name is required",
                    })}
                    error={errors.name?.message}
                  />

                  <TextInput
                    name="location"
                    label="Location"
                    placeholder="e.g., California"
                    type="text"
                    register={register("location", {
                      required: "Location is required",
                    })}
                    error={errors.location?.message}
                  />

                  <TextInput
                    name="contact"
                    label="Contact"
                    placeholder="Phone Number"
                    type="text"
                    register={register("contact", {
                      required: "Contact number is required",
                    })}
                    error={errors.contact?.message}
                  />

                  <div className="flex flex-col">
                    <label className="text-sm text-gray-600 mb-1">
                      About Company
                    </label>
                    <textarea
                      rows={4}
                      {...register("about", {
                        required: "About section is required",
                      })}
                      className="rounded border border-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 px-4 py-2 resize-none"
                    />
                    {errors.about && (
                      <span className="text-sm text-red-500">
                        {errors.about.message}
                      </span>
                    )}
                  </div>

                  <div className="mt-4">
                    {isLoading ? (
                      <Loading />
                    ) : (
                      <CustomButton
                        title="Save Changes"
                        type="submit"
                        containerStyles="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-full shadow transition"
                      />
                    )}
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

const CompanyProfile = () => {
  const params = useParams();
  const { user } = useSelector((state) => state.user);
  const [info, setInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [openForm, setOpenForm] = useState(false);

  const fetchCompany = async () => {
    setIsLoading(true);
    const id = params.id || user?._id;

    try {
      const res = await apiRequest({
        url: "/companies/get-company/" + id,
        method: "GET",
      });
      setInfo(res?.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCompany();
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  if (isLoading) return <Loading />;

  return (
    <div className="container mx-auto p-5">
      <div className="mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h2 className="text-2xl text-gray-800 font-semibold">
            👋 Welcome, <span className="text-blue-600">{info?.name}</span>
          </h2>

          {user?.user?.accountType === undefined && info?._id === user?._id && (
            <div className="flex items-center gap-4">
              <CustomButton
                onClick={() => setOpenForm(true)}
                iconRight={<FiEdit3 />}
                title="Edit"
                containerStyles="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full shadow"
              />

              <Link to="/upload-job">
                <CustomButton
                  title="Post Job"
                  iconRight={<FiUpload />}
                  containerStyles="text-blue-600 border border-blue-600 px-4 py-2 rounded-full hover:bg-blue-600 hover:text-white shadow"
                />
              </Link>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-6 text-gray-600 text-sm">
          <div className="flex items-center gap-2">
            <HiLocationMarker className="text-blue-500" />
            {info?.location || "No Location"}
          </div>
          <div className="flex items-center gap-2">
            <AiOutlineMail className="text-blue-500" />
            {info?.email || "No Email"}
          </div>
          <div className="flex items-center gap-2">
            <FiPhoneCall className="text-blue-500" />
            {info?.contact || "No Contact"}
          </div>
          <div className="text-center text-blue-700 font-semibold">
            {info?.jobPosts?.length} Job{info?.jobPosts?.length !== 1 && "s"}
          </div>
        </div>
      </div>

      <div className="mt-10">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">
          📋 Jobs Posted
        </h3>

        <div className="flex flex-wrap gap-4">
          {info?.jobPosts?.map((job, index) => (
            <JobCard
              key={index}
              job={{
                name: info?.name,
                email: info?.email,
                logo: info?.profileUrl,
                ...job,
              }}
            />
          ))}
        </div>
      </div>

      <CompanyForm open={openForm} setOpen={setOpenForm} />
    </div>
  );
};

export default CompanyProfile;
