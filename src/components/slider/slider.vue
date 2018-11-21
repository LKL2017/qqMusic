<!--suppress ALL -->
<template>
  <div class="wrapper">
    <div id="cover-container">
      <ul id="cover-ul">
        <li v-for="song in current_category">
          <img class="single-cover" :src="song.coverImgUrl">
        </li>
      </ul>
      <div id="dot-index" @click="clickCircle">
        <!--原点由js动态生成-->
      </div>
    </div>
    <div class="control">
      <div class="prev" @click="prevImage"></div>
      <div class="next" @click="nextImage"></div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */

import axios from 'axios'

export default {
  name: 'slider',
  props: ['songCat'],
  data () {
    return {
      current_category: {}, //请求所返回的，当前选中的分类对应的歌单数据
      LIMIT: 15,            //请求量
      SINGLE_PAGE: 5,       //单个屏展示歌曲数目（按一排计算）
      keywords: null,       //请求关键字 ，由songCat更新
      QUERY_TYPE: 1000,     //查询类型，这里的api文档中1000代表歌单
      current_offset: 0,    //当前图片偏移量
      circle_index: 1       //当前小圆点导航索引
    }
  },
  computed: {
      imgCount: function () {
        return document.querySelectorAll("#cover-ul li").length;
      },
      sliderOffset: function () {
        return 200 + 50
      },
      pageCount: function () {
        return this.LIMIT/this.SINGLE_PAGE
      }
  },
  mounted () {
    axios
      .get('http://localhost:3000/search?keywords=' + this.songCat + '&type=' + this.QUERY_TYPE + '&limit=' + this.LIMIT)
      .then(response => this.current_category = response.data.result.playlists);
    //生成小圆点导航
    let ul = document.querySelector("#dot-index");
    for(let i = 0;i<this.pageCount;i++){
      let a = document.createElement("a");
      a.className = "dot";
      ul.appendChild(a);
    }
    //生命周期挂载阶段：默认给第一个小圆点添加特殊class
    let first_a = document.querySelector("#dot-index a:nth-of-type(1)");
    first_a.className += " current_circle";
  },
  // 不能在此处修改歌单数据，这样会导致data监测到更新，从而一直循环这个生命周期函数
  // 原因是-->即使歌单列表里的内容不改变，但是引用改变（对象类型），会被判断为更新了数据
  // beforeUpdate () {
  //   axios
  //     .get('http://localhost:3000/search?keywords=' + this.songCat + '&type=' + this.QUERY_TYPE + '&limit=' + this.LIMIT)
  //     .then(response => this.current_category = response.data.result.playlists);
  // },
  watch: {
    // 监听songCat属性变化
    songCat () {
        axios
          .get('http://localhost:3000/search?keywords=' + this.songCat + '&type=' + this.QUERY_TYPE + '&limit=' + this.LIMIT)
          .then(response => this.current_category = response.data.result.playlists);
    }
  },
  methods: {
    // 点击导航小圆点滑动到对应的封面
    clickCircle: function(event){
      // 由于是事件委托，所以可能会点击到其他元素，这里只对a元素作出响应
      if(event.target.tagName.toLowerCase() === "a"){
        let all = document.querySelectorAll(".dot");
        for(let i = 0;i < all.length;i++){
          //把所有原点的class"刷新"一遍
          all[i].className = "dot";
        }
        let click_index = event.target;
        click_index.className = "dot current_circle";
        //计算图片偏移量
        this.current_offset = (this.getIndex(click_index) - 1)*this.SINGLE_PAGE;
        let ul = document.querySelector("#cover-ul");
        ul.style.left = -this.sliderOffset * this.current_offset + "px";
      }
    },
    // 点击下一张触发事件
    nextImage: function(event){
      //记录上一个小圆点的索引
      let last = this.circle_index;
      // 计算图片偏移量
      if(this.current_offset + this.SINGLE_PAGE >= this.imgCount){
        this.current_offset = 0;
        this.circle_index = 1;
      }else{
        // 偏移量增加每一屏要展示的图片数量
        this.current_offset += this.SINGLE_PAGE;
        this.circle_index += 1;
      }
      //作偏移操作,负号表示向左偏移
      let ul = document.querySelector("#cover-ul");
      ul.style.left = -this.sliderOffset * this.current_offset + "px";
      //相应的圆点也要变化
      this.changeCircle(last,this.circle_index);
    },
    // 点击上一张触发事件
    prevImage: function(event){
      let last = this.circle_index;
      if(this.current_offset - this.SINGLE_PAGE < 0){
        //最大图片量 - 每页张数才能显示完整
        this.current_offset = this.imgCount - this.SINGLE_PAGE;
        this.circle_index = this.pageCount;
      }else{
        // 偏移量为每一屏图片数量
        this.current_offset -= this.SINGLE_PAGE;
        this.circle_index -= 1;
      }
      //作偏移操作，负号表示向左偏移
      let ul = document.querySelector("#cover-ul");
      ul.style.left = -this.sliderOffset * this.current_offset + "px";
      //相应的原点也要变化
      this.changeCircle(last,this.circle_index);
    },
    // 改变当前小圆点位置
    changeCircle: function (last,current) {
      //当前的小圆点会有特殊类标示，该函数旨在转移这个特殊class
      let last_circle = document.querySelector("#dot-index a:nth-of-type" + "(" + last + ")");
      last_circle.className = "dot";
      let current_circle = document.querySelector("#dot-index a:nth-of-type" + "(" + current + ")");
      current_circle.className = "dot current_circle";
    },
    // 点击小圆点时滑动图片
    getIndex: function (current) {
      let index = 0;
      for(let i = 1; i<= this.pageCount;i++){
        let el = document.querySelector("#dot-index a:nth-of-type" + "(" + i + ")");
        // 如果点击的原点与循环中某一次匹配，则返回当前索引
        if(el == current){
          index = i;
        }
      }
      return index;
    }
  }
}
</script>

<style type="text/css">
  #cover-container {
    width: 1200px;
    height: 300px;
    overflow-x: hidden;
    margin: 0 auto;
  }
  #cover-ul {
    list-style: none;
    padding: 0;
    /*margin: 0 auto;*/
    display: flex;
    flex-direction: row;
    position: relative;
    left: 0;
    transition: left 0.6s;
  }
  .single-cover {
    width: 200px;
    height: 200px;
    margin-right: 50px;
  }
  #dot-index {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 80px;
    margin: 36px auto 0;
  }
  /*这里如果加入#dot-index，权重会变高 下面的hover，current选择器会不生效*/
  .dot{
    border-radius: 4px;
    width: 8px;
    height: 8px;
    background-color: rgb(220,220,220);
    cursor: pointer;
  }
  #dot-index .dot:hover,.current_circle {
    background-color: rgb(160,160,160);
  }
  .wrapper{
    position: relative;
  }
  .control{
    display: flex;
    flex-direction: row;
    position: absolute;
    justify-content: space-between;
    top: 80px;
    width: 100%;
  }
  .prev{
    background: url("../../assets/prev.svg") no-repeat;
    width: 70px;
    height: 70px;
    margin-left: -20px;
  }
  .next{
    background: url("../../assets/next.svg") no-repeat;
    width: 70px;
    height: 70px;
    margin-right: -20px;
  }
</style>
