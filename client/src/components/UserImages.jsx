import React from "react";

const UserImages = ({ image }) => {
  return (
    <div className={`w-14`}>
      <img
        src={`http://localhost:3001/assets/${image}`}
        alt="user"
        className={`object-cover rounded-full `}
      />
    </div>
  );
};

export default UserImages;
