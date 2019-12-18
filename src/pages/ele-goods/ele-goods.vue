<template>
  <div class="goods">
    <div class="menu-wrap" ref='menuWrap'>
      <ul class="menu-list" ref='menuList'>
        <li class="menu-item"  
        v-for='(good,index) in goods' 
        :key='index' :class='{active:currentIndex===index}' @click='handleForMenuList(index)'>
          <ele-icon size='3' class="icon" :type='good.type' v-show='good.type>=0'></ele-icon>
          <span>{{good.name}}</span>
        </li>
      </ul>
    </div>
    <div class="foods-wrap" ref='foodsWrap'>
      <ul class="foods-list" ref='foodsList'>
        <li class="foods-item" v-for='(good,goodIndex) in goods' :key='goodIndex'>
          <h2 class="title">{{good.name}}</h2>
          <ul class="food-list" >
            <li class="food-item"  v-for='(food,foodIndex) in good.foods' :key='foodIndex'>
              <div class="left">
                <img :src="food.icon" class="image">
              </div>
              <div class="right">
                <div class="name">{{food.name}}</div>
                <div class="description">{{food.description}}</div>
                <div class="detail">
                  <span class="sell">月售{{food.sellCount}}  </span>
                  <span class="rating">好评率{{food.rating}}%</span>
                </div>
                <div class="prices">
                  <span class="nowPrice">¥{{food.price}}</span>
                  <span class="oldPrice" v-if='food.oldPrice'>¥{{food.oldPrice}}</span>
                </div>
                <ele-control class="addCart" @removeCount='removeCount' @addCount='addCount' :food='food' :goodIndex='goodIndex' :foodIndex='foodIndex'></ele-control>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <ele-cart class="cart" :deliveryPrice='seller.deliveryPrice' :minPrice='seller.minPrice' :selectedFoods='selectedFoods' @handleClear='handleClear'  @removeCount='removeCount' 
    @addCount='addCount' ></ele-cart>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import icon from 'components/ele-icon/ele-icon';
import control from 'components/ele-control/ele-control';
import cart from 'components/ele-cart/ele-cart';
const OK=0;
  export default {
    name:'ele-goods',
    props:{
            seller:Object
        },
    data(){
      return {
        goods:[],
        scrollY:0,
        tops:[]
      }
    },  
    components:{
      'ele-icon':icon,
      'ele-control':control,
      'ele-cart':cart
    },
    computed:{
      currentIndex(){
        //右侧滑动时左侧对应选项高亮
        let index=this.tops.findIndex((top,index)=>{
          return this.scrollY>=top && this.scrollY<this.tops[index+1]
        })
        //左侧联动右侧滑动
        if(index!==this.oldIndex){
          this.odlIndex=index;
          var liNode=this.$refs.menuList.children[index];
          this.menuScroll.scrollToElement(liNode,300)
        }
        return index;
      },
      selectedFoods(){
        let selectedFoods=[];
        this.goods.forEach((good)=>{
          good.foods.forEach((food)=>{
            if(food.count>0){
              selectedFoods.push(food)
            }
          })
        });
        return selectedFoods;
      }
    },
    methods:{
      handleClear(){
        this.selectedFoods.forEach((selectedFood)=>{
          return selectedFood.count=0;
        });
      },
      removeCount(food){
        /* let food=this.goods.find((good,index)=>{return goodIndex===index}).foods.find((food,index)=>{return foodIndex===index}); */
        if(food.count>0){
          food.count--;
        }
      },
      addCount(food){
        /* let food=this.goods.find((good,index)=>{return goodIndex===index}).foods.find((food,index)=>{return foodIndex===index}); */
        if(!food.count){
          //如果没有count这个属性就给它添加一个
          this.$set(food,'count',1)
        }else{
          food.count++;
        }
      },
      handleForMenuList(index){
        let top=this.tops[index];
        this.foodScroll.scrollTo(0,-top,300)
      },
      _initScroll(){
        this.menuScroll= new BScroll(this.$refs.menuWrap,{
          click:true
        });
        this.foodScroll= new BScroll(this.$refs.foodsWrap,{
          probeType:3,
          click:true
        });
        this.foodScroll.on('scroll',({x,y})=>{
          this.scrollY=Math.abs(y)
        })
      },
      _initTops(){
        //获取右侧食物分类列表中每一项到顶部的高度，组成一个数组
        let liNodes = this.$refs.foodsList.children;
        //这里拿到的liNodes是HTMLCollection 要将其转换成一个数组
        let top=0;
        let tops=[top];
        Array.from(liNodes).forEach((item)=>{
          top+=item.offsetHeight;
          tops.push(top);
        })
        this.tops=tops;
      }
    },
    async mounted(){
      const {errno,body}=await this.$http.goods.getGoods();
      if(errno===OK){
        this.goods=body
      }
      this._initScroll();
      //在下次 DOM 更新循环结束之后执行延迟回调。
      //在修改数据之后立即使用这个方法，获取更新后的 DOM
      this.$nextTick(()=>{
        this._initTops();
      })
    }
  }
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/mixin.styl'
.goods
  position absolute
  left 0
  right 0
  top 174px
  bottom 48px
  display flex
  overflow hidden
  .cart
    position fixed
    left 0
    bottom 0
  .menu-wrap
    flex 0 0 80px
    background-color #f3f5f7
    .menu-list
      .menu-item
        one-px(rgba(7,17,27,.1))
        box-sizing border-box
        height 54px
        font-size 12px
        line-height 14px
        font-weight 200
        color rgba(7,17,27,1)
        display flex
        padding 12px
        align-items center
        justify-content center
        &.active
          background rgba(255,255,255,1)
        &:after
          width 56px
        .icon
          margin-right 2px
  .foods-wrap
    flex 1
    .foods-list
      .foods-item
        .title
          font-size 12px
          line-height 26px
          color rgba(147,153,159,1)
          background-color #f3f5f7
          border-left 2px solid #d9dde1
          padding-left 10px
        .food-list
          .food-item
            position relative
            one-px(rgba(147,153,159,.5))
            display flex
            padding 18px
            &:after
              width 88%
            .left
              flex 0 0 56px
              margin-right 10px
              .image
                width 100%
                height 80%
            .right
              flex 1
              .name
                font-size 14px
                color rgba(7,17,27,1)
                line-height 14px
                margin-top 2px
                margin-bottom 8px
              .description
                font-size 10px
                color rgba(147,153,159,1)
                line-height 10px
              .detail
                font-size 10px
                color rgba(147,153,159,1)
                line-height 10px
                margin 10px 0
              .prices
                .nowPrice
                  font-size 14px
                  color rgba(240,20,20,1)
                  font-weight 700
                  line-height 24px
                .oldPrice
                  font-size 10px
                  color rgba(174,153,159,1)
                  font-weight 700
                  line-height 24px
                  margin-left 8px
                  text-decoration line-through
              .addCart
                position absolute
                right 18px
                bottom 18px

        
          
</style>
