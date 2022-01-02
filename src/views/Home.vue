<template>
  <div v-show="!explore">
    <h1 class="homepage-title">Hearty Confessions</h1>
    <div class="homepage-tagline">- because you aren't alone</div>
    <div class="homepage-carousel">
      <carousel :items-to-show="1" autoplay="5000" wrapAround="true">
        <Slide v-for="slide in slides" :key="slide">
            <div class="carousel__item">{{ slide }}</div>
        </Slide>
      </carousel>
    </div>
    <button class="btn btn-primary homepage-explore-btn" type="button" @click="exploreClicked()">Explore</button>
    <router-link to="/submit"><button class="btn btn-primary homepage-confess-btn" type="button">Confess</button></router-link>
  </div>
  <div v-show="explore">
    <Header :showConfessBtn="true"/>
    <div class="confession-list-wrapper"><ConfessionList/></div>
  </div>
</template>

<script>
import Header from '../components/Header.vue'
import ConfessionList from '../components/ConfessionList.vue'
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide } from 'vue3-carousel';
export default {
  name: 'Home',
  data() {
        return {
            slides: ['"My wife is cheating on me..."','"My boss is hitting on me..."','"I have a crush on my boss..."'],
            explore: false
        }
  },
  methods: {
      scrollTo(selector) {
        document.querySelector(selector).scrollIntoView(true);
      },
      exploreClicked() {
        this.explore = true;
      }
  },
  components: {
    ConfessionList,
    Carousel,
    Slide,
    Header
  }
}
</script>
<style>
.homepage-carousel {
  margin: 100px auto;
  width: 350px;
}
.homepage-title {
  font-family: Fresh Script;
  font-size: 100px;
  color: #e36379;
  text-align: center;
  margin: 10px 0 0;
}
.homepage-tagline {
  font-family: Fresh Script;
  font-size: 50px;
  color: #e36379;
  text-align: right;
}
.carousel__item {
  font-style: italic;
}
.homepage-explore-btn, .homepage-confess-btn {
  display: block;
  margin: 5px auto;
}
</style>
