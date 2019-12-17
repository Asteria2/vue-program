<template>
  <ul class="list">
    <li class="item" v-for='(support,index) in supports' :key='index'>
      <ele-icon class="icon" size='2' :type="support.type"></ele-icon>
      <span class="text">{{support.content}}</span>
    </li>
  </ul>
</template>

<script>
import icon from '../../ele-icon/ele-icon'
  export default {
    name:'ele-list',
    props:{
      supports:Array
    },
    components:{
      'ele-icon':icon
    }
  }
</script>

<style scoped lang='stylus'>
@import '../../../common/stylus/mixin.styl'  
.list
  text-align left
  margin-left 36px
  margin-bottom 28px
  .item
    margin-bottom 12px
    &:last-child
      margin-bottom 0
    .icon
      margin-left 12px
      margin-right 6px
      vertical-align middle
    .text
      font-size 12px
      font-weight 200
      line-height 12px
      vertical-align middle
</style>