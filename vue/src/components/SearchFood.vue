<template>
  <div id="searchComponent">

      <button v-on:click='searchFood' class="foodSeachButton"> Enter Food Search</button>

      <!-- <div v-show="searchFood === ">
        <img src="..\Assets\Spinner-3.gif">
      </div>
       -->
      <input type="text" id="foodSearchBox" v-model='searchTerm' v-on:keyup.enter='searchFood'/>
      
      <table v-if="foodFound">
          
          <thead>
              <th>Food Description</th>
              <th></th>
          </thead>
          
          <tbody>
              <tr v-for="food in foodReturns" v-bind:key="food.foodId">
                  <td>{{food.foodType}}</td>
                  <td><button v-on:click="addBreakfastFood(food.foodId)">Add Food</button></td>
              </tr>
          </tbody>
      </table>
  </div>
</template>

<script>
import serverService from '../services/ServerService.js';
export default {
    name: 'searchFood',
    data(){
        return{
         
           
            searchTerm: '',
            foodReturns:[],
            foodFound: false
        }
    },
    methods:{
        searchFood(){
            serverService.searchFoods(this.searchTerm).then(response => {
                this.foodReturns = response.data;
                this.foodFound = true;
                this.isLoading = false;
            });
        },
        addBreakfastFood(fdcId){
            let foodItem ="";
            serverService.getFood(fdcId).then((response) => {
                foodItem = response.data;
                this.$store.commit("ADD_BREAKFAST_FOOD", foodItem)
                document.getElementById("foodSearchBox").value = "";
            })
            this.foodReturns = [];
            this.foodFound = false;    
            this.isLoading = false;
            

        }
       
     
     



    }
    
}


</script>

<style>


.hidden {
display:none;
}
.visible {
display:block;
position:absolute;
top:0;left:0;
}

 
  
</style>