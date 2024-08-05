import { forwardRef, useContext, useEffect, useState } from "react";
import RyanDahl from "../config/RyanDahl";
import { useNavigate, useParams } from "react-router-dom";
import { RoofContext, RoofContextProps } from "../App";
import { SafaryContext, socket } from "../pages/Safary";
import RoomData from "../interface/room";

interface RoomProps {
  roomData: RoomData;
}

const Room = forwardRef(({ roomData }: RoomProps, ref: any) => {
  const roof: RoofContextProps | null = useContext(RoofContext);
  const { matches, colors, themeIcons } = roof!;

  const { ID_F, setID_F }: any = useContext(SafaryContext);
  const [writing, setWriting] = useState(false);

  const navigate = useNavigate();

  const fid = roomData.fid;
  const uid = roomData.uid;
  const image = roomData.image;
  const username = roomData.username;
  const displayname = roomData.displayname;

  const colorState = ID_F === fid ? colors.room : "transparent";

  let timeOut: NodeJS.Timeout | undefined;

  const navigateRoom = (fid: string) => {
    setID_F(fid);
    navigate(`/inbox/room`);
  };

  const writingDelay = () => {
    if (timeOut) clearTimeout(timeOut);
    setWriting(true);
    timeOut = setTimeout(() => {
      setWriting(false);
    }, 1000);
  };

  useEffect(() => {
    socket.on(uid, () => writingDelay());

    return () => {
      socket.off(uid);
    };
  }, []);

  const responsive = {
    main: {
      height: 85,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      userSelect: "none",
      cursor: "pointer",
      textDecoration: "none",
      backgroundColor: colorState,
    } as React.CSSProperties,

    message: {
      width: matches ? "60vw" : "10vw",
      display: "inline-block",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      color: "#b5b5b5",
      fontSize: 13,
    } as React.CSSProperties,

    writing: {
      color: "#dbdbdb",
      fontSize: 13,
    } as React.CSSProperties,

    displayname: {
      fontSize: 15,
      marginBottom: 5,
      color: colors.text,
    } as React.CSSProperties,
  };

  const writingComponent = <div style={responsive.writing}>...writing</div>;

  return (
    <div
      ref={ref}
      onClick={() => navigateRoom(fid)}
      style={responsive.main}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = colorState;
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = colors.room;
      }}
    >
      <div style={styles.displayContainer}>
        <div style={styles.imageContainer}>
          <img
            style={image ? styles.userImage : styles.emptyImage}
            src={
              image
                ? RyanDahl.URL_USER_MEDIA + uid + "/" + image
                : themeIcons.nav_user
            }
          />
        </div>

        <div style={styles.infoContainer}>
          <div style={responsive.displayname}>{displayname}</div>
          {writing ? (
            writingComponent
          ) : (
            <div style={responsive.message}>{roomData.displaymessage}</div>
          )}
        </div>
        <div style={styles.time}>
          {roomData.creation_date.substring(11, 16)}
        </div>
      </div>
    </div>
  );
});

export default Room;

const styles = {
  displayContainer: {
    width: "90%",
    display: "flex",
    alignItems: "center",
  } as React.CSSProperties,

  emptyImage: {
    margin: 30,
    height: 25,
    width: 25,
  } as React.CSSProperties,

  userImage: {
    height: 55,
    width: 55,
    borderRadius: 30,
    objectFit: "cover",
  } as React.CSSProperties,

  imageContainer: {
    width: 55,
    height: 55,
    border: "1px solid",
    borderColor: "grey",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
  } as React.CSSProperties,

  infoContainer: {
    color: "white",
    display: "flex",
    flexDirection: "column",
    marginLeft: 10,
    marginRight: 10,
  } as React.CSSProperties,

  time: {
    marginLeft: "auto",
    color: "#dbdbdb",
    fontSize: 11,
  } as React.CSSProperties,
};
