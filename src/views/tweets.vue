<template>
  <div class="wrap">
    <popupTweet
      v-if="isClickPopupTweet"
      @close-PopupTweet="closePopupTweet"
      @after-create-tweet="afterCreateTweet"
      :user="user"
      @after-open-tweet="afterOpenTweet"
    />
    <navigation @after-open-tweet="afterOpenTweet" :userId="currentUser.id" />
    <div class="main">
      <div class="user-title">
        <h4>首頁</h4>
      </div>
      <div class="post">
        <div class="post-inner">
          <router-link
            :to="{ name: 'SelfPage', params: { id: user.id } }"
            class="post-avatar"
          >
            <img :src="user.avatar | emptyImage" alt="" />
          </router-link>
        </div>
        <div class="post-inner-tweet" @click.prevent.stop="openPopupTweet">
          <h5>有什麼新鮮事？</h5>
          <div class="post-inner-btn">
            <div class="btn active">推文</div>
          </div>
        </div>
      </div>
      <popupReply
        v-if="isClickPopupReplyTweet"
        @close-PopupReply="closePopupReply"
        :tweet="tweetPopup"
        :user="user"
        @after-create-reply="afterCreateReply"
      />
      <div class="tweet-wrap">
        <div class="tweet-card" v-for="tweet in tweets" :key="tweet.id">
          <router-link
            :to="{ name: 'SelfPage', params: { id: tweet.User.id } }"
            class="tweet-avatar"
          >
            <img :src="tweet.User.avatar | emptyImage" alt="" />
          </router-link>
          <router-link
            :to="{ name: 'tweet', params: { id: tweet.id } }"
            class="tweet-content"
          >
            <router-link
              :to="{ name: 'SelfPage', params: { id: tweet.User.id } }"
              class="tweet-name-group"
            >
              <p class="tweet-name">
                <b>{{ tweet.User.name }}</b>
              </p>
              <p class="tweet-account fz14">
                @{{ tweet.User.account }}・{{ tweet.createdAt | fromNow }}
              </p>
            </router-link>
            <div class="tweet-text">
              <p>
                {{ tweet.description }}
              </p>
            </div>
            <div class="tweet-count">
              <div
                class="tweet-reply"
                @click.prevent.stop="openPopupReply(tweet.id)"
              >
                <div class="tweet-reply-img">
                  <img src="../assets/images/tweet-reply.png" alt="" />
                </div>
                <p class="fz14">
                  <b>
                    <b>{{ tweet.totalReplies }}</b></b
                  >
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
                  <b>{{ tweet.totalLikes }}</b>
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
                  <b>{{ tweet.totalLikes }}</b>
                </p>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
    <followTop :userId="currentUser.id" />
  </div>
</template>
<script>
import { fromNowFilter, emptyImageFilter } from "./../utils/mixins";
import { Toast } from "./../utils/helpers";
import navigation from "./../components/nav";
import followTop from "./../components/followTop";
import popupTweet from "./../components/popupTweet";
import popupReply from "./../components/popupReply";
import tweetsApi from "./../apis/tweets";
import userApi from "./../apis/user";
import { mapState } from "vuex";

export default {
  name: "tweets",
  components: {
    navigation,
    followTop,
    popupTweet,
    popupReply,
  },
  data() {
    return {
      user: {
        id: 0,
      },
      tweets: [],
      replies: [],
      isClickPopupTweet: false,
      isClickPopupReplyTweet: false,
      tweetPopup: {},
      TweetsRepliesNum: {},
    };
  },
  methods: {
    async featchTweets() {
      try {
        // 取得tweets資料
        const responesTweets = await tweetsApi.getTweets();
        const { tweets } = responesTweets.data.data;
        this.tweets = tweets;
        // console.log(this.tweets);
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法取得tweets資料，請稍後再試",
        });
      }
    },
    async afterCreateTweet(payload) {
      try {
        const { description } = payload;
        const data = await tweetsApi.postTweets({ description });
        if (data.data.status !== "Success") {
          throw new Error(data.message);
        }
        const tweetId = data.data.data.tweet.id;
        this.tweets.unshift({
          description,
          id: tweetId,
          User: {
            id: this.user.id,
            account: this.user.account,
            name: this.user.name,
            avatar: this.user.avatar,
          },
          createdAt: new Date(),
          totalLikes: 0,
          totalReplies: 0,
        });
        /*關掉PopupTweet*/
        this.isClickPopupTweet = false;
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法新增此筆tweet",
        });
      }
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
        console.log("data", data);
        this.replies.unshift({
          comment,
          id: tweetId,
          User: {
            id: this.user.id,
            account: this.user.account,
            name: this.user.name,
            avatar: this.user.avatar,
          },
          createdAt: new Date(),
        });

        // 成功的話則轉址到 `/tweets/:id`
        this.$router.push({ name: "tweet", params: { id: tweetId } });
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法新增此筆tweetReply",
        });
      }
    },

    async addLike(tweetId) {
      try {
        const dataLike = await userApi.addLike({ tweetId });
        if (dataLike.data.status !== "Success") {
          throw new Error(dataLike.data.message);
        }
        this.tweets = this.tweets.map((tweet) => {
          if (tweet.id === tweetId) {
            return {
              ...tweet,
              isLiked: true,
              totalLikes: tweet.totalLikes + 1,
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
    async unLike(tweetId) {
      try {
        const dataUnLike = await userApi.unLike({ tweetId });

        if (dataUnLike.data.status !== "Success") {
          throw new Error(dataUnLike.data.message);
        }
        this.tweets = this.tweets.map((tweet) => {
          if (tweet.id === tweetId) {
            return {
              ...tweet,
              isLiked: false,
              totalLikes: tweet.totalLikes - 1,
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
    afterOpenTweet(payload) {
      //將彈跳視窗打開
      const { isClickPopupTweet } = payload;
      console.log(isClickPopupTweet);
      this.isClickPopupTweet = isClickPopupTweet;
    },
    openPopupTweet() {
      //將彈跳視窗打開
      this.isClickPopupTweet = true;
    },
    closePopupTweet(payloadPopup) {
      //將彈跳視窗關閉
      const { isClickPopupTweet } = payloadPopup;
      this.isClickPopupTweet = isClickPopupTweet;
    },

    openPopupReply(tweetId) {
      this.tweetPopup = this.tweets.find((tweet) => tweet.id === tweetId);
      this.isClickPopupReplyTweet = true;
    },
    closePopupReply(payloadPopupReply) {
      const { isClickPopupReplyTweet } = payloadPopupReply;
      this.isClickPopupReplyTweet = isClickPopupReplyTweet;
    },
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
    this.featchTweets();
    this.user = this.currentUser;
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  mixins: [fromNowFilter, emptyImageFilter],
};
</script>

<style lang="css" src="@/assets/css/main.css" scoped></style>


