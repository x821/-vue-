<template>
  <div>
    <van-card
      v-for="items in hotTab"
      :key="items.hid"
      :tag="items.place"
      :title="items.title"
      :thumb="items.img"
    >
      <template #tags>
        <van-tag
          style="background-color: #ffde25; color: orangered; border: none"
          plain
          >{{ items.days }}</van-tag
        >
        <van-tag plain>{{ items.typename }}</van-tag>
      </template>
      <template #num>
        <span>{{ items.num }}人已报名</span>
      </template>
      <template #price>
        <span style="color: orangered; font-size: 18px; font-weight: 600"
          >￥{{ items.price }}</span
        >
        <span>起</span>
      </template>
    </van-card>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch, reactive, toRefs } from "vue";
import axios from "axios";
import { Toast } from "vant";

export default defineComponent({
  name: "shopplaydetail",
  components: {},
  props: { provice: String, type: String },
  setup(props) {
    console.log(props.provice, props.type, "dddddd");
    const state = reactive({
      hotTab: [],
    });
    const gethotTab = () => {
      axios
        .get(`/api/home/shop/hottravel/${props.provice}/${props.type}`)
        .then(({ data }) => {
          if (data) {
            // 成功了
            state.hotTab = data;
            console.log(state.hotTab, "ggggggg");
          } else {
            // 失败的
            Toast.fail("请求数据失败");
          }
        });
    };
    gethotTab();
    return { ...toRefs(state) };
  },
});
</script>