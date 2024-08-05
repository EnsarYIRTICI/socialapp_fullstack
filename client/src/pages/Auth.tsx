import { Route, Routes } from "react-router-dom";
import Wait from "./Wait";
import Login from "./Login";
import Register from "./Register";
import SendEmail from "./SendEmail";
import ResetPassword from "./ResetPassword";

function Auth() {
  return (
    <Routes>
      <Route path="*" element={<Wait />} />
      <Route path="/" element={<Wait />} />
      <Route
        path="/accounts/*"
        element={
          <Routes>
            <Route path="*" element={<Wait />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="mail/password" element={<SendEmail />} />
            <Route path="reset/password/:key" element={<ResetPassword />} />
          </Routes>
        }
      />
    </Routes>
  );
}

export default Auth;
