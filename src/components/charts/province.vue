<template>
  <div class="province-page">
    <head-top></head-top>
    <province-chart :options="option" style="width: 100%; height: 100%; color: #4f5e87"/>
  </div>
</template>
<script>
import headTop from "@/components/headTop";
import ECharts from "vue-echarts";
import moment from "moment";
import "echarts/map/js/province/guangdong.js";
import "echarts/map/js/province/anhui.js";
import "echarts/map/js/province/aomen.js";
import "echarts/map/js/province/beijing.js";
import "echarts/map/js/province/chongqing.js";
import "echarts/map/js/province/fujian.js";
import "echarts/map/js/province/gansu.js";
import "echarts/map/js/province/guangxi.js";
import "echarts/map/js/province/guizhou.js";
import "echarts/map/js/province/hainan.js";
import "echarts/map/js/province/hebei.js";
import "echarts/map/js/province/heilongjiang.js";
import "echarts/map/js/province/henan.js";
import "echarts/map/js/province/hubei.js";
import "echarts/map/js/province/hunan.js";
import "echarts/map/js/province/jiangsu.js";
import "echarts/map/js/province/jilin.js";
import "echarts/map/js/province/liaoning.js";
import "echarts/map/js/province/neimenggu.js";
import "echarts/map/js/province/ningxia.js";
import "echarts/map/js/province/qinghai.js";
import "echarts/map/js/province/shandong.js";
import "echarts/map/js/province/shanghai.js";
import "echarts/map/js/province/shanxi.js";
import "echarts/map/js/province/sichuan.js";
import "echarts/map/js/province/taiwan.js";
import "echarts/map/js/province/xianggang.js";
import "echarts/map/js/province/xizang.js";
import "echarts/map/js/province/yunnan.js";
import "echarts/map/js/province/zhejiang.js";
import { getCityArrInProvince } from "../../utils/utils";

export default {
  name: "province_chart",
  data() {
    return {
      option: {},
      time: "",
      title: "",
      toolTip: "",
    };
  },
  components: {
    headTop,
    "province-chart": ECharts,
  },
  mounted() {},
  props: ["type", "name", "data"],
  created() {
    this.time = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    this.init();
  },
  methods: {
    //数据初始化
    init() {
      if (this.data != null && this.name != null) {
        if (
          this.$session.get("knowledge") == null ||
          this.$session.get("knowledge") == ""
        ) {
          this.$message({
            type: "success",
            message: "缓存过期，请重新登录",
          });
          this.$router.push("/");
          return;
        }
        if (this.type == "register") {
          this.title = "注册用户区域分布 " + this.name + "分布";
          this.toolTip = "注册人数";
        } else if (this.type == "order") {
          this.title = "订单区域划分分布图 " + this.name + "分布";
          this.toolTip = "总订单数";
        }
        var region = this.$session.get("knowledge").Region;
        var cityArr = getCityArrInProvince(region, this.name, this.data);
        this.setProvinceData(cityArr);
      } else {
        this.$router.push("/manage");
        return;
      }
    },

    //设置数据并渲染
    setProvinceData(data) {
      this.option = {
        title: {
          text: this.title,
          subtext: "截至" + this.time,
          x: "center",
        },
        tooltip: {
          trigger: "item",
          formatter: "{b} " + this.toolTip + ": {c}",
        },
        dataRange: {
          min: 0,
          x: "left",
          y: "bottom",
          text: ["max", "min"],
          calculable: true,
        },
        toolbox: {
          show: true,
          orient: "vertical",
          x: "right",
          y: "center",
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        roamController: {
          show: true,
          x: "right",
          mapTypeControl: {
            china: true,
          },
        },
        series: [
          {
            type: "map",
            mapType: this.name,
            roam: true,
            itemStyle: {
              normal: { label: { show: true } },
              emphasis: { label: { show: true } },
            },
            data: data,
          },
        ],
      };
    },
  },
};
</script>
<style scoped>
.province-page {
  width: 100%;
  height: 100%;
  color: #fff;
}
</style>