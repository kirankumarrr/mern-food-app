import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AssignmentReturnedIcon from '@material-ui/icons/AssignmentReturned';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import Box from '@material-ui/core/Box';
import Signup from '../../components/Signup/Signup';
import SignIn from '../../components/SignIn/SignIn';

// import { submitLogin, signUp } from 'store/auth/action';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper
        // width: 500,
    },
    paper: {
        padding: theme.spacing(3),
        width: '80%',
        textAlign: 'center',
        color: theme.palette.text.secondary
    }
}));

export default function AuthenticationPage() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const handleTab = (newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <Grid container justifyContent="center" alignItems="center">
                <Paper className={classes.paper}>
                    <AppBar position="static" color="default">
                        <Tabs
                            centered
                            value={value}
                            onChange={handleChange}
                            indicatorColor="primary"
                            textColor="primary"
                            variant="fullWidth"
                            aria-label="full width tabs example"
                        >
                            <Tab
                                label="Sing In"
                                icon={<VpnKeyIcon />}
                                {...a11yProps(0)}
                            />
                            <Tab
                                label="Sign Up"
                                icon={<AssignmentReturnedIcon />}
                                {...a11yProps(1)}
                            />
                        </Tabs>
                    </AppBar>
                    <TabPanel value={value} index={0}>
                        <SignIn />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <Signup handleTab={handleTab} />
                    </TabPanel>
                </Paper>
            </Grid>
        </div>
    );
}
