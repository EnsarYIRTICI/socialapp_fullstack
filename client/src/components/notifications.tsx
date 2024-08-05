import { useContext, useState } from "react";
import { RoofContext, RoofContextProps } from "../App";

function Notification() {
  const roof: RoofContextProps | null = useContext(RoofContext);
  const { theme, matches } = roof!;

  const [notiList, setNotiList] = useState([]);

  const responsive = {
    input: {
      width: "70%",
      height: 50,
      border: "none",
      outline: "none",
      backgroundColor: "transparent",
      color: "white",
      fontSize: matches ? 19 : 16,
    } as React.CSSProperties,

    search: {
      width: 50,
      height: 50,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "grey",
      userSelect: "none",
      fontSize: matches ? 25 : 23,
    } as React.CSSProperties,
  };

  return (
    <>
      <div style={styles.inputContainer}>
        <input style={responsive.input} type="text" placeholder="Search" />
        <span style={responsive.search} className="material-symbols-outlined">
          search
        </span>
      </div>
      <div>
        {notiList.map((noti) => (
          <div></div>
        ))}
      </div>
    </>
  );
}

export default Notification;

const styles = {
  inputContainer: {
    backgroundColor: "#545d6e",
    height: 55,
    width: "90%",
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderRadius: 15,
  } as React.CSSProperties,
};
