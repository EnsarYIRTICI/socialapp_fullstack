import { CSSProperties, useContext, useRef, useState } from "react";
import { RoofContextProps, RoofContext } from "../App";
import RyanDahl from "../config/RyanDahl";
import BrendanEich from "../services/BrendanEich";
import StoryService from "../services/StoryService";

function CreateStory() {
  const roof: RoofContextProps | null = useContext(RoofContext);
  const { theme, matches } = roof!;
  const authData = roof!.authData!;

  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const storyService = new StoryService();

  const [file, setFile] = useState<File | undefined>();

  const responsive = {
    help: {
      fontSize: matches && 15,
    } as React.CSSProperties,
  };

  const createStory = async (file: File, uid: string) => {
    try {
      await storyService.create(file, uid);
    } catch (error) {
      alert(error);
    } finally {
      window.location.reload();
    }
  };

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      let file = files[0];
      onFileIsReady(file);
    }
  };

  const onFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    let file = files[0];
    onFileIsReady(file);
  };

  const onFileIsReady = (file: File) => {
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
        if (typeof e.target.result === "string") {
          imageRef.current.src = e.target.result;
        }
      }
    };
    fr.readAsDataURL(file);
  };

  const openFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={onFileDrop}
      style={styles.main}
    >
      <input
        ref={fileInputRef}
        onChange={onFileInputChange}
        hidden
        type="file"
      />

      <div style={styles.topBar}>
        <div>Share Story</div>
      </div>

      <div style={styles.dropzone}>
        {file ? (
          <img style={styles.showImage} ref={imageRef} />
        ) : (
          <>
            {/* <div style={responsive.help}>Drag photos and videos here</div> */}
            <div style={responsive.help}>Drag photos here</div>
            <div
              onClick={() => openFileInput()}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#344880";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#425896";
              }}
              style={styles.select}
            >
              Choose from gallery
            </div>
          </>
        )}
      </div>

      {file && (
        <div style={styles.bottomBar}>
          <div
            onClick={() => createStory(file, authData.uid)}
            style={styles.send}
          >
            <span className="material-symbols-outlined">send</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default CreateStory;

const styles = {
  main: {
    height: 575,
    backgroundColor: "#34363b",
    display: "flex",
    flexDirection: "column",
    color: "white",
    borderRadius: 15,
    userSelect: "none",
  } as CSSProperties,

  topBar: {
    minHeight: 55,
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    borderBottom: "1px solid #3a404a",
  } as CSSProperties,

  dropzone: {
    height: 450,
    width: 400,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  } as CSSProperties,

  showImage: {
    height: 450,
    width: 400,
    objectFit: "cover",
  } as CSSProperties,

  select: {
    marginTop: 40,
    height: 40,
    width: 200,
    backgroundColor: "#425896",
    fontSize: 15,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    userSelect: "none",
    cursor: "pointer",
    borderRadius: 10,
  } as React.CSSProperties,

  bottomBar: {
    minHeight: 70,
    display: "flex",
    justifyContent: "end",
    alignItems: "center",
    borderTop: "1px solid #3a404a",
  } as React.CSSProperties,

  send: {
    width: 45,
    height: 45,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    userSelect: "none",
    cursor: "pointer",
    border: "1px solid grey",
    borderRadius: "50%",
    margin: 10,
  } as React.CSSProperties,
};
