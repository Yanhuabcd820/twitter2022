import { apiHelper } from './../utils/helpers'
const getToken = () => localStorage.getItem('token')

export default {
  addFollow({ id }) {
    return apiHelper.post(`/api/followships`, { id }, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  // unFollow({ tweetId }) {
  //   return apiHelper.post(`/api/tweets/${tweetId
  //     }/unlike`, null, {
  //     headers: { Authorization: `Bearer ${getToken()}` }
  //   })
  // },
}