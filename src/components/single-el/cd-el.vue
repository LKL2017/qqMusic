<template>
  <div class="single-cd-box">
    <div>
      <img :src="singleData.picUrl">
    </div>
    <div class="cd-mask"></div>
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
export default {
  name: 'cd-el',
  props: ['singleData']
}
</script>

<style type="text/css">
  .single-cd-box {
    display: flex;
    flex-direction: column;
    min-width: 144px;
    float: left;
    margin-right: 18px;
  }
  .single-cd-box img {
    width: 100%;
  }
  .cd-name,.cd-author {
    text-align: left;
    font-size: 13px;
    margin-bottom: 2px;
  }
  .cd-author {
    color: #999;
  }
</style>
