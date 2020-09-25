import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import EditUserDetails from './EditUserDetails';
import Grid from '@material-ui/core/Grid';
import UserDetails from './UserDetails';
import { useStyles } from '../../styles/DashboardStyles';

const Dashboard = ({ setAuth }) => {
  const classes = useStyles();
  const [userDetails, setUserDetails] = useState({
    name: '',
    subdomain: '',
    admin_email: '',
    admin_firstname: '',
    admin_lastname: '',
    active: '',
  });
  const [isEditing, setIsEditing] = useState(false);

  async function getUserDetails() {
    try {
      const response = await fetch('http://eleos-api.eba-rfdhwwp4.eu-west-2.elasticbeanstalk.com/dashboard/', {
        method: 'GET',
        headers: { token: localStorage.token },
      });

      const parseRes = await response.json();
      setUserDetails(parseRes);
    } catch (err) {
      console.error(err.message);
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
              onClick={toggleEdit}
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
