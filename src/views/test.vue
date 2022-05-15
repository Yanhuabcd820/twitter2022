<template>
  <div class="wrap">
    <navigationAdmin />
    <div class="tweet-list">
      <div class="tweet-list-title">
        <h4>推文清單</h4>
        <button @click="testToast">toast</button>
      </div>
      <div class="tweet-list-warp">   
        <div class="tweet-list-card" v-for="tweet in tweets" :key="tweet.id">
          <div class="tweet-list-avatar">
            <img :src="tweet.User.avatar" alt="" />
          </div>
          <div class="tweet-list-content">
            <div class="tweet-list-title">
              <div class="tweet-list-name-group">
                <p class="tweet-list-name"><b>{{tweet.User.name}}</b></p>
                <p class="tweet-list-account fz14">@{{tweet.User.account}}・{{tweet.createdAt | fromNow}} 小時</p>
              </div>
              <div class="tweet-list-delete">
                <img src="../assets/images/tweet-list-delete.png" alt="" />
              </div>
            </div>
            <div class="tweet-list-text">
              <p>
                {{tweet.description}}
              </p>
            </div>
          </div>
        </div>
        <infinite-loading @infinite="infiniteHandler"></infinite-loading>
      </div>
    </div>
  </div>
</template>
<script>
import navigationAdmin from "../components/navAdmin";
import InfiniteLoading from 'vue-infinite-loading';
//import {v4 as uuidv4} from 'uuid'
import { fromNowFilter } from './../utils/mixins'
import axios from 'axios';
//import tweetAPI from './../apis/tweets'
import Swal from 'sweetalert2'

const getToken = () => localStorage.getItem('token')

export default {
  name: "adminTweetList",
  components: {
    navigationAdmin,
    InfiniteLoading
  },
  data() {
    return {
      tweets: [],
      page:1
    };
  },
  methods: {
    async infiniteHandler($state){
      try {
        const response = await axios.get(`https://damp-wave-52946.herokuapp.com/api/tweets?page=${this.page}&limit=3`, { headers: { Authorization: `Bearer ${getToken()}`}})

        console.log('response', response)
        let sometweets = response.data.data.tweets
        if (sometweets.length) {
          this.page += 1;
          this.tweets.push(...sometweets);
          $state.loaded();
        } else {
          $state.complete();
        }
      } catch (error) {
        console.log('error',error)
      }
    },
    testToast(){
      Swal.fire({
        title: '請重複確認',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        icon: 'info',
        customClass: {
          container: 'container-class',
          title: 'title-Class'
        }
      })
    }
  },
  mixins: [fromNowFilter]
};
</script>

<style lang="css" src="@/assets/css/adminTweetList.css" scoped></style>
<style>
.swal2-container{
  direction: rtl !important;
}
.swal2-popup{
  grid-template-columns: 1fr 1fr !important;
}
.swal2-title{
  text-align: left !important;
}
</style>