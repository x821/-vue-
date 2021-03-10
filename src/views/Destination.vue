<template>
  <div class="destination">
    <div class="adname">
      <img :src="CityInfo.img" />
      <router-link :to="'/address'">
        <p class="name">{{ CityInfo.adname }}</p>
        <van-icon name="play-circle" />
      </router-link>
      <van-search
        @click="linksearch"
        v-model="value"
        placeholder="请输入搜索关键词"
        input-align="left"
      />
      <p class="play">{{ CityInfo.play }}</p>
    </div>
    <!-- ==============================精选攻略================================== -->
    <div class="select">
      <div class="title2">精选攻略</div>
      <div class="tip">
        <van-grid :border="false" :column-num="3">
          <van-grid-item v-for="item in StratryInfo" :key="item.id">
            <div class="info">
              <div class="titlename">{{ item.title }}</div>
              <div class="comments">{{ item.comments }}</div>
            </div>
            <router-link :to="'/stratrydetail/' + item.id">
              <van-image :src="item.img" />
            </router-link>
          </van-grid-item>
        </van-grid>
      </div>
    </div>
    <!-- ===============================攻略榜单================================= -->
    <div class="listinfo">
      <div class="title2">攻略榜单</div>
      <div class="tip">
        <van-grid :border="false" :column-num="3">
          <van-grid-item v-for="item in ListInfo" :key="item.id">
            <router-link :to="'/listinfodetail/' + item.listid">
              <van-image :src="item.listimg" />
              <div class="info" style="top:32px">
                <div
                  style="font-size: 16px; font-weight: 600; margin-bottom: 5px"
                >
                  {{ item.listtitle }}
                </div>
                <div>{{ item.listcomments }}</div>
              </div>
              <!--  -->
            </router-link>
            <div class="listthree" style="color:#ccc;font-size:13px">
              <div ><span style="color: red;">01</span>{{ item.listinfo1 }}</div>
              <div style="margin:7px 0 7px 0">
                <span style="color: orangered">02</span>{{ item.listinfo2 }}
              </div>
              <div>
                <span style="color: orange">03</span>{{ item.listinfo3 }}
              </div>
            </div>
          </van-grid-item>
        </van-grid>
      </div>
    </div>
    <!-- ================================吃喝玩住============================== -->
    <div class="EatInfo">
      <div class="title2">吃喝玩住</div>
      <div class="tip">
        <van-grid :border="false" :column-num="3">
          <van-grid-item v-for="item in EatInfo" :key="item.id">
            <router-link :to="'/eatinfodetail/' + item.playid">
              <div>{{ item.playtitle }}</div>
            </router-link>
          </van-grid-item>
        </van-grid>
      </div>
    </div>
    <!-- ==================================每日推荐=============================== -->
    <div class="travel">
      <div class="title3">每日推荐</div>
      <div class="travelinfo" v-for="item in TravelsInfo" :key="item.travelid">
        <router-link :to="'/infodetail/' + item.travelid">
          <img :src="item.travelimg" />
          <div class="info">
            <p class="title">{{ item.traveltitle }}</p>
            <div class="authorinfo">
              <img :src="item.traveluserimg" />
              <span class="user">{{ item.traveluser }}</span>
              <div class="lover">
                <van-icon name="like-o" />
                <span>{{ item.lover }}</span>
              </div>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, reactive, toRefs } from "vue";
import axios from "axios";
import { Toast } from "vant";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "Destination",
  components: {},
  setup() {
    let store = useStore();
    const router = useRouter();
    let index = store.getters.optCount;
    const state = reactive({
      CityInfo: [],
      StratryInfo: [],
      TravelsInfo: [],
      ListInfo: [],
      EatInfo: [],
    });
    const linksearch = () => {
      router.push("/search");
    };
    console.log(store.getters.optCount, "dddddd");
    // 获取地区天气和图片
    const getCityInfo = () => {
      axios.get(`/api/home/ad/${index}`).then(({ data }) => {
        if (data) {
          // 成功了
          state.CityInfo = data[0];
          //console.log(state.CityInfo,"xxxxxxxxxxxxxx");
        } else {
          // 失败的
          Toast.fail("请求数据失败1");
        }
      });
    };
    //获取推荐攻略宫格数据
    const getstratryInfo = () => {
      axios.get(`/api/home/ad/stratry/${index}`).then(({ data }) => {
        if (data) {
          // 成功了
          state.StratryInfo = data;
          //console.log(data,index,"qqqqqqqqqqqqq");
        } else {
          // 失败的
          Toast.fail("请求数据失败");
        }
      });
    };
    /* 获取推荐榜单数据 */
    /* ==========/home/dest/list/==================== */
    const getListInfo = () => {
      axios.get(`/api/home/dest/list/${index}`).then(({ data }) => {
        if (data) {
          // 成功了
          state.ListInfo = data;
          console.log(data, "qqqqqqqqqqqqq");
        } else {
          // 失败的
          Toast.fail("请求数据失败");
        }
      });
    };
    /* =================吃喝玩住数据======================== */
    const getEatInfo = () => {
      axios.get(`/api/home/dest/play/${index}`).then(({ data }) => {
        if (data) {
          // 成功了
          state.EatInfo = data;
          //console.log(data,index,"aaaaa");
        } else {
          // 失败的
          Toast.fail("请求数据失败");
        }
      });
    };
    /* ========================每日推荐数据============================= */
    const getTravelsInfo = () => {
      axios.get(`/api/home/dest/travel/${index}`).then(({ data }) => {
        if (data) {
          // 成功了
          state.TravelsInfo = data;
          //console.log(data,index,"cccc");
        } else {
          // 失败的
          Toast.fail("请求数据失败");
        }
      });
    };
    getCityInfo();
    getstratryInfo();
    getListInfo();
    getEatInfo();
    getTravelsInfo();
    return { ...toRefs(state), index, ...toRefs(store), linksearch };
  },
});
</script>

<style lang="less">
* {
  margin: 0px;
  padding: 0px;
}
a {
  color: black !important;
}
/* ========================最上面城市地点简介============================== */
.adname {
  height: 150px;
  overflow: hidden;
  position: relative;
  .van-icon {
    position: absolute !important;
    top: 30px !important;
    left: 50px !important;
    color: white !important;
  }
  img {
    width: 375px;
    height: 180px;
    overflow: hidden;
  }
  .name {
    position: absolute;
    top: 20px;
    left: 10px;
    z-index: 2;
    color: white;
    font-size: 18px;
    font-weight: 600;
    line-height: 36px;
  }
  .van-search {
    position: absolute;
    top: 20px;
    right: 60px;
    width: 65% !important;
    padding: 0 !important;
    opacity: 0.5;
    border-radius: 16px;
    .van-search__content {
      color: white;
    }
  }
  .play {
    position: absolute;
    bottom: 20px;
    left: 10px;
    color: white;
    font-size: 15px;
  }
}
/* ==========================精选攻略宫格============================================ */
.title2,
.title3 {
  padding: 0 10px;
  font-size: 20px;
  font-weight: 700;
}
.van-grid {
  margin: 15px 6px;
  .info {
    position: absolute;
    z-index: 3;
    color: #fff;
    font-size: 12px;
    bottom: 10px;
    left: 8px;
    .comments {
      font-size: 10px;
      color: rgb(221, 221, 221);
    }
  }
  .van-grid-item__content {
    padding: 0 2px !important;
    
    .van-image {
      height: 77px !important;
      overflow: hidden !important;
      border-radius: 16px;
    }
  }
}
/* =====================================攻略榜单================================== */

.travelinfo {
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
</style>