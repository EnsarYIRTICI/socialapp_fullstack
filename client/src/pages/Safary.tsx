import {
  createContext,
  useContext,
  useState,
  CSSProperties,
  useEffect,
} from "react";

import { RoomFinder } from "../pages/roomfinder";
import { RoofContext, RoofContextProps } from "../App";
import { Routes, Route, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

import Inbox from "./Inbox";
import Home from "./Home";
import Thing from "../components/Thing";
import User from "./User";
import Search from "../components/search";
import Notifications from "../components/notifications";
import Drawer from "../components/Drawer";

import Dialog from "../components/Dialog";
import CreatePost from "../components/CreatePost";
import ShowPost from "../components/ShowPost";
import LikeList from "../components/LikeList";
import PostOptions from "../components/PostOptions";
import CallVideo from "../components/CallVideo";
import Calling from "../components/Calling";

import MobileNavigation from "../components/BottomNavigationBar";
import DesktopNavigation from "../components/NavigationBar";
import CreateStory from "../components/CreateStory";
import ShowStory from "../components/ShowStory";
import StoryOption from "../components/StoryOption";
import Welcome from "../pages/welcome";

import Peer, { MediaConnection } from "peerjs";

import RyanDahl from "../config/RyanDahl";
import { SocketKeys } from "../objects/socket";

export const SafaryContext = createContext(null);

export const socket = io(RyanDahl.SOCKET_URL, {
  autoConnect: false,
  path: RyanDahl.SOCKET_PATH_INBOX,
});

function Safary() {
  const roof: RoofContextProps | null = useContext(RoofContext);
  const { theme, matches, colors } = roof!;
  const authData = roof!.authData!;

  const [drawer, setDrawer] = useState("none");

  const [createPost, setCreatePost] = useState(false);
  const [globalPost, setGlobalPost] = useState(null);
  const [postLikeList, setPostLikeList] = useState(null);
  const [postOption, setPostOption] = useState(null);
  const [storyOption, setStoryOption] = useState(null);

  const [createStory, setCreateStory] = useState(false);
  const [globalStory, setGlobalStory] = useState(null);
  const [ID_F, setID_F] = useState(null);

  const [peer, setPeer] = useState<Peer | null>(null);

  const [videos, setVideos] = useState([] as HTMLVideoElement[]);

  const [isCalling, setIsCalling] = useState(false);
  const [call, setCall] = useState<MediaConnection | null>(null);
  const [peerid, setPeerid] = useState<string | null>(null);

  useEffect(() => {
    setPeer(
      new Peer(authData.uid, {
        host: RyanDahl.HOST,
        port: RyanDahl.PEER_PORT,
        path: RyanDahl.PEER_PATH,
      })
    );
  }, []);

  useEffect(() => {
    if (peer) {
      peer.on("call", async (call) => {
        setCall(call);
        setIsCalling(true);
      });
    }
  }, [peer]);

  useEffect(() => {
    socket.connect();
    socket.emit(SocketKeys.JOIN, authData.uid);

    return () => {
      socket.emit(SocketKeys.LEAVE, authData.uid);
      socket.disconnect();
    };
  }, []);

  const responsive = {
    main: {
      backgroundColor: colors.background,
      width: "100vw",
      height: "100vh",
      display: "flex",
      flexDirection: matches && "column",
    } as CSSProperties,
  };

  const values: any = {
    setDrawer,
    setCreateStory,
    setCreatePost,
    setGlobalPost,
    setPostLikeList,
    setPostOption,
    setStoryOption,
    setID_F,
    setGlobalStory,
    setVideos,
    setPeerid,

    storyOption,
    drawer,
    createStory,
    createPost,
    globalPost,
    postLikeList,
    postOption,
    ID_F,
    globalStory,
    peer,
  };

  return (
    <SafaryContext.Provider value={values}>
      <div style={responsive.main}>
        {matches ? <MobileNavigation /> : <DesktopNavigation />}

        {drawer == "search" ? (
          <Drawer title={"Search"}>
            <Search />
          </Drawer>
        ) : drawer == "bell" ? (
          <Drawer title={"Notification"}>
            <Notifications />
          </Drawer>
        ) : null}

        <Routes>
          <Route path="*" element={<Thing />} />
          <Route path="/" element={<Home />} />
          <Route path="/inbox" element={<Inbox />}>
            <Route index={true} element={<Welcome />} />
            <Route path="room" element={<RoomFinder />} />
          </Route>
          <Route path="/user/:username" element={<User />} />

          {/* <Route path="/p/:postid" element={<PostDialog />} />
          <Route path="/s" element={<StoryDialog />} /> */}
        </Routes>

        {createStory && (
          <Dialog cross={() => setCreateStory(false)}>
            <CreateStory />
          </Dialog>
        )}

        {globalStory && (
          <Dialog
            darkness={matches ? 1 : null}
            cross={matches ? null : () => setGlobalStory(null)}
          >
            <ShowStory />
          </Dialog>
        )}

        {createPost && (
          <Dialog cross={() => setCreatePost(false)}>
            <CreatePost />
          </Dialog>
        )}

        {globalPost && (
          <Dialog
            darkness={matches ? 1 : null}
            cross={matches ? null : () => setGlobalPost(null)}
          >
            <ShowPost />
          </Dialog>
        )}

        {postLikeList && (
          <Dialog>
            <LikeList />
          </Dialog>
        )}

        {postOption && (
          <Dialog>
            <PostOptions />
          </Dialog>
        )}

        {storyOption && (
          <Dialog>
            <StoryOption />
          </Dialog>
        )}

        {isCalling && call ? (
          <Dialog>
            <Calling
              setVideos={setVideos}
              setIsCalling={setIsCalling}
              setCall={setCall}
              call={call}
            />
          </Dialog>
        ) : null}

        {videos.length > 0 || peerid ? (
          <Dialog>
            <CallVideo videos={videos} setVideos={setVideos} peerid={peerid} />
          </Dialog>
        ) : null}
      </div>
    </SafaryContext.Provider>
  );
}

export default Safary;

// function PostDialog() {
//   return (
//     <Dialog>
//       <ShowPost />
//     </Dialog>
//   );
// }

// function StoryDialog() {
//   return (
//     <Dialog>
//       <ShowStory />
//     </Dialog>
//   );
// }
