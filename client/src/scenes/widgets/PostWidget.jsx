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
  const [createComment, setCreateComment] = useState("");

  const patchLike = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_SERVER}/posts/${postId}/like`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: loggedInUserId }),
      }
    );
    const updatedPost = await response.json();
    setLiked(updatedPost.likes[loggedInUserId]);
    setLikeCount(Object.keys(updatedPost.likes).length);
    dispatch(setPost({ post: updatedPost }));
  };

  const handleComment = async (e) => {
    e.preventDefault();
    const response = await fetch(
      `${process.env.REACT_APP_SERVER}/posts/comment`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: loggedInUserId,
          id: postId,
          comment: createComment,
        }),
      }
    );
    const updatedPost = await response.json();
    setCreateComment("");
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
          src={`${process.env.REACT_APP_SERVER}/assets/${picturePath}`}
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
      <form onSubmit={handleComment} className="space-y-4">
        {isComments &&
          comments.map((comment, index) => (
            <div key={index} className="group">
              <p>{comment}</p>
              <div className="w-full h-[.5px] opacity-20 group-last:hidden bg-black"></div>
            </div>
          ))}
        {isComments && (
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Add a comment..."
              value={createComment}
              onChange={(e) =>
                setCreateComment((prev) => (prev = e.target.value))
              }
              className="bg-dimWhite w-full px-6 py-2 rounded-full dark:bg-slate-800 dark:text-white"
            />
            <button
              type="submit"
              className="bg-primary transition-all py-2 ml-auto hover:bg-secondary hover:text-white rounded-full px-4 text-secondary"
            >
              Comment
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default PostWidget;
