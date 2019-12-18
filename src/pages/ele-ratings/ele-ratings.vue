<template>
  <div class="ratings">
    <div class="scores">
      <div class="left">
        <div class="num">{{seller.score}}</div>
        <div class="text">综合评分</div>
        <div class="desc">高于周边商家{{seller.rankRate}}%</div>
      </div>
      <div class="right">
        <div class="taste">
          <span class="text">商品评价</span>
          <ele-star class="stars" size='36' :score='seller.foodScore'></ele-star>
          <span class="score">{{seller.foodScore}}</span>
        </div>
        <div class="server">
          <span class="text">服务评价</span>
          <ele-star class="stars" size='36' :score='seller.serviceScore'></ele-star>
          <span class="score">{{seller.serviceScore}}</span>
        </div>
        <div class="arrive">
          <span class="text">送达时间</span>
          <span class="time">{{seller.deliveryTime}}分钟</span>
        </div>
      </div>
    </div><div class="space"></div>
    <div class="evaluate">
      <div class="btns">
        <span class="all">全部{{ratings.length}}</span>
        <span class="good"></span>
        <span class="bad"></span>
      </div>
      <div class="title"></div>
      <div class="content">
        <ul class="list">
          <li class="item"></li>
        </ul>
      </div>
    </div>
    <!-- <ele-cart :deliveryPrice='seller.deliveryPrice' :minPrice='seller.minPrice'></ele-cart> -->
  </div>
</template>

<script>
import star from 'components/ele-star/ele-star.vue'
import cart from 'components/ele-cart/ele-cart.vue'
const OK=0;
  export default {
    name:'ele-ratings',
    props:{
            seller:Object
        },
    data(){
      return {
        ratings:[]
      }
    },
    components:{
      'ele-cart':cart,
      'ele-star':star
    },
    async mounted(){
      const {errno,body}=await this.$http.ratings.getRatings();
      if(errno===OK){
        this.ratings=body
      }
      console.log(body)
    }
  }
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/mixin.styl'
.ratings
  .scores
    display flex
    height 102px
    width 100%
    .left
      flex 0 0 138px
      margin 18px 0
      border-right 1px solid rgba(7,17,27,.1)
      .num
        display flex 
        align-items center 
        justify-content center 
        font-size 24px
        line-height 28px
        color rgba(255,153,0,1)
      .text 
        display flex 
        align-items center 
        justify-content center 
        font-size 12px
        line-height 12px
        color rgba(0,0,0,1)
        margin-top 6px
        margin-bottom 8px
      .desc
        display flex 
        align-items center 
        justify-content center 
        font-size 10px
        line-height 10px
        color rgba(7,17,27,.5)
        margin-bottom 6px
    .right
      flex 1
      margin 18px 24px
      font-size 12px
      line-height 18px
      .taste 
        display flex
        .text 
          vertical-align middle
        .stars
          vertical-align middle
          margin 0 12px
        .score
          vertical-align middle
          font-size 12px
          line-height 18px
          color rgba(255,153,0,1)
      .server
        display flex
        margin-top 4px
        margin-bottom 4px
        .text 
          vertical-align middle
        .stars
          vertical-align middle
          margin 0 12px 
        .score
          vertical-align middle
          font-size 12px
          line-height 12px
          color rgba(255,153,0,1)
      .arrive
        .time 
          margin 0 12px 
          color rgba(147,153,159,1)
  .space 
    width 100%
    height 18px
    border-bottom 1px solid rgba(7,17,27,.1)
    border-top 1px solid rgba(7,17,27,.1)
    background #eee
  .evaluate
    zoom 1
</style>
