import axios from 'axios';
const Authentication = {
  registerUser(user) {
    return axios.post(`api/users/register`, user);
  },

  loginUser(user) {
    return axios.post(`api/users/login`, user);
  },
};
export default Authentication;
