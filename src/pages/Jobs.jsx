import { JobCard } from "../components";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { api } from "@/lib/api-client";

const Jobs = () => {
  const [getJobs, setGetJobs] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const defaultTitle = searchParams.get("title") || "";
  const defaultLocation = searchParams.get("location") || "";

  useEffect(() => {
    const fetchJobs = async () => {
      const filters = {};
      searchParams.forEach((value, key) => {
        filters[key] = value;
      });

      const queryParams = Object.keys(filters)
        .map(
          (key) =>
            `${encodeURIComponent(key)}=${encodeURIComponent(filters[key])}`
        )
        .join("&");

      const response = await api.get(`/jobs/?${queryParams}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status != 200) {
        console.error("Failed to fetch jobs:", response.statusText);
      }

      const data = await response.data;
      setGetJobs(data);
    };

    fetchJobs();
  }, [searchParams]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const filters = {};
    const formElements = new FormData(e.target);

    formElements.forEach((value, key) => {
      if (value) filters[key] = value;
    });

    setSearchParams(filters);
  };

  return (
    <main className="bg-lightBg">
      <div className="max-w-7xl m-auto px-5 py-8 flex flex-col items-center justify-center gap-12 mt-20">
        <div className="w-full flex flex-col gap-8">
          <h2 className="text-center text-3xl font-semibold text-mainColor">
            Filter Job
          </h2>
          <form
            onSubmit={handleSubmit}
            className="md:w-full bg-white px-3 py-4 rounded flex flex-col gap-8"
          >
            <div className="flex flex-col md:flex-row gap-5 w-full justify-between items-center">
              <div className="w-full md:w-1/2 flex flex-col gap-3 flex-wrap">
                <label htmlFor="title" className="text-mainColor font-medium">
                  Job Title<span className="text-red2">*</span>
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  placeholder="job title"
                  className="px-3 py-2 outline-mainColor bg-lightBg rounded"
                  defaultValue={defaultTitle}
                />
              </div>
              <div className="w-full md:w-1/2 flex flex-col gap-3 flex-wrap">
                <label
                  htmlFor="location"
                  className="text-mainColor font-medium"
                >
                  Job Location
                </label>
                <input
                  id="location"
                  type="text"
                  name="location"
                  placeholder="City, State"
                  className="px-3 py-2 outline-mainColor bg-lightBg rounded"
                  defaultValue={defaultLocation}
                />
              </div>
            </div>
            <div className="flex gap-3 justify-between items-center flex-wrap">
              <div>
                <select
                  name="deadline"
                  id="deadline"
                  className="bg-lightBg px-3 py-2 rounded text-center outline-mainColor"
                >
                  <option value="">Deadline</option>
                  <option value={"today"}>1 Day</option>
                  <option value={"week"}>7 Days</option>
                  <option value={"monthly"}>30 Days</option>
                </select>
              </div>
              <div>
                <select
                  name="salary"
                  id="salary"
                  className="bg-lightBg px-3 py-2 rounded text-center outline-mainColor"
                >
                  <option value="">Salary</option>
                  <option value={"1k"}>1K</option>
                  <option value={"5k"}>5K</option>
                  <option value={"10k"}>10K</option>
                  <option value={"20k"}>20K</option>
                  <option value={"30k"}>30K</option>
                  <option value={"40k"}>40K</option>
                  <option value={"50k"}>50K</option>
                  <option value={"1l"}>1L</option>
                  <option value={"5l"}>5L</option>
                  <option value={"negotiable"}>Negotiable</option>
                </select>
              </div>
              <div>
                <select
                  name="job_type"
                  id="job_type"
                  className="bg-lightBg px-3 py-2 rounded text-center outline-mainColor"
                >
                  <option value="">Type of Job</option>
                  <option value={"full-time"}>Full Time</option>
                  <option value={"part-time"}>Part Time</option>
                  <option value={"contract"}>Internship</option>
                  <option value={"freelance"}>Contract</option>
                  <option value={"temporary"}>Temporary</option>
                </select>
              </div>
              <div>
                <select
                  name="job_level"
                  id="job_level"
                  className="bg-lightBg px-3 py-2 rounded text-center outline-mainColor"
                >
                  <option value="">Job Level</option>
                  <option value={"entry"}>Entry Level</option>
                  <option value={"mid"}>Mid Level</option>
                  <option value={"senior"}>Senior Level</option>
                </select>
              </div>
              <div>
                <select
                  name="shift"
                  id="shift"
                  className="bg-lightBg px-3 py-2 rounded text-center outline-mainColor"
                >
                  <option value="">Work Shifts</option>
                  <option value={"day"}>Day</option>
                  <option value={"night"}>Night</option>
                  <option value={"flexible"}>Flexible</option>
                </select>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="bg-mainColor hover:bg-hoverColor px-6 py-2 rounded cursor-pointer text-white"
              >
                Filter
              </button>
            </div>
          </form>
        </div>
        <div className="flex flex-col gap-8 mb-8">
          <h2 className="text-center text-3xl font-semibold text-mainColor">
            All Jobs
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-x-10 md:gap-y-14">
            {getJobs.map((job) => {
              return (
                <JobCard
                  key={job.id}
                  id={job.id}
                  logo={job.company?.logo}
                  name={job.company?.company_name}
                  expiryDate={job.application_deadline}
                  role={job.title}
                  location={job.location}
                  salary={job.salary}
                  jobLevel={job.job_level}
                  jobType={job.job_type}
                  shift={job.shift}
                />
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Jobs;
