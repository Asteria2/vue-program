<template>
  <div class="header">
    <div class="header-top">
      <div class="logo">
        <img :src="seller.avatar">
      </div>
      <div class="info">
        <div class="title">
          <i class="brand"></i>
          <span class="text">{{seller.name}}</span>
        </div>
        <div class="descri">
          <span class="text">{{seller.description}}/{{seller.deliveryTime}}送达</span>
        </div>
        <div class="discount" v-if='seller.supports'>
          <ele-icon class="icon" size='1' :type='seller.supports[0].type'></ele-icon>
          <span class="text">{{seller.supports[0].content}}</span>
        </div>
      </div>
      <div class="btn" @click='showMask=true'>
        <span class="text" v-if='seller.supports&&seller.supports.length'>
          {{seller.supports.length}}个</span>
        <i class="icon icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="header-bottom">
      <div class="left">
        <i class="notice"></i>
        <span class="text">{{seller.bulletin}}</span>
      </div>
      <i class="icon icon-keyboard_arrow_right"></i>
    </div>
    <div class="bg">
      <img :src="seller.bgImg">
    </div>
    <transition name='mask'>
      <div class="mask" v-show="showMask">
      <div class="wrap">
        <div class="content">
          <div class="title">{{seller.name}}</div>
          <ele-star class="star" :score='seller.score' size='48'></ele-star>
          <ele-line class="line"></ele-line>
          <ele-list :supports='seller.supports'></ele-list>
          <ele-line class="line">
            <span class="text">商家公告</span>
          </ele-line>
          <div class="bulletin">
            <p>{{seller.bulletin}}</p>
          </div>
        </div>
      </div>
      <div class="footer">
        <i class="close icon-close" @click="showMask=false"></i>
      </div>
    </div>
    </transition>
  </div>
</template>

<script>
import list from './ele-list/ele-list';
import line from '../ele-line/ele-line';
import star from '../ele-star/ele-star';
import icon from '../ele-icon/ele-icon';
export default {
  name:'ele-header',
  props:{
    seller:Object
  },
  data(){
    return {
      showMask:false
    }
  },
  components:{
    'ele-list':list,
    'ele-line':line,
    'ele-star':star,
    'ele-icon':icon,
  }
};
</script>

<style lang="stylus" scoped>

@import '../../common/stylus/mixin.styl'  
.header
  font-size 0
  position relative
  background-color rgba(7,17,27,.5)
  overflow hidden
  .header-top
    .logo
      vertical-align middle
      display inline-block
      width 64px
      height 64px
      border-radius 2px
      padding-top 24px
      padding-left 24px
      margin-bottom 18px
      overflow hidden
      img 
        width 100%
        height 100%
    .info
      vertical-align middle
      display inline-block
      margin-left 16px
      .title
        margin-top 2px
        margin-bottom 8px
        .brand
            bg-image(brand)
            background-size 100% 100%
            background-repeat no-repeat
            vertical-align middle
            margin-right 6px
            display inline-block
            width 30px
            height 18px
        .text
            vertical-align middle
            font-size 16px
            font-weight bold
            color rgba(255,255,255,1)
            line-height 18px
      .descri
        margin-top 8px
        margin-bottom 10px
        .text
          font-size 12px
          color rgba(255,255,255,1)
          font-weight 200
          line-height 12px
      .discount
        .icon
          vertical-align middle
          margin-right 6px
        .text
          font-size 10px
          color rgba(255,255,255,1)
          font-weight 200
          line-height 12px
          vertical-align middle
    .btn
      position absolute
      right 12px
      top 46px
      font-size 10px
      line-height 24px
      font-weight 200
      color rgba(255,255,255,1)
      background-color rgba(0,0,0,.2)
      width 48px
      height 24px
      border-radius 8px
      text-align center
      .icon
        margin-left 2px

  .bg
    position absolute
    left 0
    top 0
    width 100%
    height 100%
    z-index -1
    img 
      width 100%
      height 100%
      filter blur(10px)
  .header-bottom
    position relative
    height 28px
    width 100%
    background rgba(7,17,27,.2)
    font-size 10px
    font-weight 200
    color rgba(255,255,255,1)
    line-height 28px
    .left
      height 100%
      overflow hidden
      margin-left 12px
      margin-right 28px
      text-overflow ellipsis
      white-space nowrap
      .notice
        bg-image(bulletin)
        width 22px
        height 12px
        margin-right 4px
        display inline-block
        background-size 100% 100%
        backgeound-repeat no-repeat
        vertical-align middle
      .text
        vertical-align middle
    .icon
      position absolute
      right 12px
      top 11px
      margin-left 4px
  .mask
    position fixed
    left 0
    top 0
    right 0
    bottom 0
    z-index 8
    font-size 16px
    font-weight 700
    line-height 16px
    text-align center
    background rgba(7,17,27,0.8)
    color rgba(255,255,255,1)
    overflow auto
    .wrap
      min-height 100%
      width 100%
      .content
        color rgba(255,255,255,1)
        padding-top 64px
        padding-bottom 96px
        .star
          margin-top 16px
          margin-bottom 28px
        .line
          margin-bottom 24px
        .bulletin
          margin 0 36px
          padding 0 12px
          text-align left
          line-height 24px
    .footer
      height 32px
      padding 32px 0
      margin-top -96px
      text-align center
      .close
        font-size 32px
        color rgba(255,255,255,.2)
        


</style>
