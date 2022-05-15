<template>
  <div class="wrap">
    <navigation />
    <div class="main">
      <userTitle :userName="user.name" :tweetNum="tweets.length"/>
      <userInfo :initial-user="user" v-if="isMe"/>
      <userInfoOther :initial-user="user" v-else/>
      <navTabs :userId="$route.params.id"/>
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
import userAPI from './../apis/user'
import { mapState } from 'vuex'
import { Toast } from './../utils/helpers'
// 要得到使用者info、使用者自己的推文、推計追蹤者的資料
// 使用者info丟進去component，使用者自己的推文直接render
/*
const dummyUser = {
  "id": 1,
  "account": "heyjohn",
  "name": "John Doe",
  "email": "root@example.com",
  "role": "admin",
  "introduction": "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.",
  "avatar": "https://cdn.hk01.com/di/media/images/dw/20200804/367368833650003968.jpeg/WZNYUVhEOnTmxwVbLcUyZLqMQJKiBeb8nWt9dZ1rfXU?v=w1920",
  "cover": "https://scontent.frmq2-2.fna.fbcdn.net/v/t31.18172-8/21752675_1819087734773580_6613367383358618796_o.jpg?_nc_cat=104&ccb=1-6&_nc_sid=19026a&_nc_ohc=i9AuuAiYA3AAX-J3HnU&_nc_ht=scontent.frmq2-2.fna&oh=00_AT-Cz6zvSyiHcugn54znkPIhWKWYKa1Wzxa0bCXjVR5zfQ&oe=62A46C73",
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
*/

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
        avatar: "https://dummyimage.com/600x400/a1a1a1/fff.jpg&text=+",
        cover: "https://dummyimage.com/600x400/a1a1a1/fff.jpg&text=+",
        followingCount: -1,
        followerCount: -1,
        isFollowing: false,
        createdAt: "",
        updatedAt: ""
      },
      tweets: [],
      isMe: true,
      isClickPopupEditModal: false,
    };
  },
  methods: {
    async fetchUser(userId){
      try {
        const response = await userAPI.getUser(userId)
        //console.log('response in selfPage', response)
        // dummyUser 對應 response.data.user
        const {id,account,name,email,role, introduction, avatar,cover,followingCount,followerCount,isFollowing,createdAt,updatedAt} = response.data.data.user
        this.user = {id,account,name,email,role, introduction, avatar,cover,followingCount,followerCount,isFollowing,createdAt,updatedAt}
        //console.log('user',this.user)
      } catch (error) {
        console.log('error', error)
      }
    },
    async fetchTweets(userId){
      try {
        const response = await userAPI.getUserTweets(userId)
        //console.log('fetch tweets response', response)
        this.tweets = [...response.data.data.tweets]
      } catch (error) {
        console.log('error', error)
      }
    },
    //fetchTweets(){
    //  this.tweets = [...dummyTweets.tweets]
    //},
    isThisMe(paramsId){
      //console.log('params', paramsId)
      //console.log('vuex',this.currentUser.id)
      //console.log(this.isMe)
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
    this.fetchTweets(userId)
    this.isThisMe(userId)
  },
  mixins: [fromNowFilter]
};
</script>

<style lang="css" src="@/assets/css/main.css" scoped></style>

