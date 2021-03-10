<template>
  <div class="hotplace">
    <van-nav-bar :title="placeName" left-arrow @click-left="onClickLeft">
    </van-nav-bar>
    <van-tabs>
      <van-tab title="全部">
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
      </van-tab>
      <van-tab
        v-for="item in shopHottype"
        :key="item.id"
        :title="item.typename"
      >
        <Gethottab :provice="item.provice" :type="item.typename"></Gethottab>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, ref } from "vue";
import axios from "axios";
import { Toast } from "vant";
import { useRouter } from "vue-router";
import Gethottab from '../../components/Gethottab.vue'
export default defineComponent({
  name: "shophot",
  props: {
    id: String,
    type: String,
  },
  components: {Gethottab},
  setup(props) {
    console.log(props.id, "qqqqqqq");
    const state = reactive({
      shopHotplace: [],
      shopHottype: [],
      typeList: [],
    });
    const placeName = props.id;
    const value = ref("");
    const onSearch = () => Toast("value");
    const getshopHotplace = () => {
      axios.get(`/api/home/shop/hottravel/${props.id}`).then(({ data }) => {
        if (data) {
          // 成功了
          state.shopHotplace = data;
          console.log(state.shopHotplace, "xxxxxxxxxxxxxx");
        } else {
          // 失败的
          Toast.fail("请求数据失败");
        }
      });
    };
    const getshopHoteltype = () => {
      axios.get(`/api/home/shop/hottype/${props.id}`).then(({ data }) => {
        if (data) {
          // 成功了
          state.shopHottype = data;
          // state.typeList=state.shopHottype.typename.split(',');
          console.log(state.shopHottype, "ggggggg");
        } else {
          // 失败的
          Toast.fail("请求数据失败");
        }
      });
    };
    //const router = useRouter();
    const router = useRouter();
    const onClickLeft = () => {
      router.push("/community");
    };
    getshopHotplace();
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