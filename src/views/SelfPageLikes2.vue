<template>
  <div class="wrap">
    <popupReply
      v-if="isClickPopupReplyTweet"
      @close-PopupReply="closePopupReply"
      :tweet="tweetPopup"
      :user="user"
      @after-create-reply="afterCreateReply"
    />
    <navigation :userId="currentUser.id" />
    <div class="main">
      <userTitle :userName="user.name" :tweetNum="user.tweetsCount" />
      <userInfo :initial-user="user" v-if="isMe" />
      <userInfoOther :initial-user="user" v-else />
      <navTabs :userId="Number($route.params.id)" />
      <div class="tweet-wrap">
        <div class="tweet-card" v-for="tweet in tweets" :key="tweet.id">
          <div class="tweet-avatar">
            <img :src="tweet.Tweet.User.avatar | emptyAvatar" alt="" />
          </div>
          <div class="tweet-content">
            <div class="tweet-name-group">
              <router-link
                :to="{
                  name: 'SelfPage',
                  params: { id: tweet.Tweet.User.id },
                }"
                class="tweet-name"
              >
                <b>{{ tweet.Tweet.User.name }}</b>
              </router-link>
              <p class="tweet-account fz14">
                @{{ tweet.Tweet.User.account }}・3 小時
              </p>
            </div>

            <router-link
              :to="{ name: 'tweet', params: { id: tweet.TweetId } }"
              class="tweet-text"
            >
              <p>
                {{ tweet.Tweet.description }}
              </p>
            </router-link>
            <div class="tweet-count">
              <div
                class="tweet-reply"
                @click.prevent.stop="openPopupReply(tweet.TweetId)"
              >
                <div class="tweet-reply-img">
                  <img src="../assets/images/tweet-reply.png" alt="" />
                </div>
                <p class="fz14">
                  <b>{{ tweet.ReplyCount }}</b>
                </p>
              </div>

              <div
                class="tweet-like"
                v-if="tweet.isLiked"
                @click.prevent.stop="unLike(tweet.TweetId)"
              >
                <div class="tweet-like-img">
                  <img src="../assets/images/tweet-like-active.png" alt="" />
                </div>
                <p class="fz14">
                  <b>{{ tweet.LikeCount }}</b>
                </p>
              </div>

              <div
                class="tweet-like"
                v-if="!tweet.isLiked"
                @click.prevent.stop="addLike(tweet.TweetId)"
              >
                <div class="tweet-like-img">
                  <img src="../assets/images/tweet-like.png" alt="" />
                </div>
                <p class="fz14">
                  <b>{{ tweet.LikeCount }}</b>
                </p>
              </div>
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
import popupReply from "./../components/popupReply";
import userAPI from "./../apis/user";
import tweetsApi from "./../apis/tweets";
import { fromNowFilter, emptyImageFilter } from "./../utils/mixins";
import { mapState } from "vuex";
import { Toast } from "./../utils/helpers";

export default {
  name: "mainPageLikes",
  components: {
    navigation,
    followTop,
    userInfo,
    userTitle,
    navTabs,
    userInfoOther,
    popupReply,
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
        tweetsCount: 0,
      },
      tweets: [],
      tweetPopup: {},
      isMe: true,
      isClickPopupReplyTweet: false,
    };
  },
  methods: {
    async addLike(TweetId) {
      try {
        await userAPI.addLike({ TweetId });
        //if (dataLike.data.status !== "Success") {
        //  throw new Error(dataLike.data.message);
        //}
        console.log("TweetId", TweetId);
        this.tweets = this.tweets.map((tweet) => {
          if (tweet.TweetId === TweetId) {
            return {
              ...tweet,
              isLiked: true,
              LikeCount: tweet.LikeCount + 1,
            };
          }
          return tweet;
        });
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法like此筆tweet，請稍後再試",
        });
      }
    },
    async unLike(TweetId) {
      console.log("TweetId", TweetId);
      try {
        console.log("TweetId", TweetId);
        const dataUnLike = await userAPI.unLike({ TweetId });
        console.log("dataUnLike", dataUnLike);
        //if (dataUnLike.data.status !== "Success") {
        //  throw new Error(dataUnLike.data.message);
        //}
        this.tweets = this.tweets.map((tweet) => {
          if (tweet.TweetId === TweetId) {
            return {
              ...tweet,
              isLiked: false,
              LikeCount: tweet.LikeCount - 1,
            };
          }
          return tweet;
        });
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法unlike此筆tweet，請稍後再試",
        });
      }
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
    async fetchUserLikes(userId) {
      try {
        //console.log("userId", userId);
        const response = await userAPI.getUserLikes(userId);

        //console.log("like res", response);
        this.tweets = [...response.data];
        if (this.tweets.length < 1) {
          Toast.fire({
            icon: "info",
            title: "目前沒有喜歡的內容",
          });
        }
      } catch (error) {
        console.log("error", error);
      }
    },
    isThisMe(paramsId) {
      this.isMe = this.currentUser.id == paramsId;
    },

    openPopupReply(tweetId) {
      console.log(tweetId);
      this.tweetPopup = this.tweets.find((tweet) => tweet.TweetId === tweetId);
      this.isClickPopupReplyTweet = true;
    },
    closePopupReply(payloadPopupReply) {
      const { isClickPopupReplyTweet } = payloadPopupReply;
      this.isClickPopupReplyTweet = isClickPopupReplyTweet;
    },
    async afterCreateReply(payload) {
      try {
        const { comment, tweetId } = payload;
        const data = await tweetsApi.postTweetsReply({
          comment,
          tweetId,
        });
        if (data.data.status !== "Success") {
          throw new Error(data.message);
        }
        // 成功的話則轉址到 `/tweets/:id`
        this.$router.push({ name: "tweet", params: { id: tweetId } });
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法新增此筆tweetReply",
        });
      }
    },
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  created() {
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
    this.fetchUserLikes(userId);
    this.isThisMe(userId);
  },
  watch: {
    "$route.params.id": {
      handler: function (userId) {
        this.fetchUser(userId);
        this.fetchUserLikes(userId);
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
.tweet-name {
  color: black;
}
</style>