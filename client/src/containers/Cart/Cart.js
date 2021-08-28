import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import DeleteIcon from '@material-ui/icons/Delete';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import CartApi from 'lib/Api/Cart';
import { clearCartItems, deleteCartItems } from 'store/cart/action';
import OrderApi from 'lib/Api/Order';
import { useSnackbar } from 'notistack';
import { loadingWrapper } from 'utils/loaderWrapper';
import { loaderListKeys } from 'store/loading/config';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'grid',
    gridGap: '20px',
    // gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    padding: '3rem',
    justifyItems: 'center',
    [theme.breakpoints.down('sm')]: {
      // gridTemplateColumns: 'repeat(1, 1fr)',
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
    justifyContent: 'space-between',
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  button: {
    height: ' 60px',
    alignItems: 'center',
  },
  placeOrder: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: ' 0 3rem 2rem',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  placeOrderTotal: {
    padding: '1rem',
  },
}));
const Cart = (props) => {
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const cart = useSelector((state) => state.cart.cart);
  const restaurantId = useSelector((state) => state.cart.restaurantId);
  const [totalAmount, setTotalAmount] = useState(0);
  const dispatch = useDispatch();
  const history = useHistory();
  const handelDeleteCartItem = (foodItem) => {
    loadingWrapper(
      () => {
        CartApi.deleteItemFromCart(foodItem.foodId)
          .then((res) => {
            dispatch(deleteCartItems(foodItem.foodId));
            enqueueSnackbar(
              `Item deleted from cart successfully ${foodItem.foodId}`,
              {
                variant: 'success',
              }
            );
          })
          .catch((err) => {
            console.log(err);
            enqueueSnackbar(`Failed to delete cart ${foodItem.foodId}`, {
              variant: 'error',
            });
          });
      },
      loaderListKeys.fetchOrderDetails,
      dispatch
    );
  };

  React.useMemo(() => {
    const finalAmout = cart.reduce((acc, item) => {
      acc += item.price * item.quantity;
      return acc;
    }, 0);

    setTotalAmount(finalAmout);
  }, [cart]);

  const handelOrder = () => {
    const payload = {};
    payload.orderMenu = cart.map((record) => {
      return {
        food: record,
        quantity: record.quantity,
      };
    });
    payload.restaurantId = restaurantId;
    payload.totalAmount = totalAmount;
    payload.status = 'placed';

    loadingWrapper(
      () => {
        OrderApi.createOrder(payload)
          .then((res) => {
            enqueueSnackbar('Order Created successfully', {
              variant: 'success',
            });
            CartApi.clearAllCart()
              .then((res) => {
                dispatch(clearCartItems());
                history.push('/orders');
              })
              .catch((err) => {
                enqueueSnackbar('Failed to clear all items from cart', {
                  variant: 'error',
                });
              });
          })
          .catch((err) => {
            console.log(err);
            enqueueSnackbar('Failed to create order', {
              variant: 'error',
            });
          });
      },
      loaderListKeys.createOrder,
      dispatch
    );
  };
  return (
    <div>
      <h1>Cart</h1>
      {cart.length === 0 && <h3>Your cart is empty</h3>}
      <div className={classes.root}>
        {cart.map((restaurant, index) => {
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
              <CardActions className={classes.CardActions}>
                <div>
                  <p>Quantity: {restaurant.quantity}</p>
                  <p>Price: ${restaurant.quantity * restaurant.price}</p>
                </div>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  // className={classes.button}
                  onClick={() => handelDeleteCartItem(restaurant)}
                  startIcon={<DeleteIcon />}
                >
                  Remove
                </Button>
              </CardActions>
            </Card>
          );
        })}
      </div>
      <div className={classes.placeOrder}>
        <Typography
          gutterBottom
          variant="h6"
          component="h3"
          className={classes.placeOrderTotal}
        >
          Totat : ${totalAmount}
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          size="medium"
          disabled={cart.length === 0}
          onClick={handelOrder}
          startIcon={<ShoppingCartIcon />}
        >
          Place Order
        </Button>
      </div>
    </div>
  );
};

Cart.propTypes = {};

export default Cart;
