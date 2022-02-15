<template>
  <div class="outer-vert-box">
    <div class="inner-box">
      <form v-on:submit.prevent="updateUserProfile" class="edit-form">

        <div id="add_image">
          <img :src= "this.currentUser.fileData">
          <input
            type="text"
            style="visibility:hidden"
            id="image_input"
            title=" "
            accept="image/png, image/jpg"
            v-on:submit.prevent="addPicture"
            class="update-item"
          />

          <button v-on:click.prevent="UpdatePicture" class="btn-pic">Select Picture</button>
        </div>
        <div class="box-container">
          <div class="left-box">
            <label>First Name</label>
            <input
              type="text"
              id="firstname"
              class="form-control-edit"
              placeholder="First Name"
              v-model="currentUser.firstName"
            />
            <label>Birthday</label>
            <input
              type="date"
              id="birthday"
              class="form-control-edit"
              v-model="currentUser.birthday"
              placeholder="Birthday"
            />
            <label>Current Weight</label>
            <input
              type="current-weight"
              id="current-weight"
              class="form-control-edit"
              v-model="currentUser.currentWeight"
              placeholder="current-weight"
            />
            <label>Calorie Goal</label>
            <input
              type="calorie-goal"
              id="calorie-goal"
              class="form-control-edit"
              v-model="currentUser.calorieGoal"
              placeholder="calorie-goal"
            />
          </div>
          <div class="right-box">
            <label>Last Name</label>
            <input
              type="text"
              id="lastName"
              class="form-control-edit"
              v-model="currentUser.lastName"
              placeholder="Last Name"
            />
            <label>Height</label>
            <input
              type="height"
              id="height"
              class="form-control-edit"
              v-model="currentUser.height"
              placeholder="height"
            />
            <label>Desired Weight</label>
            <input
              type="desired-weight"
              id="desired-weight"
              class="form-control-edit"
              v-model="currentUser.desiredWeight"
              placeholder="desired-weight"
            />
            <label>Meals Per Day</label>
            <input
              type="meals-per-day"
              id="meals-per-day"
              class="form-control-edit"
              v-model="currentUser.mealsPerDay"
              placeholder="meals-per-day"
            />
          </div>
        </div>

        <button id="btn" type="submit">Submit Changes</button>
      </form>
    </div>
  </div>
</template>

<script>
import serverService from "../services/ServerService.js";
export default {
  created() {
    const idPassed = parseInt(this.$route.params.id);
    serverService.getProfile(idPassed).then((response) => {
      this.currentUser = response.data;
    });

  },
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
        fileData: "https://res.cloudinary.com/dnaht9yyh/image/upload/v1644290912/defaultImage_besi0y.png",
      },
    };
  },
  methods: {
    updateUserProfile() {
      console.log(this.currentUser.firstName);
      serverService
        .updateUserProfile(this.currentUser)
        .then(() => {
          window.alert("Hip, hip horray! An update has occured today!");
          this.$router.push({ name: "homeProfile" });
        })
        .catch((error) => {
          if (error.response) {
            window.alert("An error has occurred. Please try again.");
          }
        });
    },
    selectPictureFile() {
      document.getElementById("image_input").click();
    },
    UpdatePicture() {
        window.cloudinary.setCloudName("dnaht9yyh");

      var widget = new window.cloudinary.createUploadWidget(
        {
          cloudName: "dnaht9yyh",
          uploadPreset: "ml_default",
        },
        (error, result) => {
          if (!error) {
            if (result.event === 'queues-end') {
                console.log(result.data.info);

              this.currentUser.fileData = result.data.info.files[0].uploadInfo.url;

               if(this.currentUser.fileData == ''){
                this.currentUser.fileData = 'https://res.cloudinary.com/dnaht9yyh/image/upload/v1644290912/defaultImage_besi0y.png';
              }
            } 
           
          }
        }
      );
      widget.open();
    },
  },
};
</script>

<style scoped>
.outer-vert-box {
  padding: 10%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url("C:/Users/Student/workspace/final-capstone-tech-fitness-blue/vue/src/views/editFood.jpg");
  margin: -20px;

}

.inner-box {
  display: flex;
  /* flex-direction: column; */
  /* background-image: linear-gradient(to top right, #d5fe77 ,#00c9a7); */
  /* background-color: white; */
  padding: 20px;
  border-radius: 15px;
  background-image: linear-gradient(to top right, #39f077, #00c9a7);
}

.edit-form{
  display: flex;
  flex-direction: column;
  align-items: center;
}

.box-container{
  display: flex;
}

.left-box {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.right-box {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.form-control-edit {
  padding: 10px;
  margin: 10px;
  border-radius: 5px;
  border: 0px;
  font-family: "Dosis", sans-serif;
}

label {
  font-family: "Dosis", sans-serif;
  font-weight: bold;
}

img {
  border-radius: 50%;
  width: 150px;
  margin: 10px;
}

#add_image {
  /* background-image: linear-gradient(to bottom left, #39f077, #00c9a7); */
  padding: 10px;
  /* margin: 30px; */
  /* border-radius: 25px; */
  display: flex;
  flex-direction: column;
  align-items: center;
  /* height: 10px; */
  /* margin-bottom: 0px; */
  /* padding-bottom: 20px; */
}

.name-box {
  display: flex;
}

.first-name {
  display: flex;
  flex-direction: column;
  /* align-items: center; */
}

.last-name {
  display: flex;
  flex-direction: column;
}

.weight-box {
  display: flex;
}

.current-weight {
  display: flex;
  flex-direction: column;
}

.desired-weight {
  display: flex;
  flex-direction: column;
}

.meals-calories-box {
  display: flex;
}

.calories-box {
  display: flex;
  flex-direction: column;
}

.meal-box {
  display: flex;
  flex-direction: column;
}

#btn:hover{
  transform: scale(1.1); 
}

#btn {
  padding:10px;
  /* margin: 20px; */
  background-color: #00ab6b;
  border-radius: 10px;
  border: rgb(110, 236, 100);
  font-family: "Dosis", sans-serif;
  font-weight: bold;
  width: 255px;
  display: inline;
  box-shadow: 0 0 0;
}
#btn:hover{
  background-color: #39f077;
}
</style>