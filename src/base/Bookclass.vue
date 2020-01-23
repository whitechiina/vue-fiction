<template>
  <div>
    <div class="book-class">
      <h1 class="txt">
        <span></span>
        作者其他作品
      </h1>
      <div class="book-list" ref="picWrapper">
        <ul class="book-wrapper" ref="picList">
          <li class="book-item">
          
            <p class="book-name"></p>
            <p class="reader">人读过</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    name: 'BookClass',
    
    mounted() {
      
    },

   
    }

</script>

<style lang="stylus" scoped>
.book-class
    width: 100%
    background: #fff
    padding: 0rem 1rem 2.75rem 1rem

    box-sizing: border-box
    .txt
        padding: 1rem 0
        height: 1.5rem
        line-height: 1.5rem
        font-size: 1rem
        color: #101010
        span 
            display: inline-block
            width: 3px
            height: 1.125rem
            vertical-align: middle
            margin-right: 0.5rem
            background: #43bb57
    .book-list
        width: 100%
        overflow: hidden
        height 100%
       .book-wrapper
            padding-bottom 0.75rem
            height 100%
            display flex
            flex-flow row nowrap
            .book-item
                height 100%
                box-sizing border-box
                padding-right 1.6rem
                img 
                    width: 5.625rem
                    height: 7.3125rem
                .book-name
                    font-size: 0.875rem;
                    color: #101010;
                    line-height: 2rem;
                    width: 5.625rem;
                    display: -webkit-box;
                    display: -moz-box;
                    -webkit-line-clamp: 1;
                    -moz-line-clamp: 1;
                    -webkit-box-orient: vertical;
                    -moz-box-orient: vertical;
                    overflow: hidden;
                .reader
                    font-size: 0.75rem
                    width: 5.625rem
                    line-height: 1rem
                    overflow: hidden;
                
</style>
