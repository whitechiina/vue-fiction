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
            <div class="head">{{bookDetail.title}}</div>
            <div class="search" @click="search">
                <i>
                    <svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-sousuo"></use>
                    </svg>
                </i>
            </div >
        </div>
        <div class="book-detail">
            <div class="book-head">
                <div class="book-left">
                    <img :src="image + bookDetail.cover">
                </div>
                <div class="book-right">
                    <h1>{{bookDetail.title}}</h1>
                    <h3>{{bookDetail.author}}</h3>
                    <p class="rating">{{ratings.score}}分 ({{ratings.tip}})</p>
                    <p class="class">类型: {{bookDetail.minorCate}} |  {{bookDetail.minorCateV2}}</p>
                    <p class="num">字数: {{bookDetail.wordCount}}</p>
                </div>
            </div>
        </div>
        <!-- 简介 -->
        <div class="content">
            <h1>简介</h1>
            <p>{{bookDetail.longIntro}}</p>
            <div class="new">
                <span class="one">最新：{{bookDetail.lastChapter}}</span>
                <span class="two">
                    <i>
                        <svg class="icon" aria-hidden="true">
                          <use xlink:href="#icon-sort"></use>
                        </svg>
                    </i>
                    目录
                </span>
            </div>
        </div>

        <!-- 这里应该单独写个组件，忘记了 -->
        <!-- 同类作品推荐 -->
        <div class="book-class">
            <h1 class="txt">
                <span></span>
                同类作品推荐
            </h1>
            <div class="book-list" ref="picWrapper">  
                <ul class="book-wrapper" ref="picList"> 
                    <li class="book-item" v-for="(item, index) in relation" :key="index">
                        <img :src="'http://statics.zhuishushenqi.com'+item.cover">
                        <p class="book-name">{{ item.title }}</p>
                        <p class="reader">{{dealNum(item.latelyFollower)}}人读过</p>
                    </li>
                </ul>
            </div>
        </div>
        <div class="use">
            [better-scroll]
        </div>

        <div class="shelf">
            <div class="add" @click="setBookLocalStorage()">{{flag ? '移除书架' : '加入书架'}}</div>
            <div class="start">开始阅读</div>
        </div>
    </div>
</template>

<script>
import api from '../../server/api.js';
import { Indicator, Toast } from 'mint-ui';
import BScroll from 'better-scroll';
import {mapMutations} from 'vuex'

export default {
    name: 'Bookinfo',
    data() {
        return {
            image:'http://statics.zhuishushenqi.com',
            bookDetail: Object,
            ratings: Object,
            relation: Array,

            flag: false,
        }
    },
    

    activated() {
        // 获取书籍详情
        this.getBookInfo(this.$route.query.id)
        // 获取相关书籍
        this.GetRelation(this.$route.query.id)

        //等到內容將div撑开之后，再对better-scroll的实例初始化（时机）
         this.$nextTick(()=>{
             this._initPics();    //图片的横向滚动
         });
    },
    
    watch:{
      //监听seller变量的值的变化在初始化
      //防止滚动不生效
      'relation'(){
        this.$nextTick(()=>{
          this._initPics();
        });
      }
    },

    methods: {
        setBookLocalStorage(){
        let localShelf = JSON.parse(window.localStorage.getItem('book')) ? JSON.parse(window.localStorage.getItem('book')) : {};
        if (this.flag) {
          delete localShelf[this.bookDetail._id];
          window.localStorage.setItem('book', JSON.stringify(localShelf))
          this.flag = !this.flag
        } else {
          localShelf[this.bookDetail._id] = {
            cover: this.bookDetail.cover,
            title: this.bookDetail.title,
            id: this.bookDetail._id,
            chapterIndexCache: 0,
            bookSource: 0,
            pageIndexCache: 0,
          };
          window.localStorage.setItem('book', JSON.stringify(localShelf))
          this.flag = !this.flag
        }
      },

        back(){
            this.$router.go(-1)
        },
        search(){
            this.$router.push('/search')
        },

        // 获取书籍详情
        getBookInfo(id, callback) {
            Indicator.open({
                text: '加载中……',
                spinnerType: 'double-bounce'
            })
            api.getBookInfo(id).then((res) => {
                this.bookDetail = this._unEscape(res.data)
                this.ratings = res.data.rating
                Indicator.close()
            }).catch(error => {
                console.log(error)
                Indicator.close()
                Toast('网络异常,请稍后再试！')
            })
        },
        // 获取相关书籍
        GetRelation(id){
            this.relation = []
			var _this = this
			api.getRecommend(id).then(res => {
				for (var i = 0; i < 6; i++) {
					_this.relation.push(res.data.books[i])
                }
                console.log(this.relation)
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

        //用于初始化“同类作品”的横向滚动效果
        _initPics(){
            //先判断是否有这个属性
            if(this.relation){
            //这里之所以要设置宽度，是因为.pic-wrapper和.pic-list的宽度一样大
            //当.pic-list的宽度大于.pic-wrapper的宽度，才能横向滚动
            let picWidth = 7; //这里是设置每张图片的宽度
            //width是所有图片的宽度和以及margin的大小和
            let width = picWidth*this.relation.length;
            this.$refs.picList.style.width = width + 'rem'; //设置.pic-list的宽度的宽度
            this.$nextTick(()=>{
                if(!this.picScroll){
                this.picScroll = new BScroll(this.$refs.picWrapper,{
                    scrollX:true,
                    eventPassthrough:'vertical' //忽略竖直方向的滚动
                });
                }else{
                this.picScroll.refresh();
                }
            });
            }
        },

    },
}
</script>

<style lang="stylus" scoped>
    @import '../../assets/style/bookinfo.styl';
</style>