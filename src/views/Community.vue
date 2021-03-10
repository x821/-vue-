<template>
  <div class="shop">
    <div class="top"><img :src="shopHome.shopimg" /></div>
    <div class="content">
      <div class="grid">
        <div class="griditem" @click="linkto1">
          <span>酒店</span>
          <van-icon color="orange" name="column" />
        </div>
        <div class="griditem" @click="linkto2">
          <span>民宿</span>
          <van-icon color="#3685fc" name="photograph" />
        </div>
        <div class="griditem" @click="linkto3">
          <span>营地</span>
          <van-icon color="#0a8d06" name="point-gift" />
        </div>
        <div class="griditem" @click="linkto4">
          <span>酒+景</span>
          <van-icon name="coupon" />
        </div>
      </div>

      <div class="new">
        <h2>新品推荐</h2>
        <div class="newitem" @click="linktoplay">
          <div class="position">{{ shopHome.newplace }}</div>
          <img :src="shopHome.thumb" />
          <div class="title">{{ shopHome.producename }}</div>
          <span class="price">￥{{ shopHome.adultprice }}</span>
          <span>起</span>
        </div>
      </div>
      <div class="second">
        <h2>当季热门目的地</h2>
        <div class="hot">
          <div class="hotbox">
            <router-link
              class="hotinfo"
              v-for="item in shopHot"
              :key="item.pid"
              :to="'/shop/hot/' + item.place_label"
              tag="div"
            >
              <img :src="item.thumb" referrer="no-referrer|origin|unsafe-url" />
              <span class="labeiname">{{ item.place_label }}</span>
              <span class="title">{{ item.title }}</span>
            </router-link>
          </div>
        </div>
      </div>
      <div class="play">
        <h2>主题游玩</h2>
        <van-tabs>
          <van-tab title="温泉滑雪"
            ><Getplaydetail :msg="title1"></Getplaydetail
          ></van-tab>
          <van-tab title="轻奢民宿"
            ><Getplaydetail :msg="title2"></Getplaydetail
          ></van-tab>
          <van-tab title="网红ins风"
            ><Getplaydetail :msg="title3"></Getplaydetail
          ></van-tab>
          <van-tab title="乐园亲子"
            ><Getplaydetail :msg="title4"></Getplaydetail
          ></van-tab>
        </van-tabs>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, reactive, toRefs } from "vue";
import axios from "axios";
import { Toast } from "vant";
import { useRouter } from "vue-router";
import Getplaydetail from "../components/Getplaydetail.vue";
export default defineComponent({
  name: "Community",
  components: { Getplaydetail },
  setup() {
    const router = useRouter();
    const state: any = reactive({
      shopHome: [],
      shopHot: [],
      shopPlay: [],
    });
    const title1 = ref("温泉滑雪");
    const title2 = ref("轻奢民宿");
    const title3 = ref("网红ins风");
    const title4 = ref("乐园亲子");
    const linkto1 = () => {
      router.push("/shop/hotel/酒店");
    };
    const linkto2 = () => {
      router.push("/shop/hotel/民宿");
    };
    const linkto3 = () => {
      router.push("/shop/hotel/营地");
    };
    const linkto4 = () => {
      router.push("/shop/hotel/酒+景");
    };
    const linktoplay = () => {
      router.push(`/shop/play/${state.shopHome.id}`);
    };
    const getshopHome = () => {
      // 商城数据
      axios.get("/api/home/shop").then(({ data }) => {
        if (data) {
          // 成功了
          state.shopHome = data[0];
          //console.log(state.shopHome, "xxxxxxxxxxxxxx");
        } else {
          // 失败的
          Toast.fail("请求数据失败");
        }
      });
    };
    const getshopHot = () => {
      // 商城数据
      axios.get("/api/home/shop/hot").then(({ data }) => {
        if (data) {
          // 成功了
          state.shopHot = data;
          //console.log(state.shopHot, "xxxxxxxxxxxxxx");
        } else {
          // 失败的
          Toast.fail("请求数据失败");
        }
      });
    };

    getshopHome();
    getshopHot();
    return {
      ...toRefs(state),
      title1,
      title2,
      title3,
      title4,
      linktoplay,
      linkto1,
      linkto2,
      linkto3,
      linkto4,
    };
  },
});
</script>
<style lang="less" scoped>
.top {
  height: 240px;
  img {
    width: 100%;
    height: 100%;
    border-radius: 0 0 20px 20px;
  }
}
.shop {
  overflow: scroll;
}
.content {
  margin: 17px 15px 0px 15px;
  /* ===================宫格====================== */
  .grid {
    display: flex;
    color: #4e0158;
    .griditem {
      flex: 1;
      background-color: rgb(255, 250, 251);
      display: inline-block;
      height: 60px;
      position: relative;
      padding: 0 4px;
      margin-right: 8px;
      border-radius: 8px;
      box-shadow: 2px 2px 2px rgb(185, 183, 183);
      span {
        display: inline-block;
        line-height: 60px;
      }
      .van-icon {
        font-size: 35px;
        position: absolute;
        top: 12px;
        right: 0;
      }
    }
  }
  /* ====================新品推荐========================== */
  .new {
    height: 350px;
    margin-top: 15px;
    border-bottom: 1px solid grey;
    h2 {
      margin-bottom: 10px;
      font-weight: 400;
    }
    .newitem {
      height: 220px;
      position: relative;
      .position {
        position: absolute;
        background-color: rgb(71, 70, 70);
        color: #fff;
        padding: 3px 15px 4px 8px;
        font-size: 12px;
        border-radius: 0 16px 16px 0;
        top: 10px;
      }
      img {
        height: 100%;
        width: 100%;
        border-radius: 8px;
      }
      .title {
        display: -webkit-box; /*作为弹性伸缩盒子模型显示*/
        -webkit-line-clamp: 2; /*显示的行数；如果要设置2行加...则设置为2*/
        overflow: hidden !important; /*超出的文本隐藏*/
        text-overflow: ellipsis !important; /* 溢出用省略号*/
        -webkit-box-orient: vertical;
        margin: 3px 0 8px;
      }
      span {
        color: #ccc;
        margin-bottom: 10px;
      }
      .price {
        color: rgb(245, 91, 1);
      }
    }
    .border {
      border: 1px solid #ccc;
    }
  }
  /* ======================热门目的地================= */
  .second {
    margin-top: 15px;
    border-bottom: 1px solid grey;
    h2 {
      font-weight: 400;
    }
  }
  .hot {
    margin: 16px 0 10px;
    width: 100%;
    overflow: auto;
    .hotbox {
      width: 840px;
      height: 100px;
      margin-bottom: 10px;
      position: relative;
      border-radius: 16px;
      overflow: hidden;
      .hotinfo {
        display: inline-block;
        position: relative;
        margin-right: 5px;
        .labeiname {
          position: absolute;
          left: 8px;
          bottom: 30px;
          background-color: rgb(255, 201, 53);
          display: inline-block;
          padding: 3px 8px;
          border-radius: 5px;
          line-height: 20px;
        }
        .title {
          position: absolute;
          left: 10px;
          bottom: 7px;
          color: #fff;
          font-weight: 500;
        }
      }
    }
  }
  /* =========================游玩==================== */
  .play {
    margin: 16px 0;
    border-bottom: 1px solid grey;
  }
}
</style>