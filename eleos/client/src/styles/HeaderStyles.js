import { makeStyles } from '@material-ui/core/styles';

// eslint-disable-next-line import/prefer-default-export
export const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    justifyContent: 'space-between',
  },
  logo: {
    height: '100px',
    width: '275px',
    margin: theme.spacing(1),
    marginLeft: theme.spacing(8),
  },
  logoutAdmin: {
    color: theme.palette.getContrastText('#2c94d1'),
    backgroundColor: '#2c94d1',
    '&:hover': {
      backgroundColor: '#2c94d1',
    },
  },
  logoutCustomer: {
    color: theme.palette.getContrastText('#ec6b31'),
    backgroundColor: '#ec6b31',
    '&:hover': {
      backgroundColor: '#ec6b31',
    },
  },
}));
