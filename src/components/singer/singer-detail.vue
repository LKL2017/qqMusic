<template>
  <div>
    <div class="singer-detail" :sid="$route.params.sid">
      <div class="singer-brief">
        <div class="avatar">
          <img :src="res.artist.img1v1Url" >
        </div>
        <div class="info">
          <p>{{res.artist.name}}</p>
          <!--<p>{{res.artist.briefDesc}}</p>-->
          <p>简介</p>
          <div>
            <span>单曲:{{res.artist.musicSize}}</span>
            <span>专辑:{{res.artist.albumSize}}</span>
            <span>MV:{{res.artist.mvSize}}</span>
          </div>
          <div class="btn">
            <button>播放热门歌曲</button>
            <button>关注</button>
          </div>
        </div>
      </div>
      <div class="singer-hot-song">
        <div class="t">
          <span>热门歌曲</span>
          <span>全部></span>
        </div>
        <div>
          <table class="songs-table">
            <tr>
              <th>歌曲</th>
              <th>专辑</th>
              <!--<td></td>-->
            </tr>
            <tr v-for="content in hot_songs" :key="content.id">
              <td>{{content.name}}</td>
              <td>{{content.al.name}}</td>
              <!--<td>222</td>-->
            </tr>
          </table>
        </div>
      </div>
      <div class="singer-album">
        <div class="t">
          <span>专辑</span>
          <span>全部></span>
        </div>
        <info-display :aInfo="album_info" iType="album"></info-display>
      </div>
      <div class="singer-mv">
        <div class="t">
          <span>MV</span>
          <span>全部></span>
        </div>
        <info-display :mInfo="mv_info" iType="mv"></info-display>
      </div>
      <div class="simi-singer">
        相似歌手
      </div>
    </div>
  </div>
</template>

<script>
/* eslint semi: "error" */
import axios from 'axios';
import infoDisplay from '../../components/info-display/info-display';

export default {
  name: 'singer-detail',
  components: {
    infoDisplay
  },
  data () {
    return {
      res: {},
      hot_songs: [],
      album_info: {},
      mv_info: {}
    };
  },
  props: ['sid'],
  mounted () {
    // 查询歌手相关信息
    let that = this;
    axios
      .get('http://localhost:3000/artists?id=' + this.sid)
      .then(function (response) {
        that.res = response.data;
        for (let i = 0; i < 20; i++) {
          that.hot_songs.push(response.data.hotSongs[i]);
        }
      });

    // 查询专辑信息
    axios
      .get('http://localhost:3000/artist/album?id=' + this.sid + '&limit=5')
      .then(function (response) {
        that.album_info = response.data.hotAlbums;
      });

    // 查询mv信息
    axios
      .get('http://localhost:3000/artist/mv?id=' + this.sid + '&limit=5')
      .then(function (response) {
        that.mv_info = response.data.mvs;
      });
  }
};
</script>

<style type="text/css">
  .singer-detail {
    display: flex;
    flex-direction: column;
  }
  .singer-brief {
    margin: 0 auto;
    padding-bottom: 20px;
    min-width: 1200px;
    position: relative;
    border-bottom: 1px solid silver;
  }
  /*.singer-brief::after {*/
    /*display: block;*/
    /*content: '';*/
    /*clear: both;*/
  /*}*/
  .avatar {
    width: 220px;
    height: 220px;
    border-radius: 110px;
    overflow: hidden;
    float: left;
    position: relative;
    /*left: 140px;*/
  }
  .avatar img {
    width: 220px;
    height: 220px;
  }
  .info {
    margin-left: 260px;
    /*float: left;*/
    /*width: calc(100% - 200px);*/
    text-align: left;
    background-color: aliceblue;
  }
  .info p:nth-of-type(1) {
    font-size: 30px;
    margin-top: 20px;
  }
  .info span {
    margin-right: 14px;
  }
  .info .btn {
    margin-top: 20px;
  }
  .singer-hot-song ,.singer-album,.singer-mv{
    min-width: 1200px;
    margin: 0 auto;
  }
  .songs-table tr:nth-of-type(odd){
    background-color: rgba(240,240,240,0.4);
  }
  .songs-table {
    border: 0;
    border-collapse: collapse;
    width: 100%;
    color: #666;
    font-size: 14px;
    text-align: left;
    margin-bottom: 44px;
  }
  .songs-table td,th {
    padding: 12px 0 12px 6px;
  }
  .songs-table th {
    font-weight: normal;
    color: #aaa;
  }
  .singer-hot-song .t{
    /*vertical-align: middle;*/
    height: 40px;
  }
  .singer-hot-song .t::after{
    display: block;
    content: '';
    clear: both;
  }
  .singer-album .t::after{
    display: block;
    content: '';
    clear: both;
  }
  .singer-mv .t::after {
    display: block;
    content: '';
    clear: both;
  }
  .t span:nth-of-type(1){
    float: left;
    font-size: 22px;
    line-height: 40px;
    font-weight: bold;
  }
  .t span:nth-of-type(2){
    float: right;
    font-size: 14px;
    line-height: 40px;
    font-weight: bold;
  }
</style>
