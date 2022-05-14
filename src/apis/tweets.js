import { apiHelper } from "../utils/helpers";
const getToken = () => localStorage.getItem('token')

export default {
  getTweets() {
    return apiHelper.get('/api/tweets', {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
  }
}