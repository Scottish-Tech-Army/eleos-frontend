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

// Prepare FormData for Odoo

/**
 *
 * Queries the API for the users details
 * Allows user to edit their details
 *
 */
const Dashboard = ({ setAuth }) => {
  const classes = useStyles();

  //  MIME Type: application/x-www-form-urlencoded

  // Object prototype
  const [userDetails, setUserDetails] = useState({
    name: "",
    subdomain: "",
    admin_email: "",
    admin_firstname: "",
    admin_lastname: "",
    active: "",
  });

  
  const db = userDetails.name; // Retrieving the database name

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

  async function redirect(){
    window.location = "http://" + db + ".eleos.scottishtecharmy.org/web/login";
  }

   // The function called by the 'Proceed to instance' button
  async function getToken() {
    
    // Retrieve the database
    getUserDetails();
    
    // Print to console
    console.log('database:' + db);
    var url = "http://" + db + ".eleos.scottishtecharmy.org/web/login";

    /*
    function getHTML (oXHR, sTargetId) {
      console.log('getHTML()');
      console.log(oXHR.responseText);
      var  rOpen = new RegExp("<(?!\!)\\s*([^\\s>]+)[^>]*\\s+id\\=[\"\']" + sTargetId + "[\"\'][^>]*>" ,"i"),
           sSrc = oXHR.responseText, aExec = rOpen.exec(sSrc);
    
      return aExec ? (new RegExp("(?:(?:.(?!<\\s*" + aExec[1] + "[^>]*[>]))*.?<\\s*" + aExec[1] + "[^>]*[>](?:.(?!<\\s*\/\\s*" + aExec[1] + "\\s*>))*.?<\\s*\/\\s*" + aExec[1] + "\\s*>)*(?:.(?!<\\s*\/\\s*" + aExec[1] + "\\s*>))*.?", "i")).exec(sSrc.slice(sSrc.indexOf(aExec[0]) + aExec[0].length)) || "" : "";
    }
    */

    var xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    //xhr.onload = function () { console.log(getHTML(this, "csrf-token")); };
    xhr.onreadystatechange=function()
    {
        if (xhr.readyState==4 && xhr.status==200)
        {
            //csrftoken = document.getElementsByName('csrf-token')[0].content;
            document.write(xhr.responseText);
        }
    }

    var fd = new FormData();
    fd.append("login", "data@data.com");
    fd.append("password", "blink");
    fd.append("redirect", "");

    //xhr.setRequestHeader("Content-Type", "multipart/form-data; boundary=l3iPy71otz");
    //xhr.withCredentials = true;

    xhr.send(fd);
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
                  //onClick={window.location = "http://" + db + ".eleos.relyrecruit.com/web/login"}
                  //onClick={getToken} 
                  onClick={redirect}

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

