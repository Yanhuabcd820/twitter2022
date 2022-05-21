<template>
  <div class="wrap">
    <navigation :userId="currentUser.id" />
    <div class="main">
      <userTitle :userName="user.name" :tweetNum="2" />
      <userInfo :initial-user="user" v-if="isMe" />
      <userInfoOther :initial-user="user" v-else />
      <navTabs :userId="currentUser.id" />
      <div class="tweet-wrap">
        <div class="tweet-card" v-for="reply in replies" :key="reply.id">
          <div class="tweet-avatar">
            <img :src="reply.avatar | emptyAvatar" alt="" />
          </div>
          <div class="tweet-content">
            <div class="tweet-name-group">
              <p class="tweet-name">
                <b>{{ user.name }}</b>
              </p>
              <p class="tweet-account fz14">
                @{{ user.account }}・{{ reply.createdAt | fromNow }}
              </p>
            </div>

            <router-link
              :to="{ name: 'tweet', params: { id: reply.TweetId } }"
              class="tweet-text"
            >
              <p>
                {{ reply.comment }}
              </p>
            </router-link>
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
import userAPI from "./../apis/user";
import { mapState } from "vuex";
import { fromNowFilter,emptyImageFilter } from "./../utils/mixins";
import { Toast } from "./../utils/helpers";

export default {
  name: "mainPage",
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
        role: "",
        introduction: "",
        avatar: "https://dummyimage.com/600x400/a1a1a1/fff.jpg&text=+",
        cover: "https://dummyimage.com/600x400/a1a1a1/fff.jpg&text=+",
        followingCount: -1,
        followerCount: -1,
        isFollowing: false,
      },
      replies: [],
      isMe: true,
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
      }
    },
    async fetchUserReplies(userId) {
      try {
        const response = await userAPI.getUserReplies(userId);
        console.log(response)
        this.replies = [...response.data.data.replies];
        if (this.replies.length < 1) {
          Toast.fire({
            icon: "info",
            title: "目前沒有回覆的內容",
          });
        }
      } catch (error) {
        console.log(error);
      }
    },
    isThisMe(paramsId) {
      this.isMe = this.currentUser.id == paramsId; // 驗證是不是我
    },
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  created() {
    // 用token取得資料，取得後看role，是user或是admin，如果不是use，就跳出提醒，回到登入頁
    const twitterToken = localStorage.getItem("token");
    //console.log(twitterToken)
    if (!twitterToken) {
      Toast.fire({
        icon: "warning",
        title: "請登入",
      });
      this.$router.push("/login");
    }
    const { id: userId } = this.$route.params;
    this.fetchUser(userId);
    this.fetchUserReplies(userId);
    this.isThisMe(userId);
  },
  watch: {
    "$route.params.id": {
      handler: function (userId) {
        this.fetchUser(userId);
        this.fetchUserReplies(userId);
        this.isThisMe(userId);
      },
      immediate: true,
    },
  },
  mixins: [fromNowFilter,emptyImageFilter],
};
</script>

<style lang="css" src="@/assets/css/main.css" scoped></style>

