<template>
    <div class="row container">
        <Hero v-for="(hero, index) in arrayHeroes" :key="index" :hero="hero"></Hero>
    </div>
</template>

<script>
import Hero from './Hero.vue';
export default {
    name: "HeroListComponent",
    components: { Hero },
    data() {
    return {
      arrayHeroes: ["HTML", "CSS", "Javascript", "Terminal"],
    };
  },
}
</script>

<style>
</style>
