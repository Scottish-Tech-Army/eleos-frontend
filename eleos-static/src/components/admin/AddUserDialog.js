/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-quotes */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { toast } from 'react-toastify';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useStyles } from '../../styles/AddUserDialogStyles';

const AddUserDialog = ({
  setChangeUser,
  isAddingUser,
  setIsAddingUser,
  allConfig,
}) => {
  const classes = useStyles();
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
  const [loading, setLoading] = useState(false);

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

  const clearForm = () => {
    setInputs({
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
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('http://eleos-api.scottishtecharmy.org/users/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          token: localStorage.token,
        },
        body: JSON.stringify(inputs),
      });

      const parseRes = await response.json();

      if (parseRes.user_id) {
        toast.success('Tenant created!');
        setLoading(false);
        setChangeUser(true);
        setIsAddingUser(false);
        clearForm();
      } else {
        toast.error(parseRes);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <Dialog
      open={isAddingUser}
      onClose={setIsAddingUser}
      aria-labelledby='form-dialogue-title'
    >
      <DialogTitle id='form-dialog-title'>Create New Tenant</DialogTitle>
      <DialogContent>
        <TextField
          type='text'
          name='name'
          placeholder='Organisation Name'
          label='Organisation Name'
          value={name}
          onChange={(e) => onChange(e)}
          required
          fullWidth
          margin='dense'
          autoFocus
        />
        <TextField
          type='text'
          name='subdomain'
          placeholder='Subdomain'
          label='Subdomain'
          value={subdomain}
          onChange={(e) => onChange(e)}
          required
          fullWidth
          margin='dense'
        />
        <TextField
          type='email'
          name='admin_email'
          placeholder='Email'
          label='Email'
          value={admin_email}
          onChange={(e) => onChange(e)}
          required
          fullWidth
          margin='dense'
        />
        <TextField
          type='password'
          name='admin_password'
          placeholder='Password'
          label='Password'
          value={admin_password}
          onChange={(e) => onChange(e)}
          required
          fullWidth
          margin='dense'
        />
        <FormControl required fullWidth className={classes.formControl}>
          <InputLabel id='target_config_id'>Target Configuration</InputLabel>
          <Select
            labelId='target_config_id'
            id='target_config_id'
            name='target_config_id'
            value={target_config_id}
            onChange={(e) => onChange(e)}
            displayEmpty
          >
            {allConfig.map((config, index) => (
              <MenuItem key={index} value={config.target_id}>
                {config.description}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          type='text'
          name='admin_firstname'
          placeholder='First Name'
          label='First Name'
          value={admin_firstname}
          onChange={(e) => onChange(e)}
          required
          fullWidth
          margin='dense'
        />
        <TextField
          type='text'
          name='admin_lastname'
          placeholder='Last Name'
          label='Last Name'
          value={admin_lastname}
          onChange={(e) => onChange(e)}
          required
          fullWidth
          margin='dense'
        />
        <TextField
          type='tel'
          name='admin_phone'
          placeholder='Phone Number'
          label='Phone Number'
          value={admin_phone}
          onChange={(e) => onChange(e)}
          required
          fullWidth
          margin='dense'
        />
      </DialogContent>

      {!loading ? (
        <DialogActions>
          <Button onClick={() => setIsAddingUser(false)} color='primary'>
            Cancel
          </Button>
          <Button
            onClick={onSubmitForm}
            color='primary'
            type='submit'
            variant='contained'
          >
            Create Tenant
          </Button>
        </DialogActions>
      ) : (
        <DialogActions>
          <Button
            disabled
            onClick={() => setIsAddingUser(false)}
            color='primary'
          >
            Cancel
          </Button>
          <Button
            disabled
            onClick={onSubmitForm}
            color='primary'
            type='submit'
            variant='contained'
          >
            Create Tenant
          </Button>
          <CircularProgress
            size={48}
            thickness={5.2}
            className={classes.buttonProgress}
          />
        </DialogActions>
      )}
    </Dialog>
  );
};

export default AddUserDialog;
