import Friend from "components/Friend";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

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
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;

  return (
    <div>
      <Friend
        friendId={postUserId}
        name={name}
        userPicturePath={userPicturePath}
      />
    </div>
  );
};

export default PostWidget;
