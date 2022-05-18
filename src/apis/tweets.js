import { apiHelper } from "../utils/helpers";
const getToken = () => localStorage.getItem('token')

export default {
  getTweets() {
    return apiHelper.get('/api/tweets', {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
  },

  postTweets({ description }) {
    return apiHelper.post('/api/tweets', { description }, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },

  getTweetReplies(tweetId) {
    return apiHelper.get(`/api/tweets/${tweetId}/replies`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
  },
  postTweetsReply({ comment, tweetId }) {
    return apiHelper.post(`/api/tweets/${tweetId}/replies`, { comment, tweetId }, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },

  getTweet(tweetId) {
    return apiHelper.get(`/api/tweets/${tweetId}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
  },

  // getReplies(tweetId) {
  //   return apiHelper.get(`/api/tweets/${tweetId}/replies`, {
  //     headers: {
  //       Authorization: `Bearer ${getToken()}`
  //     }
  //   })
  // },

  // getReplies() {
  //   return apiHelper.get('/api/tweets', {
  //     headers: {
  //       Authorization: `Bearer ${getToken()}`
  //     }
  //   })
  // },
}