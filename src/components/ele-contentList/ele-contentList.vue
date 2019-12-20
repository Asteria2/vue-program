<template>
  <ul class="list">
    <li class="item" v-for='(rating,index) in ratingList' :key='index'>
      <div class="left">
        <div class="avatar">
          <img :src="rating.avatar" alt="">
        </div>
      </div>
      <div class="right">
          <div class="top">
            <div class="msg">
              <span class="username">{{rating.username}}</span>
              <div class="detail">
                <ele-star size='24' :score='rating.score' ></ele-star>
                <span class="arrive" v-show='rating.deliveryTime'>{{rating.deliveryTime}}分钟送达</span>
              </div>
            </div>
            <div class="time">{{rating.rateTime}}</div>
          </div>
          <div class="text">{{rating.text}}</div>
          <div class="bottom">
            <i class="up icon-thumb_up" v-show='rating.rateType===0' ></i>
            <i class="down icon-thumb_down" v-show='rating.rateType===1'></i>
            <span class="recommend" v-for='(item,index) in rating.recommend' :key='index'>{{item}}</span>
          </div>
      </div>
    </li>
  </ul>
</template>
//icon-thumb_up
<script>
import star from 'components/ele-star/ele-star.vue'
  export default {
    name:"ele-contentList",
    props:{
      ratingList:Array,
    },
    components:{
      'ele-star':star
    }
  }
</script>

<style scoped lang='stylus'>
@import '../../common/stylus/mixin.styl'
.list 
  .item
    display flex
    padding 18px
    one-px(rgba(7,17,27,.1))
    &::after
      width 90% 
    .left 
      flex 0 0 28px
      .avatar
        margin-right 12px
        width 28px
        height 28px
        border-radius 50%
        overflow hidden
        img 
          width 100%
          height 100% 
    .right
      flex 1 
      .top
        display flex 
        justify-content space-between
        .msg
          .username
            font-size 10px
            line-height 12px
            color rgba(7,17,27,1)
          .detail 
            .arrive
              margin-left 6px
              font-size 10px
              font-weight 200
              line-height 12px
              color rgba(147,153,159,1)
        .time 
          margin-top 4px
          font-size 10px
          font-weight 200
          line-height 12px
          color rgba(147,153,159,1)
      .text 
        font-size 12px
        line-height 18px
        color rgba(7,17,27,1)
        margin-top 6px
        margin-bottom 8px
      .bottom
        .up 
          margin-right 8px
          font-size 12px
          line-height 16px
          color rgba(0,160,220,1)
        .down
          margin-right 8px
          font-size 12px
          line-height 16px
          color rgba(147,153,159,1)
        .recommend 
          display inline-block
          padding 0 6px
          margin-right 8px
          margin-bottom 5px
          font-size 8px
          line-height 16px
          color rgba(147,153,159,1)
          border 1px solid rgba(7,17,27,.1)
          border-radius 2px
          &:last-child
            margin-right 0
</style>