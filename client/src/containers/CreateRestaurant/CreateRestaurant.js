import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import validator from 'validator';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import Restaurants from '../../lib/Api/Restaurants';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Typography from '@material-ui/core/Typography';
//TODO : Loader Pending
//TODO : Success/Error Message
//TODO : Navigation
//TODO : Refactor
import { useSnackbar } from 'notistack';
function CreateRestaurant(props) {
  const [formErrors, setFormErrors] = useState({});
  const [name, setName] = useState('');
  const { enqueueSnackbar } = useSnackbar();
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const useStyles = makeStyles((theme) => ({
    root: {
      width: '80%',
      margin: '0 auto',
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
    textArea: {
      margin: '16px 16px 0',
      minHeight: '150px',
      boxSizing: 'border-box',
      maxWidth: '100%',
      width: '100%',
      fontSize: '18px',
      padding: '10px 5px 5px 15px',
      lineHeight: '20px',
      '&::placeholder': {
        fontSize: '1.1rem',
        color: !!formErrors['description'] ? '#f44336' : '#757575',
      },
    },
    textAreaPara: {
      margin: '0',
      padding: '0 0 0 30px',
      color: ' #f44336',
      fontSize: '0.75rem',
    },
    textAreaParaError: {
      border: '1px solid #f44336',
      color: '#f44336',
      '&::placeholder': {
        color: '#f44336',
      },
    },
  }));
  const classes = useStyles();

  const handelSingUp = () => {
    const cloneErrors = Object.assign({}, formErrors);
    const form = {
      name,
      description,
      type,
    };
    if (validator.isEmpty(name)) {
      cloneErrors['name'] = 'Name Can not be Empty';
    }
    if (validator.isEmpty(description)) {
      cloneErrors['description'] = 'Description Can not be Empty';
    }
    if (validator.isEmpty(type)) {
      cloneErrors['type'] = 'Type Can not be Empty';
    }
    setFormErrors(cloneErrors);

    if (Object.keys(formErrors).length === 0) {
      Restaurants.createRestaurants(form)
        .then((response) => {
          console.log('response :', response);
          props.fetchRestaurants();
          enqueueSnackbar('Restaurant created successfully', {
            variant: 'success',
          });
        })
        .catch((err) => {
          console.log('err :', err);
          enqueueSnackbar('Failed to create Restaurant', {
            variant: 'error',
          });
        });
    }
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div>
        <Typography
          gutterBottom
          variant="h5"
          component="h2"
          align="center"
          style={{ paddingTop: '2%' }}
        >
          Create your Restaurant
        </Typography>
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
      <div style={{ marginBottom: '16px' }}>
        <TextareaAutosize
          style={
            !!formErrors['description']
              ? {
                  border: '1px solid #f44336',
                  color: '#f44336',
                  '&::placeholder': {
                    color: '#f44336',
                  },
                }
              : {}
          }
          className={classes.textArea}
          id="outlined-error-helper-text"
          label="Description"
          maxRows={4}
          value={description}
          onChange={(event) => {
            if (validator.isEmpty(event.target.value)) {
              const cloneErrors = Object.assign({}, formErrors);
              cloneErrors['description'] = 'Description Can not be Empty';
              setFormErrors(cloneErrors);
            } else {
              const cloneErrors = Object.assign({}, formErrors);
              delete cloneErrors['description'];
              setFormErrors(cloneErrors);
            }
            setDescription(event.target.value);
          }}
          aria-label="maximum height"
          placeholder="Description"
        />
        {!!formErrors['description'] ? (
          <p className={classes.textAreaPara}>{formErrors['description']}</p>
        ) : null}
      </div>
      <div>
        <TextField
          className={classes.textField}
          error={!!formErrors['type']}
          id="outlined-error-helper-text"
          label="Type"
          helperText={!!formErrors['type'] ? 'Incorrect entry.' : ''}
          variant="outlined"
          value={type}
          onChange={(event) => {
            if (validator.isEmpty(event.target.value)) {
              const cloneErrors = Object.assign({}, formErrors);
              cloneErrors['type'] = 'Type can not be Empty';
              setFormErrors(cloneErrors);
            } else {
              const cloneErrors = Object.assign({}, formErrors);
              delete cloneErrors['type'];
              setFormErrors(cloneErrors);
            }
            setType(event.target.value);
          }}
          type="text"
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
          Save
        </Button>
      </div>
    </form>
  );
}
export default CreateRestaurant;
