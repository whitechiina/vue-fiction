<template>
  <div class="tabs-wrapper">
    <div class="tabs">
      <router-link tag="div" to="/"  class="item" exact>
        <div class="icon">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-shouye"></use>
          </svg>
        </div>
        <span class="icon-title">首页</span>
      </router-link>

      <router-link tag="div" to="/classify"  class="item">
        <div class="icon">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-fenlei"></use>
          </svg>
        </div>
        <span class="icon-title">分类</span>
      </router-link>
      
      <router-link tag="div" to="/rank"  class="item">
        <div class="icon">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-paihangbang"></use>
          </svg>
        </div>
        <span class="icon-title">排行</span>
      </router-link>

      <router-link tag="div" to="/search"  class="item">
        <div class="icon">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-sousuo"></use>
          </svg>
        </div>
        <span class="icon-title">搜索</span>
      </router-link>

      <router-link tag="div" to="/bookshelf"  class="item">
        <div class="icon">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-jiarushujia_01"></use>
          </svg>
        </div>
        <span class="icon-title">书架</span>
      </router-link>

      <router-link tag="div" to="/me"  class="item">
        <div class="icon">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-tubiao-"></use>
          </svg>
        </div>
        <span class="icon-title">我的</span>
      </router-link>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Tabs',
  }

</script>

<style lang="stylus" scoped>
  .tabs-wrapper 
    position fixed
    bottom 0
    left 0
    width 100%
    height 3.125rem
    border-top 1px solid #ddd
    box-sizing border-box
    background #f0eff5
    .tabs
      display flex
      text-align center
      .item
        flex: 1
        color #9d9d9b
        display: flex
        flex-direction: column
        justify-content: center
        align-items: center
        height: 100%
      .router-link-active
        color #43bb57
      .icon
        font-size: 16px 
        padding-bottom: 0.46rem 
        padding-top 0.1rem
      .icon-title
        font-size: 0.625rem
</style>
