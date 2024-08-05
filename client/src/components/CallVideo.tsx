import { useContext, useEffect, useRef } from "react";
import { SafaryContext } from "../pages/Safary";
import Peer from "peerjs";

type CallVideoProps = {
  videos: HTMLVideoElement[];
  setVideos: Function;
  peerid: string | null;
};

function CallVideo({ videos, setVideos, peerid }: CallVideoProps) {
  const safaryContext: any = useContext(SafaryContext);
  const peer: Peer = safaryContext.peer;

  const videoListRef = useRef<HTMLDivElement>(null);

  const createVideoStream = async () => {
    const video = document.createElement("video");
    video.muted = true;

    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });

    video.srcObject = stream;

    video.addEventListener("loadedmetadata", () => {
      video.play();
    });

    return video;
  };

  const sendCall = async (peerID: string) => {
    try {
      let myVideo = await createVideoStream();
      setVideos((vl: HTMLVideoElement[]) => [...vl, myVideo]);

      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      const video = document.createElement("video");
      video.muted = true;

      console.log("PEER", peer);

      console.log("MYPEERID", peer.id);
      console.log("YOURPEERID", peerID);

      const call = peer.call(peerID, stream);

      call.on("stream", (userVideoStream: MediaStream) => {
        video.srcObject = userVideoStream;
        setVideos((vl: HTMLVideoElement[]) => [...vl, video]);
      });

      video.addEventListener("loadedmetadata", () => {
        video.play();
      });

      call.on("close", () => {
        video.remove();
        setVideos([]);
      });
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    if (videoListRef.current) {
      for (let i = 0; i < videos.length; i++) {
        videoListRef.current.append(videos[i]);
      }
    }
  }, [videoListRef.current, videos]);

  useEffect(() => {
    if (peerid) sendCall(peerid);
  }, [peerid]);

  return <div ref={videoListRef}></div>;
}

export default CallVideo;
