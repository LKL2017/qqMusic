<template>
  <div class="slider-wrapper">
    <div class="slider-v2">
      <!--根据sType展示不同内容-->
      <div v-if="sType === 'CD'" class="slider-box">
        <!--每一屏的ul-->
        <ul class="extra-prev">
          <li v-for="exli in extraPrevCD" :key="exli.id">
            <cd-el :single-data="exli"></cd-el>
          </li>
        </ul>
        <ul v-for="s in newCD" :key="s.id">
          <li v-for="subli in s" :key="subli.id">
            <cd-el :single-data="subli"></cd-el>
          </li>
        </ul>
        <ul class="extra-next">
          <li v-for="exli in extraNextCD" :key="exli.id">
            <cd-el :single-data="exli"></cd-el>
          </li>
        </ul>
      </div>
      <div v-else-if="sType === 'Song'">
        <!--接口参数limit暂时不可用-->
      </div>
      <div>
        <!--导航圆点-->
      </div>
    </div>
    <div class="slider-arrow">
      <!--翻页箭头-->
      <div class="arrow-left">
        <a class="slider-a" @click="prevScreen">
          <img src="../../assets/left_arrow.svg">
        </a>
      </div>
      <div class="arrow-right">
        <a class="slider-a" @click="nextScreen">
          <img src="../../assets/right_arrow.svg">
        </a>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint semi: "error" */
import cdEl from '../single-el/cd-el';
export default {
  name: 'sliderV2',
  props: ['newSong', 'newCD', 'extraNextCD', 'extraPrevCD', 'sType'],
  data () {
    return {
      SCREEN_COUNT: 6, // 这里每种类型的滑动次数是一样的，所以暂时不用计算属性
      current_left: 0
    };
  },
  computed: {
  },
  watch: {
  },
  components: {
    cdEl
  },
  methods: {
    nextScreen (event) {
      let sliderBox = document.querySelector('.slider-box');
      // 在合法索引范围都允许滑动 -2是多余的两张ul
      if (this.current_left < this.SCREEN_COUNT - 2 && this.current_left >= 0) {
        sliderBox.style.transition = 'left 0.5s';
        this.current_left += 1;
        sliderBox.style.left = (this.current_left + 1) * -100 + '%';// 这里+1是因为初始有偏移
        // 滑动完毕后(0.5s后)，如果到了extra那一张，则需要无缝切换至第一张
        let that = this;
        setTimeout(function () {
          if (that.current_left === that.SCREEN_COUNT - 2) {
            that.current_left = 0;
            sliderBox.style.transition = '';
            sliderBox.style.left = '-100%';
          }
        }, 500);
      }
    },
    prevScreen (event) {
      let sliderBox = document.querySelector('.slider-box');
      // 索引在合理范围内都可以移动
      if (this.current_left >= 0 && this.current_left < this.SCREEN_COUNT - 2) {
        this.current_left -= 1;
        sliderBox.style.transition = 'left 0.5s';
        sliderBox.style.left = (this.current_left + 1) * -100 + '%';
        // 滑动后(0.5s后)，如果当前是第一张，则需要先切换到最后一张，再执行上一张
        let that = this;
        setTimeout(function () {
          if (that.current_left === -1) {
            that.current_left = that.SCREEN_COUNT - 2 - 1;
            sliderBox.style.transition = '';
            sliderBox.style.left = (that.current_left + 1) * -100 + '%';
          }
        }, 500);
      }
    }
  }
};
</script>

<style type="text/css">
  .slider-wrapper {
    position: relative;
  }
  .slider-v2 {
    max-width: 1200px;
    margin: 0 auto;
    overflow: hidden;
  }
  .slider-box {
    width: 1250%;
    position: relative;
    left: -100%;
  }
  .slider-trans {
    transition: left 0.5s;
  }
  .slider-box ul {
    width: 8%;
    display: inline-block;
    float: left;
    list-style: none;
    padding: 0;
    margin-right: 4px;
  }
  .slider-box ul li {
    width: 20%;
    display: inline-block;
    padding-bottom: 30px;
    vertical-align: top;
  }
  .slider-box::after {
    display: block;
    content: '';
    clear: both;
  }
  .slider-box ul:after {
    display: block;
    content: '';
    clear: both;
  }
  .slider-arrow {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    pointer-events: none;
  }
  .arrow-left {
    width: 50%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
  .arrow-right {
    width: 50%;
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
  }
  .slider-a {
    background-color: rgba(0,0,0,0.05);
    padding: 18px 6px;
    height: 64px;
    position: absolute;
    top: 41%;
    margin-top: -32px;
    cursor: pointer;
    pointer-events: initial;
  }
  .slider-a:hover {
    background-color: rgba(0,0,0,0.1);
  }
  .arrow-left a {
    left: -14%;
    opacity: 0;
    transition: all 0.5s;
  }
  .arrow-right a {
    right: -14%;
    opacity: 0;
    transition: all 0.5s;
  }
  .arrow-left a img {

  }
  /*.show-arrow {*/
    /*left: 7%;*/
    /*transition: left 0.5s;*/
  /*}*/
</style>
