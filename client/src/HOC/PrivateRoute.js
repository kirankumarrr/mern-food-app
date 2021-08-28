import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import jwt_decode from 'jwt-decode';
import { getCookieValue } from 'utils/cookies';
import setAuthToken from 'utils/setAuthToken';
const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  let checkCookies = false;
  if (document.cookie.indexOf('jwtToken=') !== -1) {
    // if cookies exist set them to axios token
    setAuthToken(getCookieValue('jwtToken'));
    // decode token
    const decoded = jwt_decode(getCookieValue('jwtToken'));
    // console.log('decoded :', decoded);
    // dispatch action using decoded token
    // dispatch(setCurrentUser(decoded));
    // Check for expired token
    const currentTime = Date.now() / 1000;
    if (decoded.exp > currentTime) {
      checkCookies = true;
    }
  }
  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn || checkCookies ? (
          <Component {...props} />
        ) : (
          <Redirect to="/auth" />
        )
      }
    />
  );
};

export default PrivateRoute;
