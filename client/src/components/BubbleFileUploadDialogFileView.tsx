import { useContext, useState, useRef, useEffect } from "react";
import { RoofContextProps, RoofContext } from "../App";
import BrendanEich from "../services/BrendanEich";

function ShowFile({ file }: { file: File }) {
  const roof: RoofContextProps | null = useContext(RoofContext);
  const { theme, matches, colors } = roof!;

  const [fileData, setFileData] = useState<any>(null);

  const imageRef = useRef<HTMLImageElement>(null);
  const blurImageRef = useRef<HTMLImageElement>(null);

  const showImage = (file: File) => {
    let fr = new FileReader();
    fr.onload = function (e) {
      if (e.target) {
        if (typeof e.target.result === "string") {
          if (imageRef.current && blurImageRef.current) {
            imageRef.current.src = e.target.result;
            blurImageRef.current.src = e.target.result;
          }
        }
      }
    };
    fr.readAsDataURL(file);
  };

  useEffect(() => {
    if (fileData) {
      if (fileData.mimetype === "image") showImage(file);
    }
  }, [fileData]);

  useEffect(() => {
    setFileData({
      mimetype: BrendanEich.mimetype(file.type),
      name: BrendanEich.shortname(file.name),
      size: BrendanEich.unitname(file.size),
      lastModified: new Date(file.lastModified).toDateString(),
      type: file.type,
    });
  }, [file]);

  const responsive = {
    file: {
      backgroundColor: "#282c34",
      width: "90%",
      height: matches ? "30vh" : 400,
      color: "white",
      fontSize: 17,
    } as React.CSSProperties,

    imageContainer: {
      width: "100%",
      height: "100%",
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    } as React.CSSProperties,

    blurImage: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      position: "absolute",
      filter: "blur(15px)",
    } as React.CSSProperties,

    image: {
      maxWidth: matches ? "100%" : 600,
      maxHeight: matches ? "70vw" : 400,
      cursor: "pointer",
      position: "relative",
    } as React.CSSProperties,

    labelContainer: {
      marginBottom: 10,
      display: "flex",
    } as React.CSSProperties,

    label: {
      color: "grey",
    } as React.CSSProperties,

    value: {
      color: "#dbdbdb",
    } as React.CSSProperties,
  };

  return (
    <>
      {fileData &&
        (fileData.mimetype === "image" ? (
          <div style={responsive.imageContainer}>
            <img ref={blurImageRef} style={responsive.blurImage} />
            <img ref={imageRef} style={responsive.image} />
          </div>
        ) : (
          <div style={responsive.file}>
            <div style={responsive.labelContainer}>
              <div style={responsive.label}>Name:</div>
              <div style={responsive.value}>{fileData.name}</div>
            </div>
            <div style={responsive.labelContainer}>
              <div style={responsive.label}>Size:</div>
              <div style={responsive.value}>{fileData.size}</div>
            </div>
            <div style={responsive.labelContainer}>
              <div style={responsive.label}>Type:</div>
              <div style={responsive.value}>{fileData.type}</div>
            </div>
            <div style={responsive.labelContainer}>
              <div style={responsive.label}>Last Modified:</div>
              <div style={responsive.value}>{fileData.lastModified}</div>
            </div>
          </div>
        ))}
    </>
  );
}

export default ShowFile;
