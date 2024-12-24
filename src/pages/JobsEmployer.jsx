import { DashboardLayout } from "@/components";
import { useEffect, useState } from "react";
import {
  TableRow,
  Table,
  TableHead,
  TableBody,
  TableHeader,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CvViewer from "@/components/CvViewer";
import JobViewStatus from "@/components/JobViewStatus";
import { api } from "@/lib/api-client";

const JobsEmployer = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchAllJobs = async () => {
      const access_token = JSON.parse(localStorage.getItem("authTokens"))[
        "access"
      ];
      const response = await api.get("/jobs/jobs-with-applicants/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      });
      const json_data = await response.data;
      setData(json_data);
    };
    fetchAllJobs();
  }, []);

  return (
    <DashboardLayout>
      <div className="flex flex-col w-full">
        {data &&
          data.map((job) => {
            return (
              <Card key={job.id} className="mb-4">
                <CardHeader>
                  <CardTitle className="text-2xl text-bold">
                    {job.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {job.applications.length && job.applications.length > 0 ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>id</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {job.applications.map((applicant) => {
                          return (
                            // <TableRow key={applicant.id}>
                            //   <TableCell className="font-medium">
                            //     {applicant.id}
                            //   </TableCell>
                            //   <TableCell>
                            //     <Badge>{applicant.applicant?.email}</Badge>
                            //   </TableCell>
                            //   <TableCell>
                            //     <Badge>{applicant.status}</Badge>
                            //     </TableCell>
                            //   <TableCell className="justify-end flex gap-2">
                            //     <Sheet>
                            //       <SheetTrigger>
                            //         <Button variant={"outline"}>View CV</Button>
                            //       </SheetTrigger>
                            //       <SheetContent className="min-w-fit min-h-fit overflow-auto">
                            //         <SheetTitle>CV</SheetTitle>
                            //         <CvViewer url={applicant.cv} />
                            //       </SheetContent>
                            //     </Sheet>
                            //     <Button>Accept</Button>
                            //     <Button variant={"destructive"}>Reject</Button>
                            //   </TableCell>
                            // </TableRow>
                            <JobViewStatus
                              key={applicant.id}
                              applicant={applicant}
                            />
                          );
                        })}
                      </TableBody>
                    </Table>
                  ) : (
                    <div>No applicants</div>
                  )}
                </CardContent>
              </Card>
            );
          })}
      </div>
    </DashboardLayout>
  );
};

export default JobsEmployer;
