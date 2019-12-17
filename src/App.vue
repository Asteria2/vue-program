<template>
  <div id="app">
    <ele-header :seller='seller'></ele-header>
    <div class="nav">
      <router-link to="/goods">商品</router-link>
      <router-link to="/ratings">评价</router-link>
      <router-link to="/seller">商家</router-link>
    </div>
    <router-view :seller='seller'></router-view>
  </div>
</template>

<script>
import Header from "./components/ele-header/ele-header";
const OK=0;
export default {
  name: "app",
  data(){
    return {
      seller:{}
    }
  },
  components: {
    "ele-header": Header
  },
  async mounted(){
    const data=await this.$http.sellers.getSellers();
    if(data.errno===OK){
      this.seller=data.body
    }
  }
};
</script>

<style lang="stylus" scoped>
@import './common/stylus/mixin.styl';
#app 
  .nav 
    one-px(rgba(7, 17, 27, 0.1))
    display flex
    height 40px
    line-height 40px
    a 
      display block
      flex 1
      font-size 14px
      color rgb(77, 85, 93)
      text-align center
      &.active 
        color rgb(240, 20, 20)
</style>


