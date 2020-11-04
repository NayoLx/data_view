<template>
  <div class="data_rose_page">
    <head-top></head-top>
    <map-echarts
      :options="option"
      style="width: 100%; height: 100%; color: #4f5e87"
      id="mapEchart" @click="onToCity"
    />
  </div>
</template>

<script>
import headTop from "@/components/headTop";
import ECharts from "vue-echarts";
import moment from "moment";
import { getCityToProvince, geyCityName } from "../utils/utils";
import "echarts/map/js/china.js"; //引入中国地图

export default {
  name: "map_chart",
  data() {
    return {
      option: {},
      title: "",
      toolTip: "",
      time: "",
    };
  },
  components: {
    headTop,
    "map-echarts": ECharts,
  },
  props: ["type", "data"],
  created() {
    this.time = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    this.init();
  },
  methods: {
    //点击城市
    onToCity(params) {
      console.log(params.name);
      this.$router.push({name: 'province', params: {type: this.type, name: params.name, data: this.data}});
    },

    //初始化
    init() {
      if (this.data != null) {
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
        var region = this.$session.get("knowledge").Region;

        var pie = [];
        this.data.map((element) => {
          pie.push({
            name: getCityToProvince(region, element.name),
            value: element.value,
          });
        });
        if (this.type == "register") {
          this.title = "注册用户区域分布";
          this.toolTip = "注册人数";
        } else if (this.type == "order") {
          this.title = "总订单区域划分分布图";
          this.toolTip = "总订单数";
        }

        this.mapEchartsInit(pie);
      } else {
        this.$router.push("/manage");
        return;
      }
    },

    //地图数据赋值
    mapEchartsInit(data) {
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
            mapType: "china",
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
.data_rose_page {
  width: 100%;
  height: 100%;
  color: #fff;
}

.block-top-content {
  height: 55%;
  width: 100%;
  display: flex;
  flex-grow: 0;
  box-sizing: border-box;
  padding-bottom: 20px;
}
</style>
