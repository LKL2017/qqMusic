<template>
  <!-- todo 替换元素加判断最后做v-if="detailType === 'song'" -->
  <div>
    <div class="detail-head">
      <div class="belong-img">
        <img v-if="detailType === 'song'" :src="song_detail.al.picUrl" key="song">
        <img v-else-if="detailType === 'album'" :src="album_detail.album.picUrl" key="album">
      </div>
      <div class="related-info">
        <div class="related-name">
          <h2 v-if="detailType === 'song'" key="song">{{song_detail.name}}</h2>
          <h2 v-else-if="detailType === 'album'" key="album">{{album_detail.album.name}}</h2>
        </div>
        <div class="related-author">
          <img src="../../assets/author2.svg">
          <span v-if="detailType === 'song'">{{song_detail.ar[0].name}}</span>
          <span v-else-if="detailType === 'album'">{{album_detail.album.artist.name}}</span>
        </div>
        <div class="related-intro">
          <span v-if="detailType === 'song'" key="song">所属专辑:《{{song_detail.al.name}}》</span>
          <span v-else-if="detailType === 'album'" key="album">
            类型:{{album_detail.album.type}}
          </span>
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
    <div v-if="detailType === 'song'" class="lyric" key="song">
      <div>歌词</div>
      <div>
        <p v-for="(s,index) in song_lyric" :key="index">
          {{s | hideTime}}
        </p>
      </div>
      <!--<div class="toggle">-->
        <!--<a @click="toggleLyric">[展开]</a>-->
      <!--</div>-->
    </div>
    <div v-else-if="detailType === 'album'" key="album">歌曲列表</div>
    <div class="comment">
      <comment-el :commentInfo="commentInfo"></comment-el>
    </div>
  </div>
</template>
<script>
/* eslint semi: "error" */
import axios from 'axios';
import commentEl from '../../components/single-el/comment-el';
export default {
  name: 'detail-template',
  props: ['soid', 'alid', 'detailType'],
  data () {
    return {
      song_detail: {},
      album_detail: {},
      comment_total: undefined,
      res_lyric: '',
      isShow: false,
      commentInfo: []
    };
  },
  computed: {
    song_lyric () {
      if (this.res_lyric) return this.res_lyric.split('\n');
    }
  },
  filters: {
    hideTime (str) {
      if (!str) return '';
      let searchChar = ']';
      let index = str.indexOf(searchChar);
      str = str.slice(index + 1);
      return str;
    }
  },
  components: {
    commentEl
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

      // 获取评论 暂时先只展示热评
      axios
        .get('http://localhost:3000/comment/music?limit=1&id=' + this.soid)
        .then(function (response) {
          that.commentInfo = response.data.hotComments;
        });
    } else if (this.detailType === 'album') {
      let that = this;
      // 查询专辑信息
      axios
        .get('http://localhost:3000/album?id=' + this.alid)
        .then(function (response) {
          that.album_detail = response.data;
        });

      // 获取热评
      axios
        .get('http://localhost:3000/comment/album?limit=1&id=' + this.alid)
        .then(function (response) {
          that.commentInfo = response.data.hotComments;
        });
    }
  },
  methods: {
    // hideLyric () {
    //   // 隐藏15行以后歌词
    //   let lyricP = document.querySelectorAll('.lyric p');
    //   for (let i = 15; i < lyricP.length; i++) {
    //     lyricP[i].className = 'hide-lyric';
    //   }
    //   // 按钮文字切换
    //   let a = document.querySelector('.lyric .toggle a');
    //   a.innerHTML = '[展开]';
    //   this.isShow = false;
    // },
    // showLyric () {
    //   // 与hideLyric相反
    //   let lyricP = document.querySelectorAll('.lyric p');
    //   for (let i = 15; i < lyricP.length; i++) {
    //     lyricP[i].className = '';
    //   }
    //   let a = document.querySelector('.lyric .toggle a');
    //   a.innerHTML = '[收起]';
    //   this.isShow = true;
    // },
    // toggleLyric () {
    //   if (this.isShow) {
    //     this.hideLyric();
    //   } else {
    //     this.showLyric();
    //   }
    // }
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
  .lyric {
    max-width: 1200px;
    margin: 30px auto 0;
    position: relative;
    left: 20px;
    /*background-color: #aaaaaa;*/
    text-align: left;
  }
  .lyric p {
    margin: 4px 0;
    font-size: 14px;
  }
  .lyric div:nth-of-type(1){
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 20px;
  }
  .comment {
    max-width: 1200px;
    margin: 30px auto 0;
    position: relative;
    left: 20px;
    /*background-color: #aaaaaa;*/
    /*height: 10px;*/
    text-align: initial;
  }
  /*.lyric .toggle a {*/
    /*font-size: 14px;*/
    /*color: #40c672;*/
    /*cursor: pointer;*/
  /*}*/
  /*.hide-lyric {*/
    /*display: none;*/
  /*}*/

</style>
