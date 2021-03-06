import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import ShoppingMall from '@/components/page/ShoppingMall'
import Register from '@/components/page/Register'
import Login from '@/components/page/Login'
import Goods from '@/components/page/Goods'
import CategoryList from '@/components/page/CategoryList'
import Cart from '@/components/page/Cart'
import Main from '@/components/page/Main'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/main',
      name:'Name',
      component:Main,
      children:[
        {
          path: '/',
          name: 'ShoppingMall',
          component: ShoppingMall
        },{
          path:'/CategoryList',
          name:'CategoryList',
          component:CategoryList
        },{
          path:'/Cart',
          name:'Cart',
          component:Cart
        }
      ]
    },
    {
      path:'/register',
      name:'Register',
      component: Register
    },{
      path:'/login',
      name:'Login',
      component: Login
    },{
      path:'/goods',
      name:'Goods',
      component: Goods
    }
  ]
})
