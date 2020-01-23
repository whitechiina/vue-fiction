<template>
    <div>
        <div class="title">分类</div>
        <div class="classify-group" ref="bscroll">
            <div class="bscroll-container">
            <div class="classify">
                <div class="man-title">
                    <span class="man-icon"></span>
                    <span class="man-name">男生频道</span>
                </div>
                <div class="content">
                    <div :class="dark(index)" class="man-item" v-for="(item, index) in male" :key="index" @click="goCategoryDetail(item,categoryType.male.type)">
                        <img class="man-img" v-lazy="image + item.bookCover[0]">
                        <div class="man-p">
                            <h1 class="man-class">{{item.name}}</h1>
                            <p class="man-num">{{item.monthlyCount}}本</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="classify">
                <div class="man-title">
                    <span class="wuman-icon"></span>
                    <span class="man-name">女生频道</span>
                </div>
                <div class="content">
                    <div :class="dark(index)" class="man-item" v-for="(item, index) in female" :key="index"  @click="goCategoryDetail(item,categoryType.female.type)">
                        <img class="man-img" v-lazy="image + item.bookCover[0]">
                        <div class="man-p">
                            <h1 class="man-class">{{item.name}}</h1>
                            <p class="man-num">{{item.monthlyCount}}本</p>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    </div>
  </template>
  
<script>
    import BScroll from "better-scroll";
    import api from '../../server/api.js'
    export default {
        name: 'Classify',
        data() {
            return {
                male:'',
                female:'',
                image:'http://statics.zhuishushenqi.com',
                darkIndex: [0, 1, 4, 5, 8, 9, 12, 13],
                categoryType: {
                    male: {
                        name: '男生',
                        type: 'male'
                    },
                    female: {
                        name: '女生',
                        type: 'female'
                    }
                }
            }
        },
        created() {
            this._getCategories()
        },
        methods: {
            _getCategories(){
                api.getCategories().then(res=>{
                    console.log(res)
                    this.male = res.data.male
                    this.female = res.data.female
                })
            },

            // 类的颜色
            dark (index) {
                let matches = this.darkIndex.some(item => item === index)
                if (matches) {
                return 'dark'
                }
            },

            // 跳转分类页面
            goCategoryDetail(item, key){
                this.$router.push({
                path: '/category',
                query: {gender: key, major: item.name}
                })
            }
            
        },


        mounted(){
                this.$nextTick(() => {
                this.scroll = new BScroll(this.$refs.bscroll, {
                    click: true,
                    probeType: 3
                })
                this.scroll.on('scroll', (pos) => {
                    if (pos.y > 50) {  //下拉高度大于50 (看自己需要)
                        this.dropDown = true  //逻辑操作，我这是显示下拉提示组件
                    } else {
                        this.dropDown = this.isLoading ? true : false  //isloading 表示正在加载数据(加载中也显示下拉提示组件)
                    }
                })
                //touchEnd（手指离开以后触发） 通过这个方法来监听下拉刷新
                this.scroll.on('touchEnd', (pos) => {
                    // 下拉动作
                    if (pos.y > 50) {
                        this.isLoading = true
                        this.page = 1
                        api.getCategories().then(res => { //此处请求接口，处理数据，具体逻辑看自己需求，此处仅供参考
                             //提示内容
                            setTimeout(() => {
                                this.male = res.data.male
                                this.female = res.data.female
                                console.log(123)
                            }, 1000)
                        })
                    }
                })
            })
        }
        
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
.classify-group
    position fixed
    top 2.75rem
    width 100%
    bottom 3.125rem
    overflow: hidden;
    .classify
        padding 0 1rem 1rem 1rem
        font-size 1rem
        .man-title
            height 2.875rem
            line-height 2.875rem
            color #101010
            .man-icon
                display inline-block
                height 1.125rem
                width 0.1875rem
                background #44a6fe
                vertical-align middle
                margin-right 0.25rem
            .wuman-icon 
                display inline-block
                height 1.125rem
                width 0.1875rem
                background #f7666a
                vertical-align middle
                margin-right 0.25rem
            .man-name
                line-height 2.875rem
                color: #101010
        .content
            display flex
            width 100%
            flex-wrap wrap
            .man-item
                width 50%
                padding 0.5rem 0
                height 3.375rem
                display flex
                &.dark
                    background #f7f7f7
                .man-img
                    height 3.375rem
                    width 2.5rem
                    margin-right 0.875rem
                .man-p
                    flex 1
                    .man-class
                        font-size 1rem
                        color #5b5b59
                        line-height 2.125rem
                    .man-num
                        font-size 0.675rem
                        color #9d9d9b
</style>
  