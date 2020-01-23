<template>
    <div>
        <div class="list">
            <ul class="list-wrap">
                <li v-for="(item, index) in list" :key="index" @click="goBooks(item._id)">
                        <img v-lazy="item.cover">
                        《{{item.title}}》 &nbsp;&nbsp; -{{item.author}}
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import api from '../server/api'
    export default {
        name: "Search-list",
        props: {
            list: Array,
        },
        methods: {
            goBooks(id){
                this.$router.push({
                    path: `/bookinfo/?id=${id}`
                });
            },
        },
    }
</script>

<style lang="stylus" scoped>
    .list
        position fixed
        top: 3.5625rem
        padding: 0 1rem
        left: 0
        right: 0
        bottom: 0
        .list-wrap
            width: 100%
            height: 100%
            overflow: hidden
            padding: 0 0.5rem
            background: #fff
            overflow-y scroll
            height 100%
            li
                width: 100%
                line-height: 3rem
                font-size: 1rem
                color: #101010
                border-bottom: 1px solid #f5f5f5
                img
                    width: auto
                    width: 1.75rem;
                    height: 100%
                    vertical-align: middle
</style>