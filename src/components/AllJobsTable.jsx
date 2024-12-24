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
import { DialogClose } from "@/components/ui/dialog";
import EditJobForm from "./EditJobForm";
import { api } from "@/lib/api-client";
import { toast } from "react-toastify";

const AllJobsTable = () => {
  const [jobs, setJobs] = useState([]);
  const authTokens = JSON.parse(localStorage.getItem("authTokens"));
  console.log(authTokens);
  const access = authTokens["access"];

  useEffect(() => {
    const fetchJobs = async () => {
      const response = await api.get(`/jobs/jobs-with-applicants/`, {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      });
      const data = await response.data;
      setJobs(data);
    };

    fetchJobs();
  }, [access]);

  useEffect(() => {}, [jobs]);

  console.log(jobs);

  const deleteJob = (id) => async () => {
    const { access } = JSON.parse(localStorage.getItem("authTokens"));
    try {
      const response = await api.delete(`/jobs/${id}/`, {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      });
      toast.success("Successfully deleted");
    } catch (error) {
      toast.error("Couldn't delete job");
    }
  };

  return (
    <Card className="w-full p-4">
      <CardTitle className="p-6 text-2xl font-bold">All Jobs</CardTitle>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              {/* <TableHead>Company Name</TableHead> */}
              <TableHead>Position</TableHead>
              <TableHead>Total Applicants</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {jobs.map((job) => {
              return (
                <TableRow key={job.id}>
                  {/* <TableCell className="font-medium">
                    {job.company.company_name}
                  </TableCell> */}
                  <TableCell>
                    <Badge>{job.title}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className="rounded-full">
                      {job.applications.length}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right flex gap-2 justify-end">
                    <Dialog>
                      <DialogTrigger>
                        <Button>Edit</Button>
                      </DialogTrigger>
                      <DialogContent className="h-full overflow-scroll no-scrollbar">
                        <EditJobForm prevData={job} />
                      </DialogContent>
                    </Dialog>
                    <Dialog>
                      <DialogTrigger>
                        <Button variant={"destructive"}>Delete</Button>{" "}
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Are you absolutely sure?</DialogTitle>
                          <DialogDescription variant={"info"}>
                            This action cannot be undone.
                          </DialogDescription>
                          <div className="flex gap-2 justify-end">
                            <Button
                              variant={"destructive"}
                              onClick={deleteJob(job.id)}
                            >
                              Delete
                            </Button>
                            <DialogClose asChild>
                              <Button variant={"outline"}>Cancel</Button>
                            </DialogClose>
                          </div>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
                    {/* <Button variant={"destructive"}>Delete</Button> */}
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

export default AllJobsTable;
