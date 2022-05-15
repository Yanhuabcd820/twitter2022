import { apiHelper } from './../utils/helpers'
const getToken = () => localStorage.getItem('token')

export default {
  getCurrentUser() {   // not yet did
    return apiHelper.get(`/get_current_user`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
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
  // deleteLike({ tweetId }) {
  //   return apiHelper.delete(`/api/tweets/${tweetId
  //     }/unlike`, {
  //     headers: { Authorization: `Bearer ${getToken()}` }
  //   })
  // }
}