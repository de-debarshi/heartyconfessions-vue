<template>
  <ConfessionSubmit/>
  <router-link to="/">Go Back</router-link>
</template>

<script>
import ConfessionSubmit from '../components/ConfessionSubmit.vue'

export default {
  name: 'Submit',
  inheritAttrs: false, // disable 'non-props' warning
  components: {
    ConfessionSubmit
  }
};
</script>
