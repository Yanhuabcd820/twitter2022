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
  getTweet(id) {
    return apiHelper.get(`/api/tweets/${id
}`, {
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

  getTweetReplies(TweetId) {
    return apiHelper.get(`/api/tweets/${TweetId
}/replies`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
  },
  postTweetsReply({ comment, TweetId }) {
    return apiHelper.post(`/api/tweets/${TweetId
      }/replies`, { comment, TweetId }, {
      headers: { Authorization: `Bearer ${getToken()}` }
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