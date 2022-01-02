<template>
  <Header :showConfessBtn="false"/>
  <ConfessionSubmit/>
</template>

<script>
import ConfessionSubmit from '../components/ConfessionSubmit.vue'
import Header from '../components/Header.vue'
export default {
  name: 'Submit',
  inheritAttrs: false, // disable 'non-props' warning
  components: {
    ConfessionSubmit,
    Header
  }
};
</script>
