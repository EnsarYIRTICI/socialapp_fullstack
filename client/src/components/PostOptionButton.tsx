import { useContext } from "react";
import { RoofContext, RoofContextProps } from "../App";

function Button({ name, press, color }: any) {
  const roof: RoofContextProps | null = useContext(RoofContext);
  const { theme, matches } = roof!;

  const responsive = {
    button: {
      height: matches ? 60 : 75,
      fontSize: 15,
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: color ?? "white",
      userSelect: "none",
      cursor: "pointer",
    } as React.CSSProperties,
  };

  return (
    <div
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = "#393f4a";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "transparent";
      }}
      onClick={press}
      style={responsive.button}
    >
      {name}
    </div>
  );
}

export default Button;
