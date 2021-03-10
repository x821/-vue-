<template>
  <div>
    <van-sticky>
      <van-nav-bar left-arrow @click-left="onClickLeft">
        <template #title>
          <div class="user">
            <span>服务协议</span>
          </div>
        </template>
      </van-nav-bar>
    </van-sticky>
    <div style="padding:5px 10px">
        <div style="padding-top:10px">气旅行网所提供的各项服务和内容的所有权和运作权均归淮北信息技术有限公司及其关联公司（以下简称“气旅行”）所有。如果您在本网站、气旅行关联公司网站或其他气旅行提供的移动应用或软件上（以下简称“气旅行网”），访问、预定或使用我们的产品或服务（以上统称为“服务”），您便接受了以下服务协议，请仔细阅读以下内容。如果您不同意以下任何内容，请立刻停止访问本网站或使用本网站服务。</div>
        <div style="padding-top:10px">一、协议总则</div>
        <div style="padding:4px 10px"><span >1、</span> 本协议内容包括协议正文、气旅行网子频道各单项服务协议及其他气旅行已经发布的或将来可能发布的各类规则，包括但不限于 隐私政策、 免责声明、 知识产权声明、 权利声明、 旅游度假预订须知、 气旅行旅图用户协议、 气旅行网个人账户协议等其他协议（“其他条款”）。如果本协议与“其他条款”有不一致之处，则以“其他条款”为准。除另行明确声明外，任何气旅行提供的服务均受本协议约束。</div>
        <div style="padding:4px 10px"><span>2、</span> 气旅行有权根据需要不时地制订、修改本协议及/或各类规则向用户提供基于互联网以及移动网的相关服务，并在本页面及其相应页面进行公布，但不再另行通知您，您应该定期登陆本页面及其他相关页面，了解最新的协议内容。变更后的协议和规则一经在本页面及相关页面公布后，立即自动生效。如您不同意相关变更，应当立即停止访问气旅行网或使用气旅行服务。若您继续使用气旅行服务的，即表示您接受已经修订的协议和规则。</div>
        <div style="padding:4px 10px"><span>3、</span> 若您作为气旅行的关联公司或合作公司的用户登陆气旅行平台，访问气旅行网站或使用气旅行服务，即视为您同意本协议的所有条款及气旅行公布的其他规则、说明和操作指引。</div>
        <div style="padding-top:10px">二、用户权利</div>
        <div style="padding:4px 10px"> 在您完成注册申请手续后，意味着您已获得气旅行账户（用户名）的使用权。您应提供及时、详尽及准确的个人资料，并不断更新注册资料，符合及时、详尽准确的要求。您应妥善保管您的账户（用户名）和密码，通过您的账户（用户名）和密码操作或实施的行为，将视为您本人的行为，由您本人承担相应的责任和后果。如果您发现他人不当使用您的账户或有任何其他可能危及您的账户安全的情形时，您应当立即以书面、有效方式通知气旅行，要求气旅行暂停相关服务。在此，您理解气旅行对您的请求采取行动需要合理时间，气旅行对在采取行动前已经产生的后果（包括但不限于您的任何损失）不承担任何责任。</div>
        <div style="padding-top:10px">三、服务的变更、中断或终止</div>
        <div style="padding:4px 10px"><span>1、</span> 您完全理解并同意，本服务涉及到互联网及移动通讯等服务，可能会受到各个环节不稳定因素的影响。因此任何因不可抗力、计算机病毒或黑客攻击、系统不稳定、用户所在位置、用户关机、GSM网络、互联网络、通信线路等其他气旅行无法预测或控制的原因，造成的服务中断、取消或终止的风险。您须自行承担以上风险，气旅行对服务之及时性、安全性、准确性不做任何保证。</div>
        <div style="padding:4px 10px"><span>2、</span> 气旅行需要定期或不定期地对提供网络服务的平台或相关的设备进行检修或者维护，如因此类情况而造成网络服务（包括收费网络服务）在合理时间内的中断，气旅行无需为此承担任何责任。气旅行保留不经事先通知为维修保养、升级或其它目的暂停全部或部分的网络服务的权利。</div>
        <div style="padding:4px 10px"><span>3、</span> 您完全理解并同意，除本服务协议另有规定外，鉴于网络服务的特殊性，气旅行有权随时变更、中断或终止部分或全部的网络服务，且无需通知您，也无需对您或任何第三方承担任何责任。</div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, ref, computed } from "vue";
import { useRouter } from "vue-router";
import xmraxios from "../../utils/xmraxios.js";
import { PostCart } from "../../utils/api.js";
import { Toast } from "vant";
export default defineComponent({
  name: "Useragree",
  components: {},
  props: [],
  setup(props: any, context) {
    const router = useRouter();
    const state: any = reactive({});
    const onClickLeft=()=>{
        router.go(-1)
    }
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
/deep/.van-nav-bar {
  background-color: #ffd61d;
}
</style>