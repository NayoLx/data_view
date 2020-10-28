<template>
  <div id="rose-chart">
    <div class="rose-chart-title">累计收入地域分布</div>
    <dv-charts :option="option" />
  </div>
</template>

<script>
export default {
  name: 'RoseChart',
  data () {
    return {
      option: {}
    }
  },
  methods: {
    createData () {
      const { randomExtend } = this

      this.option = {
        series: [
          {
            type: 'pie',
            radius: '50%',
            roseSort: false,
            data: [
              { name: '广州', value: randomExtend(40, 70) },
              { name: '深圳', value: randomExtend(20, 30) },
              { name: '北京', value: randomExtend(10, 50) },
              { name: '上海', value: randomExtend(5, 20) },
              { name: '香港', value: randomExtend(40, 50) },
              { name: '澳门', value: randomExtend(20, 30) },
              { name: '重庆', value: randomExtend(5, 10) },
              { name: '成都', value: randomExtend(20, 35) },
              { name: '天津', value: randomExtend(5, 10) }
            ],
            insideLabel: {
              show: false
            },
            outsideLabel: {
              formatter: '{name} {percent}%',
              labelLineEndLength: 20,
              style: {
                fill: '#000'
              },
              labelLineStyle: {
                stroke: '#000'
              }
            },
            roseType: true
          }
        ],
        color: ['#da2f00', '#fa3600', '#ff4411', '#ff724c', '#541200', '#801b00', '#a02200', '#5d1400', '#b72700']
      }
    },
    randomExtend (minNum, maxNum) {
      if (arguments.length === 1) {
        return parseInt(Math.random() * minNum + 1, 10)
      } else {
        return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10)
      }
    }
  },
  mounted () {
    const { createData } = this

    createData()

    setInterval(createData, 30000)
  }
}
</script>

<style lang="less">
#rose-chart {
  width: 30%;
  height: 100%;
  color: #000;
  box-sizing: border-box;

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
