import React from "react";
import { FaFacebook, FaInstagram } from "react-icons/fa6";
import { Link } from "react-router-dom";

const TeamMember = ({ pic, name, role, description, fb, ig }) => {
  return (
    <div className="md:w-[576px] md:h-[192px] bg-white rounded-xl px-5 py-3 flex gap-10 items-center justify-between">
      <div className="flex flex-col gap-4 text-xs">
        <div className="w-[70px] h-[70px] rounded-full overflow-hidden">
          <img
            src={pic}
            alt={name}
            className="w-full h-full object-cover content-center"
          />
        </div>
        <div>
          <h6 className="font-semibold text-center">{name}</h6>
          <p className="text-center text-[11px]">{role}</p>
        </div>
      </div>
      <div className="text-xs w-3/4 flex flex-col gap-5 flex-wrap">
        <p>{description}</p>
        <div className="flex gap-5">
          <Link to={ig} target="_blank">
            <div className="w-8 h-8 border border-black rounded-full flex justify-center items-center hover:bg-lightColor ">
              <FaInstagram className="m-2 text-sm" />
            </div>
          </Link>
          <Link to={fb} target="_blank">
            <div className="w-8 h-8 border border-black rounded-full flex justify-center items-center hover:bg-lightColor">
              <FaFacebook className="m-2 text-sm" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TeamMember;
