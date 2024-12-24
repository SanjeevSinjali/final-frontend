import React from "react";
import { LuStar } from "react-icons/lu";

const ReviewCard = ({ id, pic, name, role, reveiwMsg, rating }) => {
  return (
    <div
      className="bg-lightColor rounded-md flex flex-col items-start justify-center gap-4 p-4 w-full cursor-grab"
      key={id}
    >
      <div className="flex gap-4 items-center justify-center">
        <div className="flex items-center justify-center">
          <img
            src={pic}
            alt={name}
            className="w-14 h-14 object-cover rounded-full content-center"
          />
        </div>
        <div className="flex flex-col gap-1">
          <h6 className="text-2xl font-semibold">{name}</h6>
          <p className="text-sm">{role}</p>
        </div>
      </div>
      <div>
        <p className="text-xs">{reveiwMsg}</p>
      </div>
      <div className="flex gap-1">
        {[...Array(5)].map((_, index) => (
            <LuStar
              key={index}
              fill={index < rating ? "yellow" : "none"}
            />
          ))
        }
      </div>
    </div>
  );
};

export default ReviewCard;
