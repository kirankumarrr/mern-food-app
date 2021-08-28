import axios from 'axios';
const OrderApi = {
  fetchOrders() {
    return axios.get(`api/order`);
  },
  fetchOrderDetails(id) {
    return axios.get(`api/order/${id}`);
  },
  createOrder(payload) {
    return axios.post(`api/order`, payload);
  },
  deleteItemFromOrder(foodId) {
    return axios.delete(`api/order/${foodId}`);
  },
  updateStatus(orderId, status) {
    return axios.put(`api/order/${orderId}/${status}`);
  },
};
export default OrderApi;
