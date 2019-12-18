<template>
  <div class="addCart">
    <i class="remove icon-remove_circle_outline" v-show='food.count' @click='removeCount'></i>
    <span class="text" v-show='food.count'>{{food.count}}</span>
    <i class="add icon-add_circle" @click='addCount'></i>
  </div>
</template>

<script>
import PubSub from 'pubsub-js'
  export default {
    name:"ele-control",
    props:{
      food:{
        type:Object,
        require:true
      },
      goodIndex:{
        type:Number,
        require:false
      },
      foodIndex:{
        type:Number,
        require:false
      }
    },
    methods:{
      removeCount(){
        this.$emit('removeCount',this.food);
      },
      addCount(event){
        this.$emit('addCount',this.food);
        PubSub.publish('ballAnimation',event.target)
      }
    }
  }
</script>

<style scoped lang='stylus'>
  .addCart
    font-size 0
    .remove
      font-size 24px
      line-height 24px
      color rgba(0,160,220,1)
      vertical-align middle
    .text
      display inline-block
      width 24px
      font-size 10px
      line-height 24px
      color rgba(147,153,159,1)
      text-align center
      vertical-align middle
    .add
      vertical-align middle
      font-size 24px
      line-height 24px
      color rgba(0,160,220,1)
</style>