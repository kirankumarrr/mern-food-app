import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import validator from 'validator';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import Authentication from '../../lib/Api/Authentication';
import { useSnackbar } from 'notistack';
import { loadingWrapper } from 'utils/loaderWrapper';
import { loaderListKeys } from 'store/loading/config';
import { useDispatch } from 'react-redux';
//TODO : Loader Pending
//TODO : Success/Error Message
//TODO : Navigation
//TODO : Refactor

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

const roles = [
  {
    value: 'user',
    label: 'User',
  },
  {
    value: 'owner',
    label: 'Owner',
  },
];

function Signup(props) {
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const [formErrors, setFormErrors] = useState({});
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('user');
  const dispatch = useDispatch();
  const handelSingUp = () => {
    const cloneErrors = Object.assign({}, formErrors);
    const form = {
      name,
      email,
      password,
      role,
      password2: confirmPassword,
    };
    if (!validator.isEmail(email)) {
      cloneErrors['email'] = 'Email is invalid';
    }
    if (validator.isEmpty(name)) {
      cloneErrors['name'] = 'Name Can not be Empty';
    }
    if (validator.isEmpty(email)) {
      cloneErrors['email'] = 'Email Can not be Empty';
    }
    if (validator.isEmpty(password)) {
      cloneErrors['password'] = 'Password Can not be Empty';
    }
    if (confirmPassword !== password) {
      cloneErrors['confirmPassword'] = 'Password must match';
    }

    setFormErrors(cloneErrors);
    if (Object.keys(formErrors).length === 0) {
      loadingWrapper(
        () => {
          Authentication.registerUser(form)
            .then((response) => {
              console.log('response :', response);
              enqueueSnackbar('Signup Successful', { variant: 'success' });
              props.handleTab(0);
            })
            .catch((err) => {
              console.log('err :', err);
              enqueueSnackbar('Failed to Signup', { variant: 'error' });
            });
        },
        loaderListKeys.registerUser,
        dispatch
      );
    }
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div>
        <TextField
          error={!!formErrors['name']}
          id="outlined-error-helper-text"
          label="Name"
          helperText={!!formErrors['name'] ? 'Incorrect entry.' : ''}
          variant="outlined"
          value={name}
          onChange={(event) => {
            if (validator.isEmpty(event.target.value)) {
              const cloneErrors = Object.assign({}, formErrors);
              cloneErrors['name'] = 'Name Can not be Empty';
              setFormErrors(cloneErrors);
            } else {
              const cloneErrors = Object.assign({}, formErrors);
              delete cloneErrors['name'];
              setFormErrors(cloneErrors);
            }
            setName(event.target.value);
          }}
        />
      </div>
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
      <div>
        <TextField
          className={classes.textField}
          error={!!formErrors['confirmPassword']}
          id="outlined-error-helper-text"
          label="Confirm Password"
          helperText={!!formErrors['confirmPassword'] ? 'Incorrect entry.' : ''}
          variant="outlined"
          value={confirmPassword}
          onChange={(event) => {
            if (validator.isEmpty(event.target.value)) {
              const cloneErrors = Object.assign({}, formErrors);
              cloneErrors['confirmPassword'] =
                'Confirm Password can not be Empty';
              setFormErrors(cloneErrors);
            } else if (event.target.value !== password) {
              const cloneErrors = Object.assign({}, formErrors);
              cloneErrors['confirmPassword'] = 'Password must match';
              setFormErrors(cloneErrors);
            } else {
              const cloneErrors = Object.assign({}, formErrors);
              delete cloneErrors['confirmPassword'];
              setFormErrors(cloneErrors);
            }
            setConfirmPassword(event.target.value);
          }}
          type="password"
        />
      </div>
      <div>
        <TextField
          id="outlined-select-currency"
          select
          label="Select"
          onChange={(event) => {
            setRole(event.target.value);
          }}
          helperText="Please select your role"
          variant="outlined"
          value={role}
          style={{ textAlign: 'left' }}
        >
          {roles.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
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
          Sign Up
        </Button>
      </div>
    </form>
  );
}
export default Signup;
