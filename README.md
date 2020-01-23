# fiction

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

**Vue打造的小说阅读器（其实阅读部分还没实现）**

目前实现功能：

小说分类

小说详情

排行榜功能

小说搜索功能

书架功能

获取书籍详情

……

待实现功能：

小说目录详情

App阅读功能

```
用到的有 vue + vue-router + vuex + muse-ui + mt-loadmore + mint-ui + axios
```



**使用better-scrller下拉刷新数据**

```vue
mounted(){
            ? ? this.$nextTick(() => {
                this.scroll = new BScroll(this.$refs.bscroll, {
                    click: true,
                    probeType: 3
                })
                this.scroll.on('scroll', (pos) => {
                    if (pos.y > 50) {  //下拉高度大于50 (看自己需要)
                        this.dropDown = true  //逻辑操作，我这是显示下拉提示组件
                    } else {
                        this.dropDown = this.isLoading ? true : false  //isloading 表示正在加载数据(加载中也显示下拉

提示组件)
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
```



**移动端滚轮**

```
better-scroller插件

//裁剪内容 - 提供滚动机制。
overflow-y scroll
height 100%
```



**swiper修改轮播图下面小圆圈样式**
具体样式

```css
.swiper-container-horizontal>.swiper-pagination-bullets .swiper-pagination-bullet{
width: .18rem;
    
height: .08rem;
    border-radius: 0;
}
.swiper-pagination-bullet-active{
    background: #4BDAD3;
    width: .34rem !important;
}

这两个class都是swiper里面的

border-radius: 0;是去除圆圈样式，我是做长方形的

width: .34rem !important; 选中

时候可以改变长度  一定要加!important

```

 

**vue使用swiper**

```vue
<template>
  <div>
    <swiper class="swiper-container" v-if="arrItem.length > 1" :options="swiperOption" ref="mySwiper">
        <swiper-slide class="swiper-slide" v-for="(item,index) in arrItem" :key="index">
            <img :src=item.imgUrl alt="">
        </swiper-slide>
        <!-- 小圆点分页器 -->
        <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.css'
  export default {
    name: 'Banner',
    data() {
      return {
        arrItem: [
            {imgUrl: require('../assets/image/0.jpg')},
            {imgUrl: require('../assets/image/1.jpg')},
            {imgUrl: require('../assets/image/2.jpg')},
            {imgUrl: require('../assets/image/3.jpg')},
        ],
        swiperOption: {
		    loop :true,
            autoplay: {
			    delay: 10000,//5秒切换一次
            },
            pagination:{
                el:'.swiper-pagination',
                clickable:true,
            },
        }
      }
    },
}

</script>

<style lang="stylus" scoped>

  .swiper-container 
    position fixed 
    position relative
    top 2.75rem
    .swiper-slide 
        width 100%
        height 150px
        img
            width 100%
            height 150px
    .swiper-pagination
        position absolute
        bottom 1rem

</style>

```



**v-lazy 实现图片的懒加载**



For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


# vue-fiction
