<template>
  <div class="wrap">
    <navigation />
    <div class="main">
      <userTitle :userName="user.name" :tweetNum="tweets.length"/>
      <userInfo :user="user" v-if="isMe"/>
      <userInfoOther v-else/>
      <navTabs />
      <div class="tweet-wrap">
        <div class="tweet-card" v-for="tweet in tweets" :key="tweet.id">
          <div class="tweet-avatar">
            <img src="../assets/images/avatar_default.png" alt="" />
          </div>
          <div class="tweet-content">
            <div class="tweet-name-group">
              <p class="tweet-name"><b>{{user.name}}</b></p>
              <p class="tweet-account fz14">@{{user.account}}・{{tweet.createdAt | fromNow}}</p>
            </div>
            <div class="tweet-text">
              <p>
                {{tweet.description}}
              </p>
            </div>
            <div class="tweet-count">
              <a href="#" class="tweet-reply">
                <div class="tweet-reply-img">
                  <img src="../assets/images/tweet-reply.png" alt="" />
                </div>
                <p class="fz14"><b>{{tweet.replyCount}}</b></p>
              </a>
              <a href="#" class="tweet-like">
                <div class="tweet-like-img">
                  <img src="../assets/images/tweet-like.png" alt="" />
                </div>
                <p class="fz14"><b>{{tweet.likeCount}}</b></p>
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
import { fromNowFilter } from './../utils/mixins'

// 要得到使用者info、使用者自己的推文、推計追蹤者的資料
// 使用者info丟進去component，使用者自己的推文直接render
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

const dummyTweets = 
{
  "user": {
    "id": 1,
    "account": "user1",
    "name": "root",
    "avatar": "https://via.placeholder.com/300",
  },
  "tweets": [
    {
      "id": 2,
      "description": "yes, shekl kmsdfmld",
      "createdAt": "2022-04-29T09:50:34.000Z",
      "replyCount": 13,
      "likeCount": 76
    },
    {
      "id": 3,
      "description": "no, ndic kmsdfmld",
      "createdAt": "2022-05-31T09:50:34.000Z",
      "replyCount": 3,
      "likeCount": 2
    }
  ]
}

export default {
  name: "selfPage",
  components: {
    navigation,
    followTop,
    userInfo,
    userTitle,
    navTabs,
    userInfoOther,
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
      tweets: [],
      isMe: true,
      isClickPopupEditModal: false
    };
  },
  methods: {
    fetchUser(){
      const {id,account,name,email,role, introduction, avatar,cover,followingCount,followerCount,isFollowing,createdAt,updatedAt} = dummyUser
      this.user = {id,account,name,email,role, introduction, avatar,cover,followingCount,followerCount,isFollowing,createdAt,updatedAt}
    },
    fetchTweets(){
      this.tweets = [...dummyTweets.tweets]
    }
  },
  created(){
    this.fetchUser()
    this.fetchTweets()
  },
  mixins: [fromNowFilter]
};
</script>

<style lang="css" src="@/assets/css/main.css" scoped></style>

