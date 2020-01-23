<template>
    <div>
        <div class="search-wrap">
            <div class="search">
                <i @click="GetSearch">
                    <svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-filedicon_search_gr"></use>
                    </svg>
                </i>
                <input ref="query" v-model="query" type="search" :placeholder="placeholder">
            </div>
            <i @click="GetSearch" class="sou" v-show="query">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-sousuo"></use>
                </svg>
            </i>
        </div>

        <div class="content">
            <div class="hot-title">
                <span></span>
                <h1>热门搜索</h1>
                <p @click="change()">换一批</p>
            </div>
            <div class="hot-list">
                <div class="hot-item" v-for="(item,index) in hots" :key="index">
                    <span>{{item.word}}</span>
                </div>
            </div>

            <div class="history-title">
                <span></span>
                <h1>热门历史</h1>
                <i>
                    <svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-lajitong"></use>
                    </svg>
                </i>
            </div>
            <ul class="history-list">
                <li class="history-item">
                    <span class="sousuo2">
                        <svg class="icon sousuo2" aria-hidden="true">
                          <use xlink:href="#icon-sousuo"></use>
                        </svg>
                    </span>
                    <p class="history-text">斗罗大陆IV终极斗罗</p>
                    <i  class="cuowu">
                        <svg class="icon cuowu" aria-hidden="true">
                          <use xlink:href="#icon-cuowu"></use>
                        </svg>
                    </i>
                </li>
            </ul>

        </div>

        <!-- 搜索列表组件 -->
        <search-list :list="list" :query="query" v-show="query"></search-list>
        
        
    </div>
  </template>
  
<script>
import SearchList from '@/base/SearchList'
import api from '../../server/api'
import { Indicator } from 'mint-ui'
import 'mint-ui/lib/style.css';

export default {
    name: 'Search',
    components: {
        SearchList,
    },
    data(){
        return {
            SearchHot:[],
            hotstar: 0,
            hotend: 10,
            text: '',
            list: [],
            query: '',
        }
    },
    props: {
      placeholder: {
        type: String,
        default: '请输入书名或作者名'
      }
    },
    computed: {
    // 选取十条数据
      hots () {
        return this.SearchHot.slice(this.hotstar, this.hotend)
      }
    },
    created(){
        this._getSearchHot();
        this.$watch('query', (newQuery) => {
            this.$emit('query', newQuery)
        })
    },
    methods: {
        _getSearchHot(){
            api.getSearchHot().then(res=>{
                this.SearchHot = res.data.searchHotWords
            })
        },
        change(){
            let len = this.SearchHot.length;
            this.hotstar = this.hotend
            this.hotend = this.hotend + 10
            if(this.hotend > len){
                this.hotstar = 0
                this.hotend = 10
            }
        },

        GetSearch () {
            Indicator.open({
                text: '加载中哦…',
                spinnerType: 'double-bounce'
            })
            
            this.list = []
            this.loading = true
            api.getSearchResult(this.query).then(res => {
                Indicator.close()
                this.loading = false
                this.list =  this._unEscape(res.data.books)
                console.log(this.list)
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
    }
}
</script>
  
<style lang="stylus" scoped>
    .search-wrap
        position fixed
        top 0
        left 0
        width 100%
        box-sizing border-box
        padding 0.625rem 1rem
        border-bottom 1px solid #f5f5f5
        .search
            display flex
            align-items center
            background #f0f0f2
            box-sizing border-box
            width 100%
            padding 0 0.625rem
            height 2.25rem
            border-radius 0.5rem
            input
                flex 1
                margin 0 5px
                line-height 18px
                background #f0f0f2
                color #101010
                font-size 1rem
                outline 0
    .sou
        color gray
        position relative
        left 17.8rem
        top -1.8rem
    .content
        position fixed
        top 60px
        width 100%
        bottom 3.125rem
        overflow hidden
        padding 0rem 1rem
        box-sizing border-box
        .hot-title
            height 2.5rem
            line-height 2.5rem
            display: flex
            width 100%
            border-bottom 1px solid #f5f5f5
            color #101010
            span
                display inline-block
                width 3px
                height 1.125rem
                margin auto 0
                margin-right 0.5rem
                background #43bb57
            h1 
                flex 1
            p
                font-size 0.875rem
        .hot-list
            width 100%
            .hot-item
                display inline-block
            span
                display inline-block
                height 1.5rem
                line-height 1.5rem
                padding 0 0.625rem
                margin 0.5rem 0.25rem 0.125rem 0
                font-size 0.875rem
                color #5b5b59
                border 1px solid #ddd
                border-radius 0.75rem

        .history-title
            height 2.5rem
            line-height 2.5rem
            display: flex
            width 100%
            border-bottom 1px solid #f5f5f5
            span
                display inline-block
                width 3px
                height 1.125rem
                margin auto 0
                margin-right 0.5rem
                background #43bb57
            h1
                flex 1

        .history-list
            .history-item
                height 2.5rem
                line-height 2.5rem
                display flex
                width 100%
                border-bottom: 1px solid #f5f5f5
                box-sizing border-box
                color #101010
                .history-text
                    flex 1
                    padding-left: 0.5rem;
                    color gray
                .sousuo2
                    width 1rem
                    height 1rem
                    color #43bb57
                .cuowu
                    width 1rem
                    height 1rem  
                    color gray
</style>
  