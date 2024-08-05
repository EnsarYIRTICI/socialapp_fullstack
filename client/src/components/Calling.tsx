import { useContext, useEffect } from "react";
import { MediaConnection } from "peerjs";
import { RoofContextProps, RoofContext } from "../App";

type CallingProp = {
  setVideos: Function;
  setIsCalling: Function;
  setCall: Function;
  call: MediaConnection;
};

export default function Calling({
  setVideos,
  setIsCalling,
  setCall,
  call,
}: CallingProp) {
  const roof: RoofContextProps | null = useContext(RoofContext);
  const { themeIcons } = roof!;

  const responsive = {
    main: {
      width: 500,
      height: 500,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-around",
      backgroundColor: "#383842",
      flexDirection: "column",
      borderRadius: 15,
    } as React.CSSProperties,

    warn: {
      color: "white",
      fontSize: 19,
    } as React.CSSProperties,

    buttonContainer: {
      display: "flex",
      justifyContent: "space-around",
      width: "90%",
    } as React.CSSProperties,

    close: {
      height: 75,
      width: 75,
      borderRadius: "100%",
      backgroundColor: "#a34c49",
      color: "white",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      userSelect: "none",
      cursor: "pointer",
    } as React.CSSProperties,

    open: {
      height: 75,
      width: 75,
      borderRadius: "100%",
      backgroundColor: "#55a36a",
      color: "white",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      userSelect: "none",
      cursor: "pointer",
    } as React.CSSProperties,
  };

  const answerCall = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      call.answer(stream);

      const myVideo = document.createElement("video");
      myVideo.muted = true;

      myVideo.srcObject = stream;

      myVideo.addEventListener("loadedmetadata", () => {
        myVideo.play();
      });

      setVideos((vl: HTMLVideoElement[]) => [...vl, myVideo]);

      const video = document.createElement("video");
      video.muted = true;

      call.on("stream", (userVideoStream: any) => {
        video.srcObject = userVideoStream;
      });

      video.addEventListener("loadedmetadata", () => {
        video.play();
      });

      setVideos((vl: HTMLVideoElement[]) => [...vl, video]);

      setIsCalling(false);
    } catch (error) {
      alert(error);
    }
  };

  const closeCall = () => {
    call.close();
    setIsCalling(false);
    setCall(null);
  };

  return (
    <div style={responsive.main}>
      <img src={themeIcons.nav_user} />
      <div style={responsive.warn}>Incoming Call</div>
      <div style={responsive.buttonContainer}>
        <div onClick={closeCall} style={responsive.close}>
          <span className="material-symbols-outlined">close</span>
        </div>
        <div onClick={answerCall} style={responsive.open}>
          <span className="material-symbols-outlined">wifi_calling_3</span>
        </div>
      </div>
    </div>
  );
}
