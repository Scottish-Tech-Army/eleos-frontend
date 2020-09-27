/* eslint-disable jsx-quotes */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import { toast } from 'react-toastify';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import avatarLogo from '../../images/STAminilogo.jpg';
import { useStyles } from '../../styles/LoginStyles';
import axios from "axios";

const Login = ({ setAuth }) => {
  const classes = useStyles();
  const [inputs, setInputs] = useState({
    admin_email: '',
    admin_password: '',
  });

  const { admin_email, admin_password } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { admin_email, admin_password };

      const response = await fetch('http://eleos-api.eba-rfdhwwp4.eu-west-2.elasticbeanstalk.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();

      localStorage.setItem('token', parseRes.token);

      if (parseRes.token) {
        localStorage.setItem('token', parseRes.token);

        setAuth(true);
        toast.success('login successful!');
        // Attempt at passing header
        /*
        axios.request({
          url: 'http://ec2-35-178-199-156.eu-west-2.compute.amazonaws.com/',
          method: 'post',
          headers: { 'X-Odoo-dbfilter': 'data', "X-CSRFToken": 'token' }
        })
        
        //window.location.href = 'http://ec2-35-178-199-156.eu-west-2.compute.amazonaws.com'; 
*/
        var req = new XMLHttpRequest();
        req.open('GET', 'http://ec2-35-178-199-156.eu-west-2.compute.amazonaws.com', true); //true means request will be async
        req.onreadystatechange = function (aEvt) {
          if (req.readyState == 4) {
            if(req.status == 200)
              document.write(req.responseText);
            else
              alert("Error loading page\n");
          }
        };
        req.setRequestHeader('X-Odoo-dbfilter', 'data');
        req.send();
       
      } else {
        setAuth(false);
        toast.error(parseRes.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    // eslint-disable-next-line jsx-quotes
    <Container component='main' maxWidth='xs'>
      <Paper className={classes.paper} maxWidth='xs'>
        <Avatar className={classes.avatar} src={avatarLogo} />
        <Grid container className={classes.message} spacing={2}>
          <Grid item xs={12}>
            <Box
              display='flex'
              justifyContent='center'
              alignContent='center'
              alignItems='center'
              bgcolor='#ec6b31'
              color='primary.contrastText'
              p={2}
            >
              Access and manage your instances with this STA account.
            </Box>
          </Grid>
        </Grid>

        <div>
          <form onSubmit={onSubmitForm} className={classes.form}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  type='email'
                  name='admin_email'
                  placeholder='Email'
                  value={admin_email}
                  onChange={(e) => onChange(e)}
                  required
                  fullWidth
                  style={{ margin: 8 }}
                  margin='normal'
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type='password'
                  name='admin_password'
                  placeholder='Password'
                  className='form-control my-3'
                  value={admin_password}
                  onChange={(e) => onChange(e)}
                  required
                  fullWidth
                  style={{ margin: 8 }}
                  margin='normal'
                />
              </Grid>
            </Grid>
            <Button
              type='submit'
              fullWidth
              className={classes.submit}
              variant='contained'
              color='primary'
            >
              Log In
            </Button>
            <Grid container justify='flex-end'>
              <Grid item>
                <Link component={RouterLink} to='/register' variant='body2'>
                  Don't have an account? Sign up
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Paper>
    </Container>
  );
};

export default Login;
