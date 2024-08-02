<template>
  <ul class="tree-menu">
    <li v-for="item in list" :key="item.menuNo" class="py-2" v-if="list.length > 0">
      <div v-if="item.subMenuMap && Object.keys(item.subMenuMap).length > 0">
        <button class="btn items-center flex justify-between" :class="{'active': item.isOpen}" @click="toggle(item)" :aria-expanded="item.isOpen">
          <span><i :class="item.menuLogo" class="mr-2 blue" v-if="item.menuLogo"></i>{{ item.menuName}}</span>
          <i class="fas fa-angle-right"></i>
        </button>
        <div v-if="item.isOpen && item.subMenuMap && Object.keys(item.subMenuMap).length > 0" class="show">
          <common-menu :menu-items="transform(item.subMenuMap)" class="sub"></common-menu>
        </div>
      </div>
      <div v-else class="subItem">
        <router-link :to="item.menuHref">{{ item.menuName }}</router-link>
      </div>
    </li>
  </ul>
</template>

<script setup>
import { cloneDeep } from 'lodash-es'
const props = defineProps({
  menuItems: {
    type: Array,
    default: () => [],
  },
})
const list = ref([])
watchEffect(() => {
  list.value = cloneDeep(props.menuItems)
})
const transform = (e) => {
  const arr = []
  Object.keys(e).forEach(f => {
    e[f].isOpen = false
    e[f].menuLogo = e[f].menuLogo ? e[f].menuLogo:'fas fa-folder-open pl-1 ml-2'
    arr.push(e[f])
  })
  return arr
}
const toggle = (item) => {
  if (!item.subMenuMap) {
    item.subMenuMap = {};
  }
  item.isOpen = !item.isOpen;
};
</script>

<style scoped>
.tree-menu:not(.sub) {
  width: 320px;
  list-style-type: none;
  padding: 1.2rem 1.5rem 0 2.2rem;
  margin-bottom: 4rem;
}
.btn {
  font-size: .875rem;
  font-weight: 600;
  width: 100%;
  text-align: start;
  padding-bottom: 0;
  color: #546E7A;
  font-size: 16px;
}
.sub .btn {
  font-size: 0.92em;
}
.blue {
  color: #9ED0DB;
}
.active {
  color: #368FA3;
}
.subItem a {
  padding-left: 1.2rem;
  font-size: .875em;
  text-decoration: none;
  display: block;
}
.subItem a:hover, .subItem a:focus, .subItem .active {
    padding-top: 0.25rem;
    padding-bottom: 0.25rem;
    background-color: #368FA3;
    color: #FFF;
    border-left: solid 5px #FF9F1A;
}
.show .tree-menu {
  margin-left: 2rem;
  border-left: 1px solid #9ED0DB;
  margin-bottom: auto;
}
.active .fa-angle-right {
  transform: rotate(90deg);
}
.sub li {
  padding: 0.25rem 0 0.25rem 0;
}
</style>