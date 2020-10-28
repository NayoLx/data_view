<template>
  <div id="scroll-board">
    <dv-scroll-board
      :config="config" ref="scroll_board"
      style="
        width: 100%;
        height: 100%;
        font-size: 30em;
        color: #4f5e87;
      "
    />
  </div>
</template>

<script>
export default {
  name: "ScrollBoard",
  data() {
    return {};
  },
  mounted() {
    window.addEventListener("resize", this.resizeTheChart);
  },
  methods: {
    resizeTheChart() {
      if (this.$refs.scroll_board) {
        this.$refs.scroll_board.resize();
      }
    },
  },
  props: ["config"],
};
</script>

<style>
#scroll-board {
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;
  background-color: #ffffff;
  padding: 20px;
}

.dv-scroll-board {
  border: 2px solid #5368c6;
}

.header {
  color: #ffffff;
  font-weight: 700;
  font-size: 156rem;
  border-bottom: 1px solid #5368c6;
}

.ceil {
  color: #3c3f52;
  font-size: 1em;
}

i {
  font-size: 0.5em;
  color: #ffffff;
}

.ceil:nth-child(1) {
  color: #ffffff;
  font-size: 1.1em;
  width: 25%;
}
.span {
  background-color: #ffffff;
}
</style>
