<template>
  <div class="wrap">
    <swiper class="swiper-container" v-if="arrItem.length > 1" :options="swiperOption" ref="mySwiper">
        <swiper-slide class="swiper-slide" v-for="(item,index) in arrItem" :key="index">
            <img :src=item.imgUrl alt="">
        </swiper-slide>
        <!-- 小圆点分页器 -->
        <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    <re-commend></re-commend>
    <hot></hot>
    <end></end>
  </div>
</template>

<script>
import ReCommend from '@/base/Recommend';
import Hot from '@/base/Hot';
import End from '@/base/End';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.css'
  export default {
    name: 'Banner',
    components: {
        ReCommend,
        Hot,
        End
    },
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
			    delay: 5000,//5秒切换一次
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
.wrap
  position fixed 
  position relative
  top 2.75rem
  .swiper-container
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
