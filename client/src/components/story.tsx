import { CSSProperties, useContext } from "react";
import RyanDahl from "../config/RyanDahl";
import { RoofContext, RoofContextProps } from "../App";
import { SafaryContext } from "../pages/Safary";
import { coloredIcons } from "../config/icons";

function Story({ story, index, showStory }: any) {
  const roof: RoofContextProps | null = useContext(RoofContext);
  const { theme, matches, colors, themeIcons } = roof!;
  const authData = roof!.authData!;
  const isMyStory = authData.uid === story.sender_uid ? true : false;
  const isHaveStory = story.stories.length === 0 ? false : true;

  const { setCreateStory }: any = useContext(SafaryContext);

  const responsive = {
    username: {
      color: story.username === authData.username ? "grey" : colors.text,
      fontSize: 13,
    } as CSSProperties,

    imageContainer: {
      width: 60,
      height: 60,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "50%",
      cursor: "pointer",
      background: isHaveStory
        ? "linear-gradient(#CA1D7E, #E35157, #F2703F)"
        : "transparent",
    } as CSSProperties,
  };

  return (
    <div style={styles.main}>
      <div
        onClick={() => {
          if (isMyStory && !isHaveStory) {
            setCreateStory(true);
          } else {
            showStory(index);
          }
        }}
        style={responsive.imageContainer}
      >
        <img
          style={styles.image}
          src={
            story.image
              ? RyanDahl.URL_USER_MEDIA + story.sender_uid + "/" + story.image
              : themeIcons.nav_user
          }
        />
      </div>

      {isMyStory ? (
        <div style={responsive.username}>Your Story</div>
      ) : (
        <div style={responsive.username}>{story.username}</div>
      )}

      {isMyStory && (
        <img
          onClick={() => setCreateStory(true)}
          style={styles.add}
          src={coloredIcons.story_plus_min}
        />
      )}
    </div>
  );
}

export default Story;

const styles = {
  main: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginRight: 15,
    position: "relative",
  } as CSSProperties,

  add: {
    position: "absolute",
    right: 0,
    bottom: 25,
    cursor: "pointer",
  } as CSSProperties,

  image: {
    width: 55,
    height: 55,
    borderRadius: "50%",
    objectFit: "cover",
    userSelect: "none",
  } as CSSProperties,
};
