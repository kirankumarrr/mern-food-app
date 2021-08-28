import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import DeleteIcon from '@material-ui/icons/Delete';
import OrderApi from 'lib/Api/Order';
import { roleList } from './config';
import { useSnackbar } from 'notistack';
import { loaderListKeys } from 'store/loading/config';
import { loadingWrapper } from 'utils/loaderWrapper';

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
  trackStatus: {
    [theme.breakpoints.down('sm')]: {
      margin: '5px',
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
const Orders = (props) => {
  const classes = useStyles();
  const user = useSelector((state) => state.auth.user);
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const [orders, setOrders] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    loadingWrapper(
      () => {
        return OrderApi.fetchOrders()
          .then((res) => {
            setOrders(res.data.data);
            return res;
          })
          .catch((err) => {
            enqueueSnackbar('Failed to orders', {
              variant: 'error',
            });
            return err;
          });
      },
      loaderListKeys.fetchFoodMenu,
      dispatch
    );
  }, [dispatch, enqueueSnackbar]);

  const handelOrderStatus = (order, nextStatus, index) => {
    loadingWrapper(
      () => {
        return OrderApi.updateStatus(order._id, nextStatus)
          .then((res) => {
            const getOrders = Object.assign([], orders);
            getOrders[index].status = res.data.data.status;
            setOrders(getOrders);
            return res;
          })
          .catch((err) => {
            enqueueSnackbar('Failed to update order Status', {
              variant: 'error',
            });
            return err;
          });
      },
      loaderListKeys.updateStatus,
      dispatch
    );
  };
  return (
    <div>
      <h1>Orders</h1>
      <div className={classes.root}>
        {orders.map((order, index) => {
          const getButtonName = roleList[user.role][order.status];
          return (
            <Card className={classes.cardRoot} key={index}>
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
                    Restaurant Name : {order.restaurantName}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    Order Id : {order._id}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    Order Status :{' '}
                    <span style={{ textTransform: 'capitalize' }}>
                      {order.status}
                    </span>
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions className={classes.CardActions}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  className={classes.trackStatus}
                  onClick={() => history.push(`orders/${order._id}`)}
                  startIcon={<DeleteIcon />}
                >
                  Track Status
                </Button>
                {getButtonName && getButtonName.buttonName && (
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    // className={classes.button}
                    onClick={() =>
                      handelOrderStatus(order, getButtonName.value, index)
                    }
                    startIcon={<DeleteIcon />}
                  >
                    {getButtonName.buttonName}
                  </Button>
                )}
              </CardActions>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;
