function Google() {
  return (
    <div style={styles.googleContainer}>
      <img style={styles.googleImage} src="/128x128/google.png" />
      <span>Sign in with Google</span>
    </div>
  );
}

export default Google;

const styles = {
  googleContainer: {
    width: 170,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    userSelect: "none",
    cursor: "pointer",
  } as React.CSSProperties,

  googleImage: {
    width: 20,
    height: 20,
  } as React.CSSProperties,
};
