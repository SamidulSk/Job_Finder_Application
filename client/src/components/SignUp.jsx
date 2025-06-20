import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import TextInput from "./TextInput";
import CustomButton from "./CustomButton";
import { apiRequest } from "../config";
import { Login } from "../redux/userSlice";

const SignUp = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const [isRegister, setIsRegister] = useState(true);
  const [accountType, setAccountType] = useState("seeker");
  const [errMsg, setErrMsg] = useState("");

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const onSubmit = async (data) => {
    let URL =
      isRegister && accountType === "seeker"
        ? "auth/register"
        : isRegister
        ? "companies/register"
        : accountType === "seeker"
        ? "auth/login"
        : "companies/login";

    try {
      const res = await apiRequest({ url: URL, data, method: "POST" });
      if (res?.status === "failed") {
        setErrMsg(res?.message);
      } else {
        setErrMsg("");
        const userData = { token: res?.token, ...res?.user };
        dispatch(Login(userData));
        localStorage.setItem("userInfo", JSON.stringify(userData));
        setOpen(false);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Transition appear show={true} as={Fragment}>
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
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center px-4 py-10 text-center">
            <Transition.Child
              as={Fragment}
              enter="transition duration-300 transform ease-out"
              enterFrom="scale-90 opacity-0"
              enterTo="scale-100 opacity-100"
              leave="transition duration-200 transform ease-in"
              leaveFrom="scale-100 opacity-100"
              leaveTo="scale-90 opacity-0"
            >
              <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-8 shadow-2xl ring-1 ring-slate-300">
                <Dialog.Title className="text-2xl font-bold text-center text-blue-700 mb-4">
                  {isRegister ? "Create Account" : "Welcome Back"}
                </Dialog.Title>

                <div className="flex justify-center gap-3 mb-6">
                  <button
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition shadow ${
                      accountType === "seeker"
                        ? "bg-blue-600 text-white"
                        : "bg-white border border-blue-600 text-blue-600"
                    }`}
                    onClick={() => setAccountType("seeker")}
                  >
                    User
                  </button>
                  <button
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition shadow ${
                      accountType !== "seeker"
                        ? "bg-blue-600 text-white"
                        : "bg-white border border-blue-600 text-blue-600"
                    }`}
                    onClick={() => setAccountType("company")}
                  >
                    Company
                  </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <TextInput
                    name="email"
                    label="Email Address"
                    placeholder="email@example.com"
                    type="email"
                    register={register("email", { required: "Email is required" })}
                    error={errors.email?.message}
                  />

                  {isRegister && (
                    <div className="flex gap-3">
                      <TextInput
                        name={accountType === "seeker" ? "firstName" : "name"}
                        label={accountType === "seeker" ? "First Name" : "Company Name"}
                        placeholder={accountType === "seeker" ? "James" : "Tech Ltd."}
                        type="text"
                        register={register(accountType === "seeker" ? "firstName" : "name", {
                          required: true,
                        })}
                        error={
                          accountType === "seeker"
                            ? errors.firstName?.message
                            : errors.name?.message
                        }
                      />
                      {accountType === "seeker" && (
                        <TextInput
                          name="lastName"
                          label="Last Name"
                          placeholder="Smith"
                          type="text"
                          register={register("lastName", { required: true })}
                          error={errors.lastName?.message}
                        />
                      )}
                    </div>
                  )}

                  <div className="flex gap-3">
                    <TextInput
                      name="password"
                      label="Password"
                      type="password"
                      placeholder="Password"
                      register={register("password", { required: true })}
                      error={errors.password?.message}
                    />
                    {isRegister && (
                      <TextInput
                        name="cPassword"
                        label="Confirm Password"
                        type="password"
                        placeholder="Confirm Password"
                        register={register("cPassword", {
                          validate: (value) =>
                            value === getValues("password") || "Passwords do not match",
                        })}
                        error={errors.cPassword?.message}
                      />
                    )}
                  </div>

                  {errMsg && <p className="text-red-500 text-sm">{errMsg}</p>}

                  <CustomButton
                    type="submit"
                    title={isRegister ? "Create Account" : "Login"}
                    containerStyles="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md shadow-md transition-all"
                  />
                </form>

                <p className="mt-4 text-sm text-center text-gray-600">
                  {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
                  <span
                    className="text-blue-600 hover:underline cursor-pointer"
                    onClick={() => setIsRegister((prev) => !prev)}
                  >
                    {isRegister ? "Login" : "Sign Up"}
                  </span>
                </p>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default SignUp;
