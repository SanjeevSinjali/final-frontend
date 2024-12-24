import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { api } from "@/lib/api-client";

const Register = () => {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState("seeker");
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      const response = await api.get("/company/");
      const data = await response.data;
      setCompanies(data);
    };
    fetchCompanies();
  }, []);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    user_role: "",
    address: "",
    pincode: "",
    password: "",
    job_role: "",
    experience: "",
    skills: "",
  });

  const [cvFile, setCvFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === "user_role") {
      setUserRole(value);
    }
  };
  console.log(userRole);

  const handleFileChange = (e) => {
    setCvFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataObj = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataObj.append(key, formData[key]);
    });

    if (cvFile) {
      formDataObj.append("cv", cvFile);
    }

    try {
      const response = await api.post("/users/", formDataObj, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response);
      // const data = await response.json();
      toast.success("Registration successful!");
      navigate("/login");
    } catch (error) {
      console.log(error.response.data);
      toast.error(
        `Registration failed! ${JSON.stringify(error.response.data)}`
      );
    }
  };

  return (
    <main className="bg-lightBg w-full mt-12">
      <div className="max-w-7xl m-auto ">
        <form
          onSubmit={handleSubmit}
          className="my-10 mx-8 flex flex-col gap-8 justify-center items-center"
          encType="multipart/form-data"
        >
          <div>
            <select
              name="user_role"
              value={formData.user_role}
              onChange={handleChange}
              className="px-4 py-2 outline-mainColor text-sm cursor-pointer"
              required
            >
              <option value="seeker">Job Seeker</option>
              <option value="provider">Job Employer</option>
            </select>
          </div>

          <div className="bg-white rounded-xl px-16 py-8 flex flex-col gap-8">
            <h6 className="text-center text-[34px] font-semibold">
              {userRole == "seeker" ? "Job" : "Employer"} Application Form
            </h6>
            <div className="flex flex-col gap-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label htmlFor="first_name">First Name</label>
                  <input
                    id="first_name"
                    name="first_name"
                    type="text"
                    placeholder="Enter your First Name"
                    value={formData.first_name}
                    onChange={handleChange}
                    className="px-4 py-2 outline-mainColor border text-sm"
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="last_name">Last Name</label>
                  <input
                    id="last_name"
                    name="last_name"
                    type="text"
                    placeholder="Enter your Last Name"
                    value={formData.last_name}
                    onChange={handleChange}
                    className="px-4 py-2 outline-mainColor border text-sm"
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="px-4 py-2 outline-mainColor border text-sm"
                    required
                  />
                </div>
                {userRole === "provider" && (
                  <div className="flex flex-col gap-2">
                    <label htmlFor="company">Company</label>
                    <select
                      name="company_id"
                      id="company_id"
                      value={formData.company_id}
                      onChange={handleChange}
                      className="px-4 py-2 text-sm border outline-mainColor"
                    >
                      <option value="">Select Company</option>
                      {companies.map((company) => (
                        <option key={company.id} value={company.id}>
                          {company.company_name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {userRole === "seeker" && (
                  <div className="flex flex-col gap-2">
                    <label htmlFor="job_role">Job Role</label>
                    <select
                      name="job_role"
                      id="job_role"
                      value={formData.job_role}
                      onChange={handleChange}
                      className="px-4 py-2 text-sm border outline-mainColor"
                    >
                      <option value="">Select Job Role</option>
                      <option value="software_engineer">
                        Software Engineer
                      </option>
                      <option value="frontend_developer">
                        Frontend Developer
                      </option>
                      <option value="qa_engineer">QA Engineer</option>
                      <option value="back_end_developer">
                        Backend Developer
                      </option>
                      <option value="project_manager">Project Manager</option>
                      <option value="full_stack_developer">
                        Full Stack Developer
                      </option>
                      <option value="uiux_designer">UI/UX Designer</option>
                      <option value="graphics_designer">
                        Graphics Designer
                      </option>
                      <option value="laravel_developer">
                        Laravel Developer
                      </option>
                      <option value="digital_marketing">
                        Digital Marketing
                      </option>
                      <option value="php_developer">PHP Developer</option>
                      <option value="flutter_developer">
                        Flutter Developer
                      </option>
                    </select>
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="address">Address</label>
                <textarea
                  id="address"
                  name="address"
                  placeholder="Enter your Address"
                  value={formData.address}
                  onChange={handleChange}
                  className="px-4 py-2 text-sm border outline-mainColor"
                  required
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label htmlFor="pincode">Pincode</label>
                  <input
                    id="pincode"
                    name="pincode"
                    type="text"
                    placeholder="Enter Pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    className="px-4 py-2 outline-mainColor border text-sm"
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="password">Password</label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="px-4 py-2 outline-mainColor border text-sm"
                    required
                  />
                </div>
                {userRole === "seeker" && (
                  <>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="experience">Previous Experience</label>
                      <input
                        id="experience"
                        name="experience"
                        placeholder="Previous experience"
                        // value={formData.password}
                        onChange={handleChange}
                        type="number"
                        className="px-4 py-2 outline-mainColor border text-sm"
                        required
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="skills">Skills</label>
                      <input
                        id="skills"
                        name="skills"
                        placeholder="Skills"
                        onChange={handleChange}
                        className="px-4 py-2 outline-mainColor border text-sm"
                        required
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
            <button
              type="submit"
              className="bg-mainColor rounded-md sm:w-1/4 py-2 px-3 text-center cursor-pointer text-white hover:bg-hoverColor"
            >
              Register Now
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Register;
