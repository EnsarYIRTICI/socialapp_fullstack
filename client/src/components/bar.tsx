import { CSSProperties } from "react";

function Bar({ i, index, duration, progress }: any) {
  const responsive = {
    progress: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      borderRadius: 5,
      backgroundColor: "white",
      width:
        i === index
          ? `${(100 * progress) / duration}%`
          : i < index
          ? "100%"
          : 0,
    } as CSSProperties,
  };

  return (
    <div style={styles.bar}>
      <div style={responsive.progress} />
    </div>
  );
}

export default Bar;

const styles = {
  bar: {
    flex: 1,
    margin: 5,
    backgroundColor: "grey",
    height: 5,
    borderRadius: 5,
    position: "relative",
  } as CSSProperties,
};
