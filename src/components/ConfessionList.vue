<template>
    <div class="category-filter-dropdown">
        Category:&nbsp;&nbsp;
        <Multiselect
            v-model="filterBy"
            @select="applyFilter"
            :canDeselect="false"
            :canClear="false"
            :options="[
                { value: 'Any', label: 'Any' },
                { value: 'Random', label: 'Random' },
                { value: 'Corporate', label: 'Corporate' },
                { value: 'Romance', label: 'Romance' },
                { value: 'Funny', label: 'Funny' },
            ]"
            class="multiselect-pink"
        />
    </div>
    <div class="clearfix"></div>
    <div :key="confession._id" v-for="confession in confessions.confessionList" class="confession-tile-wrapper">
        <ConfessionTile :confession="confession" :enableComments="false" :enableReacts="false" :enableShare="false" :miniTile="true" @tileClicked="handleTileClick"/>
    </div>
    <div class="clearfix"></div>
    <div class="confession-modal" v-if="modalShow">
        <div @click="closeModal" class="modal-close-btn"><font-awesome-icon :icon="['far', 'window-close']" /></div>
        <ConfessionTile :confession="confessionClicked" :enableComments="true" :enableReacts="true" :enableShare="true" :miniTile="false"/>
    </div>
    <button class="btn btn-primary scroll-to-top-btn" type="button" v-if="showScrollTopBtn" @click="scrollTo('html')">Top</button>
</template>

<script>
import Multiselect from '@vueform/multiselect'
import ConfessionTile from './ConfessionTile'

export default {
    name: "ConfessionList",
    data() {
        return {
            confessions: [],
            confessionClicked: Object,
            modalShow: false,
            page: 1,
            totalPages: 1,
            filterBy: 'Any',
            lastScrollTop: 0,
            showScrollTopBtn: false
        }
    },
    components: {
        ConfessionTile,
        Multiselect
    },
    methods: {
        async fetchConfessions() {
            const res = await fetch(`${process.env.VUE_APP_API_URL}/confession/paginate&page=${this.page}&category=${this.filterBy}`)

            const data = await res.json()

            return data
        },
        async handleTileClick(id) {
            this.confessionClicked = await this.fetchConfession(id)
            this.modalShow = true;
        },
        async fetchConfession(id) {
            const res = await fetch(`${process.env.VUE_APP_API_URL}/confession/single&id=${id}`)

            const data = await res.json()

            return data
        },
        closeModal() {
            this.modalShow = false;
        },
        async loadMore() {
            this.page++;
            if(this.page <= this.totalPages){
                let newPage = await this.fetchConfessions()
                this.confessions.confessionList = [...this.confessions.confessionList, ...newPage.confessionList]
            }
        },
        checkBottom() {
            let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight >= document.documentElement.offsetHeight - 100;
            if (bottomOfWindow) {
                this.loadMore()
            }
        },
        scrollDirection() {
            let currentScrollTop = document.documentElement.scrollTop;
            if (currentScrollTop > this.lastScrollTop) {
                this.showScrollTopBtn = false;
            } else {
                this.showScrollTopBtn = true;
            }
            this.lastScrollTop = currentScrollTop;
        },
        debounce(method, delay) {
            clearTimeout(method._tId);
            method._tId= setTimeout(function(){
                method();
            }, delay);
        },
        async applyFilter() {
            this.page = 1;
            this.confessions = await this.fetchConfessions()
            this.totalPages = this.confessions.totalPage
        },
        scrollTo(selector) {
            document.querySelector(selector).scrollIntoView(true);
        }
    },
    async created() {
        this.confessions = await this.fetchConfessions()
        this.totalPages = this.confessions.totalPage
        window.onscroll = () => {
            this.debounce(this.checkBottom, 500);
            this.debounce(this.scrollDirection, 200);
        };
    }
}
</script>

<style>
.confession-tile-wrapper {
    width: 100%;
    float: left;
    padding: 30px;
    box-sizing: border-box;
}
.confession-modal {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #ffdde3;
}
.modal-close-btn {
    position: absolute;
    right: 20px;
    top: 15px;
    cursor: pointer;
}
.category-filter-dropdown {
    width: 230px;
    float: right;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px 20px 0 0;
}
.scroll-to-top-btn {
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  bottom: 50px;
}
@media only screen and (min-width: 768px) {
    .confession-tile-wrapper {
        width: 50%;
    }
}
@media only screen and (min-width: 1025px) {
    .confession-tile-wrapper {
        width: 33.33%;
    }
}
</style>
