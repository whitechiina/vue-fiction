// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import less from 'less';
import './assets/style/reset.styl';
import './assets/icon/iconfont';


import VueLazyload from 'vue-lazyload';
import VueAwesomeSwiper from 'vue-awesome-swiper';

Vue.use(VueLazyload, {
  loading: require('@/assets/image/loading.gif'),//加载中图片，一定要有，不然会一直重复加载占位图
  error: require('@/assets/image/lazy-loading.jpg')  //加载失败图片
});

Vue.use(VueAwesomeSwiper)

Vue.use(less)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
