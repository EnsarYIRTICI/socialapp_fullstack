import { useContext, useEffect, useRef } from "react";
import { RoofContext, RoofContextProps } from "../App";
import { SafaryContext } from "../pages/Safary";

function Drawer({ children, title }: any) {
  const roof: RoofContextProps | null = useContext(RoofContext);
  const { theme, matches, colors } = roof!;

  const { setDrawer }: any = useContext(SafaryContext);

  const animationRef = useRef<HTMLDivElement>(null);

  const exitAnimation = () => {
    if (animationRef.current) {
      animationRef.current.style.animation =
        "drawer-reverse 250ms normal forwards";
      animationRef.current.onanimationend = () => setDrawer("none");
    }
  };

  const enterAnimation = () => {
    if (animationRef.current) {
      animationRef.current.style.animation = "drawer 250ms normal forwards";
    }
  };

  const disableAnimation = () => {
    if (animationRef.current) {
      animationRef.current.style.animation = "none";
    }
  };

  useEffect(() => {
    if (!matches) enterAnimation();
    else disableAnimation();
  }, [matches]);

  const responsive = {
    drawer: {
      backgroundColor: colors.background,
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      width: matches ? "100vw" : 424,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      zIndex: 2,
      borderRight: matches ? "0px solid" : "1px solid",
      borderColor: "#353a45",
    } as React.CSSProperties,

    title: {
      height: 100,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: theme ? "white" : "black",
      userSelect: "none",
      fontSize: 30,
      fontFamily: "Roboto, sans-serif",
    } as React.CSSProperties,

    back: {
      width: 40,
      height: 40,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 25,
      color: theme ? "white" : "black",
      userSelect: "none",
      cursor: "pointer",
    } as React.CSSProperties,
  };

  return (
    <div ref={animationRef} style={responsive.drawer}>
      <div style={styles.top}>
        <div style={responsive.title}>{title}</div>
        {matches ? null : (
          <span
            onClick={() => exitAnimation()}
            style={responsive.back}
            className="material-symbols-outlined"
          >
            arrow_back_ios
          </span>
        )}
      </div>
      {children}
      {matches && (
        <div onClick={() => setDrawer("none")} style={styles.cross}>
          <span className="material-symbols-outlined">close</span>
        </div>
      )}
    </div>
  );
}

export default Drawer;

const styles = {
  top: {
    height: 100,
    width: "90%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  } as React.CSSProperties,

  cross: {
    width: 50,
    height: 50,
    position: "fixed",
    bottom: 75,
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
