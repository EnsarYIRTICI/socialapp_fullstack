import {
  CSSProperties,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { RoomScreenContext, RoomScreenContextProps } from "../pages/roomscreen";
import { RoofContext, RoofContextProps } from "../App";

function RoomManagment({ closeManagment, openFilePicker }: any) {
  const roof: RoofContextProps | null = useContext(RoofContext);
  const { matches, colors, themeIcons } = roof!;

  const roomscreen: RoomScreenContextProps | null =
    useContext(RoomScreenContext);
  const { roomid, selectionMode, setSelectionMode } = roomscreen!;

  const openSelection = () => {
    setSelectionMode(true);
    closeManagment();
  };

  const responsive = {
    main: {
      left: 0,
      bottom: 70,
      position: "absolute",
      width: 150,
      backgroundColor: "#393f4a",
      borderRadius: 10,
      color: colors.text,
      userSelect: "none",
    } as CSSProperties,
  };

  return (
    <div style={responsive.main}>
      <RoomManagmentButton onClick={openSelection} label={"Select"} />
      <RoomManagmentButton onClick={openFilePicker} label={"File"} />
      <RoomManagmentButton onClick={closeManagment} label={"Close"} />
    </div>
  );
}

export default RoomManagment;

function RoomManagmentButton({ onClick, label }: any) {
  const styles = {
    button: {
      height: 60,
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 10,

      cursor: "pointer",
    } as CSSProperties,
  };
  return (
    <div
      onClick={onClick}
      style={styles.button}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = "#545a66";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "transparent";
      }}
    >
      {label}
    </div>
  );
}
