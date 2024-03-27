import React from "react";

const UserImages = ({ image, size }) => {
  return (
    <div style={{ width: size, height: size }}>
      <img
        src={`http://localhost:3001/assets/${image}`}
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
