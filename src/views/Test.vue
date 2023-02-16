<template>
  <div>
    <button @click="dialog=true">Open Dialog</button>
    <TestGet :dialog.sync="dialog" v-on:close-dialog="closeDialog"  /> 
  </div>
</template>

<script>
import TestGet from "@/components/dialog/TestGet.vue";
export default {
  components: {
    TestGet
  },
  data: () => ({
    dialog:false,
    submit:true
  }),
  methods:{
    closeDialog(){
      alert("success");
    }
  }
};
</script>