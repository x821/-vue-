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
    <van-card
      v-for="item in cartist"
      :key="item.id"
      :num="item.num"
      :price="item.price"
      :title="item.title"
      :thumb="item.img"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, reactive, toRefs } from "vue";
import axios from "axios";
import { Toast } from "vant";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "toCart",
  components: {},
  props: [],
  setup(props: any, context) {
    const state = reactive({
      cartist: [],
    });
    const getcomments = () => {
      axios.get("/api/getcart").then(({ data }) => {
        if (data) {
          // 成功了
          state.cartist = data;
        } else {
          // 失败的
          Toast.fail("请求数据失败");
        }
      });
    };
    const router =useRouter()
    const onClickLeft=()=>{
        router.go(-1)
    }
    getcomments();
    return { ...toRefs(state),onClickLeft };
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
</style>