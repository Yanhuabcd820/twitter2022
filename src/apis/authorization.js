import { apiHelper } from "../utils/helpers";

export default {
  signIn({account, password}){
    return apiHelper.post('/api/users/signin', {
      account,
      password
    })
  },
  signUp({account, password, confirmPassword, name, email}){
    return apiHelper.post('/api/users', {
      account,
      password,
      confirmPassword,
      name,
      email
    })
  }
}