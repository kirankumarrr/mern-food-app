import axios from 'axios';
const Restaurants = {
    fetchRestaurants(user) {
        return axios.get(`api/restaurants`, user);
    },

    createRestaurants(user) {
        return axios.post(`api/restaurants`, user);
    }
};
export default Restaurants;
