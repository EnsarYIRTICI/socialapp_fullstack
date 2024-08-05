import { useEffect, useRef, useState } from "react";
import About from "../components/about";
import LabelInput from "../components/labelinput";
import Or from "../components/or";
import { useNavigate } from "react-router-dom";
import TimBernersLee from "../services/TimBernersLee";
import RyanDahl from "../config/RyanDahl";

function SendEmail() {
  const navigate = useNavigate();

  const resetInput = useRef<HTMLInputElement>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isCountDown, setIsCountDown] = useState(false);
  const [resetInputState, setResetInputState] = useState(false);

  const sendResetLink = async (email: string) => {
    try {
      setIsLoading(true);
      await TimBernersLee.httpPost(RyanDahl.API_AUTH_MAIL_RESET_PASSWORD, {
        email,
      });
      setIsCountDown(true);
    } catch (error) {
      alert(error);
    } finally {
      setIsLoading(false);
    }
  };

  const [countdown, setCountdown] = useState(30);

  useEffect(() => {
    if (isCountDown) {
      const intervalId = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown < 1) {
            clearInterval(intervalId);
            setIsCountDown(false);
            return 30;
          }
          return prevCountdown - 1;
        });
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [isCountDown]);

  return (
    <div style={styles.main}>
      <div style={styles.auth}>
        <div style={styles.lockContainer}>
          <img style={styles.lock} src="/128x128/lock.png" />
        </div>

        <span style={styles.title}>Trouble logging in?</span>

        <span style={styles.subtitle}>
          Enter your email, phone, or username and we'll send you a link to get
          back into your account.
        </span>

        <LabelInput
          ref={resetInput}
          type="text"
          label="E-mail"
          onChange={(value) => {
            setResetInputState(value.length! > 0 ? true : false);
          }}
          disabled={isLoading}
        />

        {isCountDown && (
          <div style={styles.countTitle}>
            <div> The email has been sent</div>
            <div>you can send it again in {countdown} seconds</div>
          </div>
        )}

        {resetInputState && !isLoading && !isCountDown ? (
          <div
            style={styles.resetEnable}
            onMouseEnter={(e) => {
              e.currentTarget.style.filter = "brightness(110%)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.filter = "brightness(100%)";
            }}
            onClick={() => {
              if (resetInput.current) {
                sendResetLink(resetInput.current.value);
              }
            }}
          >
            Send reset link
          </div>
        ) : (
          <div style={styles.reset}>Send reset link</div>
        )}

        <div style={styles.createContainer}>
          <Or />

          <div
            onClick={() => navigate("/accounts/register")}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "grey";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "black";
            }}
            style={styles.createTitle}
          >
            Create new account
          </div>
        </div>

        <div
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "grey";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "black";
          }}
          style={styles.login}
          onClick={() => navigate("/accounts/login")}
        >
          Back to Login
        </div>
      </div>

      <About />
    </div>
  );
}

export default SendEmail;

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
    minHeight: 600,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    border: "1px solid #d1d1d1",
    borderRadius: 5,
    margin: 30,
  } as React.CSSProperties,

  lockContainer: {
    marginTop: 15,
    width: 140,
    height: 140,
    border: "2px solid black",
    borderRadius: 70,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  } as React.CSSProperties,

  lock: {
    width: 90,
    height: 90,
  } as React.CSSProperties,

  title: {
    fontWeight: "bold",
  } as React.CSSProperties,

  subtitle: {
    width: "70%",
    textAlign: "center",
    color: "grey",
  } as React.CSSProperties,

  reset: {
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

  resetEnable: {
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

  createContainer: {
    height: 50,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
  } as React.CSSProperties,

  createTitle: {
    fontSize: 15,
    cursor: "pointer",
    userSelect: "none",
  } as React.CSSProperties,

  login: {
    fontSize: 15,
    width: "100%",
    height: 50,
    backgroundColor: "#f0f0f0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    userSelect: "none",
    cursor: "pointer",
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  } as React.CSSProperties,

  countTitle: {
    fontSize: 15,
    color: "grey",
    textAlign: "center",
  } as React.CSSProperties,
};
