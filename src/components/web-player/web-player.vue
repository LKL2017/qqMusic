<template>
  <div class="wp-container">
    <audio class="player" :src="audioSrc"></audio>
    <button @click="playMusic">播放</button>
    <button @click="pauseMusic">暂停</button>
  </div>
</template>

<script>
/* eslint semi: "error" */
import axios from 'axios';

export default {
  name: 'web-player',
  // props: ['songID', 'audioType'],
  data () {
    return {
      baseUrl: 'http://localhost:3000',
      audioSrc: undefined
    };
  },
  computed: {
    player () {
      return document.querySelector('.wp-container .player');
    }
  },
  mounted () {
    if (this.$route.query.audioType === 'song') {
      // 这里props中的songID是undefined
      this.querySongUrl(this.$route.query.songID);
      this.player.autoplay = false;
    }
  },
  methods: {
    // 查询音乐url
    querySongUrl (id) {
      let that = this;
      axios
        .get(this.baseUrl + '/song/url?id=' + id)
        .then(function (response) {
          // 异步接口里不要使用return
          that.audioSrc = response.data.data[0].url;
        });
    },
    // 播放音乐
    playMusic () {
      this.player.play();
    },
    pauseMusic () {
      this.player.pause();
    }
  }
};
</script>

<style type="text/css" >
html,body {
  height: 100%;
  margin: 0;
  padding: 0;
}
.wp-container {
  height: 100%;
  background-color: rgba(0,0,0,0.2);
}
#main-nav {
    display: none;
}
.my-footer {
  visibility: hidden;
}
#app {
  height: 100%;
  overflow: hidden;
}
</style>
