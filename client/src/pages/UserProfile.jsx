import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { HiLocationMarker } from "react-icons/hi";
import { AiOutlineMail } from "react-icons/ai";
import { FiPhoneCall } from "react-icons/fi";
import { CustomButton, Loading, TextInput } from "../components";
import { NoProfile } from "../assets";
import { apiRequest } from "../config/index.js";
import { Login } from "../redux/userSlice.js";

const UserForm = ({ open, setOpen }) => {
  const user = useSelector((state) => state.user?.user);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: user,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data) => {
    const defaultImg =
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
    const newData = { ...data, profileUrl: defaultImg };

    setIsSubmitting(true);

    try {
      const res = await apiRequest({
        url: "/users/update-user",
        token: user?.token,
        data: newData,
        method: "PUT",
      });

      if (res) {
        const updatedData = {
          token: res?.token,
          ...res?.user,
        };

        dispatch(Login(updatedData));
        localStorage.setItem("userInfo", JSON.stringify(updatedData));
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeModal = () => setOpen(false);

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left shadow-xl transition-all">
                <Dialog.Title className="text-lg font-semibold text-gray-900">
                  Edit Profile
                </Dialog.Title>

                <form onSubmit={handleSubmit(onSubmit)} className="mt-4 flex flex-col gap-5">
                  {/* First and Last Name */}
                  <div className="flex gap-2">
                    <div className="w-1/2">
                      <TextInput
                        name="firstName"
                        label="First Name"
                        placeholder="James"
                        type="text"
                        register={register("firstName", { required: "First Name is required" })}
                        error={errors.firstName?.message}
                      />
                    </div>
                    <div className="w-1/2">
                      <TextInput
                        name="lastName"
                        label="Last Name"
                        placeholder="Wagonner"
                        type="text"
                        register={register("lastName", { required: "Last Name is required" })}
                        error={errors.lastName?.message}
                      />
                    </div>
                  </div>

                  {/* Contact and Location */}
                  <div className="flex gap-2">
                    <div className="w-1/2">
                      <TextInput
                        name="contact"
                        label="Contact"
                        placeholder="Phone Number"
                        type="text"
                        register={register("contact", { required: "Contact is required" })}
                        error={errors.contact?.message}
                      />
                    </div>
                    <div className="w-1/2">
                      <TextInput
                        name="location"
                        label="Location"
                        placeholder="Your city"
                        type="text"
                        register={register("location", { required: "Location is required" })}
                        error={errors.location?.message}
                      />
                    </div>
                  </div>

                  {/* Job Title */}
                  <TextInput
                    name="jobTitle"
                    label="Job Title"
                    placeholder="e.g. Frontend Developer"
                    type="text"
                    register={register("jobTitle", { required: "Job Title is required" })}
                    error={errors.jobTitle?.message}
                  />

                  {/* About */}
                  <div className="flex flex-col">
                    <label className="text-sm text-gray-600 mb-1">About</label>
                    <textarea
                      rows={4}
                      className="rounded border border-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-base px-4 py-2 resize-none"
                      {...register("about", {
                        required: "Write a little bit about yourself and your projects",
                      })}
                    />
                    {errors.about && (
                      <span className="text-xs text-red-500 mt-1">{errors.about.message}</span>
                    )}
                  </div>

                  <div className="mt-4">
                    {isSubmitting ? (
                      <Loading />
                    ) : (
                      <CustomButton
                        type="submit"
                        title="Submit"
                        containerStyles="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
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

const UserProfile = () => {
  const { user } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);

  return (
    <div className="container mx-auto flex justify-center py-10">
      <div className="w-full md:w-2/3 2xl:w-2/4 bg-white shadow-lg p-10 rounded-lg">
        <div className="flex flex-col items-center mb-6">
          <h1 className="text-4xl font-semibold text-slate-600">
            {user?.firstName + " " + user?.lastName}
          </h1>
          <h5 className="text-blue-700 font-bold text-base">{user?.jobTitle || "Add Job Title"}</h5>

          <div className="w-full flex flex-wrap justify-between mt-6 text-sm">
            <p className="flex items-center gap-1 text-slate-600">
              <HiLocationMarker /> {user?.location || "No Location"}
            </p>
            <p className="flex items-center gap-1 text-slate-600">
              <AiOutlineMail /> {user?.email || "No Email"}
            </p>
            <p className="flex items-center gap-1 text-slate-600">
              <FiPhoneCall /> {user?.contact || "No Contact"}
            </p>
          </div>
        </div>

        <hr />

        <div className="flex flex-col-reverse md:flex-row gap-8 mt-10">
          <div className="md:w-2/3">
            <p className="text-[#0536e7] font-semibold text-2xl">ABOUT</p>
            <p className="mt-4 text-base text-justify text-slate-600 leading-7">
              {user?.about || "No About Found"}
            </p>
          </div>

          <div className="md:w-1/3 text-center">
            <img
              src={user?.profileUrl || NoProfile}
              alt="Profile"
              className="w-full h-48 object-contain rounded-lg"
            />
            <button
              className="w-full bg-blue-600 text-white mt-4 py-2 rounded"
              onClick={() => setOpen(true)}
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      <UserForm open={open} setOpen={setOpen} />
    </div>
  );
};

export default UserProfile;
