import { CSSProperties } from "react";
import RyanDahl from "../config/RyanDahl";

function Media({ sender_uid, story }: any) {
  return (
    <img
      style={styles.main}
      src={RyanDahl.URL_STORIES_MEDIA + sender_uid + "/" + story.media}
    />
  );
}

export default Media;

const styles = {
  main: {
    height: 750,
    width: 500,
    objectFit: "cover",
  } as CSSProperties,
};
