import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import StatuIcons from './StatuIcons';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: '6px 16px'
    },
    secondaryTail: {
        backgroundColor: theme.palette.secondary.main
    },
    statusHeading: {
        textTransform: 'capitalize'
    }
}));

export default function TimeLine(props) {
    const classes = useStyles();
    return (
        <Timeline align="alternate">
            {(props.orderDetails.status || []).map((trackStatus, index) => {
                return (
                    <TimelineItem key={index}>
                        <TimelineOppositeContent>
                            <Typography variant="body2" color="textSecondary">
                                {moment(trackStatus.updatedAt).format(
                                    'DD-MM-YYYY h:mm a'
                                )}
                            </Typography>
                        </TimelineOppositeContent>

                        <TimelineSeparator>
                            <StatuIcons status={trackStatus.currentState} />
                            {index < props.orderDetails.status.length - 1 && (
                                <TimelineConnector />
                            )}
                        </TimelineSeparator>

                        <TimelineContent>
                            <Paper elevation={3} className={classes.paper}>
                                <Typography
                                    variant="h6"
                                    component="h1"
                                    className={classes.statusHeading}
                                >
                                    {trackStatus.currentState}
                                </Typography>
                            </Paper>
                        </TimelineContent>
                    </TimelineItem>
                );
            })}
        </Timeline>
    );
}
