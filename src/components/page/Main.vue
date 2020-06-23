<template>
    <div>
        <div class="main-div">
            <!-- 切换的时候不用重新加载 -->
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </div>
        <van-tabbar v-model="active" @change="changeTabbar(active)">
            <van-tabbar-item icon="shop">首页</van-tabbar-item>
            <van-tabbar-item icon="records">列表</van-tabbar-item>
            <van-tabbar-item icon="cart">购物车</van-tabbar-item>
            <van-tabbar-item icon="contact">会员中心</van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                active: 0,   //默认激活页面
            }
        },
        created(){
            this.changeTabbarActive()
        },
        updated(){
            this.changeTabbarActive()
        },
        methods:{
            changeTabbarActive(){
                this.nowPath = this.$route.path
                if(this.nowPath == '/Cart'){
                    this.active = 2
                }
            },
            changeTabbar(active){
                console.log(active)
                switch(active){
                    case 0:
                        this.$router.push({name:'ShoppingMall'});
                        break;
                    case 1:
                        this.$router.push({name:'CategoryList'});
                        break;
                    case 2:
                        this.$router.push({name:'Cart'})
                        break;
                }
            }
        }
    }
</script>

<style lang="css" scoped>

</style>