<!--suppress ALL -->
<template>
    <div class="song-recommend">
      <h2>歌单推荐</h2>
      <!--查询前五个较火的歌单分类-->
      <ul class="tag-title" @click="showSongList">
        <li v-for="category in hot_category">
          <a href="javascript:;">{{category}}</a>
        </li>
      </ul>
      <!--根据选择的歌单分类展示对应歌单，绑定事件在歌单按钮上-->
      <div class="my-slider">
        <!--轮播组件-->
        <my-slider :songCat="current_cat"></my-slider>
      </div>
    </div>
</template>

<script>
  import axios from 'axios'
  import mySlider from '../slider/slider'
export default {
  name: 'songlist-recommend',
  components: {
    mySlider
  },
  data () {
    return {
      res: {},
      hot_category:[],
      current_cat:undefined
    }
  },
  beforeCreate () {
    let that = this;
    axios
      .get('http://localhost:3000/playlist/hot')
      .then(function(response){
        var data_arr = response.data.tags;
        var cat_arr = [];
        // 取出前五个热门分类
        data_arr = data_arr.slice(0,5);
        for (let i=0;i<data_arr.length;i++){
          cat_arr.push(data_arr[i].name);
        }
        that.hot_category = cat_arr;
        // 赋初始值给当前分类，否则会以undefined为参数进行请求
        that.current_cat = cat_arr[0];
      });
  },
  methods: {
    // 更新歌单分类
    showSongList: function(event){
      // 过滤空白点击
      if( event.target.tagName.toLowerCase() === 'a'){
        this.current_cat = event.target.textContent;
      }
    }
  }

}
</script>

<style type="text/css">
  .tag-title {
    width: 400px;
    margin: 0 auto;
    padding: 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 24px;
    margin-bottom: 10px;
  }
  .tag-title li {
    list-style: none;
  }
  .song-recommend {
    background: rgb(246,246,246);
  }

</style>
