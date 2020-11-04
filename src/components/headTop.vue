<template>
  <div class="header_container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/manage' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item
        v-for="(item, index) in $route.meta.title"
        :key="index"
        >{{ item }}</el-breadcrumb-item
      >
    </el-breadcrumb>
    <div class="head_img">
      <span> {{ nickName }}</span>
      <el-dropdown @command="handleCommand" menu-align="start">
        <img src="../assets/avator.jpg" class="logo_img" />
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="home">首页</el-dropdown-item>
          <el-dropdown-item command="signout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nickName: "",
    };
  },
  created() {
    this.nickName = this.$store.getters.getNickName;
  },
  mounted() {},
  computed: {},
  methods: {
    async handleCommand(command) {
      if (command == "home") {
        this.$router.push("/manage");
      } else if (command == "signout") {
        this.$message({
          type: "success",
          message: "退出成功",
        });
        this.$router.push("/");
      }
    },
  },
};
</script>

<style scoped>
.header_container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 10px;
  height: 60px;
}

.el-breadcrumb__item {
  float: left;
  font-size: 16px;
  font-weight: bold;
}

.logo_img {
  width: 38px;
  height: 38px;
  border-radius: 50%;
}
.head_img {
  display: flex;
  justify-content: center;
  align-items: center;
}
.head_img span {
  padding-right: 10px;
  color: #000;
}
</style>
