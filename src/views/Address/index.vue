<template>
  <div class="address">
    <van-sticky>
      <van-nav-bar left-arrow @click-left="onClickLeft">
        <template #title>
          <div class="user">
            目的地选择
          </div>
        </template>
      </van-nav-bar>
    </van-sticky>
    <van-index-bar>
      <van-index-anchor index="A" />
      <van-cell @click="linktoanhui" title="安徽" />
      <van-cell title="澳门" />
      <van-index-anchor index="B" />
      <van-cell @click="linktobj" title="北京" />
      <van-index-anchor index="C" />
      <van-cell @click="linktocq" title="重庆" />
      <van-index-anchor index="F" />
      <van-cell title="福建" />
      <van-index-anchor index="G" />
      <van-cell title="甘肃" />
      <van-cell title="广东" />
      <van-cell title="广西" />
      <van-cell title="贵州" />
      <van-index-anchor index="H" />
      <van-cell title="海南" />
      <van-cell title="河北" />
      <van-cell title="黑龙江" />
      <van-cell title="河南" />
      <van-cell title="湖北" />
      <van-cell title="湖南" />
      <van-index-anchor index="J" />
      <van-cell title="江苏" />
      <van-cell title="江西" />
      <van-cell title="吉林" />
      <van-index-anchor index="L" />
      <van-cell title="辽宁" />
      <van-index-anchor index="N" />
      <van-cell title="内蒙古" />
      <van-cell title="宁夏" />
      <van-index-anchor index="Q" />
      <van-cell title="青海" />
      <van-index-anchor index="X" />
      <van-cell title="香港" />
    </van-index-bar>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, reactive, toRefs } from "vue";
import { Toast } from "vant";
import { useRouter } from "vue-router";
import axios from "axios";
import { useStore } from "vuex";

export default defineComponent({
  name: "Address",
  components: {},
  setup(props, context) {
    let store = useStore();
    const router = useRouter();
    const onClickLeft = () => {
      router.push("/destination");
    };
    const state = reactive({
      activeId: 1,
      activeIndex: 0,
    });
    const items = reactive({
      Countryinfo: [],
    });
    const Clickto = () => {
      console.log(store.commit, "kkkkkkk");
      store.commit("increment");
      router.push("/destination");
    };
    const linktoanhui =()=>{
      store.commit("setPrint",2);
      router.push("/destination");
    }
    const linktobj=()=>{
      store.commit("setPrint",3);
      router.push("/destination");
    }
    const linktocq=()=>{
      store.commit("setPrint",1);
      router.push("/destination");
    }
    /* =============================================获取目的地信息 */
    const getCountryInfo = () => {
      axios.get("/api/home/desc/address").then(({ data }) => {
        if (data) {
          // 成功了
          items.Countryinfo = data;
          console.log(data, "xxxxxxxxxxxxxx");
        } else {
          // 失败的
          Toast.fail("请求数据失败");
        }
      });
    };
    getCountryInfo();
    return {
      onClickLeft,
      state,
      items,
      Clickto,
      ...toRefs(store),
      linktoanhui,
      linktobj,
      linktocq
    };
  },
});
</script>
<style lang='less' scoped>
/deep/.van-nav-bar__left {
  color: #000;
  /deep/.van-icon {
    color: #000 !important;
  }
  /deep/.van-nav-bar__arrow {
    font-size: 20px !important;
  }
}
* {
  margin: 0;
  padding: 0;
}
.address {
}
</style>