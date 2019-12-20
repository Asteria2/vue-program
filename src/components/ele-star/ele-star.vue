<template>
  <div class="stars" :class="`stars-${size}`">
    <div class="star" v-for='(item,index) in starArr' :key='index' :class='item'>
    </div>
  </div>
</template>

<script>
  const Length=5;
  const ON='on';
  const OFF='off';
  const HALF='half';
  export default {
    name:'ele-star',
    props:{
      score:Number,
      size:String
    },
    computed:{
      starArr(){
        //score  0.3 0.8 1.2 1.6
        var arr=[];
        const score=Math.floor(this.score*2)/2;
        const needHalf=(score%1)===0?false:true;
        const needOn=Math.floor(score)
        for(let i=0;i<needOn;i++){
          arr.push(ON);
        }
        if(needHalf){
          arr.push(HALF);
        }
        while(arr.length<Length){
          arr.push(OFF)
        }
        return arr;

      }
    }
  }
</script>

<style scoped lang='stylus'>
@import '../../common/stylus/mixin.styl'
.stars
  display inline-flex
  .star
    background-size 100% 100%
    background-repeat no-repeat
  &.stars-48
    .star
      width 20px
      height 20px
      margin-right 20px
      &:last-child
        margin-right 0
      &.on
        bg-image(star48_on)
      &.half
        bg-image(star48_half)
      &.off
        bg-image(star48_off)
  &.stars-36
    .star
      width 15px
      height 15px
      margin-right 5px
      &:last-child
        margin-right 0
      &.on
        bg-image(star36_on)
      &.half
        bg-image(star36_half)
      &.off
        bg-image(star36_off)
  &.stars-24
    .star
      width 10px
      height 10px
      margin-right 3px
      &:last-child
        margin-right 0
      &.on
        bg-image(star24_on)
      &.half
        bg-image(star24_half)
      &.off
        bg-image(star24_off)
</style>