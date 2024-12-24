import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "./ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "./ui/badge";
import { useEffect, useState } from "react";
import { DialogClose } from "@radix-ui/react-dialog";
import EditJobForm from "./EditJobForm";
import { api } from "@/lib/api-client";

const AppliedJobsTable = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      const { access } = JSON.parse(localStorage.getItem("authTokens"));
      const response = await api.get(`/applications/me/`, {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      });
      const data = await response.data;
      console.log(data);
      setJobs(data);
    };

    fetchJobs();
  }, []);

  return (
    <Card className="w-full p-4 min-h-screen">
      <CardTitle className="p-6 text-2xl font-bold">All Jobs</CardTitle>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Company Name</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Applied Date</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {jobs.map((job) => {
              return (
                <TableRow key={job.id}>
                  <TableCell className="font-medium">
                    {job.job_details.company.company_name}
                  </TableCell>
                  <TableCell>
                    <Badge variant={"outline"}>{job.job_details.title}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={"outline"} className="rounded-full">
                      {job.applied_at}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right flex gap-2 justify-end">
                    <Badge variant={job.status == "hired" ? "" : "outline"}>
                      {job.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default AppliedJobsTable;
