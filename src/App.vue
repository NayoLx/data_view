<template>
  <div id="app" class="fillcontain">
    <router-view />
  </div>
</template>

<script>
import { L2Dwidget } from "live2d-widget";
//tororo 猫 hijiki 黑猫 epsilon2_1/assets/Epsilon2.1 haru/02/assets/haru02

export default {
  name: "App",
  created() {
    L2Dwidget.init({
      model: {
        jsonPath:
          "https://cdn.jsdelivr.net/gh/wangsrGit119/wangsr-image-bucket/L2Dwidget/live2d-widget-model-tororo/assets/tororo.model.json",
      },
      display: {
        position: "left",
        hOffset: 50,
      },
      dialog: {
        enable: true,
      },
    });
  },
};
</script>

<style lang="less">
@import "./style/common";
</style>

