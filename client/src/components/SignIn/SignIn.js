import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import Button from '@material-ui/core/Button';
import validator from 'validator';
import SaveIcon from '@material-ui/icons/Save';
import Authentication from '../../lib/Api/Authentication';
import setAuthToken from '../../utils/setAuthToken';
import { setCurrentUser } from '../../store/auth/action';
import { useSnackbar } from 'notistack';
import { loaderListKeys } from 'store/loading/config';
import { loadingWrapper } from 'utils/loaderWrapper';
const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(2),
      width: '100%',
    },
  },
  formControl: {
    margin: theme.spacing(1),
  },
  textField: {
    '& .MuiTextField-root': {
      margin: theme.spacing(2),
      width: '100%',
    },
  },
  buttonDiv: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
}));

function SignIn() {
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  const classes = useStyles();
  const [formErrors, setFormErrors] = useState({});
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const handelSingUp = () => {
    const cloneErrors = Object.assign({});
    const form = {
      email,
      password,
    };
    if (!validator.isEmail(email)) {
      cloneErrors['email'] = 'Email is invalid';
    }
    if (validator.isEmpty(email)) {
      cloneErrors['email'] = 'Email Cannot be Empty';
    }
    if (validator.isEmpty(password)) {
      cloneErrors['password'] = 'Password Cannot be Empty';
    }

    setFormErrors(cloneErrors);

    if (Object.keys(formErrors).length === 0) {
      loadingWrapper(
        () => {
          return Authentication.loginUser(form)
            .then((response) => {
              var dt = new Date();
              var setTime = dt.setSeconds(dt.getSeconds() + 36000);
              document.cookie = `jwtToken=${
                response.data.token
              }; expires= ${new Date(setTime).toUTCString()}`;

              //Set token to header
              setAuthToken(response.data.token);
              // Decode token to get user
              const decode = jwt_decode(response.data.token);
              dispatch(setCurrentUser(decode));
              history.push('./');
              enqueueSnackbar('Login Successful', { variant: 'success' });
              return response;
            })
            .catch((err) => {
              enqueueSnackbar('Failed to Login', { variant: 'error' });
              return err;
            });
        },
        loaderListKeys.loginUser,
        dispatch
      );
    }
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div>
        <TextField
          error={!!formErrors['email']}
          id="outlined-error-helper-text"
          label="Email"
          helperText={!!formErrors['email'] ? formErrors['email'] : ''}
          variant="outlined"
          value={email}
          onChange={(event) => {
            if (validator.isEmpty(event.target.value)) {
              const cloneErrors = Object.assign({}, formErrors);
              cloneErrors['email'] = 'Email Can not be Empty';
              setFormErrors(cloneErrors);
            } else if (!validator.isEmail(event.target.value)) {
              const cloneErrors = Object.assign({}, formErrors);
              cloneErrors['email'] = 'Email is invalid';
              setFormErrors(cloneErrors);
            } else {
              const cloneErrors = Object.assign({}, formErrors);
              delete cloneErrors['email'];
              setFormErrors(cloneErrors);
            }
            setEmail(event.target.value);
          }}
        />
      </div>
      <div>
        <TextField
          className={classes.textField}
          error={!!formErrors['password']}
          id="outlined-error-helper-text"
          label="password"
          helperText={!!formErrors['password'] ? 'Incorrect entry.' : ''}
          variant="outlined"
          value={password}
          onChange={(event) => {
            if (validator.isEmpty(event.target.value)) {
              const cloneErrors = Object.assign({}, formErrors);
              cloneErrors['password'] = 'Password can not be Empty';
              setFormErrors(cloneErrors);
            } else {
              const cloneErrors = Object.assign({}, formErrors);
              delete cloneErrors['password'];
              setFormErrors(cloneErrors);
            }
            setPassword(event.target.value);
          }}
          type="password"
        />
      </div>
      <div className={classes.buttonDiv}>
        <Button
          onClick={handelSingUp}
          variant="contained"
          color="primary"
          size="large"
          className={classes.button}
          startIcon={<SaveIcon />}
          disabled={Object.keys(formErrors).length > 0}
        >
          Sign In
        </Button>
      </div>
    </form>
  );
}
export default SignIn;
