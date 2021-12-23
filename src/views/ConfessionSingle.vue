<template>
  <ConfessionTile :confession="confession" :enableComments="true"/>
</template>

<script>
import ConfessionTile from '../components/ConfessionTile.vue'
export default {
  name: 'Home',
  data() {
        return {
            confession: {}
        }
    },
  components: {
    ConfessionTile,
  },
  methods: {
        async fetchConfession() {
            const res = await fetch('http://localhost:3000/api/confession/single&id=' + this.$route.params.id)

            const data = await res.json()

            return data
        }
    },
    async created() {
        this.confession = await this.fetchConfession()
    }
}
</script>
