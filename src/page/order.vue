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
      <el-table :data="orderArr" border height="100%" class="bottom-left-table">
        <el-table-column prop="publish_date" label="日期" width="140">
        </el-table-column>
        <el-table-column prop="outsidepublicity" label="场外展发布数量">
        </el-table-column>
        <el-table-column prop="insidepublicity" label="场内展发布数量">
        </el-table-column>
        <el-table-column prop="investment" label="招商发布数量">
        </el-table-column>
        <el-table-column prop="street" label="尾货街发布数量">
        </el-table-column>
        <el-table-column prop="count" label="总发布订单数量"> </el-table-column>
      </el-table>

      <div class="block-top-right" style="width: 30%">
        <div class="pie-chart-earth">
          <router-link
            :to="{
              name: 'map',
              params: { type: 'order', data: orderAreaData },
            }"
            ><i class="el-icon-search"></i><span> 地图</span>
          </router-link>
        </div>
        <pie-chart :polar="pie_chart_area" :title="title_pie" />
      </div>
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
      pie_chart_area: {},
      title_pie: "",
      title: "",
      loading: false,
      orderArr: [],
      selectDay: [],
      scroll_board_config: {},
      lines_chart_option: {},
      orderAreaData: [],
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
    this.getOrderWithArea();
  },
  methods: {
    //总订单数，通过区域划分
    getOrderWithArea() {
      if (
        this.$session.get("Analyseknowledge") == null ||
        this.$session.get("Analyseknowledge") == ""
      ) {
        this.$message({
          type: "success",
          message: "缓存过期，请重新登录",
        });
        this.$router.push("/");
        return;
      }
      var ragion = this.$session.get("Analyseknowledge").RegionWithValue;
      web
        .request({ url: "/dailyExhib/getOrderWithArea", method: "post" })
        .then((res) => {
          let areaArr = this.areaOrderProcess(ragion, res);
          this.orderAreaData = areaArr;
          this.setPieValueArea(areaArr);
        });
    },

    //数据处理
    areaOrderProcess(ragion, res) {
      var areaArr = [];
      var newArr = [];
      //首先把枚举id转成中文
      res.data.map((element) => {
        element.map((value) => {
          areaArr.push({
            name: ragion[value._id],
            value: value.value,
          });
        });
      });
      //去重
      var ragionArr = this.unique(areaArr.map((element) => element.name));
      //数据处理
      ragionArr.map((value) => {
        var count = 0;
        areaArr.map((element) => {
          if (element.name == value) {
            count += element.value;
          }
        });
        newArr.push({
          name: value,
          value: count,
        });
      });

      return newArr;
    },

    //去重
    unique(arr) {
      const res = new Map();
      return arr.filter((arr) => !res.has(arr) && res.set(arr, 1));
    },

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
          url: "/dailyExhib/getDataWithTime",
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
      var orderArrType = [];
      web
        .request({
          url: "/dailyExhib/getAllOrder",
          method: "post",
          data: time,
        })
        .then((res) => {
          this.setPieValue(res.data);
        })
        .catch((err) => {
          this.$message({
            type: "error",
            message: err,
          });
        });
    },

    //设置饼图数据
    setPieValue(data) {
      (this.title = "订单类型分布图"),
        (this.pie_chart_option = {
          legend: {
            orient: "vertical",
            left: 10,
            data: ["场外展", "场内展", "招商", "尾货街"],
          },
          tooltip: {
            trigger: "item",
            formatter: "{b} : {c} ({d}%)",
          },
          series: [
            {
              type: "pie",
              data: data,
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
          color: [
            "#FFD644",
            "#8282FE",
            "#78C3FF",
            "#1CB8C1",
            "#67e0e3",
            "#96bfff",
            "#9d96f5",
          ],
        });

      this.loading = false;
    },

    //设置饼图数据
    setPieValueArea(data) {
      (this.title_pie = "总订单区域划分分布图"),
        (this.pie_chart_area = {
          legend: {
            orient: "vertical",
            left: 10,
            data: data.map((element) => element.name),
          },
          tooltip: {
            trigger: "item",
            formatter: "{b} : 总订单数{c} (占比{d}%)",
          },
          series: [
            {
              type: "pie",
              data: data,
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
          color: [
            "#FFD644",
            "#8282FE",
            "#78C3FF",
            "#1CB8C1",
            "#67e0e3",
            "#96bfff",
            "#9d96f5",
          ],
        });

      this.loading = false;
    },

    //表格数据
    setTableData(data) {
      var orderArr = [];
      data.map((element) => {
        var newArr = {
          publish_date: changeData(element.publish_date * 1000),
          outsidepublicity: element.publish_list.outsidepublicity,
          insidepublicity: element.publish_list.insidepublicity,
          investment: element.publish_list.investment,
          street: element.publish_list.street,
          count:
            element.publish_list.outsidepublicity +
            element.publish_list.insidepublicity +
            element.publish_list.investment +
            element.publish_list.street,
        };
        orderArr.push(newArr);
      });
      this.orderArr = orderArr;
    },

    //折线数据
    setLineData(data) {
      var orderArr = [];
      var countArr = [];
      data.map((element) => {
        orderArr.push(element.publish_list);
      });
      data.map((element) => {
        var count =
          element.publish_list.outsidepublicity +
          element.publish_list.insidepublicity +
          element.publish_list.investment +
          element.publish_list.street;
        countArr.push(count);
      });
      this.lines_chart_option = {
        title: {
          text: "订单数量统计", //如“折线图堆叠”
          textStyle: {
            //标题样式设置
            color: "#000000",
            fontSize: "18",
            fontWeight: "bold",
          },
          x: "10px",
        },
        tooltip: {
          trigger: "axis",
        },
        //图例颜色以及图例名称
        color: ["#D3DCFC", "#7878FF", "#FAC600", "#1BB6C0", "#ED5028"],
        legend: {
          data: ["场外展", "场内展", "招商", "尾货街", "订单总数"],
          //图例样式以及位置
          textStyle: {
            color: "#000000",
          },
          x: "center",
          y: "15px",
        },
        xAxis: {
          data: data.map((element) => changeData(element.publish_date * 1000)),
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
          name: "订单数",
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
            name: "订单总数",
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
            data: Object.keys(orderArr).map(
              (element) => orderArr[element].outsidepublicity
            ),
            type: "line",
            name: "场外展",
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
            name: "场内展",
            data: Object.keys(orderArr).map(
              (element) => orderArr[element].insidepublicity
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
            data: Object.keys(orderArr).map(
              (element) => orderArr[element].investment
            ),
            type: "line",
            name: "招商",
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
          ,
          {
            data: Object.keys(orderArr).map(
              (element) => orderArr[element].street
            ),
            type: "line",
            name: "尾货街",
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

<style lang="less" scoped>
@import "../style/data_v";
.block-bottom-content {
  margin-top: 0.8rem;
  padding: 0px;
  width: 100%;
}

.bottom-left-table {
  height: 400px;
  margin-right: 0.8rem;
}

.el-table {
  width: 100%;
  height: 100%;
}

.block-top-right {
  height: 100%;
  // width: calc(~"30% - 0.8rem");
  // margin-left: 0.8rem;
}

.pie-chart-earth {
  background-image: linear-gradient(#ecf6ff, #ced7fc);
  border-radius: 8px;
  margin-right: 10px;
  margin-top: 10px;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 7px;
  padding-right: 7px;
  float: right;
  color: #3190e8;

  i {
    color: #5b71fc;
    font-size: 17px;
  }

  span {
    color: #5b71fc;
    font-size: 17px;
  }
}
</style>
