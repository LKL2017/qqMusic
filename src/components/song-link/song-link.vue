<template>
    <div>
      <img :src="info.img1v1Url" >
    </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'song-link',
  data () {
    return {
      info: null
    }
  },
  beforeMount () {
    axios
      .get(this.COMMON.reqBaseUrl + '/comment/music?id=186016&limit=1')
      .then(response => (this.info = response))
  }
}
</script>

<style type="text/css">

</style>
