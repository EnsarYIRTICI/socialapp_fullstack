import { useNavigate } from "react-router-dom";
import RyanDahl from "../config/RyanDahl";
import { useContext } from "react";
import { RoofContextProps, RoofContext } from "../App";

function User({ follow }: any) {
  const roof: RoofContextProps | null = useContext(RoofContext);
  const { theme, matches, colors, themeIcons } = roof!;

  const navigate = useNavigate();
  const navigateUserProfile = () => navigate(`/user/${follow.username}`);

  return (
    <div
      onClick={navigateUserProfile}
      style={styles.main}
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
            style={follow.image ? styles.userImage : styles.emptyImage}
            src={
              follow.image
                ? RyanDahl.URL_USER_MEDIA + follow.uid + "/" + follow.image
                : themeIcons.nav_user
            }
          />
        </div>

        <div style={styles.infoContainer}>
          <div style={styles.username}>{follow.username}</div>
          <div style={styles.displayname}>{follow.displayname}</div>
        </div>
      </div>
    </div>
  );
}

export default User;

const styles = {
  main: {
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
};
