import UserImages from "components/UserImages";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RiUserSettingsLine } from "react-icons/ri";
import { MdOutlineEdit } from "react-icons/md";

const UserWidget = ({ userId, picturePath }) => {
  const [user, setUser] = useState(null);
  const token = useSelector((state) => state.token);

  const getUser = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_SERVER}/user/${userId}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    console.table(data);
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []);

  if (!user) {
    return null;
  }

  const { firstName, lastName, viewedProfile, impressions } = user;

  return (
    <div className="bg-white dark:bg-black px-4 py-8 rounded-xl divide-y space-y-4 flex flex-col h-fit">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <UserImages image={picturePath} />
          <p className="dark:text-white text-lg font-medium">
            {firstName + " " + lastName}
          </p>
        </div>
        <RiUserSettingsLine className="cursor-pointer dark:text-primary text-secondary text-xl" />
      </div>
      <div className="dark:text-white  pt-4 space-y-2">
        <div className="flex items-center justify-between">
          <p>Who's viewing this profile</p>
          <p className="text-lg font-medium">{viewedProfile}</p>
        </div>
        <div className="flex items-center justify-between">
          <p>Impressions of your post</p>
          <p className="text-lg font-medium">{impressions}</p>
        </div>
      </div>
      <div className="dark:text-white pt-4">
        <h3 className="text-lg font-medium mb-6">Social Profiles</h3>
        <div className="flex items-center justify-between mb-4">
          <div className="flex gap-4">
            <img
              src="./assets/twitter.png"
              alt="twitter"
              className="object-contain w-[30px]"
            />
            <div>
              <p className="text-lg font-medium">Twitter</p>
              <span className="text-sm font-light opacity-80">
                Social Network
              </span>
            </div>
          </div>
          <MdOutlineEdit className="cursor-pointer dark:text-primary text-secondary  text-xl" />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex gap-4">
            <img
              src="./assets/linkedin.png"
              alt="linkedin"
              className="object-contain w-[30px]"
            />
            <div>
              <p className="text-lg font-medium">LinkedIn</p>
              <span className="text-sm font-light opacity-80">
                Network Platform
              </span>
            </div>
          </div>
          <MdOutlineEdit className="cursor-pointer dark:text-primary text-secondary  text-xl" />
        </div>
      </div>
    </div>
  );
};

export default UserWidget;
