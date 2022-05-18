<template>
  <div class="wrap">
    <navigation :userId="currentUser.id"/>
    <div class="main">
      <userTitle :userName="user.name"/>
      <navTabsFollow :userId="$route.params.id"/>
      <div class="tweet-wrap">
        <div class="tweet-card" v-for="followship in followships" :key="followship.id">
          <div class="tweet-avatar">
            <img src="../assets/images/avatar_default.png" alt="" />
          </div>
          <div class="tweet-content">
            <div class="tweet-title">
              <div class="tweet-name-group">
                <p class="tweet-name"><b>{{followship.name}}</b></p>
                <div class="btn">正在跟隨</div>
              </div>
              
            </div>
            <div class="tweet-text">
              <p>
                {{followship.introduction}}
              </p>
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
import userTitle from "../components/userTitle.vue"
import navTabsFollow from "../components/navTabsFollow";

import { fromNowFilter } from './../utils/mixins'
import userAPI from './../apis/user'
import { mapState } from 'vuex'
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
  "followships": [
    {
      "User": {
        "id": 2,
        "name": "Apple",
        "avatar": "https://via.placeholder.com/300",
        "introduction": "I'm pretty."
      },
      "isFollowing": true
    },
    {
      "User": {
        "id": 3,
        "name": "Orange",
        "avatar": "https://via.placeholder.com/300",
        "introduction": "I'm pretty."
      },
      "isFollowing": true
    }
  ]
}
*/

export default {
  name: "selfPageFollowing",
  components: {
    navigation,
    followTop,
    userTitle,
    navTabsFollow
  },
  data() {
    return {
      user: {
        name:"",
        tweetNum: -1
      },
      followships: []
    };
  },
  methods: {
    async fetchUser(userId){
      try {
        const response = await userAPI.getUser(userId)
        //console.log('response in selfPage', response)
        const {id,account,name,email,role, introduction, avatar,cover,followingCount,followerCount,isFollowing,createdAt,updatedAt} = response.data.data.user
        this.user = {id,account,name,email,role, introduction, avatar,cover,followingCount,followerCount,isFollowing,createdAt,updatedAt}
        //console.log('user',this.user)
      } catch (error) {
        console.log('error', error)
      }
    },
    async fetchUserFollowing(userId){
      try {
        const response = await userAPI.getUserFollowings(userId)
        //console.log('following', response)
        this.followships = [...response.data.data.user]
      } catch (error) {
        console.log('error', error)
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
    this.fetchUserFollowing(userId)
    this.isThisMe(userId)
  },
  watch: {
    '$route.params.id': {
      handler: function(userId){
        this.fetchUser(userId)
        this.fetchUserFollowing(userId)
        this.isThisMe(userId)
      },
      immediate: true,
    }
  },
  mixins: [fromNowFilter]
};
</script>

<style lang="css" src="@/assets/css/main.css" scoped></style>

<style scoped>
.tweet-name-group {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.tweet-wrap{
  margin-top: 127px;
}
</style>
