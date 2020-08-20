import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  buttonSuccess: {
    backgroundColor: '#2c94d1[500]',
    '&:hover': {
      backgroundColor: '#2c94d1[700]',
    },
  },
  buttonProgress: {
    color: '#2c94d1[500]',
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));
