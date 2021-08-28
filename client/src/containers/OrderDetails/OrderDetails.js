import TimeLine from 'components/TimeLine/TimeLine';
import OrderApi from 'lib/Api/Order';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { loadingWrapper } from 'utils/loaderWrapper';
import { loaderListKeys } from 'store/loading/config';
import { useDispatch } from 'react-redux';
const OrderDetails = () => {
  const [orderDetails, setOrderDetails] = useState({});
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    loadingWrapper(
      () => {
        OrderApi.fetchOrderDetails(id)
          .then((res) => {
            setOrderDetails(res.data.data);
          })
          .catch((_) => {
            enqueueSnackbar('Failed to fetch order details', {
              variant: 'error',
            });
          });
      },
      loaderListKeys.fetchOrderDetails,
      dispatch
    );
  }, [dispatch, id, enqueueSnackbar]);
  return (
    <div>
      <h1>Order Tracking Details</h1>
      <TimeLine orderDetails={orderDetails.detailStatus || []} />
    </div>
  );
};

export default OrderDetails;
