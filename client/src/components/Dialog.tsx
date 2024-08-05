import { useContext } from "react";
import { RoofContext, RoofContextProps } from "../App";

function Dialog({ children, darkness, press, cross }: any) {
  const roof: RoofContextProps | null = useContext(RoofContext);
  const { theme, matches, colors } = roof!;

  const responsive = {
    main: {
      backgroundColor: `rgba(0, 0, 0, ${darkness ?? 0.7})`,
      position: "fixed",
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 3,
    } as React.CSSProperties,

    cross: {
      position: "absolute",
      right: matches ? 35 : 50,
      top: matches ? 35 : 50,
      color: "white",
      fontSize: 30,
      userSelect: "none",
      cursor: "pointer",
    } as React.CSSProperties,

    bottom: {
      position: "absolute",
      bottom: 0,
      borderTopLeftRadius: 15,
      borderTopRightRadius: 15,
      width: "80%",
      height: 100,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.react_100,
      userSelect: "none",
    } as React.CSSProperties,
  };

  const bottomCrossButton = (
    <div style={responsive.bottom}>
      <div onClick={cross} style={styles.cross}>
        <span className="material-symbols-outlined">close</span>
      </div>
    </div>
  );

  const topRightCrossButton = (
    <span
      onClick={cross}
      style={responsive.cross}
      className="material-symbols-outlined"
    >
      close
    </span>
  );

  return (
    <div onClick={press} style={responsive.main}>
      {cross && (matches ? bottomCrossButton : topRightCrossButton)}
      {children}
    </div>
  );
}

export default Dialog;

const styles = {
  cross: {
    width: 50,
    height: 50,
    cursor: "pointer",
    color: "white",
    border: "1px solid",
    borderColor: "grey",
    borderRadius: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  } as React.CSSProperties,
};
