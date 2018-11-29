<template>
  <div v-if="iType === 'album'" class="i-box">
    <div v-for="a in aInfo" :key="a.id" class="i-container">
      <img :src="a.blurPicUrl">
      <div class="i-name">{{a.name}}</div>
      <div class="i-publish-time">{{new Date(a.publishTime).toLocaleDateString()}}</div>
    </div>
  </div>
  <div v-else-if="iType === 'mv'" class="i-box">
   <div v-for="m in mInfo" :key="m.id" class="i-m-container">
     <img :src="m.imgurl16v9">
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
  }
  .i-container{
    width: 224px;
  }
  .i-container img {
    width: 224px;
    height: 224px;
    margin-bottom: 8px;
  }
  .i-m-container{
    width: 224px;
  }
  .i-m-container img{
    width: 224px;
    height: 126px;
    margin-bottom: 8px;
  }
  .i-name ,.i-publish-time{
    text-align: left;
    font-size: 14px;
    margin-bottom: 3px;
  }
  .i-publish-time {
    color: #aaa;
  }
</style>
