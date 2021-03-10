<template>
  <div>
    <van-sticky>
      <van-nav-bar left-arrow @click-left="onClickLeft">
        <template #title>
          <div class="user">
            <span>我的收藏</span>
          </div>
        </template>
      </van-nav-bar>
    </van-sticky>
    <van-card
      v-for="item in collectlist"
      :key="item.id"
      :desc="item.subnane"
      :title="item.title"
      :thumb="item.cover"
    >
    <template #price>
        {{item.num}}人报名
    </template>
    </van-card>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, reactive, toRefs } from "vue";
import axios from "axios";
import { Toast } from "vant";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "toCollect",
  components: {},
  props: [],
  setup(props: any, context) {
    const state:any = reactive({
      collectlist: [],
    });
    const getcomments = () => {
      axios.get("/api/getcollectlist").then(({ data }) => {
        if (data) {
          // 成功了
          state.collectlist = data;
          console.log(state.collectlist)
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