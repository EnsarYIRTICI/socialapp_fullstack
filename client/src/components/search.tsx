import { useContext, useEffect, useRef, useState } from "react";
import { RoofContext, RoofContextProps } from "../App";
import PreUser from "./preuser";
import UserService from "../services/UserService";
import UserData from "../interface/user";
import { socket } from "../pages/Safary";

function Search() {
  const roof: RoofContextProps | null = useContext(RoofContext);
  const { theme, matches } = roof!;

  const [userList, setUserList] = useState([] as UserData[]);

  const searchUsers = async (value: string) => {
    socket.emit("searchUsers", value);
  };

  useEffect(() => {
    socket.on("onSearchUsers", (data) => {
      setUserList(data);
    });

    return () => {
      socket.off("onSearchUser");
    };
  }, []);

  const responsive = {
    input: {
      width: "70%",
      height: 50,
      border: "none",
      outline: "none",
      backgroundColor: "transparent",
      color: "white",
      fontSize: matches ? 19 : 16,
    } as React.CSSProperties,

    search: {
      width: 50,
      height: 50,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "grey",
      userSelect: "none",
      fontSize: matches ? 25 : 23,
    } as React.CSSProperties,
  };

  return (
    <>
      <div style={styles.inputContainer}>
        {
          //ARAMA GİRDİSİ
        }

        <input
          style={responsive.input}
          type="text"
          placeholder="Search"
          onChange={(e) => {
            let value = e.target.value;
            if (value != "") searchUsers(value);
            else setUserList([]);
          }}
        />
        <span style={responsive.search} className="material-symbols-outlined">
          search
        </span>
      </div>

      {
        // KULLANICI LİSTESİ
      }

      <div className="hidebar" style={styles.list}>
        {userList.map((userData: UserData) => (
          <PreUser key={userData.uid} userData={userData} />
        ))}
      </div>
    </>
  );
}

export default Search;

const styles = {
  inputContainer: {
    backgroundColor: "#545d6e",
    height: 55,
    width: "90%",
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderRadius: 15,
  } as React.CSSProperties,

  list: {
    width: "100%",
    overflowY: "scroll",
    marginTop: 25,
  } as React.CSSProperties,
};
