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
    <div class="confession-tile tile-shadow" :class="{'--small': miniTile}" @click="$emit('tileClicked', confession._id)">
        <div class="confession-tile__age-gender">
            <div>Age: {{confession.age}}</div>
            <div>Gender: {{confession.sex}}</div>
        </div>
        <div class="confession-tile__content">
            {{confession.content}}
        </div>
        <div class="confession-tile__reaction">
            <div>
                <span class="confession-tile__like-icon" @click.stop="handleLike(confession._id)" v-if="enableReacts">
                    <font-awesome-icon :icon="[iconState, 'heart']" />
                </span>
                {{confession.likes}} reacts
            </div>
            <div>{{confession.commentCount}} comments</div>
        </div>
        <div class="confession-tile__comment-section" v-if="enableComments">
            <div :key="comments._id" v-for="comments in confession.comments">
                <div class="confession-tile__comment">
                    <div class="confession-tile__comment-details">{{comments.username}} commented on {{formatDate(comments.createdAt)}}</div>
                    <div class="confession-tile__comment-content">{{comments.comment}}</div>
                </div>
            </div>
            <form @submit="onSubmit">
                <div class="form-group">
                    <label for="username">Username:</label>
                    <input type="text" class="form-control" id="username" name="username" v-model="username" required :disabled="usernameDisable">
                    <button class="btn btn-primary float-right" type="button" @click="usernameDisable=false">Change Username</button>
                </div>
                <div class="form-group">
                    <textarea class="form-control" name="comment" placeholder="Type your comment here..." rows="2" v-model="comment" required></textarea>
                </div>
                <div class="">
                <button class="btn btn-primary float-right" type="submit">Comment</button>
                </div>
            </form>
        </div>
        <div v-if="enableShare">
            <button @click="shareConfession">Share</button>
            {{shareableContent}} 
            <a :href="shareableLink">Link</a>
        </div>
        
    </div>
    
</template>

<script>
export default {
    name: "ConfessionTile",
    props: {
        confession: Object,
        enableComments: Boolean,
        enableReacts: Boolean,
        enableShare: Boolean,
        miniTile: Boolean
    },
    data() {
        return {
            username: '',
            usernameDisable: false,
            comment: '',
            liked: false,
            iconState: 'far',
            shareableContent: '',
            shareableLink: ''
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
            await fetch(`${process.env.VUE_APP_API_URL}/confession/comment`, {
                method: 'POST',
                headers: {
                'Content-type': 'application/json',
                },
                body: JSON.stringify(newComment),
            })
            //const data = await res.json()
        },
        async addLike(id) {
            await fetch(`${process.env.VUE_APP_API_URL}/confession/liked&id=${id}`, {
                method: 'PUT'
            })
            //const data = await res.json()
        },
        async removeLike(id) {
            await fetch(`${process.env.VUE_APP_API_URL}/confession/unliked&id=${id}`, {
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
            return convertedDate.toLocaleString();
        },
        async shareConfession(){
            this.shareableContent = this.confession.content.substr(0, 100) + '... '
            this.shareableLink = `${process.env.VUE_APP_SITE_URL}/confession/${this.confession._id}`
            const shareData = {
                title: 'Hearty Confessions',
                text: this.shareableContent,
                url: this.shareableLink
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
            this.usernameDisable = true;
        }
    }
}
</script>

<style>
.tile-shadow {
  -webkit-box-shadow: 0px 0px 20px 5px rgba(108,41,53,0.75);
  -moz-box-shadow: 0px 0px 20px 5px rgba(108,41,53,0.75);
  box-shadow: 0px 0px 20px 5px rgba(108,41,53,0.75);
  transition: box-shadow .2s ease-out;
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
.confession-tile.--small {
    cursor: pointer;
}
.confession-tile.--small .confession-tile__content {
    max-height: 200px;
    overflow: hidden;
    -webkit-mask-image: linear-gradient(to bottom, black 70%, transparent 100%);
    mask-image: linear-gradient(to bottom, black 70%, transparent 100%);
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
.confession-tile__age-gender, .confession-tile__reaction{
    font-size: 12px;
    display: flex;
    justify-content: space-between;
}
.confession-tile__comment-details {
    font-size: 12px;
    font-style: italic;
}
</style>
