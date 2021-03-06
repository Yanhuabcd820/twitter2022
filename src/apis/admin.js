import { apiHelper } from "../utils/helpers";
const getToken = () => localStorage.getItem('token')

export default {
  signInAdmin({account, password}){
    return apiHelper.post('/api/admin/users', {
      account,
      password
    })
  },
  getUsersAdmin() {
    return apiHelper.get(`/api/admin/users`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  getTweetsAdmin() {
    return apiHelper.get(`/api/admin/tweets`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  deleteTweetsAdmin(tweetId) {
    return apiHelper.delete(`/api/admin/tweets/${tweetId}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  }
}