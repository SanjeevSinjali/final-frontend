import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/lib/api-client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { DialogClose } from "./ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "react-toastify";

const formSchema = z.object({
  title: z
    .string()
    .min(5, { message: "Job title must be at least 5 characters long." }),
  salary: z.string().min(1, { message: "Salary is required." }),
  location: z
    .string()
    .min(5, { message: "Location must be at least 5 characters long." }),
  required_experience: z
    .number()
    .min(1, { message: "Required experience is required." }),
  skills_required: z
    .string()
    .min(5, { message: "Skills required must be at least 2 characters long." }),
  education_level: z
    .string()
    .min(2, { message: "Education level is required." }),
  job_type: z.enum(
    ["full-time", "part-time", "contract", "freelance", "fresher", "temporary"],
    {
      message: "Invalid job type selected.",
    }
  ),
  job_level: z.enum(["entry", "mid", "senior"], {
    message: "Invalid job level selected.",
  }),
  schedule: z.enum(["day", "night", "flexible"], {
    message: "Invalid schedule selected.",
  }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters long." }),
  application_deadline: z.string(),
});

function EditJobForm({ prevData }) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: prevData.title,
      salary: prevData.salary,
      location: prevData.location,
      required_experience: prevData.required_experience,
      skills_required: prevData.skills_required,
      education_level: prevData.education_level,
      job_type: prevData.job_type,
      job_level: prevData.job_level,

      schedule: prevData.shift,
      description: prevData.description,
      application_deadline: prevData.application_deadline
        ? new Date(prevData.application_deadline).toISOString().slice(0, 16)
        : "",
    },
  });
  console.log(prevData);

  async function onSubmit(values) {
    console.log(values);

    try {
      const { access } = JSON.parse(localStorage.getItem("authTokens"));
      const response = await api.patch(
        `/jobs/${prevData.id}/`,
        JSON.stringify(values),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access}`,
          },
        }
      );
      toast.success("Successfully updated!!");
    } catch (error) {
      console.error(error);
      toast.error("Error occured while updaing..");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Title</FormLabel>
              <FormControl>
                <Input placeholder="Software Developer" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="salary"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Salary</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="required_experience"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Required Experience</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="skills_required"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Preferred Skills</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="education_level"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Education Level</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="job_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Type</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange} // This binds the selected value to the form
                  value={field.value} // This ensures the value is displayed correctly
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Job Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full-time">Full-time</SelectItem>
                    <SelectItem value="part-time">Part-time</SelectItem>
                    <SelectItem value="contract">Contract</SelectItem>
                    <SelectItem value="freelance">Freelance</SelectItem>
                    <SelectItem value="fresher">Fresher</SelectItem>
                    <SelectItem value="temporary">Temporary</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="job_level"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Level</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange} // This binds the selected value to the form
                  value={field.value} // This ensures the value is displayed correctly
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Job Level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="entry">Entry Level</SelectItem>
                    <SelectItem value="mid">Mid Level</SelectItem>
                    <SelectItem value="senior">Senior Level</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="schedule"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Shift</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Schedule" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="day">Day Shift</SelectItem>
                    <SelectItem value="night">Night Shift</SelectItem>
                    <SelectItem value="flexible">Flexible</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Description</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Job Description (How you write here exactly displays on screen)"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="application_deadline"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Application Deadline</FormLabel>
              <FormControl>
                <Input type="datetime-local" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-5">
          <Button type="submit" className="bg-blue-600">
            Save
          </Button>
          <DialogClose asChild>
            <Button variant={"destructive"}>Cancel</Button>
          </DialogClose>
        </div>
      </form>
    </Form>
  );
}

export default EditJobForm;
