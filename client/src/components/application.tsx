function Application() {
  return (
    <div style={styles.main}>
      <span style={styles.downloadLabel}>Download Application</span>
      <img style={styles.playstore} src="/wide/playstore.png" />
    </div>
  );
}

export default Application;

const styles = {
  main: {
    margin: 20,
    minHeight: 75,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  } as React.CSSProperties,

  downloadLabel: {
    fontSize: 15,
    color: "grey",
    userSelect: "none",
  } as React.CSSProperties,

  playstore: {
    width: 150,
    userSelect: "none",
    cursor: "pointer",
  } as React.CSSProperties,
};
