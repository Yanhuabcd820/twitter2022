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
      <userTitle :userName="user.name" :tweetNum="currentUser.tweetCount" />
      <userInfo :initial-user="user" v-if="isMe" />
      <userInfoOther :initial-user="user" v-else />
      <navTabs :userId="Number($route.params.id)" />
      <div class="tweet-wrap">
        <div class="tweet-card" v-for="tweet in tweets" :key="tweet.id">
          <div class="tweet-avatar">
            <img :src="user.avatar | emptyAvatar" alt="" />
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
            <!-- <div class="tweet-text"> -->
            <router-link
              :to="{ name: 'tweet', params: { id: tweet.id } }"
              class="tweet-text"
            >
              <p>
                {{ tweet.description }}
              </p>
            </router-link>
            <div class="tweet-count">
              <div
                class="tweet-reply"
                @click.prevent.stop="openPopupReply(tweet.id)"
              >
                <div class="tweet-reply-img">
                  <img src="../assets/images/tweet-reply.png" alt="" />
                </div>
                <p class="fz14">
                  <b>{{ tweet.Replies }}</b>
                </p>
              </div>
              <div
                class="tweet-like"
                v-if="!tweet.isLiked"
                @click.prevent.stop="addLike(tweet.id)"
              >
                <div class="tweet-like-img">
                  <img src="../assets/images/tweet-like.png" alt="" />
                </div>
                <p class="fz14">
                  <b>{{ tweet.Likes }}</b>
                </p>
              </div>
              <div
                class="tweet-like"
                v-if="tweet.isLiked"
                @click.prevent.stop="unLike(tweet.id)"
              >
                <div class="tweet-like-img">
                  <img src="../assets/images/tweet-like-active.png" alt="" />
                </div>
                <p class="fz14">
                  <b>{{ tweet.Likes }}</b>
                </p>
              </div>
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
import popupReply from "./../components/popupReply";
import userAPI from "./../apis/user";
import tweetsApi from "./../apis/tweets";
import { fromNowFilter, emptyImageFilter } from "./../utils/mixins";
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
        createdAt: "",
        updatedAt: "",
      },
      tweets: [],
      isMe: true,
      isClickPopupEditModal: false,
      isClickPopupReplyTweet: false,
      tweetPopup: {},
    };
  },
  methods: {
    async addLike(TweetId) {
      try {
        const dataLike = await userAPI.addLike({ TweetId });
        if (dataLike.data.status !== "Success") {
          throw new Error(dataLike.data.message);
        }
        console.log("TweetId", TweetId);
        this.tweets = this.tweets.map((tweet) => {
          if (tweet.id === TweetId) {
            return {
              ...tweet,
              isLiked: true,
              Likes: tweet.Likes + 1,
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
      try {
        const dataUnLike = await userAPI.unLike({ TweetId });

        if (dataUnLike.data.status !== "Success") {
          throw new Error(dataUnLike.data.message);
        }
        this.tweets = this.tweets.map((tweet) => {
          if (tweet.id === TweetId) {
            return {
              ...tweet,
              isLiked: false,
              Likes: tweet.Likes - 1,
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
          followingCount,
          followerCount
        } = response.data;
        //const { followingCount, followerCount } = response.data.data;
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
          title: "無此使用者或讀取資料錯誤",
        }); 
      }
    },
    async fetchTweets(userId) {
      //const { id } = this.$route.params;
      //const getPath = this.$route.path;
      //console.log("getPath", getPath);
      //console.log("id", id);
      try {
        const response = await userAPI.getUserTweets(userId);
        //console.log('fetch tweets response', response)
        this.tweets = [...response.data];
        //console.log('tweets',response)
      } catch (error) {
        console.log("error", error);
      }
    },
    openPopupReply(tweetId) {
      this.tweetPopup = this.tweets.find((tweet) => tweet.id === tweetId);
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
    //console.log(this.currentUser)
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

