/* eslint-disable jsx-quotes */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { toast } from 'react-toastify';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useStyles } from '../../styles/DeleteUserDialogStyles';

const DeleteUserDialog = ({
  user_id,
  setChangeUser,
  isDeletingUser,
  setIsDeletingUser,
}) => {
  const [loading, setLoading] = useState(false);
  const classes = useStyles();
  const onDelete = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch(`http://eleos-api.eba-rfdhwwp4.eu-west-2.elasticbeanstalk.com/users/${user_id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          token: localStorage.token,
        },
      });

      const parseRes = await response.json();
      toast.success(parseRes);
      setLoading(false);
      setIsDeletingUser(false);
      setChangeUser(true);
    } catch (err) {
      toast.error(err.message);
    }
  };
  return (
    <Dialog open={isDeletingUser} onClose={setIsDeletingUser}>
      <DialogContent>
        <DialogTitle>
          Are you sure you want to permantently delete this tenant?
        </DialogTitle>
      </DialogContent>

      {!loading ? (
        <DialogActions>
          <Button onClick={() => setIsDeletingUser(false)} color='primary'>
            Cancel
          </Button>
          <Button
            onClick={onDelete}
            color='primary'
            type='submit'
            variant='contained'
          >
            Delete Tenant
          </Button>
        </DialogActions>
      ) : (
        <DialogActions>
          <Button
            disabled
            onClick={() => setIsDeletingUser(false)}
            color='primary'
          >
            Cancel
          </Button>

          <Button
            onClick={onDelete}
            color='primary'
            type='submit'
            variant='contained'
            disabled
          >
            Delete Tenant
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

export default DeleteUserDialog;
