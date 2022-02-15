import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Logout from '../views/Logout.vue'
import Register from '../views/Register.vue'
import store from '../store/index'
import CreateProfile from '../views/CreateProfile.vue'
import EditUserProfile from '../views/UpdateUserProfile.vue'
import FoodDiary from '../views/FoodDiary.vue'
import Chart from '../views/TestChart.vue'
import Delete from '../components/AddFood.vue'
import HomeProfile from '../views/HomeProfile.vue'
import AboutUs from '../views/AboutUs.vue'
Vue.use(Router)

/**
 * The Vue Router is used to "direct" the browser to render a specific view component
 * inside of App.vue depending on the URL.
 *
 * It also is used to detect whether or not a route requires the user to have first authenticated.
 * If the user has not yet authenticated (and needs to) they are redirected to /login
 * If they have (or don't need to) they're allowed to go about their way.
 */

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: "/editPassword",
      name: "editPassword",
      component: ()=> import('../views/ResetPassword.vue'),
      meta: {
        requiresAuth: false
      }
    },
      {
        path: "/reset-password-request",
        name: "reset-password-request",
        component: ()=> import('../views/ResetPasswordRequest.vue'),
        meta: {
          requiresAuth: false
        }
    },
    {
      path: "/logout",
      name: "logout",
      component: Logout,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: "/register",
      name: "register",
      component: Register,
      meta: {
        requiresAuth: false
      }
    },
    
    {
      path: "/createprofile/:id",
      name: "createprofile",
      component: CreateProfile,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: "/editUserProfile/:id",
      name: "EditUserProfile",
      component: EditUserProfile,
      meta:{
        requiresAuth: false
      }
    },
    {
      path:"/foodDiary",
      name: "FoodDiary",
      component: FoodDiary,
      meta:{
        requiresAuth: false
      }
    },
    {
      path:"/testChart",
      name: "testChart",
      component: Chart,
      meta:{
        requiresAuth: false
      }

    },
    {
      path:"/homeProfile",
      name:"homeProfile",
      component: HomeProfile,
      meta:{
        requiresAuth: false
      }
    },
    {
        path:"/aboutUS",
        name: "AboutUs",
        component: AboutUs,
        meta:{
          requiresAuth: false
        }
      },
      {
        path: "/deleteFood",
        name: "deleteFood",
        component: Delete,
        meta:{
          requiresAuth: true
        }
      }

  ]
})

router.beforeEach((to, from, next) => {
  // Determine if the route requires Authentication
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth);

  // If it does and they are not logged in, send the user to "/login"
  if (requiresAuth && store.state.token === '') {
    next("/login");
  } else {
    // Else let them go to their next destination
    next();
  }
});

export default router;
