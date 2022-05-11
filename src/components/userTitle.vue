<template>
  <div class="user-title">
    <img src="../assets/images/LeftArrow.png" alt=""/>
    <div class="user-name">
      <h5>John Doe</h5>
      <p>25推文</p>
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
  .user-title img:hover {
    cursor: pointer;
  }
  .user-title {
    display: flex;
    align-items: center;
    height: 75px;
  }
</style>