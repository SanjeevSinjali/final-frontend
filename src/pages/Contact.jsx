import React from "react";
import { assets } from "../assets";
import { FaEnvelope, FaLocationDot, FaPhone } from "react-icons/fa6";

const Contact = () => {
  return (
    <section
      style={{
        backgroundImage: `linear-gradient(rgba(0, 50, 39, 0.8), rgba(125, 134, 132, 0.4)), url(${assets.background})`,
      }}
    >
      <div className="object-cover bg-center min-h-screen">
        <div className="max-w-7xl m-auto px-5 py-8 flex flex-col items-center justify-center gap-12 mt-32">
          <div className="flex flex-col gap-5 justify-center items-center text-white">
            <h6 className="text-3xl font-semibold ">Contact Us</h6>
            <p className="text-center w-3/4">
              Since its inception in 2024, JobPros has been at the forefront
              aiming to connect job seekers and employers in Nepal. The goal is
              to provide a comprehensive platform for job seekers to find jobs
              in Nepal and for employers to find the right fit for their
              organization.
            </p>
          </div>
          <div className="flex flex-col lg:flex-row gap-36 items-center">
            <div className="flex flex-col md:flex-row lg:flex-col gap-16">
              <div className="flex gap-5 items-center justify-start">
                <div className="p-4 text-xl bg-white flex justify-center items-center rounded-full">
                  <FaLocationDot />
                </div>
                <div className="text-white">
                  <p className="font-medium text-lg">Address</p>
                  <p className="text-xs/5">Bharatpur-12, Chitwan, Nepal</p>
                  <p className="text-xs">44200</p>
                </div>
              </div>
              <div className="flex gap-5 items-center justify-start">
                <div className="p-4 text-xl bg-white flex justify-center items-center rounded-full">
                  <FaPhone />
                </div>
                <div className="text-white">
                  <p className="font-medium text-lg">Phone</p>
                  <p className="text-xs/5">+977 9828397477</p>
                  <p className="text-xs">056-576234</p>
                </div>
              </div>
              <div className="flex gap-5 items-center justify-start">
                <div className="p-4 text-xl bg-white flex justify-center items-center rounded-full">
                  <FaEnvelope />
                </div>
                <div className="text-white">
                  <p className="font-medium text-lg">Email</p>
                  <p className="text-xs/5">jobpros@info.com.np</p>
                </div>
              </div>
            </div>
            <form
              method="POST"
              className="p-6 bg-white rounded-lg w-[350px] md:w-[600px] flex flex-col gap-8 flex-wrap"
            >
              <h6 className="font-medium text-xl text-center text-mainColor">
                Drop Your Message
              </h6>
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-3">
                  <label htmlFor="name">
                    Name<span className="text-red2">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                    className="px-3 py-2 outline-hoverColor bg-lightBg rounded" required
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <label htmlFor="email">
                    Email<span className="text-red2">*</span>
                  </label>
                  <input
                    type="text"
                    id="email"
                    placeholder="Enter your email"
                    className="px-3 py-2 outline-hoverColor bg-lightBg rounded" required
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <label htmlFor="phoneNum">
                    Phone Number<span className="text-red2">*</span>
                  </label>
                  <input
                    type="text"
                    id="phoneNum"
                    placeholder="Enter your phone number"
                    className="px-3 py-2 outline-hoverColor bg-lightBg rounded" required
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <label htmlFor="jobRole">
                    Role<span className="text-red2">*</span>
                  </label>
                  <select
                    name="jobRole"
                    id="jobRole"
                    className="px-3 py-2 outline-hoverColor bg-lightBg rounded" required
                  >
                    <option value="employee">Job Seeker(Employee)</option>
                    <option value="employer">Job Provider(Employer)</option>
                  </select>
                </div>
                <div className="flex flex-col gap-3">
                  <label htmlFor="message">
                    Message<span className="text-red2">*</span>
                  </label>
                  <textarea
                    name="message"
                    id="message"
                    placeholder="Enter your message"
                    className="px-3 py-2 outline-hoverColor bg-lightBg rounded" required
                  ></textarea>
                </div>
              </div>
              <div className="w-full flex justify-center">
                <button
                  type="submit"
                  className="px-3 py-2 bg-mainColor text-white rounded hover:bg-hoverColor cursor-pointer"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
