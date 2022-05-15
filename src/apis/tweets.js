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
  postTweets: {
    create({ formData }) {
      return apiHelper.post('/api/tweets', formData, {
        headers: { Authorization: `Bearer ${getToken()}` }
      })
    }
  },
  getReplies() {
    return apiHelper.get('/api/tweets', {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
  },
  // getReplies() {
  //   return apiHelper.get('/api/tweets', {
  //     headers: {
  //       Authorization: `Bearer ${getToken()}`
  //     }
  //   })
  // },
}