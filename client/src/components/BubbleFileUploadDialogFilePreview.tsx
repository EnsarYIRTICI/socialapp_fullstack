import { useState, useRef, useEffect, useContext } from "react";
import BrendanEich from "../services/BrendanEich";
import { RoofContextProps, RoofContext } from "../App";

function PreFile({ i, file, selectedFileIndex, setSelectedFileIndex }: any) {
  const roof: RoofContextProps | null = useContext(RoofContext);
  const { theme, matches, colors } = roof!;

  const [fileData, setFileData] = useState<any>(null);

  const imageRef = useRef<HTMLImageElement>(null);

  const isSelected = i === selectedFileIndex ? true : false;

  const select = () => setSelectedFileIndex(i);

  const showImage = (file: File) => {
    let fr = new FileReader();
    fr.onload = function (e) {
      if (e.target) {
        if (typeof e.target.result === "string") {
          if (imageRef.current) {
            imageRef.current.src = e.target.result;
          }
        }
      }
    };
    fr.readAsDataURL(file);
  };

  useEffect(() => {
    if (fileData) {
      if (fileData.file_type === "image") {
        showImage(file);
      }
    }
  }, [fileData]);

  useEffect(() => {
    setFileData({
      file_name: BrendanEich.shortname(file.name),
      file_size: BrendanEich.unitname(file.size),
      file_type: BrendanEich.mimetype(file),
    });
  }, []);

  return (
    <div
      onClick={select}
      style={{
        minWidth: 150,
        minHeight: 150,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        userSelect: "none",
        cursor: "pointer",
        backgroundColor: isSelected ? colors.react : "transparent",
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "transparent";
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = colors.react;
      }}
    >
      {fileData &&
        (fileData.file_type === "image" ? (
          <img
            onMouseLeave={(e) => {
              e.currentTarget.style.filter = "brightness(70%)";
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.filter = "brightness(100%)";
            }}
            style={{
              width: 150,
              height: 150,
              objectFit: "cover",
              filter: isSelected ? "brightness(100%)" : "brightness(70%)",
            }}
            ref={imageRef}
          />
        ) : (
          <div
            style={{
              width: 150,
              height: 150,
              wordBreak: "break-all",
              color: colors.text,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                fontSize: 50,
              }}
              className="material-symbols-outlined"
            >
              description
            </span>

            <div
              style={{
                margin: 10,
                fontSize: 13,
              }}
            >
              {fileData.file_name}
            </div>
          </div>
        ))}
    </div>
  );
}

export default PreFile;
