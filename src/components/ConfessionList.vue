<template>
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
    <div :key="confession._id" v-for="confession in confessions.confessionList" class="confession-tile-wrapper">
        <ConfessionTile :confession="confession" :enableComments="false" @tileClicked="handleTileClick"/>
    </div>
    <div class="clearfix"></div>
    <div class="confession-modal" v-if="modalShow">
        <div @click="closeModal" class="modal-close-btn"><font-awesome-icon :icon="['far', 'window-close']" /></div>
        <ConfessionTile :confession="confessionClicked" :enableComments="true"/>
    </div>
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
            filterBy: 'Any'
        }
    },
    components: {
        ConfessionTile,
        Multiselect
    },
    methods: {
        async fetchConfessions() {
            const res = await fetch(`http://localhost:3000/api/confession/paginate&page=${this.page}&category=${this.filterBy}`)

            const data = await res.json()

            return data
        },
        async handleTileClick(id) {
            this.confessionClicked = await this.fetchConfession(id)
            this.modalShow = true;
        },
        async fetchConfession(id) {
            const res = await fetch('http://localhost:3000/api/confession/single&id=' + id)

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
        }
    },
    async created() {
        this.confessions = await this.fetchConfessions()
        this.totalPages = this.confessions.totalPage
        window.onscroll = () => {
            this.debounce(this.checkBottom, 500);
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
