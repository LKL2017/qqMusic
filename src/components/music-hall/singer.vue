<template>
  <div>
    <div class="selector">
      <div class="singer-region" @click="changeChoice">
        <a v-for="r in singer_region" :key="r.id" :tag="r.id" href="#">
          {{r.tag}}
        </a>
      </div>
      <div class="singer-type" @click="changeChoice">
        <a v-for="t in singer_type" href="#" :key="t.id" :tag="t.id">
          {{t.tag}}
        </a>
      </div>
      <div class="first-char" @click="changeChoice">
        <a href="#" :tag="-1">全部</a>
        <a href="#" v-for="c in first_char" :key="c" :tag="c.toLowerCase()">
          {{c}}
        </a>
      </div>
      <div class="singer-list">
        <div v-for="s in res_singer" :key="s.id" class="single-container">
          <div class="single-img-container">
            <img :src="s.img1v1Url">
          </div>
          <a href="#" >
            <router-link :to="{name: 'singer-detail', params: { sname: s.name,sid: s.id}}">
              {{s.name}}
            </router-link>
          </a>
        </div>
      </div>
      <div class="q-offset" @click="changeChoice">
        <a href="#" v-for="p in page_arr" :key="p" :tag="p">
          {{p}}
        </a>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint semi: "error" */
import axios from 'axios';

export default {
  name: 'singer',
  props: ['tag'],
  data () {
    return {
      singer_region: [
        {id: '10', tag: '华语'},
        {id: '20', tag: '欧美'},
        {id: '60', tag: '日本'},
        {id: '70', tag: '韩国'},
        {id: '40', tag: '其他'}
      ],
      singer_type: [
        {id: '01', tag: '男'},
        {id: '02', tag: '女'},
        {id: '03', tag: '组合/乐队'}
      ],
      first_char: [],
      page_arr: [],
      q_region: '10',
      q_type: '01',
      q_char: -1,
      q_offset: 1,
      res_singer: {},
      q_limit: 20
    };
  },
  watch: {
    query_str () {
      let that = this;
      axios
        .get('http://localhost:3000/artist/list?' + this.query_str)
        .then(function (response) {
          that.res_singer = response.data.artists;
        });
    }
  },
  computed: {
    query_str () {
      let qs = 'cat=' + this.q_region + this.q_type;
      qs += '&offset=' + (this.q_offset - 1) * this.q_limit;
      qs += '&limit=' + this.q_limit;
      if (this.q_char != -1) {
        qs += '&initial=' + this.q_char;
      }
      return qs;
    }
  },
  beforeMount () {
    // 构造A-Z数组
    let charArr = [];
    for (let i = 65; i <= 90; i++) {
      let c = String.fromCharCode(i);
      charArr.push(c);
    }
    this.first_char = charArr;

    // 页码
    for (let i = 1; i <= 10; i++) {
      this.page_arr.push(i);
    }
  },
  mounted () {
    // 添加默认类 第一列：华语男歌手全部
    let fRegionA = document.querySelector('.singer-region a:nth-of-type(1)');
    fRegionA.className += ' actived';
    let fTypeA = document.querySelector('.singer-type a:nth-of-type(1)');
    fTypeA.className += ' actived';
    let fCharA = document.querySelector('.first-char a:nth-of-type(1)');
    fCharA.className += ' actived';
    let fOffsetA = document.querySelector('.q-offset a:nth-of-type(1)');
    fOffsetA.className += ' actived';

    // 查询当前选择的歌手列表
    let that = this;// 或者在then里用箭头函数
    axios
      .get('http://localhost:3000/artist/list?' + this.query_str)
      .then(function (response) {
        that.res_singer = response.data.artists;
      });
  },
  methods: {
    changeChoice (event) {
      if (event.target.tagName.toLowerCase() === 'a') {
        let currentClass = event.currentTarget.className;
        let arrA = document.querySelectorAll('.' + currentClass + ' a');
        for (let i = 0; i < arrA.length; i++) {
          arrA[i].className = '';
        }
        event.target.className += ' actived';
        switch (currentClass) {
          case 'singer-region':
            this.q_region = event.target.getAttribute('tag');
            break;
          case 'singer-type':
            this.q_type = event.target.getAttribute('tag');
            break;
          case 'first-char':
            this.q_char = event.target.getAttribute('tag');
            break;
          case 'q-offset':
            this.q_offset = event.target.getAttribute('tag');
            break;
        }
      }
    }
  }
};
</script>

<style type="text/css">
  .singer-region ,.singer-type,.first-char{
    position: relative;
    top: 30px;
    margin-left: 60px;
    margin-bottom: 12px;
    width: 240px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .singer-type{
    width: 160px;
  }
  .first-char{
    width:100%;
    justify-content: left;
    margin-bottom: 48px;
  }
  .selector a {
    padding: 4px 8px;
  }
  .actived {
    color: #fff;
    background-color: #40c672;
  }
  .actived:hover {
    color: #fff;
  }
  .singer-list {
    padding-top: 40px;
    padding-left: 60px;
    position: relative;
  }
  .singer-list::after {
    display: block;
    content: '';
    clear: both;
  }
  .singer-list img {
    width: 144px;
    height: 144px;
  }
  .single-img-container {
    width: 144px;
    height: 144px;
    border-radius: 72px;
    overflow: hidden;
    margin-bottom: 20px;
  }
  .single-container {
    float: left;
    margin-right: 70px;
    margin-bottom: 60px;
  }
</style>
