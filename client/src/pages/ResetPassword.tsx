import { useEffect, useRef, useState } from "react";
import LabelInput from "../components/labelinput";
import TimBernersLee from "../services/TimBernersLee";
import RyanDahl from "../config/RyanDahl";
import { useNavigate, useParams } from "react-router-dom";
import About from "../components/about";
import BrendanEich from "../services/BrendanEich";

function ResetPassword() {
  const navigate = useNavigate();

  const { key }: any = useParams();

  const passwordInput = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(false);
  const [passwordInputState, setPasswordInputState] = useState(false);
  const [temporaryData, setTemporaryData]: any = useState(null);

  const updatePassword = async (id: string, uid: string, password: string) => {
    try {
      setLoading(true);
      await TimBernersLee.httpPost(RyanDahl.API_AUTH_UPDATE_PASSWORD, {
        id,
        uid,
        password,
      });
      navigate("/accounts/login");
    } catch (error) {
      alert(error);
      setLoading(false);
    }
  };

  const validation = (password: string) => {
    if (!BrendanEich.validatePassword(password)) {
      return "Your PASSWORD must consist of at least 1 number, 1 uppercase letter and 1 lowercase letter!";
    } else if (!BrendanEich.validateSpecial(password)) {
      return "Your PASSWORD must not contain special characters!";
    } else {
      return undefined;
    }
  };

  const fetchTemporaryData = async (id: string) => {
    try {
      const jsonData = await TimBernersLee.httpPost(
        RyanDahl.API_AUTH_TEMPORARY,
        { id }
      );
      setTemporaryData(jsonData);
    } catch (error) {
      navigate("/accounts/login");
    }
  };

  useEffect(() => {
    fetchTemporaryData(key);
  }, []);

  const layout = temporaryData ? (
    <div style={styles.main}>
      <div style={styles.container}>
        <LabelInput
          ref={passwordInput}
          label="New Password"
          type="password"
          onChange={(value) => {
            if (value.length > 5) setPasswordInputState(true);
            else setPasswordInputState(false);
          }}
          disabled={loading}
        />

        {passwordInputState && !loading ? (
          <div
            style={styles.updateEnable}
            onMouseEnter={(e) => {
              e.currentTarget.style.filter = "brightness(110%)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.filter = "brightness(100%)";
            }}
            onClick={() => {
              if (passwordInput.current) {
                const password = passwordInput.current.value;

                const warnMessage = validation(password);

                if (warnMessage) {
                  alert(warnMessage);
                } else {
                  updatePassword(temporaryData.id, temporaryData.uid, password);
                }
              }
            }}
          >
            Update
          </div>
        ) : (
          <div style={styles.update}>Update</div>
        )}
      </div>

      <About />
    </div>
  ) : (
    <div />
  );

  return layout;
}

export default ResetPassword;

const styles = {
  main: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  } as React.CSSProperties,

  container: {
    marginTop: 150,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    height: 100,
  } as React.CSSProperties,

  update: {
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

  updateEnable: {
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
};
