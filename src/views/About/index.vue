<template>
  <div>
    <van-sticky>
      <van-nav-bar left-arrow @click-left="onClickLeft">
        <template #title>
          <div class="user">
            <span>关于</span>
          </div>
        </template>
      </van-nav-bar>
    </van-sticky>
    <div style="width: 200px; height: 200px; margin: 20px auto">
      <img
        style="width: 100%; height: 100%"
        src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=291615228,1753379091&fm=26&gp=0.jpg"
        alt=""
      />
    </div>
    <div
      style="width: 200px; height: 40px; margin: 10px auto;text-align: center"
    >
      <div style="font-family:'STHupo','NSimSun';font-size:17px">气旅行</div>
      <div style="font-size:15px;color:grey">版本：&nbsp;1.1.0</div>
    </div>
    <van-collapse v-model="activeName" accordion>
      <van-collapse-item title="隐私政策" name="1">
        <div>
          尊重用户个人隐私是气旅行的一项基本政策。气旅行网是将有资质的酒店、旅行社、民宿经营服务方等提供的旅游服务信息汇集于气旅行网供用户查阅，同时帮助用户通过气旅行网与上述酒店、旅行社、民宿经营服务方等联系并预订相关旅游服务项目。
          您在使用我们的产品与/或服务前仔细阅读并确认您已经充分理解本隐私政策所写明的内容，并与淮北信息技术有限公司达成协议并接受所有的服务条款。
          我们十分注重保护用户的个人信息及隐私安全，我们理解您通过网络向我们提供信息是建立在对我们信任的基础上，我们重视这种信任，也深知隐私对您的重要性，并尽最大努力全力保护您的隐私。
          本隐私政策中个人信息或个人敏感信息所包含的内容出自于GB/T35273《个人信息安全规范》。
        </div>
      </van-collapse-item>
      <van-collapse-item title="知识产权声明" name="2">
        <div>
          除明显归属于合作伙伴、第三方所有的信息资料外，去哪儿拥有去哪儿网及其关联公司网站、去哪儿移动终端内所有内容，包括但不限于文字、图片、图形、表格、动画、程序、软件等单独或组合的版权。任何被授权的浏览、复制、打印和传播属于本网站内的内容必须符合以下条件：
        </div>
        <div>
          <div>
            去哪儿网所有的产品、技术与所有程序均属于去哪儿的知识产权。“去哪儿”、“Qunar”、“Qunar.com”以及相关图形、标识等为去哪儿的注册商标。
          </div>
          <div>
            未经去哪儿许可，任何人不得擅自使用去哪儿的任何知识产权，包括但不限于以非法的方式复制、传播、展示、镜像、上载、下载，或对去哪儿网站资料作全部和局部复制、转载、引用和链接等。否则，去哪儿将依法追究法律责任。
          </div>
        </div>
      </van-collapse-item>
      <van-collapse-item title="如何联系我们" name="3">
        <div>
          本隐私政策中的个人信息控制者为淮北信息技术有限公司，注册地址为安徽省淮北市沱河东路8号。
        </div>
        <div>
          如您有任何与个人信息保护或隐私保护相关的问题、意见或建议，以及相关的投诉、举报，您可以通过访问在线客服系统，或拨打气旅行网主页公示的客服电话9527，或向个人信息保护负责人发送电子邮件（qlx@qulv.com）等多种方式与我们联系。您也可以将您的问题寄至以下地址：
        </div>
        <div>安徽省淮北市沱河东路8号 法务部（收）</div>
        <div>一般情况下，我们将在核验您的身份无误后十五个工作日内回复。</div>
      </van-collapse-item>
    </van-collapse>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, ref, computed } from "vue";
import { useRouter } from "vue-router";
import xmraxios from "../../utils/xmraxios.js";
import { PostCart } from "../../utils/api.js";
import { Toast } from "vant";
export default defineComponent({
  name: "About",
  components: {},
  props: [],
  setup(props: any, context) {
    const router = useRouter();
    const state: any = reactive({});
    const activeName = ref("0");
    const onClickLeft = () => {
      router.go(-1);
    };
    return { ...toRefs(state), onClickLeft, activeName };
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
/deep/.van-nav-bar {
  background-color: #ffd61d;
}
</style>