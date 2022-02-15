
<template>
  <div class="small">
    <h1> Your Past Week Review</h1>
    <!-- {{this.foodCalories}} -->
    <input type="date" v-on:change="setStartDate" v-model="startDate" v-show="showInputs"/>
    <input type="date" v-on:change="setEndDate" v-model="endDate" v-show="showInputs"/>
    <DemoChart :data="calorieGoal" />
  </div>
</template>

<script>
import DemoChart from "../components/DemoChart.vue";
// import serverService from "../services/ServerService.js";
export default {
  name: "TestChart",
  components: { DemoChart },
  data() {
    return {
      calorieGoal: 0,
      startDate: "",
      endDate: "",
      showInputs: false
      // foodCalories: 0
    };
  },

  created: function () {
    let today = new Date();
    this.endDate = today.getFullYear() + "-";

    if (today.getMonth() + 1 < 10) {
      this.endDate += "0" + (today.getMonth() + 1) + "-";
    } else {
      this.endDate += today.getMonth() + 1 + "-";
    }

    if (today.getDate() < 10) {
      this.endDate += "0" + today.getDate();
    } else {
      this.endDate += today.getDate();
    }


    let initialDate = new Date();
    initialDate.setDate(initialDate.getDate() - 7)

    this.startDate = initialDate.getFullYear() + "-";

    if (initialDate.getMonth() + 1 < 10) {
      this.startDate += "0" + (initialDate.getMonth() + 1) + "-";
    } else {
      this.startDate += initialDate.getMonth() + 1 + "-";
    }

    if (initialDate.getDate() < 10) {
      this.startDate += "0" + initialDate.getDate();
    } else {
      this.startDate += initialDate.getDate();
    }

    this.setStartDate()
    this.setEndDate()

   
  },
  methods: {
    makeData: function () {
      console.log(this.calorieGoal);
    },

    setStartDate() {
      this.$store.commit("SET_START_DATE", this.startDate);
    },
    setEndDate() {
      this.$store.commit("SET_END_DATE", this.endDate);
    },
  },
};
</script>

<style scoped>
.small {
  max-width: 600px;
  margin: 150px auto;
}

h1{
  text-align: center;
}
</style>