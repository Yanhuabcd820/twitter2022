<template>
  <div class="wrap">
    <popupReply v-if="isClickPopupReply" @close-PopupReply="closePopupReply" />

    <popupReplyList
      v-if="isClickPopupReplyList"
      @close-PopupReplyList="closePopupReplyList"
    />
    <navigation />
    <div class="reply-wrap">
      <router-link to="/mainPage" class="reply-title">
        <div class="reply-forward">
          <img src="../assets/images/forward.png" alt="" />
        </div>
        <h4>推文</h4>
      </router-link>
      <div class="reply">
        <div class="reply-inner">
          <div class="reply-user">
            <div class="reply-avatar">
              <img src="../assets/images/avatar_default.png" alt="" />
            </div>
            <div class="reply-name-group">
              <p class="reply-name"><b>Apple</b></p>
              <p class="reply-account fz14">@apple・3 小時</p>
            </div>
          </div>
          <div class="reply-text">
            Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco
            cillum dolor. Voluptate exercitation incididunt aliquip deserunt.
          </div>
          <p class="fz14 reply-time">上午 10:05・2021年11月10日</p>
        </div>
        <div class="reply-count">
          <div class="reply-num"><span>34</span> 回覆</div>
          <div class="like-num"><span>808</span> 喜歡次數</div>
        </div>
        <div class="reply-count-btn">
          <div class="reply-btn" @click.prevent.stop="openPopupReply">
            <img src="../assets/images/tweet-reply.png" alt="" />
          </div>
          <div class="like-btn">
            <img src="../assets/images/tweet-like.png" alt="" />
          </div>
        </div>
      </div>
      <div class="reply-tweet-wrap">
        <div class="reply-tweet-card">
          <div class="reply-tweet-avatar">
            <img src="../assets/images/avatar_default.png" alt="" />
          </div>
          <div class="reply-tweet-content">
            <div class="reply-tweet-name-group">
              <p class="reply-tweet-name">
                <b>Devon Lane</b>
                <span>@devon_lane・12 小時</span>
              </p>
              <p class="reply-to fz14"><span>回覆</span> @apple</p>
            </div>
            <div class="reply-tweet-text">
              <p>
                111former apple engineer shares a simple DIY fix to seal your
                surgical mask
              </p>
            </div>
            <div class="reply-tweet-count">
              <div
                class="reply-tweet-reply"
                @click.prevent.stop="openPopupReplyList"
              >
                <div class="reply-tweet-reply-img">
                  <img src="../assets/images/tweet-reply.png" alt="" />
                </div>
                <p class="fz14"><b>13</b></p>
              </div>
              <div class="reply-tweet-like">
                <div class="reply-tweet-like-img">
                  <img src="../assets/images/tweet-like.png" alt="" />
                </div>
                <p class="fz14"><b>76</b></p>
              </div>
            </div>
          </div>
        </div>
        <div class="reply-tweet-card">
          <div class="reply-tweet-avatar">
            <img src="../assets/images/avatar_default.png" alt="" />
          </div>
          <div class="reply-tweet-content">
            <div class="reply-tweet-name-group">
              <p class="reply-tweet-name">
                <b>Devon Lane</b>
                <span>@devon_lane・12 小時</span>
              </p>
              <p class="reply-to fz14"><span>回覆</span> @apple</p>
            </div>
            <div class="reply-tweet-text">
              <p>
                former apple engineer shares a simple DIY fix to seal your
                surgical mask
              </p>
            </div>
            <div class="reply-tweet-count">
              <div class="reply-tweet-reply">
                <div class="reply-tweet-reply-img">
                  <img src="../assets/images/tweet-reply.png" alt="" />
                </div>
                <p class="fz14"><b>13</b></p>
              </div>
              <div class="reply-tweet-like">
                <div class="reply-tweet-like-img">
                  <img src="../assets/images/tweet-like.png" alt="" />
                </div>
                <p class="fz14"><b>76</b></p>
              </div>
            </div>
          </div>
        </div>
        <div class="reply-tweet-card">
          <div class="reply-tweet-avatar">
            <img src="../assets/images/avatar_default.png" alt="" />
          </div>
          <div class="reply-tweet-content">
            <div class="reply-tweet-name-group">
              <p class="reply-tweet-name">
                <b>Devon Lane</b>
                <span>@devon_lane・12 小時</span>
              </p>
              <p class="reply-to fz14"><span>回覆</span> @apple</p>
            </div>
            <div class="reply-tweet-text">
              <p>
                former apple engineer shares a simple DIY fix to seal your
                surgical mask
              </p>
            </div>
            <div class="reply-tweet-count">
              <div class="reply-tweet-reply">
                <div class="reply-tweet-reply-img">
                  <img src="../assets/images/tweet-reply.png" alt="" />
                </div>
                <p class="fz14"><b>13</b></p>
              </div>
              <div class="reply-tweet-like">
                <div class="reply-tweet-like-img">
                  <img src="../assets/images/tweet-like.png" alt="" />
                </div>
                <p class="fz14"><b>76</b></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <followTop />
  </div>
</template>
<script>
import navigation from "../components/nav";
import followTop from "../components/followTop";
import popupReply from "../components/popupReply";
import popupReplyList from "../components/popupReplyList";
export default {
  name: "replyPage",
  components: {
    navigation,
    followTop,
    popupReply,
    popupReplyList,
  },
  data() {
    return {
      isClickPopupReply: false,
      isClickPopupReplyList: false,
    };
  },
  methods: {
    openPopupReply() {
      console.log(this.isClickPopupReply);
      this.isClickPopupReply = true;
    },
    openPopupReplyList() {
      console.log(this.isClickPopupReplyList);
      this.isClickPopupReplyList = true;
    },
    closePopupReply(payload) {
      const { isClickPopupReply } = payload;
      this.isClickPopupReply = isClickPopupReply;
      console.log("closePopupReply", this.isClickPopupReply);
    },
    closePopupReplyList(payload) {
      const { isClickPopupReplyList } = payload;
      this.isClickPopupReplyList = isClickPopupReplyList;
      console.log("closePopupReplyList", this.isClickPopupReplyList);
    },
  },
};
</script>

<style lang="css" src="@/assets/css/reply.css" scoped></style>