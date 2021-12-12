<template>
    <form @submit="onSubmit">
        <input type="hidden" name="_id">
        <div class="form-group">
            <label for="age">Age:</label>
            <input type="number" class="form-control" id="age" name="age" v-model="age" required>
        </div>
        <div class="form-group">
            <label for="sex">Gender:</label>
            <select class="form-control" id="sex"  name="sex" v-model="sex" required>
            <option>Female</option>
            <option>Male</option>
            <option>Other</option>
            </select>
        </div>
        <div class="form-group">
            <label for="categories">Confession Category:</label>
            <select name="categories" id="categories" class="form-control selectpicker" v-model="categories" required multiple>
                <option>Random</option>
                <option>Corporate</option>
                <option>Romance</option>
                <option>Funny</option>
            </select>
        </div>
        <div class="form-group">
            <label for="exampleFormControlTextarea1">Confession:</label>
            <textarea class="form-control" name="content" placeholder="Type your confession here..." rows="5" v-model="content" required></textarea>
        </div>
        <div class="col-12">
            <button class="btn btn-primary" type="submit">Submit</button>
            <button class="btn btn-secondary float-right" type="button">Reset</button>
        </div>
    </form>
</template>

<script>
export default {
    name: "ConfessionSubmit",
    data() {
        return {
            age: '',
            sex: '',
            categories: '',
            content: ''
        }
    },
    methods: {
        onSubmit(e) {
            e.preventDefault()

            const newConfession = {
                // id: Math.floor(Math.random() * 100000),
                age: this.age,
                sex: this.sex,
                categories: this.categories,
                content: this.content
            }
            this.addConfession(newConfession)
        },
        async addConfession(newConfession) {
            await fetch('http://localhost:3000/api/confession', {
                method: 'POST',
                headers: {
                'Content-type': 'application/json',
                },
                body: JSON.stringify(newConfession),
            })

            //const data = await res.json()
        }
    }
}
</script>

<style>

</style>
