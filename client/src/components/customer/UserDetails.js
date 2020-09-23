// eslint-disable-next-line
import React, { Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { useStyles } from '../../styles/UserDetailsStyles';

const UserDetails = ({
  name,
  admin_email,
  admin_firstname,
  admin_lastname,
  subdomain,
  active,
}) => {
  const classes = useStyles();

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant='h6' gutterBottom className={classes.title}>
            {'Organisation: '}
            {name}
          </Typography>
          <Typography gutterBottom>
            {'Subdomain: '}
            {subdomain}
          </Typography>
          <Typography gutterBottom>
            {'Email: '}
            {admin_email}
          </Typography>
          <Typography gutterBottom>
            {'First Name: '}
            {admin_firstname}
          </Typography>
          <Typography gutterBottom>
            {'Last Name: '}
            {admin_lastname}
          </Typography>
          {active ? (
            <Typography gutterBottom>Subscription: Active</Typography>
          ) : (
            <Typography gutterBottom>Subscription: Inactive</Typography>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default UserDetails;
