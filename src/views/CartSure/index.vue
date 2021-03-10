<template>
  <div>
    <van-sticky>
      <van-nav-bar left-arrow @click-left="onClickLeft">
        <template #title>
          <div class="user">
            <span>订单</span>
          </div>
        </template>
      </van-nav-bar>
    </van-sticky>
    <div class="yellow">
      <div class="tip">
        <van-notice-bar
          left-icon="volume-o"
          text="可接待体温正常、持有健康码绿码、未途经或来自国内疫情中、高风险地区的境内人员。若您持有非绿码、来自或途经国内疫情中、高风险地区、或是港澳台/外籍人员，请务必详细了解当地疫情相关规定，如有不明事宜可与游侠客工作人员联系。"
        />
      </div>
    </div>
    <div class="info">
      <div class="imginfo">
        <img :src="img" />
      </div>
      <div style="height: 180px"></div>
      <div class="ddinfo">
        <div class="title">{{ title }}</div>
        <div class="time">出行时间：{{ timeinfo }}</div>
        <div class="theme">行程套餐：{{ theme }}</div>
      </div>
      <div class="personinfo">
        <div class="numinfo">
          <div class="num">购买数量</div>
          <van-stepper
            v-model="value"
            theme="round"
            button-size="22"
            disable-input
          />
        </div>
      </div>
    </div>
    <van-action-bar>
      <van-submit-bar button-text="下一步" @submit="onCart">
        <div
          style="color:orangered;width: 120px; line-height: 50px;z-index: 5;margin-right:20px;font-size:20px"
        >
          单价：￥{{ price }}
        </div>
      </van-submit-bar>
    </van-action-bar>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, ref, computed } from "vue";
import { useRouter } from "vue-router";
import xmraxios from "../../utils/xmraxios.js";
import { PostCart } from "../../utils/api.js";
import { Toast } from "vant";
import { stringify } from "qs";
export default defineComponent({
  name: "toCart",
  components: {},
  props: ["id"],
  setup(props: any, context) {
    const router = useRouter();
    const state:any = reactive({
      id: props.id,
      title: "",
      timeinfo: "",
      img: "",
      num: "",
      price: '',
      theme: "",
    });
    const value = ref(1);
    
    console.log(value.value, "jjjj");
    state.title = sessionStorage.getItem("title");
    state.timeinfo = sessionStorage.getItem("timego");
    state.img = sessionStorage.getItem("img");
    state.price = sessionStorage.getItem("price");
    state.theme = sessionStorage.getItem("theme");
    console.log(state.price, "hhhhhh");
    console.log(state.title, "gggggg");
    console.log(state.id, "llllll");
    const onCart = async () => {
      let result = await xmraxios("POST", PostCart + props.id, {
        title: state.title,
        timeinfo: state.timeinfo,
        img: state.img,
        num: value.value,
        price:state.price,
      });
      router.push(`/shop/pay/${props.id}`)
    };
    const totalprice = computed(()=>{state.price*value.value})
    const onClickLeft = () => {
      //router.push(`/shop/play/${props.id}`);
      router.go(-1);
    };
    //pushCart();
    return { ...toRefs(state), onClickLeft, value, onCart,totalprice };
  },
});
</script>
<style lang="less" scoped>
/deep/.van-nav-bar__left {
  color: #000;
  /deep/.van-icon {
    color: #000 !important;
  }
  /deep/.van-nav-bar__arrow {
    font-size: 20px !important;
  }
}
/deep/.van-nav-bar {
  background-color: #ffd61d;
}
.yellow {
  background-color: #ffd61d;
  height: 90px;
  position: relative;
  .tip {
    position: absolute;
    width: 323px;
    margin: 10px 25px;
    border-radius: 8px;
    overflow: hidden;
  }
}
/* =========订单信息================================ */
body {
  height: 580px;
}
.info {
  color: rgb(29, 29, 29);
  font-size: 15px;
  margin: 0 16px;
  .imginfo {
    position: absolute;
    top: 110px;
    left: 17px;
    width: 340px;
    height: 200px;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      border-radius: 20px;
    }
  }
  .ddinfo {
    background-color: rgb(247, 250, 250);
    padding: 5px;
    border-radius: 16px;

    .title {
      padding: 6px;
      line-height: 22px;
    }
    .time {
      padding: 6px;
      font-size: 13px;
    }
    .theme {
      padding: 6px;
    }
  }
  .personinfo {
    padding: 6px;
    margin: 20px 0;
    background-color: rgb(247, 250, 250);
    border-radius: 16px;
    .numinfo {
      display: flex;
      .num {
        flex: 1;
        display: inline-block;
      }
    }
  }
}
/deep/.van-action-bar {
  border-top: 1px solid #ccc;
}
/deep/.van-button {
  width: 200px;
}
</style>