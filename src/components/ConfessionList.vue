<template>
    <div :key="confession._id" v-for="confession in confessions.confessionList">
        <ConfessionTile :confession="confession" />
    </div>
</template>

<script>
import ConfessionTile from './ConfessionTile'

export default {
    name: "ConfessionList",
    data() {
        return {
            confessions: []
        }
    },
    components: {
        ConfessionTile
    },
    methods: {
        async fetchConfessions() {
            const res = await fetch('http://localhost:3000/api/confession/paginate&page=1&category=All')

            const data = await res.json()

            return data
        }
    },
    async created() {
        this.confessions = await this.fetchConfessions()
    }
}
</script>

<style>

</style>
