import { apiHelper } from "../utils/helpers";

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
}