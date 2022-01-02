<template>
    <div class="submit-confession" v-show="!submitted">
        <h2 class="submit-confession-title">Submit your confession below:</h2>
        <form @submit="onSubmit">
            <input type="hidden" name="_id">
            <div class="form-group">
                <label for="age">Age:</label>
                <input type="number" class="form-control" id="age" name="age" v-model="age" required>
            </div>
            <div class="form-group">
                <label for="sex">Gender:</label>
                <Multiselect
                    v-model="sex"
                    :canDeselect="false"
                    :canClear="false"
                    :options="[
                        { value: 'Female', label: 'Female' },
                        { value: 'Male', label: 'Male' },
                        { value: 'Other', label: 'Other' }
                    ]"
                    class="multiselect-pink"
                />
            </div>
            <div class="form-group">
                <label for="categories">Confession Category:</label>
                <Multiselect
                    v-model="categories"
                    mode="tags"
                    :close-on-select="false"
                    :options="[
                        { value: 'Random', label: 'Random' },
                        { value: 'Corporate', label: 'Corporate' },
                        { value: 'Romance', label: 'Romance' },
                        { value: 'Funny', label: 'Funny' },
                    ]"
                    class="multiselect-pink"
                />
            </div>
            <div class="form-group">
                <label for="exampleFormControlTextarea1">Confession:</label>
                <textarea class="form-control" name="content" placeholder="Type your confession here..." rows="10" v-model="content" required></textarea>
            </div>
            <div class="col-12 submit-confession-btn-holder">
                <button class="btn btn-primary" type="submit">Submit</button>
                <router-link to="/"><button class="btn btn-primary" type="button">Home</button></router-link>
                <button class="btn btn-secondary" type="button" @click="resetForm">Reset</button>
            </div>
        </form>
    </div>
    <div class="submit-confession-success" v-show="submitted">
        Your confession has been successfully submitted. Please find below the link: <a :href="shareableLink">Link</a>
    </div>
</template>

<script>
import Multiselect from '@vueform/multiselect'

export default {
    name: "ConfessionSubmit",
    components: { Multiselect },
    data() {
        return {
            age: '',
            sex: '',
            categories: [],
            content: '',
            submitted: false,
            confession: {},
            shareableLink: ''
        }
    },
    methods: {
        async onSubmit(e) {
            e.preventDefault()

            const newConfession = {
                // id: Math.floor(Math.random() * 100000),
                age: this.age,
                sex: this.sex,
                categories: this.categories,
                content: this.content
            }
            this.confession = await this.addConfession(newConfession)
            this.shareableLink = `${process.env.VUE_APP_SITE_URL}/confession/${this.confession._id}`
        },
        async addConfession(newConfession) {
            const res = await fetch(`${process.env.VUE_APP_API_URL}/confession`, {
                method: 'POST',
                headers: {
                'Content-type': 'application/json',
                },
                body: JSON.stringify(newConfession),
            })
            const data = await res.json()
            this.submitted = true
            return data
        },
        resetForm() {
            this.age = ''
            this.sex = ''
            this.categories = []
            this.content = ''
        }
    }
}
</script>

<style>
.form-group {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
}
.form-group label, .form-group input, .form-group textarea, .form-group .multiselect{
    flex: 100%;
}
input#age {
    height: 40px;
}
.submit-confession-title {
    text-align: center;
}
.submit-confession-btn-holder {
    display: flex;
    justify-content: space-between;
}
@media only screen and (min-width: 768px) {
    .form-group {
        flex-direction: row;
    }
    .form-group label{
        flex: 20%;
        text-align: right;
    }
    .form-group input, .form-group textarea, .form-group .multiselect{
        flex: 80%;
    }
}
</style>
