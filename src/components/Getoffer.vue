<template>
  <div class="hello">
    <div class="find-item" v-for="item in tabList2" :key="item.id">
      <router-link :to="'/infodetail/' + item.id">
        <img :src="item.cover" />
        <div class="info">
          <p class="title">{{ item.content }}</p>
          <div class="authorinfo">
            <img referrer="no-referrer|origin|unsafe-url" :src="item.avator" />
            <span class="user">{{ item.username }}</span>
            <div class="lover">
              <van-icon name="like-o" />
              <span>{{ item.likes }}</span>
            </div>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch,reactive,toRefs } from "vue";
import axios from "axios";

export default defineComponent({
  name: "Getoffer",
  props: {
    msg: String,
  },
  setup(props) {
    console.log(props.msg, "ppppp");
    const state = reactive({
      tabList2: [],
    });
    const getFindInfo = () => {
      axios.get(`/api/home/tab2/${props.msg}`).then(({ data }) => {
        if (data) {
          // 成功了
          state.tabList2 = data;
          console.log(state.tabList2, "qqqqqqqqq");
        } else {
          // 失败的
          //Toast.fail("请求数据失败");
        }
      });
    };
    getFindInfo();
    return{...toRefs(state)}
  },
});
</script>
<style lang="less" scoped>
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
          overflow: hidden!important; /*超出的文本隐藏*/
          text-overflow: ellipsis!important; /* 溢出用省略号*/
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