<template>
  <div id="app">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
        <Tabs v-if="$route.path!=='/category'"></Tabs>
  </div>
</template>

<script>
import Tabs from './components/Tabs/Tabs'
export default {
  name: 'App',
  components: {
    Tabs
  }
}
</script>

<style>
</style>
