<template>
  <div id="top-nav">
    <div class="logo-container">
      <a href="#">
        <img src="../../assets/logo@2x.png" class="logo">
      </a>
    </div>
    <ul>
      <li><router-link to="/home-page">音乐馆</router-link></li>
      <li><router-link to="/my-music">我的音乐</router-link></li>
      <li><router-link to="/client">客户端</router-link></li>
      <li><router-link to="/musicBlog">音乐号</router-link></li>
      <li><router-link to="/vip">VIP</router-link></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'top-nav'
}
</script>

<style type="text/css">
  #top-nav {
    width: 60%;
  }
  #top-nav ul{
    display: flex;
    flex-direction: row;
    width: 500px;
    float: left;
    height: 28px;
    list-style: none;
    margin: 0;
    line-height: 46px;
  }
  #top-nav ul a{
    padding: 23px 10px;
    text-decoration: none;
  }
  /*#top-nav ul a:visited{*/
    /*color: #000;*/
  /*}*/
  #top-nav ul a:hover{
    color: #40c672;
    cursor: pointer;
  }
  #top-nav .router-link-active {
    color: #fff;
    background-color: #40c672;
  }
  #top-nav .router-link-active:hover {
    color: #fff;
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
