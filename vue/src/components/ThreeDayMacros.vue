<template>
  <div id="macros">
      <table id="MacrosTable">
          <tr>
              <th>Date</th>
              <th>Calories</th>
              <th>Carbs</th>
              <th>Protein</th>
              <th>Fat</th>
          </tr>
          <tbody>
              <tr v-for="sum in mealSum" v-bind:key="sum.mealDate">
                  <td>{{sum.mealDate}}</td>
                  <td>{{sum.calories}}</td>
                  <td>{{sum.carbohydrates}}</td>
                  <td>{{sum.protein}}</td>
                  <td>{{sum.fat}}</td>
              </tr>
          </tbody>
      </table>
  </div>
</template>

<script>
import serverService from '../services/ServerService.js'

export default {
    data(){
        return{
            mealSum: []
        }
    },
    created(){
        serverService.getMealSummary().then((response) => {
            console.log(response.data);
            this.mealSum=response.data;
        })

    }

}
</script>

<style>
#macros{
    display: flex;
    margin: auto;
}
</style>