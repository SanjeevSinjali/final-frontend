import { ProfileSettingsForm } from "@/components";
import React from "react";

const UserProfile = () => {
  return (
    <div className="bg-lightBg">
      <div className="flex items-center justify-center my-28 mx-5">
        <ProfileSettingsForm />
      </div>
    </div>
  );
};

export default UserProfile;
