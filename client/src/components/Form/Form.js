import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import validator from 'validator';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Typography from '@material-ui/core/Typography';
//TODO : Loader Pending
//TODO : Success/Error Message
//TODO : Navigation
//TODO : Refactor

function Form(props) {
    const [formErrors, setFormErrors] = useState({});
    const [formValues, setFormValues] = useState({});
    const useStyles = makeStyles((theme) => ({
        root: {
            width: '80%',
            margin: '0 auto',
            '& .MuiTextField-root': {
                margin: theme.spacing(2),
                width: '100%'
            }
        },
        formControl: {
            margin: theme.spacing(1)
        },
        textField: {
            '& .MuiTextField-root': {
                margin: theme.spacing(2),
                width: '100%'
            }
        },
        buttonDiv: {
            display: 'flex',
            justifyContent: 'flex-end'
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
                color: !!formErrors['description'] ? '#f44336' : '#757575'
            }
        },
        textAreaPara: {
            margin: '0',
            padding: '0 0 0 30px',
            color: ' #f44336',
            fontSize: '0.75rem'
        },
        textAreaParaError: {
            border: '1px solid #f44336',
            color: '#f44336',
            '&::placeholder': {
                color: '#f44336'
            }
        }
    }));
    const classes = useStyles();

    const handleChange = (event, element) => {
        if (element.isCheckEmpty) {
            if (validator.isEmpty(event.target.value)) {
                const cloneErrors = Object.assign({}, formErrors);
                cloneErrors[element.field] = element.errorMessage;
                setFormErrors(cloneErrors);
            } else {
                const cloneErrors = Object.assign({}, formErrors);
                delete cloneErrors[element.field];
                setFormErrors(cloneErrors);
            }
        }
        const getForm = Object.assign({}, formValues);
        getForm[element.field] = event.target.value;

        if (element.regex) {
            let regPattern = new RegExp(element.regex);
            if (
                event.target.value.match(regPattern) ||
                event.target.value === ''
            ) {
                setFormValues(getForm);
            }
        } else {
            setFormValues(getForm);
        }
    };

    return (
        <form className={classes.root} noValidate autoComplete="off">
            <Typography
                gutterBottom
                variant="h5"
                component="h2"
                align="center"
                style={{ paddingTop: '2%' }}
            >
                {props.heading}
            </Typography>
            {props.formList.map((element, index) => {
                if (element.fieldType === 'textArea') {
                    return (
                        <div style={{ marginBottom: '16px' }} key={index}>
                            <TextareaAutosize
                                style={
                                    !!formErrors[element.field]
                                        ? {
                                              border: '1px solid #f44336',
                                              color: '#f44336',
                                              '&::placeholder': {
                                                  color: '#f44336'
                                              }
                                          }
                                        : {}
                                }
                                className={classes.textArea}
                                id="outlined-error-helper-text"
                                label={element.label}
                                maxRows={4}
                                value={formValues[element.field] || ''}
                                onChange={(e) => handleChange(e, element)}
                                aria-label="maximum height"
                                placeholder="Description"
                            />
                            {!!formErrors['description'] ? (
                                <p className={classes.textAreaPara}>
                                    {formErrors['description']}
                                </p>
                            ) : null}
                        </div>
                    );
                }
                return (
                    <div key={index}>
                        <TextField
                            error={!!formErrors[element.field]}
                            id="outlined-error-helper-text"
                            label={element.label}
                            helperText={
                                !!formErrors[element.field]
                                    ? element.errorMessage
                                    : ''
                            }
                            variant="outlined"
                            value={formValues[element.field] || ''}
                            onChange={(e) => handleChange(e, element)}
                        />
                    </div>
                );
            })}
            <div className={classes.buttonDiv}>
                <Button
                    onClick={() => {
                        props.handelFormSubmit(formValues, formErrors);
                    }}
                    variant="contained"
                    color="primary"
                    size="large"
                    className={classes.button}
                    startIcon={<SaveIcon />}
                    disabled={
                        Object.keys(formErrors).length > 0 ||
                        Object.keys(formValues).length <=
                            props.formList.length - 1
                    }
                >
                    Save
                </Button>
            </div>
        </form>
    );
}
export default Form;
