import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SafaryContext } from "../pages/Safary";
import RyanDahl from "../config/RyanDahl";
import PostService from "../services/PostService";
import { RoofContextProps, RoofContext } from "../App";
import User from "../components/LikeListUser";

function LikeList({}: any) {
  const roof: RoofContextProps | null = useContext(RoofContext);
  const { theme, matches, colors, themeIcons } = roof!;

  const [likeList, setLikeList] = useState([]);

  const { postLikeList, setPostLikeList }: any = useContext(SafaryContext);

  const likeListSetup = async () => {
    try {
      const jsonData = await PostService.fetchLikes(10, 0, postLikeList);
      setLikeList(jsonData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    likeListSetup();
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
        <div>Likes</div>
        <span
          onClick={() => setPostLikeList(null)}
          style={responsive.cross}
          className="material-symbols-outlined"
        >
          close
        </span>
      </div>
      <div className="hidebar" style={styles.list}>
        {likeList.map((like: any) => (
          <User key={like.postlike} like={like} />
        ))}
      </div>
    </div>
  );
}

export default LikeList;

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
