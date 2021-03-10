<template>
  <div class="user">
    <div class="header">
      <div v-if="uname == null" class="userinfo">
        <img
          src="http://gallery.youxiake.com/Public/Data/upload/productimg/202102/24/6035fbeb2a79f.jpg"
          alt=""
        />
        <div class="cover" @click="linktologin">
          <div class="coverimg">
            <img
              src="https://img2.youxiake.com/default_avatar.png?imageView2/0/w/400"
              alt=""
            />
          </div>
          <div class="tip">登录</div>
        </div>
      </div>
      <div v-else class="userinfo">
        <img
          src="http://gallery.youxiake.com/Public/Data/upload/productimg/202102/24/6035fbeb2a79f.jpg"
          alt=""
        />
        <div class="cover">
          <div class="coverimg">
            <img :src="userinfo.cover" />
          </div>
          <div class="tip">{{ uname }}</div>
        </div>
      </div>
      <div class="regist" @click="linktoregist">没有账号？请先注册</div>
    </div>
    <div class="contents">
      <van-cell icon="bag-o" title="集市订单" is-link :to="'/shop/tocart'" />
      <van-coupon-cell
        icon="coupon-o"
        title="优惠券"
        :coupons="coupons"
        :chosen-coupon="chosenCoupon"
        @click="showList = true"
      />
      <van-cell icon="star-o" title="我的收藏" is-link to="/shop/tocollect" />
      <van-cell icon="bullhorn-o" title="活动签到" is-link to="/user/active" />
      <van-cell icon="pending-payment" title="服务协议" is-link to="/user/agree" />
      <van-cell icon="question-o" title="关于" is-link to="/user/about" />
    </div>
    <div class="footer" v-show="uname">
      <van-button @click="layout" type="default">退出登录</van-button>
    </div>
    <van-popup
      v-model:show="showList"
      round
      position="bottom"
      style="height: 90%; padding-top: 4px"
    >
      <van-coupon-list
        :coupons="coupons"
        :chosen-coupon="chosenCoupon"
        :disabled-coupons="disabledCoupons"
        @change="onChange"
        @exchange="onExchange"
      />
    </van-popup>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, reactive, toRefs } from "vue";
import axios from "axios";
import { Toast } from "vant";
import { useRouter } from "vue-router";
const coupon = {
  available: 1,
  condition: "无使用门槛\n最多优惠12元",
  reason: "",
  value: 150,
  name: "优惠券名称",
  startAt: 1489104000,
  endAt: 1514592000,
  valueDesc: "1.5",
  unitDesc: "元",
};
export default defineComponent({
  name: "User",
  components: {},
  setup() {
    const router = useRouter();
    const uname = sessionStorage.getItem("name");
    const upwd = sessionStorage.getItem("pwd");
    const show2 = ref(false);
    const showPopup = () => {
      show2.value = true;
    };
    const linktologin = () => {
      router.push("/user/login");
    };
    const linktoregist = () => {
      router.push("/user/regist");
    };
    const state = reactive({
      userinfo: [],
      coupons: [coupon],
      showList: false,
      chosenCoupon: -1,
    });
    const onChange = (index) => {
      state.showList = false;
      state.chosenCoupon = index;
    };
    const onExchange = (code) => {
      state.coupons.push(coupon);
    };
    const getinfo = () => {
      axios.get(`/api//home/user/${uname}`).then(({ data }) => {
        if (data) {
          // 成功了
          state.userinfo = data[0];
        } else {
          // 失败的
          Toast.fail("请求数据失败");
        }
      });
    };
    getinfo();
    const layout = () => {
      sessionStorage.removeItem("name"); //移除sessionStorage
      sessionStorage.removeItem("pwd");
      //刷新页面
      window.location.reload();
    };
    return {
      linktologin,
      uname,
      upwd,
      ...toRefs(state),
      layout,
      linktoregist,
      show2,
      showPopup,
      onChange,
      onExchange,
      disabledCoupons: [coupon],
    };
  },
});
</script>
<style lang="less" scoped>
.user {
  background-color: rgb(248, 248, 248);
  height: 616px;
}
.header {
  width: 100%;
  height: 212px;
  .userinfo {
    position: relative;
    img {
      width: 100%;
      position: absolute;
      z-index: 1;
      opacity: 0.6;
      border-radius: 0 0 20px 20px;
    }
    .cover {
      position: absolute;
      z-index: 3;
      font-size: 18px;
      font-weight: 600;
      .coverimg {
        width: 72px;
        height: 72px;
        z-index: 4;
        background-color: #fff;
        opacity: 1;
        display: inline-block;
        border-radius: 50%;
        overflow: hidden;
        margin: 70px 20px;
        img {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          overflow: hidden;
          z-index: 5;
          opacity: 1;
        }
      }
      .tip {
        position: absolute;
        top: 100px;
        left: 100px;
        width: 100px;
        color: rgb(26, 0, 0);
      }
    }
  }
  .regist {
    position: absolute;
    background-color: rgb(253, 247, 247);
    z-index: 6;
    border-radius: 17px;
    opacity: 0.6;
    padding: 4px;
    color: rgb(2, 150, 118);
    right: 0;
    top: 8px;
  }
}
.contents {
  margin: 20px 10px 10px;
  border-radius: 16px;
  overflow: hidden;
}
.footer {
  margin: 20px 10px 10px;
  border-radius: 16px;
  overflow: hidden;
  height: 50px;
  background-color: #fff;
  text-align: center;
  .van-button--default {
    width: 100%;
    height: 50px;
    border: 0;
    line-height: 50px;
  }
}
</style>