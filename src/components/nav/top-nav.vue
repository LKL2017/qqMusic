<template>
  <div id="top-nav">
    <div class="logo-container">
      <a href="#">
        <img src="../../assets/logo@2x.png" class="logo">
      </a>
    </div>
    <ul>
      <router-link to="/">音乐馆</router-link>
      <router-link to="/my-music">我的音乐</router-link>
      <router-link to="">客户端</router-link>
      <router-link to="">音乐号</router-link>
      <router-link to="">VIP</router-link>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'top-nav'
}
</script>

<style type="text/css">
  #top-nav ul{
    display: flex;
    flex-direction: row;
    width: 500px;
    float: left;
    height: 28px;
    line-height: 28px;
  }
  #top-nav ul a{
    margin-right: 20px;
    text-decoration: none;
  }
  #top-nav ul a:visited{
    color: #000;
  }
  #top-nav ul a:hover{
    color: #40c672;
    cursor: pointer;
  }
  .logo {
    /*transform: scale(0.5);*/
    width: 170px;
    height: 46px;
  }
  .logo-container {
    width: 200px;
    float: left;
  }

</style>
