import { apiHelper } from "../utils/helpers";
const getToken = () => localStorage.getItem('token')

export default {
  signIn({account, password}){
    return apiHelper.post('/api/users/signin', {
      account,
      password
    })
  },
  signUp({account, password, checkPassword, name, email}){
    return apiHelper.post('/api/users', {
      account,
      password,
      checkPassword,
      name,
      email
    })
  },
  updateUser(userId,{name,account,email,password,introduction,avatar,cover}){
    return apiHelper.put(`/api/users/${userId}`, {
      name,
      account,
      email,
      password,
      introduction,
      avatar,
      cover
    },{
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  getCurrentUser() {  
    return apiHelper.get(`/api/get_current_user`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
}