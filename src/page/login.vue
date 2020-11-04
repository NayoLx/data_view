<template>
  <div class="login fillcontain">
    <transition name="form-fade" mode="in-out">
      <div class="center_container">
        <section class="form_contianer">
          <div class="manage_tip">
            <p>管理系统</p>
          </div>
          <el-form ref="loginForm" :model="user" :rules="rules">
            <el-form-item prop="name">
              <el-input
                type="text"
                v-model="user.name"
                placeholder="用户名"
              ></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                type="password"
                v-model="user.password"
                placeholder="密码"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="login()" class="submit_btn"
                >登陆</el-button
              >
            </el-form-item>
          </el-form>
        </section>
      </div>
    </transition>
  </div>
</template>

<script>
import {getKnowLedge, getAnalyseKnowLedge} from '../utils/utils'

export default {
  name: "login",
  data() {
    return {
      user: {},
      rules: {
        name: [{ required: true, message: "用户名不能为空", trigger: "blur" }],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
        ],
      },
      verification: "",
      waitTime: "",
    };
  },
  methods: {
    login() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.$session.set('knowledge', getKnowLedge());
          this.$session.set('Analyseknowledge', getAnalyseKnowLedge());
          this.$store.dispatch('login', {id: '123', nickName: '123'});
          this.$router.push("manage");
        } else {
          this.showMessage("error", "登录失败，请检查账号密码");
        }
      });
    },

    ///获取验证码
    getVerification() {
      this.waitTime = 10;
      this.setTime();
    },

    ///设置定时器
    setTime() {
      let clock = window.setInterval(() => {
        this.waitTime--;
        if (this.waitTime <= 0) {
          //当倒计时小于0时清除定时器
          window.clearInterval(clock);
        }
      }, 1000);
    },

    //vue弹窗提示
    showMessage(type, err = "登录失败，请检查账号密码") {
      this.$message({
        type: type,
        message: err,
        showClose: true,
      });
    },
  },
};
</script>

<style lang="less" scoped>
@import "../style/mixin";

.center_container{
  width: 370px;
  height: auto;
  border-radius: 20px;
  background-color: #fff;
  box-shadow: 5px 5px 5px #aaaaaa;
  display: -webkit-flex;
  display: flex;
  -webkit-align-items: center;
  align-items: center;
  -webkit-justify-content: center;
  justify-content: center;
}

.login {
  // display: flex;
  justify-content: center;
  align-items: center;
}
.fillcontain {
  display: flex;
  justify-content: center;
  align-items: center;
  background: url(../assets/background.jpg);
  background-size: cover;
}
.manage_tip {
  padding-top: 30px;
  padding-bottom: 40px;
  width: 100%;
  display: -webkit-flex;
  display: flex;
  -webkit-align-items: center;
  align-items: center;
  -webkit-justify-content: center;
  justify-content: center;
  p {
    font-size: 31px;
    color: #333;
  }
}

.form_contianer {
  padding-left: 30px;
  padding-right: 30px;
  width: 100%;
  border-radius: 7px;
  text-align: center;
  background-color: #fff;
  .submit_btn {
    border-radius: 30px;
    margin-top: 15px;
    width: 100%;
    height: 50px;
    font-size: 19px;
    background-image: linear-gradient(#c1d6ea, #8798a9);
    border: 1px solid #fff;
    background-color: transparent;
    letter-spacing: 2px;
  }

}

.form-fade-enter-active,
.form-fade-leave-active {
  transition: all 1s;
}
.form-fade-enter,
.form-fade-leave-active {
  transform: translate3d(0, -50px, 0);
  opacity: 0;
}
</style>
