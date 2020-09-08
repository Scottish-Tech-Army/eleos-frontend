import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(1),
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(6),
      paddingTop: theme.spacing(2),
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
    },
  },
  avatar: {
    margin: theme.spacing(3),
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '100ch',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  message: {
    marginBottom: theme.spacing(1),
  },
  form: {
    width: '100%',
  },
  textColor: {
    borderColor: '#ef885a',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    color: theme.palette.getContrastText('#ec6b31'),
    backgroundColor: '#ec6b31',
    '&:hover': {
      backgroundColor: '#ef885a',
    },
  },
  buttonSuccess: {
    backgroundColor: '#ec6b31[500]',
    '&:hover': {
      backgroundColor: '#ec6b31[700]',
    },
  },
  buttonProgress: {
    color: '#ec6b31[500]',
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));
