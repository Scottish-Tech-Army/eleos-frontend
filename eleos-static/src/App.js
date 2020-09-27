/* eslint-disable react/jsx-curly-newline */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-confusing-arrow */
/* eslint-disable jsx-quotes */
/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect } from "react";
import "./App.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { withStyles } from "@material-ui/core/styles";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import backgroundImg from "./images/backgroundImg.jpg";

import Dashboard from "./components/customer/Dashboard";
import Login from "./components/customer/Login";
import Register from "./components/customer/Register";
import Header from "./components/Header";
import AdminLogin from "./components/admin/AdminLogin";
import Admin from "./components/admin/Admin";

toast.configure();

const styles = () => ({
  "@global": {
    body: {
      backgroundImage: `linear-gradient(rgba(255,255,255,0.2), rgba(255,255,255,0.8)), url(${backgroundImg})`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center center",
      backgroundSize: "cover",
      backgroundAttachment: "fixed",
      height: "100%",
    },
  },
});

function App() {
  
  /**
   * Auth check
   */
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };
  
  async function isAuth() {
    try {
      const response = await fetch(
        "http://eleos-api.eba-rfdhwwp4.eu-west-2.elasticbeanstalk.com/auth/is-verify",
        {
          method: "GET",
          headers: { token: localStorage.token },
        }
      );
      const { verified, admin } = await response.json();
      // eslint-disable-next-line no-unused-expressions
      verified ? setIsAuthenticated(true) : setIsAuthenticated(false);
      // eslint-disable-next-line no-unused-expressions
      admin ? setIsAdmin(true) : setIsAdmin(false);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err.message);
    }
  }

  useEffect(() => {
    isAuth();
  });
  /*
  * Routing / Redirection
  */ 
  return (
    <>
      <Header
        isAdmin={isAdmin}
        isAuthenticated={isAuthenticated}
        setAuth={setAuth}
      />
      <Router>
        <div className="main">
          <Switch>
            <Route
              exact
              path="/"
              render={(props) =>
                !isAuthenticated ? (
                  <AdminLogin {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              exact
              path="/login"
              render={(props) =>
                !isAuthenticated ? (
                  <Login {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/dashboard" />
                )
              }
            />
            <Route
              exact
              path="/register"
              render={(props) =>
                !isAuthenticated ? (
                  <Register {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              exact
              path="/dashboard"
              render={(props) =>
                isAuthenticated ? (
                  <Dashboard {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              exact
              path="/adminlogin"
              render={(props) =>
                !isAuthenticated ? (
                  <AdminLogin {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/admin" />
                )
              }
            />
            <Route
              exact
              path="/admin"
              render={(props) =>
                isAuthenticated ? (
                  <Admin {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/adminlogin" />
                )
              }
            />
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default withStyles(styles)(App);
