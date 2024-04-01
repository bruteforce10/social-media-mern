import UserImages from "components/UserImages";
import React, { useState } from "react";
import { MdOutlineImage } from "react-icons/md";
import { BsEmojiSmile } from "react-icons/bs";
import Dropzone from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import Picker from "emoji-picker-react";

const MyPostWidget = ({ picturePath }) => {
  const [image, setImage] = useState(null);
  const [isImage, setIsImage] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const dispatch = useDispatch();
  const [post, setPost] = useState("");
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);

  const handlePost = async () => {
    const formData = new FormData();
    formData.append("userId", _id);
    formData.append("description", post);
    if (image) {
      formData.append("picture", image?.picture);
      formData.append("picturePath", image?.picture?.name);
    }

    const response = await fetch(`${process.env.REACT_APP_SERVER}/posts`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    const posts = await response.json();
    dispatch(setPosts({ posts }));
    setImage(null);
    setPost("");
  };

  return (
    <div className="bg-white dark:bg-black px-4 py-4 rounded-xl space-y-4">
      <div className="flex gap-4 items-center">
        <div>
          {picturePath !== "undefined" ? (
            <UserImages image={picturePath} size={"50px"} />
          ) : (
            <img
              src="/assets/profile.png"
              alt="profile"
              className="w-[50px] rounded-full"
            />
          )}
        </div>
        <input
          type="text"
          value={post}
          onChange={(e) => setPost((prev) => (prev = e.target.value))}
          placeholder="What's on your mind..."
          className="bg-dimWhite w-full px-6 py-4 rounded-full dark:bg-slate-800 dark:text-white"
        />
      </div>
      {isImage && (
        <Dropzone
          acceptedFiles=".jpg,.jpeg,.png"
          multiple={false}
          onDrop={(acceptedFiles) => {
            const url = URL.createObjectURL(acceptedFiles[0]);
            setImage({
              picture: acceptedFiles[0],
              path: url,
            });
          }}
        >
          {({ getRootProps, getInputProps }) => (
            <div
              className="h-16 border-2 border-dashed border-secondary rounded-lg flex justify-center items-center"
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              {!image ? (
                <p>Add Image Here</p>
              ) : (
                <div className="flex gap-2 items-center">
                  <img
                    src={image?.path}
                    className="object-contain h-10"
                    alt="post"
                  />
                  <p>{image?.picture?.name}</p>
                </div>
              )}
            </div>
          )}
        </Dropzone>
      )}
      <div className="w-full h-[.5px] opacity-20 bg-black"></div>
      <div className="flex items-start pt-1 gap-4">
        <div
          className="flex items-center gap-1 cursor-pointer hover:scale-90 transition-all"
          onClick={() => setIsImage(!isImage)}
        >
          <MdOutlineImage className="text-2xl  dark:text-primary" />
          <p className="dark:text-white">Photo</p>
        </div>
        <div
          onClick={() => setShowPicker(!showPicker)}
          className="flex items-center gap-1 cursor-pointer hover:scale-90 transition-all"
        >
          <BsEmojiSmile className="text-xl  dark:text-primary" />
          <p className="dark:text-white">Emoji</p>
        </div>

        <div className="w-full  grid">
          <button
            type="submit"
            onClick={handlePost}
            className="bg-primary transition-all py-2 ml-auto hover:bg-secondary hover:text-white rounded-full px-4 text-secondary"
          >
            Post
          </button>
        </div>
      </div>
      {showPicker && (
        <Picker
          style={{ position: "absolute", bottom: "0px" }}
          onEmojiClick={(emoji) => setPost((prev) => (prev += emoji.emoji))}
        />
      )}
    </div>
  );
};

export default MyPostWidget;
