import React from "react";
import { useSelector } from "react-redux";
import Navbar from "scenes/navbar";
import FriendsListWidget from "scenes/widgets/FriendsListWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import UserWidget from "scenes/widgets/UserWidget";

function HomePage() {
  const { _id, picturePath } = useSelector((state) => state.user);

  return (
    <div className="pb-14">
      <Navbar />
      <div className="mt-4 grid grid-cols-4 gap-4 max-w-[1240px] max-sm:px-4 px-8 mx-auto ">
        <UserWidget userId={_id} picturePath={picturePath} />
        <div className="col-span-2">
          <MyPostWidget picturePath={picturePath} />
          <PostsWidget userId={_id} />
        </div>
        <div>
          <FriendsListWidget userId={_id} />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
