<template>
  <ConfessionList/>
  <router-link to="/submit">Submit</router-link>
</template>

<script>
import ConfessionList from '../components/ConfessionList.vue'
export default {
  name: 'Home',
  components: {
    ConfessionList,
  }
}
</script>
