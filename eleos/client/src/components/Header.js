/* eslint-disable jsx-quotes */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prop-types */
import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { toast } from 'react-toastify';
import { useStyles } from '../styles/HeaderStyles';
import STAlogo from '../images/STAlogo.png';

const Header = ({ isAuthenticated, setAuth, isAdmin }) => {
  const classes = useStyles();
  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    setAuth(false);
    toast.success('Logged out successfully!');
  };

  return (
    <>
      <Toolbar className={classes.toolbar}>
        <img
          src={STAlogo}
          alt='scottishTechArmyLogo'
          className={classes.logo}
        />
        {isAuthenticated && (
          <Button
            variant='outlined'
            size='primary'
            className={isAdmin ? classes.logoutAdmin : classes.logoutCustomer}
            onClick={(e) => logout(e)}
          >
            Logout
          </Button>
        )}
      </Toolbar>
    </>
  );
};

export default Header;
