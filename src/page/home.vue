<template>
  <div class="home" id="data-view" v-loading="loading">
    <head-top style="padding-left: 30px"></head-top>
    <section class="data_section">
      <header class="section_title">数据统计</header>
      <div class="top-container">
        <div class="top-left">
          <div class="top-left-top">
            <div class="top-table">
              <el-row class="table-row-one">
                <el-col :span="8"
                  ><div class="data_list today_head table-col-one">
                    <span class="data_num head">#</span>
                  </div></el-col
                >
                <el-col :span="8"
                  ><div class="data_list">注册用户数</div></el-col
                >
                <el-col :span="8"><div class="data_list">订单数</div></el-col>
              </el-row>
              <el-row class="table-row-two">
                <el-col :span="8"
                  ><div class="data_list today_head table-col-one">
                    <span class="data_num head">当日数据</span>
                  </div></el-col
                >
                <el-col :span="8"
                  ><div class="data_list">
                    {{ userCount }}
                  </div></el-col
                >
                <el-col :span="8"
                  ><div class="data_list">
                    {{ orderCount }}
                  </div></el-col
                >
              </el-row>
              <el-row class="table-row-three">
                <el-col :span="8"
                  ><div class="data_list today_head table-col-one">
                    <span class="data_num head">总数据</span>
                  </div></el-col
                >
                <el-col :span="8"
                  ><div class="data_list">
                    {{ allUserCount }}
                  </div></el-col
                >
                <el-col :span="8"
                  ><div class="data_list">
                    {{ allOrderCount }}
                  </div></el-col
                >
              </el-row>
            </div>
          </div>
          <div class="top-pie-chart" id="pie-chart">
            <div class="top-pie-chart-title">
              <div class="pie-chart-title">{{ pie_title }}</div>
              <div class="pie-chart-earth">
                <router-link
                  :to="{
                    name: 'map',
                    params: { type: 'register', data: area_data },
                  }"
                  ><i class="el-icon-search"></i><span> 地图</span>
                </router-link>
              </div>
            </div>
            <p-chart :options="pie_chart_option" ref="pie_chart_home" />
          </div>
        </div>
        <div class="top-right">
          <div class="mc-top-select">
            <button class="mc-top-select-btn1" @click="getWeekData()">
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
          <line-chart
            :option="option"
            :top_right_title="title"
            class="line-chart-div"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import headTop from "@/components/headTop";
import lineChart from "@/components/charts/lineChart";
import timeHelper from "../utils/time_helper";
import ECharts from "vue-echarts";
import web from "../config/web";

export default {
  data() {
    return {
      userCount: 0,
      orderCount: 0,
      allUserCount: 0,
      allOrderCount: 0,
      option: {},
      loading: true,
      selectDay: [],
      title: "",
      pie_title: "",
      area_data: [],
      pie_chart_option: {},
    };
  },
  components: {
    headTop,
    lineChart,
    "p-chart": ECharts,
  },
  created() {
    this.getUserData();
    this.getWeekData();
    this.getOrderData();
    this.getDataWithTime();
  },
  computed: {},
  mounted() {
    window.addEventListener("resize", this.resizeTheChart);
  },
  methods: {
    //自适应方法
    resizeTheChart() {
      if (this.$refs.pie_chart_home) {
        this.$refs.pie_chart_home.resize();
      }
    },
    //获取近七天的数据
    getWeekData() {
      var endTime = timeHelper.getTodayAt0() + 86399;
      var startTime = timeHelper.getTodayAt0() - 604800;
      var time = {
        startTime: startTime,
        endTime: endTime,
      };
      this.getUserWithTime(time);
    },

    //获取本月数据
    getThisMouthData() {
      var timeArr = timeHelper.getMouthArrTimeStamp();
      if (timeArr.length !== 0 && timeArr != null) {
        var time = {
          startTime: timeArr[0],
          endTime: timeArr[1],
        };
        this.getUserWithTime(time);
      } else {
        this.showMessage("error", "无效时间，请重新选择");
      }
    },

    //获取本年的数据
    getThisYearData() {
      var timeArr = timeHelper.getYearArrTimeStamp();
      if (timeArr.length !== 0 && timeArr != null) {
        var time = {
          startTime: timeArr[0],
          endTime: timeArr[1],
        };
        this.getUserWithTime(time);
      } else {
        this.showMessage("error", "无效时间，请重新选择");
      }
    },

    //获取某一时间段的数据
    getTimeArrData() {
      if (this.selectDay != null && this.selectDay.length !== 0) {
        var timeArr = timeHelper.getTimeArrTimeStamp(this.selectDay);
        if (timeArr.length !== 0 && timeArr != null) {
          var time = {
            startTime: timeArr[0],
            endTime: timeArr[1],
          };
          this.getUserWithTime(time);
          return;
        }
      }
      this.showMessage("error", "无效时间，请重新选择");
    },

    //当日注册 总注册人数统计
    getUserData() {
      web
        .request({
          url: "/user/getAllUser",
          method: "post",
          data: {
            startTime: timeHelper.getTodayAt0(),
            endTime: timeHelper.getTodayAt0() + 86400,
          },
        })
        .then((res) => {
          if (res.data.length !== 0 && res.data != null) {
            this.userCount = res.data[0].value;
          }
        })
        .catch((err) => {
          this.showMessage("error", err);
        });

      //获取总的注册用户数据
      web
        .request({
          url: "/user/getUserAtCount",
          method: "get",
        })
        .then((res) => {
          if (res.data.length !== 0 && res.data != null) {
            this.allUserCount = res.data[0].value;
          }
        })
        .catch((err) => {
          this.showMessage("error", err);
        });
    },

    //提示弹窗
    showMessage(type, err) {
      this.loading = false;
      this.$message({
        type: type,
        message: err,
        showClose: true,
      });
    },

    //当日订单
    getOrderData() {
      //获取总的订单数
      web
        .request({
          url: "/dailyExhib/getOrderAtCount",
          method: "post",
        })
        .then((res) => {
          this.allOrderCount = res.data;
        })
        .catch((err) => {
          this.showMessage("error", err);
        });

      //获取当日订单数
      web
        .request({
          url: "/dailyExhib/getAllOrder",
          method: "post",
          data: {
            startTime: timeHelper.getTodayAt0(),
            endTime: timeHelper.getTodayAt0() + 86400,
          },
        })
        .then((res) => {
          res.data.map((element) => (this.orderCount += element.value));
        })
        .catch((err) => {
          this.showMessage("error", err);
        });
    },

    //按地域划分获取注册人数
    getDataWithTime() {
      if (
        this.$session.get("Analyseknowledge") == null ||
        this.$session.get("Analyseknowledge") == ""
      ) {
        this.showMessage("success", "缓存过期，请重新登录");
        this.$router.push("/");
        return;
      }
      var ragion = this.$session.get("Analyseknowledge").RegionWithValue;

      web
        .request({
          url: "/user/getGroundUser",
          method: "get",
        })
        .then((res) => {
          var pie_data = [];
          res.data.map((element) => {
            pie_data.push({
              name: ragion[element._id],
              value: element.value,
            });
          });
          this.area_data = pie_data;
          this.setPieData(pie_data);
        })
        .catch((err) => {
          this.showMessage("error", err);
        });
    },

    //设置饼图数据
    setPieData(data) {
      this.loading = false;
      this.pie_title = "地域划分注册用户";
      this.pie_chart_option = {
        legend: {
          orient: "vertical",
          left: 10,
          data: data.map((element) => element.name),
        },
        tooltip: {
          trigger: "item",
          formatter: "{b} : {c}人 ({d}%)",
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
          "#C5DA47",
          "#6BC28B",
          "#58AFE2",
          "#988FC4",
          "#CE8ABC",
          "#F26466",
          "#F89B35",
          "#FDE520",
          "#7FB31B",
          "#3D9655",
          "#356C9C",
          "#5B5199",
          "#A54068",
          "#CE1C1D",
          "#F45116",
          "#DDB119",
        ],
      };
    },

    //获取日结表
    getUserWithTime(time) {
      this.$axios
        .post("/user/getUserWithTime", time)
        .then((res) => {
          this.setLinesData(res.data);
        })
        .catch((err) => {
          this.showMessage("error", err);
        });
    },

    //设置折线表
    setLinesData(data) {
      this.title = "用户累计统计";
      var conutArr = [];
      data.map((element) => {
        conutArr.push(element.people_count);
      });
      this.option = {
        title: {
          text: "新注册人数统计",
          textStyle: {
            //标题样式设置
            color: "#000000",
            fontSize: "20",
            fontWeight: "600",
          },
          x: "10px",
        },
        tooltip: {
          trigger: "axis",
        },
        toolbox: {
          show: true,
          feature: {
            magicType: {
              type: ["bar", "line"],
            }, //切换为柱状图，切换为折线图，
            saveAsImage: {}, //保存为图片
          },
        },
        //图例颜色以及图例名称
        color: ["#8F8FFF"],
        legend: {
          data: ["新注册人数"],
          //图例样式以及位置
          textStyle: {
            color: "#000000",
          },
          x: "center",
          y: "15px",
        },
        xAxis: {
          data: data.map((element) =>
            timeHelper.changeData(element.updatetime * 1000)
          ),
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
          name: "人数",
          nameLocation: "end",
          splitLine: {
            show: false,
          },
          interval: 5,
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
            name: "新注册人数",
            data: conutArr,
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
            itemStyle: {
              //柱形图圆角，鼠标移上去效果
              emphasis: {
                barBorderRadius: [20, 20, 4, 4],
              },
              normal: {
                //柱形图圆角，初始化效果
                barBorderRadius: [10, 10, 4, 4],
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
#data-view {
  width: 100%;
  height: 100%;
  float: right;
  color: #000;
  background-color: #fbfbfb;

  .data_section {
    height: 100%;
  }

  .section_title {
    text-align: left;
    padding-left: 30px;
    padding-bottom: 20px;
    font-size: 30px;
  }

  .chart-name {
    height: 0px;
  }

  .top-container {
    display: flex;
    width: calc(~"100% - 1.6rem");
    height: 66%;
    margin-left: 0.8rem;
    margin-right: 0.8rem;
  }

  .top-left {
    width: 45%;
    height: 100%;
    border-radius: 10px;
  }

  .top-left-top {
    width: 100%;
    height: 154px;
    padding-top: 10px;
    background-color: #fff;
    border-radius: 10px;
    margin-bottom: 10px;
  }

  .top-table {
    width: calc(~"100% - 20px");
    border-radius: 5px;
    background-color: #fbfbfb;
    border: 1px solid #e1e8fe;
    margin-left: 10px;
    margin-right: 10px;
  }

  .top-pie-chart {
    height: calc(~"100% - 174px");
  }

  .top-pie-chart-title {
    padding-top: 10px;
    padding-left: 20px;
    display: flex;
    align-items: center;
  }

  .pie-chart-title {
    float: left;
    flex: 1;
  }

  .pie-chart-earth {
    background-image: linear-gradient(#ecf6ff, #ced7fc);
    border-radius: 8px;
    margin-right: 20px;
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

  .top-right {
    margin-left: 0.8rem;
    width: calc(~"55% - 0.8rem");
    height: 100%;
    background-color: #ffffff;
    border-radius: 10px;
  }

  .mc-top-select {
    margin-top: 15px;
    margin-bottom: 40px;
  }

  .line-chart-div {
    width: calc(~"100% - 10px");
    height: calc(~"100% - 115px");
    margin-right: 10px;
  }

  .el-row {
    width: 100%;
    // padding: 13px;
  }

  .table-col-one {
    padding-left: 10px;
    width: 100%;
    color: #2d3c8e;
    font-size: 15px;
    font-weight: 500;
  }

  .table-row-one {
    padding-top: 14px;
    height: 46px;
    background-image: linear-gradient(#ecf6ff, #ced7fc);
    color: #5e5f7d;
    font-size: 16px;
    font-weight: 600;
  }
  .table-row-two {
    padding-top: 12px;
    height: 44px;
    background-color: #fff;
  }
  .table-row-three {
    padding-top: 12px;
    height: 44px;
  }

  .data_num {
    text-align: center;
  }
}
</style>
