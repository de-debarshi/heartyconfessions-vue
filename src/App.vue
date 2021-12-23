<template>
  <Header/>
  <!-- <swiper
    :modules="modules"
    :slides-per-view="3"
    :space-between="50"
    :autoplay="{enabled: true}"
    navigation
    :pagination="{ clickable: true }"
    :scrollbar="{ draggable: true }"
    @swiper="onSwiper"
    @slideChange="onSlideChange"
  >
    <swiper-slide>Slide 1</swiper-slide>
    <swiper-slide>Slide 2</swiper-slide>
    <swiper-slide>Slide 3</swiper-slide>
    <swiper-slide>Slide 4</swiper-slide>
    <swiper-slide>Slide 5</swiper-slide>
    ...
  </swiper> -->
  <router-view></router-view>
</template>

<script>
import Header from './components/Header.vue'
// Import Swiper Vue.js components
//import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper';
//import { Swiper, SwiperSlide} from 'swiper/vue';
//import { Autoplay } from 'swiper';
// Import Swiper styles
//import 'swiper/swiper-bundle.min.css'
//import 'swiper/swiper.min.css'

export default {
  name: 'App',
  components: {
    Header,
    //Swiper,
    //SwiperSlide,
    
  },
  /* setup() {
      const onSwiper = (swiper) => {
        console.log(swiper);
      };
      const onSlideChange = () => {
        console.log('slide change');
      };
      return {
        onSwiper,
        onSlideChange,
        modules: [Navigation, Pagination, Scrollbar, A11y, Autoplay],
      };
  }, */
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  max-width: 1024px;
  margin: 60px auto;
  position: relative;
}
body{
  background-color: #ffdde3 !important;
}
@font-face {
  font-family: Fresh Script;
  src: url('./assets/freshscript.ttf');
}
.clearfix {
  float: none;
  clear: both;
}
.btn {
    display: inline-block;
    font-weight: 400;
    color: white;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
    -webkit-user-select: none;
    user-select: none;
    background-color: transparent;
    border: 1px solid transparent;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    line-height: 1.5;
    border-radius: 0.25rem;
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
.btn-primary {
  background-color: #e36379 !important;
  border-color: #e36379 !important;
}
.btn-primary:hover {
  background-color: #f14360 !important;
}
.btn-primary:active {
  background-color: #f82a4c !important;
}
.btn-secondary {
    color: #fff;
    background-color: #6c757d;
    border-color: #6c757d;
}
.btn.disabled, .btn:disabled {
    opacity: 0.65;
}
.disabled, :disabled {
    pointer-events: none !important;
}
</style>
