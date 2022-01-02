<template>
  <Header :showConfessBtn="true"/>
  <ConfessionTile :confession="confession" :enableComments="true" :enableReacts="true" :enableShare="true"/>
</template>

<script>
import ConfessionTile from '../components/ConfessionTile.vue'
import Header from '../components/Header.vue'
export default {
  name: 'Home',
  data() {
        return {
            confession: {}
        }
    },
  components: {
    ConfessionTile,
    Header
  },
  methods: {
        async fetchConfession() {
            const res = await fetch(`${process.env.VUE_APP_API_URL}/confession/single&id=${this.$route.params.id}`)

            const data = await res.json()

            return data
        }
    },
    async created() {
        this.confession = await this.fetchConfession()
    }
}
</script>
