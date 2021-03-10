<template>
  <div class="regist">
    <van-sticky>
      <van-nav-bar left-arrow @click-left="onClickLeft">
        <template #title>
          <div class="user">
            <span>注册</span>
          </div>
        </template>
      </van-nav-bar>
    </van-sticky>
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px">
        <van-button round block type="primary" native-type="submit">
          注册
        </van-button>
      </div>
    </van-form>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, reactive, toRefs, computed } from "vue";
import { Toast } from "vant";
// import { NewsInfoUrl } from "../tools/api";
import axios from "axios";
import xmraxios from "../../utils/xmraxios.js";
import { Postuser } from "../../utils/api.js";
import { useRouter } from "vue-router";

export default defineComponent({
  props: [],
  setup() {
    const router = useRouter();
    //状态数据
    const state = reactive({
      username: "",
      password: "",
    });
    const value = ref([]);
    const onClickLeft=()=>{
        router.push("/user")
    }
    const onSubmit = async () => {
      console.log(state.username, state.password);
      let result = await xmraxios("POST", Postuser, {
        name: state.username,
        pwd:state.password
      });
      state.username = ""
      state.password=''
      router.push("/user")
      Toast("注册成功")
    };

    return { ...toRefs(state), onSubmit, value,onClickLeft };
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
.regist{
    background-color: chocolate;
    height: 665px;
    background-image: url(https://p1-q.mafengwo.net/s18/M00/54/5C/CoUBYGA1EvWAHH9VAATAXSbJVDE741.jpg?imageMogr2%2Fthumbnail%2F1360x%2Fstrip%2Fquality%2F90);
    .van-form{
        z-index: 9;
        width: 340px;
        position: absolute;
        top: 280px;
        left: 20px;
        background-color:#fff;
        border-radius: 20px;
        overflow: hidden;
        /deep/.van-cell{
            background-color: transparent;
            .van-field__control{
                background-color: transparent;
            }
            input{
                background-color: transparent;
            }
        }
    }
}
</style>