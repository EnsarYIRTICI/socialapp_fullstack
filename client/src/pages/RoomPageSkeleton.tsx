import React, { CSSProperties, useContext } from "react";
import { RoofContextProps, RoofContext } from "../App";

import "../styles/RoomPageSkeleton.css";

export default function RoomPageSkeleton() {
  const roof: RoofContextProps | null = useContext(RoofContext);
  const { matches, colors, themeIcons } = roof!;

  const responsive = {
    main: {
      backgroundColor: colors.background,
      alignSelf: "center",
      height: "100%",
      flex: 1,
      display: "flex",
      flexDirection: "column",
      position: matches && "fixed",
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
      zIndex: matches && 3,
    } as CSSProperties,

    appbar: {
      backgroundColor: colors.background,
      height: 75,
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderBottom: "1px solid",
      borderColor: colors.border,
    } as CSSProperties,

    list: {
      backgroundColor: colors.background,
      overflowY: "scroll",
      width: "100%",
      flex: 1,
      scrollBehavior: "smooth",
      display: "flex",
      flexDirection: "column-reverse",
    } as CSSProperties,

    down: {
      backgroundColor: "#393f4a",
      color: "white",
      width: 50,
      height: 40,
      fontSize: 30,
      position: "absolute",
      bottom: matches ? 150 : 200,
      right: matches ? 25 : 75,
      borderRadius: 10,
      display: "none",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      userSelect: "none",
      zIndex: 1,
    } as CSSProperties,

    inputContainer: {
      backgroundColor: colors.background,
      marginTop: 10,
      marginBottom: 25,
      border: "1px solid",
      borderColor: colors.border,
      borderRadius: 35,
      height: 75,
      width: "90%",
      alignSelf: "center",
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",

      position: "relative",
    } as CSSProperties,

    input: {
      width: matches ? "45%" : "75%",
      height: 70,
      fontSize: 17,
      color: colors.text,
      border: "none",
      outline: "none",
      backgroundColor: "transparent",
    } as CSSProperties,

    button: {
      backgroundColor: "#393f4a",
      height: 60,
      width: 60,
      userSelect: "none",
      borderRadius: 60,
      color: "white",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    } as CSSProperties,

    displayname: {
      fontSize: 17,
      color: colors.text,
      marginLeft: 10,
    } as CSSProperties,
  };

  return (
    <div style={responsive.main}>
      <div style={responsive.appbar}>
        <div style={styles.inbar}>
          <div style={styles.barleft}>
            {matches && (
              <span style={styles.back} className="material-symbols-outlined">
                arrow_back_ios
              </span>
            )}
            <div style={styles.userData}>
              <div
                className="skeleton-container"
                style={styles.imageContainer}
              />
              <div
                style={{
                  marginLeft: 15,
                  width: 125,
                  height: 25,
                  borderRadius: 10,
                }}
                className="skeleton-container"
              >
                <div style={responsive.displayname}></div>
              </div>
            </div>
          </div>
          <div style={{ display: "flex" }}>
            <div className="skeleton-container" style={styles.phone} />
            <div className="skeleton-container" style={styles.camera} />
          </div>
        </div>
      </div>

      <span style={responsive.down} className="material-symbols-outlined">
        expand_more
      </span>

      <div className="hidebar" style={responsive.list}></div>

      <div className="skeleton-container" style={responsive.inputContainer}>
        <input style={responsive.input} maxLength={1000} type="text" disabled />
      </div>
    </div>
  );
}

const styles = {
  inbar: {
    width: "90%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  } as CSSProperties,

  barleft: {
    display: "flex",
    alignItems: "center",
    userSelect: "none",
  } as CSSProperties,

  userData: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    position: "relative",
  } as CSSProperties,

  emptyImage: {
    height: 20,
    width: 20,
  } as CSSProperties,

  userImage: {
    height: 45,
    width: 45,
    borderRadius: "100%",
    objectFit: "cover",
  } as CSSProperties,

  imageContainer: {
    width: 45,
    height: 45,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 35,
  } as CSSProperties,

  loadingContainer: {
    alignSelf: "center",
    padding: 25,
    width: 25,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  } as CSSProperties,

  loading: {
    height: 25,
    width: 25,
    fontSize: 25,
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    animation: "spin 500ms infinite linear",
  } as CSSProperties,

  back: {
    width: 40,
    height: 40,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 25,
    color: "white",
    userSelect: "none",
    cursor: "pointer",
  } as CSSProperties,

  writing: {
    alignSelf: "flex-end",
    color: "#dbdbdb",
    marginLeft: 10,
    fontSize: 13,
  } as CSSProperties,

  phone: {
    height: 30,
    width: 30,
    cursor: "pointer",
    marginRight: 30,
    borderRadius: 10,
  } as CSSProperties,

  camera: {
    height: 30,
    width: 30,
    cursor: "pointer",
    borderRadius: 10,
  } as CSSProperties,
};
