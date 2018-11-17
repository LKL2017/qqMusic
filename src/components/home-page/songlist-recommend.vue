<!--suppress ALL -->
<template>
    <div>
      <h2>歌单推荐</h2>
      <!--<ul class="tag-title">-->
        <!--<li v-for="cat in res.data.tags.slice(0,5)">-->
          <!--{{cat.name}}-->
        <!--</li>-->
      <!--</ul>-->
      <ul>
        <li v-for="result in query_res.data.result.playlists">
          {{result.name}}
        </li>
      </ul>
    </div>
</template>

<script>
  import axios from 'axios'
export default {
  name: 'songlist-recommend',
  data () {
    return {
      res: {},
      query_res: {}
    }
  },
  // computed: {
  //   list: function(){
  //     return this.res.data.tag.slice(0,5)
  //   }
  // },
  created () {
    // axios
    //   .get('http://localhost:3000/playlist/hot')
    //   .then(response => this.res = response)
    axios
      .get('http://localhost:3000/search?keywords=游戏&type=1000&limit=5')
      .then(response => this.query_res = response)
  }
}
</script>

<style type="text/css">
  .tag-title li{
    list-style: none;
    float: left;
    margin-right: 20px;
  }
</style>
