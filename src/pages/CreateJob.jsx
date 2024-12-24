import { CreateNewJobForm, DashboardLayout } from "@/components";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

const CreateJob = () => {
  return (
    <DashboardLayout>
      <Card className="p-4">
        <CardTitle>
          <Label className="text-2xl font-bold mx-6">Create New Job</Label>
        </CardTitle>
        <CardContent>
          <CreateNewJobForm />
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default CreateJob;
