<template>
    <div>
        {{confession._id}}<br>
        {{confession.age}}<br>
        {{confession.sex}}<br>
        {{confession.categories}}<br>
        {{confession.likes}}<br>
        {{confession.content}}<br>
        {{confession.status}}<br>
        {{confession.comments}}<br>
        {{confession.commentCount}}<br>
    </div>
    <form @submit="onSubmit">
        <!-- <input type="hidden" name="_id" v-model="_id" value="{{confession._id}}"> -->
        <div class="form-group">
        <input type="text" class="form-control" id="username" name="username" v-model="username" required>
        </div>
        <div class="form-group">
        <textarea class="form-control" name="comment" placeholder="Type your comment here..." rows="2" v-model="comment" required></textarea>
        </div>
        <div class="">
        <button class="btn btn-primary float-right" type="submit">Comment</button>
        </div>
    </form>
</template>

<script>
export default {
    name: "ConfessionTile",
    props: {
        confession: Object,
    },
    data() {
        return {
            username: '',
            comment: ''
        }
    },
    methods: {
        onSubmit(e) {
            e.preventDefault()

            const newComment = {
                _id: this.confession._id,
                username: this.username,
                comment: this.comment
            }
            this.addComment(newComment)
        },
        async addComment(newComment) {
            await fetch('http://localhost:3000/api/confession/comment', {
                method: 'POST',
                headers: {
                'Content-type': 'application/json',
                },
                body: JSON.stringify(newComment),
            })

            //const data = await res.json()
        }
    }
}
</script>

<style>

</style>
