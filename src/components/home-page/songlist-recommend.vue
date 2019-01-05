<template>
    <div class="song-recommend">
      <h2>歌单推荐</h2>
      <p style="font-size: 10px;color: #999;">(注：由于api原因暂时看不到详情)</p>
      <!--查询前五个较火的歌单分类-->
      <ul class="tag-title" @click="showSongList">
        <li v-for="category in hotCategory" :key="category.id">
          <a style="cursor: pointer">{{category}}</a>
        </li>
      </ul>
      <!--根据选择的歌单分类展示对应歌单，绑定事件在歌单按钮上-->
      <div class="my-slider">
        <!--轮播组件-->
        <!--<my-slider :songCat="current_cat"></my-slider>-->
        <slider-v2 :songList="songList" :extraPrevSongList="extraPrevSongList"
        :extraNextSongList="extraNextSongList" sType="SongList" ref="SongList"></slider-v2>
      </div>
    </div>
</template>

<script>
/* eslint semi: "error" */
import axios from 'axios';
import mySlider from '../slider/slider';
import sliderV2 from '../slider/sliderV2';
export default {
  name: 'songlist-recommend',
  components: {
    mySlider,
    sliderV2
  },
  data () {
    return {
      hotCategory: [],
      currentCat: '华语',
      songList: [],
      extraPrevSongList: [],
      extraNextSongList: [],
      PAGE: 4,
      LIMIT: 5
    };
  },
  watch: {
    current_cat () {
      this.changeSongList();
    }
  },
  mounted () {
    // 取出初始歌单列表
    this.changeSongList();
  },
  created () {
    this.initCate();
  },
  methods: {
    // 初始化歌单分类
    initCate: function () {
      axios
        .get(this.COMMON.reqBaseUrl + '/playlist/hot')
        .then((response) => {
          // 取出前五个热门分类
          let dataArr = response.data.tags.slice(0, 5);
          this.hotCategory = dataArr.map(x => x.name);
        });
    },
    // 更新歌单分类
    showSongList: function (event) {
      // 过滤空白点击
      if (event.target.tagName.toLowerCase() === 'a') {
        this.currentCat = event.target.textContent;
      }
    },
    // 根据歌单类型取出列表
    changeSongList () {
      let that = this;
      //
      that.extraPrevSongList = [];
      that.extraNextSongList = [];
      that.songList = [];
      // songList
      for (let i = 1; i <= this.PAGE; i++) {
        axios
          .get(this.COMMON.reqBaseUrl + '/search?type=1000&limit=' +
            this.LIMIT + '&keywords=' + this.current_cat +
            '&offset=' + (i - 1) * this.LIMIT)
          .then(function (response) {
            let res = response.data.result.playlists;
            // console.log(res);
            // console.log('---');
            if (i === that.PAGE) {
              that.extraPrevSongList.push(res);
            }
            if (i === 1) {
              that.extraNextSongList.push(res);
            }
            that.songList.push(res);
          });
      }
    }
  }

};
</script>

<style type="text/css">
  .tag-title {
    width: 400px;
    padding: 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 24px auto 10px;
  }
  .tag-title li {
    list-style: none;
  }
  .song-recommend {
    background: rgb(246,246,246);
    height: 560px;
  }
  .song-recommend:hover .arrow-left a {
    left: 0;
    opacity: 1;
    transition: all 0.5s;
  }
  .song-recommend:hover .arrow-right a {
    right: 0;
    opacity: 1;
    transition: all 0.5s;
  }
</style>
