<template>
  <div class="my-footer">
    <div class="download">
      <p>下载QQ音乐客户端</p>
      <ul>
        <li>
          <img src="../../assets/windows.svg">
          <p>PC版</p>
        </li>
        <li>
          <img src="../../assets/mac.svg">
          <p>Mac版</p>
        </li>
        <li>
          <img src="../../assets/android.svg">
          <p>Android版</p>
        </li>
        <li>
          <img src="../../assets/ios.svg">
          <p>iPhone版</p>
        </li>
      </ul>
    </div>
    <div class="products">
      <p>特色产品</p>
      <ul>
        <li>全民K歌</li>
        <li>Super Sound</li>
        <li>QPlay</li>
        <li>车载互联</li>
        <li>QQ演出</li>
      </ul>
    </div>
    <div class="link">
      <p>合作链接</p>
      <ul>
        <li>CJENM</li>
        <li>腾讯视频</li>
        <li>手机QQ空间</li>
        <li>最新版QQ</li>
        <li>腾讯社交广告</li>
        <li>电脑管家</li>
        <li>QQ浏览器</li>
        <li>腾讯微云</li>
        <li>腾讯云</li>
        <li>企鹅FM</li>
        <li>智能电视网</li>
        <li>当贝市场</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'my-footer'
}
</script>

<style type="text/css">
  .my-footer {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    color: #a5a5a5;
    margin-top: 60px;
    min-width: 900px;
  }
  /*.my-footer::after {*/
    /*display: block;*/
    /*content: '';*/
    /*clear: both;*/
  /*}*/
  .download,.products,.link {
    /*float: left;*/
    width: calc(100%/3);
    background-color: #404140;
    padding-top: 28px;
  }
  .download p:nth-of-type(1),.products p:nth-of-type(1),.link p:nth-of-type(1){
    margin-bottom: 60px;
  }
  .download ul ,.products ul,.link ul{
    list-style: none;
    display: flex;
    flex-wrap: wrap;
  }
  .download ul li {
    width: 25%;
  }
  .products ul li, .link ul li{
    width: calc(100%/3);
    margin-bottom: 6px;
  }
  .download ul li img {
    width: 40px;
  }
  /*.download ul li p {*/
    /**/
  /*}*/
  .download ul li:hover,.products ul li:hover,.link ul li:hover{
    cursor: pointer;
    color: #40c672;
  }
</style>
