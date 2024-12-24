// import { useEffect, useState } from "react";
// import { FaBriefcase, FaClock, FaHeart, FaRegHeart } from "react-icons/fa6";
// import { Link } from "react-router-dom";
// import { useContext } from "react";
// import { AuthContext } from "../../context/AuthContext";
// import { api } from "@/lib/api-client";

// const JobCard = ({
//   id,
//   logo,
//   name,
//   expiryDate,
//   role,
//   location,
//   salary,
//   jobLevel,
//   jobType,
//   shift,
// }) => {
//   const { isLoggedIn } = useContext(AuthContext);
//   const [isLiked, setIsLiked] = useState(false);

//   useEffect(() => {
//     const fetchIsliked = async () => {
//       const { access } = JSON.parse(localStorage.getItem("authTokens"));
//       // fetch the liked status of the job
//       const isLiked = await api.get("jobs/liked-job-status/", {
//         headers: {
//           Authorization: `Bearer ${access}`,
//         },
//       });
//       console.log(isLiked);
//     };
//     fetchIsliked();
//   }, [isLiked]);

//   const handleLike = async () => {
//     const { access } = JSON.parse(localStorage.getItem("authTokens"));
//     // like the job
//     const response = await api.post(
//       "jobs/like-job/",
//       { job_id: id },
//       {
//         headers: {
//           Authorization: `Bearer ${access}`,
//         },
//       }
//     );
//     console.log(response);
//     setIsLiked(true);
//   };
//   return (
//     <div className="w-[384px] h-[342px] bg-white rounded p-3 flex flex-col gap-5">
//       <div className="flex gap-3 ">
//         <div className="w-[67px] h-[67px] flex">
//           <img
//             src={"http://127.0.0.1:8000" + logo}
//             alt={name}
//             className="object-cover content-center w-full"
//           />
//         </div>
//         <div className="flex flex-col gap-2">
//           <h6 className="font-medium">{name}</h6>
//           <p className="text-sm text-mainColor">Apply Before: {expiryDate}</p>
//         </div>
//       </div>
//       <div className="flex flex-col gap-1 text-xs">
//         <h6 className="font-medium text-lg">{role}</h6>
//         <p>
//           Job Location: <span className="text-mainColor">{location}</span>
//         </p>
//         <p>
//           Offered Salary: <span className="text-mainColor">{salary}</span>
//         </p>
//         <p>
//           Job Level: <span className="text-mainColor">{jobLevel}</span>
//         </p>
//       </div>
//       <div className="flex gap-4 text-sm">
//         <div className="bg-lightBg px-4 py-2 flex gap-2 rounded items-center">
//           <FaBriefcase />
//           <span className="text-mainColor">{jobType}</span>
//         </div>
//         <div className="bg-lightBg px-4 py-2 flex gap-2 rounded items-center">
//           <FaClock />
//           <span className="text-mainColor">{shift}</span>
//         </div>
//       </div>
//       <div className="w-full flex justify-between items-center">
//         <Link to={`/job-details/${id}`}>
//           <div className="bg-mainColor text-white px-3 py-2 rounded hover:bg-hoverColor">
//             View Details
//           </div>
//         </Link>
//         <button
//           disabled={!isLoggedIn}
//           className="bg-lightColor rounded p-3"
//           onClick={handleLike}
//         >
//           <FaRegHeart className="text-mainColor" />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default JobCard;

import { useEffect, useState } from "react";
import { FaBriefcase, FaClock, FaHeart, FaRegHeart } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { api } from "@/lib/api-client";

const JobCard = ({
  id,
  logo,
  name,
  expiryDate,
  role,
  location,
  salary,
  jobLevel,
  jobType,
  shift,
}) => {
  const { isLoggedIn } = useContext(AuthContext);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const fetchIsLiked = async () => {
      const { access } = JSON.parse(localStorage.getItem("authTokens"));

      try {
        const response = await api.get("jobs/liked-job-status/", {
          headers: {
            Authorization: `Bearer ${access}`,
          },
          params: { job_id: id },
        });
        setIsLiked(response.data.liked);
      } catch (error) {
        console.error("Error fetching liked status:", error);
      }
    };

    if (isLoggedIn) {
      fetchIsLiked();
    }
  }, [id, isLoggedIn]);

  const handleLike = async () => {
    const { access } = JSON.parse(localStorage.getItem("authTokens"));

    try {
      if (isLiked) {
        await api.post(
          "jobs/unlike-job/",
          { job_id: id },
          {
            headers: {
              Authorization: `Bearer ${access}`,
            },
          }
        );
        setIsLiked(false);
      } else {
        await api.post(
          "jobs/like-job/",
          { job_id: id },
          {
            headers: {
              Authorization: `Bearer ${access}`,
            },
          }
        );
        setIsLiked(true);
      }
    } catch (error) {
      console.error("Error handling like/unlike:", error);
    }
  };

  return (
    <div className="w-[384px] h-[342px] bg-white rounded p-3 flex flex-col gap-5">
      <div className="flex gap-3 ">
        <div className="w-[67px] h-[67px] flex">
          <img
            src={"http://127.0.0.1:8000" + logo}
            alt={name}
            className="object-cover content-center w-full"
          />
        </div>
        <div className="flex flex-col gap-2">
          <h6 className="font-medium">{name}</h6>
          <p className="text-sm text-mainColor">Apply Before: {expiryDate}</p>
        </div>
      </div>
      <div className="flex flex-col gap-1 text-xs">
        <h6 className="font-medium text-lg">{role}</h6>
        <p>
          Job Location: <span className="text-mainColor">{location}</span>
        </p>
        <p>
          Offered Salary: <span className="text-mainColor">{salary}</span>
        </p>
        <p>
          Job Level: <span className="text-mainColor">{jobLevel}</span>
        </p>
      </div>
      <div className="flex gap-4 text-sm">
        <div className="bg-lightBg px-4 py-2 flex gap-2 rounded items-center">
          <FaBriefcase />
          <span className="text-mainColor">{jobType}</span>
        </div>
        <div className="bg-lightBg px-4 py-2 flex gap-2 rounded items-center">
          <FaClock />
          <span className="text-mainColor">{shift}</span>
        </div>
      </div>
      <div className="w-full flex justify-between items-center">
        <Link to={`/job-details/${id}`}>
          <div className="bg-mainColor text-white px-3 py-2 rounded hover:bg-hoverColor">
            View Details
          </div>
        </Link>
        <button
          disabled={!isLoggedIn}
          className="bg-lightColor rounded p-3"
          onClick={handleLike}
        >
          {isLiked ? (
            <FaHeart className="text-mainColor" />
          ) : (
            <FaRegHeart className="text-mainColor" />
          )}
        </button>
      </div>
    </div>
  );
};

export default JobCard;
