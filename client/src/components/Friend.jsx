import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import UserImages from "./UserImages";
import { BsFillPersonPlusFill, BsFillPersonDashFill } from "react-icons/bs";
import { setFriends } from "state";

const Friend = ({ friendId, name, userPicturePath }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);
  const isFriend = friends.find((friend) => friend._id === friendId);
  const isMe = Boolean(_id === friendId);
  const isPicture = Boolean(userPicturePath === "undefined");

  console.log(isPicture);

  const patchFriend = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_SERVER}/user/${_id}/${friendId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  };

  return (
    <div className="flex justify-between items-center">
      <div
        className="flex items-center gap-2 cursor-pointer hover:underline"
        onClick={() => navigate(`/profile/${friendId}`)}
      >
        {isPicture ? (
          <img
            src="/assets/profile.png"
            alt="profile"
            className="w-[50px] rounded-full"
          />
        ) : (
          <UserImages image={userPicturePath} size="50px" />
        )}

        <p>{name}</p>
      </div>
      <div onClick={() => patchFriend()}>
        {isFriend ? (
          <button>
            <BsFillPersonDashFill className="text-xl text-primary" />
          </button>
        ) : (
          !isMe && (
            <button>
              <BsFillPersonPlusFill className="text-xl text-primary" />
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default Friend;
