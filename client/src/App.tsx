import { useState, createContext, useEffect } from "react";
import Safary from "./pages/Safary";
import Auth from "./pages/Auth";
import AuthData from "./interface/auth";
import { darkThemeColors, lightThemeColors } from "./config/colors";
import Colors from "./interface/colors";
import {
  darkThemeIcons,
  darkThemeIconsActive,
  lightThemeIcons,
  lightThemeIconsActive,
} from "./config/icons";
import { ActiveThemeIcons, ThemeIcons } from "./interface/icons";

export type RoofContextProps = {
  setAuthData: React.Dispatch<React.SetStateAction<null>>;
  setTheme: React.Dispatch<React.SetStateAction<boolean>>;

  matches: boolean;
  authData: AuthData | null;
  theme: boolean;
  colors: Colors;
  themeIcons: ThemeIcons;
  activeThemeIcons: ActiveThemeIcons;
};

export const RoofContext = createContext<RoofContextProps | null>(null);

function App() {
  const [theme, setTheme] = useState(true);
  const [authData, setAuthData] = useState(null);
  const [colors, setColors] = useState({} as Colors);

  const [themeIcons, setThemeIcons] = useState({} as ThemeIcons);
  const [activeThemeIcons, setActiveThemeIcons] = useState(
    {} as ActiveThemeIcons
  );

  const [matches, setMatches] = useState(
    window.matchMedia("(max-width: 768px)").matches
  );

  useEffect(() => {
    window
      .matchMedia("(max-width: 768px)")
      .addEventListener("change", (e) => setMatches(e.matches));
  }, []);

  useEffect(() => {
    setColors(() => {
      return theme ? darkThemeColors : lightThemeColors;
    });
    setThemeIcons(() => {
      return theme ? darkThemeIcons : lightThemeIcons;
    });
    setActiveThemeIcons(() => {
      return theme ? darkThemeIconsActive : lightThemeIconsActive;
    });
  }, [theme]);

  const roofContextProps = {
    setAuthData,
    setTheme,

    matches,
    authData,
    theme,
    colors,
    themeIcons,
    activeThemeIcons,
  };

  return (
    <RoofContext.Provider value={roofContextProps}>
      {authData == null ? <Auth /> : <Safary />}
    </RoofContext.Provider>
  );
}
export default App;
