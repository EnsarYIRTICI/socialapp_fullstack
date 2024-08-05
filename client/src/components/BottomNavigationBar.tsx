import { useContext } from "react";
import { RoofContext, RoofContextProps } from "../App";
import NavBar from "./Navbar";
import CreatePostButton from "../components/createPostButton";
import NavButton from "../components/navButton";
import DrawButton from "../components/drawButton";

function MobileNavigation() {
  const roof: RoofContextProps | null = useContext(RoofContext);
  const { themeIcons, activeThemeIcons } = roof!;
  const authData = roof!.authData!;

  return (
    <NavBar>
      <NavButton
        icon={themeIcons.nav_home}
        activeIcon={activeThemeIcons.nav_home}
        route={"/"}
      />
      <DrawButton icon={themeIcons.search} drawerName="search" />
      <CreatePostButton />
      <NavButton
        icon={themeIcons.nav_messenger}
        activeIcon={activeThemeIcons.nav_messenger}
        route={"/inbox"}
      />
      <NavButton
        icon={themeIcons.nav_user}
        activeIcon={activeThemeIcons.nav_user}
        route={`/user/${authData.username}`}
      />
    </NavBar>
  );
}

export default MobileNavigation;
