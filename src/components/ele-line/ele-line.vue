<template>
  <div class="lineStyle">
    <div class="line"></div>
    <slot>
      <span class="text">优惠信息</span>
    </slot>
    <div class="line"></div>
  </div>
</template>

<script>
  export default {
    name:'ele-line'
  }
</script>

<style scoped lang='stylus'>
.lineStyle
  width 80%
  height 30px
  display inline-flex
  align-items center
  .line
    height 1px
    flex 1
    background rgba(255,255,255,.2)
  .text
    margin-left 12px
    margin-right 12px
</style>