<template>
<div>

    <!-- <div class="loading" v-if="isLoading">
       <img src="..\Assets\LoadingGif.gif"/> 
    </div> -->
      
  

  <div id="diary">
    <h2 class="header">Please Select Meal Type & Enter Food in Search Bar Below</h2>
   
    <select id="mealOptions" name="options" v-on:change="getOptionSelected">
        <option value="0" >--select meal type--</option>
        <option value="Breakfast">Breakfast</option>
        <option value="Lunch" >Lunch</option>
        <option value="Dinner" >Dinner</option>
        <option value="Snack" >Snack</option>
      </select>
      <br>

    <input type=date id="datebox" v-model="date">
    <div id="meals">
      <br><br>

      <search-food id='searchBreakfast' />

      <br>
          <addFood :meals="meals" />      

      </div>
      
  <button id="saveMeal" v-on:click="saveMeal(); calculateStars();" >Add Meal </button>
    
    <br>
  
    <div id="star">
      <div>Every time you hit your meal per day, a star is added! You lose all your stars if you miss a day, so stay consistent!</div>
    <span> {{this.starCount}} X</span>
    <span style="font-size:300%;color:yellow;">&starf;</span>
    </div>


  </div>
  <footer class="footer">Remember to Save Meal</footer>
</div>




</template>

<script>
import searchFood from '../components/SearchFood.vue'
import addFood from '../components/AddFood.vue'
import serverService from '../services/ServerService'

export default {
  name: "FoodDiary",
  components:{
    searchFood,
    addFood,
  },
  data(){
    return{
    
      showBreakfastSearch: false,
      date:'',
      mealId: '',
      starCount: '',
      currentUser: [],
      meals: {
        userId: '',
        mealName: '',
        mealDate: '',
        saved: false
      },
      todaysStars: '',
    }
  },

  methods:{
    calculateStars(){
      serverService.getStars().then((acquired)=>{
        this.starCount = acquired.data; 
        console.log(this.starCount)
      });   
    },
    getOptionSelected(){ 
      this.$store.state.breakfastFoods = [];
      this.meals.mealName = document.getElementById("mealOptions").value;
      this.meals.mealDate = this.date;
      
      serverService.addExistingFoodItems(this.meals).then((response) =>{
        let foodArr = response.data;
        for(let i =0; i < foodArr.length; i++){
          this.$store.commit("ADD_BREAKFAST_FOOD", foodArr[i]);
        }
      });



    },
    
    saveMeal(){ 

      if(document.getElementById("mealOptions").value == 0){
        return window.alert("Please select meal type before saving!");
      }
      
      this.meals.mealDate = this.date;

      serverService.getMealId(this.meals).then((response) => {
        this.mealId = response.data;
        console.log(this.mealId)
        if(this.mealId == 0){
          serverService.createMeal(this.meals).then((createResponse) => {
            this.mealId = createResponse.data;
            serverService.addFoodsToMeal(this.mealId, this.$store.state.breakfastFoods);
            var dropDown = document.getElementById("mealOptions");
            dropDown.selectedIndex = 0;
          });
        } else {
          serverService.addFoodsToMeal(this.mealId, this.$store.state.breakfastFoods);
          var dropDown = document.getElementById("mealOptions");
          dropDown.selectedIndex = 0;     
          }
          serverService.calculateStars(this.date).then((response)=>{
          this.starCount = response.data;
          })
      })
    
  }
  },
  created(){
    
    let today = new Date();
    this.date = today.getFullYear()+'-';

    if((today.getMonth()+1)< 10){
      this.date += '0'+ (today.getMonth()+1)+"-";
    } else {
      this.date += (today.getMonth()+1)+'-';
    }

    if(today.getDate()<10){
      this.date+= '0' + today.getDate();
    } else {
      this.date += today.getDate();
    }


    
     
   serverService.getStars().then((response)=>{
    this.starCount = response.data;
    console.log("calculate when meal is added");
      
  });
}
}


</script>

<style scoped>
#star{


  text-align: center;
}
.footer{
  text-align: center;
}

.header{
  text-align: center;
}

.topnav-login{
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  background-color: #39f077;
  font-family: 'Dosis', sans-serif;
  font-size: 20px;
  padding: 20px;
  margin-left: -10px;
  margin-top: -10px;

}

#mealOptions{
  width: fit-content;
  
}

#diary{
  margin: auto;
  margin-top: 5%;
  width:fit-content;
  display:flex;
  flex-direction: column;
  border-radius: 25px;
  border-style: solid;
  padding: 25px;
}

#datebox{
  margin-top: -5%;
  margin-right: 40%;
  margin-left: 40%;
}

#saveMeal{
  margin: auto;
  margin-top: 10px;
  padding: 10px 15px;
  background-color: yellow;
  font-weight: bold;
}





   /* .loading{
        display: flex;
        justify-content: center;
      }
      .loading::after{
        content: "";
        width: 50px;
        height: 50px;
        border: 10px solid #dddddd;
        border-top-color: #009579;
        border-radius: 50%;
        animation: loading 1s linear infinite;
      }
         @keyframes loading{
            to{
                transform: rotate(1turn);
            }
      } 
        .center {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            margin: auto;
        }    */

        /* #star{
          width: 0;
          height: 0;
          border-left: solid 100px transparent;
          border-right: solid 100px transparent;
          border-bottom: solid 70px gold;
          transform: rotateZ(35deg);
        }
        #star:before{
          position: absolute;
          display: block;
          content: '';
          width: 0;
          height: 0;
          top: -45px;
          left: -65px;
          border-left: solid 30px transparent;
          border-right: solid 30px transparent;
          border-bottom: solid 80px gold;
          transform: rotateZ(-35deg);
        }
        #star:after{
          position: absolute;
          display: block;
          content: '';
          width: 0;
          height: 0;
          top: 3px;
          left:-105px;
          border-left: solid 100px transparent;
          border-right: solid 100px transparent;
          border-bottom: solid 70px gold;
          transform: rotateZ(-70deg);
        } */

</style>