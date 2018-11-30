<template>
    <div>
      <div class="write-comment">
        <div>评论</div>
        <div>
          <label>
            <textarea placeholder="写下你的评论..."></textarea>
          </label>
        </div>
        <div class="submit">
          <img src="../../assets/face.svg">
          <button>发表评论</button>
        </div>
      </div>
      <div class="comment-display">
        <div class="ti">热门评论</div>
        <ul v-if="commentInfo.length > 0" class="c-d-ul">
          <li v-for="i in commentInfo" :key="i.id">
            <div class="c-d-avatar">
              <img :src="i.user.avatarUrl">
            </div>
            <div class="c-d-info">
              <p>{{i.user.nickname}}</p>
              <p>{{i.content}}</p>
              <div class="c-d-footer">
                <div class="c-d-time">
                  {{printTime(i.time)}}
                </div>
                <div class="c-d-operations">
                  <div>
                    <img src="../../assets/like.svg">
                    <span>({{i.likedCount}})</span>
                  </div>
                  <div><img src="../../assets/reply.svg"></div>
                </div>
              </div>
            </div>
          </li>
        </ul>
        <ul v-else class="c-d-ul" style="font-size: 14px;color: #999">暂无评论,快来发表吧</ul>
      </div>
    </div>
</template>

<script>
/* eslint semi: "error" */
export default {
  name: 'comment-el',
  props: ['commentInfo'],
  methods: {
    printTime (a) {
      let t = new Date(a);
      let year = t.getFullYear();
      let month = t.getMonth() + 1;
      let day = t.getDate();
      let hour = t.getHours();
      let minute = t.getMinutes();
      return year + '年' + month + '月' + day + '日' + ' ' + hour + ':' + minute;
    }
  }
};
</script>

<style type="text/css">
  .write-comment div:nth-of-type(1) {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 20px;
  }
  .write-comment textarea {
    outline: none;
    width: 600px;
    height: 120px;
    padding: 10px;
    resize: none;
    font-size: 14px;
    background-color: rgba(0,30,0,0.03);
  }
  .submit img {
    width: 24px;
    height: 24px;
    vertical-align: middle;
    margin-right: 6px;
  }
  .submit button {
    padding: 2px 6px;
    color: #fff;
    background-color: #40c672;
    cursor: pointer;
    border-radius: 1px;
    border: 1px solid #40c672;
  }
  .submit {
    width: 622px;
    text-align: right;
    margin-top: 6px;
  }
  .comment-display .ti {
    font-size: 18px;
    font-weight: bold;
    padding-bottom: 12px;
    margin-bottom: 20px;
    margin-top: 20px;
    border-bottom: 1px solid #ddd;
    width: 622px;
  }
  .c-d-ul {
    list-style: none;
    padding: 0;
  }
  .c-d-ul li {
    display: flex;
    flex-direction: row;
    width: 622px;
    border-bottom: 1px solid #ddd;
    margin-bottom: 20px;
    padding-bottom: 20px;
    position: relative;
  }
  .c-d-avatar {
    width: 48px;
    height: 48px;
    border-radius: 24px;
    overflow: hidden;
    margin-right: 16px;
  }
  .c-d-avatar img {
    width: 48px;
  }
  .c-d-info p {
    margin: 0;
    font-size: 14px;
    max-width: 560px;
  }
  .c-d-info p:nth-of-type(1){
    color: #999;
    margin-bottom: 10px;
  }
  .c-d-footer {
    margin-top: 22px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .c-d-time,.c-d-operations{
    color: #999;
    font-size: 14px;
  }
  .c-d-operations img{
    width: 20px;
    height: 20px;
    vertical-align: middle;
  }
  .c-d-operations {
    display: flex;
    flex-direction: row;
    width: 120px;
    justify-content: space-between;
    position: absolute;
    bottom: 20px;
    right: 0;
  }
</style>
