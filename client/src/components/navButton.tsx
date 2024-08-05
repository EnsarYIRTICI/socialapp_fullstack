import { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { RoofContext, RoofContextProps } from "../App";
import { SafaryContext } from "../pages/Safary";

function NavButton({ icon, activeIcon, route }: any) {
  const roof: RoofContextProps | null = useContext(RoofContext);
  const { theme, matches } = roof!;

  const { setDrawer }: any = useContext(SafaryContext);

  const navigate = useNavigate();
  const location = useLocation();

  const locationValidation = () => {
    return location.pathname.split("/")[1] == route.split("/")[1];
  };

  return (
    <div
      onClick={() => {
        setDrawer("none");
        navigate(route);
      }}
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
      <img
        style={styles.image}
        src={locationValidation() ? activeIcon : icon}
      />
    </div>
  );
}

export default NavButton;

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
