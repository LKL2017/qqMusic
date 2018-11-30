import Vue from 'vue'
import Router from 'vue-router'
import musicHallNav from '../components/nav/music-hall-nav'
import homePage from '../components/music-hall/home-page.vue'
import myMusic from '../components/my-music/my-music'
import singer from '../components/music-hall/singer'
import album from '../components/music-hall/album'
import leaderBoard from '../components/music-hall/leaderboard'
import songlistClass from '../components/music-hall/songlist-classification'
import radio from '../components/music-hall/radio'
import musciVideo from '../components/music-hall/MV'
import digitalAlbum from '../components/music-hall/digital-album'
import ticketing from '../components/music-hall/ticketing'
import singerDetail from '../components/singer/singer-detail'
import detailTemplate from '../components/detail-template/detail-template'
Vue.use(Router)

const routes = [
  { path: '/',
    component: musicHallNav,
    redirect: '/home-page',
    // alias: '/music-hall',
    children: [
      {path: '/home-page', component: homePage},
      {path: '/singer', component: singer},
      {path: '/singer/:sid', name: 'singer-detail', component: singerDetail, props: true},
      {path: '/song/:soid', name: 'song-detail', component: detailTemplate, props: true},
      {path: '/album', component: album},
      {path: '/album/:alid', name: 'album-detail', component: detailTemplate, props: true},
      {path: '/leader-board', component: leaderBoard},
      {path: '/songlist-class', component: songlistClass},
      {path: '/radio', component: radio},
      {path: '/music-video', component: musciVideo},
      {path: '/digital-album', component: digitalAlbum},
      {path: '/ticketing', component: ticketing}
    ]
  },
  {path: '/my-music', component: myMusic}
  // 客户端、音乐号和vip需要重定向
]

export default new Router({
  routes
})
