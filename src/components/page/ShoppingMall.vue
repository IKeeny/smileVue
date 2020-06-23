<template>
    <div>
        <div class="search-bar">
           <van-row>
            <van-col span="3">
                <img :src="locationIcon" width="80%" class="location">
            </van-col>
            <van-col span="16">
                <input type="text" class="search-input"></input>
            </van-col>
            <van-col span="5">
                <van-button size="mini" class="search">查找</van-button>
            </van-col>
           </van-row>
        </div>
        <!-- swiper area -->
        <div class="swiper-area">
           <van-swipe :autoplay="1000">
               <van-swipe-item v-for="(banner,index) in bannerPicArray" :key="index">
                   <!-- 懒加载，就不用src了 -->
                   <img v-lazy="banner.image" width="100%"/>
               </van-swipe-item>
           </van-swipe>
        </div>
        <!-- type bar -->
        <div class="type-bar">
           <div v-for="(cate,index) in category" :key="index" class="first">
               <img v-lazy="cate.image" width="90%"/>
               <span>{{cate.mallCategoryName}}</span>
           </div>
        </div>
        <!-- adBanner area -->
        <div class="ad-banner">
            <img v-lazy="adBanner.PICTURE_ADDRESS" width="100%"/>
        </div>
        <!-- recommend goods area -->
        <div class="recommend-area">
            <div class="recommend-title">
               商品推荐
            </div>
            <div class="recommend-body">
                <swiper :options="swiperOption">
                    <swiper-slide v-for="(item,index) in recommendGoods" :key="index">
                        <div class="recommend-item">
                            <img :src="item.image" width="60%"/>
                            <div>{{ item.goodsName }}</div>
                            <div>￥{{ item.price | moneyFilter }}(￥{{ item.mallPrice | moneyFilter }})</div>
                        </div>
                    </swiper-slide>
               </swiper>
            </div>
        </div>

        <!-- <swiperDefault></swiperDefault>
        <swiperDefault2></swiperDefault2>
        <swiperDefault3></swiperDefault3>
        <swiperText></swiperText> -->
        <floor-component :floorData="floor1" :floorTitle="floorName.floor1"></floor-component>
        <floor-component :floorData="floor2" :floorTitle="floorName.floor2"></floor-component>
        <floor-component :floorData="floor3" :floorTitle="floorName.floor3"></floor-component>
        <!-- hot area -->
        <div class="hot-area">
            <div class="hot-title">热卖商品</div>
            <div class="hot-goods">
                <!-- 这里需要一个list组件 -->
                <van-list>
                    <van-row gutter="20">
                        <van-col span="12" v-for="(item,index) in hotGoods" :key="index">
                           <goods-info :goodsId='item.goodsId' :goodsImage="item.image" :goodsName="item.name" :goodsPrice="item.price"></goods-info>
                        </van-col>
                    </van-row>
                </van-list>
            </div>
        </div>
        
    </div>
</template>

<script>
    import axios from 'axios'
    import swiperDefault from '../swiper/swiperDefault'
    import swiperDefault2 from '../swiper/swiperDefault2'
    import swiperDefault3 from '../swiper/swiperDefault3'
    import swiperText from '../swiper/swiperText'
    import floorComponent from '../component/floorComponent'
    import {toMoney} from '@/filter/moneyFilter'
    import goodsInfo from '../component/goodsInfoComponent'
    import url from '@/serviceAPI.config'

    export default {
        data(){
            return{
                msg:'ShoppingMall',
                locationIcon: require('../../assets/image/location.png'),
                bannerPicArray:[],
                category:[],
                adBanner:'',
                recommendGoods:[],
                floor1:[],
                floor2:[],
                floor3:[],
                floorName:{},
                hotGoods:[],  //热卖商品
                swiperOption:{
                    slidesPerView:3,
                    loop:true
                }
            }
        },
        filters:{
            moneyFilter(money){
                return toMoney(money)
            }
        },
        components:{
            swiperDefault,
            swiperDefault2,
            swiperDefault3,
            swiperText,
            floorComponent,
            goodsInfo,

        },
        created(){
            axios({
                url: url.getShoppingMallInfo,
                method:'get'
            })
            .then(response=>{
                console.log(response);
                if(response.status == 200){
                   this.bannerPicArray = response.data.data.slides;
                   this.category = response.data.data.category;
                   this.adBanner = response.data.data.advertesPicture;
                   this.recommendGoods = response.data.data.recommend;
                   this.floor1 = response.data.data.floor1;
                   this.floor2 = response.data.data.floor2;
                   this.floor3 = response.data.data.floor3;
                   this.floorName = response.data.data.floorName;
                   this.hotGoods = response.data.data.hotGoods;
                }
            })
            .catch(error=>{
                console.log(error);
            })
        }
    }
</script>

<style lang="css" scoped>
.search-bar{
    height:2.2rem;
    background-color: #e5017d;
    line-height: 2.2rem;
    overflow: hidden;
}
.search-input{
    width: 100%;
    height: 1.3rem;
    border-top: 0px;
    border-left: 0px;
    border-right: 0px;
    border-bottom: 1px solid #fff !important;
    background-color: #e5017d;
    color: #fff;
}
.location{
    padding-top: 0.2rem;
    padding-left: 0.3rem;
}
.search{
    margin-left: 0.4rem;
}
.swiper-area{
    clear:both;
    max-height: 12rem;
    overflow: hidden;
}
.type-bar{
    background-color: #fff;
    margin:0 .3rem .3rem .3rem;
    border-radius: .3rem;
    font-size:14px;
    display: flex;
    flex-direction:row;
    /* flex-wrap:nowrap; */
}
.type-bar div{
    padding: 0.3rem;    
    font-size: 12px;
    text-align: center;
    flex:1;
}
/* .first:first-child {
    width: 20.8rem;
} */
.recommend-area{
    background-color: #fff;
    margin-top: 0.3rem;
}
.recommend-title{
    border-bottom: 1px solid #eee;
    font-size: 14px;
    padding: 0.2rem;
    color: #e5017d;
}
.recommend-body{
    border-bottom: 1px solid #eee;
}
.recommend-item{
    width:99%;
    border-right:1px solid #eee;
    font-size: 12px;
    text-align: center;
}

.hot-area{
    text-align: center;
    font-size: 14px;
    height: 1.8rem;
    line-height: 1.8rem;
}
.hot-goods{
    height: 130rem;
    overflow: hidden;
    background-color: #fff;
}
</style>