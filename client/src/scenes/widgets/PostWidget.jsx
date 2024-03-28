import Friend from "components/Friend";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BiCommentDetail } from "react-icons/bi";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { LuShare2 } from "react-icons/lu";
import { setPost } from "state";

const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  picturePath,
  userPicturePath,
  likes,
  comments,
}) => {
  const [isComments, setComments] = useState(false);
  const dispatch = useDispatch();
  const loggedInUserId = useSelector((state) => state.user._id);
  const token = useSelector((state) => state.token);
  const [isLiked, setLiked] = useState(likes[loggedInUserId]);
  const [likeCount, setLikeCount] = useState(Object.keys(likes).length);

  const patchLike = async () => {
    const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const updatedPost = await response.json();
    setLiked(updatedPost.likes[loggedInUserId]);
    setLikeCount(Object.keys(updatedPost.likes).length);
    dispatch(setPost({ post: updatedPost }));
  };

  return (
    <div className="bg-white dark:bg-black dark:text-white my-6 p-4 rounded-xl space-y-4">
      <Friend
        friendId={postUserId}
        name={name}
        userPicturePath={userPicturePath}
      />
      <p>{description}</p>
      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`http://localhost:3001/assets/${picturePath}`}
        />
      )}
      <div className="flex gap-4">
        <div className="flex gap-1 items-center" onClick={patchLike}>
          {isLiked ? (
            <AiFillHeart className="text-red-500 text-xl cursor-pointer" />
          ) : (
            <AiOutlineHeart className="text-2xl cursor-pointer" />
          )}
          <p>{likeCount}</p>
        </div>
        <div
          className="flex gap-1 items-center"
          onClick={() => setComments(!isComments)}
        >
          <BiCommentDetail className="text-2xl cursor-pointer" />
          <p>{comments.length}</p>
        </div>
        <div className="w-full">
          <LuShare2 className="text-2xl cursor-pointer ml-auto" />
        </div>
      </div>
      {isComments &&
        comments.map((comment, index) => (
          <div key={index} className="group">
            <p>{comment}</p>
            <div className="w-full h-[.5px] opacity-20 group-last:hidden bg-black"></div>
          </div>
        ))}
    </div>
  );
};

export default PostWidget;
