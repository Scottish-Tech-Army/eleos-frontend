// eslint-disable-next-line
import React, { Fragment, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { toast } from 'react-toastify';
import Button from '@material-ui/core/Button';
import { useStyles } from '../../styles/EditUserDetailsStyles';

const EditUserDetails = (props) => {
  const classes = useStyles();
  const [inputs, setInputs] = useState({
    admin_email: props.admin_email,
    admin_firstname: props.admin_firstname,
    admin_lastname: props.admin_lastname,
  });

  const { admin_email, admin_firstname, admin_lastname } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
    console.log(e.target.value);
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://eleos-api.eba-rfdhwwp4.eu-west-2.elasticbeanstalk.com/dashboard/edit', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          token: localStorage.token,
        },
        body: JSON.stringify(inputs),
      });

      const parseRes = await response.json();

      if (parseRes.admin_email) {
        props.toggleEdit();
        toast.success('Details Updated!');
      } else {
        toast.error(parseRes);
      }
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Edit Details
      </Typography>
      <form onSubmit={onSubmitForm}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              type="text"
              name="name"
              fullWidth
              autoComplete={props.name}
              value={props.name}
              disabled
              label="Organisation Name"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="text"
              name="subdomain"
              fullWidth
              autoComplete={props.subdomain}
              value={props.subdomain}
              label="Subdomain"
              disabled
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="email"
              name="admin_email"
              value={admin_email}
              onChange={(e) => onChange(e)}
              defaultValue={props.admin_email}
              label="Email"
              required
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              type="text"
              name="admin_firstname"
              defaultValue={props.admin_firstname}
              value={admin_firstname}
              onChange={(e) => onChange(e)}
              label="First Name"
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              type="text"
              name="admin_lastname"
              defaultValue={props.admin_lastname}
              value={admin_lastname}
              onChange={(e) => onChange(e)}
              label="Last Name"
              required
              fullWidth
            />
          </Grid>
        </Grid>
        <div className={classes.buttons}>
          <Button
            onClick={props.toggleEdit}
            fullWdith
            styles={{ marginRight: 'theme.spacing(2)' }}
          >
            Back
          </Button>
          <Button
            className={classes.button}
            type="submit"
            fullWdith
            variant="contained"
            color="primary"
          >
            Update Details
          </Button>
        </div>
      </form>
    </>
  );
};

export default EditUserDetails;
