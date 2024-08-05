import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RoofContext, RoofContextProps } from "../App";
import RyanDahl from "../config/RyanDahl";
import CommentService from "../services/CommentService";
import CommentData from "../interface/comment";
import { coloredIcons } from "../config/icons";

type CommentProps = {
  comment: CommentData;
};

function Comment({ comment }: CommentProps) {
  const navigate = useNavigate();

  const roof: RoofContextProps | null = useContext(RoofContext);
  const { theme, themeIcons, colors } = roof!;
  const authData = roof!.authData!;

  const [likeState, setLikeState] = useState(comment.liked);

  const likeComment = async () => {
    setLikeState(!likeState);
    CommentService.sendLike(comment.id, authData.uid);
  };

  const navigateUserProfile = () => {
    navigate(`/user/${comment.username}`);
  };

  const responsive = {
    username: {
      marginRight: 5,
      userSelect: "none",
      cursor: "pointer",
      color: colors.text,
    } as React.CSSProperties,

    comment: {
      color: colors.grey,
    } as React.CSSProperties,
  };

  return (
    <div style={styles.main}>
      <div style={styles.container}>
        <div style={styles.imageContainer}>
          <img
            onClick={navigateUserProfile}
            style={comment.image ? styles.userImage : styles.emptyImage}
            src={
              comment.image
                ? RyanDahl.URL_USER_MEDIA +
                  comment.sender_uid +
                  "/" +
                  comment.image
                : themeIcons.nav_user
            }
          />
        </div>

        <div style={styles.info}>
          <div style={styles.topinfo}>
            <div onClick={navigateUserProfile} style={responsive.username}>
              {comment.username}
            </div>
            <div style={responsive.comment}>{comment.text}</div>
          </div>
          <div style={styles.botinfo}>
            <div style={styles.space}>
              {comment.creation_date.substring(5, 10)}
            </div>
            {comment.likes_count > 0 && (
              <div style={styles.space}>{comment.likes_count} likes</div>
            )}
            {/* <div style={styles.reply}>Reply</div> */}
          </div>
        </div>
        <img
          onClick={() => likeComment()}
          style={styles.heart}
          src={likeState ? coloredIcons.post_heart : themeIcons.post_heart}
        />
      </div>
    </div>
  );
}

export default Comment;

const styles = {
  main: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  } as React.CSSProperties,

  container: {
    color: "white",
    fontSize: 20,
    display: "flex",
    alignItems: "center",
    width: "93%",
    height: 75,
  } as React.CSSProperties,

  imageContainer: {
    marginRight: 10,
    width: 40,
    height: 40,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid grey",
    borderRadius: "100%",
  } as React.CSSProperties,

  userImage: {
    width: 40,
    height: 40,
    objectFit: "cover",
    borderRadius: "100%",
    userSelect: "none",
    cursor: "pointer",
  } as React.CSSProperties,

  emptyImage: {
    width: 20,
    height: 20,
    userSelect: "none",
    cursor: "pointer",
  } as React.CSSProperties,

  info: {
    height: 40,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  } as React.CSSProperties,

  topinfo: {
    display: "flex",
    fontSize: 15,
  } as React.CSSProperties,

  botinfo: {
    display: "flex",
    fontSize: 13,
    color: "gray",
  } as React.CSSProperties,

  space: {
    marginRight: 5,
  } as React.CSSProperties,

  heart: {
    marginLeft: "auto",
    height: 13,
    width: 13,
    userSelect: "none",
    cursor: "pointer",
  } as React.CSSProperties,

  reply: { userSelect: "none", cursor: "pointer" } as React.CSSProperties,
};
