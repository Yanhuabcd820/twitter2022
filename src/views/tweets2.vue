<template>
  <div class="wrap">
    <popupTweet
      v-if="isClickPopupTweet"
      @close-PopupTweet="closePopupTweet"
      @after-create-tweet="afterCreateTweet"
      :user="user"
    />
    <navigation />
    <div class="main">
      <div class="user-title">
        <h4>首頁</h4>
      </div>
      <div class="post">
        <div class="post-inner">
          <router-link to="/user/1" class="post-avatar">
            <img :src="user.avatar" alt="" />
          </router-link>
        </div>
        <div class="post-inner-tweet" @click.prevent.stop="openPopupTweet">
          <h5>有什麼新鮮事？</h5>
          <div class="post-inner-btn">
            <div class="btn active">推文</div>
          </div>
        </div>
      </div>
      <div class="tweet-wrap">
        <div class="tweet-card" v-for="tweet in tweets" :key="tweet.id">
          <popupReply
            v-if="whichPopupReply === tweet.id"
            @close-PopupReply="closePopupReply"
            :tweet="tweet"
            :user="user"
            @after-create-reply="afterCreateReply"
          />
          <router-link
            :to="{ name: 'SelfPage', params: { id: tweet.User.id } }"
            class="tweet-avatar"
          >
            <img :src="tweet.User.avatar" alt="" />
          </router-link>
          <router-link
            :to="{ name: 'tweet', params: { id: tweet.User.id } }"
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
          </router-link>
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
const dummyTweetsReplies = {
  status: "Success",
  statusCode: 200,
  data: {
    replies: [
      {
        id: 151,
        userId: 1,
        tweetId: 1,
        comment: "阿，就沒有其他人的token阿",
        createdAt: "2022-05-14T16:01:17.000Z",
        updatedAt: "2022-05-14T16:01:17.000Z",
        User: {
          id: 1,
          account: "user1",
          name: "user1",
          avatar:
            "https://loremflickr.com/320/240/people/?random=73.0908396968221",
        },
        LikedUsers: [],
        isLiked: false,
      },
      {
        id: 1,
        userId: 3,
        tweetId: 1,
        comment: "Voluptas accusamus voluptas nostrum libero.",
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
      },
      {
        id: 51,
        userId: 3,
        tweetId: 1,
        comment: "Fugiat voluptatem dignissimos.",
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
      },
      {
        id: 101,
        userId: 2,
        tweetId: 1,
        comment: "Qui minus est et corporis soluta sequi ut minima sed.",
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
      },
    ],
  },
  message: "",
};
import navigation from "../components/nav";
import followTop from "../components/followTop";
import popupTweet from "../components/popupTweet";
import popupReply from "../components/popupReply";
import tweets from "../apis/tweets";

import { fromNowFilter } from "./../utils/mixins";

export default {
  name: "mainPage",
  components: {
    navigation,
    followTop,
    popupTweet,
    popupReply,
  },
  data() {
    return {
      user: dummyUser.user,
      tweets: [],
      replies: [],
      // tweet: {
      //   id: -1,
      //   userId: -1,
      //   description: "",
      //   createdAt: "",
      //   updatedAt: "",
      //   User: {
      //     id: -1,
      //     account: "",
      //     name: "",
      //     avatar: "",
      //   },
      //   LikedUsers: [],
      //   isLiked: false,
      //   totalLikes: 0,
      // },
      isClickPopupTweet: false,
      // isClickPopupReply: false,
      whichPopupReply: -1,
    };
  },
  methods: {
    async featchTweets() {
      try{

      }catch(error){
        
      }
      const { tweets } = dummyTweets.data;
      this.tweets = tweets;
      const { replies } = dummyTweetsReplies.data;
      this.replies = replies;
    },
    afterCreateReply(payload) {
      const { replyText, replyId } = payload;
      console.log("payload", payload);
      this.replies.unshift({
        id: replyId,
        comment: replyText,
        User: {
          id: this.user.id,
          account: this.user.account,
          name: this.user.name,
          avatar: this.user.avatar,
        },
        createdAt: new Date(),
        totalLikes: 0,
      });
      /*關掉PopupTweet*/
      this.closePopupReply();
    },
    afterCreateTweet(payload) {
      const { tweetText, tweetId } = payload;
      console.log("payload", payload);
      this.tweets.unshift({
        id: tweetId,
        description: tweetText,
        User: {
          id: this.user.id,
          account: this.user.account,
          name: this.user.name,
          avatar: this.user.avatar,
        },
        createdAt: new Date(),
        totalLikes: 0,
      });
      /*關掉PopupTweet*/
      this.isClickPopupTweet = false;
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
      // console.log("tweetId", tweetId);
      //將彈跳視窗PopupReply打開,
      //讓whichPopupReply等於tweet.Id即成立
      this.whichPopupReply = tweetId;
    },
    closePopupReply() {
      //將彈跳視窗PopupReply關閉,
      //只要讓whichPopupReply不等於tweet.Id即可關閉
      this.whichPopupReply = -1;
    },
  },

  created() {
    this.featchTweets();
  },
  mixins: [fromNowFilter],
};
</script>

<style lang="css" src="@/assets/css/main.css" scoped></style>


