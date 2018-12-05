<template>
  <div id="app">
    <div id="main-nav">
      <top-nav></top-nav>
      <search></search>
    </div>
    <router-view/>
    <my-footer></my-footer>
  </div>
</template>

<script>
import topNav from './components/nav/top-nav'
import search from './components/search/search'
import myFooter from './components/my-footer/my-footer'

export default {
  name: 'App',
  components: {
    topNav,
    search,
    myFooter
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
  border-bottom: 1px solid #eee;
}
h2 {
  letter-spacing: 10px;
  position: relative;
  top: 24px;
  margin-bottom: 50px;
}
a {
  text-decoration: none;
  color: #000;

}
a:hover {
  color: #40c672;
}
</style>
