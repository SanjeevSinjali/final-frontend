import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

const PopularJob = ({ id, logo, companyName, role }) => {
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <div className="w-[290px] h-[188px] bg-white rounded-md shadow-boxShadow flex flex-col p-3 justify-between hover:bg-highlight">
      <div className="flex flex-col text-xs gap-1">
        <div className="w-[70px] border flex">
          <img
            src={(isLoggedIn ? "" : "http://localhost:8000") + logo}
            alt={companyName}
            className="w-full content-center object-cover"
          />
        </div>
        <p className="font-medium">{companyName}</p>
        <p>{role}</p>
      </div>
      <p className="underline cursor-pointer text-sm font-semibold">
        <Link to={`/job-details/${id}`}>View Details</Link>
      </p>
    </div>
  );
};

export default PopularJob;
