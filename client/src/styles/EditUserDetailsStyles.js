import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: theme.spacing(6),
  },
  button: {
    color: theme.palette.getContrastText('#ec6b31'),
    backgroundColor: '#ec6b31',
    '&:hover': {
      backgroundColor: '#ef885a',
    },
  },
}));
