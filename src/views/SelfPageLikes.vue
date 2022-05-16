<template>
  <div class="wrap">
    <navigation />
    <div class="main">
      <userTitle :userName="user.name" :tweetNum="2"/>
      <userInfo :initial-user="user" v-if="isMe"/>
      <userInfoOther :initial-user="user" v-else/>
      <navTabs :userId="$route.params.id"/>
      <div class="tweet-wrap">
        <div class="tweet-card" v-for="like in likes" :key="like.id">
          <div class="tweet-avatar">
            <img src="../assets/images/avatar_default.png" alt="" />
          </div>
          <div class="tweet-content">
            <div class="tweet-name-group">
              <p class="tweet-name"><b>{{like.Tweet.User.name}}</b></p>
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
                <p class="fz14"><b>{{like.replyCount}}</b></p>
              </a>
              <a href="#" class="tweet-like">
                <div class="tweet-like-img">
                  <img src="../assets/images/tweet-like.png" alt="" />
                </div>
                <p class="fz14"><b>{{like.likeCount}}</b></p>
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

export default {
  name: "mainPageLikes",
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
      likes: [],
      isMe: true
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
    async fetchUserLikes(userId){
      try {
        const response = await userAPI.getUserLikes(userId)
        console.log('like res', response)
        this.likes = [...response.data.data.tweets]
        if(this.likes.length<1){
          Toast.fire({
            icon: 'info',
            title: '目前沒有喜歡的內容'
          })
        }
      } catch (error) {
        console.log('error', error)
      }
    },
    isThisMe(paramsId){
      this.isMe = this.currentUser.id == paramsId  
    }
  },
  computed: {
    ...mapState(['currentUser'])
  },
  created(){
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
    this.fetchUserLikes(userId)
    this.isThisMe(userId)
  },
  watch: {
    '$route.params.id': {
      handler: function(userId){
        this.fetchUser(userId)
        this.fetchTweets(userId)
        this.isThisMe(userId)
      },
      immediate: true,
    }
  },
  mixins: [fromNowFilter]
};
</script>

<style lang="css" src="@/assets/css/main.css" scoped></style>

