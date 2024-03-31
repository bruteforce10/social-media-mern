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

  console.log(isFriend);

  const patchFriend = async () => {
    const response = await fetch(
      `http://localhost:3001/user/${_id}/${friendId}`,
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
        <UserImages image={userPicturePath} size="50px" />
        <p>{name}</p>
      </div>
      <div onClick={() => patchFriend()}>
        {isFriend ? (
          <button>
            <BsFillPersonDashFill className="text-xl text-primary" />
          </button>
        ) : (
          <button>
            <BsFillPersonPlusFill className="text-xl text-primary" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Friend;
