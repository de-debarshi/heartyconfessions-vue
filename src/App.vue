<template>
  <Header/>
  <carousel :items-to-show="1" autoplay="5000" wrapAround="true">
    <slide v-for="slide in 10" :key="slide">
      {{ slide }}
    </slide>
  </carousel>
  <router-view></router-view>
</template>

<script>
import Header from './components/Header.vue'
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide } from 'vue3-carousel';
export default {
  name: 'App',
  components: {
    Header,
    Carousel,
    Slide,
  },
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
.multiselect-pink {
  --ms-tag-bg: #ffdde3;
  --ms-tag-color: #e36379;
  --ms-option-bg-pointed: #ffdde3;
  --ms-option-color-pointed: #e36379;
  --ms-option-bg-selected: #ffdde3;
  --ms-option-color-selected: #e36379;
  --ms-option-bg-selected-pointed: #ffdde3;
  --ms-option-color-selected-pointed: #e36379;
}
</style>
<style src="@vueform/multiselect/themes/default.css"></style>