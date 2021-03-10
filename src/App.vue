<template>
  <div class="nav">
    <router-view />
    <van-tabbar route v-model="active" v-show="$route.meta.showtabbar">
      <van-tabbar-item icon="home-o" to='/'>首页</van-tabbar-item>
      <van-tabbar-item icon="location-o" to='/destination'>目的地</van-tabbar-item>
      <van-tabbar-item icon="shop-o" to='/community'>商城</van-tabbar-item>
      <van-tabbar-item icon="contact" to='/user'>我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script lang="ts">
import { Toast } from "vant";
import { defineComponent } from "vue";
import { ref } from 'vue';

export default defineComponent({
  setup() {
    const active = ref(0);
    return { active };
  },
});
</script>

<style lang="less">
*{
  margin: 0;
  padding: 0;
}
.nav{
  padding-bottom: 50px;
  overflow: hidden;
  z-index:99999;
}
.van-tabbar-item--active {
    color: black!important;
    font-size:18px;
    font-weight:600;
    background-color: #efefef!important;
    .van-icon{
      font-size:26px!important;
      color:orange;
      font-weight:800;
    }
}
</style>
