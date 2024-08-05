import { CSSProperties, useContext } from "react";
import { RoofContext, RoofContextProps } from "../App";
import BubbleData from "../interface/bubble";
import BrendanEich from "../services/BrendanEich";
import BubbleFile from "../interface/bubblefile";

type FileProps = {
  bubbleFile: BubbleFile;
  isMyMessage: boolean;
};

function File({ bubbleFile, isMyMessage }: FileProps) {
  const roof: RoofContextProps | null = useContext(RoofContext);
  const { theme, matches } = roof!;
  const authData = roof!.authData!;

  const fileName = BrendanEich.shortname(bubbleFile.file_name);
  const fileSize = BrendanEich.unitname(bubbleFile.size);
  const extension = bubbleFile.extension;

  const responsive = {
    file: {
      color: "white",
      margin: 5,
      borderRadius: 15,
      backgroundColor: isMyMessage ? "#408573" : "#4c3d99",
      width: matches ? 175 : 275,
      height: matches ? 100 : 200,
      alignSelf: "center",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      userSelect: "none",
    } as CSSProperties,

    name: {
      height: 40,
      width: "90%",
      display: "flex",
      alignItems: "center",
      fontSize: matches ? 13 : 15,
    } as CSSProperties,

    size: {
      height: 40,
      width: "90%",
      display: "flex",
      alignItems: "center",
      fontSize: matches ? 11 : 13,
      color: "#dbdbdb",
    } as CSSProperties,
  };

  return (
    <div style={responsive.file}>
      <div style={responsive.name}>
        <span style={styles.description} className="material-symbols-outlined">
          description
        </span>
        <div>{fileName}</div>
      </div>
      <div style={responsive.size}>
        <div>{fileSize}</div>
        <div style={styles.hyphen}>{"-"}</div>
        <div>{extension}</div>
      </div>
    </div>
  );
}

export default File;

const styles = {
  description: {
    marginRight: 5,
  } as CSSProperties,

  hyphen: {
    marginLeft: 10,
    marginRight: 10,
  } as CSSProperties,
};
