<template>
<div>
  <div class="slr">
    <song-list-recommend></song-list-recommend>
  </div>
  <div>
    <music-video></music-video>
  </div>
</div>
</template>

<script>
import songListRecommend from '../home-page/songlist-recommend'
import musicVideo from '../home-page/music-video'
export default {
  name: 'home-page',
  components: {
    songListRecommend,
    musicVideo
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
