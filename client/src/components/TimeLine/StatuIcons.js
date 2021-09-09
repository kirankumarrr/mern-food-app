import React from 'react';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import TimelineDot from '@material-ui/lab/TimelineDot';
import CancelIcon from '@material-ui/icons/Cancel';
import CachedIcon from '@material-ui/icons/Cached';
import GolfCourseIcon from '@material-ui/icons/GolfCourse';
import DirectionsBikeIcon from '@material-ui/icons/DirectionsBike';
import LibraryAddCheckIcon from '@material-ui/icons/LibraryAddCheck';
const StatuIcons = (props) => {
    switch (props.status) {
        case 'processing': {
            return (
                <TimelineDot color="primary">
                    <CachedIcon />
                </TimelineDot>
            );
        }
        case 'canceled': {
            return (
                <TimelineDot color="secondary">
                    <CancelIcon />
                </TimelineDot>
            );
        }
        case 'inRoute': {
            return (
                <TimelineDot>
                    <DirectionsBikeIcon />
                </TimelineDot>
            );
        }
        case 'delivered': {
            return (
                <TimelineDot color="inherit">
                    <GolfCourseIcon />
                </TimelineDot>
            );
        }
        case 'received': {
            return (
                <TimelineDot>
                    <LibraryAddCheckIcon />
                </TimelineDot>
            );
        }

        default: {
            return (
                <TimelineDot color="primary">
                    <FastfoodIcon />
                </TimelineDot>
            );
        }
    }
};

export default StatuIcons;
