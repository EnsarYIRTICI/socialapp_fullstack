import { useContext, useEffect, useState } from "react";
import UserService from "../services/UserService";
import User from "../components/FollowUser";
import { RoofContextProps, RoofContext } from "../App";

function Follow({ dialog, setDialog, userView }: any) {
  const roof: RoofContextProps | null = useContext(RoofContext);
  const { theme, matches, colors, themeIcons } = roof!;

  const [followList, setFollowList] = useState([]);

  const followSetup = async (uid: string, type: string) => {
    try {
      const jsonData = await UserService.followList(uid, type);
      setFollowList(jsonData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    followSetup(userView.uid, dialog);
  }, []);

  const responsive = {
    main: {
      backgroundColor: theme ? "#282c34" : "white",
      borderRadius: 10,
      color: colors.text,
    } as React.CSSProperties,

    top: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      width: 350,
      height: 55,
      borderBottom: "1px solid",
      borderColor: colors.border,
    } as React.CSSProperties,

    cross: {
      margin: 15,
      fontSize: 25,
      color: colors.text,
      userSelect: "none",
      cursor: "pointer",
    } as React.CSSProperties,
  };

  return (
    <div style={responsive.main}>
      <div style={responsive.top}>
        <span style={styles.crossHide} className="material-symbols-outlined">
          close
        </span>
        <div>{dialog}</div>
        <span
          onClick={() => setDialog("None")}
          style={responsive.cross}
          className="material-symbols-outlined"
        >
          close
        </span>
      </div>
      <div className="hidebar" style={styles.list}>
        {followList.map((follow: any) => (
          <User key={follow.followed_uid} follow={follow} />
        ))}
      </div>
    </div>
  );
}

export default Follow;

const styles = {
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
