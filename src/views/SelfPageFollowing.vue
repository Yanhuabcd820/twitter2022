<template>
  <div class="wrap">
    <navigation />
    <div class="main">
      <userTitle :userName="user.name"/>
      <navTabsFollow :userId="$route.params.id"/>
      <div class="tweet-wrap">
        <div class="tweet-card" v-for="followship in followships" :key="followship.id">
          <div class="tweet-avatar">
            <img src="../assets/images/avatar_default.png" alt="" />
          </div>
          <div class="tweet-content">
            <div class="tweet-title">
              <div class="tweet-name-group">
                <p class="tweet-name"><b>{{followship.User.name}}</b></p>
                <div class="btn">正在跟隨</div>
              </div>
              
            </div>
            <div class="tweet-text">
              <p>
                {{followship.User.introduction}}
              </p>
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
import userTitle from "../components/userTitle.vue"
import navTabsFollow from "../components/navTabsFollow";

const dummyUser = {
  "id": 1,
  "account": "heyjohn",
  "name": "John Doe",
  "email": "root@example.com",
  "role": "admin",
  "introduction": "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.",
  "avatar": "../assets/images/AvatarBigger.png",
  "cover": "../assets/images/cover.png",
  "followingCount": 34,
  "followerCount": 59,
  "isFollowing": true,
  "createdAt": "2022-01-18T07:23:18.000Z",
  "updatedAt": "2022-01-18T07:23:18.000Z"
}

const dummyData = {
  "followships": [
    {
      "User": {
        "id": 2,
        "name": "Apple",
        "avatar": "https://via.placeholder.com/300",
        "introduction": "I'm pretty."
      },
      "isFollowing": true
    },
    {
      "User": {
        "id": 3,
        "name": "Orange",
        "avatar": "https://via.placeholder.com/300",
        "introduction": "I'm pretty."
      },
      "isFollowing": true
    }
  ]
}

export default {
  name: "mainPage",
  components: {
    navigation,
    followTop,
    userTitle,
    navTabsFollow
  },
  data() {
    return {
      user: {
        name:"",
        tweetNum: -1
      },
      followships: []
    };
  },
  methods: {
    fetchData(){
      this.user.name = dummyUser.name
      this.user.tweetNum = 2
      this.followships = dummyData.followships
    }
  },
  created(){
    this.fetchData()
  }
};
</script>

<style lang="css" src="@/assets/css/main.css" scoped></style>

<style scoped>
.tweet-name-group {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
</style>
