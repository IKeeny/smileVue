<template>
    <div>
       <div class="floor">
            <div class="floor-title">
               {{floorTitle}}
            </div>
            <div class="floor-nomaly">
               <div class="floor-one">
                   <img :src="floorData0.image" width="100%"/>
               </div>
               <div>
                   <div class="floor-two"><img :src="floorData1.image" width="100%"/></div>
                   <div><img :src="floorData2.image" width="100%"/></div>
               </div>
           </div>
           <div class="floor-rule">
               <div v-for="(item,index) in floorData.slice(3)" :key="index">
                   <img :src="item.image" width="100%"/>
               </div>
           </div>
        </div>
    </div>
</template>

<script>
    export default {
        props:['floorData','floorTitle'],
        data(){
            return{
                floorData0:{},
                floorData1:{},
                floorData2:{}
            }
        },
        created(){
            //这样获取不到
            // this.floorData0 = this.floorData[0],
            // this.floorData1 = this.floorData[1],
            // this.floorData2 = this.floorData[2]
        },
        watch:{
            floorData:function(val){
            //    console.log(this.floorData),
               this.floorData0 = this.floorData[0],
               this.floorData1 = this.floorData[1],
               this.floorData2 = this.floorData[2]
            }
        }
    }
</script>

<style lang="css" scoped>
.floor-title{
    text-align: center;
    height: 1.8rem;
    line-height: 1.8rem;
    font-size: 14px;
}
.floor-nomaly{
    display: flex;
    flex-direction: row;
    border-bottom: 1px solid #ddd;
    background-color: #fff;
}
.floor-nomaly div{
    width: 10rem;
    box-sizing: border-box;
}
.floor-one{
    border-right: 1px solid #ddd;
}
.floor-two{
    border-bottom: 1px solid #ddd;
}
.floor-rule{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    background-color: #fff;
}
.floor-rule div{
    box-sizing: border-box;
    width: 10rem;
    border-bottom: 1px solid #ddd;
}
.floor-rule div:nth-child(odd){
    border-right: 1px solid #ddd;
}
</style>