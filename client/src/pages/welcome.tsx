import { CSSProperties, useContext } from "react";
import { RoofContext, RoofContextProps } from "../App";

function Welcome() {
  const roof: RoofContextProps | null = useContext(RoofContext);
  const { theme, matches, colors, themeIcons } = roof!;

  const responsive = {
    main: {
      alignSelf: "center",
      flex: 1,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      color: colors.grey,
    } as CSSProperties,

    title: {
      margin: 10,
      fontSize: 20,
      color: colors.text,
    } as CSSProperties,
  };

  return (
    <div style={responsive.main}>
      <img style={styles.logo} src={themeIcons.nav_messenger} />
      <div style={responsive.title}>Your messages</div>
      <div style={styles.subtitle}>
        Send secret photos and messages to a friend
      </div>
    </div>
  );
}

export default Welcome;

const styles = {
  logo: {
    margin: 10,
    width: 75,
  } as CSSProperties,

  subtitle: {
    fontSize: 15,
  } as CSSProperties,
};
