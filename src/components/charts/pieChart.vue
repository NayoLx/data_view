<template>
  <div id="pie-chart">
    <div class="pie-chart-title">{{ title }}</div>
    <p-chart :options="polar" ref="pie_chart" />
  </div>
</template>

<style lang="less" scoped>
@import "../../style/data_v";
#pie-chart {
  width: 100%;
  height: 100%;
  color: #000;
  background-color: #fff;
  border-radius: 10px;
  box-sizing: border-box;

  .echarts {
    width: 100%;
    height: calc(~"100% - 50px");
  }
  .pie-chart-title {
    height: 50px;
    font-weight: bold;
    text-indent: 20px;
    font-size: 20px;
    display: flex;
    align-items: center;
  }

  .dv-charts-container {
    height: calc(~"100% - 50px");
  }
}
</style>

<script>
import ECharts from "vue-echarts";

export default {
  components: {
    "p-chart": ECharts,
  },
  data() {
    return {};
  },
  mounted() {
    window.addEventListener("resize", this.resizeTheChart);
  },
  methods: {
    resizeTheChart() {
      if (this.$refs.pie_chart) {
        this.$refs.pie_chart.resize();
      }
    },
  },
  props: ["polar", "title"],
};
</script>
