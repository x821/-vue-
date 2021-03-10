import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Community from '../views/Community.vue'
import Destination from '../views/Destination.vue'
import User from '../views/User.vue'
import Infodetail from '../views/Infodetail/index.vue'
import Stratrydetail from '../views/Stratrydetail/index.vue'
import Address from '../views/Address/index.vue'
import Listinfodetail from '../views/Listinfodetail/index.vue'
import Eatinfodetail from '../views/Eatinfodetail/index.vue'
import ShopHot from '../views/ShopHot/index.vue'
import ShopPlay from '../views/ShopPlay/index.vue'
import ShopPlaydeatil from '../views/ShopPlayDetail/index.vue'
import Search from '../views/Search/index.vue'
import ShopHotel from '../views/ShopHotel/index.vue'
import Login from '../views/Login/index.vue'
import toCart from '../views/toCart/index.vue'
import toCollect from '../views/toCollect/index.vue'
import CartSure from '../views/CartSure/index.vue'
import regist from '../views/Regist/index.vue'
import Active from '../views/Active/index.vue'
import Useragree from '../views/Useragree/index.vue'
import About from '../views/About/index.vue'
import Pay from '../views/Pay/index.vue'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      showtabbar:true
    }
  },
  {
    path: '/infodetail/:id',
    name: 'Infodetail',
    props:true,
    component: Infodetail,
    meta: {
      showtabbar:false
    }
  },
  {
    path: '/stratrydetail/:id',
    name: 'Stratrydetail',
    props:true,
    component: Stratrydetail,
    meta: {
      showtabbar:false
    }
  },
  {
    path: '/address',
    name: 'Address',
    props:true,
    component: Address,
    meta: {
      showtabbar:false
    }
  },
  {
    path: '/destination',
    name: 'Destination',
    component: Destination,
    meta: {
      showtabbar:true
    }
  },
  {
    path: '/listinfodetail/:id',
    name: 'Listinfodetail',
    props:true,
    component: Listinfodetail,
    meta: {
      showtabbar:false
    }
  },
  {
    path: '/eatinfodetail/:id',
    name: 'Eatinfodetail',
    props:true,
    component: Eatinfodetail,
    meta: {
      showtabbar:false
    }
  },
  {
    path: '/shop/hot/:id',
    name: 'ShopHot',
    props:true,
    component: ShopHot,
    meta: {
      showtabbar:false
    }
  },
  {
    path: '/shop/play/:id',
    name: 'ShopPlay',
    props:true,
    component: ShopPlay,
    meta: {
      showtabbar:false
    }
  },
  {
    path: '/shop/cart/sure/:id',
    name: 'CartSure',
    props:true,
    component: CartSure,
    meta: {
      showtabbar:false
    }
  },
  {
    path: '/shop/tocart',
    name: 'toCart',
    component: toCart,
    meta: {
      showtabbar:false
    }
  },
  {
    path: '/shop/tocollect',
    name: 'toCollect',
    component: toCollect,
    meta: {
      showtabbar:false
    }
  },
  {
    path: '/shop/hotel/:id',
    name: 'ShopHotel',
    props:true,
    component: ShopHotel,
    meta: {
      showtabbar:false
    }
  },
  {
    path: '/shop/playdetail/:id',
    name: 'ShopPlaydeatil',
    props:true,
    component: ShopPlaydeatil,
    meta: {
      showtabbar:false
    }
  },
  {
    path: '/search',
    name: 'Search',
    component: Search,
    meta: {
      showtabbar:false
    }
  },
  {
    path: '/community',
    name: 'Community',
    component: Community,
    meta: {
      showtabbar:true
    }
  },
  {
    path: '/user',
    name: 'User',
    component: User,
    meta: {
      showtabbar:true
    }
  },
  {
    path: '/user/login',
    name: 'Login',
    component: Login,
    meta: {
      showtabbar:false
    }
  },
  {
    path: '/user/regist',
    name: 'regist',
    component: regist,
    meta: {
      showtabbar:false
    }
  },
  {
    path: '/user/active',
    name: 'Active',
    component: Active,
    meta: {
      showtabbar:false
    }
  },
  {
    path: '/user/agree',
    name: 'Useragree',
    component: Useragree,
    meta: {
      showtabbar:false
    }
  },
  {
    path: '/user/about',
    name: 'About',
    component: About,
    meta: {
      showtabbar:false
    }
  },
  {
    path: '/shop/pay/:id',
    name: 'Pay',
    props:true,
    component: Pay,
    meta: {
      showtabbar:false
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
