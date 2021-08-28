import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Restaurants from '../../lib/Api/Restaurants';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CreateRestaurant from '../CreateRestaurant/CreateRestaurant';
import { useSnackbar } from 'notistack';
import { loaderListKeys } from 'store/loading/config';
import { loadingWrapper } from 'utils/loaderWrapper';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'grid',
    gridGap: '20px',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    padding: '3rem',
    justifyItems: 'center',
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: 'repeat(1, 1fr)',
      padding: '1rem',
    },
  },
  cardRoot: {
    width: '100%',
  },
}));

const DashBoard = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { enqueueSnackbar } = useSnackbar();
  const user = useSelector((state) => state.auth.user);
  const [restaurants, setRestaurants] = useState(null);
  const history = useHistory();
  const isOwner = user && 'role' in user && user.role === 'owner';

  const fetchRestaurants = useCallback(() => {
    return Restaurants.fetchRestaurants()
      .then((res) => {
        if (isOwner) {
          const sliceRestaurants = res.data.data.filter(
            (res) => res.user.role === 'owner' && res.user.userId === user.id
          );
          setRestaurants(sliceRestaurants);
        } else {
          setRestaurants(res.data.data);
        }
        return res;
      })
      .catch((err) => {
        enqueueSnackbar('Failed to Fetched Restaurant', {
          variant: 'error',
        });
        return err;
      });
  }, [enqueueSnackbar, user, isOwner]);

  useEffect(() => {
    if (user) {
      loadingWrapper(
        fetchRestaurants,
        loaderListKeys.fetchRestaurants,
        dispatch
      );
    }
  }, [dispatch, fetchRestaurants, user, enqueueSnackbar]);

  if (!user) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="dashboard">
      <h1>{`Welcome ${user.name}`}</h1>
      {isOwner && restaurants !== null && restaurants.length === 0 && (
        <CreateRestaurant fetchRestaurants={fetchRestaurants} />
      )}

      <div className={classes.root}>
        {restaurants &&
          restaurants.map((restaurant, index) => {
            return (
              <Card className={classes.cardRoot} key={restaurant.name}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    height="140"
                    image={`https://picsum.photos/200/300?random=${index}`}
                    title="Contemplative Reptile"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {restaurant.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {restaurant.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      history.push(`/restaurants/${restaurant._id}/food`);
                    }}
                  >
                    Explore
                  </Button>
                </CardActions>
              </Card>
            );
          })}
      </div>
    </div>
  );
};

export default DashBoard;
