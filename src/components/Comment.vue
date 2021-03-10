<template>
  <div>
    <van-form @submit="onSubmit">
      <van-field
        v-model="content"
        placeholder="请输入要BB的评论"
        type="textarea"
        rows="2"
        
      />
      <div style="margin: 0px">
        <van-button block type="info" native-type="submit">发表评论</van-button>
      </div>
    </van-form>

    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="(item, index) in comments" :key="item">
        <template #title>
          <div class="cmt-title">
            第{{ index + 1 }}楼&nbsp;&nbsp;{{ item.username }}&nbsp;&nbsp;
          </div>
        </template>
        <template #label>
          <div class="cmt-body">{{ item.contant }}</div>
        </template>
      </van-cell>
    </van-list>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, reactive, toRefs, computed } from "vue";
import { Toast } from "vant";
// import { NewsInfoUrl } from "../tools/api";
import axios from "axios";
import xmraxios from "../utils/xmraxios.js";
import { PostCommentUrl } from "../utils/api.js";
import { useRouter } from "vue-router";

type IState = {
  content: string;
  list: any[];
  loading: boolean;
  finished: boolean;
  comments: any[];
};

export default defineComponent({
  props: ["id"],
  setup(props: any, context) {
    const initalState: IState = {
      content: "",
      list: [],
      loading: false,
      finished: false,
      comments: [],
    };
    const router = useRouter();
    //状态数据
    const state = reactive(initalState);
    const onSubmit = async () => {
      let result = await xmraxios("POST", PostCommentUrl + props.id, {
        content: state.content
      });
      console.log(result,state.content,'wwwww');
      if (result.status == 0) {
        state.list.unshift({
          username: "匿名用户",
          contant: state.content.trim()
        });
        //清空页面textarea内容
        state.content = "";
      }
      //Response.redirect('/shop/play/'+props.id)
      getcomments();
      state.content = "";
    };
    const onLoad = () => {
      state.loading = true;
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          state.list.push(state.list.length + 1);
        }
        state.loading = false;
        if (state.list.length >= 40) {
          state.finished = true;
        }
      }, 1000);
    };
    const getcomments = () => {
      axios.get(`/api/home/shop/hotecomments/${props.id}`).then(({ data }) => {
        if (data) {
          // 成功了
          state.comments = data;
          console.log(state.comments, "xxxxxxxxxxxxxx");
        } else {
          // 失败的
          Toast.fail("请求数据失败");
        }
      });
    };
    getcomments();
    return { ...toRefs(state), onLoad, onSubmit };
  },
});
</script>

<style lang="less" scoped>
.van-form {
  display: flex;
  h3 {
    padding: 16px;
  }
  .van-field__body {
    flex:4;
    border: 1px solid #ccc;
  }
  /deep/.van-field{
    padding: 0;
  }
  button{
    border: 0;
    height: 70px;
    border-radius: 20px;
    margin-left: 5px;
    padding: 20px;
    background-color: orange;
  }
}
/deep/.van-field__control {
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 16px;
}
</style>