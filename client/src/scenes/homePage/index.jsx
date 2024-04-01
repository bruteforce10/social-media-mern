import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "scenes/navbar";
import FriendsListWidget from "scenes/widgets/FriendsListWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import UserWidget from "scenes/widgets/UserWidget";
import { setPosts } from "state";

function HomePage() {
  const { _id, picturePath } = useSelector((state) => state.user);
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();

  const onShowMoreClick = async () => {
    const numberOfPosts = posts.length;
    const startIndex = numberOfPosts;
    const urlParams = new URLSearchParams();
    urlParams.set("startIndex", startIndex);
    const searchQuery = urlParams.toString();
    console.log(searchQuery);
    const response = await fetch(
      `${process.env.REACT_APP_SERVER}/posts?${searchQuery}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setPosts({ posts: [...posts, ...data] }));
  };

  return (
    <div className="pb-14">
      <Navbar />
      <div className="mt-4 grid grid-cols-4 gap-4 max-w-[1240px] max-sm:px-4 px-8 mx-auto  ">
        <UserWidget userId={_id} picturePath={picturePath} />
        <div className="col-span-2">
          <MyPostWidget picturePath={picturePath} />
          <PostsWidget userId={_id} />
          <div className="w-full flex flex-col items-center">
            <button
              onClick={onShowMoreClick}
              className=" mt-5  bg-primary w-32 transition-all py-2 hover:text-white rounded-full px-4 text-secondary hover:bg-secondary"
            >
              Load More
            </button>
          </div>
        </div>
        <div>
          <FriendsListWidget userId={_id} />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
