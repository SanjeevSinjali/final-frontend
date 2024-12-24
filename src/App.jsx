import {
  About,
  Contact,
  Employer,
  Home,
  Jobs,
  Login,
  Register,
  Profile,
  CreateJob,
  UserProfile,
  AppliedJobs,
  JobsEmployer,
} from "./pages";
import { Footer, JobDetails, Navbar, JobApplyForm } from "./components";
import { Route, Routes, useLocation } from "react-router-dom";

const App = () => {
  const location = useLocation();

  const hideNavigation = [
    "/dashboard",
    "/profile",
    "/create-job",
    "/all-applicants",
  ];

  const isNavigationHidden = hideNavigation.includes(location.pathname);
  return (
    <div className="flex flex-col h-screen">
      {isNavigationHidden ? "" : <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Employer />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/job-details/:id" element={<JobDetails />} />
        <Route path="/create-job" element={<CreateJob />} />
        <Route path="/all-applicants" element={<JobsEmployer />} />
        <Route path="/:id/settings" element={<UserProfile />} />
        <Route path="/:id/applied-jobs" element={<AppliedJobs />} />
        <Route path="/job-details/:id/apply" element={<JobApplyForm />} />
      </Routes>
      {isNavigationHidden ? "" : <Footer />}
    </div>
  );
};

export default App;
