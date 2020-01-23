<template>
    <div>
        <div class="hot">
            <div class="hot-title">
                <span></span>
                <h3>热门追更</h3>
                <p>查看更多</p>
                <i>
                   <svg class="icon cuowu" aria-hidden="true">
                     <use xlink:href="#icon-xingzhuanggongnengtubiao-"></use>
                   </svg> 
                </i>
            </div>
            <div class="hot-content">
                <div class="hot-wrap">
                    <div class="hot-item" v-for="(item, index) in hot" :key="index" @click="bookdetail(item)">
                       <div class="hot-left">
                           <img v-lazy="image + item.cover">
                       </div>
                       <div class="hot-right">
                            <h1>{{item.title}}</h1>
                            <p>{{item.shortIntro}}</p>
                            <div class="book-info">
                                <div class="book-author">{{item.author}}</div>
                                <div class="book-des">
                                    <span>{{item.majorCate}}</span>
                                    <span>{{item.retentionRatio}}万</span>
                                </div>
                            </div>
                       </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </template>
  
<script>
import api from '@/server/api';
import { RouterLink } from '@/utils/routerlink'

export default {
    name: 'Hot',
    data() {
        return {
            image:'http://statics.zhuishushenqi.com',
            hot: []
        }
    },

    created(){
        this._getHot()
    },
    
    methods: {
        _getHot(){
            api.getRank('564547c694f1c6a144ec979b').then(res => {
                    this.hot = res.data.ranking.books.slice(0,3)
                })
        },

        bookdetail(item){
            RouterLink({ path: '/bookinfo', query: { id: item._id, title: item.title, monthId: item.monthRank, totalId: item.totalRank }})
        },
    },
}
</script>
  
<style lang="stylus" scoped>
    @import '../assets/style/hot.styl';
</style>
  