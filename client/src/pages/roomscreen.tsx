import {
  CSSProperties,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { RoofContext, RoofContextProps } from "../App";
import Bubble from "../components/bubble";
import EditDialog from "../components/BubbleEditDialog";
import FileDialog from "../components/BubbleFileUploadDialog";
import PhotoDialog from "../components/BubbleImageDialog";
import Dialog from "../components/Dialog";
import { SafaryContext, socket } from "../pages/Safary";
import RyanDahl from "../config/RyanDahl";
import {
  SocketKeys,
  SocketMessage,
  SocketUpdateMessage,
  SocketWriting,
} from "../objects/socket";
import { BubbleGlobal } from "../objects/bubble";
import BubbleData from "../interface/bubble";
import { RoomScreenProps } from "./roomfinder";
import BrendanEich from "../services/BrendanEich";
import BubbleService from "../services/BubbleService";
import RoomManagment from "../components/roommanagment";

export type RoomScreenContextProps = {
  setPhotoSource: Function;
  setBubbleGlobal: Function;
  setSelectionMode: Function;

  selectionMode: boolean;
  photoSource: string | null;
  roomid: string;
  bubbleGlobal: BubbleGlobal | null;
};

export const RoomScreenContext = createContext<RoomScreenContextProps | null>(
  null
);

function RoomScreen({ roomid, userData, ID_F }: RoomScreenProps) {
  const roof: RoofContextProps | null = useContext(RoofContext);
  const { matches, colors, themeIcons } = roof!;
  const authData = roof!.authData!;

  const { setPeerid }: any = useContext(SafaryContext);

  const userImage = userData.image
    ? RyanDahl.URL_MEDIA_USER(userData.uid, userData.image)
    : themeIcons.nav_user;

  const bubbleService = new BubbleService(socket);

  const sendButtonRef = useRef<HTMLDivElement>(null);
  const messageInputRef = useRef<HTMLInputElement>(null);
  const bubbleListRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const scrollDownButtonRef = useRef<HTMLSpanElement>(null);

  const navigate = useNavigate();
  const navigateUserProfile = () => navigate(`/user/${userData.username}`);
  const navigateBack = () => navigate(-1);

  const [selectionMode, setSelectionMode] = useState(false);
  const [managment, setManagment] = useState(false);

  const [bubbleList, setBubbleList] = useState([] as BubbleData[]);
  const [count, setCount] = useState(0);
  const [countPrev, setCountPrev] = useState(0);

  const [bubbleGlobal, setBubbleGlobal] = useState(null);
  const [photoSource, setPhotoSource] = useState(null);

  const [fileList, setFileList] = useState<FileList | null>();

  const [firstElement, setFirstElement] = useState<HTMLDivElement | undefined>(
    undefined
  );

  const showFileUploadMenu = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFileList(e.target.files);

  const openFilePicker = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const closeManagment = () => setManagment(false);
  const openManagment = () => setManagment(true);

  const closeSelectionMode = () => setSelectionMode(false);

  const onPressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (sendButtonRef.current && e.key == "Enter") {
      sendButtonRef.current.click();
    }
  };

  const call = async () => setPeerid(userData.uid);

  const closeFileDialog = () => {
    if (fileInputRef.current) {
      clearInput(fileInputRef.current);
      setFileList(null);
    }
  };

  const closePhotoDialog = () => {
    setPhotoSource(null);
  };

  const clearInput = (inputElement: HTMLInputElement) => {
    let nullValue: any = null;
    inputElement.value = nullValue;
  };

  const messageInputValue = () => {
    if (messageInputRef.current) {
      const message = messageInputRef.current.value;
      clearInput(messageInputRef.current);
      return message;
    }
    return "";
  };

  const scrollDownButtonVisible = (
    e: React.UIEvent<HTMLDivElement, UIEvent>
  ) => {
    if (scrollDownButtonRef.current) {
      if (e.currentTarget.scrollTop <= -300) {
        scrollDownButtonRef.current.style.display = "flex";
      } else {
        scrollDownButtonRef.current.style.display = "none";
      }
    }
  };

  const scrollBase = () => {
    if (firstElement) {
      firstElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollBase();
  }, [firstElement]);

  useEffect(() => {
    socket.emit(SocketKeys.JOIN, roomid);

    socket.on(SocketKeys.ON_MESSAGE, (bubble) => {
      setBubbleList((prevData) => [bubble, ...prevData]);
      setCount((prevCount) => prevCount + 1);
    });

    socket.on(SocketKeys.ON_WRITING, () => writingDelay());

    socket.on(SocketKeys.ON_UPDATE_MESSAGE, (data: SocketUpdateMessage) => {
      updateBubble(data._id, data.message);
    });

    return () => {
      socket.off(SocketKeys.ON_WRITING);
      socket.off(SocketKeys.ON_MESSAGE);
      socket.off(SocketKeys.ON_UPDATE_MESSAGE);
      socket.emit(SocketKeys.LEAVE, roomid);
    };
  }, []);

  const [writing, setWriting] = useState(false);

  let timeOut: NodeJS.Timeout | undefined;

  const writingDelay = () => {
    if (timeOut) clearTimeout(timeOut);
    setWriting(true);
    timeOut = setTimeout(() => {
      setWriting(false);
    }, 1000);
  };

  const sendWriting = () => {
    bubbleService.socketWriting(roomid, authData.uid, userData.uid);
  };

  // const setupRoom = async () => {
  //   try {
  //     if (countPrev === 0) {
  //       const jsonData = await bubbleService.findAll(20, 0, roomid);
  //       setBubbleList([...jsonData]);
  //     } else if (count < countPrev) {
  //       setBubbleList([]);
  //     } else {
  //       const lim = count - countPrev;
  //       const jsonData = await bubbleService.findAll(lim, 0, roomid);
  //       setBubbleList((bl: BubbleData[]) => [...jsonData, ...bl]);
  //     }
  //     setCountPrev(count);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const fetchBubbleCount = async () => {
    try {
      const jsonData = await bubbleService.count(roomid);
      setCount(jsonData);
    } catch (error) {
      console.log(error);
    }
  };

  const setupRoom = async () => {
    try {
      if (count === 0) {
        const jsonData = await bubbleService.findAll(20, 0, roomid);
        setBubbleList([...jsonData]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBubbleCount();
  }, []);

  useEffect(() => {
    setupRoom();
  }, []);

  const sendBubble = async () => {
    try {
      const message = messageInputValue();
      const cleanMessage = BrendanEich.cleartext(message);
      if (cleanMessage.length > 0) {
        // await bubbleService.send(cleanMessage, authData.uid, roomid);
        // bubbleService.socketSend(roomid, authData.uid, userData.uid);

        socket.emit(SocketKeys.MESSAGE, {
          sender_uid: authData.uid,
          message: cleanMessage,
          roomid: roomid,
        });
      }
    } catch (error) {
      alert(error);
    }
  };

  const updateBubble = (_id: string, message: string) => {
    setBubbleList((bl: BubbleData[]) => {
      const index = bl.findIndex((bubble: BubbleData) => bubble._id === _id);
      bl[index].message = message;
      bl[index].edited = true;
      return [...bl];
    });
  };

  const [observerState, setObserverState] = useState(0);
  const [loading, setLoading] = useState(false);
  const [lastElement, setLastElement] = useState(undefined);

  const findBubblesMore = async () => {
    setLoading(true);
    console.log(count);
    if (bubbleList.length < count) {
      const set = bubbleList.length;
      const jsonData = await bubbleService.findMore(20, set, roomid);
      setBubbleList((bl: BubbleData[]) => [...bl, ...jsonData]);
    }
    setLoading(false);
  };

  useEffect(() => {
    findBubblesMore();
  }, [observerState]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((element) => {
        if (element.isIntersecting) {
          setObserverState((s) => s + 1);
        }
      });
    });

    if (lastElement) {
      observer.observe(lastElement);
    }

    return () => {
      if (lastElement) {
        observer.unobserve(lastElement);
      }
    };
  }, [lastElement]);

  const loadingComponent = (
    <div style={styles.loadingContainer}>
      <span
        style={styles.loading}
        id="loading"
        className="material-symbols-outlined"
      >
        progress_activity
      </span>
    </div>
  );

  const writingComponent = <div style={styles.writing}>...writing</div>;

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
      cursor: "pointer",
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
    <RoomScreenContext.Provider
      value={{
        setPhotoSource,
        setBubbleGlobal,
        setSelectionMode,

        selectionMode,
        photoSource,
        roomid,
        bubbleGlobal,
      }}
    >
      <div style={responsive.main}>
        <input
          ref={fileInputRef}
          type="file"
          onChange={showFileUploadMenu}
          hidden
          multiple
        />

        <div style={responsive.appbar}>
          <div style={styles.inbar}>
            <div style={styles.barleft}>
              {matches && (
                <span
                  onClick={navigateBack}
                  style={styles.back}
                  className="material-symbols-outlined"
                >
                  arrow_back_ios
                </span>
              )}
              <div style={styles.userData} onClick={navigateUserProfile}>
                <div style={styles.imageContainer}>
                  <img
                    style={
                      userData.image ? styles.userImage : styles.emptyImage
                    }
                    src={userImage}
                  />
                </div>
                <div>
                  <div style={responsive.displayname}>
                    {userData.displayname}
                  </div>
                  {writing && writingComponent}
                </div>
              </div>
            </div>
            <div>
              <img
                onClick={() => alert("empty")}
                style={styles.phone}
                src={themeIcons.telephone}
              />
              <img
                onClick={call}
                style={styles.camera}
                src={themeIcons.video_camera}
              />
            </div>
          </div>
        </div>

        <span
          ref={scrollDownButtonRef}
          onClick={scrollBase}
          style={responsive.down}
          className="material-symbols-outlined"
        >
          expand_more
        </span>

        <div
          ref={bubbleListRef}
          className="hidebar"
          style={responsive.list}
          onScroll={scrollDownButtonVisible}
        >
          {bubbleList.map((bubbleData: BubbleData, i: number) => {
            return bubbleData.creation_date.substring(5, 10) !=
              bubbleList[i + 1]?.creation_date.substring(5, 10) ? (
              i === bubbleList.length - 1 &&
              !loading &&
              bubbleList.length < count ? (
                <Bubble
                  ref={setLastElement}
                  parseData={bubbleData.creation_date.substring(5, 10)}
                  key={bubbleData._id}
                  index={i}
                  bubbleData={bubbleData}
                />
              ) : i === 0 ? (
                <Bubble
                  ref={setFirstElement}
                  parseData={bubbleData.creation_date.substring(5, 10)}
                  key={bubbleData._id}
                  index={i}
                  bubbleData={bubbleData}
                />
              ) : (
                <Bubble
                  parseData={bubbleData.creation_date.substring(5, 10)}
                  key={bubbleData._id}
                  index={i}
                  bubbleData={bubbleData}
                />
              )
            ) : i === bubbleList.length - 1 &&
              !loading &&
              bubbleList.length <= count ? (
              <Bubble
                ref={setLastElement}
                key={bubbleData._id}
                index={i}
                bubbleData={bubbleData}
              />
            ) : i === 0 ? (
              <Bubble
                ref={setFirstElement}
                key={bubbleData._id}
                index={i}
                bubbleData={bubbleData}
              />
            ) : (
              <Bubble key={bubbleData._id} index={i} bubbleData={bubbleData} />
            );
          })}
          {loading && loadingComponent}
        </div>

        {selectionMode ? (
          <div
            style={{
              height: 75,
              marginTop: 10,
              marginBottom: 25,
              color: colors.text,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-around",
              userSelect: "none",
            }}
          >
            <div
              style={{
                height: 1,
                backgroundColor: colors.border,
                width: "100%",
              }}
            ></div>
            <span
              onClick={closeSelectionMode}
              style={{
                cursor: "pointer",
              }}
              className="material-symbols-outlined"
            >
              close
            </span>
          </div>
        ) : (
          <div style={responsive.inputContainer}>
            {managment && (
              <RoomManagment
                closeManagment={closeManagment}
                openFilePicker={openFilePicker}
              />
            )}

            <div onClick={openManagment} style={responsive.button}>
              <span className="material-symbols-outlined">description</span>
            </div>
            <input
              ref={messageInputRef}
              style={responsive.input}
              onChange={sendWriting}
              onKeyUp={onPressEnter}
              maxLength={1000}
              type="text"
              placeholder="Message"
            />
            <div
              ref={sendButtonRef}
              style={responsive.button}
              onClick={sendBubble}
            >
              <span className="material-symbols-outlined">send</span>
            </div>
          </div>
        )}

        {fileList && fileList.length > 0 && (
          <Dialog>
            <FileDialog
              fileList={fileList}
              closeFileDialog={closeFileDialog}
              receiver_uid={userData.uid}
            />
          </Dialog>
        )}

        {bubbleGlobal && (
          <Dialog>
            <EditDialog />
          </Dialog>
        )}

        {photoSource && (
          <Dialog press={closePhotoDialog}>
            <PhotoDialog />
          </Dialog>
        )}
      </div>
    </RoomScreenContext.Provider>
  );
}

export default RoomScreen;

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
    border: "1px solid",
    borderColor: "grey",
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
    height: 27,
    width: 27,
    cursor: "pointer",
    marginRight: 28,
  } as CSSProperties,

  camera: {
    height: 30,
    width: 30,
    cursor: "pointer",
  } as CSSProperties,
};
