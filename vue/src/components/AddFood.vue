<template>
    <div>
          

  <table id="table">
      <tr>
          <th>Food Description</th>
          <th>Calories</th>
          <th>Carbohydrates</th>
          <th>Fat</th>
          <th>Protein</th>
          <th>Cholesterol</th>
          <th>Sodium</th>
          <th>Fiber</th>
          <th>Sugar</th>
          <th></th>
          
      </tr>
      <tbody>
          <tr v-for="food in $store.state.breakfastFoods" v-bind:key="food.id">
              <td>{{food.foodType}}</td>
              <td>{{food.calories}}</td>
              <td>{{food.carbohydrates}}</td>
              <td>{{food.fat}}</td>
              <td>{{food.protein}}</td>
              <td>{{food.cholesterol}}</td>
              <td>{{food.sodium}}</td>
              <td>{{food.fiber}}</td>
              <td>{{food.sugar}}</td>
              <td><input type="checkbox" v-on:change="selectMeal($event, food)" v-bind:id="food.foodId" v-bind:value="food.foodId"/></td>
          </tr>
      </tbody>
  </table>

  
  <div id="choices">
  <button id="deleteMe"  v-on:click="deleteMyFood">DELETE</button>

  </div>

    </div>


</template>
<script>

import serverService from '../services/ServerService.js'
export default {
    name: "addFood",
    props:["meals"],

    data(){
        return{
            foodId: '',
            selectedMealIds: [],
            userId: '',
            
           
        }
    },

methods: {
     selectMeal(event, food) {

         if(event.target.checked === true){
             console.log(food.foodId);
            this.selectedMealIds.push(parseInt(food.foodId));
       } else{
           this.selectedMealIds = this.selectedMealIds.filter((id)=>{
               return id !== parseInt(food.foodId);
           });
       }
    },
     deleteMyFood(){
         console.log(this.meals)
                if (confirm("Are you sure you want to delete this Food? This action cannot be undone.")) {
                    let foods = this.selectedMealIds;
                serverService.deleteMeal(foods, this.meals.mealName, this.meals.mealDate).then((response)=> {

                    if(response.status === 200){
                        window.alert("Meal successfully deleted");
                        this.selectedMealIds = [];
                    }
                });
            }
            }
}
}




</script>

<style>
table,
th,
td {
    border: 1px solid white;
}
#foodTable {
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
    overflow-x: auto;
    border-spacing: 0;
    border-color: white;
}

tbody {
    white-space: nowrap;
}

th,
td {
    padding: 5px 10px;
    border-top-width: 0;
    border-left-width: 0;
}

th {
    top: 0;
    background: #39f077;
    vertical-align: top;
}

th:last-child,
td:last-child {
    border-right-width: 0;
}

tr:last-child td {
    border-bottom-width: 0;
}

#choices{
  display: flex;
  justify-content: center;
}


</style>