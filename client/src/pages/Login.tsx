import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RoofContext, RoofContextProps } from "../App";
import AuthService from "../services/AuthService";
import LabelInput from "../components/labelinput";
import About from "../components/about";
import Application from "../components/application";
import Or from "../components/or";
import Google from "../components/google";

function Login() {
  const roof: RoofContextProps | null = useContext(RoofContext);
  const setAuthData = roof!.setAuthData;

  const navigate = useNavigate();

  const usernameInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);

  const [usernameInputState, setUserNameInputState] = useState(false);
  const [passwordInputState, setPasswordInputState] = useState(false);

  const signIn = async (username: string, password: string) => {
    try {
      const jsonData = await AuthService.loginWithUsernameAndPassword(
        username,
        password
      );
      localStorage.setItem(AuthService.KEY_AUTH_DATA, JSON.stringify(jsonData));
      setAuthData(jsonData);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div style={styles.main}>
      <div style={styles.auth}>
        <div style={styles.title}>Social App</div>

        <LabelInput
          ref={usernameInput}
          type="text"
          label="Username"
          onChange={(value) => {
            setUserNameInputState(value.length! > 0 ? true : false);
          }}
          disabled={false}
        />

        <LabelInput
          ref={passwordInput}
          type="password"
          label="Password"
          onChange={(value) => {
            setPasswordInputState(value.length! > 5 ? true : false);
          }}
          disabled={false}
        />

        {usernameInputState && passwordInputState ? (
          <div
            style={styles.loginEnable}
            onMouseEnter={(e) => {
              e.currentTarget.style.filter = "brightness(110%)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.filter = "brightness(100%)";
            }}
            onClick={() => {
              if (usernameInput.current && passwordInput.current) {
                signIn(
                  usernameInput.current.value,
                  passwordInput.current.value
                );
              }
            }}
          >
            Login
          </div>
        ) : (
          <div style={styles.login}>Login</div>
        )}

        <Or />

        <Google />

        <span
          onClick={() => navigate("/accounts/mail/password")}
          style={styles.forgot}
        >
          Did you forget your password ?
        </span>
      </div>

      <div style={styles.subAuth}>
        <span style={styles.signupLabel}>Don't have an account?</span>
        <span
          onClick={() => navigate("/accounts/register")}
          style={styles.signup}
        >
          Sign Up
        </span>
      </div>

      <Application />

      <About />
    </div>
  );
}
export default Login;

const styles = {
  main: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    overflowY: "scroll",
    overflowX: "hidden",
  } as React.CSSProperties,

  auth: {
    width: 400,
    minHeight: 450,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    border: "1px solid #d1d1d1",
    borderRadius: 5,
    marginTop: 30,
  } as React.CSSProperties,

  subAuth: {
    width: 400,
    minHeight: 75,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid #d1d1d1",
    borderRadius: 5,
    marginTop: 10,
  } as React.CSSProperties,

  login: {
    backgroundColor: "#6eaed4",
    height: 40,
    width: 250,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    userSelect: "none",
  } as React.CSSProperties,

  loginEnable: {
    backgroundColor: "#2573d9",
    height: 40,
    width: 250,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    cursor: "pointer",
    userSelect: "none",
  } as React.CSSProperties,

  title: {
    margin: 5,
    fontFamily: "Dancing Script, cursive",
    fontSize: 50,
    userSelect: "none",
  } as React.CSSProperties,

  signupLabel: {
    fontSize: 15,
    color: "grey",
    userSelect: "none",
  } as React.CSSProperties,

  signup: {
    fontSize: 15,
    color: "#2573d9",
    userSelect: "none",
    cursor: "pointer",
    marginLeft: 5,
  } as React.CSSProperties,

  forgot: {
    fontSize: 13,
    color: "grey",
    userSelect: "none",
    cursor: "pointer",
  } as React.CSSProperties,
};
