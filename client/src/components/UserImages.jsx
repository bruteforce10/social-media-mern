import React from "react";

const UserImages = ({ image, size = "60px" }) => {
  return (
    <div className={`w-[${size}] h-[${size}]`}>
      <img
        src={`http://localhost:3001/assets/${image}`}
        alt="user"
        className=" object-cover rounded-full"
      />
    </div>
  );
};

export default UserImages;
