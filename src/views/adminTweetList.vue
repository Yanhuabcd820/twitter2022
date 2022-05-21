<template>
  <div class="wrap">
    <navigationAdmin />
    <div class="tweet-list">
      <div class="tweet-list-title">
        <h4>推文清單</h4>
      </div>
      <div class="tweet-list-warp">   
        <div class="tweet-list-card" v-for="tweet in tweets" :key="tweet.id">
          <div class="tweet-list-avatar">
            <img :src="tweet.User.avatar | emptyAvatar" alt="" />
          </div>
          <div class="tweet-list-content">
            <div class="tweet-list-title">
              <div class="tweet-list-name-group">
                <p class="tweet-list-name"><b>{{tweet.User.name}}</b></p>
                <p class="tweet-list-account fz14">@{{tweet.User.account}}・{{tweet.createdAt | fromNow}} 小時</p>
              </div>
              <div class="tweet-list-delete" @click="deleteTweet(tweet.id)">
                <img src="../assets/images/tweet-list-delete.png" alt="" />
              </div>
            </div>
            <div class="tweet-list-text">
              <p>
                {{tweet.description | partOfContents}}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import navigationAdmin from "../components/navAdmin";
//import InfiniteLoading from 'vue-infinite-loading';
import { fromNowFilter, emptyImageFilter } from './../utils/mixins'
import adminAPI from "./../apis/admin";
import { Toast } from './../utils/helpers'


export default {
  name: "adminTweetList",
  components: {
    navigationAdmin,
    //InfiniteLoading
  },
  data() {
    return {
      tweets: [],
    };
  },
  methods: {
    async fetchTweets(){
      try {
        const response = await adminAPI.getTweetsAdmin()
        console.log('response', response)
        this.tweets = response.data.data.tweets
      } catch (error) {
        console.log('error',error)
      }
    },
    async deleteTweet(tweetId){
      try {
        // api 
        await adminAPI.deleteTweetsAdmin(tweetId)
        // 畫面 render 
        this.tweets = this.tweets.filter(tweet => tweet.id !== tweetId)
        Toast.fire({
          icon: 'success',
          title: '成功刪除'
        })
      } catch (error) {
        console.log('error',error)
      }
    }
  },
  filters: {
    partOfContents(text){
      return text.length > 50 ? text.substr(0, 50)+'...' : text 
    }
  },
  created(){
    this.fetchTweets()
  },
  mixins: [fromNowFilter, emptyImageFilter]
};
</script>

<style lang="css" src="@/assets/css/adminTweetList.css" scoped></style>
<style scoped>
  
</style>