<template>
  <div class="login">
    <div class="bgimg">
      <img
        src="https://tr-osdcp.qunarzz.com/tr-osd-tr-manager/img/2a2e4e17727fdf12e97302f017ad70f5.jpg_1000x1000x90_499feceb.jpg"
        alt=""
      />
    </div>
    <div class="loginuser">
      <van-form @submit="onSubmit">
        <van-field
          v-model="state.username"
          name="name"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="state.password"
          type="password"
          name="pwd"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <div style="margin: 16px">
          <van-button round block type="primary" native-type="submit">
            提交
          </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, reactive, toRefs } from "vue";
import axios from "axios";
import { Toast } from "vant";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "Login",
  components: {},
  setup() {
    const router = useRouter();
    const state = reactive({
      userlist: [],
      username: "",
      password: "",
      user: "",
      pwd: "",
    });
    const getuser = () => {
      axios.get("/api/home/user").then(({ data }) => {
        if (data) {
          // 成功了;
          state.userlist = data;
          state.user = data[0].name;
          state.pwd = data[0].pwd;
        } else {
          // 失败的
          Toast.fail("请求数据失败");
        }
      });
    };
    getuser();
    const onSubmit = (values) => {
      console.log(state.username, state.password, "ooooooo");
      for(let i=0;i<state.userlist.length;i++){
        if(state.userlist[i].name==state.username&&state.userlist[i].pwd==state.password){
          sessionStorage.setItem("name", state.username);
          sessionStorage.setItem("pwd", state.password);
          router.push("/user");
          return
        }else{
          Toast.fail("请仔细确认你的账号和密码！")
        }
      }
    };

    return {
      state,
      onSubmit,
    };
  },
});
</script>
<style lang="less" scoped>
.login {
  position: relative;
  height: 100%;
  .bgimg {
    width: 375px;
    opacity: 0.7;
  }
  .loginuser {
    position: absolute;
    width: 80%;
    background-color: #fff;
    top: 200px;
    left: 37px;
    border-radius: 20px;
    z-index: 3;
    overflow: hidden;
  }
}
</style>