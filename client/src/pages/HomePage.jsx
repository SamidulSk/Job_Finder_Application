import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Navbar, Footer } from "../components";

const HomePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user?.user);

  const currentPath = location?.pathname;
  const hideNavBar = currentPath === "/user-auth";

  return (
    <main className="bg-[#f7fdfd] min-h-screen flex flex-col justify-between">
      {!hideNavBar && <Navbar />}

      <div className="flex-grow">
        <Outlet />
      </div>

      {user && <Footer />}
    </main>
  );
};

export default HomePage;
