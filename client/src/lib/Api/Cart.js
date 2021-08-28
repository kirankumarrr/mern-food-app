import axios from 'axios';
const CartApi = {
  fetchCart() {
    return axios.get(`api/cart`);
  },

  createCart(foodId) {
    return axios.post(`api/cart/${foodId}`);
  },
  deleteItemFromCart(foodId) {
    return axios.delete(`api/cart/${foodId}`);
  },
  clearAllCart() {
    return axios.delete(`api/cart/clearAll`);
  },
};
export default CartApi;
