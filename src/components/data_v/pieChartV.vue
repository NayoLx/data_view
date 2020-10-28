
<template>
  <div id="pie-chart">
    <div id="main" />
  </div>
</template>

<script>
export default {
  name: "pieChart",
  data() {
    return {};
  },
  methods: {
    myEcharts() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = this.$echarts.init(document.getElementById("main"));

      // 指定图表的配置项和数据
      var option = {
        legend: {
          orient: "horizontal",
          left: 10,
          data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"],
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "20",
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: 335, name: "直接访问" },
              { value: 310, name: "邮件营销" },
              { value: 234, name: "联盟广告" },
              { value: 135, name: "视频广告" },
              { value: 1548, name: "搜索引擎" },
            ],
          },
        ],
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
  },
  mounted() {
    this.myEcharts();
  }
};
</script>

<style lang="less">
#pie-chart {
  margin-top: 30px;
  margin-bottom: 30px;
  margin-right: 30px;
  width: calc(~"100% - 30px");
  height: calc(~"100% - 60px");
  color: #000;
  background-color: #ffffff;
  box-sizing: border-box;

  #main {
    width: auto;
    height: 100%;
  }
  .rose-chart-title {
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
