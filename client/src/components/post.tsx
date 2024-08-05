import { forwardRef, useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { RoofContext, RoofContextProps } from "../App";
import { SafaryContext } from "../pages/Safary";
import RyanDahl from "../config/RyanDahl";
import PostService from "../services/PostService";
import PostData from "../interface/post";
import { coloredIcons } from "../config/icons";
import BrendanEich from "../services/BrendanEich";

interface PostProps {
  postData: PostData;
}

const Post = forwardRef(({ postData }: PostProps, ref: any) => {
  const roof: RoofContextProps | null = useContext(RoofContext);
  const { theme, matches, themeIcons, colors } = roof!;
  const authData = roof!.authData!;

  const { setGlobalPost, setPostLikeList, setPostOption }: any =
    useContext(SafaryContext);

  const userImageSource = postData.image
    ? RyanDahl.URL_USER_MEDIA + postData.sender_uid + "/" + postData.image
    : themeIcons.nav_user;

  const mediaSource =
    RyanDahl.URL_POST_MEDIA + postData.sender_uid + "/" + postData.view1;

  const mediaType = BrendanEich.mimetypeByName(postData.view1);

  const [isLike, setIsLike] = useState(postData.liked);
  const [isSave, setIsSave] = useState(postData.saved);

  const inputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const navigate = useNavigate();

  const navigateUserProfile = () => {
    navigate(`/user/${postData.username}`);
  };

  const showGlobalPost = () => {
    setGlobalPost(postData);
  };

  const showPostLikeList = () => {
    setPostLikeList(postData.id);
  };

  const showPostOption = () => {
    setPostOption({
      postid: postData.id,
      sender: postData.sender_uid,
    });
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
    }
  };

  const likePost = async () => {
    try {
      await PostService.likePost(postData.id, authData.uid);
      setIsLike(!isLike);
    } catch (error) {
      console.log(error);
    }
  };

  const savePost = async () => {
    try {
      await PostService.savePost(postData.id, authData.uid);
      setIsSave(!isSave);
    } catch (error) {
      console.log(error);
    }
  };

  const commentPost = async (comment: string) => {
    try {
      await PostService.commentPost(postData.id, authData.uid, comment);
    } catch (error) {
      console.log(error);
    }
  };

  const responsive = {
    main: {
      marginTop: 10,
      marginBottom: 10,
      width: matches ? "97vw" : 500,
      borderBottom: "1px solid",
      borderColor: colors.border,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    } as React.CSSProperties,

    more: {
      marginLeft: "auto",
      marginRight: 10,
      color: colors.text,
      userSelect: "none",
      cursor: "pointer",
    } as React.CSSProperties,

    username: {
      color: theme ? "white" : "black",
      cursor: "pointer",
    } as React.CSSProperties,

    likes: {
      marginLeft: 12,
      marginBottom: 12,
      color: theme ? "white" : "black",
      wordBreak: "break-word",
      userSelect: "none",
      cursor: "pointer",
      fontSize: 15,
    } as React.CSSProperties,

    smile: {
      marginLeft: 10,
      width: 30,
      height: 30,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: theme ? "white" : "black",
      userSelect: "none",
      cursor: "pointer",
    } as React.CSSProperties,

    description: {
      marginLeft: 12,
      marginBottom: 12,
      color: theme ? "white" : "black",
      display: "flex",
      wordBreak: "break-word",
      fontSize: 15,
    } as React.CSSProperties,
  };

  const iconButtons = (
    <div style={{ display: "flex", height: 60, alignItems: "center" }}>
      <img
        onClick={likePost}
        style={styles.icon}
        src={isLike ? coloredIcons.post_heart : themeIcons.post_heart}
      />
      <img
        onClick={showGlobalPost}
        style={styles.icon}
        src={themeIcons.post_chat}
      />
      <img style={styles.icon} src={themeIcons.post_send} />
      <div style={{ flexGrow: 1 }} />
      <img
        onClick={savePost}
        style={styles.icon}
        src={isSave ? coloredIcons.post_save : themeIcons.post_save}
      />
    </div>
  );

  const likesCountElement = (
    <div
      onClick={showPostLikeList}
      style={responsive.likes}
    >{`${postData.likes_count} Likes`}</div>
  );

  const descriptionElement = (
    <div style={responsive.description}>
      <div onClick={navigateUserProfile} style={styles.usernameBottom}>
        {postData.username}
      </div>
      &nbsp;
      <div>{postData.description}</div>
    </div>
  );

  const commentsCountElement = (
    <div
      onClick={showGlobalPost}
      style={styles.comments}
    >{`${postData.comments_count} Comments`}</div>
  );

  return (
    <div ref={ref} style={responsive.main}>
      <div style={styles.top}>
        <div onClick={navigateUserProfile} style={styles.imageContainer}>
          <img
            style={postData.image ? styles.userImage : styles.emptyImage}
            src={userImageSource}
          />
        </div>
        <div onClick={navigateUserProfile} style={responsive.username}>
          {postData.username}
        </div>
        <span
          onClick={showPostOption}
          style={responsive.more}
          className="material-symbols-outlined"
        >
          more_horiz
        </span>
      </div>

      {mediaType === "video" ? (
        <video
          ref={videoRef}
          style={styles.postImage}
          onClick={() => toggleMute()}
          autoPlay={true}
          muted={true}
          loop={true}
        >
          <source src={mediaSource} />
        </video>
      ) : (
        <img style={styles.postImage} src={mediaSource} />
      )}

      <div style={styles.bottomRow}>
        {iconButtons}
        {likesCountElement}
        {postData.description && descriptionElement}
        {commentsCountElement}
      </div>

      <div style={styles.inputContainer}>
        <span style={responsive.smile} className="material-symbols-outlined">
          sentiment_satisfied
        </span>
        <input
          ref={inputRef}
          style={styles.input}
          type="text"
          placeholder="add comment..."
        />
        <div
          onClick={() => {
            if (inputRef.current) {
              const comment = inputRef.current.value;
              inputRef.current.value = "";
              commentPost(comment);
            }
          }}
          style={styles.send}
        >
          Share
        </div>
      </div>
    </div>
  );
});

export default Post;

const styles = {
  input: {
    fontSize: 15,
    paddingLeft: 10,
    paddingRight: 10,
    height: "100%",
    border: "none",
    outline: "none",
    backgroundColor: "transparent",
    width: "80%",
    color: "white",
  } as React.CSSProperties,

  icon: {
    margin: 10,
    width: 22,
    height: 22,
    cursor: "pointer",
    userSelect: "none",
  } as React.CSSProperties,

  top: {
    height: 65,
    width: "100%",
    display: "flex",
    alignItems: "center",
    userSelect: "none",
  } as React.CSSProperties,

  postImage: {
    minHeight: 350,
    maxHeight: 550,
    width: "100%",
    resize: "block",
    objectFit: "cover",
  } as React.CSSProperties,

  bottomRow: {
    width: "100%",
  } as React.CSSProperties,

  inputContainer: {
    height: 50,
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  } as React.CSSProperties,

  imageContainer: {
    marginRight: 10,
    marginLeft: 10,
    border: "1px solid",
    borderColor: "grey",
    borderRadius: 30,
    width: 40,
    height: 40,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  } as React.CSSProperties,

  userImage: {
    width: 40,
    height: 40,
    objectFit: "cover",
    borderRadius: "100%",
  } as React.CSSProperties,

  emptyImage: {
    width: 20,
    height: 20,
  } as React.CSSProperties,

  usernameBottom: {
    userSelect: "none",
    cursor: "pointer",
  } as React.CSSProperties,

  comments: {
    marginLeft: 12,
    marginBottom: 12,
    color: "grey",
    userSelect: "none",
    cursor: "pointer",
    fontSize: 15,
  } as React.CSSProperties,

  send: {
    marginRight: 10,
    color: "#3689b3",
    userSelect: "none",
    cursor: "pointer",
    fontSize: 15,
  } as React.CSSProperties,
};
