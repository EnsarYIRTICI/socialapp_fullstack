import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RoofContext, RoofContextProps } from "../App";
import AuthService from "../services/AuthService";
import LabelInput from "../components/labelinput";
import About from "../components/about";
import Application from "../components/application";
import Google from "../components/google";
import Or from "../components/or";
import BrendanEich from "../services/BrendanEich";

function Register() {
  const navigate = useNavigate();

  const roof: RoofContextProps | null = useContext(RoofContext);

  const setAuthData = roof!.setAuthData;

  const displaynameInput = useRef<HTMLInputElement>(null);
  const emailInput = useRef<HTMLInputElement>(null);
  const usernameInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);

  const [emailInputState, setEmailInputState] = useState(false);
  const [displaynameInputState, setDisplayNameInputState] = useState(false);
  const [usernameInputState, setUserNameInputState] = useState(false);
  const [passwordInputState, setPasswordInputState] = useState(false);

  const signUp = async (
    displayname: string,
    username: string,
    email: string,
    password: string
  ) => {
    try {
      const jsonData = await AuthService.register(
        displayname,
        username,
        email,
        password
      );
      localStorage.setItem(AuthService.KEY_AUTH_DATA, JSON.stringify(jsonData));
      setAuthData(jsonData);
    } catch (error) {
      alert(error);
    }
  };

  const validation = (email: string, username: string, password: string) => {
    if (!BrendanEich.validateEmail(email)) {
      return "Invalid email address!";
    } else if (!BrendanEich.validateSpecial(username)) {
      return "Your USERNAME must not contain special characters!";
    } else if (!BrendanEich.validatePassword(password)) {
      return "Your PASSWORD must consist of at least 1 number, 1 uppercase letter and 1 lowercase letter!";
    } else if (!BrendanEich.validateSpecial(password)) {
      return "Your PASSWORD must not contain special characters!";
    } else {
      return undefined;
    }
  };

  return (
    <div style={styles.main}>
      <div style={styles.auth}>
        <div style={styles.title}>Social App</div>

        <Google />

        <Or />

        <LabelInput
          ref={emailInput}
          type="text"
          label="E-mail"
          onChange={(value) => {
            setEmailInputState(value.length! > 0 ? true : false);
          }}
          disabled={false}
        />
        <LabelInput
          ref={displaynameInput}
          type="text"
          label="Name Surname"
          onChange={(value) => {
            setDisplayNameInputState(value.length! > 0 ? true : false);
          }}
          disabled={false}
        />
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

        {emailInputState &&
        displaynameInputState &&
        usernameInputState &&
        passwordInputState ? (
          <div
            style={styles.registerEnable}
            onMouseEnter={(e) => {
              e.currentTarget.style.filter = "brightness(110%)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.filter = "brightness(100%)";
            }}
            onClick={() => {
              if (
                usernameInput.current &&
                displaynameInput.current &&
                emailInput.current &&
                passwordInput.current
              ) {
                const displayname = displaynameInput.current.value;
                const email = emailInput.current.value;
                const username = usernameInput.current.value;
                const password = passwordInput.current.value;

                const warnMessage = validation(email, username, password);

                if (warnMessage) alert(warnMessage);
                else signUp(displayname, username, email, password);
              }
            }}
          >
            Register
          </div>
        ) : (
          <div style={styles.register}>Register</div>
        )}
      </div>

      <div style={styles.subAuth}>
        <span style={styles.signinLabel}>Do you have an account?</span>
        <span onClick={() => navigate("/accounts/login")} style={styles.signin}>
          Sign In
        </span>
      </div>

      <Application />

      <About />
    </div>
  );
}
export default Register;

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
    minHeight: 500,
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

  register: {
    backgroundColor: "#6eaed4",
    height: 40,
    width: 250,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    userSelect: "none",
    marginBottom: 30,
  } as React.CSSProperties,

  registerEnable: {
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
    marginBottom: 30,
  } as React.CSSProperties,

  title: {
    margin: 5,
    fontFamily: "Dancing Script, cursive",
    fontSize: 50,
    userSelect: "none",
  } as React.CSSProperties,

  signinLabel: {
    fontSize: 15,
    color: "grey",
    userSelect: "none",
  } as React.CSSProperties,

  signin: {
    fontSize: 15,
    color: "#2573d9",
    userSelect: "none",
    cursor: "pointer",
    marginLeft: 5,
  } as React.CSSProperties,

  divider: {
    width: "40%",
    height: 1,
    backgroundColor: "#c2c0c0",
  } as React.CSSProperties,

  forgot: {
    fontSize: 13,
    color: "grey",
    userSelect: "none",
    cursor: "pointer",
  } as React.CSSProperties,
};
