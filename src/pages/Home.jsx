import { useContext, useEffect, useState } from "react";
import { assets } from "../assets";
import { JobCategory, PopularJob, TeamMember } from "../components";
import { Link, useNavigate } from "react-router-dom";
import { api } from "@/lib/api-client";
import { AuthContext } from "@/context/AuthContext";

const Home = () => {
  const [jobsWithCount, setWithJobsCount] = useState([]);
  const navigate = useNavigate();
  const [popular_jobs, setPopularJobs] = useState([]);
  const { isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    const fetchJobs = async () => {
      const response = await api.get("/jobs/search-job-count/");
      const data = await response.data;
      console.log(data);
      setWithJobsCount(data);
    };

    const fetchPopularJobs = async () => {
      const response = await api.get("/jobs/");
      const popular_jobs = await response.data;
      console.log("popular jobs : ", popular_jobs);
      setPopularJobs(popular_jobs);
    };

    const fetchRecommendedJobs = async () => {
      const { access } = JSON.parse(localStorage.getItem("authTokens"));
      console.log("access token : ", access);
      const response = await api.get("/jobs/recommended-jobs/", {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      });

      const popular_jobs = await response.data;
      console.log("popular jobs : ", popular_jobs);
      setPopularJobs(popular_jobs);
    };
    fetchJobs();
    !isLoggedIn && fetchPopularJobs();
    isLoggedIn && fetchRecommendedJobs();
  }, [isLoggedIn]);

  console.log("popular jobs : ", popular_jobs);

  const handleSearch = (e) => {
    e.preventDefault();

    const filters = {};
    const formElements = new FormData(e.target);

    formElements.forEach((value, key) => {
      if (value) filters[key] = value;
    });

    const queryString = new URLSearchParams(filters).toString();
    navigate(`/jobs?${queryString}`);
  };
  return (
    <div className="bg-mainColor w-full">
      {/* Hero Section */}
      <main className="max-w-7xl m-auto px-5 flex flex-col justify-center lg:flex-row lg:justify-between items-center gap-2 md:gap-10 min-h-screen md:max-h-screen">
        {/* Left Side */}
        <div className="flex justify-between items-center gap-20 my-8">
          <div className="flex flex-col gap-5">
            <h1 className="text-white font-semibold text-2xl/10 md:text-4xl/[56px]">
              Find the perfect Job with your preference
            </h1>
            <p className="text-white text-sm">
              Work with outstanding companies with perfect finance support for
              you.
            </p>
            <div className="bg-white h-[180px] w-[250px] sm:h-[260px] sm:w-[382px] rounded-lg px-2 md:px-3 py-3 md:py-6 flex justify-center items-center">
              <form
                onSubmit={handleSearch}
                className="flex flex-col gap-2 md:gap-5 text-xs md:text-sm justify-center items-center w-full"
              >
                <div className="flex flex-col gap-2 w-full">
                  <label htmlFor="title">
                    Job Title<span className="text-red-700">*</span>
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    placeholder="Keyword Category or Company"
                    className="bg-lightBg outline-hoverColor px-3 py-2 rounded"
                    required
                  />
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <label htmlFor="location">Job Location</label>
                  <input
                    type="text"
                    name="location"
                    id="location"
                    placeholder="City, State"
                    className="bg-lightBg outline-hoverColor px-3 py-2 rounded"
                  />
                </div>
                <button
                  type="submit"
                  className="px-3 py-2 bg-mainColor text-white hover:bg-hoverColor rounded-md cursor-pointer"
                >
                  Search Job
                </button>
              </form>
            </div>
          </div>
        </div>
        {/* Right Side */}
        <div className="order-1">
          <img src={assets.rightSide} alt="Hero Image" />
        </div>
      </main>

      <section className="bg-lightBg flex flex-col gap-2">
        {/* Job Categories */}
        <div className="max-w-7xl m-auto px-5 py-8 flex flex-col items-center justify-center gap-12">
          <h2 className="text-center text-3xl font-semibold text-mainColor">
            Famous Job Categories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-x-10 md:gap-y-14 text-xl">
            {jobsWithCount.map((job) => {
              return (
                <JobCategory
                  key={job.title}
                  name={job.title}
                  totalJobs={job.count}
                />
              );
            })}
          </div>

          <div className="w-full">
            <h2 className="text-center text-3xl font-semibold text-mainColor">
              {isLoggedIn ? "Recommended" : "Popular"} Jobs for you
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-x-10 md:gap-y-6 mt-4">
              {popular_jobs.map((job) => {
                return (
                  <PopularJob
                    id={job.id}
                    key={job.id}
                    logo={job.company.logo}
                    companyName={job.company.company_name}
                    role={job.title}
                  />
                );
              })}

              {/* 
              <PopularJob
                logo={assets.dataAnalyst}
                companyName="Digital Home International Electronics"
                role="Data Analyst / MIS"
              />
              <PopularJob
                logo={assets.dataAnalyst}
                companyName="Digital Home International Electronics"
                role="Data Analyst / MIS"
              />
              <PopularJob
                logo={assets.dataAnalyst}
                companyName="Digital Home International Electronics"
                role="Data Analyst / MIS"
              />
              <PopularJob
                logo={assets.dataAnalyst}
                companyName="Digital Home International Electronics"
                role="Data Analyst / MIS"
              />
              <PopularJob
                logo={assets.dataAnalyst}
                companyName="Digital Home International Electronics"
                role="Data Analyst / MIS"
              />
              <PopularJob
                logo={assets.dataAnalyst}
                companyName="Digital Home International Electronics"
                role="Data Analyst / MIS"
              />
              <PopularJob
                logo={assets.dataAnalyst}
                companyName="Digital Home International Electronics"
                role="Data Analyst / MIS"
              />
              <PopularJob
                logo={assets.dataAnalyst}
                companyName="Digital Home International Electronics"
                role="Data Analyst / MIS"
              />
              <PopularJob
                logo={assets.dataAnalyst}
                companyName="Digital Home International Electronics"
                role="Data Analyst / MIS"
              />
              <PopularJob
                logo={assets.dataAnalyst}
                companyName="Digital Home International Electronics"
                role="Data Analyst / MIS"
              />
              <PopularJob
                logo={assets.dataAnalyst}
                companyName="Digital Home International Electronics"
                role="Data Analyst / MIS"
              />
              <PopularJob
                logo={assets.dataAnalyst}
                companyName="Digital Home International Electronics"
                role="Data Analyst / MIS"
              /> */}
            </div>
            <div className="flex items-start w-full mt-4">
              <Link to="/jobs">
                <div className="bg-mainColor px-4 py-2 text-white rounded">
                  More Jobs ...
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-lightColor w-full">
        <div className="max-w-7xl m-auto px-5 py-8 flex flex-col items-center justify-center gap-12">
          <h3 className="text-center text-4xl font-semibold text-mainColor">
            Our Team
          </h3>
          <div className="flex flex-col xl:flex-row flex-wrap justify-between items-center gap-5 w-full">
            <TeamMember
              pic={assets.team1}
              name="Imani Poudel"
              role="Founder"
              description="I design and build the user interface, layout, and interactivity of your site. By allows users to interact with the website
                    in an engaging and visually appealing manner."
              fb="https://www.facebook.com/imani.poudel?mibextid=ZbWKwL"
              ig="https://www.instagram.com/__imanii12?igsh=MWppODRpZTU5eG5wdQ%3D%3D"
            />
            <TeamMember
              pic={assets.team2}
              name="Isha Gurung"
              role="Founder"
              description="I focus on providing a powerful and efficient way to build web applications, offering features such as authentication, database management, and URL routing."
              fb="https://www.facebook.com/profile.php?id=100088463275732&mibextid=ZbWKwLL"
              ig="https://www.instagram.com/isha00___?igsh=b3Y1Y3A3MXozb3pk"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
