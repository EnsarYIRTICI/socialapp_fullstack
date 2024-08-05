import { useContext } from "react";
import { RoofContext, RoofContextProps } from "../App";
import { SafaryContext } from "../pages/Safary";

function CreatePostButton() {
  const roof: RoofContextProps | null = useContext(RoofContext);
  const { theme, matches, themeIcons } = roof!;

  const { setCreatePost, setDrawer }: any = useContext(SafaryContext);

  return (
    <div
      onClick={() => {
        setDrawer("none");
        setCreatePost(true);
      }}
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
      style={styles.navicon}
    >
      <img style={styles.image} src={themeIcons.more} />
    </div>
  );
}

export default CreatePostButton;

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
