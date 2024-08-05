import { useContext, useEffect } from "react";
import { RoofContext, RoofContextProps } from "../App";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/AuthService";

function Wait() {
  const roof: RoofContextProps | null = useContext(RoofContext);
  const { setAuthData, colors, themeIcons } = roof!;

  const navigate = useNavigate();

  const signIn = async (username: string, password: string) => {
    try {
      const jsonData = await AuthService.loginWithUsernameAndPassword(
        username,
        password
      );
      setAuthData(jsonData);
    } catch (error) {
      localStorage.removeItem(AuthService.KEY_AUTH_DATA);
      navigate("/accounts/login");
    }
  };

  const getAuthDataFromLocalStorage = async () => {
    const str = localStorage.getItem(AuthService.KEY_AUTH_DATA);
    if (str) {
      const username = JSON.parse(str).username;
      const password = JSON.parse(str).password;
      await signIn(username, password);
    } else {
      navigate("/accounts/login");
    }
  };

  useEffect(() => {
    getAuthDataFromLocalStorage();
  }, []);

  const styles = {
    main: {
      backgroundColor: colors.background,
      width: "100vw",
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
    } as React.CSSProperties,

    logo: {
      height: 100,
      width: 100,
    },
  };

  return (
    <div style={styles.main}>
      <img style={styles.logo} src={themeIcons.instagram} />
    </div>
  );
}

export default Wait;
