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
        <div class="header-btn btn" @click.stop.prevent="handleSubmit">儲存</div>  
      </div>
      <div class="popupTweet-cover">
        <img :src="user.cover" alt=""/>
        <div class="cover-grayLayer"></div>
        <div class="cover-edit">
          <div class="cover-edit-tool">
            <label>
              <input type="file" accept="image/*"  style="display:none" @change="handleCoverChange">
              <img src="../assets/images/cover-edit.png"> 
            </label>
          </div>
          <div class="cover-edit-tool" @click="clearCover">
            <img src="../assets/images/cover-cross.png" alt="" />
          </div>
        </div>
      </div>
      <div class="avatar-block">
        <div>
          <div class="avatar">
            <div class="avatar-grayLayer"></div>
            <img :src="user.avatar" alt="" />
            <label class="avatar-edit">
              <input type="file" accept="image/*"  style="display:none" @change="handleAvatarChange">
              <img src="../assets/images/cover-edit.png" alt="" >/>
            </label>
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
            v-model="user.name"
          >
          <div class="length">{{user.name.length}}/50</div>
        </div>
        <div class="form-label-group" style="height:147px">
          <label for="introduction">自我介紹</label>
          <div class="textarea" contenteditable="true" id="introduction"
            name="introduction" @keydown="updateIntro">{{user.introduction}}</div>
          <div class="length">{{temp.length}}/160</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "popupUserEdit",
  props: {
    initialUser: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      user : {
        avatar: this.initialUser.avatar,
        cover: this.initialUser.cover,
        name: this.initialUser.name,
        introduction: this.initialUser.introduction
      },
      temp: this.initialUser.introduction
    };
  },
  methods: {
    closePopupTweet() {
      this.$emit("close-PopupTweet", {
        isClickPopupTweet: false,
      });
    },
    updateIntro(){
      let text = document.querySelector('#introduction').textContent;
      this.temp = text
    },
    handleCoverChange (e) {
      const files = e.target.files
      console.log('files', files)
      if (files.length === 0) {
        // 使用者沒有選擇上傳的檔案
        return
      } else {
        // 否則產生預覽圖
        const imageURL = window.URL.createObjectURL(files[0])
        this.user.cover = imageURL
      }
    },
    handleAvatarChange (e) {
      const files = e.target.files
      console.log('files', files)
      if (files.length === 0) {
        // 使用者沒有選擇上傳的檔案
        return
      } else {
        // 否則產生預覽圖
        const imageURL = window.URL.createObjectURL(files[0])
        this.user.avatar = imageURL
      }
    },
    handleSubmit(){
      this.$emit('after-edit-info', {
        avatar: this.user.avatar,
        cover: this.user.cover
      })
      console.log(this.avatar,this.cover)
      this.$emit("close-PopupTweet", {
        isClickPopupTweet: false,
      }) 
    },
    clearCover(){
      this.user.cover = "https://dummyimage.com/600x400/000/fff.jpg&text=++"
    }
  }
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
  .popupTweet-cover>img {
    object-fit: cover;
    object-position: initial;
    height: 200px;
  }
  .cover-grayLayer{
    position: absolute;
    height: 200px;
    width: 100%;
    top: 0;
    left: 0;
    background-color: #171725;
    opacity: 0.5;
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
  .cover-edit-tool img{
    width: 24px;
    height: 24px;
    cursor: pointer;
  }
  .avatar {
    width: 140px;
    height: 140px;
    position: relative;
  }
  .avatar>img{
    width: 140px;
    height: 140px;
    border-radius: 50%;
    object-fit: cover;
    object-position: initial;
  }
  .avatar-grayLayer{
    width: 136px;
    height: 136px;  
    background-color: #171725;
    opacity: 0.5;
    position:absolute;
    border-radius: 50%;
    border: white 3px solid;
    box-sizing:border-box;
    left: 2px;
    top: 1px;
  }
  .avatar-edit {
    width: 24px;
    height: 24px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    cursor: pointer;
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
    font-size: 12px;
    color: #696974;
  }
  .textarea {
    height: 100%;
    width: 100%;
    padding: 4px;
    border: 0;
    overflow: auto;
    outline: none;
  }
</style>