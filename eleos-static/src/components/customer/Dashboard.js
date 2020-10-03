import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import EditUserDetails from "./EditUserDetails";
import Grid from "@material-ui/core/Grid";
import UserDetails from "./UserDetails";
import { useStyles } from "../../styles/DashboardStyles";
import { get as getCookie } from "browser-cookies";
const FormData = require('form-data');

// Prepare FormData for Odoo
    
const fd = new FormData();

fd.append('csrf_token', '24115fad6eb47ebae09e32c23ce57ec58c4f3d03o1601769248');
fd.append('db', 'data');
fd.append('login', 'data@data.com');
fd.append('password', 'blink');
fd.append('redirect', '')
  //  MIME Type: application/x-www-form-urlencoded


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
    // Retrieve the database
    getUserDetails();
    console.log(db);

    // Retrieves CSRF token from Odoo 
    var xhr = new XMLHttpRequest();
      xhr.onload = function() {
        localStorage.csrfToken = this.responseXML.getElementsByName('csrf_token')[0].getAttribute('value')
        console.log(localStorage.csrfToken)
      }
      xhr.open("GET", "http://ec2-35-178-199-156.eu-west-2.compute.amazonaws.com/web?db=data");
      xhr.responseType = "document";
    xhr.send();
    //

  
    // document.write
    var req = new XMLHttpRequest();
    req.open('GET', 'http://ec2-35-178-199-156.eu-west-2.compute.amazonaws.com/', true); //true means request will be async
    req.onreadystatechange = function (aEvt) {
      if (req.readyState == 4) {
        if(req.status == 200)
          document.write(req.responseText);
        else
          alert("Error loading page\n");
      }
    };
    req.setRequestHeader('csrf_token', localStorage.csrfToken);
    req.setRequestHeader("X-Odoo-dbfilter", "data");// req.setRequestHeader("Accept", "application/json");
    req.send(fd);
    //

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


/// CSRF Function

/*
      //addCSRFAndProceed('http://ec2-35-178-199-156.eu-west-2.compute.amazonaws.com/');
      function addCSRFAndProceed (url) {
          window.location.href = url + '?token=' + getCSRFTokenAndValue();
      }
      function getCSRFTokenAndValue() {
          return localStorage.csrfToken;
      }
      */