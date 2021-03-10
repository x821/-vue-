<template>
  <div class="playbox">
    <router-link
      class="find-item"
      v-for="item in shopPlay"
      :key="item.id"
      :to="'/shop/play/' + item.playid"
    >
      <div class="playimg">
        <img :src="item.thumb" />
        <span>{{ item.typelabel }}&nbsp;|&nbsp;{{ item.placelabel }}</span>
      </div>
      <div class="info">
        <p class="title">{{ item.title }}</p>
        <div class="priceinfo">
          <span class="pricenum" style="color: orange">{{ item.price }}</span>
          <span style="color: grey">起</span>
        </div>
      </div>
    </router-link>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch, reactive, toRefs } from "vue";
import axios from "axios";
import { Toast } from "vant";

export default defineComponent({
  name: "getplaydetail",
  components: {},
  props: {
    msg: String,
  },
  setup(props) {
    console.log(props.msg, "lllllllllllllllllllllllll");
    const state = reactive({
      shopPlay: [],
    });
    const getshopPlay = () => {
      axios.get(`/api/home/shop/play/${props.msg}`).then(({ data }) => {
        if (data) {
          // 成功了
          state.shopPlay = data;
          console.log(state.shopPlay, "xxxxxxxxxxxxxx");
        } else {
          // 失败的
          Toast.fail("请求数据失败");
        }
      });
    };
    getshopPlay();
    return { ...toRefs(state) };
  },
});
</script>
<style lang="less" scoped>
.find-item {
  display: inline-block;
  width: 167px;
  margin-top: 15px;
  margin-right: 5px;
  .playimg {
    position: relative;
    img {
      width: 100%;
      height: 100%;
      border-radius: 13px;
    }
    span{
        display: inline-block;
        position: absolute;
        top:10px;
        left: 0px;
        font-size: 12px;
        font-weight: 5500;
        color: #fff;
        background-color: rgb(31, 30, 30);
        opacity: 0.8;
        padding: 0 10px 0 6px;
        line-height: 20px;
        border-radius: 0 16px 16px 0;
    }
  }
  .info {
    .title {
      display: inline-block;
      display: -webkit-box; /*作为弹性伸缩盒子模型显示*/
      -webkit-line-clamp: 2; /*显示的行数；如果要设置2行加...则设置为2*/
      overflow: hidden !important; /*超出的文本隐藏*/
      text-overflow: ellipsis !important; /* 溢出用省略号*/
      -webkit-box-orient: vertical;
      font-size: 15px;
      color: rgb(70, 70, 70);
    }
    .priceinfo{
        font-size: 13px;
        .pricenum{
            font-size: 16px;
        }
    }
  }
}
</style>