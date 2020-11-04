<template>
  <div class="top-right-cmp">
    <div class="chart-name">{{ top_right_title }}</div>
    <l-chart :options="option" ref="line_chart"
    style="
        width: 100%;
        height: 100%;
        font-size: 30em;
        color: #4f5e87;
      "/>
  </div>
</template>

<script>
import ECharts from "vue-echarts";

export default {
  components: {
    "l-chart": ECharts,
  },
  data() {
    return {};
  },
  mounted() {
    window.addEventListener("resize", this.resizeTheChart);
  },
  methods: {
    resizeTheChart() {
      if (this.$refs.line_chart) {
        this.$refs.line_chart.resize();
      }
    },
  },
  props: ["option", "top_right_title"],
};  
</script>

<style lang="less" scoped>
@import "../../style/data_v";
</style>
