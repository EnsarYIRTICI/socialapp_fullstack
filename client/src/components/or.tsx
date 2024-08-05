function Or() {
  return (
    <div style={styles.orContainer}>
      <span style={styles.divider} />
      <div style={styles.or}>OR</div>
      <span style={styles.divider} />
    </div>
  );
}

export default Or;

const styles = {
  orContainer: {
    width: 275,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  } as React.CSSProperties,

  or: {
    fontSize: 13,
    color: "grey",
    userSelect: "none",
  } as React.CSSProperties,

  divider: {
    width: "35%",
    height: 1,
    backgroundColor: "#c2c0c0",
  } as React.CSSProperties,
};
