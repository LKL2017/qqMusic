<template>
  <div class="new-cd-wrapper">
    <div>
      <h2>新碟首发</h2>
    </div>
    <div class="cd-more">
      <span>更多></span>
    </div>
    <div>
      <slider-v2 :newCD="newCD" :extraPrevCD="extraPrevCD" :extraNextCD="extraNextCD" sType="CD"></slider-v2>
    </div>
  </div>
</template>

<script>
/* eslint semi: "error" */
import sliderV2 from '../slider/sliderV2';
import axios from 'axios';
export default {
  name: 'new-CD',
  components: {
    sliderV2
  },
  data () {
    return {
      newCD: [],
      // 单独取出第一个偏移作为轮播图的无缝过度使用
      extraNextCD: [],
      extraPrevCD: [],
      PAGE: 4,
      LIMIT: 10
    };
  },
  mounted () {
    // 获取新碟数据
    let that = this;
    for (let i = 1; i <= this.PAGE; i++) {
      axios
        .get('http://localhost:3000/top/album?offset=' + this.LIMIT * (i - 1) + '&limit=' + this.LIMIT)
        .then(function (response) {
          if (i === 1) {
            that.extraNextCD = response.data.albums;
          }
          if (i === that.PAGE) {
            that.extraPrevCD = response.data.albums;
          }
          // TODO 如果push数据没有按照顺序到数组里，则轮播图的滑动效果会失效
          that.newCD.push(response.data.albums);
        });
    }
  },
  methods: {

  }
};
</script>

<style type="text/css">
.new-cd-wrapper:hover .arrow-left a {
  left: 0;
  opacity: 1;
  transition: all 0.5s;
}
.new-cd-wrapper:hover .arrow-right a {
  right: 0;
  opacity: 1;
  transition: all 0.5s;
}
.new-cd-wrapper {
}
.cd-more {
  position: relative;
}
.cd-more span {
  position: relative;
  left: 45%;
  font-size: 14px;
  font-weight: bold;
}
</style>
