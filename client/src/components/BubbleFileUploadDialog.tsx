import { useContext, useEffect, useRef, useState, CSSProperties } from "react";
import { RoofContext, RoofContextProps } from "../App";
import { socket } from "../pages//Safary";
import RyanDahl from "../config/RyanDahl";
import { SocketKeys, SocketMessage } from "../objects/socket";
import TimBernersLee from "../services/TimBernersLee";
import { RoomScreenContext, RoomScreenContextProps } from "../pages/roomscreen";
import BrendanEich from "../services/BrendanEich";
import PreFile from "../components/BubbleFileUploadDialogFilePreview";
import ShowFile from "../components/BubbleFileUploadDialogFileView";
import BubbleService from "../services/BubbleService";
import BubbleData from "../interface/bubble";

type FileDialogProps = {
  fileList: FileList;
  closeFileDialog: () => void;
  receiver_uid: string;
};

function FileDialog({
  fileList,
  closeFileDialog,
  receiver_uid,
}: FileDialogProps) {
  const roof: RoofContextProps | null = useContext(RoofContext);
  const { theme, matches, colors } = roof!;
  const authData = roof!.authData!;

  const roomscreen: RoomScreenContextProps | null =
    useContext(RoomScreenContext);
  const roomid = roomscreen!.roomid;

  const bubbleService = new BubbleService(socket);

  const [files, setFiles] = useState([] as File[]);

  const [selectedFileIndex, setSelectedFileIndex] = useState(0);

  const [isError, setIsError] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [per, setPer] = useState("0%");

  const textareaInput = useRef<HTMLTextAreaElement>(null);

  const controller = useRef(new AbortController());

  const inputValue = () => {
    if (textareaInput.current) {
      return textareaInput.current.value;
    }
    return "";
  };

  const cancelUpload = () => {
    controller.current.abort("Request aborted from client");
  };

  const uploadFile = async () => {
    try {
      const message = inputValue();

      let cleanMessage = BrendanEich.cleartext(message);

      let body: any = {
        message: cleanMessage,
        sender_uid: authData.uid,
        roomid: roomid,
        files: [],
      };

      for (let i = 0; i < files.length; i++) {
        body.files.push({
          file_name: files[i].name,
          file_size: files[i].size,
          file_type: files[i].type,
        });
      }

      setUploading(true);

      const jsonData = await TimBernersLee.axiosFormData(
        RyanDahl.API_BUBBLE_SEND_FILE,
        body,
        files,
        controller.current.signal,
        setPer
      );

      jsonData.data.map((bubble: BubbleData) => {
        socket.emit(SocketKeys.MESSAGE, {
          _id: bubble["_id"],
          sender_uid: authData.uid,
          receiver_uid: receiver_uid,
          message: cleanMessage,
          roomid: roomid,
          isSaveDb: false,
          file: bubble[`file`],
        });
      });

      closeFileDialog();
    } catch (error: any) {
      setUploading(false);
      setIsError(error.toString());
    }
  };

  const fileListToFiles = async () => {
    if (fileList.length !== files.length) {
      let resizedFiles: File[] = [];

      for (let i = 0; i < fileList.length; i++) {
        let file = fileList[i];

        if (BrendanEich.mimetype(file.type) === "image") {
          const resizedImageFile = await BrendanEich.resizedImageFile(
            file,
            854
          );
          resizedFiles.push(resizedImageFile);
        } else {
          resizedFiles.push(file);
        }
      }

      setFiles(resizedFiles);
    }
  };

  useEffect(() => {
    const handleAbort = () => closeFileDialog();

    controller.current.signal.addEventListener("abort", handleAbort);
    return () =>
      controller.current.signal.removeEventListener("abort", handleAbort);
  }, []);

  useEffect(() => {
    fileListToFiles();
  }, []);

  const responsive = {
    center: {
      backgroundColor: "#282c34",
      width: matches && "90vw",
      minWidth: !matches && 250,
      borderRadius: 10,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    } as React.CSSProperties,

    row: {
      width: "90%",
      minHeight: 60,
      display: "flex",
      justifyContent: uploading ? "center" : "space-between",
      alignItems: "center",
      color: colors.text,
    } as React.CSSProperties,

    container: {
      width: matches ? "100%" : 650,
      height: matches ? "70vw" : 400,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
    } as React.CSSProperties,

    button: {
      height: matches ? 40 : 50,
      fontSize: matches ? 13 : 15,
      color: "#316cd4",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      userSelect: "none",
      cursor: "pointer",
    } as React.CSSProperties,

    progress: {
      width: per,
      height: "100%",
      backgroundColor: "#4f5a70",
      borderRadius: 25,
    } as React.CSSProperties,

    fileList: {
      display: "flex",
      overflowX: "scroll",
      overflowY: "hidden",
      width: matches ? "100%" : 650,
      height: 150,
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
    <div style={responsive.center}>
      {isError && !uploading && <div style={responsive.row}>{isError}</div>}
      <div style={responsive.row}>
        {uploading ? (
          <div onClick={cancelUpload} style={responsive.button}>
            Cancel
          </div>
        ) : (
          <>
            <div onClick={closeFileDialog} style={responsive.button}>
              Close
            </div>

            <div onClick={uploadFile} style={responsive.button}>
              Send
            </div>
          </>
        )}
      </div>

      <div style={responsive.container}>
        {files[selectedFileIndex] ? (
          <ShowFile file={files[selectedFileIndex]} />
        ) : (
          loadingComponent
        )}
      </div>

      <div
        style={{
          width: "100%",
          height: 1,
          backgroundColor: "grey",
        }}
      />

      {files.length > 1 && (
        <div className="hidebar" style={responsive.fileList}>
          {files.map((file, i) => (
            <PreFile
              key={i}
              i={i}
              file={file}
              selectedFileIndex={selectedFileIndex}
              setSelectedFileIndex={setSelectedFileIndex}
            />
          ))}
        </div>
      )}

      <div
        style={{
          width: "100%",
          height: 1,
          backgroundColor: "grey",
        }}
      />

      <textarea
        ref={textareaInput}
        disabled={uploading}
        style={styles.textarea}
        placeholder="Message"
        id="file-des"
        maxLength={1000}
      />

      {uploading && (
        <div style={styles.progressContainer}>
          <div style={responsive.progress} />
          <div style={styles.percentage}>{per}</div>
        </div>
      )}
    </div>
  );
}

export default FileDialog;

const styles = {
  progressContainer: {
    width: "90%",
    height: 40,
    border: "1px solid #4f5a70",
    borderRadius: 25,
    color: "white",
    marginBottom: 25,
    position: "relative",
  } as CSSProperties,

  percentage: {
    position: "absolute",
    top: 12,
    right: 12,
    color: "#316cd4",
    fontSize: 15,
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

  error: {
    width: "100%",
    textAlign: "center",
    color: "white",
  } as CSSProperties,

  textarea: {
    backgroundColor: "#282c34",
    border: "none",
    outline: "none",
    color: "white",
    resize: "none",
    fontSize: 15,
    marginTop: 10,
    width: "95%",
    minHeight: 70,
  } as CSSProperties,

  send: {
    width: 50,
    height: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    userSelect: "none",
    cursor: "pointer",
    border: "1px solid grey",
    borderRadius: "50%",
  } as React.CSSProperties,
};
