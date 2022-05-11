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
          title: '推文',
          path: '/PersonalPage'
        },
        {
          id: uuidv4(),
          title: '推文與回覆',
          path: '/PersonalPage/reply'
        },
        {
          id: uuidv4(),
          title: '喜歡的內容',
          path: '/PersonalPage/likes'
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
}
li:first-child {
  margin-left: 50px;
}
li {
  margin-right: 100px;
}
.nav-link {
  font-size: 15px;
  color: #657786;
  position: relative;
}

.router-link-exact-active {
  color: var(--main-color);
}
.router-link-exact-active::after {
  width: 130px;
  height: 2px;
  background-color: var(--main-color);
  content: '';
  position: absolute;
  top: 30px;
  left: 0;
  transform: translateX(-50%);
}
</style>