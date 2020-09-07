/* eslint-disable jsx-quotes */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import { toast } from 'react-toastify';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useStyles } from '../../styles/RegisterStyles';
import avatarLogo from '../../images/STAminilogo.jpg';

const Register = ({ setAuth }) => {
  const [allConfig, setAllConfig] = useState([]);
  const [loading, setLoading] = useState(false);
  const classes = useStyles();
  
  // Declare registration fields
  const [inputs, setInputs] = useState({
    name: '',
    subdomain: '',
    target_config_id: '',
    admin_email: '',
    admin_password: '',
    admin_firstname: '',
    admin_lastname: '',
    admin_phone: '',
    active: true,
  });

  const {
    name,
    subdomain,
    target_config_id,
    admin_email,
    admin_password,
    admin_firstname,
    admin_lastname,
    admin_phone,
  } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await fetch('http://localhost:5000/auth/register', {
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
  };

  const getAllConfig = async () => {
    try {
      const response = await fetch('http://localhost:5000/targetconfig', {
        method: 'GET',
      });

      const parseRes = await response.json();
      setAllConfig(parseRes);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err.message);
    }
  };

  useEffect(() => {
    getAllConfig();
  }, []);

  // Container for page
  return (
    <Container component='main' spacing={1} maxWidth='sm'>
      <Paper className={classes.paper} maxWidth='sm'>
        <Avatar className={classes.avatar} src={avatarLogo} />
        <div>
          <form className={classes.form} onSubmit={onSubmitForm}>
            <Grid container className={classes.message} spacing={1}>
              <Grid item sm={12}>
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
            <Grid container>
              <Grid item sm={6}>
                <TextField
                  type='text'
                  name='name'
                  placeholder='Organisation Name'
                  label='Organisation Name'
                  className={classes.textColor}
                  value={name}
                  onChange={(e) => onChange(e)}
                  required
                  fullWidth
                  style={{ margin: 8 }}
                  margin='normal'
                  autoFocus
                />
              </Grid>
              <Grid item sm={6}>
                <FormControl required fullWidth className={classes.formControl}>
                  <InputLabel id='target_config_id'>
                    Target Configuration
                  </InputLabel>
                  <Select
                    name='target_config_id'
                    value={target_config_id}
                    onChange={(e) => onChange(e)}
                    required
                    displayEmpty
                  >
                    {allConfig.map((config, index) => (
                      <MenuItem key={index} value={config.target_id}>
                        {config.description}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item sm={12}>
                <TextField
                  type='text'
                  name='subdomain'
                  placeholder='Subdomain'
                  label='Subdomain'
                  value={subdomain}
                  onChange={(e) => onChange(e)}
                  required
                  fullWidth
                  style={{ margin: 8 }}
                  margin='normal'
                />
              </Grid>
              <Grid item sm={12}>
                <TextField
                  type='email'
                  name='admin_email'
                  placeholder='Email'
                  label='Email'
                  value={admin_email}
                  onChange={(e) => onChange(e)}
                  required
                  fullWidth
                  style={{ margin: 8 }}
                  margin='normal'
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type='password'
                  name='admin_password'
                  placeholder='Password'
                  label='Password'
                  value={admin_password}
                  onChange={(e) => onChange(e)}
                  required
                  fullWidth
                  style={{ margin: 8 }}
                  margin='normal'
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  type='text'
                  name='admin_firstname'
                  placeholder='First Name'
                  label='First Name'
                  value={admin_firstname}
                  onChange={(e) => onChange(e)}
                  required
                  fullWidth
                  margin='normal'
                  style={{ margin: 8 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  type='text'
                  name='admin_lastname'
                  placeholder='Last Name'
                  label='Last Name'
                  value={admin_lastname}
                  onChange={(e) => onChange(e)}
                  required
                  fullWidth
                  margin='normal'
                  style={{ margin: 8 }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type='tel'
                  name='admin_phone'
                  placeholder='Phone Number'
                  label='Phone Number'
                  value={admin_phone}
                  onChange={(e) => onChange(e)}
                  required
                  fullWidth
                  margin='normal'
                  style={{ margin: 8 }}
                />
              </Grid>
            </Grid>

            {!loading ? (
              <Button
                type='submit'
                fullWidth
                className={classes.submit}
                variant='contained'
                color='primary'
              >
                Register
              </Button>
            ) : (
              <div>
                <Button
                  type='submit'
                  disabled
                  fullWidth
                  className={classes.submit}
                  variant='contained'
                  color='primary'
                >
                  Register
                </Button>
                <CircularProgress
                  size={48}
                  thickness={5.2}
                  className={classes.buttonProgress}
                />
              </div>
            )}

            <Grid container justify='flex-end'>
              <Grid item>
                <Link component={RouterLink} to='/login' variant='body2'>
                  Already have an account? Login
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Paper>
    </Container>
  );
};

export default Register;
