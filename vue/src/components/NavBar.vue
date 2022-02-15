<template>
  <ul class=menu>
      <div class ="menu-indicator" :style="{left:positionToMove,width:sliderWidth}"> </div>
            <img id="logo"  class="menu-icon " src="./Nutribud.png" />

      <li class = "menu-item" 
      v-for ="link in links" 
        :key ="link.id"
       @click="sliderIndicator(link.id)"
       :ref="'menu-item_'+link.id"
       >
       
              <a  class = "menu-link" :class="link.id === selectedIndex ? 'active':null">
              <router-link :to="link.routerlink" class = "menu-link" :class="link.id === selectedIndex ? 'active':null">
                <i class = "menu-icon" :class = "link.icon"></i>
                <span >{{link.text}}</span>
            </router-link>
            </a>

      </li>
  </ul>
</template>

<script>
export default{
data(){
    return{
        sliderPostion:0,
        selectedElementWidth: 0,
        selectedIndex: 0,
        links:[
            {
            id:1,
            icon:"",
            text: "Home",
            routerlink:"/",
        },
    

{
            id:2,
            icon:"",
            text: "Profile",
            routerlink:"/homeProfile",
        },
        {
            id:3,
            icon:"",
            text: "Edit Profile",
            routerlink:"/editUserProfile/1",
        },

{
            id:4,
            icon:"",
            text: "Foods",
            routerlink:"/foodDiary",
        },
        {
            id:5,
            icon:"",
            text: "Progress",
            routerlink:"/testChart",
        },

{
            id:6,
            icon:"",
            text: "About Us",
            routerlink:"/aboutUS"
        },

{
            id:7,
            icon:"RegisterIcon",
            text: "Register",
            routerlink:"/Register"
        },
            {
            id:8,
            icon:"",
            text: "Login",
            routerlink:"/login",
        },
     
       



        ],
    }
},
methods:{
    sliderIndicator(id){
        let el = this.$refs[`menu-item_${id}`][0];
        this.sliderPostion = el.offsetLeft;
        this.selectedElementWidth = el.offsetWidth;
        this.selectedIndex = id;
        

    },

},
computed:{
    positionToMove(){
        return this.sliderPostion+"px";
    },
    sliderWidth(){
        return this.selectedElementWidth +"px";
    }
}
}

</script>

<style>
:root{
    --active-color:#d5fe77;
    --link-text-color: #f1faee;
    --menu-background-color:#39f077;
    --active-background-color:#2e712a;
}
.menu{
    padding: 10px;
    margin:-10px;
    position: relative;
    background-color: var(--menu-background-color);
    display: inline-flex;
    border-radius: 4px;
    list-style-type: none;
    overflow: hidden;
    display: flex;
    justify-content: space-evenly;

}

.menu-item{
    /* justify-content: space-evenly; */


}
.menu-link{
    padding:0.75rem 1rem;
    display: inline-flex;
    align-items: center;
    color: var(--link-text-color);
    text-decoration: none;
    outline: black;
    outline-width: 10px;
    font-weight: bold;
    color: black;
    font-size: 20px;

}

/* .menu-icon{
    height: 1.5rem;
    width: 1.5rem;
    12:55 in video
} */
.menu-indicator{
    position: absolute;
    height:0.25rem;
    background-color: var(--active-color);
    bottom: 0;
    left:0;
    margin:auto;
    width:3rem;
    transition:all ease 0.5s;

}
.menu-link:hover,.menu-link.active{
    color:var(--active-color);
    background-color: var(--active-background-color);
}
#logo{
    height: 4rem;
}
</style>