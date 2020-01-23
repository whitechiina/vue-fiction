<template>
    <div>
        <div class="title">我的书架</div>
        <div class="recent">
            <div class="recent-content">
                <div class="img">
                    <img src="../../assets/image/lazy-loading.jpg">
                </div>
                <div class="book-info">
                    <h1>元尊</h1>
                    <div class="next-btn">继续阅读</div>
                </div>
            </div>
        </div>
        <div class="library">
            <div v-for="(item,key) in books" :key="key"  class="library-item" @click="goReadBooks(item.id)">
                <img v-lazy="_unEscape(item.cover)">
                <p>{{item.title}}</p>
            </div>

            <!-- 添加更多书籍 -->
            <router-link to="/rank" tag="div" class="library-item">
                <div class="library-item-wrapper">
                    <i>
                        <img src="../../assets/image/add.png">
                    </i>
                </div>
            </router-link>
            
        </div>
    </div>
  </template>
  
<script>
import {setStorage,getStorage} from '../../utils/storage';

export default {
    name: 'Bookshelf',
    data() {
        return {
            noBook: false,
            books: [],
            option: [],
        }
    },
    created(){
      this.getBooks()
      console.log(this.books)
    },
    methods: {
      getBooks(){
      let bookIdArray = [];
      let localShelf = JSON.parse(window.localStorage.getItem('book')) ? JSON.parse(window.localStorage.getItem('book')) : {};
      for (let i in localShelf) {
            localShelf[i].cover = this._unEscape(localShelf[i].cover)
            this.books.push(localShelf[i])
            bookIdArray.push(i)
        }
        this.option = bookIdArray;
      },

        //转换图片
      _unEscape(str){
        str = unescape(str).replace("/agent/", "")
        return str
      },

        //阅读小说
      goReadBooks(id){
        this.$router.push({
            path: `/bookinfo/?id=${id}`
        })
      }



    },
}
</script>
  
<style lang="stylus" scoped>
    @import '../../assets/style/bookshelf.styl';
</style>
  