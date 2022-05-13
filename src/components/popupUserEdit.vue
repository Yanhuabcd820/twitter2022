<template>
  <div class="popupTweet-wrap">
    <div class="overlay" @click.stop.prevent="closePopupTweet"></div>
    <div class="popupTweet">
      <div class="header">
        <div class="popupTweet-colse">
          <div class="popupTweet-colse-img" @click.stop.prevent="closePopupTweet">
            <img src="../assets/images/pop-up-cancle.png" alt="" />
          </div>
        </div>
        <h5>編輯個人資料</h5>
        <div class="header-btn btn">儲存</div>  
      </div>

      <div class="popupTweet-cover">
        <img src="../assets/images/cover.png" alt="" />
        <div class="cover-edit">
          <div class="cover-edit-tool">
            <img src="../assets/images/cover-edit.png" alt="" />
          </div>
          <div class="cover-edit-tool">
            <img src="../assets/images/cover-cross.png" alt="" />
          </div>
        </div>
      </div>
      <div class="avatar-block">
        <div>
          <div class="avatar">
            <img src="../assets/images/AvatarBigger.png" alt="" />
            <div class="avatar-edit">
              <img src="../assets/images/cover-edit.png" alt="" />
            </div>
          </div>
        </div>
      </div>
      <div class="popupTweet-text-wrap">
        <div class="form-label-group">
          <label for="name">名稱</label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="請輸入帳號"
            required
            autofocus
            v-model="name"
          >
          <div style="text-align:right">8/50</div>
        </div>
        <div class="form-label-group" style="height:147px">
          <label for="introduction">自我介紹</label>
          <!--
          <input
            id="introduction"
            name="introduction"
            type="text"
            placeholder="請輸入帳號"
            required
            autofocus
            v-model="introduction"
          >
          -->
          <div class="textarea" contenteditable="true" placeholder="請輸入" id="introduction"
            name="introduction">{{test}}</div>
          <div class="length">8/50</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "popupTweet",
  data() {
    return {
      popupText: "",
      test:'ffff'
    };
  },
  methods: {
    closePopupTweet() {
      this.$emit("close-PopupTweet", {
        isClickPopupTweet: false,
      });
    },
  },
};
</script>


<style lang="css" src="@/assets/css/popupTweet.css" scoped></style>

<style scoped>
  .header {
    display: flex;
    align-items: center;
    position: relative;
  }
  .header-btn {
    height: 40px;
    position: absolute;
    right: 16px;
    color: white;
    background-color: var(--main-color);
  }
  .popupTweet {
    height: 610px;
  }
  .popupTweet-cover {
    position: relative;
  }
  .cover-edit {
    position: absolute;
    top: 50%;
    left: 50%;
    display: flex;
    transform: translate(-50%,-50%);
    justify-content: space-around;
    width: 80px;
  }
  .cover-edit-tool {
    width: 24px;
    height: 24px;
  }
  .avatar {
    width: 140px;
    height: 140px;
    position: relative;
  }
  .avatar-edit {
    width: 24px;
    height: 24px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
  }
  .avatar-block {
    position: relative;
    margin-left: 16px;
  }
  .avatar-block>div{
    position: absolute;
    transform: translateY(-50%);
  }
  .popupTweet-text-wrap {
    margin-top: 80px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .form-label-group {
    display: flex;
    flex-direction: column;
    width: 602px;
    background-color: #F5F8FA;
    border-bottom: 2px #657786 solid;
    padding: 2px 10.55px;
    margin-bottom: 32px;
    box-sizing: border-box;
    position: relative;
  }

  label {
    font-size: 14px;
    line-height: 22px;
    color: #696974;
  }

  input {
    font-size: 16px;
    line-height: 26px;
    border: 0;
    background-color: #F5F8FA;
    outline: none;
  }
  .length{
    position: absolute;
    top: 100%;
    right:0;
  }
  .textarea {
    height: 100px;
    width: 300px;
    padding: 4px;
    border: 0;
    overflow: auto;
    outline: none;
  }
</style>