import { useContext, useEffect, useRef, useState } from "react";
import { RoofContext, RoofContextProps } from "../App";
import RyanDahl from "../config/RyanDahl";
import UserService from "../services/UserService";
import BrendanEich from "../services/BrendanEich";

function Edit({ setDialog }: any) {
  const roof: RoofContextProps | null = useContext(RoofContext);
  const { theme, matches, themeIcons } = roof!;
  const authData = roof!.authData!;

  const [file, setFile] = useState<File | null>(null);
  const [isImageRemove, setIsImageRemove] = useState(
    authData.image ? false : true
  );

  const displayRef = useRef<HTMLInputElement>(null);
  const biographyRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (displayRef.current && biographyRef.current) {
      displayRef.current.value = authData.displayname;
      biographyRef.current.value = authData.biography;
    }
  }, []);

  const onFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      let file = files[0];
      setFile(file);
      showImage(file);
    }
  };

  const showImage = (file: File) => {
    const fr = new FileReader();
    fr.onload = (e) => {
      if (imageRef.current) {
        const result = e.target?.result;
        if (typeof result === "string") {
          imageRef.current.src = result;
          setIsImageRemove(false);
        }
      }
    };
    fr.readAsDataURL(file);
  };

  const editProfile = async (
    displayname: string,
    biography: string,
    file: File | null
  ) => {
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      const image = new Image();
      image.onload = async () => {
        let resizedImageFile = await BrendanEich.resizedImageFile(file, 640);
        editProfileWithImage(displayname, biography, resizedImageFile);
      };
      image.src = imageUrl;
    } else {
      const fileName = isImageRemove ? null : authData.image;
      editProfileWithoutImage(displayname, biography, fileName);
    }
  };

  const editProfileWithImage = async (
    displayname: string,
    biography: string,
    file: File
  ) => {
    try {
      await UserService.editProfileWithImage(
        authData.uid,
        displayname,
        biography,
        BrendanEich.timebased(file.name),
        file
      );

      setDialog("none");
    } catch (error) {
      console.log(error);
    } finally {
      window.location.reload();
    }
  };

  const editProfileWithoutImage = async (
    displayname: string,
    biography: string,
    image: string | null
  ) => {
    try {
      UserService.editProfile(authData.uid, displayname, biography, image);
      setDialog("none");
    } catch (error) {
      console.log(error);
    } finally {
      window.location.reload();
    }
  };

  const responsive = {
    main: {
      borderRadius: 10,
      backgroundColor: "#282c34",
      height: matches ? "75vh" : 600,
      width: matches ? "90vw" : 500,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "center",
    } as React.CSSProperties,

    inputContainer: {
      width: "90%",
      color: "white",
      paddingRight: 10,
    } as React.CSSProperties,

    inputTitle: {
      fontSize: 13,
      marginBottom: 10,
      color: "gray",
    } as React.CSSProperties,

    input: {
      borderRadius: 10,
      width: "100%",
      color: "white",
      outline: "none",
      border: "1px solid",
      borderColor: "#353a45",
      backgroundColor: "transparent",
      height: 50,
      paddingLeft: 5,
      paddingRight: 5,
      fontSize: 17,
    } as React.CSSProperties,
  };

  return (
    <div style={responsive.main}>
      <div style={styles.title}>
        <div onClick={() => setDialog("none")} style={styles.button}>
          Cancel
        </div>

        <div
          onClick={() => {
            if (displayRef.current && biographyRef.current) {
              editProfile(
                displayRef.current.value,
                biographyRef.current.value,
                file
              );
            }
          }}
          style={styles.button}
        >
          Update
        </div>
      </div>

      <div style={styles.imageManager}>
        <div
          onClick={() => {
            if (fileInputRef.current) {
              fileInputRef.current.click();
            }
          }}
          style={styles.imageContainer}
        >
          <img
            ref={imageRef}
            style={isImageRemove ? styles.emptyImage : styles.userImage}
            src={
              authData.image
                ? RyanDahl.URL_USER_MEDIA + authData.uid + "/" + authData.image
                : themeIcons.nav_user
            }
          />
        </div>

        <div
          onClick={() => {
            if (imageRef.current && authData.image) {
              imageRef.current.src = themeIcons.nav_user;
              setIsImageRemove(true);
            }
          }}
          style={styles.remove}
        >
          Remove
        </div>

        <div style={styles.spacer} />
      </div>

      <input onChange={onFileSelect} ref={fileInputRef} type="file" hidden />

      <div style={responsive.inputContainer}>
        <div style={responsive.inputTitle}>Displayname</div>
        <input
          ref={displayRef}
          style={responsive.input}
          type="text"
          placeholder="enter displayname"
        />
      </div>

      <div style={responsive.inputContainer}>
        <div style={responsive.inputTitle}>Biography</div>
        <input
          ref={biographyRef}
          style={responsive.input}
          type="text"
          placeholder="enter biography"
        />
      </div>

      <div style={styles.spacer} />
    </div>
  );
}

export default Edit;

const styles = {
  title: {
    borderColor: "#353a45",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    color: "white",
  } as React.CSSProperties,

  button: {
    margin: 20,
    fontSize: 15,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    userSelect: "none",
    cursor: "pointer",
    color: "#316cd4",
  } as React.CSSProperties,

  spacer: {
    height: 50,
  } as React.CSSProperties,

  imageManager: {
    minHeight: 150,
    minWidth: 150,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  } as React.CSSProperties,

  imageContainer: {
    margin: 20,
    width: 100,
    height: 100,
    borderRadius: "100%",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid white",
  } as React.CSSProperties,

  remove: {
    color: "white",
    fontSize: 15,
    userSelect: "none",
    cursor: "pointer",
  } as React.CSSProperties,

  emptyImage: {
    width: 50,
    height: 50,
  } as React.CSSProperties,

  userImage: {
    height: 100,
    width: 100,
    borderRadius: "100%",
    objectFit: "cover",
  } as React.CSSProperties,
};
