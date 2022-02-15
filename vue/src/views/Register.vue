<template>
  <div class="outer-box">
    <div class="left-inner-box">
      <!-- <h1>Hello</h1> -->
      <h1>Start Your Fitness Journey Today</h1>
      <img src="../Assets/NutribudWhite.png" />
    </div>
    <div class="right-center-container">
      <video autoplay loop src="./Tomato.mp4" id="bg-video"></video>

      <div class="right-inner-box">
        <form class="form-register" @submit.prevent="register">
          <input
            type="text"
            id="username"
            class="form-control"
            placeholder="Username              "
            v-model="user.username"
          />

          <input
            type="password"
            id="password"
            class="form-control"
            placeholder="Password                "
            v-model="user.password"
          />
          <input
            type="password"
            id="confirmPassword"
            class="form-control"
            placeholder="Confirm Password"
            v-model="user.confirmPassword"
          />
          <router-link :to="{ name: 'login' }" class="rt-link"
            >Have an account?</router-link
          >
          <button
            class="btn btn-lg btn-primary btn-block"
            id="btn"
            type="submit"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
// name: 'Test-Register';
import authService from "../services/AuthService";
export default {
  name: "register",
  data() {
    return {
      user: {
        username: "",
        password: "",
        confirmPassword: "",
        role: "user",
      },
      registrationErrors: false,
      registrationErrorMsg: "There were problems registering this user.",
    };
  },
  methods: {
    register() {
      if (this.user.password != this.user.confirmPassword) {
        this.registrationErrors = true;
        this.registrationErrorMsg = "Password & Confirm Password do not match.";
        alert("please enter matching passwords")
      } else {
        authService
          .register(this.user)
          .then((response) => {
            if (response.status == 201) {
              this.$router.push({
                path: "/login",
                query: { registration: "success" },
              });
            }
          })
          .catch((error) => {
            const response = error.response;
            this.registrationErrors = true;
            if (response.status === 400) {
              this.registrationErrorMsg = "Bad Request: Validation Errors";
            }
          });
      }
    },
    clearErrors() {
      this.registrationErrors = false;
      this.registrationErrorMsg = "There were problems registering this user.";
    },
  },
};
</script>

<style scoped>
.outer-box {
  display: flex;
  flex-direction: row;
}

h1 {
  margin-top: 20%;
  font-family: "Dosis", sans-serif;
  font-weight: bold;
}

img {
  width: 450px;
  height: 450px;
  /* margin-top: 30%; */
  padding: 20px;
  border-radius: 25px;
  box-shadow: 10px 10px 10px 10px rgba(10, 9, 9, 0.185);
}

.left-inner-box {
  /* position: fixed; */
  width: 50%;
  height: 100vh;
  background-image: linear-gradient(to top right, #39f077, #00c9a7);
  margin-left: -10px;
  margin-top: -10px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.right-center-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 2;
}

video {
  position: fixed;
  /* right: -50%; */
  bottom: 0;
  min-width: 100%;
  min-height: 100%;
  z-index: -1;
}
.right-inner-box {
  background-image: linear-gradient(to bottom left, #39f077, #00c9a7);
  width: 50%;
  height: 25%;
  align-items: center;
  justify-content: center;
  margin-left: 50%;
  margin-right: 50%;
  border-radius: 5%;
  padding: 10%;
  display: flex;
  flex-direction: column;
  flex-grow: 2;
}

.form-control {
  background: white;
  border-width: 0px;
  border-radius: 10px;
  /* text-align: center; */
  font-family: "Dosis", sans-serif;
  font-size: 30px;
  justify-content: center;

  /* text-decoration: underline; */
}

#password,
#username,
#confirmPassword {
  margin: 10px;
}

.rt-link {
  padding: 10px;
  font-family: "Dosis", sans-serif;
  color: black;
}

#btn:hover {
  transform: scale(1.1);
}

#btn {
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
</style>