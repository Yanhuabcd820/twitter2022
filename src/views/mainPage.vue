<template>
  <div class="wrap">
    <popupTweet v-if="isClickPopupTweet" @close-PopupTweet="closePopupTweet" />
    <!-- <popupTweet @close-PopupTweet="closePopupTweet" /> -->
    <navigation />
    <div class="main">
      <div class="user-title">
        <h4>首頁</h4>
      </div>
      <div class="post" @click.prevent.stop="openPopupTweet">
        <div class="post-inner">
          <div class="post-avatar">
            <img src="../assets/images/avatar.png" alt="" />
          </div>
          <h5>有什麼新鮮事？</h5>
        </div>
        <div class="post-inner-btn">
          <div class="btn active" href="#">推文</div>
        </div>
      </div>
      <div class="tweet-wrap">
        <div class="tweet-card" v-for="tweet in tweets" :key="tweet.User.id">
          <div class="tweet-avatar">
            <img :src="tweet.User.avatar" alt="" />
          </div>
          <div class="tweet-content">
            <div class="tweet-name-group">
              <p class="tweet-name">
                <b>{{ tweet.User.name }}</b>
              </p>
              <p class="tweet-account fz14">
                @{{ tweet.User.account }}・{{ tweet.createdAt }}
              </p>
            </div>
            <router-link to="/reply" class="tweet-text">
              <p>
                {{ tweet.description }}
              </p>
            </router-link>
            <div class="tweet-count">
              <div class="tweet-reply">
                <div class="tweet-reply-img">
                  <img src="../assets/images/tweet-reply.png" alt="" />
                </div>
                <p class="fz14"><b>13</b></p>
              </div>
              <div class="tweet-like">
                <div class="tweet-like-img">
                  <img src="../assets/images/tweet-like.png" alt="" />
                </div>
                <p class="fz14">
                  <b>{{ tweet.totalLikes }}</b>
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
const dummyTweets = {
  status: "Success",
  statusCode: 200,
  data: {
    tweets: [
      {
        id: 54,
        userId: 1,
        description: "希望 Heroku 測試成功！！",
        createdAt: "2022-05-13T02:41:28.000Z",
        updatedAt: "2022-05-13T02:41:28.000Z",
        User: {
          id: 1,
          account: "user1",
          name: "user1",
          avatar:
            "https://loremflickr.com/320/240/people/?random=81.32293907231949",
        },
        LikedUsers: [
          {
            id: 1,
            account: "user1",
            name: "user1",
            avatar:
              "https://loremflickr.com/320/240/people/?random=81.32293907231949",
            Like: {
              id: 14,
              userId: 1,
              tweetId: 54,
              createdAt: "2022-05-13T02:46:40.000Z",
              updatedAt: "2022-05-13T02:46:40.000Z",
            },
          },
          {
            id: 2,
            account: "user2",
            name: "user2",
            avatar:
              "https://loremflickr.com/320/240/people/?random=95.56072455032174",
            Like: {
              id: 24,
              userId: 2,
              tweetId: 54,
              createdAt: "2022-05-13T02:48:59.000Z",
              updatedAt: "2022-05-13T02:48:59.000Z",
            },
          },
        ],
        isLiked: true,
        totalLikes: 2,
      },
      {
        id: 1,
        userId: 1,
        description: "Est soluta est qui officia.",
        createdAt: "2022-05-13T02:29:37.000Z",
        updatedAt: "2022-05-13T02:29:37.000Z",
        User: {
          id: 1,
          account: "user1",
          name: "user1",
          avatar:
            "https://loremflickr.com/320/240/people/?random=81.32293907231949",
        },
        LikedUsers: [],
        isLiked: false,
        totalLikes: 0,
      },
      {
        id: 6,
        userId: 1,
        description: "Sit iste sed illo commodi.",
        createdAt: "2022-05-13T02:29:37.000Z",
        updatedAt: "2022-05-13T02:29:37.000Z",
        User: {
          id: 1,
          account: "user1",
          name: "user1",
          avatar:
            "https://loremflickr.com/320/240/people/?random=81.32293907231949",
        },
        LikedUsers: [],
        isLiked: false,
        totalLikes: 0,
      },
      {
        id: 2,
        userId: 2,
        description: "Omnis aspernatur accusamus vitae aut qui commodi.",
        createdAt: "2022-05-13T02:29:37.000Z",
        updatedAt: "2022-05-13T02:29:37.000Z",
        User: {
          id: 2,
          account: "user2",
          name: "user2",
          avatar:
            "https://loremflickr.com/320/240/people/?random=95.56072455032174",
        },
        LikedUsers: [],
        isLiked: false,
        totalLikes: 0,
      },
      {
        id: 7,
        userId: 2,
        description:
          "Quasi perspiciatis a ab provident consequatur molestiae nam minus.",
        createdAt: "2022-05-13T02:29:37.000Z",
        updatedAt: "2022-05-13T02:29:37.000Z",
        User: {
          id: 2,
          account: "user2",
          name: "user2",
          avatar:
            "https://loremflickr.com/320/240/people/?random=95.56072455032174",
        },
        LikedUsers: [],
        isLiked: false,
        totalLikes: 0,
      },
      {
        id: 3,
        userId: 3,
        description: "Officia porro aspernatur velit voluptas id.",
        createdAt: "2022-05-13T02:29:37.000Z",
        updatedAt: "2022-05-13T02:29:37.000Z",
        User: {
          id: 3,
          account: "user3",
          name: "user3",
          avatar:
            "https://loremflickr.com/320/240/people/?random=3.6380008339906844",
        },
        LikedUsers: [],
        isLiked: false,
        totalLikes: 0,
      },
      {
        id: 8,
        userId: 3,
        description: "Occaecati facere voluptatem.",
        createdAt: "2022-05-13T02:29:37.000Z",
        updatedAt: "2022-05-13T02:29:37.000Z",
        User: {
          id: 3,
          account: "user3",
          name: "user3",
          avatar:
            "https://loremflickr.com/320/240/people/?random=3.6380008339906844",
        },
        LikedUsers: [],
        isLiked: false,
        totalLikes: 0,
      },
      {
        id: 4,
        userId: 4,
        description: "Officiis natus et excepturi.",
        createdAt: "2022-05-13T02:29:37.000Z",
        updatedAt: "2022-05-13T02:29:37.000Z",
        User: {
          id: 4,
          account: "user4",
          name: "user4",
          avatar:
            "https://loremflickr.com/320/240/people/?random=83.15813488989394",
        },
        LikedUsers: [],
        isLiked: false,
        totalLikes: 0,
      },
      {
        id: 9,
        userId: 4,
        description: "Eos fugiat facere.",
        createdAt: "2022-05-13T02:29:37.000Z",
        updatedAt: "2022-05-13T02:29:37.000Z",
        User: {
          id: 4,
          account: "user4",
          name: "user4",
          avatar:
            "https://loremflickr.com/320/240/people/?random=83.15813488989394",
        },
        LikedUsers: [],
        isLiked: false,
        totalLikes: 0,
      },
      {
        id: 5,
        userId: 5,
        description: "Odit unde optio earum et ea eveniet sed sed cumque.",
        createdAt: "2022-05-13T02:29:37.000Z",
        updatedAt: "2022-05-13T02:29:37.000Z",
        User: {
          id: 5,
          account: "user5",
          name: "user5",
          avatar:
            "https://loremflickr.com/320/240/people/?random=31.83724283174456",
        },
        LikedUsers: [
          {
            id: 1,
            account: "user1",
            name: "user1",
            avatar:
              "https://loremflickr.com/320/240/people/?random=81.32293907231949",
            Like: {
              id: 34,
              userId: 1,
              tweetId: 5,
              createdAt: "2022-05-13T13:49:54.000Z",
              updatedAt: "2022-05-13T13:49:54.000Z",
            },
          },
        ],
        isLiked: true,
        totalLikes: 1,
      },
    ],
    pagination: {
      pages: [1, 2, 3, 4, 5, 6],
      totalPage: 6,
      currentPage: 1,
      prev: 1,
      next: 2,
    },
  },
  message: "",
};

import navigation from "../components/nav";
import followTop from "../components/followTop";
import popupTweet from "../components/popupTweet";

export default {
  name: "mainPage",
  components: {
    navigation,
    followTop,
    popupTweet,
  },
  data() {
    return {
      tweets: [],
      isClickPopupTweet: false,
    };
  },

  created() {
    this.featchTweets();
  },
  methods: {
    featchTweets() {
      const { tweets } = dummyTweets.data;
      this.tweets = tweets;
    },
    openPopupTweet() {
      console.log(this.isClickPopupTweet);
      this.isClickPopupTweet = true;
    },
    closePopupTweet(payload) {
      const { isClickPopupTweet } = payload;
      this.isClickPopupTweet = isClickPopupTweet;

      console.log("closePopupTweet", this.isClickPopupTweet);
    },
  },
};
</script>

<style lang="css" src="@/assets/css/main.css" scoped></style>


