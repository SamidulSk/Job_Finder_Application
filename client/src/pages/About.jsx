import React from "react";
import { JobImg } from "../assets";

const About = () => {
  return (
    <section className="container mx-auto flex flex-col gap-10 py-10 px-4 md:px-8">
      {/* Top Section */}
      <article className="flex flex-col-reverse md:flex-row items-center gap-10">
        {/* Text Content */}
        <div className="w-full md:w-2/3 2xl:w-2/4 bg-gradient-to-br from-white to-blue-50 p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300">
          <h1 className="text-4xl font-bold text-blue-700 mb-4">🚀 About Us</h1>
          <p className="text-gray-700 text-justify leading-7">
            Welcome to <span className="font-semibold text-blue-600">JobFinder</span> – your trusted partner in building careers and connecting talent to opportunity.
            We aim to provide seamless job search experiences and empower both job seekers and companies. Our platform ensures a user-friendly, secure, and intelligent job exploration at scale.
          </p>
        </div>

        {/* Image Section */}
        <div className="w-full md:w-1/3 flex justify-center">
          <img
            src={JobImg}
            alt="Illustration representing job opportunities at JobFinder"
            className="w-[260px] md:w-[320px] h-auto object-contain drop-shadow-lg hover:scale-105 transition-transform duration-300"
          />
        </div>
      </article>

      {/* Mission Statement */}
      <div className="bg-white/80 backdrop-blur-lg p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 leading-8 text-gray-800 text-justify">
        <p>
          <span className="font-bold text-blue-600">JobFinder</span> is more than just a job portal. Our team is driven by the mission of connecting the right people to the right positions using the power of AI. Whether you're a graduate looking for your first opportunity or a company seeking the perfect candidate — we’ve built a platform for <strong>you</strong>. From personalized job recommendations to intelligent filtering and company insights, we’re constantly evolving to serve you better.
          <br />
          <span className="block mt-4">Thank you for being part of our journey. 🌟</span>
        </p>
      </div>
    </section>
  );
};

export default About;
