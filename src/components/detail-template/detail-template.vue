<template>
  <!-- todo 替换元素加判断最后做v-if="detailType === 'song'" -->
  <div>
    <div class="detail-head">
      <div class="belong-img">
        <img :src="song_detail.al.picUrl">
      </div>
      <div class="related-info">
        <div class="related-name">
          <h2>{{song_detail.name}}</h2>
        </div>
        <div class="related-author">
          <img src="../../assets/author2.svg">
          <span>{{song_detail.ar[0].name}}</span>
        </div>
        <div class="related-intro">
          <span>所属专辑:《{{song_detail.al.name}}》</span>
        </div>
        <div class="related-operations">
          <button>
            <img src="../../assets/play_2.svg">
            <span>播放</span>
          </button>
          <button>
            <img src="../../assets/love.svg">
            <span>收藏</span>
          </button>
          <button>
            <img src="../../assets/comment.svg">
            <span>评论（{{comment_total}})</span>
          </button>
        </div>
      </div>
    </div>
    <div class="lyric">
      <div>歌词</div>
      <div>
        <p v-for="s in song_lyric" :key="s">
          {{s}}
        </p>
      </div>
    </div>
    <div class="comment"></div>
  </div>
</template>

<script>
/* eslint semi: "error" */
import axios from 'axios';
export default {
  name: 'detail-template',
  props: ['soid', 'alid', 'detailType'],
  data () {
    return {
      song_detail: {},
      comment_total: undefined,
      res_lyric: ''
    };
  },
  computed: {
    song_lyric () {
      return this.res_lyric.split('\n');
    }
  },
  mounted () {
    // 根据detailType查询信息
    if (this.detailType === 'song') {
      let that = this;
      // 查询单曲信息
      axios
        .get('http://localhost:3000/song/detail?ids=' + this.soid)
        .then(function (response) {
          that.song_detail = response.data.songs[0];
        });
      // 查询单曲评论数量
      axios
        .get('http://localhost:3000/comment/music?id=' + this.soid)
        .then(function (response) {
          that.comment_total = response.data.total;
        });
      // 查询歌词
      axios
        .get('http://localhost:3000/lyric?id=' + this.soid)
        .then(function (response) {
          that.res_lyric = response.data.lrc.lyric;
        });
    }
  }
};
</script>

<style type="text/css">
  .belong-img {
    width: 21%;
    margin-right: 72px;
    position: relative;
    left: 20px;
  }
  .belong-img img {
    width: 100%;
    min-width: 120px;
  }
  .belong-img ,.related-info {
    float: left;
    text-align: initial;
  }
  .detail-head {
    /*background-color: rgba(0,0,0,0.2);*/
    max-width: 1200px;
    margin: 0 auto;
    padding-top: 26px;
  }
  .detail-head::after {
    display: block;
    content: '';
    clear: both;
  }
  .related-info {
    width: 52%;
  }
  .related-name h2 {
    letter-spacing: 1px;
    position: relative;
    top: 6px;
    margin: 0;
    padding-bottom: 18px;
  }
  .related-author {
    margin-bottom: 10px;
  }
  .related-author img {
    width: 20px;
    vertical-align: middle;
  }
  .related-author span {
    font-size: 18px;
    vertical-align: middle;
  }
  .related-intro {
    color: #999;
    font-size: 14px;
  }
  .related-operations {
    margin-top: 100px;
  }
  .related-operations button {
    padding: 8px 16px;
    margin-right: 20px;
    cursor: pointer;
    border-radius: 2px;
    background-color: transparent;
    outline: none;
  }
  .related-operations button img {
    width: 18px;
    height: 18px;
    vertical-align: middle;
  }
  .related-operations button span {
    font-size: 11px;
    line-height: 11px;
    position: relative;
    top: 1px;
  }
  .related-operations button:nth-of-type(1) {
    background-color: #40c672;
    color: #fff;
    border: 1px solid #40c672;
  }

</style>
