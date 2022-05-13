<template>
  <div class="popupReply-wrap">
    <div class="overlay" @click.stop.prevent="closePopupReplyList"></div>
    <div class="popupReply">
      <div class="popupReply-colse">
        <div
          class="popupReply-colse-img"
          @click.stop.prevent="closePopupReplyList"
        >
          <img src="../assets/images/pop-up-cancle.png" alt="" />
        </div>
      </div>
      <div class="popupReply-text-wrap">
        <div class="popupReply-user">
          <div class="popupReply-avatar">
            <img src="../assets/images/avatar_default.png" alt="" />
          </div>
          <div class="popupReply-content">
            <div class="popupReply-name-group">
              <p class="popupReply-name"><b>Apple</b></p>
              <p class="popupReply-account fz14">@apple・3 小時</p>
            </div>
            <div class="popupReply-text">
              <p>
                Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis
                ullamco fdfsdfscillum dolor. Voluptate exercitation incididunt
                aliquip deserunt reprehenderit elit laborum.
              </p>

              <p class="reply-to fz14"><span>回覆</span> @apple</p>
            </div>
          </div>
        </div>
        <div class="popupReply-again-inner">
          <div class="popupReply-again-avatar">
            <img src="../assets/images/avatar.png" alt="" />
          </div>
          <textarea
            name=""
            id=""
            maxlength="80"
            placeholder="推你的回覆"
            v-model="popupText"
          ></textarea>
        </div>
        <div class="popupReply-btn-wrap">
          <div class="post-text-num-warning" v-if="popupText.length >= 80">
            字數不可超過 80 字
          </div>
          <div class="btn popupReply-btn active">推文</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "popupReplyList",
  data() {
    return {
      popupText: "",
    };
  },
  methods: {
    closePopupReplyList() {
      this.$emit("close-PopupReplyList", {
        isClickPopupReplyList: false,
      });
    },
  },
};
</script>


<style lang="css" src="@/assets/css/popupReply.css" scoped></style>