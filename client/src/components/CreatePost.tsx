import { useCallback, useContext, useRef, useState } from "react";
import { SafaryContext } from "../pages/Safary";
import { RoofContext, RoofContextProps } from "../App";
import RyanDahl from "../config/RyanDahl";
import HandleManager from "../services/BrendanEich";
import TimBernersLee from "../services/TimBernersLee";
import BrendanEich from "../services/BrendanEich";
import PostService from "../services/PostService";

function CreatePost() {
  const roof: RoofContextProps | null = useContext(RoofContext);
  const { theme, matches } = roof!;
  const authData = roof!.authData!;

  const { setCreatePost }: any = useContext(SafaryContext);

  const [file, setFile] = useState<File | null>(null);
  const [details, showDetails] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const sendPost = async (file: File) => {
    try {
      const resizedImageFile = await BrendanEich.resizedImageFile(file, 854);
      const description = textareaRef.current ? textareaRef.current.value : "";
      const view1 = HandleManager.timebased(file.name);
      await PostService.create(
        resizedImageFile,
        authData.uid,
        description,
        view1
      );
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const onFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      let file = files[0];
      if (BrendanEich.mimetype(file.type) === "image") {
        setFile(file);
        showImage(file);
      } else {
        alert("Invalid File Type");
      }
    }
  };

  const onFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    let file = files[0];
    if (BrendanEich.mimetype(file.type) === "image") {
      setFile(file);
      showImage(file);
    } else {
      alert("Invalid File Type");
    }
  };

  const showImage = (file: File) => {
    const fr = new FileReader();
    fr.onload = (e) => {
      if (imageRef.current && e.target) {
        if (typeof e.target.result == "string") {
          imageRef.current.src = e.target.result;
        }
      }
    };
    fr.readAsDataURL(file);
  };

  const responsive = {
    main: {
      borderRadius: matches ? 0 : 15,
      backgroundColor: "#282c34",
      color: "white",
      marginBottom: 20,
      userSelect: "none",
    } as React.CSSProperties,

    row: {
      display: "flex",
      flexDirection: matches && "column",
    } as React.CSSProperties,

    left: {
      width: matches ? "100vw" : 500,
      height: matches ? "50vh" : 500,
      fontSize: 20,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    } as React.CSSProperties,

    image: {
      maxWidth: matches ? "100%" : 500,
      maxHeight: matches ? "100%" : 500,
      objectFit: "contain",
    } as React.CSSProperties,

    help: {
      fontSize: matches && 15,
    } as React.CSSProperties,

    details: {
      width: matches ? "100%" : 250,
      height: matches ? "20vh" : 500,
      borderLeft: matches ? "0px solid" : "1px solid",
      borderColor: matches ? "transparent" : "#353a45",
      display: "flex",
    } as React.CSSProperties,

    textarea: {
      alignSelf: "center",
      backgroundColor: "#282c34",
      color: "white",
      resize: "none",
      width: matches ? "100%" : 250,
      height: matches ? "10vh" : 400,
      border: "none",
      outline: "none",
      fontSize: 17,
      padding: 25,
    } as React.CSSProperties,
  };

  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={onFileDrop}
      style={responsive.main}
    >
      <div style={styles.title}>
        {file && (
          <div style={styles.text} onClick={() => setCreatePost(false)}>
            Cancel
          </div>
        )}

        <div>Create new post</div>

        {file ? (
          details ? (
            <div style={styles.text} onClick={() => sendPost(file)}>
              Send
            </div>
          ) : (
            <div style={styles.text} onClick={() => showDetails(true)}>
              Next
            </div>
          )
        ) : null}
      </div>

      <div style={responsive.row}>
        <div style={responsive.left}>
          {file ? (
            <img ref={imageRef} style={responsive.image} />
          ) : (
            <div style={styles.dropzone}>
              <input
                ref={fileInputRef}
                onChange={onFileSelect}
                type="file"
                hidden
              />
              {/* <div style={responsive.help}>Drag photos and videos here</div> */}
              <div style={responsive.help}>Drag photos here</div>
              <div
                onClick={() => {
                  if (fileInputRef.current) fileInputRef.current.click();
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#3689b3";
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#3674b3";
                }}
                style={styles.select}
              >
                Choose from gallery
              </div>
            </div>
          )}
        </div>

        {details && (
          <div style={responsive.details}>
            <textarea
              ref={textareaRef}
              style={responsive.textarea}
              placeholder="enter description..."
            />
          </div>
        )}
      </div>

      {/* {matches && (
        <div style={styles.bottom}>
          <div onClick={() => setCreatePost(false)} style={styles.cross}>
            <span className="material-symbols-outlined">close</span>
          </div>
        </div>
      )} */}
    </div>
  );
}

const styles = {
  cross: {
    width: 50,
    height: 50,
    cursor: "pointer",
    color: "white",
    border: "1px solid",
    borderColor: "grey",
    borderRadius: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  } as React.CSSProperties,

  title: {
    height: 75,
    borderBottom: "1px solid",
    borderColor: "#353a45",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  } as React.CSSProperties,

  text: {
    width: 75,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    color: "#316cd4",
  } as React.CSSProperties,

  dropzone: {
    height: 625,
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  } as React.CSSProperties,

  select: {
    marginTop: 40,
    height: 40,
    width: 200,
    backgroundColor: "#3689b3",
    fontSize: 15,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    userSelect: "none",
    cursor: "pointer",
    borderRadius: 10,
  } as React.CSSProperties,

  bottom: {
    width: "100%",
    height: 100,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  } as React.CSSProperties,
};

export default CreatePost;
