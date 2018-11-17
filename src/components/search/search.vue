<template>
    <div id="nav-search">
      <input type="text" placeholder="搜索音乐、mv、歌单、用户">
    </div>
</template>

<script>
export default {
  name: 'search'
}
</script>

<style type="text/css">
  #nav-search{
    /*bad*/
    line-height: 54px;
  }
  #nav-search input{
    min-width: 180px;
  }
</style>
