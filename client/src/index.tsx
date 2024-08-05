import { BrowserRouter } from "react-router-dom";

import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";

import "./index.css";
import "./App.css";

import "./styles/input.css";
import "./styles/drawer.css";
import "./styles/appbar.css";
import "./styles/roommanagment.css";

import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

reportWebVitals();
