import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import EditUserDetails from './EditUserDetails';
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
      const response = await fetch('http://localhost:5000/dashboard/', {
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
        <div className={classes.buttons}>
          {!isEditing && (
            <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={toggleEdit}
              className={classes.button}
            >
              Update
            </Button>
          )}
        </div>
      </Paper>
    </div>
  );
};

export default Dashboard;
