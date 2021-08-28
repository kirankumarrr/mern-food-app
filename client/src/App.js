import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { getCookieValue } from './utils/cookies';
import { Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './HOC/PrivateRoute';
import NavBar from './components/NavBar/NavBar';
import DashBoard from './containers/DashBoard/DashBoard';
import AuthenticationPage from './containers/Auth/AuthenticationPage';
import { setCurrentUser, signOut } from './store/auth/action';
import { withRouter } from 'react-router';
import RestaurantFoodList from './containers/RestaurantFoodList/RestaurantFoodList';
import CreateFoodMenu from './containers/CreateFoodMenu/CreateFoodMenu';
import Cart from 'containers/Cart/Cart';
import Orders from 'containers/Orders/Orders';
import OrderDetails from 'containers/OrderDetails/OrderDetails';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useSelector } from 'react-redux';
const useStyles = makeStyles((theme) => ({
  mainWrapper: {
    padding: '64px 30px 0',
    [theme.breakpoints.down('sm')]: {
      padding: '64px 10px 0',
    },
  },
}));

const App = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isloading = useSelector((state) => state.loading.isloading);
  useEffect(() => {
    if (document.cookie.indexOf('jwtToken=') !== -1) {
      setAuthToken(getCookieValue('jwtToken'));
      const decoded = jwt_decode(getCookieValue('jwtToken'));
      dispatch(setCurrentUser(decoded));
      // Check for expired token
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        dispatch(signOut());
        props.history.push('/auth');
      }
    } else {
      props.history.push('/auth');
    }
  }, [dispatch, props.history]);

  return (
    <div className="app-container">
      <NavBar />

      <main className={classes.mainWrapper}>
        <Switch>
          <PrivateRoute
            exact
            path="/restaurants/:id/food/create"
            component={CreateFoodMenu}
          />
          <PrivateRoute
            exact
            path="/restaurants/:id/food"
            component={RestaurantFoodList}
          />
          <PrivateRoute exact path="/cart" component={Cart} />
          <PrivateRoute exact path="/orders/:id" component={OrderDetails} />
          <PrivateRoute exact path="/orders" component={Orders} />
          <PrivateRoute exact path="/" component={DashBoard} />
          <Route exact path="/auth" component={AuthenticationPage} />
        </Switch>
        <Backdrop className={classes.backdrop} open={isloading}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </main>

      {/* <Footer /> */}
    </div>
  );
};

export default withRouter(App);
