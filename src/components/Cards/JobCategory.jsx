import {
  FaBullhorn,
  FaConnectdevelop,
  FaDatabase,
  FaFigma,
  FaLaptopCode,
  FaLaravel,
  FaPen,
  FaWrench,
} from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
const icons = {
  data_analyst: <FaDatabase color="white" fill="#367768" />,
  graphics_designer: <FaPen color="white" fill="#367768" />,
  ui_ux_designer: <FaFigma color="white" fill="#367768" />,
  full_stack_developer: (
    <FaLaptopCode color="white" fill="#367768" className="w-10" />
  ),
  qa_engineer: <FaConnectdevelop color="white" fill="#367768" size="" />,
  digital_marketing: <FaBullhorn color="white" fill="#367768" />,
  software_engineer: <FaWrench color="white" fill="#367768" />,
  laravel_developer: <FaLaravel color="white" fill="#367768" />,
  designer: <FaPen color="white" fill="#367768" />,
};

const JobCategory = ({ name, totalJobs }) => {
  const navigate = useNavigate();
  const iconFromName = name.toLowerCase().replace(/\s+/g, "_");
  console.log(iconFromName);

  const toTitleCase = (str) =>
    str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  const handleClick = () => {
    navigate(`/jobs?title=${name}`);
  };
  return (
    <div
      onClick={handleClick}
      className="w-[290px] h-[84px] bg-white hover:bg-hoverColor shadow-boxShadow rounded-md hover:border border-mainColor flex items-start justify-start gap-5 p-4 cursor-pointer"
    >
      <div className="w-12 h-12 bg-lightBg rounded flex items-center justify-center">
        {icons[iconFromName]}
      </div>
      <div className="text-xs first:flex flex-col gap-3 py-1 font-medium">
        <h6 className="text-mainColor">{toTitleCase(name)}</h6>
        <p className="text-[11px]">
          <span>{totalJobs}</span> Jobs
        </p>
      </div>
    </div>
  );
};

export default JobCategory;
