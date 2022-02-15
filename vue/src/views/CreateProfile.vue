<template>
  <div class="outer-box">
      <div id="add_image">
        <img :src = "this.profile.fileData">
        <input
          type="text"
          id="profilepic"
          title=" "
          accept="image/png, image/jpg"
          style="visibility:hidden"
          v-on:submit.prevent="addPicture"
          class="update-item"
        />
        <v-hover>
        <button v-on:click.prevent="addPicture" class ="btn-pic">Select Picture</button>
        </v-hover>
      </div>
    
    <form class="form-create-profile" v-on:submit.prevent="createProfile">
      <div class = "form-vert-box">
        <div class="form-row">
        <div class="left-column">
          <input
            type="text"
            id="firstname"
            class="form-control-create"
            placeholder="First Name"
            v-model="profile.firstName"
          />

          <input
            type="text"
            id="lastName"
            class="form-control-create"
            placeholder="Last Name"
            v-model="profile.lastName"
          />

          <input
            type="age"
            id="age"
            class="form-control-create"
            placeholder="age"
            v-model="profile.age"
          />

          <input
            type="date"
            id="birthday"
            class="form-control-create"
            placeholder="Birthday"
            v-model="birthdayStr"
          />

          <input
            type="height"
            id="height"
            class="form-control-create"
            placeholder="height"
            v-model="profile.height"
          />
          </div>
          <div class="right-column">  
          <input
            type="current-weight"
            id="current-weight"
            class="form-control-create"
            placeholder="current-weight"
            v-model="profile.currentWeight"
          />

          <input
            type="desired-weight"
            id="desired-weight"
            class="form-control-create"
            placeholder="desired-weight"
            v-model="profile.desiredWeight"
          />

          <input
            type="display-name"
            id="display-name"
            class="form-control-create"
            placeholder="display name"
            v-model="profile.displayName"
          />

          <input
            type="calorie-goal"
            id="calorie-goal"
            class="form-control-create"
            placeholder="calorie-goal"
            v-model="profile.calorieGoal"
          />

          <input
            type="meals-per-day"
            id="meals-per-day"
            class="form-control-create"
            placeholder="meals-per-day"
            v-model="profile.mealsPerDay"
          />
        </div>
        </div>
      
      <button type="submit" class="btn">Submit</button>
       </div>
    </form>
    
    </div>
 
</template>

<script>
import serverService from "../services/ServerService.js";
export default {

  name: 'create',
  data() {

      return {
        profile: {
            firstName: '',
            lastName: '',
            age: '',
            birthday: [],
            height: '',
            currentWeight: '',
            desiredWeight: '',
            displayName: '',
            calorieGoal: '',
            mealsPerDay:'',
            email:'',
            fileData: 'https://res.cloudinary.com/dnaht9yyh/image/upload/v1644290912/defaultImage_besi0y.png'
        },

        birthdayStr: ''
        
      };
      

  },
  methods: {
      createProfile(){
          
          this.profile.birthday = this.birthdayStr.split('-').map(Number)

          serverService.createProfile(this.profile).then((response) => {
            if (response.status == 200) {
              this.$router.push({
                path: '/homeProfile',
                query: { registration: 'success' },
              });
            }
          })
      },
    selectPictureFile() {
      document.getElementById("profilepic").click();
    },
    addPicture(){
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
              this.profile.fileData = result.data.info.files[0].uploadInfo.url;
            } 
           
          }
        }
      );
      widget.open();
    }

  }
    
}


</script>

<style scoped>

video{
  position: fixed;
  right: 0;
  bottom: 0;
  min-width: 100%;
  min-height: 100%;
  z-index: -1;
}

.form-row{
  display: flex;
}

.btn {
  margin-top: 10px;

  padding: 10px;
  background-color: #00ab6b;
  border-radius: 10px;
  border: #00ab6b;
  font-family: "Dosis", sans-serif;
  font-weight: bold;
  width: 268px;
  display: inline;
}
.btn:hover{
  background-color: #39f077;
}

.form-vert-box{
  display: flex;
  flex-direction: column;
}

.btn-pic {
  margin-top: 40px;

  padding: 10px;
  background-color: #00ab6b;
  border-radius: 10px;
  border: #00ab6b;
  font-family: "Dosis", sans-serif;
  font-weight: bold;
  display: inline;
  
}
.btn-pic:hover{
  background-color: #39f077;
}

.outer-box {
  align-items: center;
  padding-left: 25%;
  padding-right: 25%;
  display: flex;
}

.column-left {
  display: flex;
  flex-direction: column;
}
.column-right {
  display: flex;
  flex-direction: column;
}

.form-control-create {
  background: white;
  border-width: 0px;
  border-radius: 10px;
  font-family: "Dosis", sans-serif;
  font-size: 20px;
  justify-content: center;
  padding: 10px;
  margin: 10px;
}

img{
  border-radius: 50%;
  width: 150px;
  margin: 10px;
  margin-top: 30px;
}

#add_image {
  background-image: linear-gradient(to bottom left, #39f077, #00c9a7);
  padding: 10px;
  margin: 30px;
  border-radius: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 389px;
  margin-top: 101px;
  margin-bottom: 0px;
  padding-bottom: 20px;
}

.update-item {
  border-radius: 10px;
  border: 0px;
}

.form-create-profile {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(to bottom left, #39f077, #00c9a7);
  width: 100%;
  height: 100%;
  margin-top: 100px;
  border-radius: 25px;
  padding: 20px;

}
</style>