<template>
  <div class="wrap">
    <navigation />
    <div class="main">
      <userTitle :userName="user.name" :tweetNum="2"/>
      <userInfo :user="user" v-if="isMe"/>
      <userInfoOther v-else/>
      <navTabs />
      <div class="tweet-wrap">
        <div class="tweet-card" v-for="reply in replies" :key="reply.id">
          <div class="tweet-avatar">
            <img src="../assets/images/avatar_default.png" alt="" />
          </div>
          <div class="tweet-content">
            <div class="tweet-name-group">
              <p class="tweet-name"><b>Apple</b></p>
              <p class="tweet-account fz14">@apple・3 小時</p>
            </div>
            <div class="tweet-text">
              <p>
                Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis
                ullamco fdfsdfscillum dolor. Voluptate exercitation incididunt
                aliquip deserunt reprehenderit elit laborum.
              </p>
            </div>
            <div class="tweet-count">
              <a href="#" class="tweet-reply">
                <div class="tweet-reply-img">
                  <img src="../assets/images/tweet-reply.png" alt="" />
                </div>
                <p class="fz14"><b>13</b></p>
              </a>
              <a href="#" class="tweet-like">
                <div class="tweet-like-img">
                  <img src="../assets/images/tweet-like.png" alt="" />
                </div>
                <p class="fz14"><b>76</b></p>
              </a>
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
import userInfo from "../components/userInfo";
import userInfoOther from "../components/userInfoOther";
import userTitle from "../components/userTitle";
import navTabs from "../components/navTabs";


const dummyData = {
  "user": {
    "id": 1,
    "account": "user1",
    "name": "root",
    "avatar": "https://via.placeholder.com/300",
  },
  "replies": [
    {
      "user_id": 2,
      "comment": "yes, shekl kmsdfmld",
      "createdAt": "2022-04-29T09:50:34.000Z",
      "User": {
        "account": "apple"
      }
    },
    {
      "id": 3,
      "description": "no, ndic kmsdfmld",
      "createdAt": "2022-05-31T09:50:34.000Z",
      "User": {
        "account": "Linda"
      }
    }
  ]
}


export default {
  name: "mainPage",
  components: {
    navigation,
    followTop,
    userInfo,
    userTitle,
    navTabs,
    userInfoOther
  },
  data() {
    return {
      user: {
        "id": -1,
        "account": "",
        "name": "",
        "avatar": "",
      },
      replies: [],
      isMe: true
    };
  },
  methods: {
    fetchData(){
      const {id,account,name,avatar} = dummyData.user;
      this.user = {id,account,name,avatar}
      this.replies = [...dummyData.replies]
    }
  },
  created(){
    this.fetchData()
  }
};
</script>

<style lang="css" src="@/assets/css/main.css" scoped></style>

