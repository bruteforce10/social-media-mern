import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "scenes/navbar";
import UserWidget from "scenes/widgets/UserWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";

function ProfilePage() {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
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

  return (
    <div className="pb-14 min-h-screen">
      <Navbar />
      <div className="mt-4 grid grid-cols-3 max-md:grid-cols-1 gap-4 max-w-[1240px] max-sm:px-4 px-8 mx-auto ">
        <UserWidget userId={userId} picturePath={user?.picturePath} />
        <div className="col-span-2">
          <MyPostWidget picturePath={user?.picturePath} />
          <PostsWidget userId={userId} isProfile />
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
