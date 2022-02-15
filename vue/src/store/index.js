import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'


Vue.use(Vuex)

/*
 * The authorization header is set for axios when you login but what happens when you come back or
 * the page is refreshed. When that happens you need to check for the token in local storage and if it
 * exists you should set the header so that it will be attached to each request
 */
const currentToken = localStorage.getItem('token')
const currentUser = JSON.parse(localStorage.getItem('user'));

if(currentToken != null) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${currentToken}`;
}

export default new Vuex.Store({
  state: {
    token: currentToken || '',
    user: currentUser || {},
    breakfastFoods: [],
    lunchFoods: [],
    dinnerFoods:[],
    snackFoods:[],
    meals: [],
    calorieGoal: 0,
    graphStartDate: new Date(),
    graphEndDate: new Date()
  },
  mutations: {
    SET_AUTH_TOKEN(state, token) {
      state.token = token;
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    },
    SET_USER(state, user) {
      state.user = user;
      localStorage.setItem('user',JSON.stringify(user));
    },
    LOGOUT(state) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      state.token = '';
      state.user = {};
      axios.defaults.headers.common = {};
    },
    ADD_BREAKFAST_FOOD(state, foodItem){
      state.breakfastFoods.push(foodItem)
    },
    ADD_TO_MEAL(state, mealItem){
      state.meals.push(mealItem)
    },
    SET_CALORIE_GOAL(state, calorieGoal){
      state.calorieGoal = calorieGoal;
    },
    DELETE_MEAL(state, mealToDelete){
      state.breakfastFoods = state.filter((meal)=>{
        return meal.mealId !== mealToDelete;
      })
    },
    SET_START_DATE(state, date){
      state.graphStartDate = date;
    },
    SET_END_DATE(state, date){
      state.graphEndDate = date;
    }
  }
})
