import { useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "@/lib/api-client";
import { toast } from "react-toastify";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";

const JobApplyForm = () => {
  const { id } = useParams();

  const [cover_letter, setCoverLetter] = useState("");
  const [cv, setCv] = useState(null);

  const handleCoverLetterChange = (e) => setCoverLetter(e.target.value);
  const handleCvChange = (e) => setCv(e.target.files[0]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { access, refresh } = JSON.parse(localStorage.getItem("authTokens"));
    const date = new Date();
    console.log(access);

    const formData = new FormData();
    formData.append("job", id);
    // formData.append("applicant", access);
    formData.append("cover_letter", cover_letter);
    formData.append("cv", cv);
    formData.append("applied_at", date);

    try {
      const response = await api.post(`/applications/`, formData, {
        headers: {
          Authorization: `Bearer ${access}`,
          "Content-Type": "multipart/form-data",
        },
      });

      // if (response.status !== 201) {
      //   toast.error("Failed to apply for the job");
      // } else {
      //   toast.success("Job application submitted successfully");
      // }
      toast.success("Job application submitted successfully");
    } catch (error) {
      if (
        error.response.data.non_field_errors[0] ==
        "The fields job, applicant must make a unique set."
      ) {
        toast.error("You have already applied for this job");
        return;
      }
      toast.error("Couldn't apply for the job");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center my-8 w-full">
      <Card className="font-mono w-1/2">
        <CardHeader>
          <CardTitle>Job Application form</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            action=""
            method="post"
            onSubmit={handleSubmit}
            className="flex flex-col w-full gap-5"
          >
            <div className="flex items-start flex-col w-full">
              <label htmlFor="cover_letter" className="mb-4 font-bold">
                Cover Letter
              </label>

              <div className="border-2 w-full">
                <textarea
                  name="cover_letter"
                  id="cover_letter"
                  className="w-full min-h-64"
                  value={cover_letter}
                  onChange={handleCoverLetterChange}
                ></textarea>
              </div>
            </div>
            <div className="flex items-start flex-col w-full">
              <label htmlFor="cv">Resume</label>
              <input type="file" name="cv" id="cv" onChange={handleCvChange} />
            </div>
            <button
              type="submit"
              className="bg-mainColor hover:bg-hoverColor w-fit px-3 py-2 rounded"
            >
              Submit
            </button>
          </form>
          {/* </div> */}
        </CardContent>
      </Card>
    </div>
  );
};

export default JobApplyForm;
