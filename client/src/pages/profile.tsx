import { useContext, useEffect, useRef, useState } from "react";
import { RoofContext, RoofContextProps } from "../App";
import { useNavigate } from "react-router-dom";
import PrePost from "../components/prepost";
import Dialog from "../components/Dialog";
import Settings from "../components/settings";
import Edit from "../components/edit";
import Follow from "../components/followList";
import { SafaryContext } from "../pages/Safary";
import RyanDahl from "../config/RyanDahl";
import UserService from "../services/UserService";
import PostData from "../interface/post";
import About from "../components/about";
import ShowPhoto from "../components/photo";
import { coloredIcons } from "../config/icons";

function Profile({ profile }: any) {
  const roof: RoofContextProps | null = useContext(RoofContext);
  const { theme, matches, colors, themeIcons, activeThemeIcons } = roof!;
  const authData = roof!.authData!;

  const { setID_F, setCreateStory }: any = useContext(SafaryContext);

  const userData = profile.userView;
  const followState = profile.followState;
  const postList = profile.postList;
  const saveList = profile.saveList;

  const isMyProfile = userData.uid === authData.uid ? true : false;

  const postsCount = userData.posts_count;
  const followersCount = userData.followers_count;
  const followCount = userData.follows_count;

  const [isFollow, setIsFollow] = useState(followState);
  const [dialog, setDialog] = useState("None");
  const [menu, setMenu] = useState("Posts");

  const navigate = useNavigate();

  const navigateRoom = () => {
    setID_F(userData.fid);
    navigate(`/inbox/room`);
  };

  const followUser = async () => {
    try {
      UserService.followUser(authData.uid, userData.uid);
      setIsFollow(!isFollow);
    } catch (error) {
      console.log(error);
    }
  };

  const responsive = {
    main: {
      overflowY: "scroll",
      flex: 1,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginBottom: matches ? 90 : 0,
    } as React.CSSProperties,

    profil: {
      maxWidth: 800,
      height: matches ? 100 : 300,
      width: matches ? "90vw" : "60vw",
      display: "flex",
      color: colors.text,
      alignItems: "center",
      justifyContent: "space-between",
    } as React.CSSProperties,

    posts: {
      width: matches ? "100vw" : 750,
      display: "flex",
      flexWrap: "wrap",
    } as React.CSSProperties,

    infoContainer: {
      maxWidth: 500,
      height: matches ? 100 : 300,
      width: matches ? "65vw" : "30vw",
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
    } as React.CSSProperties,

    buttonRow: {
      minHeight: 85,
      width: matches ? "80vw" : "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    } as React.CSSProperties,

    imageContainer: {
      maxWidth: 300,
      height: matches ? 75 : 175,
      width: matches ? 75 : 175,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      border: "1px solid white",
      borderRadius: 150,
      cursor: "pointer",
      position: "relative",
    } as React.CSSProperties,

    emptyImage: {
      height: matches ? 35 : 75,
      width: matches ? 35 : 75,
    } as React.CSSProperties,

    userImage: {
      height: matches ? 75 : 175,
      width: matches ? 75 : 175,
      borderRadius: "100%",
      objectFit: "cover",
    } as React.CSSProperties,

    setting: {
      width: matches ? 25 : 30,
      height: matches ? 25 : 30,
      display: "flex",
      justifyContent: "center",
      color: "white",
      userSelect: "none",
      cursor: "pointer",
    } as React.CSSProperties,

    username: {
      fontSize: matches ? 22 : 25,
      userSelect: "none",
      cursor: "pointer",
      color: colors.text,
      display: "flex",
      alignItems: "center",
    } as React.CSSProperties,

    displayname: {
      height: 50,
      fontSize: matches ? 15 : 17,
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    } as React.CSSProperties,

    biography: {
      fontSize: matches ? 13 : 15,
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      wordBreak: "break-word",
    } as React.CSSProperties,

    follow: {
      width: 135,
      height: 35,
      backgroundColor: isFollow ? "#dbdbdb" : colors.blue,
      color: isFollow ? "black" : colors.text,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 5,
      userSelect: "none",
      cursor: "pointer",
      fontFamily: "Open Sans, sans-serif",
      fontSize: 13,
    } as React.CSSProperties,

    sendmessage: {
      width: 135,
      height: 35,
      backgroundColor: "#dbdbdb",
      color: "black",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 5,
      userSelect: "none",
      cursor: "pointer",
      textDecoration: "none",
      fontFamily: "Open Sans, sans-serif",
      fontSize: 13,
    } as React.CSSProperties,

    edit: {
      color: "white",
      width: 135,
      height: 35,
      backgroundColor: colors.react,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 5,
      userSelect: "none",
      cursor: "pointer",
      fontFamily: "Open Sans, sans-serif",
      fontSize: 13,
    } as React.CSSProperties,

    menuContainer: {
      borderTop: "1px solid",
      borderColor: colors.border,
      minHeight: 75,
      width: matches ? "100vw" : 750,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-evenly",
    } as React.CSSProperties,

    postsMenuButton: {
      margin: 20,
      color: menu === "Posts" ? colors.text : "grey",
      userSelect: "none",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
    } as React.CSSProperties,

    savesMenuButton: {
      margin: 20,
      color: menu === "Saves" ? colors.text : "grey",
      userSelect: "none",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
    } as React.CSSProperties,

    addButton: {
      position: "absolute",
      right: matches ? 0 : 10,
      bottom: matches ? 0 : 10,
      width: matches ? 20 : 30,
      height: matches ? 20 : 30,
    } as React.CSSProperties,
  };

  const followButton = (
    <div
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = isFollow
          ? "#dbdbdb"
          : colors.blue_ios;
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = isFollow
          ? "white"
          : colors.blue_ios_dark;
      }}
      onClick={() => followUser()}
      style={responsive.follow}
    >
      {isFollow ? "Unfollow" : "Follow"}
    </div>
  );

  const sendButton = (
    <div
      onClick={() => navigateRoom()}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = "white";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "#dbdbdb";
      }}
      style={responsive.sendmessage}
    >
      Send Message
    </div>
  );

  const settingsButton = (
    <img
      onClick={() => setDialog("Setting")}
      style={responsive.setting}
      src={themeIcons.settings}
    />
  );

  const editButton = (
    <div
      onClick={() => setDialog("Edit")}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = colors.react;
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = colors.react_100;
      }}
      style={responsive.edit}
    >
      Edit Profile
    </div>
  );

  const shareButton = (
    <div
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = colors.react;
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = colors.react_100;
      }}
      style={responsive.edit}
    >
      Share Profil
    </div>
  );

  const displaynameElement = (
    <div style={responsive.displayname}>{userData.displayname}</div>
  );

  const biographyElement = (
    <div style={responsive.biography}>{userData.biography}</div>
  );

  const usernameElement = (
    <div style={responsive.username}>
      {userData.username}
      <span className="material-symbols-outlined">expand_more</span>
    </div>
  );

  return (
    <div className="hidebar" style={responsive.main}>
      {matches && (
        <div style={styles.top}>
          {usernameElement}
          {isMyProfile && settingsButton}
        </div>
      )}

      <div style={responsive.profil}>
        <div style={responsive.imageContainer}>
          <img
            onClick={() => setDialog("Photo")}
            style={
              userData.image ? responsive.userImage : responsive.emptyImage
            }
            src={
              userData.image
                ? RyanDahl.URL_USER_MEDIA + userData.uid + "/" + userData.image
                : themeIcons.nav_user
            }
          />

          {isMyProfile && (
            <img
              onClick={() => setCreateStory(true)}
              style={responsive.addButton}
              src={coloredIcons.story_plus}
            />
          )}
        </div>

        <div style={responsive.infoContainer}>
          {!matches &&
            (isMyProfile ? (
              <div style={responsive.buttonRow}>
                {usernameElement}
                {editButton}
                {settingsButton}
              </div>
            ) : (
              <div style={responsive.buttonRow}>
                {usernameElement}
                {followButton}
                {sendButton}
              </div>
            ))}

          <div style={styles.counterRow}>
            <div style={styles.count}>{postsCount + " " + "posts"}</div>
            <div onClick={() => setDialog("Followers")} style={styles.count}>
              {followersCount + " " + "followers"}
            </div>
            <div onClick={() => setDialog("Follows")} style={styles.count}>
              {followCount + " " + "follows"}
            </div>
          </div>

          {!matches && (
            <div>
              {displaynameElement}
              {biographyElement}
            </div>
          )}
        </div>
      </div>

      {matches && (
        <div style={styles.about}>
          {displaynameElement}
          {biographyElement}
        </div>
      )}

      {matches &&
        (!isMyProfile ? (
          <div style={responsive.buttonRow}>
            {followButton}
            {sendButton}
          </div>
        ) : (
          <div style={responsive.buttonRow}>
            {editButton}
            {shareButton}
          </div>
        ))}

      <div style={responsive.menuContainer}>
        <div
          onClick={() => setMenu("Posts")}
          style={responsive.postsMenuButton}
        >
          <img
            style={styles.menuImage}
            src={menu === "Posts" ? activeThemeIcons.pixels : themeIcons.pixels}
          />
          {!matches && "Posts"}
        </div>

        {isMyProfile && (
          <div
            onClick={() => setMenu("Saves")}
            style={responsive.savesMenuButton}
          >
            <img
              style={styles.menuImage}
              src={
                menu === "Saves" ? coloredIcons.post_save : themeIcons.post_save
              }
            />
            {!matches && "Saves"}
          </div>
        )}
      </div>

      <div style={responsive.posts}>
        {menu === "Saves"
          ? saveList.map((postData: PostData) => (
              <PrePost key={postData.id} postData={postData} />
            ))
          : postList.map((postData: PostData) => (
              <PrePost key={postData.id} postData={postData} />
            ))}
      </div>

      <About />

      {dialog === "Setting" ? (
        <Dialog>
          <Settings setDialog={setDialog} />
        </Dialog>
      ) : dialog === "Edit" ? (
        <Dialog>
          <Edit setDialog={setDialog} />
        </Dialog>
      ) : dialog === "Follows" || dialog === "Followers" ? (
        <Dialog>
          <Follow dialog={dialog} setDialog={setDialog} userView={userData} />
        </Dialog>
      ) : dialog === "Photo" ? (
        <Dialog press={() => setDialog("None")}>
          <ShowPhoto userData={userData} />
        </Dialog>
      ) : null}
    </div>
  );
}

export default Profile;

const styles = {
  menuImage: {
    margin: 5,
    width: 20,
    height: 20,
  } as React.CSSProperties,

  top: {
    width: "90%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: 75,
  } as React.CSSProperties,

  counterRow: {
    height: 75,
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    userSelect: "none",
  } as React.CSSProperties,

  count: {
    fontSize: 17,
    cursor: "pointer",
  } as React.CSSProperties,

  about: {
    width: "85%",
    minHeight: 75,
    color: "white",
  } as React.CSSProperties,
};
