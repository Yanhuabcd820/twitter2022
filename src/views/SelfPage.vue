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

    <followTop
      :initialUser="currentUser"
      :otherUser="user"
      :ifFollowOtherUser="ifFollowOtherUser"
      :followOtherId="followOtherId"
      @if-change-btn-color="ifChangeBtnColor"
      @add-following-num="addFollowingNum"
      @un-following-num="unFollowingNum"
    />
    <!-- 
    <followTop
      :initialUser="currentUser"
      :otherUser="user"
      @if-follow-this-other-user="ifFollowThisOtherUser"
      :ifFollowOtherUser="ifFollowOtherUser"
      :followOtherId="followOtherId"
      @if-change-btn-color="ifChangeBtnColor"
      @add-following-num="addFollowingNum"
      @un-following-num="unFollowingNum"
    /> -->
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
        tweetsCount: 0,
      },
      tweets: [],
      isMe: true,
      isClickPopupEditModal: false,
      isClickPopupReplyTweet: false,
      tweetPopup: {},
      ifFollowOtherUser: false,
      followOtherId: -1,
      changeBtnColor: false,
      myFollowingList: [],
      ifFollow: false, //我有沒有追蹤這位otherUser
    };
  },
  methods: {
    // confirmiFollowOtherUser() {
    //   this.ifFollowOtherUser = this.user.isFollowing;
    //   console.log("confirmiFollowOtherUser", this.ifFollowOtherUser);
    // },

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
          createdAt,
          updatedAt,
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
          createdAt,
          updatedAt,
          tweetsCount,
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
    async confirmUserFollowing(userId) {
      // 先抓我的跟隨清單
      try {
        const dataFollowing = await userAPI.getFollowing(userId);
        this.myFollowingList = dataFollowing.data;

        //確認我有是否已經追蹤此otherUser
        this.ifFollowOtherUser = this.myFollowingList.some(
          (follow) => follow.followingId === this.user.id
        );
        // console.log("this.myFollowingList", this.myFollowingList);
        // console.log("this.user.id", this.user.id);
      } catch (error) {
        console.log("error", error);
      }
    },
    ifFollowThisOtherUser(payload) {
      //告訴followTop要變換OtherUser的按鈕顏色
      const { ifFollowOtherUser, followOtherId } = payload;
      this.ifFollowOtherUser = ifFollowOtherUser;
      this.followOtherId = followOtherId;
      console.log("this.ifFollowOtherUser", this.ifFollowOtherUser);
    },
    ifChangeBtnColor(payload) {
      //告訴userInfoOther要變換按鈕顏色
      const { changeBtnColor } = payload;
      // this.changeBtnColor = changeBtnColor;
      // console.log("changeBtnColor.payload", payload);
      this.ifFollowOtherUser = changeBtnColor;
      console.log("payload.changeBtnColor", this.ifFollowOtherUser);
    },

    async fetchTweets(userId) {
      try {
        const response = await userAPI.getUserTweets(userId);
        this.tweets = [...response.data];
        // 解決傳送到popupReply中資料不夠的問題
        this.tweets = this.tweets.map((tweet) => {
          return {
            ...tweet,
            User: {
              name: this.user.name,
              account: this.user.account,
              avatar: this.user.avatar,
            },
          };
        });
        //console.log(this.tweets)
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
        const { comment, TweetId } = payload;
        console.log("payload", payload);
        console.log("comment, TweetId ", comment, TweetId);
        await tweetsApi.postTweetsReply({
          comment,
          TweetId,
        });
        // if (data.data.status !== "Success") {
        //   throw new Error(data.message);
        // }

        // 成功的話則轉址到 `/tweets/:id`
        this.$router.push({ name: "tweet", params: { id: TweetId } });
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法新增此筆tweetReply",
        });
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
          title: "無法新增此筆addFollowingNum",
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
          title: "無法新增此筆unFollowingNum",
        });
      }
    },
    async addLike(TweetId) {
      try {
        await userAPI.addLike({ TweetId });
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
    isThisMe(paramsId) {
      //console.log('params', paramsId)
      //console.log('vuex',this.currentUser.id)
      //console.log(this.isMe)
      // console.log("paramsId", paramsId);
      this.isMe = this.currentUser.id == paramsId; // 驗證是不是我
      // console.log("isMe", this.isMe);
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
    // this.confirmiFollowOtherUser();
    this.confirmUserFollowing(this.currentUser.id);
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

