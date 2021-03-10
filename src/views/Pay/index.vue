<template>
  <div class="pay">
    <van-sticky>
      <van-nav-bar left-arrow @click-left="onClickLeft">
        <template #title>
          <div class="user">
            <span>确认订单</span>
          </div>
        </template>
      </van-nav-bar>
    </van-sticky>
    <div class="content">
      <div class="person">
        <div class="icon" style="line-height: 60px; text-align: center">
          <van-icon size="26" name="location-o" />
        </div>
        <div class="info">
          <div>姓名：张三</div>
          <div>手机号：178******1980</div>
          <div>身份证号：341***********190</div>
        </div>
      </div>
      <div class="thing" v-for="item in cartist" :key="item.id">
        <div class="tinfo">
          <van-card
            :num="item.num"
            :price="item.price"
            :title="item.title"
            :thumb="item.img"
          />
          <div class="number">
            <div style="margin-right: 130px; font-size: 15px">购买数量</div>
            <van-stepper v-model="item.num" disabled />
          </div>
          <div class="number">
            <div style="margin-right: 30px; font-size: 15px; width: 90px">
              个人保险
            </div>
            <div style="font-size: 12px; color: grey">
              请关注保险公司信息，并阅读相关法条。
            </div>
          </div>
          <div class="number">
            <div style="margin-right: 20px; font-size: 15px; width: 90px">
              订单备注
            </div>
            <div style="font-size: 12px; color: grey">
              <input
                style="border: none; line-height: 20px"
                type="text"
                placeholder="选填"
              />
            </div>
          </div>
        </div>
        <div>
          <van-action-bar>
            <van-submit-bar
              button-text="提交订单"
              @click="showPopup"
              @submit="onCart"
            >
              <div
                style="
                  color: orangered;
                  width: 120px;
                  line-height: 50px;
                  z-index: 5;
                  margin-right: 20px;
                  font-size: 16px;
                "
              >
                合计：￥{{ item.price * item.num }}
              </div>
            </van-submit-bar>
          </van-action-bar>
        </div>
        <van-popup
          v-model:show="show"
          closeable
          position="bottom"
          :style="{ height: '55%' }"
        >
          <div
            style="
              width: 375px;
              height: 150px;
              line-height: 150px;
              text-align: center;
            "
          >
            ￥ <span style="font-size: 38px">{{ item.price * item.num }}</span>
          </div>
          <div style="padding: 20px; border-bottom: 1px solid #eee">
            <span>支付账号</span>
            <span style="float: right">178******1980</span>
          </div>
          <div style="padding: 20px; border-bottom: 1px solid #eee">
            <span>付款方式</span>
            <span style="float: right">银行卡</span>
          </div>
          <div style="text-align:center;margin-top:17px;width:375px">
            <van-button
              round
              @click="showPopup2"
              color="linear-gradient(to right, #ff6034, #ee0a24)"
            >
              立即付款
            </van-button>
          </div>
          <van-popup
            closeable
            close-icon-position="top-left"
            v-model:show="show2"
          >
            <div style="text-align: center; margin: 30px 0 0 0">
              <div style="font-weight: 600; font-size: 20px">
                请输入支付密码
              </div>
              <div style="margin: 10px 0">
                付款{{ item.price * item.num }}元
              </div>
            </div>
            <van-password-input
              :value="value"
              :focused="showKeyboard"
              @focus="showKeyboard = true"
            />
            <div style="text-align:center;margin-top:20px">
              <van-button round type="primary" @click="sure"> 确认付款 </van-button>
            </div>
            <van-number-keyboard
              v-model="value"
              :show="showKeyboard"
              @blur="showKeyboard = false"
            />
          </van-popup>
        </van-popup>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, ref, computed } from "vue";
import { useRouter } from "vue-router";
import xmraxios from "../../utils/xmraxios.js";
import { PostCart } from "../../utils/api.js";
import axios from "axios";
import { Toast } from "vant";
export default defineComponent({
  name: "Pay",
  components: {},
  props: ["id"],
  setup(props: any, context) {
    const router = useRouter();
    const state: any = reactive({
      id: props.id,
      cartist: [],
    });
    const value = ref("");
    const showKeyboard = ref(true);
    const onClickLeft = () => {
      router.go(-1);
    };
    const show = ref(false);
    const showPopup = () => {
      show.value = true;
    };
    const show2 = ref(false);
    const showPopup2 = () => {
      show2.value = true;
    };
    const getcomments = () => {
      axios.get(`/api/getcart/${props.id}`).then(({ data }) => {
        if (data) {
          // 成功了
          state.cartist = data;
          console.log(state.cartist);
        } else {
          // 失败的
          Toast.fail("请求数据失败");
        }
      });
    };
    console.log(value.value)
    const sure=()=>{
        
        console.log(value.value,'aaaa')
        if (value.value=='123456') {
            Toast("支付成功");
            router.push(`/shop/play/${props.id}`)
        }else{
            Toast("支付密码错误")
        }
    }
    getcomments();
    return {
      ...toRefs(state),
      onClickLeft,
      show,
      show2,
      showPopup,
      showPopup2,
      value,
      showKeyboard,
      sure,
    };
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
.content {
  height: 570px;
  width: 345px;
  background-color: rgb(245, 244, 244);
  position: relative;
  padding: 20px 15px;
  .person {
    height: 60px;
    background-color: #fff;
    border-radius: 16px;
    position: relative;
    padding: 20px;
    .icon {
      position: absolute;
      width: 50px;
      height: 50px;
      top: 25px;
    }
    .info {
      width: 240px;
      height: 60px;
      position: absolute;
      right: 20px;
    }
  }
  .thing {
    height: 250px;
    background-color: #fff;
    border-radius: 16px;
    position: relative;
    margin-top: 20px;
    padding: 50px 20px;
    .tinfo {
      .number {
        margin: 10px 0 10px 10px;
        display: flex;
      }
    }
  }

  /deep/.van-submit-bar__button {
    width: 200px;
  }
}
/deep/.van-popup--center {
  width: 330px;
  height: 440px;
  border-radius: 20px;
}
</style>