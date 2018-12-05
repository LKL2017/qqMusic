<template>
    <div class="single-sl-box">
      <div class="play">
        <!--<router-link :to="{name: 'sl-detail', params:{slid: singleData.id,detailType:'sl'}}">-->
          <img class="sl-p-img scd-p-img" :src="singleData.coverImgUrl">
          <i class="sl-mask cd-mask"></i>
          <i class="sl-play-btn cd-play-btn"></i>
        <!--</router-link>-->
      </div>
      <div class="sl-name">
        <!--<router-link :to="{name: 'sl-detail', params:{slid: singleData.id,detailType:'sl'}}">-->
          {{singleData.name}}
        <!--</router-link>-->
      </div>
      <div class="sl-playcount">
        <span>播放量:{{playCount}}</span>
      </div>
    </div>
</template>

<script>
export default {
  name: 'sl-el',
  props: ['singleData'],
  computed: {
    playCount () {
      if (this.singleData.playCount >= 10000) {
        return parseInt(this.singleData.playCount / 10000) + '万'
      } else {
        return this.singleData.playCount
      }
    }
  }
}
</script>

<style type="text/css">
  .single-sl-box {
    text-align: left;
    margin-right: 18px;
  }
  .play img {
    width: 100%;
    vertical-align: top;
    transition: all 0.5s;
  }
  .sl-name ,.sl-playcount {
    font-size: 13px;
    margin-bottom: 2px;
  }
  .sl-playcount {
    color: #999;
  }

</style>
