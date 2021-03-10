<template>
  <div>
    <van-nav-bar title="活动详情" left-arrow @click-left="onClickLeft">
    </van-nav-bar>
    <van-swipe :autoplay="3000" lazy-render>
      <van-swipe-item v-for="image in lunbo" :key="image">
        <img :src="image" />
      </van-swipe-item>
    </van-swipe>
    <div class="price" style="color: #ccc; font-size: 12px">
      <span style="color: orange; font-size: 20px; font-weight: 600">{{
        info.price1
      }}</span
      ><span>/人</span>
    </div>
    <div class="Title">
      <div class="title">{{ info.title }}</div>
      <div class="subname">{{ info.subnane }}</div>
      <div class="label">
        <span v-for="item in label" :key="item">{{ item }}</span>
      </div>
      <div class="panda">
        <div class="place">
          <van-icon name="location-o" /> 出发地: {{ info.place }}
        </div>
        <div class="num">{{ info.num }}人报名</div>
      </div>
      <div class="time">
        <van-icon style="padding: 15px 0" name="calendar-o" />
        <van-cell
          style="padding-left: 5px"
          title="选择出行日期"
          :value="date"
          @click="show2 = true"
        />
        <van-calendar v-model:show="show2" @confirm="onConfirm" />
      </div>
      <!-- =================优惠服务================== -->
      <div class="second">
        <van-cell is-link @click="showPopup"
          >优惠<span
            style="
              border: 1px solid orange;
              margin: 0 0 0 10px;
              font-size: 13px;
              color: orange;
            "
            v-for="item in discount"
            :key="item"
            >{{ item }}</span
          ></van-cell
        >
        <van-popup
          v-model:show="show"
          closeable
          position="bottom"
          :style="{ height: '30%' }"
          ><span v-for="item in discount" :key="item">{{
            item
          }}</span></van-popup
        >
        <van-cell is-link @click="showPopup"
          >服务<span
            style="font-size: 13px; margin: 0 0 0 10px"
            v-for="item in sevice"
            :key="item"
          >
            <van-icon color="orange" name="passed" />{{ item }}</span
          ></van-cell
        >
        <van-popup
          v-model:show="show"
          closeable
          position="bottom"
          :style="{ height: '30%' }"
          ><span v-for="item in sevice" :key="item">{{ item }}</span></van-popup
        >
      </div>
      <!-- ================评论======================== -->
      <div class="threepart">
        <h2 v-if="info.comments > 1">评论</h2>
        <h2 v-else>暂无评论</h2>
        <div style="margin: 5px 5px 0" class="inputbox">
          <Comment :id="id"></Comment>
        </div>
      </div>
      <div class="four">
        <h3>行程概览</h3>
        <div class="tiptitle">{{ info.tiptitle }}</div>
        <div class="day">
          <van-icon color="orange" name="calendar-o" />&nbsp;&nbsp;天数：{{
            info.tipday
          }}
        </div>
        <div>
          <van-icon color="orange" name="logistics" />&nbsp;&nbsp; 出发：{{
            info.tipplace1
          }}
        </div>
        <div>
          <van-icon color="orange" name="flag-o" />&nbsp;&nbsp; 集合：{{
            info.tipplace2
          }}
        </div>
        <div>
          <van-icon color="orange" name="bullhorn-o" />&nbsp;&nbsp; 解散：{{
            info.tipplace3
          }}
        </div>
      </div>
      <!-- ================行程概览======================== -->
      <van-tabs v-model:active="activeName" scrollspy sticky>
        <van-tab title="亮点" name="亮点">
          <h4 style="margin: 10px 0">活动亮点</h4>
          <div
            class="bling"
            style="border-bottom: 1px solid #ccc"
            v-html="other.bling"
          ></div>
          <h4 style="margin: 10px 0">产品经理说</h4>
          <div v-html="info.say"></div>
        </van-tab>
        <van-tab title="行程" name="行程">
          <h4 style="margin: 10px 0">行程</h4>
          <van-steps direction="vertical" :active="-1" border="0">
            <van-step>
              <h4 v-html="info.daytitle1"></h4>
              <p v-html="info.daydesc1" />
              <van-swipe lazy-render>
                <van-swipe-item v-for="image in lunbo1" :key="image">
                  <img :src="image" />
                </van-swipe-item>
              </van-swipe>
            </van-step>
            <van-step v-show="info.eat1 != null">
              <h4>
                餐饮:<span>{{ info.eat1 }}</span>
              </h4>
            </van-step>
            <van-step v-show="info.sleeping1 != null">
              <h4>
                住宿:<span>{{ info.sleeping1 }}</span>
              </h4>
            </van-step>
            <!-- instru1 -->
            <van-step v-show="info.instru1 != null">
              <h4>
                备注:<span>{{ info.instru1 }}</span>
              </h4>
            </van-step>
            <van-step>
              <h4 v-html="info.daytitle2"></h4>
              <p v-html="info.daydesc2" />
              <van-swipe lazy-render>
                <van-swipe-item v-for="image in lunbo2" :key="image">
                  <img :src="image" />
                </van-swipe-item>
              </van-swipe>
            </van-step>
            <van-step v-show="info.eat2 != null">
              <h4>
                餐饮:<span>{{ info.eat2 }}</span>
              </h4>
            </van-step>
            <van-step v-show="info.sleeping2 != null">
              <h4>
                住宿:<span>{{ info.sleeping2 }}</span>
              </h4>
            </van-step>
            <!-- instru1 -->
            <van-step v-show="info.instru2 != null">
              <h4>
                备注:<span>{{ info.instru2 }}</span>
              </h4>
            </van-step>
          </van-steps>
          <div>
            <h4 style="padding: 10px 0; border-top: 1px solid #ccc">
              目的地介绍
            </h4>
            <div v-html="info.destdesc"></div>
            <div
              style="widyh: 340px; overflow: hidden"
              v-for="item in imgsome.length"
              :key="item"
            >
              <img
                style="widyh: 100%; height: 190px; margin: 7px 0"
                :src="imgsome[item]"
              />
              <div style="font-size: 13px; padding-left: 10px">
                {{ imgtip[item] }}
              </div>
            </div>
          </div>
        </van-tab>
        <van-tab title="费用" name="费用">
          <div>
            <h4 style="margin: 10px 0">费用须知</h4>
            <table>
              <tr>
                <td style="width: 40px; padding: 10px; background-color: #eee">
                  费用包含
                </td>
                <td style="padding: 10px 10px 10px 35px">
                  <div v-html="info.feecon"></div>
                </td>
              </tr>
              <tr>
                <td style="width: 40px; padding: 10px; background-color: #eee">
                  费用不含
                </td>
                <td style="padding: 10px 10px 10px 35px">
                  <div v-html="info.feenocon"></div>
                </td>
              </tr>
            </table>
          </div>
        </van-tab>
        <van-tab title="须知" name="须知">
          <h4 style="margin: 10px 0">活动说明</h4>
          <div v-html="other.active"></div>
          <h4 style="margin: 10px 0">报名咨询流程</h4>
          <div v-html="other.baoming"></div>
          <h4 style="margin: 10px 0">报名提醒</h4>
          <div v-html="other.baomingtip"></div>
        </van-tab>
      </van-tabs>
    </div>
    <van-action-bar>
      <van-submit-bar button-text="立即预定" @submit="onCart">
        <div class="collected" v-if="collected == 0" @click="collect">
          <van-icon size="27" name="star-o" />
          <div style="font-size: 13px">收藏</div>
        </div>
        <div class="collected" v-else-if="collected == 1" @click="collect">
          <van-icon size="27" color="red" name="star-o" />
          <div style="font-size: 13px">收藏</div>
        </div>
        <div class="collected" @click="tocartlist">
          <van-icon size="27" name="shopping-cart-o" />
          <div style="font-size: 13px">订单</div>
        </div>
      </van-submit-bar>
    </van-action-bar>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, reactive, toRefs } from "vue";
import axios from "axios";
import { Toast } from "vant";
import { useRouter } from "vue-router";
import Comment from "../../components/Comment.vue";
import xmraxios from "../../utils/xmraxios.js";
import { DelCollect, PostCollect } from "../../utils/api.js";
export default defineComponent({
  name: "User",
  components: { Comment },
  props: {
    id: Number,
  },
  setup(props: any, context) {
    const router = useRouter();
    console.log(props.id, "llllllll");
    const show = ref(false);
    const show2 = ref(false);
    const active = ref("亮点");
    const id = props.id;
    const state: any = reactive({
      info: [],
      lunbo: [],
      label: [],
      discount: [],
      sevice: [],
      bling: [],
      lunbo1: [],
      lunbo2: [],
      imgsome: [],
      imgtip: [],
      comments: [],
      other: [],
      collectinfo:[],
      collected:Number
    });
    //const collected = ref(false);
    
    const date: any = ref("");
    const formatDate = (date) =>
      `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
    const onConfirm = (value) => {
      show2.value = false;
      date.value = formatDate(value);
      console.log(date.value, "jjjj");
    };
    const showPopup = () => {
      show.value = true;
    };
    const getinfo = () => {
      ///shop/infodetail/:index
      axios.get(`/api/shop/infodetail/${props.id}`).then(({ data }) => {
        if (data) {
          // 成功了
          state.info = data[0];
          state.lunbo = state.info.lunbo.split(",");
          state.label = state.info.label.split(",");
          state.discount = state.info.discount.split(",");
          state.sevice = state.info.sevice.split(",");
          state.lunbo1 = state.info.lunbo1.split(",");
          state.lunbo2 = state.info.lunbo2.split(",");
          state.imgsome = state.info.imgsome.split(",");
          state.imgtip = state.info.imgtip.split(",");
          console.log(state.info, "eeeeeeee");
        } else {
          // 失败的
          Toast.fail("请求数据失败");
        }
      });
    };
    ///home/shop/hotecomments/
    const getcomments = () => {
      axios.get(`/api/home/shop/hotecomments/${props.id}`).then(({ data }) => {
        if (data) {
          // 成功了
          state.comments = data;
        } else {
          // 失败的
          Toast.fail("请求数据失败");
        }
      });
    };
    const getcomments2 = () => {
      axios.get(`/api/home/shop/hotecomments2/${props.id}`).then(({ data }) => {
        if (data) {
          // 成功了
          state.other = data[0];
        } else {
          // 失败的
          Toast.fail("请求数据失败");
        }
      });
    };
    const onClickLeft = () => {
      router.push("/community");
    };
    const onCart = () => {
      console.log(date.value, "hhhhhh");
      if (date.value) {
        sessionStorage.setItem("timego", date.value);
        sessionStorage.setItem("title", state.info.title);
        sessionStorage.setItem("img", state.lunbo[0]);
        sessionStorage.setItem("price", state.info.price1);
        sessionStorage.setItem("theme", state.info.tiptitle);
        Toast("立即预订");
        router.push(`/shop/cart/sure/${props.id}`);
      } else {
        Toast("选择出行时间");
      }
    };
    const tocartlist = () => {
      router.push("/shop/tocart");
    };
    //获取收藏数据库数据
    const getcollectinfo= () => {
      axios.get(`/api/shop/infodetail/${props.id}`).then(({ data }) => {
        if (data) {
          // 成功了
          state.collectinfo = data[0];
          state.collected=state.collectinfo.collected
          console.log(state.collected,'qqqqq')
        } else {
          // 失败的
          Toast.fail("请求数据失败");
        }
      });
    };
    getcollectinfo();
    //收藏
    /* const collect = async() => {
      collected.value = !collected.value;
      if (collected.value == true) {
        //hid,title,subname,love,star,collected
        let result = await xmraxios("POST", PostCollect + props.id, {
          title: state.info.title,
          subname:state.info.subnane,
          star:state.info.num,
          collected:collected.value,
        });
        Toast("收藏成功");
      } else {
        let result = await xmraxios("POST", DelCollect + props.id);
        Toast("取消收藏");
      }
    }; */
    const collect = async() => {
      console.log(state.collected,'ggggg')
      state.collected=state.collected==0?1:0
      console.log(state.collected,'fffff')
      if (state.collected == 1) {
        //hid,title,subname,love,star,collected
        let result = await xmraxios("POST", PostCollect + props.id, {
          collected:state.collected,
        });
        Toast("收藏成功");
      } else {
        let result = await xmraxios("POST", DelCollect + props.id);
        Toast("取消收藏");
      }
    };
    getinfo();
    getcomments();
    getcomments2();
    return {
      ...toRefs(state),
      showPopup,
      show,
      active,
      onClickLeft,
      id,
      date,
      show2,
      onConfirm,
      onCart,
      tocartlist,
      //collected,
      collect,
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
/* =======================轮播========================= */
.van-swipe {
  height: 230px !important;
  .van-swipe-item {
    height: 230px !important;
    text-align: center;
    img {
      height: 100% !important;
      width: 100% !important;
    }
  }
}
.price,
.Title {
  padding: 10px 15px 0px;
}
.title {
  font-weight: 600;
}
.subname {
  color: rgb(145, 144, 144);
  font-size: 13px;
  margin: 6px 0;
}
.label {
  padding-bottom: 10px;
  border-bottom: 1px solid #ccc;
  span {
    border: 1px dashed rgb(250, 117, 55);
    display: inline-block;
    color: rgb(145, 144, 144);
    font-size: 12px;
    margin-right: 5px;
    padding: 1px 2px;
  }
}
.panda {
  display: flex;
  padding: 10px 0;
  font-size: 13px;
  .place {
    flex: 4;
  }
  .num {
    text-align: left;
    color: rgb(68, 68, 68);
  }
}
.time {
  display: flex;
}
/* ==============优惠=============================== */
.second {
  border-top: 1px solid #ccc;
  /deep/.vant-cell {
    padding: 10px 0 !important;
    /deep/.van-cell__value,
    .van-cell__value--alone {
      span {
        border: 1px dashed orange;
      }
    }
  }
}
/* =====================评论========================== */
.threepart {
  border-top: 1px solid #ccc;
  border: 1px solid #ccc;
  border-radius: 16px;
  padding: 10px;
  h2 {
    font-size: 18px;
  }
  .comments {
    padding: 10px;
    .comitem {
      .name {
        padding: 0 5px;
      }
      .contant {
        color: rgb(90, 90, 90);
        font-size: 15px;
        padding-left: 20px;
      }
    }
  }
}
/* =======================行程概览======================== */
.four {
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  padding: 10px 0;
  font-size: 13px;
  margin: 10px 0;
  .tiptitle {
    margin: 10px 0;
    padding: 5px 30px;
    width: 120px;
    text-align: center;
    background-color: rgb(255, 217, 0);
  }
}
/* ===========================tabnavbar================================= */
.van-action-bar {
  border-top: 1px solid #ccc;
  .collected {
    margin: 0 40px 0 0;
    text-align: center;
  }
  /deep/.van-submit-bar__button {
    width: 170px;
    margin-right: 20px;
  }
}
</style>