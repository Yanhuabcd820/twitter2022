<template>
  <div class="wrap">
    <navigation />
    <div class="main">
      <userTitle :userName="user.name" :tweetNum="2"/>
      <userInfo :user="user" v-if="isMe"/>
      <userInfoOther v-else/>
      <navTabs />
      <div class="tweet-wrap">
        <div class="tweet-card" v-for="like in likes" :key="like.tweet_id">
          <div class="tweet-avatar">
            <img src="../assets/images/avatar_default.png" alt="" />
          </div>
          <div class="tweet-content">
            <div class="tweet-name-group">
              <p class="tweet-name"><b>{{like.Tweet.User.account}}</b></p>
              <p class="tweet-account fz14">@{{like.Tweet.User.account}}・3 小時</p>
            </div>
            <div class="tweet-text">
              <p>
                {{like.Tweet.description}}
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
import userTitle from "../components/userTitle";
import navTabs from "../components/navTabs";

const dummyUser = {
  "id": 1,
  "account": "heyjohn",
  "name": "John Doe",
  "email": "root@example.com",
  "role": "admin",
  "introduction": "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.",
  "avatar": "../assets/images/AvatarBigger.png",
  "cover": "../assets/images/cover.png",
  "followingCount": 34,
  "followerCount": 59,
  "isFollowing": true,
  "createdAt": "2022-01-18T07:23:18.000Z",
  "updatedAt": "2022-01-18T07:23:18.000Z"
}

const dummyData = {
  "user": {
    "id": 1,
    "account": "user1",
    "name": "root",
    "avatar": "https://via.placeholder.com/300",
  },
  "likes": [
    {
      "tweet_id": 2,
      "Tweet": {
        "user_id": 2,
        "description": "I love you!",
        "User": {
          "account": "apple"
        }
      }
    },
    {
      "tweet_id": 3,
      "Tweet": {
        "user_id": 4,
        "description": "I like you!",
        "User": {
          "account": "orange"
        }
      }
    }
  ]
}

export default {
  name: "mainPageLikes",
  components: {
    navigation,
    followTop,
    userInfo,
    userTitle,
    navTabs
  },
  data() {
    return {
      user: {
        id: -1,
        account: "",
        name: "",
        email: "",
        role: "",
        introduction: "",
        avatar: "",
        cover: "",
        followingCount: -1,
        followerCount: -1,
        isFollowing: false,
        createdAt: "",
        updatedAt: ""
      },
      likes: [],
      isMe: true
    };
  },
  methods: {
    fetchData(){
      const {id,account,name,email,role, introduction, avatar,cover,followingCount,followerCount,isFollowing,createdAt,updatedAt} = dummyUser
      this.user = {id,account,name,email,role, introduction, avatar,cover,followingCount,followerCount,isFollowing,createdAt,updatedAt}
      this.likes = [...dummyData.likes]
    }
  },
  created(){
    this.fetchData()
  }
};
</script>

<style lang="css" src="@/assets/css/main.css" scoped></style>

