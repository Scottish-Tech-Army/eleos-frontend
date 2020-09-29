import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import EditUserDetails from "./EditUserDetails";
import Grid from "@material-ui/core/Grid";
import UserDetails from "./UserDetails";
import { useStyles } from "../../styles/DashboardStyles";
import { get as getCookie } from "browser-cookies";

const Dashboard = ({ setAuth }) => {
  const classes = useStyles();
  const [userDetails, setUserDetails] = useState({
    name: "",
    subdomain: "",
    admin_email: "",
    admin_firstname: "",
    admin_lastname: "",
    active: "",
  });
  const db = "data";

  const body = useState({
    admin_email: "",
    admin_password: "",
  });

  //const body = { admin_email, admin_password };
  const [isEditing, setIsEditing] = useState(false);

  async function getUserDetails() {
    try {
      const response = await fetch(
        "http://eleos-api.eba-rfdhwwp4.eu-west-2.elasticbeanstalk.com/dashboard/",
        {
          method: "GET",
          headers: { token: localStorage.token },
        }
      );

      const parseRes = await response.json();
      setUserDetails(parseRes);
    } catch (err) {
      console.error(err.message);
    }
  }

  /**
   *
   * getToken retrieves the CSRF token from EC2
   *
   */
  async function getToken() {
    try {
      try {
        setLoading(true);
  
        const response = await fetch('http://eleos-api.eba-rfdhwwp4.eu-west-2.elasticbeanstalk.com/auth/ecLogin', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(inputs),
        });
  
        const parseRes = await response.json();
  
        if (parseRes.token) {
          localStorage.setItem('token', parseRes.token);
          setAuth(true);
          toast.success('Registered Successfully');
          setLoading(false);
        } else {
          setLoading(false);
          setAuth(false);
          toast.error(parseRes);
        }
      } catch (err) {
        toast.error(err.message);
      }
    
   
  }

  const toggleEdit = () => {
    isEditing ? setIsEditing(false) : setIsEditing(true);
  };

  const straightThrough = () => {
    isEditing ? setIsEditing(false) : setIsEditing(true);
  };

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
                  Update
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

/**  https://html.developreference.com/article/10364287/Swift+Regex+to+retrieve+token+from+a+page+html
      let regex = try NSRegularExpression(pattern: "\"csrf_token\":([A-z0-9]*")

      let a = text!.matchingStrings(regex: "\"csrf_token\":([A-z0-9]*")
      with
      extension String {
        func matchingStrings(regex: String) -> [[String]] {
          guard let regex = try? NSRegularExpression(pattern: regex,
          options: []) else { return [] }
          let nsString = self as NSString
          let results = regex.matches(in: self, options: [], range:
          NSMakeRange(0, nsString.length))
          return results.map { result in
          (0..<result.numberOfRanges).map {
          result.range(at: $0).location != NSNotFound
          ? nsString.substring(with: result.range(at: $0))
          : ""
      }*/

/**
       * 
       
      const response = await fetch(
        "http://ec2-35-178-199-156.eu-west-2.compute.amazonaws.com/web?db=" + db,
        {
          method: "GET"
        }
        //var csrfToken = tryout.getResponseHeader("x-csrf-token");
      );
      //setUserDetails(parseRes);
      //var csrfToken = parseRes.querySelector("#csrf_token").value;
      */

/*
      return fetch("http://ec2-35-178-199-156.eu-west-2.compute.amazonaws.com/web?db=" + db, { // Added the trailing slash here 
        method: 'POST',
        credentials: "same-origin", // Added this line
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCookie('csrftoken'), // getting token from cookies
        },
        body: JSON.stringify(body),
        
      }).then(response => {
        return response.json();
      });
      */
  //var tryout = new XMLHttpRequest();

      // Get CSRF
      /** 
      tryout.open(
        "GET",
        "http://ec2-35-178-199-156.eu-west-2.compute.amazonaws.com?db=" + "data"
      ); //get csrf
      tryout.withCredentials = true;
      tryout.setRequestHeader("x-csrf-token", "fetch");
      tryout.setRequestHeader("Accept", "application/json");
      tryout.setRequestHeader(
        "Content-Type",
        "application/json; charset=utf-8"
      );
      tryout.send(null);

      if (tryout.readyState === 4) {
        var csrfToken = tryout.getResponseHeader("x-csrf-token");

        tryout.open(
          "POST",
          "http://ec2-35-178-199-156.eu-west-2.compute.amazonaws.com/web/login/",
          false
        );
        tryout.setRequestHeader("x-csrf-token", csrfToken);
        tryout.setRequestHeader(
          "Content-Type",
          "application/json; charset=utf-8"
        );
        tryout.setRequestHeader("Accept", "application/json");
        req.setRequestHeader("X-Odoo-dbfilter", "data");

        if (req.status == 200) {
          console.log("test2");
          document.write(req.responseText);
          window.location.href =
            "http://ec2-35-178-199-156.eu-west-2.compute.amazonaws.com";
          //res.setRequestHeader("x-csrf-token", "fetch");
        } else alert("Error contacting Odoo back-end.\n");
      }

      //tryout.send(JSON.stringify(obj));
      tryout.send("data");

      if (tryout.readyState === 4) {
        res = JSON.parse(this.responseText);
      }

      */
     

      //const parseRes = await response.json();

      /**var res = null;
      var tryout = new XMLHttpRequest();
      tryout.open(
        "GET",
        "http://ec2-35-178-199-156.eu-west-2.compute.amazonaws.com/web?db=" +
          db,
        false
      );
      tryout.withCredentials = true;
      tryout.setRequestHeader(
        "x-csrf-token",
        "e24b4112a0cbff1ccf02b182f705e6971d035507o"
      );
      tryout.setRequestHeader("Accept", "application/json");
      tryout.setRequestHeader(
        "Content-Type",
        "application/json; charset=utf-8"
      );
      tryout.send(null);
      if (tryout.readyState === 4) {
       // var csrfToken = tryout.getResponseHeader("x-csrf-token");

        tryout.open(
          "POST",
          "http://ec2-35-178-199-156.eu-west-2.compute.amazonaws.com/web?db=" +
            db,
          false
        );
        tryout.setRequestHeader("x-csrf-token", 'fetch');
        tryout.setRequestHeader(
          "Content-Type",
          "application/json; charset=utf-8"
        );
        tryout.setRequestHeader("Accept", "application/json");
        console.log("test");
        console.log('fetch');
        //tryout.send(JSON.stringify(body));

        if (tryout.readyState === 4) {
          res = JSON.parse(this.responseText);
        }
        window.location.href =
          "http://ec2-35-178-199-156.eu-west-2.compute.amazonaws.com";
      }
      */