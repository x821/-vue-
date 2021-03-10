<template>
    <div>攻略详情</div>
</template>
<script lang="ts">
import { defineComponent,reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "Stratrydetail",
  components: {
  },
  props:['id'],
  setup(props: any, context){
    const state=reactive({
      id:props.id
    })
    console.log(state.id ,'llllll')
    return{...toRefs(state)}
  }
});
</script>