import { useContext } from "react";
import { RoofContext, RoofContextProps } from "../App";
import { SafaryContext } from "../pages/Safary";

function DrawButton({ icon, drawerName }: any) {
  const roof: RoofContextProps | null = useContext(RoofContext);
  const { theme, matches } = roof!;

  const { drawer, setDrawer }: any = useContext(SafaryContext);

  const responsive = {
    border: {
      width: 45,
      height: 45,
      border: drawer == drawerName && "1px solid",
      borderColor: drawer == drawerName && "grey",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 35,
    } as React.CSSProperties,
  };

  return (
    <div
      onClick={() => setDrawer(drawerName)}
      style={styles.navicon}
      onMouseEnter={(e) => {
        if (!matches) {
          e.currentTarget.style.backgroundColor = theme ? "#4a4a4a" : "#dbdbdb";
        }
      }}
      onMouseLeave={(e) => {
        if (!matches) {
          e.currentTarget.style.backgroundColor = "transparent";
        }
      }}
    >
      <div style={responsive.border}>
        <img style={styles.image} src={icon} />
      </div>
    </div>
  );
}

const styles = {
  navicon: {
    transition: "150ms",
    minHeight: 60,
    minWidth: 60,
    margin: 5,
    borderRadius: 15,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  } as React.CSSProperties,

  image: {
    width: 20,
    height: 20,
  } as React.CSSProperties,
};

export default DrawButton;
