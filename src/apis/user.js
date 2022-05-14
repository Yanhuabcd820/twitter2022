import { apiHelper } from './../utils/helpers'
const getToken = () => localStorage.getItem('token')

export default {
  getUser ( userId ) {
    return apiHelper.get(`/api/users/${userId}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  getUserTweets ( userId ) {
    return apiHelper.get(`/api/users/${userId}/tweets`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  }
}