<template>
    <!-- <div>
        {{confession._id}}<br>
        {{confession.age}}<br>
        {{confession.sex}}<br>
        {{confession.categories}}<br>
        {{confession.likes}}<br>
        {{confession.content}}<br>
        {{confession.status}}<br>
        {{confession.comments}}<br>
        {{confession.commentCount}}<br>
        <a :href="`/confession/${confession._id}`">{{confession._id}}</a>
    </div> -->
    <div class="confession-tile tile-shadow" @click="$emit('tileClicked', confession._id)">
        <a :href="`/confession/${confession._id}`">{{confession._id}}</a>
        <div class="confession-tile__content">
            Age: {{confession.age}}
            Gender: {{confession.sex}}
            {{confession.content}}
        </div>
        <div class="confession-tile__reaction">
            <span class="confession-tile__like-icon" @click.stop="handleLike(confession._id)">
                <font-awesome-icon :icon="[iconState, 'heart']" />
            </span>
            {{confession.likes}} people like this
            {{confession.commentCount}} total comments
        </div>
        <div class="confession-tile__comment-section" v-if="enableComments">
            <div :key="comments._id" v-for="comments in confession.comments">
                <div class="confession-tile__comment">
                    {{comments.username}} commented on {{formatDate(comments.createdAt)}}
                    {{comments.comment}}
                </div>
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
        </div>
        <button @click="shareConfession">Share</button>
    </div>
    
</template>

<script>
export default {
    name: "ConfessionTile",
    props: {
        confession: Object,
        enableComments: Boolean,
    },
    data() {
        return {
            username: '',
            comment: '',
            liked: false,
            iconState: 'far'
        }
    },
    methods: {
        onSubmit(e) {
            e.preventDefault()
            if(this.username) {
                localStorage.setItem('username', this.username);
                const newComment = {
                    _id: this.confession._id,
                    username: this.username,
                    comment: this.comment
                }
                this.addComment(newComment)
            }
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
        },
        async addLike(id) {
            await fetch('http://localhost:3000/api/confession/liked&id='+id, {
                method: 'PUT'
            })
            //const data = await res.json()
        },
        async removeLike(id) {
            await fetch('http://localhost:3000/api/confession/unliked&id='+id, {
                method: 'PUT'
            })
            //const data = await res.json()
        },
        handleLike(id) {
            this.liked = !this.liked;
            if(this.liked) {
                this.iconState = 'fas';
                this.addLike(id);
            } else {
                this.iconState = 'far';
                this.removeLike(id);
            }
        },
        formatDate(dateString) {
            let convertedDate = new Date(dateString);
            return convertedDate.toDateString();
        },
        async shareConfession(){
            const shareData = {
                title: 'Hearty Confessions',
                text: 'Learn web development on MDN!',
                url: `http://localhost:8080/confession/${this.confession._id}`
            }
            try {
                await navigator.share(shareData)
                console.log('MDN shared successfully')
            } catch(err) {
                console.log(err)
            }
        }
    },
    created() {
        const existingUser = localStorage.getItem('username')
        if(existingUser) {
            this.username = existingUser;
        }
    }
}
</script>

<style>
.tile-shadow {
  -webkit-box-shadow: 0px 0px 20px 5px rgba(108,41,53,0.75);
  -moz-box-shadow: 0px 0px 20px 5px rgba(108,41,53,0.75);
  box-shadow: 0px 0px 20px 5px rgba(108,41,53,0.75);
  transition: box-shadow,transform .20s ease-out;
}
.tile-shadow:hover {
  -webkit-box-shadow: 0px 0px 20px 10px rgba(108,41,53,0.75);
  -moz-box-shadow: 0px 0px 20px 10px rgba(108,41,53,0.75);
  box-shadow: 0px 0px 20px 10px rgba(108,41,53,0.75);
}
.confession-tile {
    padding: 30px;
    margin-bottom: 50px;
    border-radius: 10px;
    background-color: white;
    max-width: 1000px;
    margin: 0 auto;
}
.confession-tile__content {
    min-height: 200px;
}
.confession-tile__comment ,.confession-tile__content {
  background-color: #ffedf1 !important;
  border-radius: 10px;
  margin: 0 0 5px 0;
  padding: 10px;
}
.confession-tile__like-icon{
    color: red;
}
</style>
