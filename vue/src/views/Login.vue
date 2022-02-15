

<template>
  <div class="bg">
    <link
      rel="stylesheet"
      type="text/css"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css"
    />

    <img src="../Assets/login-head.png" class="login-head" />
    <form class="login-form" @submit.prevent="login">
      <div class="alert alert-danger" role="alert" v-if="invalidCredentials">
        Invalid username and password!
      </div>
      <div
        class="alert alert-success"
        role="alert"
        v-if="this.$route.query.registration"
      >
        Thank you for registering, please sign in.
      </div>
      <div class="login-container">
        <i class="fa fa-user fa-lg fa-fw" id="icon"></i>
        <input
          type="text"
          id="username"
          class="form-control"
          placeholder="Username"
          v-model="user.username"
          required
          autofocus
        />
      </div>
      <div class="password-container">
        <i class="fa fa-lock" id="icon-lock"></i>
        <input
          type="password"
          id="password"
          class="form-control"
          placeholder="Password"
          v-model="user.password"
          required
          autofocus
        />
        
      </div>
      <router-link :to="{ name: 'register' }" class="rt-link"
        >Need an account?</router-link
      >
      <button id="btn" class="button" type="submit">Sign in</button>
    </form>
    <!-- <router-link to="/editPassword" class="d-block small">Forgot Password?</router-link> -->
  </div>
</template>

<script>
import authService from "../services/AuthService";
import serverService from "../services/ServerService";

export default {
  name: "login",
  components: {},
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
      userId: "",
      invalidCredentials: false,
    };
  },
  methods: {
    login() {
      authService
        .login(this.user)
        .then((response) => {
          if (response.status == 200) {
            this.$store.commit("SET_AUTH_TOKEN", response.data.token);
            this.$store.commit("SET_USER", response.data.user);
            this.route();
            this.$router.push("/homeProfile");
          }
        })
        .catch((error) => {
          const response = error.response;

          if (response.status === 401) {
            this.invalidCredentials = true;
          }
        });
    },
    route() {
      console.log("route");
      serverService.getIdByUsername(this.user.username).then((response) => {
        this.userId = parseInt(response.data);
        console.log(this.userId);

        serverService.getProfile(this.userId).then((response) => {
          if (response.data.userId === 0) {
            this.$router.push(`/createprofile/${this.user.username}`);
          }
        });
      });
    },
  },
};
</script>


<style scoped>
.rt-link {
  padding: 10px;
  font-family: "Dosis", sans-serif;
  color: black;
}

.login-container {
  /* border: 2px solid black; */
  border-radius: 15px;
  padding: 10px;
  text-align: right;
 
}

.password-container {
  border-radius: 15px;
  padding: 10px;
}

.login-head {
  /* padding-top:20% ; */
  width: 300px;
  height: 150px;
  justify-content: center;
  /* padding-left:38% ; */
  margin-left: center;
  display: block;
  margin-left: auto;
  margin-right: auto;
  /* width: 50%; */
}

#icon {
  justify-content: center;
  color: lightslategray;
  padding-top: 5px;
  /* border: 2px solid black; */
  margin: 5px;
  border-radius: 15px;
  position: absolute;
}

#icon-lock {
  justify-content: center;
  color: lightslategray;
  padding-top: 5px;
  /* border: 2px solid black; */
  margin: 5px;
  border-radius: 15px;
  position: absolute;
  font-size: 25px;
  padding-left: 5px;
}

.form-control {
  background: white;
  border-width: 0px;
  border-radius: 10px;
  /* text-align: center; */
  font-family: "Dosis", sans-serif;
  font-size: 30px;
  justify-content: center;
  padding-left: 40px
  /* text-decoration: underline; */
}

.login-form {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
/* 
#btn:hover{
    transform: scale(1.1); 
} */

#btn:hover{
  transform: scale(1.1); 
}


#btn {
  padding: 10px;
  background-color: rgb(5, 88, 37, 0.4);
  border-radius: 10px;
  border: rgb(110, 236, 100);
  font-family: "Dosis", sans-serif;
  font-weight: bold;
  width: 255px;
  display: inline;
  box-shadow: 0 0 0;
  
}
.submitbutton :hover{
background-color:blue;
}
#btn:hover{
  background-color: #39f077;
}

.bg {
  margin: -10px;
  padding-right: 20px;
  width: 100%;
  height: 100vh;
  background-image: linear-gradient(to top right, #39f077, #00c9a7);
  /* background-image: linear-gradient(to top right, #39f077 ,white); */
  background-size: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
}




</style>