import { useContext, useEffect, useState } from "react";
import { RoofContext, RoofContextProps } from "../App";
import { socket } from "../pages/Safary";
import RoomService from "../services/RoomService";
import Room from "../components/RoomListItem";
import { SocketKeys } from "../objects/socket";
import RoomData from "../interface/room";

function RoomList() {
  const roof: RoofContextProps | null = useContext(RoofContext);
  const { matches, themeIcons, colors } = roof!;

  const authData = roof!.authData!;

  const [roomList, setRoomList] = useState([] as RoomData[]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    socket.on(SocketKeys.ON_DISPLAY, () => setCount(0));

    return () => {
      socket.off(SocketKeys.ON_DISPLAY);
    };
  }, []);

  useEffect(() => {
    roomsCount();
  }, []);

  useEffect(() => {
    if (!count) {
      roomListSetup();
      roomsCount();
    }
  }, [count]);

  const roomsCount = async () => {
    try {
      const jsonData = await RoomService.countAll(authData.fid);
      setCount(jsonData);
    } catch (error) {
      console.log(error);
    }
  };

  const roomListSetup = async () => {
    try {
      const jsonData: never[] = await RoomService.findAll(authData.fid, 10, 0);
      setRoomList(jsonData);
    } catch (error) {
      console.log(error);
    }
  };

  const roomListMore = async () => {
    try {
      SetIsLoading(true);
      if (roomList.length < count) {
        const jsonData: never[] = await RoomService.findAll(
          authData.fid,
          10,
          roomList.length
        );
        setRoomList((rl) => [...rl, ...jsonData]);
      }
      SetIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const [isLoading, SetIsLoading] = useState(false);
  const [lastElement, setLastElement] = useState(null);
  const [infinitieScrollState, setInfiniteScrollState] = useState(0);

  useEffect(() => {
    roomListMore();
  }, [infinitieScrollState]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((element) => {
        if (element.isIntersecting) {
          setInfiniteScrollState((n) => n + 1);
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

  const responsive = {
    main: {
      borderRight: matches ? null : "1px solid",
      borderColor: matches ? null : colors.border,
      minHeight: "100vh",
      flex: matches ? 1 : 0.25,
      flexDirection: "column",
      display: "flex",
      alignItems: "center",
      overflowY: "scroll",
      overflowX: "hidden",
    } as React.CSSProperties,

    list: {
      width: "100%",
      flex: 1,
      marginBottom: matches ? 90 : 0,
    } as React.CSSProperties,

    clear: {
      backgroundColor: "#393f4a",
      height: 70,
      width: 70,
      cursor: "pointer",
      userSelect: "none",
      borderRadius: 70,
      color: "white",
      alignItems: "center",
      justifyContent: "center",
      display: matches ? "none" : "flex",
    } as React.CSSProperties,

    counter: {
      width: 150,
      color: "white",
      userSelect: "none",
      fontSize: 25,
      display: matches ? "none" : "flex",
      justifyContent: "center",
    } as React.CSSProperties,

    input: {
      paddingLeft: 15,
      paddingRight: 15,
      width: matches ? "40%" : "75%",
      height: 80,
      fontSize: 17,
      color: "white",
      border: "none",
      outline: "none",
      backgroundColor: "transparent",
    } as React.CSSProperties,

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
    } as React.CSSProperties,

    username: {
      fontSize: matches ? 22 : 25,
      color: colors.text,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      userSelect: "none",
      cursor: "pointer",
    } as React.CSSProperties,

    title: {
      fontSize: 17,
      color: colors.text,
      width: "90%",
      minHeight: 50,
      display: "flex",
      alignItems: "center",
    } as React.CSSProperties,
  };

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

  return (
    <div className="hidebar" style={responsive.main}>
      <div style={styles.expend}>
        <div style={responsive.username}>
          {authData.username}
          <span className="material-symbols-outlined">expand_more</span>
        </div>
        <div style={styles.imageContainer}>
          <img style={styles.image} src={themeIcons.editing} />
        </div>
      </div>

      <div style={responsive.title}>Messages</div>

      <div style={responsive.list}>
        {roomList.map((room: RoomData, index: number) =>
          index === roomList.length - 1 &&
          !isLoading &&
          roomList.length < count ? (
            <Room ref={setLastElement} key={room.id} roomData={room} />
          ) : (
            <Room key={room.id} roomData={room} />
          )
        )}
        {isLoading && loadingComponent}
      </div>
    </div>
  );
}

export default RoomList;

const styles = {
  expend: {
    fontSize: 25,
    color: "white",
    width: "90%",
    minHeight: 75,
    display: "flex",
    userSelect: "none",
    alignItems: "center",
    justifyContent: "space-between",
  } as React.CSSProperties,

  right: {
    alignSelf: "center",
    height: "95%",
    flex: 1,
    display: "flex",
    flexDirection: "column",
  } as React.CSSProperties,

  imageContainer: {
    width: 30,
    height: 30,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  } as React.CSSProperties,

  image: {
    width: 20,
    height: 20,
  } as React.CSSProperties,

  loadingContainer: {
    alignSelf: "center",
    marginLeft: "auto",
    marginRight: "auto",
    padding: 25,
    width: 25,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  } as React.CSSProperties,

  loading: {
    height: 25,
    width: 25,
    fontSize: 25,
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    animation: "spin 500ms infinite linear",
  } as React.CSSProperties,
};
