import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import { render } from "react-dom";
// Browser History API
import { createBrowserHistory } from "history";
// added <Router>, might be superflous. 
// URL Rewriting
const history = createBrowserHistory();
const path = (/#!(\/.*)$/.exec(window.location.hash) || [])[1];
    if (path) {
      history.replace(path);
    }

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
