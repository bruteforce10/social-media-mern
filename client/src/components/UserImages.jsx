import React from "react";

const UserImages = ({ image, size = "50px" }) => {
  return (
    <div style={{ width: size, height: size }}>
      <img
        src={`${process.env.REACT_APP_SERVER}/assets/${image}`}
        alt="user"
        style={{
          objectFit: "cover",
          width: "100%",
          height: "100%",
          borderRadius: "50%",
        }}
      />
    </div>
  );
};

export default UserImages;
