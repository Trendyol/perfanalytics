import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "./styles/pages.scss";
import "./styles/shared.scss";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
