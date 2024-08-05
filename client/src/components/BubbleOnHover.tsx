import { LegacyRef, forwardRef, useContext } from "react";
import { RoofContext, RoofContextProps } from "../App";
import RyanDahl from "../config/RyanDahl";
import { BubbleGlobal } from "../objects/bubble";
import BubbleData from "../interface/bubble";
import { RoomScreenContext } from "../pages/roomscreen";

type HoverProps = {
  bubbleData: BubbleData;
  roomid: string;
  index: number;
};

const Hover = forwardRef(
  (
    { bubbleData, roomid, index }: HoverProps,
    ref: LegacyRef<HTMLDivElement> | undefined
  ) => {
    const roof: RoofContextProps | null = useContext(RoofContext);
    const authData = roof!.authData!;

    const { setBubbleGlobal }: any = useContext(RoomScreenContext);

    const isMyMessage = bubbleData.sender_uid === authData.uid ? true : false;

    const downloadPath = bubbleData.file
      ? RyanDahl.API_BUBBLE_FILE_DOWNLOAD +
        roomid +
        "/" +
        bubbleData.file.top_name +
        "/" +
        bubbleData.file.file_name
      : null;

    const showEditMenu = () => {
      setBubbleGlobal(
        new BubbleGlobal(
          bubbleData._id,
          index,
          bubbleData.message,
          bubbleData.creation_date,
          bubbleData.sender_uid
        )
      );
    };

    return (
      <div ref={ref} style={styles.edit}>
        {isMyMessage && (
          <span
            style={styles.link}
            onClick={showEditMenu}
            className="material-symbols-outlined"
          >
            edit
          </span>
        )}

        {downloadPath && (
          <a
            style={styles.link}
            target="_blank"
            href={downloadPath}
            download={bubbleData.file?.file_name}
          >
            <span className="material-symbols-outlined">download</span>
          </a>
        )}
      </div>
    );
  }
);

export default Hover;

const styles = {
  edit: {
    width: 50,
    height: "100%",
    display: "none",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-evenly",
    color: "white",
    userSelect: "none",
  } as React.CSSProperties,

  link: {
    textDecoration: "none",
    color: "grey",
    cursor: "pointer",
    padding: 15,
  } as React.CSSProperties,
};
