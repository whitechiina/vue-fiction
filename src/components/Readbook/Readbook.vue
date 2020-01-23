<template>
    <div>
        还没写完不好意思
    </div>
</template>

<script>
import api from '../../server/api.js'
import {mapGetters} from 'vuex'
import {Indicator, Toast} from 'mint-ui'
export default {
    name: 'Readbook',
    data() {
        return {
            bookContent: {
            title: '',
            content: ''
            },
            nextContent: {
            title: '',
            content: ''
            },
            prevContent: {
            title: '',
            content: ''
            }
        }
    },
}

</script>

<style lang="stylus" scoped>

</style>