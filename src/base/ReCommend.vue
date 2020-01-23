<template>
    <div>
        <div class="commend">
            <div class="commend-title">
                <span></span>
                <h3>主编力荐</h3>
                <p>查看更多</p>
                <i>
                   <svg class="icon cuowu" aria-hidden="true">
                     <use xlink:href="#icon-xingzhuanggongnengtubiao-"></use>
                   </svg> 
                </i>
            </div>
            <div class="commend-book" v-for="(item, index) in book" :key="index" @click="gobook(item)">
                <div class="book-left">
                    <img v-lazy="item.cover">
                </div>
                <div class="book-right">
                    <h1>{{item.title}}</h1>
                    <p>
                        {{item.shortIntro}}
                    </p>
                    <div class="book-info">
                        <div class="book-author">
                            ♂{{item.author}}
                        </div>
                        <div class="book-lable">
                            <span>{{item.majorCate}}</span>
                            <span>{{item.minorCate}}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="commend-three">
                <div class="book-item" v-for="(item, index) in books" :key="index" @click="gobook(item)">
                    <img v-lazy="item.cover">
                    <p class="title">{{item.title}}</p>
                    <p class="des">{{item.author}}</p>
                </div>
            </div>
        </div>
    </div>
  </template>
  
<script>
import api from '@/server/api';
import { RouterLink } from '@/utils/routerlink'

export default {
    name: 'Recommend',
    data(){
        return{
            image:'http://statics.zhuishushenqi.com',
            book: [],
            books: []
        }
    },

    created(){
        this._getRankList()
    },
    methods:{
        _getRankList(){
            api.getRank('54d42d92321052167dfb75e3').then(res => {
                if (res.data.ok) {
                    console.log(res)
                    this.books = this._unEscape(res.data.ranking.books.slice(1, 4));
                    this.book = this._unEscape(res.data.ranking.books.slice(0,1));
                }
            })
        },
        
        // 转译获取到的图片地址
        _unEscape(arr){
        for (let i = 0; i < arr.length; i++) {
          arr[i].cover = unescape(arr[i].cover);
          arr[i].cover = arr[i].cover.replace("/agent/", "")
        }
        return arr
        },

        gobook(item){
            RouterLink({ path: '/bookinfo', query: { id: item._id, title: item.title, monthId: item.monthRank, totalId: item.totalRank }})
        },
        
    },

}
</script>
  
<style lang="stylus" scoped>
.commend
    padding 0 1rem
    .commend-title
        display flex
        width 100%;
        height 3.125rem
        line-height 3.125rem
        vertical-align middle
        color #5b5b59
        span
            display block
            height 1.125rem
            width 0.1875rem
            background #43bb57
            vertical-align middle
            margin-right 0.25rem
            margin-top 1rem
        h3
            flex 1
            display inline-block
        p
            font-size 0.8rem
            font-weight normal
            vertical-align baseline
        i
            margin-top 0.2rem
    .commend-book
        width 100%
        height 7.8125rem
        padding 0.75rem 0
        border-bottom 1px solid #f5f5f5
        display flex
        .book-left
            width: 5.625rem;
            margin-right: 1rem;
            height: 100%;
            img
                width 100%
                height 100%
                border-radius: 0.25rem
                border 1px solid #f5f5f5
        .book-right
            flex 1
            display flex
            height 100%
            flex-direction column
            h1
                font-size: 1rem
                color: #101010
                height: 2rem
                line-height: 2rem
                display: -webkit-box
                display: -moz-box
                overflow: hidden
            p
                font-size 0.875rem
                text-indent 1.5em
                color #9d9d9b
                line-height 1.25rem
                height 3.6875rem
                overflow hidden
            .book-info
                display flex
                position relative
                top 2rem
                width 100%
                vertical-align bottom
                .book-author
                    position: absolute
                    left: 0
                    bottom: 0
                    font-size: 0.75rem
                    color: #9d9d9b
                    flex 1
                .book-lable
                    position: absolute
                    right: 0
                    bottom: 0
                    font-size: 0.625rem
                    color: #9d9d9b
                    span
                        font-size: 0.75rem
                        color: #9d9d9b
                        display: inline-block
                        height: 0.75rem
                        line-height: 0.75rem
                        padding: 0.125rem 0.125rem
                        border: 1px solid #9d9d9b
    .commend-three
        display: flex
        justify-content: space-between
        padding: 0.75rem 0
        height: 11.875rem
        width: 100%
        .book-item
            width: 5.625rem
            height: 100%
            display: flex
            flex-direction: column
            img
                width: 100%
                height: 7.8125rem
                border-radius: 0.25rem
            .title
                font-size: 0.875rem
                color: #5b5b59
                margin: 0.625rem 0
                display: -webkit-box
                display: -moz-box
                overflow: hidden 
            .des
                height: 1rem
                font-size: 0.75rem
                color: #9d9d9b

</style>
  