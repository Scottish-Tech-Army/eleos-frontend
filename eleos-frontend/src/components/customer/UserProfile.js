import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';

import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '../../styles/UserProfileStyles';

const UserProfile = ({ name }) => {
  const classes = useStyles();
  return (
    <div>
      <Grid container>
        <Grid item xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">Your Profile</CardHeader>
            <CardContent>
              <Grid container>
                <Grid item xs={12} sm={12} md={5}>
                  <Typography>{name}</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default UserProfile;
