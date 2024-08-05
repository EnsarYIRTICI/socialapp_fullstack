import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { SafaryContext } from "../pages/Safary";
import RyanDahl from "../config/RyanDahl";
import UserData from "../interface/user";
import { RoofContext, RoofContextProps } from "../App";

type PreUserProps = {
  userData: UserData;
};

function PreUser({ userData }: PreUserProps) {
  const roof: RoofContextProps | null = useContext(RoofContext);
  const { themeIcons, colors } = roof!;

  const navigate = useNavigate();

  const { setDrawer }: any = useContext(SafaryContext);

  const responsive = {
    infoContainer: {
      marginLeft: 10,
      color: colors.text,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    } as React.CSSProperties,
  };

  return (
    <div
      onClick={() => {
        setDrawer("none");
        navigate(`/user/${userData.username}`);
      }}
      style={styles.userContainer}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = "#383d47";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "transparent";
      }}
    >
      <div style={styles.user}>
        <div style={styles.imageContainer}>
          <img
            style={userData.image ? styles.userImage : styles.emptyImage}
            src={
              userData.image
                ? RyanDahl.URL_USER_MEDIA + userData.uid + "/" + userData.image
                : themeIcons.nav_user
            }
          />
        </div>

        <div style={responsive.infoContainer}>{userData.username}</div>
      </div>
    </div>
  );
}

export default PreUser;

const styles = {
  inputContainer: {
    backgroundColor: "#545d6e",
    height: 55,
    width: "90%",
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderRadius: 15,
  } as React.CSSProperties,

  userContainer: {
    height: 85,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    userSelect: "none",
    cursor: "pointer",
    textDecoration: "none",
  } as React.CSSProperties,

  user: {
    width: "90%",
    display: "flex",
    alignItems: "center",
  } as React.CSSProperties,

  emptyImage: {
    height: 25,
    width: 25,
  } as React.CSSProperties,

  userImage: {
    height: 55,
    width: 55,
    borderRadius: "100%",
    objectFit: "cover",
  } as React.CSSProperties,

  imageContainer: {
    width: 55,
    height: 55,
    border: "1px solid",
    borderColor: "grey",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 35,
  } as React.CSSProperties,

  warn: {
    width: "100%",
    color: "white",
    height: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 20,
  } as React.CSSProperties,
};
