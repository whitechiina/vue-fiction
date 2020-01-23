<template>
    <div>
        <div class="title">首页</div>
        <Banner></Banner>
    </div>
  </template>
  
<script>
import Banner from '@/base/banner';
import axios from 'axios';
import api from '../../server/api.js'
export default {
    name: 'Index',
    components: {
        Banner,
    }
}

</script>
  
<style lang="stylus" scoped>
    .title
        z-index: 99;
        position fixed
        top 0
        left 0
        right 0
        height 2.75rem
        background #43bb57
        font-size 1.125rem
        color #fff
        text-align center
        line-height 2.75rem
</style>
  