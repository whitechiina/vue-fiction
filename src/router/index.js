import Vue from 'vue';
import Router from 'vue-router';
import Home from '../components/Home/Home';
import Classify from '../components/Classify/Classify.vue';
import Category from '../components/Category/Category.vue';

import Rank from '@/components/Rank/Rank.vue';
import RankList from '@/components/Rank/RankList';

import Search from '@/components/Search/Search.vue';
import Bookshelf from '@/components/Bookshelf/bookshelf.vue';
import Me from '@/components/Me/Me.vue';

import Bookinfo from '@/components/Book/bookinfo';
import Readbook from '@/components/Readbook/Readbook';


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {keepAlive: true}
    },
    {
      path: '/classify',
      name: 'Classify',
      component: Classify,
      meta: {keepAlive: true}
    },
    {
      path: '/category',
      name: 'Category',
      component: Category,
      meta: {keepAlive: true}
    },
    {
      path: '/rank',
      name: 'Rank',
      component: Rank,
      meta: {keepAlive: true}
    },
    {
      path: '/ranklist',
      name: 'RankList',
      component: RankList,
      meta: {keepAlive: true}
    },
    {
      path: '/search',
      name: 'Search',
      component: Search,
      meta: {keepAlive: true}
    },
    {
      path: '/bookshelf',
      name: 'Bookshelf',
      component: Bookshelf,
      meta: {keepAlive: true}
    },
    {
      path: '/readbook',
      name: 'Readbook',
      component: Readbook,
      meta: {keepAlive: true}
    },
    {
      path: '/me',
      name: 'Me',
      component: Me,
      meta: {keepAlive: true}
    },
    {
      path: '/bookinfo',
      name: 'Bookinfo',
      component: Bookinfo,
      meta: {keepAlive: true}
    }
  ]
})
