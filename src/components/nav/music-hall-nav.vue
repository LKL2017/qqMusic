<template>
  <div>
    <div id="music-hall-div">
      <ul>
        <router-link to="/home-page">首页</router-link>
        <router-link to="/singer">歌手</router-link>
        <router-link to="/album">专辑</router-link>
        <router-link to="/leader-board">排行榜</router-link>
        <router-link to="/songlist-class">分类歌单</router-link>
        <router-link to="/radio">电台</router-link>
        <router-link to="/music-video">MV</router-link>
        <router-link to="/digital-album">数字专辑</router-link>
        <router-link to="/ticketing">票务</router-link>
      </ul>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'music-hall-nav'
}
</script>

<style type="text/css">
  #music-hall-div ul {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  #music-hall-div ul a{
    margin-right: 24px;
    text-decoration: none;
  }
  #music-hall-div ul a:visited{
    color: #000;
  }
  #music-hall-div ul a:hover{
    color: #40c672;
    cursor: pointer;
  }
</style>
