<template>
<div>
    <div class="cart">
      <div class="left"  @click='handleFold'>
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
      <div class="balls">
        <div class="ballWrap" v-for='(ball,index) in balls' :key='index'>
          <transition name='drop' v-on:before-enter="beforeDrop" v-on:enter="dropping"
            v-on:after-enter="afterDrop">
            <i class="ball" v-show='ball.show'></i>
          </transition>
        </div>
      </div>
    </div>
  <transition name='detailCart'>
    <div class="detailCart" v-show='showCart'>
      <div class="topic">
        <span class="title">购物车</span>
        <span class="clear" @click='handleClear'>清空</span>
      </div>
      <div class="content" ref='cartContent'>
        <ul class="list">
          <li class="item" v-for='(selectedFood,index) in selectedFoods' :key='index'>
            <div class="name">{{selectedFood.name}}</div>
            <div class="price">
              <span class="sell">¥{{selectedFood.count*selectedFood.price}}</span>
              <ele-control  @removeCount='removeCount' @addCount='addCount' class="control" :food='selectedFood'></ele-control>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </transition>
  <div class="mask" v-show="showCart" @click='fold=!fold'></div>
</div>
</template>

<script>
import BScroll from 'better-scroll'
import control from 'components/ele-control/ele-control.vue'
import PubSub from 'pubsub-js'
import {transform} from '@/util'
  export default {
    name:'ele-cart',
    props:{
      deliveryPrice:Number,
      minPrice:Number,
      selectedFoods:Array
    },
    components:{
      'ele-control':control
    },
    data(){
      return {
        balls:[
          {show:false},
          {show:false},
          {show:false},
          {show:false},
          {show:false}
        ],
        dropBalls:[],
        fold:true
      }
    },
    computed:{
      showCart(){
        if(this.totalCount<=0){
          this.fold=true;
          return false;
        }
        return !this.fold;
      },
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
    },
    methods:{
      addCount(food){
        this.$emit('addCount',food)
      },
      removeCount(food){
        this.$emit('removeCount',food)
      },
      handleFold(){
        if(this.totalCount<=0){
          return ;
        }
        this.fold=!this.fold;
      },
      handleClear(){
        this.$emit('handleClear')
      },
      drop(target){
        for (let i = 0; i < this.balls.length; i++) {
          const ball = this.balls[i];
          if(!ball.show){
            ball.show=true;
            ball.target=target;
            this.dropBalls.push(ball);
            return;
          }
        }
      },
      beforeDrop(el){
        //页面未渲染完成之前过渡效果不会触发
        //页面未渲染之前确定当前show为true的小球的位置
        for (let i = 0; i < this.balls.length; i++) {
          const ball = this.balls[i];
          if(ball.show){
            let viewH=document.documentElement.clientHeight;
            let target=ball.target.getBoundingClientRect();
            let translateX=target.left-32;
            let translateY=viewH-target.top-40;
            transform(el,'translateX',translateX);
            transform(el,'translateY',-translateY);
          }
        }
      },
      dropping(el){
        //强制浏览器渲染一次页面
        el.offsetHeight;
        this.$nextTick(()=>{
          transform(el,'translateX',0);
          transform(el,'translateY',0);
        })
      },
      afterDrop(el){
        let ball=this.dropBalls.shift();
        ball.show=false;
        el.style.display='none';
      }
    },
    mounted(){
      PubSub.subscribe('ballAnimation',(msg,target)=>{
        this.drop(target);
      });
      this.cartScroll=new BScroll(this.$refs.cartContent,{
        click: true
      });
    }
  }
</script>

<style scoped lang='stylus'>
@import '../../common/stylus/mixin.styl'
.cart
  position relative
  z-index 3
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
  .balls
    .ballWrap
      .ball
        position absolute
        left 35px
        bottom 22px
        width 16px
        height 16px
        border-radius 50%
        background rgba(0,160,220,1)
        transition .5s transform ease
.detailCart
    z-index 2
    max-height 258px
    width 100%
    position absolute
    left 0
    bottom 48px
    .topic
      padding 0 18px
      height 38px
      background #f3f5f7
      border-bottom 2px solid rgba(7,17,27,.1)
      .title
        float left
        font-size 14px
        line-height 40px
        color rgba(7,17,27,1)
        font-weight 200
      .clear
        float right
        font-size 12px
        line-height 40px
        color rgba(0,160,220,1)
    .content
      max-height 218px
      overflow hidden
      padding 0 18px
      background rgba(255,255,255,1)
      .item 
        height 48px
        one-px(rgba(7,17,27,.1))
        .name 
          float left
          font-size 14px
          color rgba(7,17,27,1)
          line-height 48px
        .price 
          float right
          line-height 48px
          width 120px
          .sell 
            float left
            font-size 14px
            font-weight 700
            color rgba(240,20,20,1)
          .control 
            float right
.mask
  position fixed
  left 0
  top 0
  z-index 1
  width 100%
  height 100% 
  background rgba(7,17,27,.6)
  backdrop-filter blur(10px)
</style>