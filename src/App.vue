<template>
  <div>
    <the-header></the-header>
    <div id="nav">
      <base-button to="/coaches">Coaches</base-button>
      <base-button to="/requests">Requests</base-button>
    </div>
    <router-view></router-view>
  </div>
</template>

<style>
  @import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");

  * {
    box-sizing: border-box;
  }

  html {
    font-family: "Roboto", sans-serif;
  }

  body {
    margin: 0;
  }
</style>

<script>
import TheHeader from './components/layout/TheHeader';
  export default {
    components: {
      TheHeader
    }
  }
</script>