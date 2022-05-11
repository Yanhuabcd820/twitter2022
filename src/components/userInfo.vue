<template>
  <div>
    <div class="user-title">
      <img src="../assets/images/LeftArrow.png" alt=""/>
      <div class="user-name">
        <h5>John Doe</h5>
        <p>25推文</p>
      </div>
    </div>
    <div class="user-block">
      <div class="user-cover">
        <img src="../assets/images/cover.png" alt="">
      </div>
      <div class="avatar-block">
        <div class="user-avatar">
          <img src="../assets/images/AvatarBigger.png" alt="">
        </div>
        <div class="user-edit">
          編輯個人資料
        </div>
      </div>
      <div class="user-info">
        <div class="user-account">
          <h5>John Doe</h5>
          <p class="fz14">@heyjohn</p>
        </div>
        <p class="user-des fz14">
          Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. 
        </p>
        <div class="user-follow">
          <p class="fz14">34個跟隨中</p>
          <p class="fz14">59位跟隨者</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .user-title img {
    width: 17px;
    height: 14px;
    margin-left: 28px;
    margin-right: 19px;
  }
  .user-title {
    display: flex;
    align-items: center;
    height: 75px;
  }
  .user-name {
    display: flex;
    flex-direction: column;
  }
  .user-name h5 {
    line-height: 26px;
  }
  .user-name p {
    line-height: 18.82px;
    color: var(--secondary-text-color);
  }
  .avatar-block {
    position: relative;
    display: flex;
    justify-content: end;
  }
  .user-avatar {
    width: 140px;
    position: absolute;
    top: -70px;
    left: 16px;
  }
  .user-edit {
    width: 128px;
    height: 40px;
    border: var(--main-color) 1px solid;
    color: var(--main-color);
    border-radius: 50px;
    margin-top: 16px;
    margin-right: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .user-info{
    margin-left: 16px;
    margin-top: 16px;
  }
  .user-account p {
    color: var(--secondary-text-color);
  }
  .user-follow {
    display: flex;
  }
  .user-follow p {
    margin-right: 20px;
  }
</style>