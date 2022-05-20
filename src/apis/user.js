import { apiHelper } from './../utils/helpers'
const getToken = () => localStorage.getItem('token')

export default {
  getUser(userId) {
    return apiHelper.get(`/api/users/${userId}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  getUserTweets(userId) {
    return apiHelper.get(`/api/users/${userId}/tweets`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  getUserReplies(userId) {
    return apiHelper.get(`/api/users/${userId}/replied_tweets`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  getUserLikes(userId) {
    return apiHelper.get(`/api/users/${userId}/likes`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  getUserFollowers(userId) {
    return apiHelper.get(`/api/users/${userId}/followers`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  getUserFollowings(userId) {
    return apiHelper.get(`/api/users/${userId}/followings`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  addLike({ tweetId }) {
    return apiHelper.post(`/api/tweets/${tweetId
      }/like`, null, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  unLike({ tweetId }) {
    return apiHelper.post(`/api/tweets/${tweetId
      }/unlike`, null, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  getTop() {
    return apiHelper.get(`/api/users/top10`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  }
}