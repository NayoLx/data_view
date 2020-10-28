<template>
  <div class="data_v_page">
    <head-top></head-top>
    <div class="block-top-content">
      <div class="mc-top">
        <line-chart :option="lines_chart_option"/>
      </div>
    </div>

    <div class="block-bottom-content">
      <scroll-board :config="scroll_board_config" />
      <rose-chart :option="rose_chart_option" :title="title" />
    </div>
  </div>
</template>

<script>
import headTop from "@/components/headTop";
import scrollBoard from "@/components/charts/scrollBoard";
import roseChart from "@/components/charts/roseChart";
import lineChart from "@/components/charts/lineChart";

export default {
  data() {
    return {
      rose_chart_option: {},
      title: "",
      scroll_board_config: {},
      lines_chart_option: {},
    };
  },
  components: {
    headTop,
    roseChart,
    lineChart,
    scrollBoard,
  },
  created() {
    this.getGroundData();
    this.setTableData();
    this.setLineData()
  },
  methods: {
    //饼图数据
    getGroundData() {
      this.$axios
        .get("/user/getGroundUser")
        .then((res) => {
          var pie_data = [];
          res.data.forEach((element) => {
            pie_data.push({ name: element._id, value: element.value });
          });
          this.setValue(pie_data);
        })
        .catch((err) => {
          this.$message({
            type: "error",
            message: err,
          });
        });
    },

    //设置数据
    setValue(data) {
      this.title = "累计收入地域分布",
        this.rose_chart_option = {
          series: [
            {
              type: "pie",
              radius: "50%",
              roseSort: false,
              data: data,
              insideLabel: {
                show: false,
              },
              outsideLabel: {
                formatter: "{name} {percent}%",
                labelLineEndLength: 20,
                style: {
                  fill: "#000",
                },
                labelLineStyle: {
                  stroke: "#000",
                },
              },
              roseType: true,
            },
          ],
        };
    },

    //表格数据
    setTableData() {
      this.scroll_board_config = {
        header: ["时间", "病害信息", "数量", "标段"],
        data: [
          ["2019-07-01 19:25:00", "路面危害-松散", "5", "xxxxxxx"],
          ["2019-07-02 17:25:00", "路面危害-路面油污清理", "13", "xxxxxxx"],
          ["2019-07-03 16:25:00", "交安设施-交通标志牌结构", "6", "xxxxxxx"],
          ["2019-07-04 15:25:00", "路基危害-防尘网", "2", "xxxxxxx"],
          ["2019-07-05 14:25:00", "交安设施-交通标志牌结构", "1", "xxxxxxx"],
          ["2019-07-06 13:25:00", "路面危害-松散", "3", "xxxxxxx"],
          ["2019-07-07 12:25:00", "路基危害-防尘网", "4", "xxxxxxx"],
          ["2019-07-08 11:25:00", "路面危害-路面油污清理", "2", "xxxxxxx"],
          ["2019-07-09 10:25:00", "交安设施-交通标志牌结构", "5", "xxxxxxx"],
          ["2019-07-10 09:25:00", "路基危害-防尘网", "3", "xxxxxxx"],
        ],
        index: true,
        columnWidth: [50, 170, 300],
        align: ["center"],
        rowNum: 7,
        headerBGC: "#1981f6",
        headerHeight: 45,
        oddRowBGC: "rgba(0, 44, 81, 0.8)",
        evenRowBGC: "rgba(10, 29, 50, 0.8)",
      };
    },

    //折线数据
    setLineData() {
      this.lines_chart_option = {
        legend: {
          data: [
            {
              name: "新增用户",
              color: "#37A2DA",
            },
            {
              name: "新增订单",
              color: "#ff5ca9",
            },
            {
              name: "注册用户",
              color: "#3de7c9",
            },
            {
              name: "总订单数",
              color: "#f5d94e",
            },
          ],
          textStyle: {
            fill: "#333",
          },
        },
        xAxis: {
          data: ["10/01", "10/02", "10/03", "10/04", "10/05", "10/06", "10/07"],
          axisLine: {
            style: {
              stroke: "#999",
            },
          },
          axisLabel: {
            style: {
              fill: "#999",
            },
          },
          axisTick: {
            show: false,
          },
        },
        yAxis: {
          data: "value",
          splitLine: {
            show: false,
          },
          axisLine: {
            style: {
              stroke: "#999",
            },
          },
          axisLabel: {
            style: {
              fill: "#999",
            },
          },
          axisTick: {
            show: false,
          },
          min: 0,
          max: 20,
        },
        series: [
          {
            name: "注册用户",
            data: [1, 2, 3, 5, 6, 10, 13],
            type: "bar",
            barStyle: {
              fill: "#3de7c9",
            },
          },
          {
            name: "总订单数",
            data: [2.5, 3.5, 6.5, 6.5, 7.5, 10, 18],
            type: "bar",
            barStyle: {
              fill: "#f5d94e",
            },
          },
          {
            name: "新增用户",
            data: [1.3, 2.3, 5.3, 5.3, 6.3, 5.3, 1.3],
            type: "line",
            smooth: true,
            lineArea: {
              show: true,
              gradient: ["rgba(55, 162, 218, 0.6)", "rgba(55, 162, 218, 0)"],
            },
            lineStyle: {
              lineDash: [5, 5],
            },
            linePoint: {
              radius: 4,
              style: {
                fill: "#00baff",
              },
            },
          },
          {
            data: [2.5, 3.5, 6.5, 6.5, 7.5, 6.5, 2.5],
            type: "line",
            name: "新增订单",
            lineArea: {
              show: true,
              gradient: ["rgba(245, 217, 79, 0.8)", "rgba(245, 217, 79, 0.2)"],
            },
            lineStyle: {
              stroke: "#ff5ca9",
            },
            linePoint: {
              radius: 4,
              style: {
                fill: "#ff5ca9",
                stroke: "transparent",
              },
            },
          },
        ],
      };
    }
  },
};
</script>

<style lang="less">
@import "../style/data_v";

</style>
