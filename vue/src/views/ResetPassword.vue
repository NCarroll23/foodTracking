<template>
  <div class="container">

    <div class="header">Reset Password</div>
      <div class="header-body">
      <div class="text center md-4">
          <h4>Reset Your Password</h4>
      </div>
      <form v-on:submit.prevent="onSubmit">
          <div class="form-group">
              <div class="form-label-group">
                  <input
                    type="username"
                    id="username"
                    class="form-comtrol"
                    placeholder="Enter Username"
                    required="required"
                    autofocus="autofocus"
                    v-model="user.username"
                    />
                    <label for="username">Enter Username</label>
                     <div class="invalid-feedback" v-if="errors.username">{{errors.username[0]}}</div>
              </div>  
          </div>   
          <div class="form-group">
              <div class="form-label-group">
                  <input
                    type="password"
                    id="password"
                    class="form-comtrol"
                    placeholder="Enter New Password"
                    required="required"
                    v-model="user.password"
                    />
                    <label for="password">Enter Password</label>
                     <div class="invalid-feedback" v-if="errors.password">{{errors.password[0]}}</div>
              </div>  
          </div>
          <div class="form-group">
              <div class="form-label-group">
                  <input
                    type="password"
                    id="passwordConfirmation"
                    class="form-comtrol"
                    placeholder="Confirm Password"
                    required="required"
                    v-model="user.passwordConfirmation"
                    />
                    <label for="passwordConfirmation">Confirm Password</label>
                     <div class="invalid-feedback" v-if="errors.passwordConfirmation">{{errors.passwordConfirmation[0]}}</div>
              </div>  
          </div>
          <button v-on:click="onSubmit($event)" class="btn btn-primary btn-block" ref="btnSubmit">Reset Password</button>
      </form>
      <div class="text-center">

          <router-link class="d-block small" to="/login">Login Page</router-link>
      </div>
  </div>
</div>
</template>

<script>
import auth from '../services/AuthService.js';
export default {
    name: 'ResetPasswordRequest',
    data(){
        return{
            user:{
                username: '',
                email: '',
                password: '',
                passwordConfirmation: ''
            },
            btnOldHtml: '',
            errors: {}
        }
    },
    created(){
        document.querySelector('body').style.backgroundColor = '#343a40';
    },
    methods:{
        onSubmit(){
            
            
                auth.resetPassword(this.user.username).then((response) => {
            if (response.status == 201) {
              this.$router.push({
                path: '/login',
                query: { registration: 'success' },
              });
            }
          })
          .catch((error) => {
            const response = error.response;
            this.registrationErrors = true;
            if (response.status === 400) {
              this.registrationErrorMsg = 'Bad Request: Validation Errors';
            }
          });
          
        },
        disableSubmission(btn){
            btn.setAttribute('disabled', 'disabled');
            this.btnOldHtml = btn.innerHTML;
            btn.innerHTML = '<span class="fa fa-spinner fa-spin"></span> please wait...';
        },
        enableSubmission(btn){
            btn.removeAttribute('disabled');
            btn.innerHTML = this.btnOldHtml;
        },
          
      
    }
}
</script>

<style>

</style>