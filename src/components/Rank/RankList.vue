<template>
    <div>
        <div class="title">
            <div class="back"  @click="back">
                <i>
                   <svg class="icon cuowu" aria-hidden="true">
                     <use xlink:href="#icon-fanhui"></use>
                   </svg> 
                </i>
            </div>
            <div class="head">{{this.title}}</div>
            <div class="search" @click="search">
                <i>
                    <svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-sousuo"></use>
                    </svg>
                </i>
            </div >
        </div>
        <div class="list-wrap">
            <ul>
                <li v-for="(item, index) in bookDetail" :key="index" @click="goDeatail(item)">
                    <div class="left">
                        <img v-lazy="item.cover">
                    </div>
                    <div class="right">
                        <h2>{{item.title}}</h2>
                        <h5>{{item.author}}</h5>
                        <p class="info">
                        {{item.shortIntro}}
                        </p>
                        <div class="bable">
                            <span>{{dealNum(item.latelyFollower)}}人气</span>&nbsp;&nbsp;|&nbsp;&nbsp;<span>{{item.retentionRatio}}%留存</span>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import api from '../../server/api.js'
import { Indicator, Toast } from 'mint-ui'
import { RouterLink } from '@/utils/routerlink'

export default {
    name: 'RankList',
    data() {
        return {
            title: '',
            bookDetail: []
        }
    },
    mounted () {
        this.title = this.$route.query.title
        if (this.$route.query.isMore) {
        this.GetRankType()
        } else {
        this.GetBook(this.$route.query.id, res => {
            this.weekList = res
            this.rankBookList = res
        })
        }
    },

    methods: {
        GetBook (id, callback) {
            Indicator.open({
                text: '加载中……',
                spinnerType: 'double-bounce'
            })
            api.getRank(id).then((res) => {
                this.bookDetail = this._unEscape(res.data.ranking.books)
                console.log(this.bookDetail)
                
                console.log(res.data.ranking.books[0]._id)
                Indicator.close()
            }).catch(error => {
                console.log(error)
                Indicator.close()
                Toast('网络异常,请稍后再试！')
            })
        },

        GetRankType () {
            if (this.otherRank) {
                this.otherRankList = this.otherRank
                this.GetBook(this.otherRankList[0]._id)
            } else {
                getRankList().then(res => {
                this.otherRankList = res.data.male.filter(item => {
                    return item.collapse
                })
                this.$store.dispatch('SetOtherRank', this.otherRankList)
                this.GetBook(this.otherRankList[0]._id)
                })
            }
        },


        // 转译获取到的图片地址
        _unEscape(arr){
        for (let i = 0; i < arr.length; i++) {
          arr[i].cover = unescape(arr[i].cover);
          arr[i].cover = arr[i].cover.replace("/agent/", "")
        }
        return arr
        },


        // 数字转万为单位
        dealNum (num) {
        var cun = 0
        if (num > 10000) {
            cun = (num / 10000).toFixed(1) + '万'
        } else {
            cun = num
        }
        return cun
        },


        back(){
            this.$router.go(-1)
        },
        search(){
            this.$router.push('/search')
        },

        goDeatail (item) {
            RouterLink({ path: '/bookinfo', query: { id: item._id, title: item.title, monthId: item.monthRank, totalId: item.totalRank }})
        },
        
    },
    
}
</script>

<style lang="stylus" scoped>
    .title
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
        width 100%
        display: flex
        .back
            position: absolute
            left: 0.8rem
            i
                svg
                    color #fff
        .head
            flex 1
        .search
            position: absolute
            right: 0.8rem
    .list-wrap
        position fixed
        top 2.75rem
        width 100%
        overflow: hidden
        overflow-y scroll
        height 100%
        ul
            width: 100%
            line-height: 3.125rem
            vertical-align: middle
            box-sizing border-box
            color: #5b5b59
            padding: 1rem 1rem 1rem 1rem
            li  
                display: flex
                border-bottom: 1px solid #f5f5f5
                .left
                    width: 5.625rem
                    margin-right: 1rem
                    height: 100%
                    img
                        width: 100%
                        height: 100%
                        border-radius: 0.25rem
                        border: 1px solid #f5f5f5
                .right
                    flex: 1
                    display: flex
                    height: 100%
                    flex-direction: column
                    h2
                        font-size: 1rem
                        color: #101010
                        height: 2rem
                        line-height: 2rem
                        overflow: hidden
                    h5
                        font-size: .4rem
                        color: #9d9d9b
                        height: 1rem
                        line-height: 0.8rem
                        padding 0.1rem 0rem
                        overflow: hidden
                    .info
                        font-size: 0.875rem
                        text-indent: 1.5em
                        color: #9d9d9b
                        line-height: 1.25rem
                        height: 2.4875rem
                        overflow: hidden
                    .bable
                        margin-top: 0.1rem
                        display: flex
                        font-size: 0.2rem
                        color: #43bb57
</style>