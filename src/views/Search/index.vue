<template>
  <div>
    <van-nav-bar title="搜索" left-arrow @click-left="onClickLeft">
    </van-nav-bar>
    <div>
      <van-search v-model="value" placeholder="例如：四川" @search="onSearch" />
    </div>
    <div class="content">
      <div v-if="Searchinfo.length < 1">
        <div class="find-item" v-for="item in totalInfo" :key="item.id">
          <router-link :to="'/infodetail/' + item.id">
            <img :src="item.cover" />
            <div class="place">
              <van-icon name="location" />{{ item.position_name }}
            </div>
            <div class="info">
              <p class="title">{{ item.content }}</p>
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
      </div>
      <div v-else>
        <div class="find-item" v-for="item in Searchinfo" :key="item.id">
          <router-link :to="'/infodetail/' + item.id">
            <img :src="item.cover" />
            <div class="place">
              <van-icon name="location" />{{ item.position_name }}
            </div>
            <div class="info">
              <p class="title">{{ item.content }}</p>
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
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, reactive, toRefs } from "vue";
import axios from "axios";
import { Toast } from "vant";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "Search",
  components: {},
  props: {},
  setup() {
    console.log("llllllll");
    const value = ref("");
    let state = reactive({
      Searchinfo: [],
      totalInfo: [],
    });
    const router = useRouter();
    const onClickLeft = () => {
      router.push("/");
    };
    const gettotalInfo = () => {
      axios.get("/api/home/tabs").then(({ data }) => {
        if (data) {
          // 成功了
          state.totalInfo = data;
          console.log(state.totalInfo, "ggggggg");
        } else {
          // 失败的
          Toast.fail("请求数据失败");
        }
      });
    };

    const onSearch = (val) => {
      console.log(value.value, "llllll");
      const getInfo = () => {
        axios.get(`/api/home/info/${value.value}`).then(({ data }) => {
          if (data) {
            // 成功了
            state.Searchinfo = data;
            console.log(state.Searchinfo, "ssssssssss");
          } else {
            // 失败的
            Toast.fail("请求数据失败");
          }
        });
      };
      getInfo();
    };
    gettotalInfo();
    return { value, onClickLeft, onSearch, ...toRefs(state) };
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
  position: relative;
  img {
    width: 177px;
    height: 210px;
    border-radius: 10px;
  }
  .place {
    position: absolute;
    color: #fff;
    top: 180px;
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
      position: relative;
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