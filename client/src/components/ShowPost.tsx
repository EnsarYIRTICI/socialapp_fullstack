import { useContext, useEffect, useRef, useState } from "react";
import { RoofContext, RoofContextProps } from "../App";
import { useNavigate } from "react-router-dom";
import { SafaryContext } from "../pages/Safary";
import Comment from "../components/comment";
import RyanDahl from "../config/RyanDahl";
import PostService from "../services/PostService";
import PostData from "../interface/post";
import CommentData from "../interface/comment";
import { coloredIcons } from "../config/icons";
import BrendanEich from "../services/BrendanEich";

function ShowPost() {
  const roof: RoofContextProps | null = useContext(RoofContext);
  const { theme, matches, themeIcons, colors } = roof!;
  const authData = roof!.authData!;

  const { globalPost, setGlobalPost, setPostLikeList, setPostOption }: any =
    useContext(SafaryContext);

  const postData: PostData = globalPost;

  const userImageSource = postData.image
    ? RyanDahl.URL_USER_MEDIA + postData.sender_uid + "/" + postData.image
    : themeIcons.nav_user;

  const mediaSource =
    RyanDahl.URL_POST_MEDIA + postData.sender_uid + "/" + postData.view1;

  const mediaType = BrendanEich.mimetypeByName(postData.view1);

  const [commentList, setCommentList] = useState([]);
  const [isLike, setIsLike] = useState(postData.liked);
  const [isSave, setIsSave] = useState(postData.saved);

  const inputRef: any = useRef(null);

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

  const commentPost = async (text: string) => {
    inputRef.current.value = "";
    try {
      await PostService.commentPost(postData.id, authData.uid, text);
      await commentSetup();
    } catch (error) {
      console.log(error);
    }
  };

  const commentSetup = async () => {
    try {
      const jsonData = await PostService.fetchComments(
        10,
        0,
        postData.id,
        authData.uid
      );
      setCommentList(jsonData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    commentSetup();
  }, []);

  const responsive = {
    main: {
      display: "flex",
      alignItems: matches && "center",
      flexDirection: matches && "column",
      backgroundColor: colors.background,
    } as React.CSSProperties,

    post: {
      width: matches ? "95vw" : 500,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    } as React.CSSProperties,

    input: {
      fontSize: 15,
      paddingLeft: 10,
      paddingRight: 10,
      height: "100%",
      border: "none",
      outline: "none",
      backgroundColor: "transparent",
      width: matches ? "65vw" : "80%",
      color: "white",
    } as React.CSSProperties,

    postImage: {
      maxHeight: matches ? 350 : 750,
      width: "100%",
      resize: "block",
      objectFit: "contain",
    } as React.CSSProperties,

    postImageContainer: {
      minHeight: matches ? null : 600,
      maxWidth: 850,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    } as React.CSSProperties,

    top: {
      height: 65,
      width: "100%",
      display: "flex",
      alignItems: "center",
      borderBottom: "1px solid",
      borderColor: matches ? "transparent" : colors.border,
      userSelect: "none",
    } as React.CSSProperties,

    bottom: {
      width: "100%",
      borderTop: "1px solid",
      borderBottom: "1px solid",
      borderColor: matches ? "transparent" : colors.border,
    } as React.CSSProperties,

    comments: {
      marginLeft: 12,
      marginBottom: 12,
      color: "grey",
      userSelect: "none",
      cursor: "pointer",
      fontSize: 15,
      display: matches ? "block" : "none",
    } as React.CSSProperties,

    description: {
      marginLeft: 12,
      marginBottom: 12,
      color: colors.text,
      display: "flex",
      wordBreak: "break-word",
      fontSize: 15,
    } as React.CSSProperties,

    likes: {
      marginLeft: 12,
      marginBottom: 12,
      color: colors.text,
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
      color: colors.text,
      userSelect: "none",
      cursor: "pointer",
    } as React.CSSProperties,

    username: {
      color: colors.text,
      cursor: "pointer",
    } as React.CSSProperties,
  };

  const top = (
    <div style={responsive.top}>
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
        onClick={() =>
          setPostOption({
            postid: postData.id,
            sender: postData.sender_uid,
          })
        }
        style={styles.more}
        className="material-symbols-outlined"
      >
        more_horiz
      </span>
    </div>
  );

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

  const commentInput = (
    <div style={styles.inputContainer}>
      <span style={responsive.smile} className="material-symbols-outlined">
        sentiment_satisfied
      </span>
      <input
        ref={inputRef}
        style={responsive.input}
        type="text"
        placeholder="add comment..."
      />
      <div
        onClick={() => commentPost(inputRef.current.value)}
        style={styles.share}
      >
        Share
      </div>
    </div>
  );

  const sendate = (
    <div style={styles.sendate}>{postData.creation_date.substring(0, 10)}</div>
  );

  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
    }
  };

  return (
    <div style={responsive.main}>
      {matches && top}

      <div style={responsive.postImageContainer}>
        {mediaType === "video" ? (
          <video
            ref={videoRef}
            onClick={() => toggleMute()}
            style={responsive.postImage}
            autoPlay={true}
            controls={true}
            loop={true}
          >
            <source src={mediaSource} />
          </video>
        ) : (
          <img style={responsive.postImage} src={mediaSource} />
        )}
      </div>

      <div style={responsive.post}>
        {matches ? null : top}

        {matches ? null : commentList.length == 0 ? (
          <div style={styles.warn}>
            <div
              style={{
                fontSize: 20,
              }}
            >
              No comments yet
            </div>
            <div
              style={{
                margin: 5,
                fontSize: 15,
                color: "grey",
              }}
            >
              Start the conversation
            </div>
          </div>
        ) : (
          <div className="hidebar" style={styles.commentList}>
            {commentList.map((comment: CommentData) => (
              <Comment key={comment.id} comment={comment} />
            ))}
          </div>
        )}

        <div style={responsive.bottom}>
          {iconButtons}
          {likesCountElement}
          {postData.description && descriptionElement}
          {commentsCountElement}
          {sendate}
        </div>

        {commentInput}

        {matches && (
          <div style={styles.crossContainer}>
            <div onClick={() => setGlobalPost(null)} style={styles.cross}>
              <span className="material-symbols-outlined">close</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ShowPost;

const styles = {
  commentList: {
    width: "100%",
    overflowY: "scroll",
    flex: 1,
  } as React.CSSProperties,

  usernameBottom: {
    userSelect: "none",
    cursor: "pointer",
  } as React.CSSProperties,

  warn: {
    width: "100%",
    color: "white",
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  } as React.CSSProperties,

  comments: {
    marginLeft: 12,
    marginBottom: 12,
    color: "grey",
    userSelect: "none",
    cursor: "pointer",
    fontSize: 15,
  } as React.CSSProperties,

  sendate: {
    marginLeft: 12,
    marginBottom: 12,
    color: "grey",
    fontSize: 13,
  } as React.CSSProperties,

  icon: {
    margin: 10,
    width: 22,
    height: 22,
    cursor: "pointer",
    userSelect: "none",
  } as React.CSSProperties,

  more: {
    marginLeft: "auto",
    marginRight: 10,
    color: "white",
    userSelect: "none",
    cursor: "pointer",
  } as React.CSSProperties,

  inputContainer: {
    height: 55,
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  } as React.CSSProperties,

  imageContainer: {
    marginRight: 10,
    marginLeft: 10,
    width: 40,
    height: 40,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    border: "1px solid grey",
    borderRadius: "100%",
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

  share: {
    marginRight: 10,
    color: "#3689b3",
    userSelect: "none",
    cursor: "pointer",
  } as React.CSSProperties,

  likes: {
    marginLeft: 12,
    marginBottom: 12,
    color: "white",
    wordBreak: "break-word",
    userSelect: "none",
    cursor: "pointer",
    fontSize: 15,
  } as React.CSSProperties,

  description: {
    marginLeft: 12,
    marginBottom: 12,
    color: "white",
    display: "flex",
    wordBreak: "break-word",
    userSelect: "none",
    cursor: "pointer",
    fontSize: 15,
  } as React.CSSProperties,

  crossContainer: {
    height: 75,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  } as React.CSSProperties,

  cross: {
    width: 35,
    height: 35,
    cursor: "pointer",
    color: "#3689b3",
    border: "1px solid",
    borderColor: "#3689b3",
    borderRadius: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  } as React.CSSProperties,
};
