<template>
  <!-- <h1></h1> -->
  <div class="outer-box">
    <div class="title-logo">
      
      <img id="logo" src="./Nutribud.png" />
    </div>
    <div class="description">
      <div class="description-text">
        <h3>Welcome to Nutribud!</h3>
        <p>
          Want to eat more mindfully? Looking to lose weight? Track meals, learn about your eating habits, and reach your goals with Nurtibud!
          See a breakdown of calories and nutrients, compare serving sizes, and discover how the food you eat supports you reaching your goals.
        </p>
      </div>
      <div class="description-graphic">
        <img id="grapes" src="./grapes.jpg" />
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.outer-box {
  display: flex;
  flex-direction: column;
  align-items: center;
}

#grapes {
  width: 100%;
  border-radius: 10px;
}

.description-graphic {
  background-size: 100px;
}

.description {
  /* background-image: linear-gradient(to top right, #39f077, #00c9a7); */
  padding: 50px;
  display: flex;
}


.description-text {
  background-image: linear-gradient(to top right, #39f077, #00c9a7);
  border-radius: 10px;
  margin: 20px;
  display: flex;
  flex-direction: column;
  font-size: 25px;
  text-align: center;
  align-items: center;
}

.title-logo {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url("C:/Users/Student/workspace/final-capstone-tech-fitness-blue/vue/src/views/food-bg.jpg");
  padding-top: 85px;
  /* margin-top: 100px ; */

  min-height: 80%;
  /* min-width: 1024px; */

  z-index: -1;
  /* Set up proportionate scaling */
  width: 105%;
  height: auto;

  /* Set up positioning */
  /* position: fixed; */
  top: 0;
  left: 0;
  margin: -40px;
}

#logo {
  width: 20%;
  height: 20%;
  padding-top: 150px;
  padding-bottom: 20%;
}
p{
  color: white;
}
h3{
  color: white;
}
</style>