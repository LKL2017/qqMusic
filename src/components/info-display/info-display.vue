<template>
  <div v-if="iType === 'album'" class="i-box">
    <div v-for="a in aInfo" :key="a.id" class="i-container">
      <div class="i-cover">
        <router-link :to="{name:'album-detail',params:{alid: a.id, detailType:'album'}}">
          <img class="i-cover-img" :src="a.blurPicUrl">
          <i class="i-cover-mask"></i>
          <i class="i-play-btn"></i>
        </router-link>
      </div>
      <div class="i-name">
        <router-link :to="{name:'album-detail',params:{alid: a.id, detailType:'album'}}">{{a.name}}</router-link>
      </div>
      <div class="i-publish-time">{{new Date(a.publishTime).toLocaleDateString()}}</div>
    </div>
  </div>
  <div v-else-if="iType === 'mv'" class="i-box">
   <div v-for="m in mInfo" :key="m.id" class="i-m-container">
     <div class="i-cover">
       <img class="i-cover-img" :src="m.imgurl16v9">
       <i class="i-cover-mask"></i>
       <i class="i-play-btn"></i>
     </div>
     <div class="i-name">{{m.name}}</div>
     <!--<div class="i-played"></div>-->
   </div>
  </div>
  <div v-else-if="iType === 'simi'">
   <div>
     <p style="text-align: center;color: silver">
       =======🤔施工中=======</p>
   </div>
  </div>
</template>

<script>
/* eslint semi: "error" */
export default {
  name: 'info-display',
  props: ['aInfo', 'mInfo', 'sInfo', 'iType']
};
</script>

<style type="text/css">
  .i-box {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 20px;
    margin-bottom: 20px;
    text-align: initial;
  }
  .i-container{
    width: 224px;
  }
  .i-container img {
    width: 224px;
    height: 224px;
    /*margin-bottom: 8px;*/
    vertical-align: top;
    transition: all 0.5s;
  }
  .i-m-container{
    width: 224px;
  }
  .i-m-container img{
    width: 224px;
    height: 126px;
    /*margin-bottom: 8px;*/
    vertical-align: top;
    transition: all 0.5s;
  }
  .i-name ,.i-publish-time{
    text-align: left;
    font-size: 14px;
    margin-bottom: 3px;
  }
  .i-name {
    margin-top: 8px;
  }
  .i-publish-time {
    color: #aaa;
  }
  .i-cover {
    position: relative;
    overflow: hidden;
  }
  .i-cover-mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.4);
    opacity: 0;
    transition: all 0.5s;
  }
  .i-play-btn {
    position: absolute;
    width: 64px;
    height: 64px;
    top: 50%;
    left: 50%;
    margin-left: -32px;
    margin-top: -32px;
    background-image: url("../../assets/play_btn.svg");
    background-size: 64px;
    opacity: 0;
    transition: all 0.5s;
  }
  .i-cover:hover .i-cover-mask{
    opacity: 1;
  }
  .i-cover:hover .i-play-btn{
    transform: scale(1.2);
    opacity: 1;
  }
  .i-cover:hover .i-cover-img{
    transform: scale(1.2);
  }
</style>
