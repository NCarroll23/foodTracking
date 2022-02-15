import axios from 'axios';

export default{
    getProfile(id) {
      return axios.get(`/getProfile/${id}`);
    },
    getProfileWithoutId() {
      return axios.get(`/getProfileWithoutId`);
    },
    getProfileImage(){
      return axios.get('/myProfilePic');
    },
    updateUserProfile(profile) {
      return axios.put('/editUserProfile', profile);
    },
    updatePassword(password){
        return axios.put('/editPassword', password);
    },
    createProfile(profile) {
      return axios.post('/createprofile', profile);
    },
    searchFoods(foodSearch){
      return axios.get(`/foods`, {params: {food: foodSearch}})
    },
    getFood(fdcId){
      console.log(fdcId);
      return axios.get(`/food/${fdcId}`);
    },
    getIdByUsername(username){
    return axios.get('/getIdByUsername', {params: {username: username}} );
    },
    getMeals(id){
      return axios.get(`/meal/${id}`);
    },
    createMeal(meal) {
      return axios.post('/createMeal', meal);
    },
    getMealId(meal){
      console.log(meal);
      return axios.post('/getMealId', meal);
    },
    addFoodsToMeal(mealId, foods){
      return axios.post(`/addMealItems/${mealId}`, foods)
    },
    addExistingFoodItems(meal){
      return axios.post('/getMealFoods', meal)
    },
    deleteMeal(foods, mealName, mealDate){

      return axios.put(`/deleteMeal/${mealName}/${mealDate}`, foods); //needs work
    },
    calculateStars(mealDate){
      return axios.put(`/addStars/${mealDate}`);
    },
    getStars(){
      return axios.get('/getStars');
    },
    getLastMeal(){
      return axios.get('/getLastMeal');
    },
    getCalsPerDay(calsPerDay){
      return axios.post('/getCalorieByDateRange', calsPerDay)
    },
    getMealSummary(){
      return axios.get('/getMealSummary');
    }

}