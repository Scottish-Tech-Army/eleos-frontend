/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable jsx-quotes */
/* eslint-disable comma-dangle */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { toast } from 'react-toastify';
import FormControl from '@material-ui/core/FormControl';

const EditUserDialog = ({
  setChangeUser,
  isEditingUser,
  setIsEditingUser,
  selectUser,
  allConfig,
}) => {
  const [inputs, setInputs] = useState({
    name: selectUser.name,
    subdomain: selectUser.subdomain,
    admin_email: selectUser.admin_email,
    admin_firstname: selectUser.admin_firstname,
    admin_lastname: selectUser.admin_lastname,
    target_config_id: selectUser.target_config_id,
    active: selectUser.active,
  });

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onChangeSwitch = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.checked });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();

    try {
      const { user_id, description, ...body } = inputs;

      const response = await fetch(
        `http://eleos-api.scottishtecharmy.org/users/${inputs.user_id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            token: localStorage.token,
          },
          body: JSON.stringify(body),
        }
      );

      const parseRes = await response.json();

      if (parseRes.admin_email) {
        toast.success('Record Updated!');
        setChangeUser(true);
        setIsEditingUser(false);
      } else {
        toast.error(parseRes.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    setInputs(selectUser);
  }, [selectUser]);

  return (
    <Dialog
      open={isEditingUser}
      onClose={setIsEditingUser}
      aria-labelledby='form-dialogue-title'
    >
      <DialogTitle id='form-dialog-title'>Edit User</DialogTitle>
      <DialogContent>
        <TextField
          type='text'
          name='name'
          value={inputs.name}
          defaultValue={selectUser.name}
          label='Organisation Name'
          onChange={(e) => onChange(e)}
          required
          fullWidth
          margin='dense'
          autoFocus
        />
        <TextField
          type='text'
          name='subdomain'
          label='Subdomain'
          value={inputs.subdomain}
          defaultValue={selectUser.subdomain}
          onChange={(e) => onChange(e)}
          required
          fullWidth
          margin='dense'
        />
        <FormControl required fullWidth styles={{ minWidth: 120 }}>
          <InputLabel id='target_config_id'>Target Configuration</InputLabel>
          <Select
            labelId='target_config_id'
            id='target_config_id'
            name='target_config_id'
            value={inputs.target_config_id}
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
          name='admin_email'
          label='Admin Email'
          value={inputs.admin_email}
          defaultValue={selectUser.admin_email}
          onChange={(e) => onChange(e)}
          required
          fullWidth
          margin='dense'
        />
        <TextField
          type='text'
          name='admin_firstname'
          label='Admin First Name'
          value={inputs.admin_firstname}
          defaultValue={selectUser.admin_firstname}
          onChange={(e) => onChange(e)}
          required
          fullWidth
          margin='dense'
        />
        <TextField
          type='text'
          name='admin_lastname'
          label='Admin Last Name'
          value={inputs.admin_lastname}
          defaultValue={selectUser.admin_lastname}
          onChange={(e) => onChange(e)}
          required
          fullWidth
          margin='dense'
        />
        <FormControlLabel
          control={
            <Switch
              checked={inputs.active}
              defaultValue={selectUser.active}
              onChange={(e) => onChangeSwitch(e)}
              name='active'
            />
          }
          label='Active Account'
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setIsEditingUser(false)} color='primary'>
          Cancel
        </Button>
        <Button
          onClick={onSubmitForm}
          color='primary'
          type='submit'
          variant='contained'
        >
          Update Record
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditUserDialog;
