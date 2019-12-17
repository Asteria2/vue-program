<template>
  <div class="cart">
    <div class="left">
      <div class="wrap">
        <div class="count" v-show='totalCount>0'>
          <span class="text">{{totalCount}}</span>
        </div>
        <div class="iconWrap" :class="{active:totalPrice>0}">
          <i class="icon icon-shopping_cart"></i>
        </div>
      </div>
      <div class="text">
        <span class="total" :class="{active:totalPrice>0}">¥{{totalPrice}}</span>
        <span class="line"></span>
        <span class="deliveryPrice">另需配送费¥{{deliveryPrice}}元</span>
      </div>
    </div>
    <div class="right" :class="{active:totalPrice>=minPrice}">
      <span class="text">{{payText}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name:'ele-cart',
    props:{
      deliveryPrice:Number,
      minPrice:Number,
      selectedFoods:Array
    },
    computed:{
      totalPrice(){
        let totalPrice=0;
        this.selectedFoods.forEach((food)=>{
          totalPrice+=food.count*food.price
        })
        return totalPrice;
      },
      totalCount(){
        let totalCount=0;
        this.selectedFoods.forEach((food)=>{
          totalCount+=food.count;
        })
        return totalCount;
      },
      payText(){
        if(this.totalPrice === 0){
            return `¥${this.minPrice}起送`
        }else if(this.totalPrice < this.minPrice){
            return `还差¥${this.minPrice - this.totalPrice}起送`
        }else {
            return `去结算`
        }
      }
    }
  }
</script>

<style scoped lang='stylus'>
.cart
  display flex
  width 100%
  height 48px
  .left
    display flex
    flex 1
    background #141d27
    .wrap
      position relative
      top -10px
      display flex 
      align-items center 
      justify-content center
      width 56px
      height 56px
      background #141d27
      border-radius 50%
      margin 0 15px
      .count 
        position absolute
        right 0
        top 0
        display inline-block
        width 24px
        height 16px
        border-radius 6px
        background rgba(240,20,20,1)
        box-shadow 0px 4px 8px 0px rgba(0,0,0,.4)
        .text 
          color white
          font-size 9px
          line-height 16px
          text-align center
          font-weight 700
      .iconWrap
        display flex 
        align-items center 
        justify-content center
        width 44px
        height 44px
        background rgba(255,255,255,.4)
        border-radius 50%
        &.active  
          background rgba(0,160,220,1)
          .icon 
            color white
        .icon
          display flex 
          align-items center 
          justify-content center
          font-size 24px
          line-height 24px
          color rgba(255,255,255,.6)
    .text
      display flex 
      align-items center 
      justify-content center
      font-size 16px
      line-height 24px
      font-weight 700
      color rgba(255,255,255,.4)
      .total 
        font-weight 700
        &.active 
          color white
      .line 
        display inline-block
        height 30px
        width 1px
        margin 0 12px
        background rgba(255,255,255,.1)
      .deliveryPrice
        font-size 12px
        font-weight 200
  .right 
    display flex 
    align-items center 
    justify-content center
    flex 0 0 105px
    background rgba(0,0,0,.6)
    &.active 
      background rgba(0,160,220,1)
      .text
        color white
    .text 
      font-size 12px
      line-height 24px
      font-weight 700
      color rgba(255,255,255,.4)
      
</style>