import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FoodMenuApi from '../../lib/Api/FoodMenu';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import SaveIcon from '@material-ui/icons/Save';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import CartApi from 'lib/Api/Cart';
import InfoIcon from '@material-ui/icons/Info';
import { setCartItems } from 'store/cart/action';
import { useSnackbar } from 'notistack';
import { loaderListKeys } from 'store/loading/config';
import { loadingWrapper } from 'utils/loaderWrapper';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'grid',
    gridGap: '20px',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    padding: '3rem',
    justifyItems: 'center',
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: 'repeat(1, 1fr)',
      padding: '1.5rem',
    },
  },
  cardRoot: {
    width: '100%',
  },
  mainWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '1rem',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  CardActions: {
    justifyContent: 'center',
  },
  button: {
    height: ' 60px',
    alignItems: 'center',
  },
  errorPara: {
    padding: ' 0 1rem',
    alignItems: 'end',
    display: 'flex',
  },
}));
const RestaurantFoodList = (props) => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const restaurantId = useSelector((state) => state.cart.restaurantId);
  const user = useSelector((state) => state.auth.user);
  const isOwner = user && 'role' in user && user.role === 'owner';

  const [foodMenuList, setFoodMenuList] = useState([]);
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();
  useEffect(() => {
    loadingWrapper(
      () => {
        return FoodMenuApi.fetchFoodMenu(id)
          .then((res) => {
            setFoodMenuList(res.data.data);
            return res;
          })
          .catch((err) => {
            enqueueSnackbar('Failed to fetch menu list', {
              variant: 'error',
            });
            return err;
          });
      },
      loaderListKeys.fetchFoodMenu,
      dispatch
    );
  }, [dispatch, id, enqueueSnackbar]);

  const handelAddToCart = (foodItem) => {
    CartApi.createCart(foodItem._id)
      .then((res) => {
        dispatch(setCartItems(res.data.data));
        enqueueSnackbar('Item added or incremented quantity in cart', {
          variant: 'success',
        });
      })
      .catch((_) => {
        enqueueSnackbar('Failed to add Item into cart', {
          variant: 'error',
        });
      });
  };

  return (
    <div>
      <div className={classes.mainWrapper}>
        <h1>Food Items</h1>
        {isOwner && (
          <Button
            variant="contained"
            color="primary"
            size="large"
            className={classes.button}
            onClick={() => {
              history.push(`/restaurants/${id}/food/create`);
            }}
            startIcon={<SaveIcon />}
          >
            Create New Food Item
          </Button>
        )}
      </div>
      {foodMenuList.length === 0 && <h1>Food Menu is Empty</h1>}
      <div className={classes.root}>
        {foodMenuList.map((restaurant, index) => {
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
              {!isOwner && (
                <CardActions className={classes.CardActions}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    disabled={restaurantId !== null && restaurantId !== id}
                    onClick={() => handelAddToCart(restaurant)}
                    startIcon={<AddShoppingCartIcon />}
                  >
                    Add to Cart
                  </Button>
                </CardActions>
              )}

              {restaurantId !== null && restaurantId !== id && (
                <p className={classes.errorPara}>
                  <span>
                    <InfoIcon />
                  </span>
                  You are not allowed to add items from multiple restaurant in
                  cart
                </p>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
};

RestaurantFoodList.propTypes = {};

export default RestaurantFoodList;
