<template>
  <div class="wp-container wp-blur">
    <audio class="music-player" :src="audioSrc" @timeupdate="getCurrentTime"></audio>
    <div class="song-playlist song-lyric-show">
      <div class="lyric-container">
        <div class="all-lyric">
          <p v-for="(s,index) in song_lyric" :key="s" class="s_lyric"
             :class="{'current_lyric': getLyricTime(s) <= currentCL && currentCL < getLyricTime(song_lyric[index+1])}">
            {{s | formatLyric}}
          </p>
        </div>
      </div>
    </div>
    <div class="player-relate">
      <div><a class="control-btn" :class="{'song-play-btn': !isPlay,'song-pause-btn': isPlay}" @click="toggleBtn"></a></div>
      <!--<div class="adjust-volume">-->
        <!--<div></div>-->
        <!--<div class="total-volume"></div>-->
        <!--<div class="current-volume"></div>-->
      <!--</div>-->
      <div class="progress-line">
        <div class="total-progress"></div>
        <div class="current-progress">
          <img src="../../assets/progress_dot.svg">
        </div>
      </div>
      <div class="time-info">
        <span>{{cTime}}/{{tTime}}</span>
      </div>
    </div>
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
      audioSrc: undefined,
      isPlay: true,
      cTime: '0:0',
      tTime: '0:0',
      player: {},
      song_lyric: [],
      currentCL: 0
    };
  },
  computed: {
  },
  filters: {
    formatLyric (str) {
      if (!str) return '';
      let index = str.lastIndexOf(']');
      return str.slice(index + 1);
    }
  },
  mounted () {
    this.player = document.querySelector('.music-player');
    if (this.$route.query.audioType === 'song') {
      // 这里props中的songID是undefined
      this.querySongUrl(this.$route.query.songID);
      this.player.autoplay = true;
      this.player.volume = 0.4;
      // this.getTotalTime(this.player);
      this.queryLyric(this.$route.query.songID);
    }
  },
  methods: {
    // 查询音乐url
    querySongUrl (id) {
      let that = this;
      axios
        .get(this.COMMON.reqBaseUrl + '/song/url?id=' + id)
        .then(function (response) {
          // 异步接口里不要使用return
          that.audioSrc = response.data.data[0].url;
        });
    },
    queryLyric (id) {
      let that = this;
      axios
        .get(this.COMMON.reqBaseUrl + '/lyric?id=' + id)
        .then(function (response) {
          let t = response.data.lrc.lyric;
          that.song_lyric = t.split('\n');
        });
    },
    getCurrentTime (event) {
      // 更新时间
      let ct = event.target.currentTime;
      let tt = event.target.duration; // bad
      this.cTime = this.formatTime(ct);
      this.tTime = this.formatTime(tt);
      // 更新进度条比例
      let rate = ct / tt;
      let cP = document.querySelector('.current-progress');
      cP.style.width = rate * 100 + '%';
      // 更新currentCL,当前歌词高亮
      this.currentCL = parseInt(ct);
      let el = document.querySelector('.all-lyric');
      el.style.transform = 'translateY(calc(' + -rate * 100 + '% + 400px))';
      // 歌曲播放完成时
      if (ct === tt) {
        this.isPlay = false;
      }
    },
    formatTime (t) {
      let min = parseInt(t / 60);
      let sec = parseInt(t % 60);
      sec = sec >= 10 ? sec : '0' + sec;
      return min + ':' + sec;
    },
    // 播放音乐
    playMusic () {
      this.player.play();
      this.isPlay = true;
    },
    pauseMusic () {
      this.player.pause();
      this.isPlay = false;
    },
    toggleBtn () {
      if (this.isPlay === false) {
        this.playMusic();
      } else {
        this.pauseMusic();
      }
    },
    getLyricTime (str) {
      let index = str.lastIndexOf(':');
      let min = parseInt(str.slice(index - 2, index));
      let sec = parseInt(str.slice(index + 1, index + 3));
      return min * 60 + sec;
    }
  }
};
</script>

<style type="text/css">
.wp-container {
  position: fixed;
  top: 0;
  left: 0;
  background-color: #fff;
  /*background-image: url;*/
  width: 100%;
  height: 100%;
}
.song-playlist {
  position: relative;
  min-height: 80%;
  /*background-color: #666666;*/
}
.control-btn {
  cursor: pointer;
  display:inline-block;
  width: 48px;
  height: 48px;
  position: relative;
}
.song-play-btn {
  background-image: url("../../assets/wp_play.svg");
}
.song-pause-btn {
  background-image: url("../../assets/wp_pause.svg");
}
.progress-line {
  width: 60%;
  min-width: 300px;
  position: relative;
}
.current-progress {
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 2px;
  background-color: #40c672;
}
.current-progress>img {
  width: 10px;
  position: absolute;
  right: -5px;
  top: -3px;
  user-select: none;
}
.total-progress {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: rgba(100,100,100,0.5);
}
.lyric-container {
  width: 640px;
  height: 420px;
  background-color: white;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -210px;
  margin-left: -320px;
  overflow: hidden;
  /*mask-image: ;*/
}
.s_lyric {
  color: #999999;
  transition: color 0.8s;
}
.current_lyric {
  color: #40c672;
  transition: color 0.8s;
}
.player-relate {
  width: 800px;
  margin: 0 auto;
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
</style>
