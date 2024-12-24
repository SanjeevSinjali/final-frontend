import { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "./ui/button";
import { AuthContext } from "../context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const JobDetails = () => {
  const [job, setJob] = useState(null);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const { isLoggedIn } = useContext(AuthContext);
  console.log(isLoggedIn);

  useEffect(() => {
    if (!id) return;

    const fetchJob = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/jobs/${id}/`, {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error(
            `Failed to fetch job details: ${response.statusText}`
          );
        }

        const data = await response.json();
        setJob(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      }
    };

    fetchJob();
  }, [id]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!job) {
    return <div>Loading...</div>;
  }

  return (
    <section className="bg-lightBg pt-32 pb-20">
      <div className="job-details max-w-7xl m-auto px-5 ">
        {/* <h1 className="heading text-2xl font-bold mb-4">Job Details</h1> */}
        <Card>
          <CardHeader>
            <CardTitle className=" font-bond">Job Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="details space-y-6">
              {/* Job Info */}
              <div className="job-info flex items-center space-x-4">
                <img
                  src={`http://127.0.0.1:8000${job.company.logo}`}
                  alt="Digital Home International Electronics"
                  className="w-24 h-24 rounded object-cover"
                />
                <h3 className="text-xl font-semibold">
                  {job.company.company_name}
                </h3>
              </div>

              {/* About Company */}
              <div className="moreinfo space-y-2">
                <h3 className="text-lg font-semibold">About Company</h3>
                <p className="text-gray-700 leading-relaxed">
                  {/* Digital Home International Electronics is a leading company in the
              Electronics Home Appliance sector in Nepal committed to providing
              our customers with the latest and most innovative Small Home
              Appliances, Home Electronics, and Home Appliances. Our mission is
              to enhance the everyday lives of our customers by offering
              products that combine quality, technology, and value for money. As
              we continue to grow and expand our operations, we seek a
              Procurement Manager to join our dynamic team. This role will be
              pivotal in ensuring the strategic sourcing of products from China,
              India, and other third countries, aligning with our commitment to
              excellence and sustainability. */}
                  {job.company.description}
                </p>
              </div>

              {/* Basic Details */}
              <div className="basic-details space-y-4">
                <div>
                  <h1 className="text-lg font-semibold">Location</h1>
                  <p className="text-gray-700">{job.location}</p>
                </div>
                <div>
                  <h1 className="text-lg font-semibold">Salary</h1>
                  <p className="text-gray-700">{job.salary} per month</p>
                </div>
                {/* <div>
              <h1 className="text-lg font-semibold">Benefits</h1>
              <p className="text-gray-700">Work from home, Health Insurance</p>
            </div> */}
                <div>
                  <h1 className="text-lg font-semibold">Job Type</h1>
                  <p className="text-gray-700">{job.job_type}</p>
                </div>
                <div>
                  <h1 className="text-lg font-semibold">Schedule</h1>
                  <p className="text-gray-700">{job.shift}</p>
                </div>
              </div>

              {/* Requirements */}
              <ul className="space-y-2">
                <h3 className="text-lg font-semibold">Requirements</h3>
                <li>
                  Education Level:{" "}
                  <span className="text-gray-700">{job.education_level}</span>
                </li>
                {/* <li>
              Age: <span className="text-gray-700">25+</span>
            </li> */}
                <li>
                  Professional Skill Required:{" "}
                  <span className="text-gray-700">{job.skills_required}</span>
                </li>
                {/* <li>
              Experience: <span className="text-gray-700">Not Required</span>
            </li> */}
              </ul>

              {/* Other Qualifications */}
              {/* <ul className="space-y-2">
            <h3 className="text-lg font-semibold">Other Qualifications</h3>
            <li>Education: CA & ACCA are highly preferred</li>
            <li>Strong proficiency in Excel and data management tools.</li>
            <li>Excellent analytical and problem-solving skills.</li>
            <li>
              Familiarity with financial reporting and accounting principles.
            </li>
            <li>Good communication skills and teamwork abilities.</li>
            <li>Attention to detail and accuracy.</li>
            <li>Ability to work under pressure and meet deadlines.</li>
            <li>
              Proactive attitude with a commitment to continuous learning.
            </li>
          </ul> */}

              {/* Job Description */}
              {/* <div className="description space-y-4">
            <h3 className="text-lg font-semibold">Job Description</h3>
            <h2 className="text-xl font-bold">Key Responsibilities</h2>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>
                Manage large datasets related to sales, inventory, purchases,
                and financial performance.
              </li>
              <li>
                Prepare and present daily, weekly, and monthly KPI reports.
              </li>
              <li>
                Conduct financial and operational analysis to identify trends
                and opportunities.
              </li>
              <li>
                Oversee and maintain the MIS for data accuracy and integrity.
              </li>
              <li>
                Collaborate with departments to streamline processes and enhance
                efficiency.
              </li>
              <li>
                Assist in budgeting and forecasting with relevant data and
                insights.
              </li>
              <li>
                Ensure compliance with financial reporting policies and
                regulations.
              </li>
              <li>
                Provide technical support and training on MIS tools and
                software.
              </li>
            </ul>
          </div> */}

              {/* Apply Form */}

              <Button disabled={!isLoggedIn}>
                <Link to={`/job-details/${id}/apply`}>Apply Now</Link>
              </Button>

              {/* <button
              type="submit"
              className="save flex items-center space-x-2 text-blue-600 border border-blue-600 py-2 px-4 rounded hover:bg-blue-50"
            >
              <i className="far fa-heart"></i>
              <span>Add Job</span>
            </button> */}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default JobDetails;
