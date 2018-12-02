<template>
  <div class="single-cd-box">
    <div class="play">
      <router-link :to="{name: 'album-detail', params:{alid: singleData.id,detailType:'album'}}">
        <img class="scd-p-img" :src="singleData.picUrl">
        <i class="cd-mask"></i>
        <i class="cd-play-btn"></i>
      </router-link>
    </div>
    <div class="cd-name">
      <router-link :to="{name: 'album-detail', params:{alid: singleData.id,detailType:'album'}}">
        {{singleData.name}}
      </router-link>
    </div>
    <div class="cd-author">
      <router-link :to="{name: 'singer-detail', params:{sid: singleData.artist.id}}">
        {{singleData.artist.name}}
      </router-link>
    </div>
  </div>
</template>

<script>
/* eslint semi: "error" */
export default {
  name: 'cd-el',
  props: ['singleData'],
  mounted () {
  }
};
</script>

<style type="text/css">
  .single-cd-box {
    display: flex;
    flex-direction: column;
    min-width: 144px;
    float: left;
    margin-right: 18px;
    position: relative;
  }
  .play img {
    width: 100%;
    vertical-align: top;
    transition: all 0.5s;
  }
  .cd-name,.cd-author {
    text-align: left;
    font-size: 13px;
    margin-bottom: 2px;
  }
  .cd-author {
    color: #999;
  }
  .play {
    position: relative;
    margin-bottom: 6px;
    overflow: hidden;
    cursor: pointer;
  }
  .cd-mask {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0,0,0,0.4);
    opacity: 0;
    transition: opacity 0.5s;
  }
  .cd-play-btn {
    position: absolute;
    background: url("../../assets/play_btn.svg") no-repeat;
    width:64px;
    height: 64px;
    background-size: 64px;
    top: 50%;
    left: 50%;
    margin-left: -32px;
    margin-top: -32px;
    opacity: 0;
    transition: all 0.5s;
  }
  .play:hover .cd-mask{
    opacity: 1;
  }
  .play:hover .cd-play-btn{
    opacity: 1;
    transform: scale(1.2);
  }
  .play:hover .scd-p-img {
    transform: scale(1.2);
  }
</style>
