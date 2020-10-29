<template>
  <div class="data_v_page" v-loading="loading">
    <head-top></head-top>
    <div class="block-top-content">
      <div class="mc-top">
        <div class="mc-top-select">
          <button class="mc-top-select-btn1" @click="getThisWeekData()">
            近七天
          </button>
          <button class="mc-top-select-btn1" @click="getThisMouthData()">
            本月
          </button>
          <button class="mc-top-select-btn1" @click="getThisYearData()">
            本年
          </button>
          <el-date-picker
            v-model="selectDay"
            type="datetimerange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd 00:00:00"
          ></el-date-picker>
          <button class="mc-top-select-btn2" @click="getTimeArrData()">
            查询
          </button>
        </div>
        <div class="mc-top-chart">
          <line-chart :option="lines_chart_option" />
        </div>
      </div>
      <div class="block-top-right">
        <pie-chart :polar="pie_chart_option" :title="title" />
      </div>
    </div>

    <div class="block-bottom-content">
      <el-table :data="paidlistArr" height="100%" border>
        <el-table-column prop="paidTime" label="日期" width="170">
        </el-table-column>
        <el-table-column prop="pay_channel_10" label="支付宝支付(元)">
        </el-table-column>
        <el-table-column prop="pay_channel_11" label="微信支付(元)">
        </el-table-column>
        <el-table-column prop="pay_channel_12" label="苹果支付(元)">
        </el-table-column>
        <el-table-column prop="count" label="总支付金额(元)"> </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import headTop from "@/components/headTop";
import lineChart from "@/components/charts/lineChart";
import pieChart from "@/components/charts/pieChart";
import web from "@/config/web";

import {
  getTodayAt0,
  getMouthArrTimeStamp,
  getYearArrTimeStamp,
  changeData,
  getTimeArrTimeStamp,
} from "../utils/time_helper";

export default {
  data() {
    return {
      pie_chart_option: {},
      title: "",
      loading: false,
      paidlistArr: [],
      selectDay: [],
      scroll_board_config: {},
      lines_chart_option: {},
    };
  },
  components: {
    headTop,
    lineChart,
    pieChart,
  },
  created() {
    this.loading = true;
    this.getThisWeekData();
  },
  methods: {
    //获取近七天数据
    getThisWeekData() {
      var endTime = getTodayAt0() + 86399;
      var startTime = getTodayAt0() - 604800;
      var time = {
        startTime: startTime,
        endTime: endTime,
      };
      this.getLineData(time);
      this.getGroundData(time);
    },

    //获取本月数据
    getThisMouthData() {
      var timeArr = getMouthArrTimeStamp();
      if (timeArr.length !== 0 && timeArr != null) {
        var time = {
          startTime: timeArr[0],
          endTime: timeArr[1],
        };
        this.getLineData(time);
        this.getGroundData(time);
      } else {
        this.$message({
          type: "error",
          message: "无效时间，请重新选择",
        });
      }
    },

    //获取本年的数据
    getThisYearData() {
      var timeArr = getYearArrTimeStamp();
      if (timeArr.length !== 0 && timeArr != null) {
        var time = {
          startTime: timeArr[0],
          endTime: timeArr[1],
        };
        this.getLineData(time);
        this.getGroundData(time);
      } else {
        this.$message({
          type: "error",
          message: "无效时间，请重新选择",
        });
      }
    },

    //获取某一时间段的数据
    getTimeArrData() {
      if (this.selectDay != null && this.selectDay.length !== 0) {
        var timeArr = getTimeArrTimeStamp(this.selectDay);
        if (timeArr.length !== 0 && timeArr != null) {
          var time = {
            startTime: timeArr[0],
            endTime: timeArr[1],
          };
          this.getLineData(time);
          this.getGroundData(time);
          return;
        }
      }
      this.$message({
        type: "error",
        message: "无效时间，请重新选择",
      });
    },

    //调用接口获取数据并进行数据处理
    getLineData(time) {
      web
        .request({
          url: "/dailyTransflow/getDataWithTime",
          method: "post",
          data: time,
        })
        .then((res) => {
          this.setTableData(res.data);
          this.setLineData(res.data);
        })
        .catch((err) => {
          this.$message({
            type: "error",
            message: err,
          });
        });
    },

    //饼图数据
    getGroundData(time) {
      var that = this;
      web
        .request({
          url: "/dailyTransflow/getTotalTransflowWithTime",
          method: "post",
          data: time,
        })
        .then((res) => {
          var pie_data = [];
          res.data.map((element) => {
            pie_data.push({
              name: this.getChannelString(element._id),
              value: parseInt(element.value / 100),
            });
          });
          this.setPieValue(pie_data);
        })
        .catch((err) => {
          this.$message({
            type: "error",
            message: err,
          });
        });
    },

    //获取渠道字段
    getChannelString(channelId) {
      var channel;
      switch (channelId) {
        case 10:
          channel = "支付宝";
          break;
        case 11:
          channel = "微信";
          break;
        case 12:
          channel = "苹果支付";
          break;
        default:
          break;
      }
      return channel;
    },

    //设置饼图数据
    setPieValue(data) {
      (this.title = "支付渠道总额饼图"),
        (this.pie_chart_option = {
          legend: {
            orient: "vertical",
            left: 10,
            data: data.map((element) => element.name),
          },
          tooltip: {
            trigger: "item",
            formatter: "{b} : {c}元 ({d}%)",
          },
          series: [
            {
              type: "pie",
              data: data,
              // radius: "55%",//饼图
              radius: ["40%", "55%"],
              insideLabel: {
                show: false,
              },
              outsideLabel: {
                formatter: "{name}",
                labelLineEndLength: 20,
                style: {
                  fill: "#000",
                },
                labelLineStyle: {
                  stroke: "#000",
                },
              },
            },
          ],
          color: ["#FFE278", "#6375FD", " #4CB4FF", "#C6E0C1"],
        });

      this.loading = false;
    },

    //表格数据
    setTableData(data) {
      var paidlistArr = [];
      data.map((element) => {
        var newArr = {
          paidTime: changeData(element.paiddate * 1000),
          pay_channel_10: parseInt(element.paidlist.pay_channel_10 / 100),
          pay_channel_11: parseInt(element.paidlist.pay_channel_11 / 100),
          pay_channel_12: parseInt(element.paidlist.pay_channel_12 / 100),
          count:
            parseInt(element.paidlist.pay_channel_10 / 100) +
            parseInt(element.paidlist.pay_channel_11 / 100) +
            parseInt(element.paidlist.pay_channel_12 / 100),
        };
        paidlistArr.push(newArr);
      });
      this.paidlistArr = paidlistArr;
    },

    //折线数据
    setLineData(data) {
      var paidlistArr = [];
      var countArr = [];
      data.map((element) => {
        paidlistArr.push(element.paidlist);
      });
      data.map((element) => {
        var newArr =
          parseInt(element.paidlist.pay_channel_10 / 100) +
          parseInt(element.paidlist.pay_channel_11 / 100) +
          parseInt(element.paidlist.pay_channel_12 / 100);
        countArr.push(newArr);
      });
      this.lines_chart_option = {
        title: {
          text: "支付统计", //如“折线图堆叠”
          textStyle: {
            //标题样式设置
            color: "#000000",
            fontSize: "18",
            fontWeight: "600",
          },
          x: "10px",
        },
        tooltip: {
          trigger: "axis",
        },
        //图例颜色以及图例名称
        color: ["#D5EBFF", "#AD94FF", "#FACC00", "#73DDBC"],
        legend: {
          data: ["支付宝支付", "微信支付", "苹果支付", "总支付金额"],
          //图例样式以及位置
          textStyle: {
            color: "#000000",
          },
          x: "center",
          y: "15px",
        },
        xAxis: {
          data: data.map((element) => changeData(element.paiddate * 1000)),
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
          name: "日期",
          nameLocation: "end",
        },
        yAxis: {
          name: "金额(元)",
          nameLocation: "end",
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
        },
        series: [
          {
            name: "总支付金额",
            data: countArr,
            type: "bar",
            emphasis: {
              label: {
                show: false,
                fontSize: "20",
              },
            },
            barStyle: {
              fill: "#8282FF",
            },
          },
          {
            data: Object.keys(paidlistArr).map((element) =>
              parseInt(paidlistArr[element].pay_channel_10 / 100)
            ),
            type: "line",
            name: "支付宝支付",
            lineArea: {
              show: true,
              gradient: ["#EAFFF8", "#fffFF8"],
            },
            lineStyle: {
              stroke: "#00DB95",
            },
            emphasis: {
              label: {
                show: false,
                fontSize: "20",
              },
            },
            linePoint: {
              radius: 4,
              style: {
                fill: "#00DB95",
                stroke: "transparent",
              },
            },
          },
          {
            name: "微信支付",
            data: Object.keys(paidlistArr).map((element) =>
              parseInt(paidlistArr[element].pay_channel_11 / 100)
            ),
            type: "line",
            smooth: true,
            lineArea: {
              show: true,
              gradient: ["#FFF8E0", "#FEF8E1"],
            },
            lineStyle: {
              lineDash: [5, 5],
              stroke: "#FFAE38",
            },
            emphasis: {
              label: {
                show: false,
                fontSize: "20",
              },
            },
            linePoint: {
              radius: 4,
              style: {
                fill: "#FFAE38",
              },
            },
          },
          {
            data: Object.keys(paidlistArr).map((element) =>
              parseInt(paidlistArr[element].pay_channel_12 / 100)
            ),
            type: "line",
            name: "苹果支付",
            lineArea: {
              show: true,
              gradient: ["#EAFFF8", "#fffFF8"],
            },
            lineStyle: {
              stroke: "#00DB95",
            },
            emphasis: {
              label: {
                show: false,
                fontSize: "20",
              },
            },
            linePoint: {
              radius: 4,
              style: {
                fill: "#00DB95",
                stroke: "transparent",
              },
            },
          },
        ],
      };
    },
  },
};
</script>

<style lang="less">
@import "../style/data_v";

.block-bottom-content {
  margin-top: 0.8rem;
}

.mc-top {
  width: calc(~"70% - 0.8rem") !important;
  margin-right: 0.8rem;
}
</style>
