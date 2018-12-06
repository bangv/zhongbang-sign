<template>
  <div class="header-top">
    <div class="navbar-brand">
      <img class="navbar-brand-full" src="../assets/logo.png" width="40" height="38" title="众帮互助" alt="众帮互助">
    </div>
    <div class="header-time navbar-nav">众帮互助
    </div>
    <div class="header-content navbar-nav ml-auto">
        <span class="logout" @click="logout">
          <img src="../assets/logout-bg.png" title="安全退出"/>
        </span>
      <span class="logout">
          <img :src="userInfo.ico" title="头像"/>
        </span>
      <span>{{userInfo.displayName}} </span>
    </div>
  </div>
</template>

<script>
  import sessionManagement from "../utils/SessionManagement";
  import axios from "axios";
export default {
  name: "headerTop",
  props: {
    msg: String
  },
  data: function() {
    return {
      userInfo: {},

    };
  },
  methods: {
    //退出
    logout() {
      axios.get(process.env.VUE_APP_HOST + "/user/logout", {})
        .then(res => {
          if (res.data.code === 200) {
            this.$message("退出成功");
            this.$router.push({path: "/login"});
          }
        }),
        err => {
          this.$message("服务器故障，退出失败！");
        };
    }
  },
  mounted() {
    this.userInfo = JSON.parse(sessionManagement.getUserInfo());
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.header-top {
  position: fixed;
  z-index: 1020;
  width: 100%;
  background: rgb(255, 255, 255);
  font-size: 14px;
  border: 0 none;
  color: rgb(36, 40, 47);
  display: -webkit-box !important;
  display: -ms-flexbox !important;
  display: flex !important;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  margin-left: 0 !important;
}

.app-header {
  background: #fff;
  font-size: 14px;
  border: 0 none;
  color: #24282f;
  display: flex !important;
  justify-content: center;
  align-items: center;
  margin-left: 0 !important;
  .navbar-brand {
    width: 66px;
    display: inline-block;
    text-align: right;
    line-height: 76px;
    height: 70px;
  }
  .header-time {
    line-height: 70px;
    height: 70px;
    font-size: 22px;
    display: inline-block;
  }
  .header-content {
    padding-right: 18px;
    & > span {
      font-size: 14px;
      margin-right: 10px;
    }
    .logout {
      text-align: center;
      width: 34px;
      height: 34px;
      border-radius: 50%;
      margin-left: 15px;
      cursor: pointer;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
  }
}
</style>
