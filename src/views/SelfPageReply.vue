<template>
  <div class="wrap">
    <navigation :userId="currentUser.id" />
    <div class="main">
      <userTitle :userName="user.name" :tweetNum="user.tweetsCount" />
      <userInfo :initial-user="currentUser" v-if="isMe" />
      <userInfoOther
        :initial-user="user"
        v-else
        @if-follow-this-other-user="ifFollowThisOtherUser"
        :changeBtnColor="changeBtnColor"
        :ifFollowOtherUser="ifFollowOtherUser"
      />
      <navTabs :userId="Number($route.params.id)" />
      <div class="tweet-wrap">
        <div class="tweet-card" v-for="reply in replies" :key="reply.id">
          <div class="tweet-avatar">
            <img :src="user.avatar | emptyAvatar" alt="" />
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
            <div>
              <p class="fz14">
                <span class="reply-title">回覆</span
                ><span class="reply-account">
                  @{{ reply.Tweet.User.account }}</span
                >
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
    <followTop
      :initialUser="currentUser"
      @if-follow-this-other-user="ifFollowThisOtherUser"
      :ifFollowOtherUser="ifFollowOtherUser"
      :followOtherId="followOtherId"
      :otherUser="user"
      @if-change-btn-color="ifChangeBtnColor"
      @add-following-num="addFollowingNum"
      @un-following-num="unFollowingNum"
    />
    <!-- <followTop
      :userId="currentUser.id"
      :initialUser="user"
      @add-following-num="addFollowingNum"
      @un-following-num="unFollowingNum"
    /> -->
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
import { fromNowFilter, emptyImageFilter } from "./../utils/mixins";
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
        tweetsCount: 0,
      },
      replies: [],
      isMe: true,
      ifFollowOtherUser: false,
      followOtherId: -1,
      changeBtnColor: false,
    };
  },
  methods: {
    ifFollowThisOtherUser(payload) {
      //告訴followTop要變換OtherUser的按鈕顏色
      const { ifFollowOtherUser, followOtherId } = payload;
      this.ifFollowOtherUser = ifFollowOtherUser;
      this.followOtherId = followOtherId;
    },
    ifChangeBtnColor(payload) {
      //告訴userInfoOther要變換按鈕顏色
      const { changeBtnColor } = payload;
      // this.changeBtnColor = changeBtnColor;
      console.log("changeBtnColor.changeBtnColor", changeBtnColor);
      console.log("changeBtnColor.payload", payload);
      this.ifFollowOtherUser = changeBtnColor;
    },
    async fetchUser(userId) {
      try {
        const response = await userAPI.getUser(userId);
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
          followingCount,
          followerCount,
          tweetsCount,
        } = response.data;
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
          tweetsCount,
        };
      } catch (error) {
        console.log("error", error);
        Toast.fire({
          icon: "error",
          title: "無此使用者或讀取資料錯誤",
        });
      }
    },
    async fetchUserReplies(userId) {
      try {
        const response = await userAPI.getUserReplies(userId);
        this.replies = [...response.data];
        this.replies = this.replies.filter((reply) => reply.Tweet);
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
    async addFollowingNum(payload) {
      try {
        const { followingCount, followingId } = payload;
        if (this.isMe) {
          this.currentUser.followingCount = followingCount;
        } else {
          if (this.user.id === followingId) {
            this.user.followerCount = this.user.followerCount + 1;
          }
        }
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法新增此筆addFollowing",
        });
      }
    },
    async unFollowingNum(payload) {
      try {
        const { followingCount, followingId } = payload;
        if (this.isMe) {
          this.currentUser.followingCount = followingCount;
        } else {
          if (this.user.id === followingId) {
            this.user.followerCount = this.user.followerCount - 1;
          }
        }
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法新增此筆unFollowing",
        });
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
  mixins: [fromNowFilter, emptyImageFilter],
};
</script>

<style lang="css" src="@/assets/css/main.css" scoped></style>

<style scoped>
</style>