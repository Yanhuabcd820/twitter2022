<template>
  <div class="wrap">
    <navigation />
    <div class="main">
      <userTitle :userName="user.name" :tweetNum="2"/>
      <userInfo :initial-user="user" v-if="isMe"/>
      <userInfoOther :initial-user="user" v-else/>
      <navTabs :userId="$route.params.id"/>
      <div class="tweet-wrap">
        <div class="tweet-card" v-for="reply in replies" :key="reply.id">
          <div class="tweet-avatar">
            <img src="../assets/images/avatar_default.png" alt="" />
          </div>
          <div class="tweet-content">
            <div class="tweet-name-group">
              <p class="tweet-name"><b>{{user.name}}</b></p>
              <p class="tweet-account fz14">@{{user.account}}・{{reply.createdAt | fromNow}}</p>
            </div>
            <div class="tweet-text">
              <p>
                {{reply.comment}}
              </p>
            </div>
            <!--
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
            -->

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
import userAPI from './../apis/user'
import { mapState } from 'vuex'
import { fromNowFilter } from './../utils/mixins'
import { Toast } from './../utils/helpers'

/*
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
*/

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
        id: -1,
        account: "",
        name: "",
        role: "",
        introduction: "",
        avatar: "https://dummyimage.com/600x400/a1a1a1/fff.jpg&text=+",
        cover: "https://dummyimage.com/600x400/a1a1a1/fff.jpg&text=+",
        followingCount: -1,
        followerCount: -1,
        isFollowing: false,
      },
      replies: [],
      isMe: true
    };
  },
  methods: {
    async fetchUser(userId){
      try {
        const response = await userAPI.getUser(userId)
        const {id,account,name,email,role, introduction, avatar,cover,followingCount,followerCount,isFollowing,createdAt,updatedAt} = response.data.data.user
        this.user = {id,account,name,email,role, introduction, avatar,cover,followingCount,followerCount,isFollowing,createdAt,updatedAt}
      } catch (error) {
        console.log('error', error)
      }
    },    
    async fetchUserReplies(userId){
      try {
        const response = await userAPI.getUserReplies(userId)
        //console.log(response)
        this.replies = [...response.data.data.replies]
        if(this.replies.length<1){
          Toast.fire({
            icon: 'info',
            title: '目前沒有回覆的內容'
          })
        }
      } catch (error) {
        console.log(error)
      }
    },
    isThisMe(paramsId){
      this.isMe = this.currentUser.id == paramsId   // 驗證是不是我
    }
  },
  computed: {
    ...mapState(['currentUser'])
  },
  created(){
    // 用token取得資料，取得後看role，是user或是admin，如果不是use，就跳出提醒，回到登入頁
    const twitterToken = localStorage.getItem('token')
    //console.log(twitterToken)
    if (!twitterToken){
      Toast.fire({
        icon: 'warning',
        title: '請登入'
      })
      this.$router.push("/login");
    }
    const { id: userId } = this.$route.params
    this.fetchUser(userId)
    this.fetchUserReplies(userId)
    this.isThisMe(userId)  
  },
  mixins: [fromNowFilter]
};
</script>

<style lang="css" src="@/assets/css/main.css" scoped></style>

