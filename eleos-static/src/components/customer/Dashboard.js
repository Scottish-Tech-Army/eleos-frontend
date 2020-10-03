import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import EditUserDetails from "./EditUserDetails";
import Grid from "@material-ui/core/Grid";
import UserDetails from "./UserDetails";
import { useStyles } from "../../styles/DashboardStyles";
import { get as getCookie } from "browser-cookies";
const FormData = require("form-data");

/**
 *
 * Queries the API for the users details
 * Allows user to edit their details
 *
 */
const Dashboard = ({ setAuth }) => {
  const classes = useStyles();

  // Object prototype
  const [userDetails, setUserDetails] = useState({
    name: "",
    subdomain: "",
    admin_email: "",
    admin_firstname: "",
    admin_lastname: "",
    active: "",
  });

  // Attempt at storing the db value
  const db = userDetails.name;

  const [isEditing, setIsEditing] = useState(false);

  // Retrieves the user details from the API
  async function getUserDetails() {
    // Retrieves the user details from eleos-api
    try {
      const response = await fetch(
        "http://eleos-api.scottishtecharmy.org/dashboard/",
        {
          method: "GET",
          headers: { token: localStorage.token }, // Pass token for API in header
        }
      );

      const parseRes = await response.json(); // {name: "", subdomain: "", admin_email: "", admin_firstname: "", admin_lastname: "", …

      setUserDetails(parseRes); // setUserDetails stores this json response as an object
    } catch (err) {
      console.error(err.message);
    }
  }

  // The function called by the 'Proceed to instance' button
  async function getToken() {
    // Retrieve the database - working
    getUserDetails();

    // Print to console
    console.log("database:");
    console.log(db);

    // get the CRSF Token
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      console.log("Odoo crsf token:");
      localStorage.csrfToken = this.responseXML.getElementsByName("csrf_token")[0].getAttribute("value");
      console.log("Odoo crsf token:");
      console.log(localStorage.csrfToken);
      /*
      addCSRFAndProceed('http://ec2-35-178-199-156.eu-west-2.compute.amazonaws.com/');
      function addCSRFAndProceed(url) {
        //window.location.href = url + "?token=" + getCSRFTokenAndValue();
        getCSRFTokenAndValue();
      }
      function getCSRFTokenAndValue() {
        return localStorage.csrfToken;
      }
      */
    };
    xhr.open("GET", "http://ec2-35-178-199-156.eu-west-2.compute.amazonaws.com/web?db=data");
    xhr.responseType = "document";
    xhr.send();

    // Prepare form data for Odoo
    const formData = new FormData();
    formData.append("csrf_token","6964fb2891686c5e88b611594f18e5b09dee9d78o1601764935");
    formData.append("db", "data");
    formData.append("login", "data@data.com");
    formData.append("password", "blink");
    formData.append("redirect", "");
    console.log(formData);


    // Login
    const res = await fetch(
      "http://ec2-35-178-199-156.eu-west-2.compute.amazonaws.com/web/login/",
      {
        method: "POST",
        headers: {"Content-Type": "multipart/form-data", "X-Odoo-dbfilter": "data", "crsf_token": localStorage.csrfToken},
        redirect: "",
        body: formData,
      }
    ).then((res) => { 
      console.log(res);
      /*
      var req = new XMLHttpRequest();
        req.open("GET","http://ec2-35-178-199-156.eu-west-2.compute.amazonaws.com/web/login/", true); 
        req.onreadystatechange = function (aEvt) {
          if (req.readyState == 4) {
            if (req.status == 200) document.write(req.responseText); //  If successful, write page to document
            else alert("Error loading page\n");
          }
        };
        req.setRequestHeader("crsf_token", localStorage.csrfToken);
        req.setRequestHeader("X-Odoo-dbfilter", "data");
        req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        // req.setRequestHeader("Accept", "application/json");
      req.send();
      */
    });
  }

  const toggleEdit = () => {
    isEditing ? setIsEditing(false) : setIsEditing(true);
  };

  // `Update` button
  const straightThrough = () => {
    isEditing ? setIsEditing(false) : setIsEditing(true);
  };

  // useEffect will run when the component renders
  useEffect(() => {
    getUserDetails();
  }, [isEditing]);

  // DOM
  return (
    <div className={classes.layout}>
      <Paper className={classes.paper}>
        <Typography component="h1" variant="h4" align="center">
          Account Details
        </Typography>

        {!isEditing ? (
          <UserDetails {...userDetails} />
        ) : (
          <EditUserDetails {...userDetails} toggleEdit={toggleEdit} />
        )}
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <div className={classes.buttons}>
              {!isEditing && (
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  onClick={getToken}
                  className={classes.button}
                >
                  Proceed to instance
                </Button>
              )}
              {!isEditing && (
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  onClick={straightThrough}
                  className={classes.button}
                >
                  Edit
                </Button>
              )}
            </div>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default Dashboard;
