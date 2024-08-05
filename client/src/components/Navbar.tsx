import { useContext } from "react";
import { RoofContext, RoofContextProps } from "../App";

function NavBar({ children }: any) {
  const roof: RoofContextProps | null = useContext(RoofContext);
  const { theme, matches, colors } = roof!;

  const responsive = {
    main: {
      height: matches ? 90 : "100%",
      width: matches ? "100%" : 75,
      color: "white",
      borderTop: matches ? "1px solid" : "0px solid",
      borderRight: matches ? "0px solid" : "1px solid",
      borderColor: colors.border,
      backgroundColor: theme ? "black" : "white",
      position: "absolute",
      bottom: 0,
      zIndex: matches ? 2 : 3,
      userSelect: "none",
    } as React.CSSProperties,

    navbar: {
      height: "100%",
      width: "100%",
      display: "flex",
      justifyContent: matches ? "center" : "space-between",
      alignItems: matches ? "flex-start" : "center",
      flexDirection: matches ? "row" : "column",
    } as React.CSSProperties,
  };
  return (
    <div style={responsive.main}>
      <div style={responsive.navbar}>{children}</div>
    </div>
  );
}

export default NavBar;
