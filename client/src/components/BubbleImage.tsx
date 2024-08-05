import { CSSProperties, useContext } from "react";
import { BubbleGlobal } from "../objects/bubble";
import RyanDahl from "../config/RyanDahl";
import BubbleData from "../interface/bubble";
import { RoomScreenContext } from "../pages/roomscreen";
import BubbleFile from "../interface/bubblefile";

function Image({
  bubbleFile,
  roomid,
}: {
  bubbleFile: BubbleFile;
  roomid: string;
}) {
  const { setPhotoSource }: any = useContext(RoomScreenContext);

  const source =
    RyanDahl.URL_ROOM_MEDIA +
    roomid +
    "/" +
    bubbleFile.top_name +
    "/" +
    bubbleFile.file_name;

  return (
    <img
      style={styles.image}
      onMouseOver={(e) => {
        e.currentTarget.style.filter = "brightness(110%)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.filter = "brightness(100%)";
      }}
      onClick={() => setPhotoSource(source)}
      loading="lazy"
      src={source}
    />
  );
}

export default Image;

const styles = {
  image: {
    transition: "150ms",
    padding: 5,
    borderRadius: 15,
    maxWidth: 300,
    maxHeight: 300,
    cursor: "pointer",
    userSelect: "none",
  } as CSSProperties,
};
