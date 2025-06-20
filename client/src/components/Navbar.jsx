import React, { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { BiChevronDown } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { HiMenuAlt3 } from "react-icons/hi";
import { AiOutlineClose, AiOutlineLogout } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import CustomButton from "./CustomButton";
import { useSelector, useDispatch } from "react-redux";
import { Logout } from "../redux/userSlice";

function MenuList({ user, onClick }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(Logout());
    navigate("/");
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex items-center gap-3 bg-gradient-to-br from-indigo-500 to-pink-500 text-white px-4 py-2 rounded-full shadow-xl hover:scale-105 transition-transform duration-300">
          <div className="text-left">
            <p className="text-sm font-bold">{user?.firstName ?? user?.name}</p>
            <span className="text-xs text-white/80">{user?.jobTitle ?? user?.email}</span>
          </div>
          <img
            src={user?.profileUrl}
            alt="user"
            className="w-9 h-9 rounded-full object-cover border-2 border-white"
          />
          <BiChevronDown className="text-xl" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-50 mt-2 w-56 rounded-xl bg-white shadow-2xl ring-2 ring-indigo-200">
          <div className="p-2">
            <Menu.Item>
              {({ active }) => (
                <Link
                  to={`${
                    user?.accountType === "seeker"
                      ? "user-profile"
                      : "company-profile"
                  }`}
                  onClick={onClick}
                  className={`${
                    active ? "bg-indigo-100" : ""
                  } flex items-center gap-2 px-4 py-2 rounded-lg transition-all text-gray-700 hover:text-indigo-600`}
                >
                  <CgProfile className="text-lg" />{" "}
                  {user?.accountType ? "User Profile" : "Company Profile"}
                </Link>
              )}
            </Menu.Item>

            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={handleLogout}
                  className={`${
                    active ? "bg-red-100" : ""
                  } flex items-center gap-2 px-4 py-2 rounded-lg w-full text-left text-gray-700 hover:text-red-600 transition-all`}
                >
                  <AiOutlineLogout className="text-lg" />
                  Log Out
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

const Navbar = () => {
  const user = useSelector((state) => state.user?.user);
  const [isOpen, setIsOpen] = useState(false);

  const handleCloseNavbar = () => setIsOpen((prev) => !prev);

  return (
    <div className="relative bg-gradient-to-r from-[#0f172a] via-[#111827] to-[#1f2937] z-50 shadow-md">
      <nav className="container mx-auto flex items-center justify-between p-5 text-white">
        <Link
          to="/"
          className="text-2xl font-extrabold bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500 text-transparent bg-clip-text drop-shadow"
        >
          Job<span className="text-white">Finder</span>
        </Link>

        <ul className="hidden lg:flex gap-10 text-sm font-semibold drop-shadow">
          <li>
            <Link to="/" className="hover:text-pink-400 transition duration-300">
              Find Job
            </Link>
          </li>
          <li>
            <Link to="/companies" className="hover:text-purple-400 transition duration-300">
              Companies
            </Link>
          </li>
          <li>
            <Link
              to={user?.accountType === "seeker" ? "/" : "/upload-job"}
              className="hover:text-indigo-400 transition duration-300"
            >
              {user?.accountType === "seeker" ? "Applications" : "Upload Job"}
            </Link>
          </li>
          <li>
            <Link to="/about-us" className="hover:text-yellow-400 transition duration-300">
              About
            </Link>
          </li>
        </ul>

        <div className="hidden lg:block">
          {!user?.token ? (
            <Link to="/user-auth">
              <CustomButton
                title="Sign In"
                containerStyles="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white px-5 py-2 rounded-full shadow-lg hover:shadow-pink-300 transition-all"
              />
            </Link>
          ) : (
            <MenuList user={user} />
          )}
        </div>

        <button
          className="lg:hidden text-white"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? <AiOutlineClose size={26} /> : <HiMenuAlt3 size={26} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`${
          isOpen ? "absolute flex bg-[#111827]" : "hidden"
        } container mx-auto lg:hidden flex-col pl-8 gap-3 py-5 text-white`}
      >
        <Link to="/" onClick={handleCloseNavbar}>
          Find Job
        </Link>
        <Link to="/companies" onClick={handleCloseNavbar}>
          Companies
        </Link>
        <Link
          to={user?.accountType === "seeker" ? "/apply-history" : "/upload-job"}
          onClick={handleCloseNavbar}
        >
          {user?.accountType === "seeker" ? "Applications" : "Upload Job"}
        </Link>
        <Link to="/about-us" onClick={handleCloseNavbar}>
          About
        </Link>

        <div className="w-full py-8">
          {!user?.token ? (
            <a href="/user-auth">
              <CustomButton
                title="Sign In"
                containerStyles="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white px-5 py-2 rounded-full shadow-lg hover:shadow-pink-300 transition-all"
              />
            </a>
          ) : (
            <MenuList user={user} onClick={handleCloseNavbar} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
