import axios from 'axios';
// import { create } from 'core-js/fn/object';

export default {

  login(user) {
    return axios.post('/login', user)
  },

  register(user) {
    return axios.post('/register', user)
  },

  resetPasswordRequest(user){
    return axios.post('/auth/reset-password-request', user);
  },

  resetPassword(password){
    return axios.put('/editPassword'), password;
  }

  // createProfile(profile){
  //   return axios.post('/createprofile', profile)
  // }
  

}
