import { AllJobsTable } from "../components";
import DashboardLayout from "@/components/DashboardLayout";

const Employer = () => {
  return (
    <DashboardLayout>
      <div className="w-full flex">
        <AllJobsTable />
      </div>
    </DashboardLayout>
  );
};

export default Employer;
