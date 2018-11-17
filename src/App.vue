<template>
  <div id="app">
    <div id="main-nav">
      <top-nav></top-nav>
      <search></search>
    </div>
    <router-view/>
  </div>
</template>

<script>
import topNav from './components/nav/top-nav'
import search from './components/search/search'

export default {
  name: 'App',
  components: {
    topNav,
    search
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#main-nav{
  display: flex;
  flex-direction: row;
}
</style>
