<template>
    <div>
        <div class="title">排行榜</div>
        <div class="rank-list">
            <div class="man-title"><span class="title-icon"></span>男生排行榜</div>
            <ul class="man-list">
                <li v-for="(item, index) in male" :key="index" v-if="index<7"  @click="goRankList(item)">
                    <img v-lazy="image + item.cover">
                    <a href="javascript:">{{item.title}}</a>
                </li>
                <li @click="man_show">
                    <img src="../../assets//image//其他.png">
                    <a href="javascript:">其他排行榜</a>
                </li>
                <li v-show="manOther" v-for="(rank,index) in male" v-if="index > 7">
                    <a href="javascript:">{{rank.title}}</a>
                </li>
            </ul>

            <h3 class="woman-title"><span class="title-icon"></span>女生排行榜</h3>
            <ul class="woman-list">
                <li v-for="(item, index) in female" :key="index" v-if="index < 7"  @click="goRankList(item)">
                    <img v-lazy="image + item.cover">
                    <a href="javascript:">{{item.title}}</a>
                </li>
                <li @click="wuman_show">
                    <img src="../../assets//image//其他.png">
                    <a href="javascript:">其他排行榜</a>
                </li>
                <li v-show="womanOther" v-for="(rank,index) in female" v-if="index > 7">
                    <a href="javascript:">{{rank.title}}</a>
                </li>
            </ul>
        </div>
    </div>
  </template>
  
<script>
import api from '../../server/api.js'
import { RouterLink } from '@/utils/routerlink'
export default {
    name: 'Rank',
    data(){
        return{
            male: [],
            female: [],
            image: 'http://statics.zhuishushenqi.com',
            manOther: false,
            womanOther: false
        }
    },
    created() {
        this._getRankCategory()
    },
    methods: {
        _getRankCategory(){
            api.getRankCategory().then(res =>{
                this.male = res.data.male
                this.female = res.data.female

                var arr = res.data.male.filter(item => {
                    console.log(item.title)
                    return !item.collapse
                })
                this.otherRankList = res.data.male.filter(item => {
                    return item.collapse
                })
                
            })
        },
        man_show(){
            this.manOther = !this.manOther
        },
        wuman_show(){
            this.womanOther = !this.womanOther
        },

        // 路由传参
        goRankList (item) {
            RouterLink({ path: '/rankList', query: { id: item._id, title: item.title, monthId: item.monthRank, totalId: item.totalRank }})
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
.rank-list
    width 100%  
    position fixed
    top 2.75rem
    padding 0rem 1rem
    box-sizing border-box
    overflow-y scroll  
    height 100%
    padding-bottom 6rem
    .man-title
        width 100%
        font-size 16px
        font-weight 800
        color #43bb57
        border-bottom 1px solid #EBEEF5
        line-height 3rem
    .man-list
        list-style none
        li
            position relative
            line-height 3rem
            border-bottom 1px solid #EBEEF5
            img
                position: absolute
                left: 0
                top: 0.4rem
                width: 36px
                height: 36px
            a
                padding-left 2.8rem
    .woman-title
        width 100%
        font-size 16px
        border-bottom 1px solid #EBEEF5
        line-height 3rem
        font-weight 800
        color #43bb57
    .woman-list
        list-style none
        li
            position relative
            line-height 3rem
            border-bottom 1px solid #EBEEF5
            img
                position: absolute
                left: 0
                top: 0.4rem
                width: 36px
                height: 36px
            a
                padding-left 2.8rem
.title-icon
    display inline-block
    height 1.125rem
    width 0.1875rem
    background #43bb57
    vertical-align middle
    margin-right 0.6rem
</style>
  