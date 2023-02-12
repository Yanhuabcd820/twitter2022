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
          path: '/UserPage/:id'
        },
        {
          id: uuidv4(),
          title: '推文與回覆',
          path: '/UserPage/:id/reply'
        },
        {
          id: uuidv4(),
          title: '喜歡的內容',
          path: '/UserPage/:id/likes'
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