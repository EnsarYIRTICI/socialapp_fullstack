import { CSSProperties, useContext } from "react";
import NavBar from "../components/Navbar";
import { RoofContext, RoofContextProps } from "../App";
import CreatePostButton from "../components/createPostButton";
import DrawButton from "../components/drawButton";
import NavButton from "../components/navButton";

function DesktopNavigation() {
  const roof: RoofContextProps | null = useContext(RoofContext);
  const { themeIcons, activeThemeIcons } = roof!;
  const authData = roof!.authData!;

  return (
    <>
      <div style={styles.navspacer} />
      <NavBar>
        <div style={styles.mainButton}>
          <NavButton
            icon={themeIcons.instagram}
            activeIcon={themeIcons.instagram}
            route={"/"}
          />
        </div>
        <div>
          <NavButton
            icon={themeIcons.nav_home}
            activeIcon={activeThemeIcons.nav_home}
            route={"/"}
          />
          <DrawButton icon={themeIcons.search} drawerName="search" />
          <NavButton
            icon={themeIcons.nav_messenger}
            activeIcon={activeThemeIcons.nav_messenger}
            route={"/inbox"}
          />

          {/* <DrawIcon name="bell" type=".png" /> */}

          <CreatePostButton />
          <NavButton
            icon={themeIcons.nav_user}
            activeIcon={activeThemeIcons.nav_user}
            route={`/user/${authData.username}`}
          />
        </div>

        <span
          style={styles.settingsButton}
          className="material-symbols-outlined"
        >
          menu
        </span>
      </NavBar>
    </>
  );
}

export default DesktopNavigation;

const styles = {
  mainButton: {
    height: "15vh",
    width: "100%",
    display: "flex",
    alignItems: "flex-end ",
    justifyContent: "center",
  } as CSSProperties,

  settingsButton: {
    height: "30vh",
    fontSize: 28,
    marginBottom: 30,
    cursor: "pointer",
    display: "flex",
    alignItems: "end",
    justifyContent: "center",
  } as CSSProperties,

  navspacer: {
    width: 75,
  } as CSSProperties,
};
