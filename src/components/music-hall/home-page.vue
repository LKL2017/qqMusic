<template>
<div>
  <div class="slr">
    <song-list-recommend></song-list-recommend>
  </div>
  <div>
    <new-CD></new-CD>
  </div>
  <div>
    <song-rank></song-rank>
  </div>
  <div>
    <music-video></music-video>
    <todo-template></todo-template>
  </div>
  <div>
    <new-song></new-song>
    <todo-template></todo-template>
  </div>
</div>
</template>

<script>
import songListRecommend from '../home-page/songlist-recommend'
import musicVideo from '../home-page/music-video'
import newSong from '../home-page/new-song'
import todoTemplate from '../todo-template/todo-template'
import newCD from '../home-page/new-CD'
import songRank from '../home-page/song-rank'
export default {
  name: 'home-page',
  components: {
    songListRecommend,
    musicVideo,
    newSong,
    todoTemplate,
    newCD,
    songRank
  }
}
</script>

<style type="text/css">
  .slr:hover .prev{
    display: block;
  }
  .slr:hover .next{
    display: block;
  }
</style>
