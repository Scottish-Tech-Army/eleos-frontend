import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import EditUserDetails from "./EditUserDetails";
import Grid from "@material-ui/core/Grid";
import UserDetails from "./UserDetails";
import { useStyles } from "../../styles/DashboardStyles";
import { get as getCookie } from "browser-cookies";

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
    // Print to console
    console.log(db);

    // Not sure how to call this through API
    // ecLogin2(db);
    function getHTML (oXHR, sTargetId) {
      console.log('getHTML()');
      console.log(oXHR.responseText);
      var  rOpen = new RegExp("<(?!\!)\\s*([^\\s>]+)[^>]*\\s+id\\=[\"\']" + sTargetId + "[\"\'][^>]*>" ,"i"),
           sSrc = oXHR.responseText, aExec = rOpen.exec(sSrc);
    
      return aExec ? (new RegExp("(?:(?:.(?!<\\s*" + aExec[1] + "[^>]*[>]))*.?<\\s*" + aExec[1] + "[^>]*[>](?:.(?!<\\s*\/\\s*" + aExec[1] + "\\s*>))*.?<\\s*\/\\s*" + aExec[1] + "\\s*>)*(?:.(?!<\\s*\/\\s*" + aExec[1] + "\\s*>))*.?", "i")).exec(sSrc.slice(sSrc.indexOf(aExec[0]) + aExec[0].length)) || "" : "";
    }
    console.log('XMLHttpRequest()')
    var oReq = new XMLHttpRequest();
    // * TEST DB: ec2-3-10-212-243 - DEV DB : ec2-35-178-199-156.eu-west-2.compute.amazonaws.com/web?db=
    // TEST DB ? command Doesnt work ? 
    oReq.open("GET", "http://ec2-35-178-199-156.eu-west-2.compute.amazonaws.com/web?db=data", true);
    oReq.onload = function () { console.log(getHTML(this, "intro")); };
    //oReq.withCredentials = true;
    oReq.send(null);
    //oReq.setRequestHeader("Content-Type", "application/json");
    //oReq.send({ 'request': "authentication token" });
  }
/*
    var res = null;
    var tryout = new XMLHttpRequest();
    
    tryout.open(
      "GET",
      "http://ec2-35-178-199-156.eu-west-2.compute.amazonaws.com/web?db=" + db,
      false
      );
    
      //tryout.withCredentials = true;
      //tryout.setRequestHeader("x-csrf-token", "fetch");
      //tryout.setRequestHeader("Accept", "application/json");
      //tryout.setRequestHeader("Content-Type", "application/json; charset=utf-8");
      //tryout.send(null);
    
      if (tryout.readyState === 4) {
        var csrfToken = tryout.getResponseHeader("x-csrf-token");

        tryout.open(
          "POST",
          "http://ec2-35-178-199-156.eu-west-2.compute.amazonaws.com/web?db=" + db,
          false
        );
        
        tryout.setRequestHeader("x-csrf-token", csrfToken);
        tryout.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        tryout.setRequestHeader("Accept", "application/json");

        //tryout.send(JSON.stringify(body));

        if (tryout.readyState === 4) {
          res = JSON.parse(this.responseText);
        }
      // window.location.href = 'http://ec2-35-178-199-156.eu-west-2.compute.amazonaws.com';
    // https://stackoverflow.com/questions/48659892/how-to-handle-csrf-token-using-xmlhttprequest

    }
    res.setRequestHeader(
      "X-Odoo-dbfilter", "data",
      ("X-CSRFToken", csrfToken)
    );
      
    if (req.readyState === 4) {    
      req.open("POST", "http://ec2-35-178-199-156.eu-west-2.compute.amazonaws.com/web?db=" + db, false);
      req.setRequestHeader("x-csrf-token", csrfToken);

  
      if (req.readyState === 4) {
        res = JSON.parse(this.responseText);
      }
    }
   
    res.send();
  }*/

    
    
  

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
