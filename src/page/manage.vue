<template>
  <div class="manage fillcontain">
    <el-row style="height: 100%">
      <el-col
        :span="4"
        style="min-height: 100%; background-color: #324057; min-width: 80px"
      >
        <el-menu
          :default-active="defaultActive"
          style="min-height: 100%"
          background-color="#324057"
          text-color="#fff"
          unique-opened
          router
        >
          <el-menu-item index="/manage"
            ><i class="el-icon-menu"></i>首页</el-menu-item
          >
          <el-submenu index="2">
            <template slot="title"
              ><i class="el-icon-document"></i>数据管理</template
            >
            <el-menu-item index="/dataVPage">财务分析</el-menu-item>
            <el-menu-item index="/order">订单分析</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-col>
      <el-col :span="20" style="height: 100%; overflow-y: auto">
        <keep-alive v-if="$route.meta.keepAlive">
          <router-view></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  computed: {
    defaultActive: function () {
      return this.$route.path.replace("", "");
    },
  },
};
</script>


<style lang="less" scoped>
@import "../style/mixin";
.el-menu {
  color: #fff;
}

.el-submenu .el-menu-item {
  height: 50px;
  line-height: 50px;
  min-width: 140px;
}
</style>
