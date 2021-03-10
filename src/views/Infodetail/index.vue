<template>
  <div>
    <van-sticky>
      <van-nav-bar left-arrow @click-left="onClickLeft">
        <template #title>
          <div class="user">
            <img :src="tabdetail.avator" />
            <span>{{ tabdetail.username }}</span>
          </div>
        </template>
      </van-nav-bar>
    </van-sticky>
    <van-swipe :autoplay="3000" lazy-render>
      <van-swipe-item v-for="image in lunboList" :key="image">
        <img :src="image" />
      </van-swipe-item>
    </van-swipe>
    <div class="content">
      <div class="title">{{ tabdetail.title }}</div>
      <span class="position">{{ tabdetail.position_name }}</span>
      <hr />
      <div class="pre">{{ tabdetail.content }}</div>
      <div class="topics">
        <span v-for="item2 in topics" :key="item2">{{ item2 }}</span>
      </div>
      <div class="time">拍摄于{{ tabdetail.Time }}</div>
      <div class="fav">
        <img
          class="favuser"
          v-for="item3 in favuser"
          :key="item3"
          :src="item3"
        />
        <img class="favimg" :src="tabdetail.favornum" />
        <div class="lover"><van-icon name="like-o" />{{ tabdetail.likes }}</div>
      </div>
      <hr />
      <h3>回复</h3>
      <div class="comments" v-for="item in tabdetail.reply" :key="item">
        <van-cell center :value="replyLove[item - 1]">
          <template #title>
            <h3>{{ replyUser[item - 1] }}</h3>
            <span>{{ replyTime[item - 1] }}</span>
          </template>
          <template #icon>
            <img :src="replyImg[item - 1]" />
          </template>
          <template #label>
            <div>{{ replyContent[item - 1] }}</div>
          </template>
        </van-cell>
      </div>
    </div>
    <van-action-bar>
      <van-action-bar-icon icon="comment-o" :text="tabdetail.reply" />
      <van-action-bar-icon icon="like-o" :text="tabdetail.likes" />
      <van-action-bar-icon icon="star-o" :text="tabdetail.collection" />
    </van-action-bar>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import axios from "axios";
import { Toast } from "vant";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "Infodetail",
  components: {},
  props: ["id"],
  setup(props: any, context) {
    const router = useRouter();
    console.log(props.id, "kkkkkkkkk");
    const state: any = reactive({
      tabdetail: [],
      favuser: [],
      lunboList: [],
      replyContent: [],
      replyImg: [],
      replyLove: [],
      replyTime: [],
      replyUser: [],
      topics: [],
    });
    const onClickLeft = () => {
      router.push("/");
    };

    const gettabdetail = () => {
      axios.get(`/api/home/tabdetail/${props.id}`).then(({ data }) => {
        if (data) {
          // 成功了
          state.tabdetail = data[0];
          if (state.tabdetail.topics != null) {
            state.topics = state.tabdetail.topics.split(",");
          }
          state.favuser = state.tabdetail.favuser.split(",");
          state.lunboList = state.tabdetail.lunbolist.split(",");
          if (state.tabdetail.reply != 0) {
            state.replyContent = state.tabdetail.replycontent.split(",");
            state.replyImg = state.tabdetail.replyimg.split(",");
            state.replyLove = state.tabdetail.replylove.split(",");
            state.replyTime = state.tabdetail.replytime.split(",");
            state.replyUser = state.tabdetail.replyuser.split(",");
          }

          console.log(state.tabdetail, "xxxxxxxxxxxxxx");
          console.log(state.replyUser, "aaaaaaaaaaaaaaaaa");
        } else {
          // 失败的
          Toast.fail("请求数据失败");
        }
      });
    };
    gettabdetail();
    return { ...toRefs(state), onClickLeft };
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
/* ==================头像================== */

.user {
  display: inline-block;
  position: relative;
  img {
    position: absolute;
    top: 5px;
    width: 36px;
    border-radius: 50%;
    z-index: 3;
  }
  span {
    padding-left: 47px;
    line-height: 46px;
    z-index: 3;
    font-weight: 600;
  }
}

/* ==============轮播====================== */
.van-swipe {
  height: 500px !important;
  .van-swipe-item {
    height: 500px !important;
    text-align: center;
    img {
      height: 100% !important;
      width: 100% !important;
    }
  }
}
/* ================详情信息描述=============================== */
.content {
  padding: 0 7px;
  .title {
    font-size: 22px;
    font-weight: 600;
    color: black;
    margin-top: 10px;
  }
  .position {
    display: inline-block;
    padding: 3px 6px;
    margin: 10px;
    font-size: 14px;
    background-color: rgb(241, 240, 240);
    border-radius: 8px;
    color: rgb(15, 187, 255);
  }
  .pre {
    white-space: pre-wrap;
    font-size: 19px;
    letter-spacing: 2px;
    color: rgb(124, 124, 124);
    margin: 10px 5px 0;
  }
  .topics {
    margin-top: 10px;
    span {
      display: inline-block;
      margin: 0 10px;
      color: rgb(0, 119, 255);
      font-size: 16px;
      font-weight: 550;
    }
  }
  .time {
    font-size: 14px;
    color: #ccc;
    margin: 10px 2px;
  }
  .fav {
    margin: 10px;
    .favuser {
      width: 30px;
      border-radius: 50%;
    }
    .favimg {
      width: 60px;
    }
    .lover {
      float: right;
      line-height: 34px;
    }
  }
  /* ===================评论信息========================== */
  h3 {
    margin: 10px 0;
  }
  .comments {
    .van-cell {
      img {
        width: 40px;
        border-radius: 50%;
      }
      /deep/.van-cell__title {
        flex: 2 !important;
        -webkit-flex: 2 !important;
        h3 {
          display: inline-block;
          margin: 2px 10px;
        }
        span {
          font-size: 13px;
          color: #ccc;
        }
      }
      /deep/.van-cell__label {
        font-size: 15px;
        margin: 0 13px;
        color: rgb(49, 49, 49);
      }
      /deep/.van-cell__value {
        color: black;
        font-size: 16px;
        flex: 1 !important;
        -webkit-flex: 1 !important;
      }
    }
  }
}
.van-action-bar {
  .van-action-bar-icon {
    flex-grow: 1 !important;
    /deep/.van-action-bar-icon__icon {
      display: inline-block;
      font-size: 24px;
      width: 1em;
    }
  }
}
</style>