<template>
  <div class="wrap">
    <navigation :userId="currentUser.id"/>
    <div class="main">
      <userTitle :userName="user.name" :tweetNum="user.tweetsCount" />
      <navTabsFollow :userId="Number($route.params.id)"/>
      <div class="tweet-wrap">
        <div class="tweet-card" v-for="followship in followships" :key="followship.id">
          <div class="tweet-avatar">
            <img :src="followship.followingUser.avatar | emptyAvatar" alt="" />
          </div>
          <div class="tweet-content">
            <div class="tweet-title">
              <div class="tweet-name-group">
                <p class="tweet-name"><b>{{followship.followingUser.name}}</b></p>
                <div class="btn active" v-if="followship.isFollowed" @click.prevent.stop="unFollow(followship.followingId)">正在跟隨</div>
                <div class="btn" v-else @click.prevent.stop="addFollow(followship.followingId)">跟隨</div>
              </div>
              
            </div>
            <div class="tweet-text">
              <p>
                {{followship.followingUser.introduction}}
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
    <followTopTypeB :key="componentKey" @addFollow-From-followTop="addFollowFromfollowTop" @unFollow-From-followTop="unFollowFromfollowTop"/>
  </div>
</template>
<script>
import navigation from "../components/nav";
import followTopTypeB from "../components/followTopTypeB";
import userTitle from "../components/userTitle.vue"
import navTabsFollow from "../components/navTabsFollow";

import { fromNowFilter, emptyImageFilter } from './../utils/mixins'
import userAPI from './../apis/user'
import { mapState } from 'vuex'
import { Toast } from './../utils/helpers'
import followshipApi from "./../apis/followship";


export default {
  name: "selfPageFollowing",
  components: {
    navigation,
    followTopTypeB,
    userTitle,
    navTabsFollow
  },
  data() {
    return {
      user: {
        name:"",
        tweetNum: -1
      },
      followships: [],
      componentKey: 0
    };
  },
  methods: {
    async fetchUser(userId){
      try {
        const response = await userAPI.getUser(userId)
        //console.log('response in selfPage', response)
        const {
          id,
          account,
          name,
          email,
          role,
          introduction,
          avatar,
          cover,
          followingCount,
          followerCount,
          isFollowing,
          tweetsCount
        } = response.data;
        this.user = {id,account,name,email,role, introduction, avatar,cover,followingCount,followerCount,isFollowing,tweetsCount}
      } catch (error) {
        console.log('error', error)
      }
    },
    async fetchUserFollowing(userId){
      try {
        const response = await userAPI.getUserFollowings(userId)
        //console.log('following', response)
        this.followships = [...response.data]
        console.log('this following',this.followships )
        if(this.followships.length<1){
          Toast.fire({
            icon: "info",
            title: "這個人沒有追蹤任何人",
          });
        }
      } catch (error) {
        console.log('error', error)
      }
    },
    isThisMe(paramsId){
      this.isMe = this.currentUser.id == paramsId   // 驗證是不是我
    },
    async addFollow(id) {
      try {
        console.log(id)
        await followshipApi.addFollow({ id });
        this.followships=this.followships.map(user=>{
          if(user.followingId === id){
            return {
              ...user,
              isFollowed: true
            }
          }
          return user
        })
        this.forceRenderFollowTop()
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法follow此人，請稍後再試",
        });
      }
    },
    async unFollow(followingId) {
      try {
        console.log(followingId)
        await followshipApi.unFollow({ followingId });
        this.followships=this.followships.map(user=>{
          if(user.followingId === followingId){
            return {
              ...user,
              isFollowed: false
            }
          }
          return user
        })
        this.forceRenderFollowTop()
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法unFollow此人，請稍後再試",
        });
      }
    },
    forceRenderFollowTop(){
      this.componentKey += 1;
    },
    addFollowFromfollowTop(payload){
      console.log(payload.id) // 拿到這物件的id

      // 1 先判斷這個頁面是不是自己的，如果不是
      if (this.user.id === this.currentUser.id){
      // 如果是自己的頁面，就新增一張卡片
        this.followships.push({
          id: payload.id,
          name: payload.name,
          account: payload.account,
          avatar: payload.avatar,
          isFollowed: true
        })
      } else {

        const found = this.followships.find(user => user.id===payload.id)

        if(found){
          // 1-1 找這個id在不在清單中，如果在，就切換按鈕即可
          this.followships = this.followships.map(user => {
            if (user.followingId === payload.id){
              console.log('user',user)
              return {
                ...user,
                isFollowed: true
              }
            }
            return user
          })
        } 

      // 1-2 如果不在，就不用管他

      }
      this.followships = this.followships.map(user => {
        if (user.followingId === payload.id){
          console.log('user',user)
          return {
            ...user,
            isFollowed: true
          }
        }
        return user
      })
    },
    unFollowFromfollowTop(payload){
      console.log(payload)
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
  mixins: [fromNowFilter,emptyImageFilter]
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
