<template>
    <div>
        <div class="title">
            <div class="back" @click="back()">
                <i>
                   <svg class="icon cuowu" aria-hidden="true">
                     <use xlink:href="#icon-fanhui"></use>
                   </svg> 
                </i>
            </div>
            <div class="head">{{major}}</div>
        </div>

        <!-- 分类顶部 -->
        <div class="top-wrap">
            <div class="hot">
                <span v-for="(item,index) in largeTypes" 
                    :class="{'active':index===largeTypeIndex}" 
                    @click="setLargeType(item.type,index)">
                    {{item.name}}
                </span>
            </div>
            <div class="all" v-show="mins.length>0">
                <span v-for="(minor,index) in mins" :class="{'active':index===smallTypeIndex}"  @click="setSmallType(minor,index)">{{minor}}</span>
            </div>
        </div>

        <!-- 分类数据 -->
        <div class="load-more" ref="load" :class="[mins.length>0?'padding300':'padding200']">
        <div class="list">
            <div class="list-wrap">
                <ul>
                    <li v-for="(book,index) in bookLists" :key="index" @click="goBooks(book._id)">
                        <div class="left">
                            <img v-lazy="book.cover" alt="">
                        </div>
                        <div class="right">
                            <h1>{{book.title}}</h1>
                            <p>{{book.shortIntro}}</p>
                            <div class="bot">
                                <div class="label">
                                    <span>{{book.author}}</span>
                                </div>
                                <div class="info">
                                    <span>{{num(book.latelyFollower)}}万人气</span>
                                    <span>{{book.retentionRatio}}%读者留存</span>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        </div>
    </div>    
</template>

<script>
import api from '../../server/api.js';
import {Indicator} from 'mint-ui';

export default {
    name: 'Category',
    data () {
        return {
            largeTypeIndex: 0,
            smallTypeIndex: 0,
            type: 'hot',
            duration: 'last-seven-days',
            major: '',
            minor: '',
            gender: '',
            start: 0,
            currentPage: 1,
            largeTypes: [
            {
                type: 'hot',
                name: '热门',
            },
            {
                type: 'new',
                name: '新书',
                duration: 'all'
            },
            {
                type: 'reputation',
                name: '好评',
            },
            {
                type: 'over',
                name: '完结',
            },
            {
                type: 'monthly',
                name: '包月',
            }
            ],
            mins: [],
            bookLists: [],
            allLoaded: false,
            cate: true,
            isLoadMore: false
        }        
    },
    methods: {
        back(){
            this.$router.go(-1)
        },

        setLargeType(type, index){
        this.largeTypeIndex = index;
        if (this.type === type) {
          return
        }
        this.type = type;
        this._getBookLists(this.gender, this.type, this.major, this.minor);
        //点击后重置滚动距离
        this.$refs.load.scrollTop = 0
      },
      setSmallType(minor, index){
        this.smallTypeIndex = index;
        if (this.minor === minor) {
          return
        }
        if (minor === '' || minor === '全部') {
          this.minor = ''
        } else {
          this.minor = minor;
        }
        this.currentPage = 1;

        this._getBookLists(this.gender, this.type, this.major, this.minor);
        //点击后重置滚动距离
        this.$refs.load.scrollTop = 0
      },
      _getBookLists(gender, type, major, minor = '', start = 0, limit = 20){
        api.getCategoryInfo(gender, type, major, minor, start, limit).then((res) => {
          if (res.data.ok) {
              console.log(res)
            this.bookLists = this._unEscape((res.data.books))
          }
        },(error)=>{
          Indicator.close();
          Indicator.open('网络错误');
          setTimeout(()=>{
            Indicator.close();
          },1500)
        })
      },

      //pic转换
      _unEscape(arr){
        for (let i = 0; i < arr.length; i++) {
          arr[i].cover = unescape(arr[i].cover);
          arr[i].cover = arr[i].cover.replace("/agent/", "")
        }
        return arr
      },

      //数字   
      num(ar){
        return(ar / 10000).toFixed(1)
      },

      loadBottom(){
        //加载更多
        this.isLoadMore = true;
        Indicator.open('加载中');
        api.getCategoryInfo(this.gender, this.type, this.major, this.minor, this.currentPage * 20, 20).then((res) => {
          if (res.data.ok) {
            this.bookLists = this.bookLists.concat(this._unEscape((res.data.books)));
            setTimeout(() => {
              Indicator.close();
              this.isLoadMore = false;
            }, 350);
            this.currentPage++;
          }
        },(error)=>{
          Indicator.close();
          Indicator.open('网络错误');
          setTimeout(()=>{
            Indicator.close();
          },1500)
        });
        this.$refs.loadmore.onBottomLoaded()
      },

      loadTop(){
        //下拉加载
        Indicator.open('加载中');
        categoriesInfo(this.gender, this.type, this.major, this.minor, 0, 20).then((res) => {
          if (res.data.ok) {
            this.bookLists = this._unEscape((res.data.books))
            Indicator.close();
          }
        },(error)=>{
          Indicator.close();
          Indicator.open('网络错误');
          setTimeout(()=>{
            Indicator.close();
          },1500)
        });
        this.$refs.loadmore.onTopLoaded()
      },

        //跳转详情页
        goBooks(id){
          this.$router.push({
            path: `/bookinfo/?id=${id}`
          });
        },
    },


    beforeRouteEnter(to, from, next){
        /*获取大类中的小类*/
        next(vm => {
            vm.major = vm.$route.query.major;
            vm.gender = vm.$route.query.gender;
            api.getSubCategory().then((res) => {
            res.data[vm.$route.query.gender].forEach((type) => {
                if (type.major === vm.$route.query.major) {
                vm.mins = type.mins;
                if (type.mins.length > 0) {
                    vm.mins.unshift('全部')
                }
                }
            });
            },(error)=>{
            Indicator.close();
            Indicator.open('网络错误');
            setTimeout(()=>{
                Indicator.close();
            },1500)
            });
            vm._getBookLists(vm.$route.query.gender, vm.type, vm.$route.query.major)
        })
        }
}
</script>

<style lang="stylus" scoped>
    @import '../../assets/style/category.styl';
    .load-more
      overflow-y scroll
      height 100vh
      box-sizing border-box
    .padding300
      padding-top 300px
    .padding200
      padding-top 200px
    .active {
      color #409eff
    }
</style>