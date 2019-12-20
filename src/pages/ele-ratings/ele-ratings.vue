<template>
  <div class="ratings" ref='ratingsList'>
    <div>
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
          <span class="btn" :class='{active:highAll}' @click='handleAll'>全部{{ratings.length}}</span>
          <span class="btn" :class='{active:highGood}' @click='handleGood'>满意{{goodCount}}</span>
          <span class="btn" :class='{active:highBad}' @click='handleBad'>不满意{{badCount}}</span>
        </div>
        <div class="title" @click='haveContent=!haveContent'>
          <i class="icon icon-check_circle" :class='{active:haveContent}'></i>
          <span class="text">只看有内容的评价</span>
        </div>
        <div class="content">
          <ele-contentList :ratingList='ratingList' :ratings='ratings'></ele-contentList>
        </div>
      </div>
    </div>
    <!-- <ele-cart :deliveryPrice='seller.deliveryPrice' :minPrice='seller.minPrice'></ele-cart> -->
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import star from 'components/ele-star/ele-star.vue'
import cart from 'components/ele-cart/ele-cart.vue'
import contentList from 'components/ele-contentList/ele-contentList.vue'
const OK=0;
  export default {
    name:'ele-ratings',
    props:{
            seller:Object,
            ratings:Array
        },
    data(){
      return {
        highAll: true,
        highGood:false,
        highBad: false,
        haveContent:false
      }
    },
    methods:{
      handleAll(){
        this.highAll= true;
        this.highGood=false;
        this.highBad= false;  
      },
      handleGood(){
        this.highAll= false;
        this.highGood=true;
        this.highBad= false;
      },
      handleBad(){
        this.highAll= false;
        this.highGood=false;
        this.highBad= true;
      }
    },
    computed:{
       ratingList(){
         let ratingList=[];
           if(this.highBad){
              ratingList=this.ratings.filter((rating)=>{
                return rating.rateType===1
              });
              if(this.haveContent){
                ratingList=ratingList.filter((rating)=>{
                  return rating.text
                });
                return ratingList;
              }else{
                return ratingList;
              }
           }
           if(this.highGood){
              ratingList=this.ratings.filter((rating)=>{
                return rating.rateType===0
              });
              if(this.haveContent){
                ratingList=ratingList.filter((rating)=>{
                  return rating.text
                });
                return ratingList;
              }else{
                return ratingList;
              }
           }
           if(this.highAll&&this.haveContent){
              ratingList=this.ratings.filter((rating)=>{
                return rating.text
              });
              return ratingList;
           }
           return this.ratings;
       },
      goodCount(){
        let goodCount=0;
        if(this.ratings){
          this.ratings.forEach((rating) => {
          if(rating.rateType===0){
            goodCount++;
          }
        });
        }
        return goodCount;
      },
      badCount(){
        return this.ratings.length&&(this.ratings.length-this.goodCount);
      }
    },
    components:{
      'ele-cart':cart,
      'ele-star':star,
      'ele-contentList':contentList
    },
    mounted(){
      const ratingsScroll=new BScroll(this.$refs.ratingsList,{
        click: true
      });
    }
  }
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/mixin.styl'
.ratings
  position absolute
  left 0
  right 0
  top 174px
  bottom 0
  overflow hidden
  .scores
    one-px(rgba(7,17,27,.1))
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
    one-px(rgba(7,17,27,.1))
    width 100%
    height 18px
    background #F3F5F7
  .evaluate
    .btns
      width 100%
      padding 18px
      one-px(rgba(7,17,27,.2))
      &::after 
        width 90%
      .btn
        display inline-block
        padding 8px 12px
        font-size 12px
        color #525C64 
        margin-right 8px
        background #E9EBEC
        &.active 
          color white
          background rgba(0,160,220,1)
    .title
      font-size 0
      one-px(rgba(7,17,27,.2))
      padding 18px 0
      width 100%
      .icon
        vertical-align middle
        margin-left 18px
        margin-right 4px
        font-size 20px 
        color rgba(7,17,27,.4)
        &.active 
          color rgba(0,160,220,1)
      .text 
        vertical-align middle
        font-size 12px
        line-height 12px
        font-weight 700
        color rgba(7,17,27,.5)
        
</style>
