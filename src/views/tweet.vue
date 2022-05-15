<template>
  <div class="wrap">
    <popupReplyList
      v-if="isClickPopupReplyList"
      @close-PopupReplyList="closePopupReplyList"
    />
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
                @{{ tweet.User.account }}・{{ tweet.createdAt }}
              </p>
            </div>
          </div>
          <div class="reply-text">
            {{ tweet.description }}
          </div>
          <p class="fz14 reply-time">上午 10:05・2021年11月10日</p>
        </div>
        <div class="reply-count">
          <div class="reply-num"><span>34</span> 回覆</div>
          <div class="like-num">
            <span> {{ tweet.totalLikes }}</span> 喜歡次數
          </div>
        </div>
        <div class="reply-count-btn">
          <div class="reply-btn" @click.prevent.stop="openPopupReplyList">
            <img src="../assets/images/tweet-reply.png" alt="" />
          </div>
          <div class="like-btn">
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
                <p class="fz14"><b>76</b></p>
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
const dummyData = {
  tweet: {
    id: 56,
    userId: 1,
    description: "希望 Heroku 測試成功！！",
    createdAt: "2022-05-14T15:55:01.000Z",
    updatedAt: "2022-05-14T15:55:01.000Z",
    User: {
      id: 1,
      account: "user1",
      name: "user1",
      avatar: "https://loremflickr.com/320/240/people/?random=73.0908396968221",
    },
    LikedUsers: [],
    isLiked: false,
    totalLikes: 0,
  },
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
import popupReplyList from "../components/popupReplyList";
import { fromNowFilter } from "./../utils/mixins";
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
      replies: dummyTweetsReplies.data.replies,
      tweet: dummyData.tweet,
    };
  },
  methods: {
    openPopupReplyList() {
      // console.log(this.isClickPopupReplyList);
      this.isClickPopupReplyList = true;
    },
    closePopupReplyList(payload) {
      const { isClickPopupReplyList } = payload;
      this.isClickPopupReplyList = isClickPopupReplyList;
      // console.log("closePopupReplyList", this.isClickPopupReplyList);
    },
  },
  mixins: [fromNowFilter],
};
</script>

<style lang="css" src="@/assets/css/reply.css" scoped></style>