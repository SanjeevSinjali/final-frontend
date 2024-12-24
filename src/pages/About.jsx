import React from "react";
import { Link } from "react-router-dom";
import { Carousel, ReviewCard } from "../components";
import { assets } from "../assets";

const About = () => {
  return (
    <section className="bg-lightBg">
      <div className="max-w-7xl m-auto px-5 py-8 flex flex-col items-center justify-center gap-12 mt-20">
        <div className="flex flex-col items-center justify-center w-full gap-8">
          <h4 className="text-mainColor font-semibold text-3xl">About Us</h4>
          <div className="bg-white w-full flex flex-col gap-5 rounded-md px-5 py-4">
            <h6 className="text-xl font-medium text-mainColor">Who are we?</h6>
            <div className="text-sm flex flex-col gap-3">
              <p>
                Since its inception in 2024, JobPros has been at the forefront
                of connecting job seekers and employers in Nepal. The goal is to
                provide a comprehensive platform for job seekers to find jobs in
                Nepal and for employers to find the right fit for their
                organization. We pride ourselves on being a reliable bridge
                between hiring employers and job seekers and have established
                ourselves as a national leader in recruitment solutions.
              </p>
              <p>
                Whether its a small startup or a large corporation, JobPros is
                here to help the business grow and succeed by making the hiring
                journey easy, cost-effective and effortless.
              </p>
              <p>
                The dedicated team in JobPros is committed to providing
                exceptional customer service and is composed of experts in their
                respective fields. Additionally, we take our corporate
                responsibility seriously and are proud to be one of the nation's
                largest tax-paying corporations, in compliance with all
                financial regulations.
              </p>
            </div>
            <div className="flex items-start">
              <Link to="/contact">
                <div className="px-3 py-2 text-white bg-mainColor rounded">
                  Contact Us
                </div>
              </Link>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col items-center justify-center gap-8">
          <h4 className="text-mainColor font-semibold text-3xl">
            Our Services
          </h4>
          <div className="w-full flex flex-col md:flex-row gap-3 justify-between ">
            <div className="md:w-1/3 bg-white flex flex-col px-4 py-3 rounded gap-3 shadow-boxShadow">
              <h6 className="text-[16px] font-medium">Direct Recuitment</h6>
              <p className="text-xs/5">
                The purpose of this procedure is to identify the direct
                recruitment and sel ection process for employing staffs at your
                esteemed organization. By choosing JobPros as your staffing
                firm, we can help your organization decrease the time associated
                with the recruiting process by placing the right employee, in a
                short span of time.
              </p>
              <div>
                <button
                  type="button"
                  className="bg-mainColor rounded text-white hover:bg-dark cursor-pointer px-3 py-2"
                >
                  Read Less
                </button>
              </div>
            </div>
            <div className="md:w-1/3 bg-white flex flex-col px-4 py-3 rounded gap-3 shadow-boxShadow">
              <h6 className="text-[16px] font-medium">Vacancy Announcement</h6>
              <p className="text-xs/5">
                JobsNepal vacancy announcements are the means by which an
                organization advertises its vacancies on our website
                www.jobsnepal.com for potential applicants about position being
                advertised. There is no general format for vacancy
                announcements: each organization creates and manages
                announcements independently, so applicants should carefully
                review each section.
              </p>
              <div>
                <button
                  type="button"
                  className="bg-mainColor rounded text-white hover:bg-dark cursor-pointer px-3 py-2"
                >
                  Read Less
                </button>
              </div>
            </div>
            <div className="md:w-1/3 bg-white flex flex-col px-4 py-3 rounded gap-3 shadow-boxShadow">
              <h6 className="text-[16px] font-medium">Banner Advertisement</h6>
              <p className="text-xs/5">
                JobPros is Nepal’s pioneer job and career portal. The number of
                daily visit or in our website is over 10,000 and is increasing.
                Advertisement with JobPros is much affordable. It is ideal for
                the companies like yours who have large target customers.
                Creating an ad campaign with jobs Nepal can be incredibly
                powerful for your business. The site consistently ranks highly
                on search engine like Google, under the key phrase “JobPros”.
              </p>
              <div>
                <button
                  type="button"
                  className="bg-mainColor rounded text-white hover:bg-dark cursor-pointer px-3 py-2"
                >
                  Read Less
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-8 items-center justify-center">
          <h3 className="text-mainColor font-semibold text-3xl">
            What Our Users Says
          </h3>
          <div className="w-full md:w-full overflow-hidden">
            <Carousel />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
