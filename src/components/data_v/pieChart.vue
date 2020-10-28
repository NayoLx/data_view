<template>
<v-chart :options="polar"/>
</template>

<style>
.echarts {
  width: 100%;
  height: 100%;
}
</style>

<script>
import ECharts from 'vue-echarts'

export default {
  components: {
    'v-chart': ECharts
  },
  data () {
    return {
    }
  },
  props: ["polar"]
}
</script>
