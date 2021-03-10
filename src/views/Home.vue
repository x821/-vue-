<template>
  <div class="Homebox">
    <van-sticky>
      <van-search
        v-model="value"
        placeholder="请输入景点的省份"
        input-align="center"
        @click="linktosearch"
      />
    </van-sticky>
    <van-grid :border="false" :column-num="5">
      <van-grid-item icon="coupon" text="攻略" :to="'/infodetail/83778767'" />
      <van-grid-item class="t2" icon="shop" text="酒店" :to="'/shop/hotel/酒店'" />
      <van-grid-item class="t3" icon="video" text="营地" :to="'/shop/hotel/营地'" />
      <van-grid-item class="t4" icon="photograph" text="民宿" :to="'/shop/hotel/民宿'" />
      <van-grid-item icon="hot" text="目的地" :to="'/destination'" />
    </van-grid>
    <van-swipe :autoplay="3000" lazy-render>
      <van-swipe-item class="swiper" v-for="image in lunbotuList" :key="image.id">
        <img :src="image.url" />
        <div class="title">{{image.title}}</div>
      </van-swipe-item>
    </van-swipe>

    <van-sticky :offset-top="50">
      <van-tabs v-model="active">
        <van-tab title="推荐">
          <div class="find-item" v-for="item in findList" :key="item.id">
            <router-link :to="'/infodetail/' + item.id">
              <img :src="item.cover" />
              <div class="info">
                <p class="title">{{ item.title }}</p>
                <div class="authorinfo">
                  <img
                    referrer="no-referrer|origin|unsafe-url"
                    :src="item.avator"
                  />
                  <span class="user">{{ item.username }}</span>
                  <div class="lover">
                    <van-icon name="like-o" />
                    <span>{{ item.likes }}</span>
                  </div>
                </div>
              </div>
            </router-link>
          </div>
        </van-tab>
        <van-tab title="四川"><Getoffer :msg="title1"></Getoffer></van-tab>
        <van-tab title="安徽"><Getoffer :msg="title2"></Getoffer></van-tab>
        <van-tab title="北京"><Getoffer :msg="title3"></Getoffer></van-tab>
        <van-tab title="云南"><Getoffer :msg="title4"></Getoffer></van-tab>
      </van-tabs>
    </van-sticky>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, reactive, toRefs } from "vue";
import axios from "axios";
import { Toast } from "vant";
import Getoffer from "../components/Getoffer.vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "Home",
  components: { Getoffer },
  setup() {
    const title1 = ref(28);
    const title2 = ref(2);
    const title3 = ref(3);
    const title4 = ref(33);
    const active = ref(0);
    const state = reactive({
      lunbotuList: [],
      findList: [],
    })
    const router=useRouter();
    const linktosearch=()=>{
      router.push('/search')
    }
    // 轮播图数据
    const getLunbotu = () => {
      axios.get("/api/home/lunbo").then(({ data }) => {
        if (data) {
          // 成功了
          state.lunbotuList = data;
          console.log(state.lunbotuList,"xxxxxxxxxxxxxx");
        } else {
          // 失败的
          //Toast.fail("请求数据失败");
        }
      });
    };
    //推荐攻略、景点数据
    const getRecommend = () => {
      axios.get("/api/home/offer").then(({ data }) => {
        if (data) {
          // 成功了
          state.findList = data;
          //console.log(state.findList, "qqqqqqqqq");
        } else {
          // 失败的
          //Toast.fail("请求数据失败");
        }
      });
    };
    //请求轮播图数据
    getLunbotu();
    getRecommend();
    return { active, ...toRefs(state), title1, title2, title3, title4,linktosearch };
  },
});
</script>
<style lang="less" scoped>
* {
  margin: 0px;
  padding: 0px;
}
a {
  color: black !important;
}
.van-search__content {
  border-radius: 16px !important;
}
.van-nav-bar__title {
  margin: 0 10px !important;
  color: #323233;
  font-weight: 550 !important;
  font-size: 16px;
}
/deep/.van-grid-item__icon {
  color: orangered;
}
.t2 {
  /deep/.van-grid-item__icon {
    color: rgb(14, 147, 255);
  }
}
.t3 {
  /deep/.van-grid-item__icon {
    color: rgb(0, 194, 136);
  }
}
.t4 {
  /deep/.van-grid-item__icon {
    color: rgb(255, 42, 60);
  }
}
/* ======================轮播================================= */
.van-swipe {
  height: 200px !important;
  .van-swipe-item {
    height: 200px !important;
    color: #fff;
    text-align: center;
    background-color: #39a9ed;
    img {
      height: 100% !important;
      width: 100% !important;
    }
    .title{
      position: absolute;
      bottom:10px;
      left: 10px;
      color: #fff;
      width: 200px;
      text-align: left;
    }
  }
}
/* =====================推荐标签页=============================== */
.van-tabs {
  position: relative;
  .van-tab--active {
    .van-tab__text--ellipsis {
      font-weight: 800 !important;
      font-family: "STKaiti" !important;
      font-size: 19px !important;
    }
  }
  .van-tabs__line {
    background-color: orange !important;
    width: 30px !important;
    height: 6px !important;
    position: absolute;
    bottom: 20px !important;
    left: 0;
  }
}

/* ======================标签页内容============================================= */

.van-tabs__content {
  height: 520px !important;
  overflow: scroll !important;
  margin-bottom: 50px;
  .van-tab__pane {
    height: 520px !important;
    overflow: scroll !important;
    .find-item {
      width: 177px;
      display: inline-block;
      border-radius: 8px;
      margin-left: 7px;
      margin-top: 5px;
      img {
        width: 177px;
        height: 210px;
        border-radius: 10px;
      }
      .info {
        font-size: 15px;
        font-weight: 600;
        .title {
          padding: 0 6px 3px;
          display: -webkit-box; /*作为弹性伸缩盒子模型显示*/
          -webkit-line-clamp: 2; /*显示的行数；如果要设置2行加...则设置为2*/
          overflow: hidden !important; /*超出的文本隐藏*/
          text-overflow: ellipsis !important; /* 溢出用省略号*/
          -webkit-box-orient: vertical;
        }
        .authorinfo {
          img {
            float: left;
            margin-left: 6px;
            width: 30px;
            height: 30px;
            border-radius: 50%;
          }
          .user {
            float: left;
            line-height: 30px;
            padding-left: 5px;
            font-size: 14px;
            font-weight: 500;
          }
          .lover {
            display: inline-block;
            line-height: 33px;
            float: right;
            span {
              padding: 0 5px 0 1px;
            }
          }
        }
      }
    }
  }
}
</style>
