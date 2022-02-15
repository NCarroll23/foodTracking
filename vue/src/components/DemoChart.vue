
<script>
import { Line } from "vue-chartjs";

import ServerService from '../services/ServerService';
export default {
  extends: Line,
  

  mounted() {
    const serverServiceObj = {
      startDate: this.$store.state.graphStartDate, 
      endDate: this.$store.state.graphEndDate
      }
    let labelsArr = [];
    let calorieGoal = [];
    let sumArr = [];
    let goalCals = 0;

    ServerService.getCalsPerDay(serverServiceObj).then((response)=>{
      ServerService.getProfileWithoutId().then((responseProfile) => {
        goalCals = responseProfile.data.calorieGoal;
      

      let objectsReturned = response.data;
      
      objectsReturned.forEach((element) => {
        labelsArr.push(element.calorieDate)
        sumArr.push(element.sum)
        calorieGoal.push(goalCals);

      })

      this.renderChart({
      labels: labelsArr,
      datasets: [
        {
          fill: false,
          label: "Daily Calories",
          borderColor: "#0000FF",
          data: sumArr
        },
        {
          
          label: "Calorie Goal",
          fill:false,
          borderColor: "#f87979",
          data: calorieGoal
        },
      ]},
      {
        scales: {
          yAxes: [{
            scaleLabel:{
              display: true,
              labelString: 'C A L O R I E S'
            },
            ticks: {
              beginAtZero: true,
              max: 4000
              }
          }],
          xAxes:[{
            scaleLabel:{
              display: true,
              labelString: 'L O G G E D   D A T E'
            }
          }]
        }
    
      }
      
    );

    })
    })
  }
}
</script>