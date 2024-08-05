import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { RoofContext, RoofContextProps } from "../App";
import Profile from "../pages/profile";
import UserService from "../services/UserService";

function User() {
  const { username } = useParams<string>();
  const roof: RoofContextProps | null = useContext(RoofContext);
  const authData = roof!.authData!;

  const [profile, setProfile] = useState<
    { error: string | undefined } | undefined
  >(undefined);

  const profileSetup = async () => {
    try {
      setProfile(undefined);
      const jsonData = await UserService.userProfile(
        20,
        0,
        authData.uid,
        username!
      );
      setProfile(jsonData);
    } catch (error) {
      let _error = error as Error;
      setProfile({ error: _error.message });
    }
  };

  useEffect(() => {
    profileSetup();
  }, [username]);

  const profilComponent = profile ? (
    profile.error ? (
      <div style={styles.error}>{profile.error}</div>
    ) : (
      <Profile profile={profile} />
    )
  ) : (
    <div style={styles.undefined} />
  );
  return profilComponent;
}

export default User;

const styles = {
  error: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    userSelect: "none",
    color: "white",
    fontSize: 40,
  } as React.CSSProperties,

  undefined: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  } as React.CSSProperties,
};
