<template>
  <div class="wrap">
    <popupReplyList
      v-if="isClickPopupReplyList"
      @close-PopupReplyList="closePopupReplyList"
      :tweet="tweet"
      :user="user"
      @after-create-reply-list="afterCreateReplyList"
    />
    <!-- <popupReplyList /> -->
    <!-- <popupReplyList />
    <popupReply /> -->
    <navigation />
    <div class="reply-wrap">
      <router-link to="/tweets" class="reply-title">
        <div class="reply-forward">
          <img src="../assets/images/forward.png" alt="" />
        </div>
        <h4>推文</h4>
      </router-link>
      <div class="reply">
        <div class="reply-inner">
          <div class="reply-user">
            <div class="reply-avatar">
              <img :src="tweet.User.avatar" alt="" />
            </div>
            <div class="reply-name-group">
              <p class="reply-name">
                <b>{{ tweet.User.name }}</b>
              </p>
              <p class="reply-account fz14">
                @{{ tweet.User.account }}・{{ tweet.createdAt | fromNow }}
              </p>
            </div>
          </div>
          <div class="reply-text">
            {{ tweet.description }}
          </div>
          <p class="fz14 reply-time">{{ tweet.updatedAt }}</p>
          <!-- <p class="fz14 reply-time">上午 10:05・2021年11月10日</p> -->
        </div>
        <div class="reply-count">
          <div class="reply-num">
            <span>{{ replies.length }}</span> 回覆
          </div>
          <div class="like-num">
            <span> {{ tweet.LikedUsers.length }}</span> 喜歡次數
          </div>
        </div>
        <div class="reply-count-btn">
          <div class="reply-btn" @click.prevent.stop="openPopupReplyList">
            <img src="../assets/images/tweet-reply.png" alt="" />
          </div>

          <div class="like-btn" v-if="tweet.isLiked">
            <img src="../assets/images/tweet-like-active.png" alt="" />
          </div>

          <div class="like-btn" v-if="!tweet.isLiked">
            <img src="../assets/images/tweet-like.png" alt="" />
          </div>
        </div>
      </div>
      <div class="reply-tweet-wrap">
        <div class="reply-tweet-card" v-for="reply in replies" :key="reply.id">
          <div class="reply-tweet-avatar">
            <img :src="reply.User.avatar" alt="" />
          </div>
          <div class="reply-tweet-content">
            <div class="reply-tweet-name-group">
              <p class="reply-tweet-name">
                <b>{{ reply.User.name }}</b>
                <span
                  >@{{ reply.User.account }}・{{
                    reply.createdAt | fromNow
                  }}</span
                >
              </p>
              <p class="reply-to fz14">
                <span>回覆</span> @{{ reply.User.name }}
              </p>
            </div>
            <div class="reply-tweet-text">
              <p>
                {{ reply.comment }}
              </p>
            </div>
            <div class="reply-tweet-count">
              <div class="reply-tweet-reply">
                <div class="reply-tweet-reply-img">
                  <img src="../assets/images/tweet-reply.png" alt="" />
                </div>
                <p class="fz14"><b>13</b></p>
              </div>
              <div class="reply-tweet-like">
                <div class="reply-tweet-like-img">
                  <img src="../assets/images/tweet-like.png" alt="" />
                </div>
                <p class="fz14">
                  <b>{{ reply.LikedUsers.length }}</b>
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
const dummyUser = {
  status: "success",
  user: {
    id: 1,
    account: "user1",
    name: "user1",
    email: "user1@example.com",
    password: "$2a$10$DRteVVsafLSZdoetjOpfdeSYGf3t5SuswRL3sRrSvdGpS3ACmU5NG",
    role: "user",
    introduction: "Deleniti est id inventore.",
    avatar: "https://loremflickr.com/320/240/people/?random=73.0908396968221",
    cover:
      "https://loremflickr.com/320/240/restaurant,food/?random=79.46570629965461",
    createdAt: "2022-05-13T15:55:16.000Z",
    updatedAt: "2022-05-13T15:55:16.000Z",
  },
};
import { fromNowFilter } from "./../utils/mixins";
import { Toast } from "./../utils/helpers";
import navigation from "../components/nav";
import followTop from "../components/followTop";
import popupReplyList from "../components/popupReplyList";
import tweetsApi from "../apis/tweets";
export default {
  name: "tweet",
  components: {
    navigation,
    followTop,
    popupReplyList,
  },
  data() {
    return {
      isClickPopupReplyList: false,
      tweet: {},
      replies: {},
      user: dummyUser.user,
    };
  },
  methods: {
    async fetchTweet(tweetId) {
      try {
        const { data } = await tweetsApi.getTweet(tweetId);
        const { tweet } = data.data;
        this.tweet = tweet;
        console.log("this.tweet", this.tweet);
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法取得餐廳資料，請稍後再試",
        });
      }
    },
    async fetchTweetReplies(tweetId) {
      try {
        const { data } = await tweetsApi.getTweetReplies(tweetId);
        const { replies } = data.data;
        this.replies = replies;

        console.log("replies", replies);
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法取得餐廳資料，請稍後再試",
        });
      }
    },

    openPopupReplyList() {
      console.log(this.isClickPopupReplyList);
      this.isClickPopupReplyList = true;
    },
    closePopupReplyList(payload) {
      const { isClickPopupReplyList } = payload;
      this.isClickPopupReplyList = isClickPopupReplyList;
      // console.log("closePopupReplyList", this.isClickPopupReplyList);
    },
    afterCreateReplyList(payload) {
      const { tweetText, tweetId } = payload;
      console.log("payload", payload);
      this.replies.unshift({
        id: tweetId,
        comment: tweetText,
        User: {
          id: this.user.id,
          account: this.user.account,
          name: this.user.name,
          avatar: this.user.avatar,
        },
        createdAt: new Date(),
      });
      /*關掉PopupTweet*/
      this.isClickPopupTweet = false;
    },
  },
  created() {
    const { id: tweetId } = this.$route.params;
    this.fetchTweet(tweetId);
    this.fetchTweetReplies(tweetId);
  },
  mixins: [fromNowFilter],
};
</script>

<style lang="css" src="@/assets/css/reply.css" scoped></style>