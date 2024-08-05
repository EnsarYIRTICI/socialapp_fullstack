import React, {
  useContext,
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  CSSProperties,
  useState,
} from "react";
import { RoofContext, RoofContextProps } from "../App";
import Hover from "../components/BubbleOnHover";
import Image from "../components/BubbleImage";
import File from "../components/BubbleFile";
import BubbleData from "../interface/bubble";
import { RoomScreenContext, RoomScreenContextProps } from "../pages/roomscreen";
import BrendanEich from "../services/BrendanEich";

type BubbleProps = {
  parseData?: string;
  index: number;
  bubbleData: BubbleData;
};

const Bubble = forwardRef(
  ({ parseData, index, bubbleData }: BubbleProps, ref: any) => {
    const roof: RoofContextProps | null = useContext(RoofContext);
    const { theme, matches, themeIcons, activeThemeIcons } = roof!;
    const authData = roof!.authData!;

    const isMyMessage = bubbleData.sender_uid === authData.uid ? true : false;

    const roomscreen: RoomScreenContextProps | null =
      useContext(RoomScreenContext);
    const { roomid, selectionMode } = roomscreen!;

    const hoverRef = useRef<HTMLDivElement>(null);

    const [isSelected, setIsSelected] = useState(false);

    useEffect(() => {
      setIsSelected(false);
    }, [selectionMode]);

    const responsive = {
      main: {
        display: "flex",
        alignSelf: isMyMessage ? "flex-end" : "flex-start",
        flexDirection: isMyMessage ? "row" : "row-reverse",
        margin: 25,
        justifyContent: "space-between",
        alignItems: "center",

        position: "relative",
      } as CSSProperties,

      bubble: {
        wordBreak: "break-word",
        minWidth: matches ? 70 : 125,
        maxWidth: matches ? 200 : 350,
        display: "flex",
        flexDirection: "column",
        color: "white",
        backgroundColor: isMyMessage ? "#6ca697" : "#705fc9",
        borderRadius: 15,
      } as CSSProperties,

      filter: {
        height: 100,
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#e0dede",
        fontSize: matches ? 13 : 17,
        userSelect: "none",
      } as CSSProperties,

      message: {
        paddingTop: 15,
        paddingLeft: matches ? 15 : 20,
        paddingRight: 20,
        fontSize: matches ? 15 : 17,
      } as CSSProperties,

      select: {
        position: "absolute",
        left: isMyMessage ? 0 : undefined,
        right: !isMyMessage ? 0 : undefined,

        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
        userSelect: "none",

        backgroundColor: `rgba(0, 0, 0, 0.5)`,

        cursor: "pointer",
      } as CSSProperties,

      selectIcon: {
        height: 30,
        width: 30,
      } as CSSProperties,
    };

    const messageComponent = (
      <div style={responsive.message}>{bubbleData.message}</div>
    );

    const timeComponent = (
      <div style={styles.time}>
        {bubbleData.edited == true ? "(Edited) " : null}
        {bubbleData.creation_date.substring(11, 16)}
      </div>
    );

    const columnComponent = (
      <div style={responsive.bubble}>
        {bubbleData.file &&
          (BrendanEich.mimetype(bubbleData.file.mimetype) === "image" ? (
            <Image bubbleFile={bubbleData.file} roomid={roomid} />
          ) : (
            <File bubbleFile={bubbleData.file} isMyMessage={isMyMessage} />
          ))}

        {bubbleData.message && messageComponent}
        {timeComponent}
      </div>
    );

    const selectElement = (
      <div onClick={() => setIsSelected(true)} style={responsive.select}>
        <img
          style={responsive.selectIcon}
          src={
            isSelected
              ? activeThemeIcons.bubble_select
              : themeIcons.bubble_select
          }
        />
      </div>
    );

    const hoverElement = (
      <Hover
        ref={hoverRef}
        bubbleData={bubbleData}
        roomid={roomid}
        index={index}
      />
    );

    const showHover = () => {
      if (hoverRef.current) {
        hoverRef.current.style.display = "flex";
      }
    };

    const hideHover = () => {
      if (hoverRef.current) {
        hoverRef.current.style.display = "none";
      }
    };

    const bubbleComponent = (
      <div
        ref={ref}
        onMouseOver={showHover}
        onMouseLeave={hideHover}
        style={responsive.main}
      >
        {!selectionMode && hoverElement}
        {columnComponent}
        {selectionMode && selectElement}
      </div>
    );

    const dateParserComponent = (
      <div style={styles.filterMain}>
        <div style={responsive.filter}>{parseData}</div>
        {bubbleComponent}
      </div>
    );

    const layout = parseData ? dateParserComponent : bubbleComponent;

    return layout;
  }
);

export default Bubble;

const styles = {
  filterMain: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
  } as CSSProperties,

  time: {
    alignSelf: "flex-end",
    margin: 10,
    fontSize: 12,
    color: "#e0dede",
  } as CSSProperties,

  link: {
    textDecoration: "none",
    color: "white",
    cursor: "pointer",
    padding: 15,
  } as CSSProperties,
};
