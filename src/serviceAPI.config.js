const BASEURL = "http://mock.studyinghome.com/mock/5ee2d23ba65eeb7e14ae9879/SmileVue/"
const LOCALURL = 'http://localhost:3000/'
const URL = {
    getShoppingMallInfo : BASEURL + 'index',  //商城首页所有信息
    getGoodsInfo : BASEURL + 'getGoodsInfo',
    registerUser : LOCALURL + 'user/register',  //用户注册接口
    login : LOCALURL + 'user/login' , //用户登录接口
    getDetailGoodsInfo : LOCALURL + 'goods/getDetailGoodsInfo',   //获取商品详情信息的接口
    getCategoryList : LOCALURL + 'goods/getCategoryList',   //得到商品大类信息
    getCategorySubList : LOCALURL + 'goods/getCategorySubList',   //得到商品小类信息
    getGoodsListByCategorySubId : LOCALURL + 'goods/getGoodsListByCategorySubId',   //得到商品小类具体信息
}

module.exports = URL