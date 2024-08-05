import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Thing() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/");
  }, []);
  return <></>;
}

export default Thing;
