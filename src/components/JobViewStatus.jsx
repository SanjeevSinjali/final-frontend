import { TableCell, TableRow } from "./ui/table";
import { Sheet, SheetTrigger, SheetContent, SheetTitle } from "./ui/sheet";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import CvViewer from "@/components/CvViewer";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { api } from "@/lib/api-client";

const JobViewStatus = ({ applicant }) => {
  const [user, setUser] = useState({});
  console.log(applicant);
  useEffect(() => {
    const fetchUserInfo = async () => {
      const access_token = JSON.parse(localStorage.getItem("authTokens"))[
        "access"
      ];
      const response = await api.get(`/users/${applicant.applicant}/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      });
      const json_data = await response.data;
      console.log(json_data);
      setUser(json_data);
    };

    fetchUserInfo();
  }, [applicant]);
  console.log(user);
  console.log(applicant);

  const applicantStatusHandle = async (status) => {
    const access_token = JSON.parse(localStorage.getItem("authTokens"))[
      "access"
    ];
    try {
      const response = await api.patch(
        `/applications/${applicant.id}/`,
        { status: status },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      console.log(response);
      if (response.status !== 200) {
        toast.error("Failed to update applicant status");
      } else {
        toast.info("Applicant status updated");
      }
    } catch (error) {
      toast.error("An error occurred while updating applicant status");
    }
  };
  return (
    <TableRow key={applicant.id}>
      <TableCell className="font-medium">{applicant.id}</TableCell>
      <TableCell>
        <Badge>{user?.email}</Badge>
      </TableCell>
      <TableCell>
        <Badge>{applicant.status}</Badge>
      </TableCell>
      <TableCell className="justify-end flex gap-2">
        <Sheet>
          <SheetTrigger>
            <Button variant={"outline"}>View CV</Button>
          </SheetTrigger>
          <SheetContent className="min-w-fit min-h-fit overflow-auto">
            <SheetTitle>CV</SheetTitle>
            <CvViewer url={applicant.cv} />
          </SheetContent>
        </Sheet>
        <Button
          disabled={applicant.status === "pending" ? false : true}
          onClick={() => applicantStatusHandle("hired")}
        >
          Accept
        </Button>
        <Button
          onClick={() => applicantStatusHandle("rejected")}
          disabled={applicant.status === "pending" ? false : true}
          variant={"destructive"}
        >
          Reject
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default JobViewStatus;
