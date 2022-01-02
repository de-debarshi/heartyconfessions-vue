<template>
    <header>
        <div class="header-logo" @click="reloadHomepage()">Hearty Confessions</div>
        <div v-show="showConfessBtn" class="header-confess-btn"><router-link to="/submit"><button class="btn btn-primary" type="button">Confess</button></router-link></div>
    </header>
</template>

<script>
export default {
    name: "Header",
    props: {
        showConfessBtn: Boolean
    },
    methods: {
        reloadHomepage() {
            window.location.href = "/";
        }
    }
}
</script>

<style>
header {
    position: sticky;
    top: 0px;
    width: 100%;
    height: 50px;
    background-color: #f2afbb;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 99;
}
.header-logo {
    font-family: Fresh Script;
    font-size: 30px;
    color: #e36379;
    margin-left: 20px;
    font-weight: bold;
    cursor: pointer;
}
.header-confess-btn {
    margin-right: 20px;
}
</style>
