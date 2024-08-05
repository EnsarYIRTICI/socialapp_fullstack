import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { RoofContextProps, RoofContext } from "../App";
import RyanDahl from "../config/RyanDahl";

function User({ like }: any) {
  const roof: RoofContextProps | null = useContext(RoofContext);
  const { theme, matches, colors, themeIcons } = roof!;

  const navigate = useNavigate();
  const navigateUserProfile = () => navigate(`/user/${like.username}`);

  return (
    <div
      onClick={navigateUserProfile}
      style={styles.userMain}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "transparent";
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = colors.room;
      }}
    >
      <div style={styles.userContainer}>
        <div style={styles.imageContainer}>
          <img
            style={like.image ? styles.userImage : styles.emptyImage}
            src={
              like.image
                ? RyanDahl.URL_USER_MEDIA + like.uid + "/" + like.image
                : "/128x128/passive/user.png"
            }
          />
        </div>
        <div style={styles.infoContainer}>
          <div style={styles.username}>{like.username}</div>
          <div style={styles.displayname}>{like.displayname}</div>
        </div>
      </div>
    </div>
  );
}

export default User;

const styles = {
  userMain: {
    width: "100%",
    height: 65,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  } as React.CSSProperties,

  userContainer: {
    width: "90%",
    display: "flex",
    alignItems: "center",
    userSelect: "none",
    cursor: "pointer",
  } as React.CSSProperties,

  infoContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  } as React.CSSProperties,

  username: {
    margin: 2,
  } as React.CSSProperties,

  displayname: {
    margin: 2,
    fontSize: 13,
  } as React.CSSProperties,

  imageContainer: {
    marginRight: 5,
    height: 40,
    width: 40,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid grey",
    borderRadius: "100%",
  } as React.CSSProperties,

  userImage: {
    borderRadius: "100%",
    width: 40,
    height: 40,
    objectFit: "cover",
  } as React.CSSProperties,

  emptyImage: {
    width: 20,
    height: 20,
  } as React.CSSProperties,

  list: {
    width: 350,
    height: 425,
    overflowY: "scroll",
  } as React.CSSProperties,

  crossHide: {
    margin: 15,
    fontSize: 25,
    userSelect: "none",
    color: "transparent",
  } as React.CSSProperties,
};
