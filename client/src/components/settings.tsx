import { useContext } from "react";
import { RoofContext, RoofContextProps } from "../App";
import AuthService from "../services/AuthService";

function Settings({ setDialog }: any) {
  const roof: RoofContextProps | null = useContext(RoofContext);
  const { setAuthData, matches } = roof!;

  const signOut = () => {
    localStorage.removeItem(AuthService.KEY_AUTH_DATA);
    setAuthData(null);
  };

  const closeDialog = () => {
    setDialog("None");
  };

  const responsive = {
    main: {
      width: matches ? 300 : 500,
      backgroundColor: "#282c34",
    } as React.CSSProperties,
  };

  return (
    <div style={responsive.main}>
      <SettingsButton onClick={signOut} label={"Sign Out"} />
      <SettingsButton onClick={closeDialog} label={"Cancel"} />
    </div>
  );
}

export default Settings;

function SettingsButton({ onClick, label }: any) {
  const { matches }: any = useContext(RoofContext);

  const responsive = {
    button: {
      height: matches ? 60 : 75,
      fontSize: 15,
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "white",
      userSelect: "none",
      cursor: "pointer",
    } as React.CSSProperties,
  };

  return (
    <div
      onClick={onClick}
      style={responsive.button}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = "#393f4a";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "transparent";
      }}
    >
      {label}
    </div>
  );
}
