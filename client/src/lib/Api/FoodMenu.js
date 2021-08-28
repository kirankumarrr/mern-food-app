import axios from 'axios';
const FoodMenuApi = {
  fetchFoodMenu(restaurantsId) {
    return axios.get(`api/restaurants/${restaurantsId}/foodMenu`);
  },

  createFoodMenu(payload, restaurantsId) {
    return axios.post(`api/restaurants/${restaurantsId}/foodMenu`, payload);
  },
};
export default FoodMenuApi;
