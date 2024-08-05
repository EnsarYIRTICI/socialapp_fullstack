import { useContext, useEffect, useRef } from "react";
import { RoofContext, RoofContextProps } from "../App";
import { socket } from "../pages/Safary";
import { SocketKeys, SocketUpdateMessage } from "../objects/socket";
import BubbleService from "../services/BubbleService";
import { RoomScreenContext, RoomScreenContextProps } from "../pages/roomscreen";
import BrendanEich from "../services/BrendanEich";

function EditDialog() {
  const roof: RoofContextProps | null = useContext(RoofContext);
  const { theme, matches } = roof!;

  const roomscreen: RoomScreenContextProps | null =
    useContext(RoomScreenContext);
  const { roomid, setBubbleGlobal } = roomscreen!;

  const bubbleGlobal = roomscreen?.bubbleGlobal!;

  const bubbleService = new BubbleService(socket);

  const textarea = useRef<HTMLTextAreaElement>(null);

  const editBubble = async (message: string, id: string) => {
    try {
      const cleanMessage = BrendanEich.cleartext(message);
      await bubbleService.update(
        id,
        cleanMessage,
        roomid,
        bubbleGlobal.sendate,
        bubbleGlobal.sender
      );
      setBubbleGlobal(null);
      socketUpdateBubble(id, cleanMessage);
    } catch (error) {
      console.log(error);
    }
  };

  const socketUpdateBubble = (id: string, message: string) => {
    socket.emit(
      SocketKeys.UPDATE_MESSAGE,
      new SocketUpdateMessage(id, roomid, message)
    );
  };

  const putText = () => {
    if (textarea.current) {
      textarea.current.value = bubbleGlobal.message;
    }
  };

  useEffect(() => {
    putText();
  }, []);

  const responsive = {
    main: {
      borderRadius: 10,
      backgroundColor: "#282c34",
      height: matches ? 350 : 650,
      width: matches ? 300 : 500,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-around",
    } as React.CSSProperties,

    textarea: {
      borderRadius: 10,
      backgroundColor: "#282c34",
      color: "white",
      resize: "none",
      height: matches ? 250 : 550,
      width: matches ? 250 : 430,
      border: "none",
      outline: "none",
      fontSize: 17,
    } as React.CSSProperties,
  };

  return (
    <div style={responsive.main}>
      <div style={styles.title}>
        <div onClick={() => setBubbleGlobal(null)} style={styles.button}>
          Cancel
        </div>
        <div
          onClick={() => {
            if (textarea.current) {
              const message = textarea.current.value;
              textarea.current.value = "";
              editBubble(message, bubbleGlobal._id);
            }
          }}
          style={styles.button}
        >
          Update
        </div>
      </div>
      <textarea
        ref={textarea}
        style={responsive.textarea}
        id="ums-input"
        placeholder="Message..."
        maxLength={1000}
      />
    </div>
  );
}

export default EditDialog;

const styles = {
  title: {
    height: 70,
    borderColor: "#353a45",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "90%",
    color: "white",
  } as React.CSSProperties,

  button: {
    fontSize: 15,
    width: 75,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    userSelect: "none",
    cursor: "pointer",
    color: "#316cd4",
  } as React.CSSProperties,
};
