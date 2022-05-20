<template>
  <div class="wrap">
    <navigation :userId="currentUser.id" />
    <div class="main">
      <userTitle :userName="user.name" :tweetNum="tweets.length" />
      <userInfo :initial-user="user" v-if="isMe" />
      <userInfoOther :initial-user="user" v-else />
      <navTabs :userId="currentUser.id" />
      <div class="tweet-wrap">
        <div class="tweet-card" v-for="tweet in tweets" :key="tweet.id">
          <div class="tweet-avatar">
            <img :src="tweet.avatar | emptyImage" alt="" />
          </div>
          <div class="tweet-content">
            <div class="tweet-name-group">
              <p class="tweet-name">
                <b>{{ user.name }}</b>
              </p>
              <p class="tweet-account fz14">
                @{{ user.account }}・{{ tweet.createdAt | fromNow }}
              </p>
            </div>
            <div class="tweet-text">
              <p>
                {{ tweet.description }}
              </p>
            </div>
            <div class="tweet-count">
              <a href="#" class="tweet-reply">
                <div class="tweet-reply-img">
                  <img src="../assets/images/tweet-reply.png" alt="" />
                </div>
                <p class="fz14">
                  <b>{{ tweet.replyCount }}</b>
                </p>
              </a>
              <a href="#" class="tweet-like">
                <div class="tweet-like-img">
                  <img src="../assets/images/tweet-like.png" alt="" />
                </div>
                <p class="fz14">
                  <b>{{ tweet.likeCount }}</b>
                </p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <followTop :userId="currentUser.id" />

  </div>
</template>
<script>
import navigation from "../components/nav";
import followTop from "../components/followTop";
import userInfo from "../components/userInfo";
import userInfoOther from "../components/userInfoOther";
import userTitle from "../components/userTitle";
import navTabs from "../components/navTabs";
import { fromNowFilter, emptyImageFilter } from "./../utils/mixins";
import userAPI from "./../apis/user";
import { mapState } from "vuex";
import { Toast } from "./../utils/helpers";
// 要得到使用者info、使用者自己的推文、推計追蹤者的資料
// 使用者info丟進去component，使用者自己的推文直接render

export default {
  name: "SelfPage",
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
        updatedAt: "",
      },
      tweets: [],
      isMe: true,
      isClickPopupEditModal: false,
    };
  },
  methods: {
    async fetchUser(userId) {
      try {
        const response = await userAPI.getUser(userId);
        //console.log("response in selfPage", response);
        // dummyUser 對應 response.data.user
        const {
          id,
          account,
          name,
          email,
          role,
          introduction,
          avatar,
          cover,
          isFollowing,
          createdAt,
          updatedAt,
        } = response.data.data.user;
        const { followingCount, followerCount } = response.data.data;
        this.user = {
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
          createdAt,
          updatedAt,
        };
        //console.log('user',this.user)
      } catch (error) {
        console.log("error", error);
        Toast.fire({
          icon: "error",
          title: "無此使用者",
        });
      }
    },
    async fetchTweets(userId) {
      try {
        const response = await userAPI.getUserTweets(userId);
        //console.log('fetch tweets response', response)
        this.tweets = [...response.data.data.tweets];
      } catch (error) {
        console.log("error", error);
      }
    },
    //fetchTweets(){
    //  this.tweets = [...dummyTweets.tweets]
    //},
    isThisMe(paramsId) {
      //console.log('params', paramsId)
      //console.log('vuex',this.currentUser.id)
      //console.log(this.isMe)
      this.isMe = this.currentUser.id == paramsId; // 驗證是不是我
    },
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  created() {
    // 用token取得資料，取得後看role，是user或是admin，如果不是use，就跳出提醒，回到登入頁
    const twitterToken = localStorage.getItem("token");
    if (!twitterToken) {
      Toast.fire({
        icon: "warning",
        title: "請登入",
      });
      this.$router.push("/login");
    }
    const { id: userId } = this.$route.params;
    this.fetchUser(userId);
    this.fetchTweets(userId);
    this.isThisMe(userId);
  },
  watch: {
    "$route.params.id": {
      handler: function (userId) {
        this.fetchUser(userId);
        this.fetchTweets(userId);
        this.isThisMe(userId);
      },
      immediate: true,
    },
  },
  mixins: [fromNowFilter, emptyImageFilter],
};
</script>

<style lang="css" src="@/assets/css/main.css" scoped></style>

