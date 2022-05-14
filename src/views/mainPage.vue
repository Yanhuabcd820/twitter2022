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
            <img :src="avatar" alt="" />
          </div>
          <h5>有什麼新鮮事？</h5>
        </div>
        <div class="post-inner-btn">
          <div class="btn active">推文</div>
        </div>
      </div>
      <div class="tweet-wrap">
        <div
          class="tweet-card"
          v-for="tweet in tweets"
          :key="tweet.id"
          @after-create-tweet="afterCreateTweet"
        >
          <div class="tweet-avatar">
            <img :src="tweet.User.avatar" alt="" />
          </div>
          <div class="tweet-content">
            <div class="tweet-name-group">
              <p class="tweet-name">
                <b>{{ tweet.User.name }}</b>
              </p>
              <p class="tweet-account fz14">
                @{{ tweet.User.account }}・{{ tweet.createdAt | fromNow }}
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
                  <img
                    src="../assets/images/tweet-like.png"
                    alt=""
                    v-if="!tweet.isLiked"
                  />
                  <img
                    src="../assets/images/tweet-like-active.png"
                    alt=""
                    v-if="tweet.isLiked"
                  />
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
const dummyTweets = {
  status: "Success",
  statusCode: 200,
  data: {
    tweets: [
      {
        id: 3,
        userId: 3,
        description: "Eveniet non illo quasi quos nulla debitis.",
        createdAt: "2022-05-13T15:55:17.000Z",
        updatedAt: "2022-05-13T15:55:17.000Z",
        User: {
          id: 3,
          account: "user3",
          name: "user3",
          avatar:
            "https://loremflickr.com/320/240/people/?random=69.43540081532018",
        },
        LikedUsers: [],
        isLiked: true,
        totalLikes: 1,
      },
      {
        id: 4,
        userId: 4,
        description:
          "Commodi cumque vitae molestias repellendus veniam exercitationem numquam nihil.",
        createdAt: "2022-05-13T15:55:17.000Z",
        updatedAt: "2022-05-13T15:55:17.000Z",
        User: {
          id: 4,
          account: "user4",
          name: "user4",
          avatar:
            "https://loremflickr.com/320/240/people/?random=28.458104852099787",
        },
        LikedUsers: [],
        isLiked: false,
        totalLikes: 0,
      },
      {
        id: 5,
        userId: 5,
        description: "Laborum adipisci iste.",
        createdAt: "2022-05-13T15:55:17.000Z",
        updatedAt: "2022-05-13T15:55:17.000Z",
        User: {
          id: 5,
          account: "user5",
          name: "user5",
          avatar:
            "https://loremflickr.com/320/240/people/?random=47.108871033329415",
        },
        LikedUsers: [],
        isLiked: false,
        totalLikes: 0,
      },
      {
        id: 6,
        userId: 1,
        description:
          "Odit eaque dolor ullam molestias libero optio et veritatis.",
        createdAt: "2022-05-13T15:55:17.000Z",
        updatedAt: "2022-05-13T15:55:17.000Z",
        User: {
          id: 1,
          account: "user1",
          name: "user1",
          avatar:
            "https://loremflickr.com/320/240/people/?random=73.0908396968221",
        },
        LikedUsers: [],
        isLiked: false,
        totalLikes: 0,
      },
      {
        id: 7,
        userId: 2,
        description: "Sint voluptas dolore occaecati qui.",
        createdAt: "2022-05-13T15:55:17.000Z",
        updatedAt: "2022-05-13T15:55:17.000Z",
        User: {
          id: 2,
          account: "user2",
          name: "user2",
          avatar:
            "https://loremflickr.com/320/240/people/?random=73.3635043604953",
        },
        LikedUsers: [],
        isLiked: false,
        totalLikes: 0,
      },
      {
        id: 8,
        userId: 3,
        description: "Eaque ducimus omnis nam nam quo maiores omnis.",
        createdAt: "2022-05-13T15:55:17.000Z",
        updatedAt: "2022-05-13T15:55:17.000Z",
        User: {
          id: 3,
          account: "user3",
          name: "user3",
          avatar:
            "https://loremflickr.com/320/240/people/?random=69.43540081532018",
        },
        LikedUsers: [],
        isLiked: false,
        totalLikes: 0,
      },
      {
        id: 1,
        userId: 1,
        description: "Eligendi voluptatem similique cumque.",
        createdAt: "2022-05-13T15:55:17.000Z",
        updatedAt: "2022-05-13T15:55:17.000Z",
        User: {
          id: 1,
          account: "user1",
          name: "user1",
          avatar:
            "https://loremflickr.com/320/240/people/?random=73.0908396968221",
        },
        LikedUsers: [],
        isLiked: false,
        totalLikes: 0,
      },
      {
        id: 9,
        userId: 4,
        description: "Vel ea architecto.",
        createdAt: "2022-05-13T15:55:17.000Z",
        updatedAt: "2022-05-13T15:55:17.000Z",
        User: {
          id: 4,
          account: "user4",
          name: "user4",
          avatar:
            "https://loremflickr.com/320/240/people/?random=28.458104852099787",
        },
        LikedUsers: [],
        isLiked: false,
        totalLikes: 0,
      },
      {
        id: 2,
        userId: 2,
        description: "Ab sint rem.",
        createdAt: "2022-05-13T15:55:17.000Z",
        updatedAt: "2022-05-13T15:55:17.000Z",
        User: {
          id: 2,
          account: "user2",
          name: "user2",
          avatar:
            "https://loremflickr.com/320/240/people/?random=73.3635043604953",
        },
        LikedUsers: [],
        isLiked: false,
        totalLikes: 0,
      },
      {
        id: 10,
        userId: 5,
        description:
          "Necessitatibus mollitia sit repellendus rerum reiciendis quia.",
        createdAt: "2022-05-13T15:55:17.000Z",
        updatedAt: "2022-05-13T15:55:17.000Z",
        User: {
          id: 5,
          account: "user5",
          name: "user5",
          avatar:
            "https://loremflickr.com/320/240/people/?random=47.108871033329415",
        },
        LikedUsers: [],
        isLiked: false,
        totalLikes: 0,
      },
    ],
    pagination: {
      pages: [1, 2, 3, 4, 5],
      totalPage: 5,
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
import { fromNowFilter } from "./../utils/mixins";

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
  methods: {
    featcUser() {
      const { tweets } = dummyTweets.data;
      this.tweets = tweets;
    },
    featchTweets() {
      const { avatar } = dummyUser.user;
      this.avatar = avatar;
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
    afterCreateTweet(payload) {
      const { tweetId, tweetText } = payload;
      console.log(tweetText);
      console.log(tweetId);
      // this.tweets.push({
      //   id: tweetId,
      //   description: tweetText,
      // });
      // console.log(payload);
    },
  },

  created() {
    this.featcUser();
    this.featchTweets();
  },
  mixins: [fromNowFilter],
};
</script>

<style lang="css" src="@/assets/css/main.css" scoped></style>


