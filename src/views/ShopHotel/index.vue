<template>
  <div class="hotplace">
    <van-nav-bar :title="placeName" left-arrow @click-left="onClickLeft">
    </van-nav-bar>
    <van-search v-model="value" :placeholder="placeName" @search="onSearch" />

    <van-card
      v-for="items in shopHotplace"
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
import { defineComponent, reactive, toRefs, ref } from "vue";
import axios from "axios";
import { Toast } from "vant";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "shophot",
  props: {
    id: String,
  },
  components: {},
  setup(props) {
    console.log(props.id, "kkkkk");
    const state = reactive({
      shopHotplace: [],
      typeList: [],
    });
    const placeName = props.id;
    const value = ref("");
    const onSearch = () => Toast("value");
    const router = useRouter();
    const onClickLeft = () => {
      router.go(-1);
    };
    const getshopHoteltype = () => {
      axios.get(`/api/home/shop/hoteland/${props.id}`).then(({ data }) => {
        if (data) {
          // 成功了
          state.shopHotplace = data;
          // state.typeList=state.shopHottype.typename.split(',');
          console.log(state.shopHotplace, "ggggggg");
        } else {
          // 失败的
          Toast.fail("请求数据失败");
        }
      });
    };
    getshopHoteltype();
    return {
      ...toRefs(state),
      placeName,
      onClickLeft,
      value,
      onSearch,
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
.van-nav-bar {
  background-color: #ffde25;
}
/* ==================搜索============ */
.van-search {
  background-color: #ffde25;
  .van-search__content {
    border-radius: 10px;
  }
}
/* ===============tab=============== */
/deep/.van-tab {
  flex: none;
  .van-tab__text--ellipsis {
    flex: none;
    background-color: #fff1a0;
    padding: 3px;
    border-radius: 20px;
    /deep/.van-tab__text {
      display: inline-block;
      padding: 5px;
      background-color: #fff1a0;
    }
  }
}
/deep/.van-tab--active {
  flex: none;
  color: #323233;
  font-weight: 600;
  font-size: 15px;
  .van-tab_text {
    display: inline-block;
    background-color: #ffde25;
    border-radius: 20px;
  }

  .van-tab__text--ellipsis {
    flex: none;
    background-color: #ffde25;
  }
}
/deep/.van-tabs__line {
  flex: none;
  display: none;
}
/* ==============tab里内容========================= */
/deep/.van-tag--danger {
  background-color: #3d3d3d;
  top: 6px;
}
/deep/.van-card__title {
  font-weight: 500;
  font-size: 14px;
  color: rgb(20, 20, 20);
  line-height: 16px;
  margin-bottom: 5px;
}
/deep/.van-tag--default.van-tag--plain {
  margin-right: 10px;
}
</style>