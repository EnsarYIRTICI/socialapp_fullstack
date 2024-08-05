import { CSSProperties, useContext, useEffect, useState } from "react";
import Media from "./media";
import RyanDahl from "../config/RyanDahl";
import Bar from "./bar";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { RoofContextProps, RoofContext } from "../App";
import { SafaryContext } from "../pages/Safary";

function StoryGroup({ group, nextGroup, prevGroup }: any) {
  const roof: RoofContextProps | null = useContext(RoofContext);
  const { themeIcons, colors } = roof!;

  const { setGlobalStory, setStoryOption }: any = useContext(SafaryContext);

  const sender_uid = group.sender_uid;
  const image = group.image;
  const username = group.username;
  const stories = group.stories;

  const duration = 250;
  const delay = 25;

  const navigate = useNavigate();

  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [date, setDate] = useState("");

  const selectedStory = stories[index];

  const difference = () => {
    const creationDate = moment(selectedStory.creation_date);
    const currentDate = moment();
    const diff = moment.duration(currentDate.diff(creationDate));

    const second = diff.seconds();
    const minute = diff.minutes();
    const hour = diff.hours();

    if (hour > 0) {
      setDate(`${hour}h`);
    } else if (minute > 0) {
      setDate(`${minute}m`);
    } else {
      setDate(`${second}s`);
    }
  };

  useEffect(() => {
    difference();
    setProgress(0);
  }, [index, group]);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress + 1 < duration) return prevProgress + 1;
        nextStory();
        return 0;
      });
    }, delay);

    return () => clearInterval(timer);
  }, [group]);

  const nextStory = () => {
    setIndex((prevIndex) => {
      if (stories[prevIndex + 1]) return prevIndex + 1;
      nextGroup();
      return 0;
    });
  };

  const prevStory = () => {
    setIndex((prevIndex) => {
      if (stories[prevIndex - 1]) return prevIndex - 1;
      prevGroup();
      return 0;
    });
  };

  const navigateUserProfile = () => {
    navigate(`/user/${username}`);

    setGlobalStory(null);
  };

  const showStoryOption = () => {
    let story = stories[index];
    story["sender_uid"] = sender_uid;
    setStoryOption(story);
  };

  const responsive = {
    more: {
      marginLeft: "auto",
      marginRight: 25,
      color: colors.text,
      userSelect: "none",
      cursor: "pointer",
    } as React.CSSProperties,
  };

  return (
    <div style={styles.main}>
      <div style={styles.darkness} />

      <div style={styles.bars}>
        {stories.map((story: any, i: number) => (
          <Bar
            key={i}
            i={i}
            index={index}
            duration={duration}
            progress={progress}
          />
        ))}
      </div>

      <div style={styles.row}>
        <div onClick={navigateUserProfile} style={styles.user}>
          <img
            style={styles.image}
            src={
              image
                ? RyanDahl.URL_USER_MEDIA + sender_uid + "/" + image
                : themeIcons.nav_user
            }
          />

          <div style={styles.username}>{username}</div>
          <div style={styles.username}>{date}</div>
        </div>

        <span
          onClick={showStoryOption}
          style={responsive.more}
          className="material-symbols-outlined"
        >
          more_horiz
        </span>
      </div>

      <Media sender_uid={sender_uid} story={selectedStory} />

      <div onClick={prevStory} style={styles.left}>
        <span className="material-symbols-outlined">chevron_left</span>
      </div>

      <div onClick={nextStory} style={styles.right}>
        <span className="material-symbols-outlined">chevron_right</span>
      </div>
    </div>
  );
}

export default StoryGroup;

const styles = {
  main: {
    height: 750,
    width: 500,
    backgroundColor: "grey",
    position: "relative",
    display: "flex",
  } as CSSProperties,

  row: {
    width: "100%",
    position: "absolute",
    top: 20,
    margin: 10,
    display: "flex",
    alignItems: "center",
    userSelect: "none",
  } as CSSProperties,

  user: {
    display: "flex",
    cursor: "pointer",
  } as CSSProperties,

  image: {
    height: 30,
    width: 30,
    borderRadius: "50%",
    objectFit: "cover",
  } as CSSProperties,

  username: {
    margin: 5,
    color: "white",
    fontSize: 13,
  } as CSSProperties,

  left: {
    left: 0,
    display: "flex",
    position: "absolute",
    backgroundColor: "red",
    alignSelf: "center",
    margin: 20,
    borderRadius: "100%",
    background: "rgba(255,255,255, 0.5)",
    userSelect: "none",
    cursor: "pointer",
  } as CSSProperties,

  right: {
    right: 0,
    display: "flex",
    position: "absolute",
    alignSelf: "center",
    margin: 20,
    borderRadius: "100%",
    background: "rgba(255,255,255, 0.5)",
    userSelect: "none",
    cursor: "pointer",
  } as CSSProperties,

  bars: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 25,
    display: "flex",
    alignItems: "center",
  } as CSSProperties,

  darkness: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "10%",
    background: "linear-gradient(to top, rgba(0,0,0,0), rgba(0,0,0,0.7))",
  } as CSSProperties,
};
