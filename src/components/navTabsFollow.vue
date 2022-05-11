<template>
  <ul>
    <li class="nav-item" v-for="tab in tabs" :key="tab.id">
      <router-link
        :to="tab.path"
        class="nav-link"
      >
        {{ tab.title }}
      </router-link>
    </li>
  </ul>
</template>

<script>
import {v4 as uuidv4} from 'uuid'
export default {
  data(){
    return {
      tabs: [
        {
          id: uuidv4(),
          title: '跟隨者',
          path: '/SelfPage/Follower'
        },
        {
          id: uuidv4(),
          title: '正在跟隨',
          path: '/SelfPage/Following'
        }
      ]
    }
  }
}
</script>

<style scoped>
ul {
  display: flex;
  height: 52px;
  align-items: center;
  border-top: 1px solid #E6ECF0;
  border-bottom: 1px solid #E6ECF0;
}
li {
  width: 130px;
  text-align: center;
}
.nav-link {
  font-size: 15px;
  color: #657786;
  position: relative;
}
.router-link-exact-active {
  color: var(--main-color);
}
li .router-link-exact-active {
  border-bottom: var(--main-color) 2px solid;
}
</style>