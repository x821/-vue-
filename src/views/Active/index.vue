<template>
  <div>
    <van-sticky>
      <van-nav-bar left-arrow @click-left="onClickLeft">
        <template #title>
          <div class="user">
            <span>活动签到</span>
          </div>
        </template>
      </van-nav-bar>
      <van-empty
        class="custom-image"
        image="https://img01.yzcdn.cn/vant/custom-empty-image.png"
        description="暂无活动哦~"
      />
    </van-sticky>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, ref, computed } from "vue";
import { useRouter } from "vue-router";
import xmraxios from "../../utils/xmraxios.js";
import { PostCart } from "../../utils/api.js";
import { Toast } from "vant";
export default defineComponent({
  name: "Active",
  components: {},
  props: [],
  setup(props: any, context) {
    const router = useRouter();
    const state: any = reactive({});
    const onClickLeft=()=>{
        router.go(-1)
    }
    return { ...toRefs(state), onClickLeft };
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
/deep/.van-empty{
    margin:90px auto;
}
</style>