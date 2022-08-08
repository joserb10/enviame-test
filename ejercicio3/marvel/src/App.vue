<template>
    <!-- Componentes base y router view para SPA -->
    <Navbar></Navbar>  
    <div id="app">
      <router-view></router-view>
    </div>
    <Footer></Footer>
</template>

<script>
import Navbar from "./components/commons/Navbar.vue";
import Footer from "./components/commons/Footer.vue";

export default {
    name: "App",
    components: { Navbar, Footer }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height: 100vh;
}
</style>
