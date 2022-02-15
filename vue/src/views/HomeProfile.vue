<template>
  <div id="homeProfile">
    <div id="outerProfile">
      <div id="leftBox">
        <img class= "user-profile-pic" :src= "this.currentUser.fileData">
        <div class="user-info">
          <div class="left-info">
            <div class = "name-box">
            <label id="name" class="user-info-item"
              >Name: {{this.currentUser.firstName}} {{ this.currentUser.lastName }}</label>

            </div>
            <label id="dob" class="user-info-item"
              >Date of Birth: {{ this.currentUser.birthday }}
            </label>
            <label id="currWeight" class="user-info-item"
              >Current Weight: {{ this.currentUser.currentWeight }}</label
            >

            <label id="calGoal" class="user-info-item"
              >Calorie Goal: {{ this.currentUser.calorieGoal }}</label
            >


          </div>
          <div class="right-info">
            <label id="age" class="user-info-item"
              >Age: {{ this.currentUser.age }}</label
            >
            <label id="height" class="user-info-item"
              >Height: {{ this.currentUser.height }}</label
            >

            <label id="desiredWeight" class="user-info-item">Desired Weight: {{ this.currentUser.desiredWeight }}
            </label>

            <label id="mealTarget" class="user-info-item"
              >Meal Target: {{ this.currentUser.mealsPerDay }}</label
            >
          </div>

        </div>
        
          <router-link v-bind:to="'/editUserProfile/1'"
            ><h2>Edit Profile</h2></router-link
          >
      </div>
      <br />
      <div id="topRightBox">
        <div class="links">
          <router-link v-bind:to="'/foodDiary'"
            ><h2>Log Your Meals</h2></router-link
          >
        </div>
        <div class="links">
          Here are your daily summaries for last three days of logged meals!
        </div>
        <three-day-macros />
      </div>
      <br />
      <div id="bottomRightBox">
 
    <div id= "progressContainer">
          <router-link v-bind:to="'/testChart'" id="progress-links"
            ><h2>View Progress</h2></router-link>
            <div class = links> Here is your calories for each day in the past week!
            </div>
    </div>

      <div id= "progressContainer2">
        <chart class="chart" />
      </div>
       
       
        
       
      </div>
    </div>
  </div>
</template>

<script>
import threeDayMacros from "../components/ThreeDayMacros.vue";
import serverService from "../services/ServerService.js";
import chart from "../components/DemoChart.vue";
export default {
  data() {
    return {
      currentUser: {
        firstName: "",
        lastName: "",
        age: "",
        birthday: [],
        height: "",
        currentWeight: "",
        desiredWeight: "",
        displayName: "",
        calorieGoal: "",
        mealsPerDay: "",
        fileData: "",
      },
      startDate: "",
      endDate: "",
    };
  },
  components: {
    threeDayMacros,
    chart,
  },
  created() {

    serverService.getProfile(0).then((response) => {
      console.log(response);
      this.currentUser = response.data;
      console.log(this.currentUser.displayName);
    });


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
    initialDate.setDate(initialDate.getDate() - 7);
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
    this.setStartDate();
    this.setEndDate();

    serverService.getProfileImage().then((response)=>{
      this.currentUser.fileData = response.data;
    })

  },
  methods: {
    setStartDate() {
      this.$store.commit("SET_START_DATE", this.startDate);
    },
    setEndDate() {
      this.$store.commit("SET_END_DATE", this.endDate);
    },
  },
};
</script>

<style>

.name-box{
  display: flex;
}

.user-info {
  display: flex;
  background-color: white;
  border-radius: 25px;
  /* padding: 5px; */
  margin: auto;
}

.left-info {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-evenly;
  padding: 10px;
  align-items: flex-start;
}

.right-info {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-evenly;
  padding: 10px;
  align-items: flex-start;
}

.user-info-item{
  padding: 20px;
  font-size: 20px;  
}

.weights {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  /* padding: 20px; */
}
/* 
#desiredWeight {
  padding-left: 10px;
} */

.cal-meal {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  padding: 20px;
}
.chart {
  max-height: 180px;
  max-width: 320px;
  justify-content: center;
  /* max-width: 800px; */
  /* margin: 150px auto;   */
  /* margin-right: 100px;
    margin-bottom: 500px; */
}

#outerProfile {
  background-color: rgba(10, 9, 9, 0.096);
  padding: 10px;
  margin: 30px;
  border-radius: 25px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
  height: 800px;
  margin-bottom: 0px;
  padding-bottom: 20px;
  box-shadow: 10px;
}



#user-profile-pic {
  background-color: rgba(10, 9, 9, 0.096);
  padding: 10px;
  margin: 30px;
  border-radius: 25px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
  height: 800px;
  margin-bottom: 0px;
  padding-bottom: 20px;
}

#leftBox {
  background-image: linear-gradient(to bottom left, #39f077, #00c9a7);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  flex-wrap: wrap;
  height: 95%;
  width: 45%;
  border-radius: 25px;
  margin: auto;
  padding: 0;
  box-shadow: 10px 10px 10px 10px rgba(10, 9, 9, 0.185);
}

#topRightBox {
  background-image: linear-gradient(to bottom left, #39f077, #00c9a7);
  display: flex;
  flex-direction: column;
  height: 42.5%;
  width: 45%;
  border-radius: 25px;
  margin: auto;
  padding: 0;
  box-shadow: 10px 10px 10px 10px  rgba(10, 9, 9, 0.185);
}

#bottomRightBox {
  background-image: linear-gradient(to bottom left, #39f077, #00c9a7);
  display: flex;
  justify-content: center;
  height: 42.5%;
  width: 45%;
  border-radius: 25px;
  margin: auto;
  padding: 0;
  box-shadow: 10px 10px 10px 10px rgba(10, 9, 9, 0.185);
}

.user-profile-pic {
  display: right;
  width: 25%;
  justify-content: right;
  margin: auto;
  margin-bottom: 1%;
  margin-top: 10%;
  border-radius: 50%;
  border: 5px solid #055825;
}

.info {
  border-radius: 15px;
  background-color: white;
  padding: 10px;
  margin: 10px;
}

.info2 {
  display: flex;
  margin: auto;
}

.links {
  display: flex;
  margin: auto;
}

#progress-links {
  display: block;
  margin: auto;
}

.testChart {
  width: 50%;
  margin: auto;
  display: center;
  
}

#progressContainer{
  display: flex;
  flex-direction: column;
  margin: auto;
}

</style>