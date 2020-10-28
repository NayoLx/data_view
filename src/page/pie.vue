<template>
  <div class="data_rose_page">
    <head-top></head-top>

    <div class="block-top-content">
      <rose-chart />
    </div>
  </div>
</template>

<script>
import headTop from "@/components/headTop";
import roseChart from "@/components/data_v/roseChart";

export default {
  data() {
    return {};
  },
  components: {
    headTop,
    roseChart,
  },
};
</script>

<style>
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