<template>
  <div id="app">
    <app-header></app-header>
    <HelloWorld />
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import AppHeader from './components/AppHeader.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
    AppHeader,
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
