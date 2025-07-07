<template>
  <router-view></router-view>
</template>

<script>

export default {
  name: 'App',
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  max-width: 1024px;
  margin: 0px auto 60px;
  position: relative;
}
html {
  scroll-behavior: smooth;
}
body {
  background-color: #ffdde3 !important;
  padding: 0;
  margin: 0;
}
@font-face {
  font-family: Fresh Script;
  src: url('./assets/freshscript.ttf');
}
.clearfix {
  float: none;
  clear: both;
}
a {
  text-decoration: none;
}
.btn {
    display: inline-block;
    font-weight: 400;
    color: white;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
    -webkit-user-select: none;
    user-select: none;
    background-color: transparent;
    border: 1px solid transparent;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    line-height: 1.5;
    border-radius: 0.25rem;
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
.btn-primary {
  background-color: #e36379 !important;
  border-color: #e36379 !important;
}
.btn-primary:hover {
  background-color: #f14360 !important;
}
.btn-primary:active {
  background-color: #f82a4c !important;
}
.btn-secondary {
    color: #fff;
    background-color: #6c757d;
    border-color: #6c757d;
}
.btn.disabled, .btn:disabled {
    opacity: 0.65;
}
.disabled, :disabled {
    pointer-events: none !important;
}
.multiselect-pink {
  --ms-tag-bg: #ffdde3;
  --ms-tag-color: #e36379;
  --ms-option-bg-pointed: #ffdde3;
  --ms-option-color-pointed: #e36379;
  --ms-option-bg-selected: #ffdde3;
  --ms-option-color-selected: #e36379;
  --ms-option-bg-selected-pointed: #ffdde3;
  --ms-option-color-selected-pointed: #e36379;
}
/* The Modal (background) */
.modal {
  /* display: none; */ /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 50; /* Sit on top */
  padding-top: 24px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: hidden; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}

/* Modal Content */
.modal-content {
  position: relative;
  /* background-color: #fefefe; */
  margin: auto;
  padding: 0;
  /* border: 1px solid #888; */
  max-width: 1024px;
  /* overflow-y: auto; */
  /* box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19); */
  -webkit-animation-name: animatetop;
  -webkit-animation-duration: 0.4s;
  animation-name: animatetop;
  animation-duration: 0.4s
}

/* Add Animation */
@-webkit-keyframes animatetop {
  from {top:-300px; opacity:0} 
  to {top:0; opacity:1}
}

@keyframes animatetop {
  from {top:-300px; opacity:0}
  to {top:0; opacity:1}
}

/* The Close Button */
.close {
  color: black;
  float: right;
  font-size: 28px;
  font-weight: bold;
  margin: 20px 20px 0 0;
}

.close:hover,
.close:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}

.modal-header {
  padding: 2px 16px;
  /* background-color: #5cb85c;
  color: white; */
}

.modal-body {padding: 2px 16px;}

.modal-footer {
  padding: 2px 16px;
  /* background-color: #5cb85c;
  color: white; */
}
</style>
<style src="@vueform/multiselect/themes/default.css"></style>