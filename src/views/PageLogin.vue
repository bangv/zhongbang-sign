<template>
  <div class="login_wrap">
    <div class="top-bg"></div>
    <div class="footer-bg"></div>
    <div class="c-bg">
      <div class="hongbao-top">
        <div class="i-bg">
          <div class="i-bg-b">
            <el-form
              :model="systemForm"
              :rules="rules"
              ref="systemForm"
              label-width="100px"
              class="system-form"
            >
              <div class="d-code">
                <el-form-item class="one-item" required prop="account">
                  <el-input
                    v-model="systemForm.account"
                    placeholder="请输入手机号码"
                    auto-complete="off"
                    clearable
                    :maxlength="11"
                  ></el-input>
                </el-form-item>
              </div>
              <div class="d-code">
                <el-form-item required prop="checkCode" class="code-i">
                  <el-input
                    type="text"
                    placeholder="请输入图形码"
                    maxlength="4"
                    v-model="systemForm.checkCode"
                  ></el-input>
                </el-form-item>
                <div class="code-img" @click="changImg();">
                  <img :src="checkCode_url" />
                </div>
              </div>
              <div class="d-code">
                <el-form-item required prop="checkMessage" class="code-i">
                  <el-input
                    type="text"
                    placeholder="请输入验证码"
                    maxlength="6"
                    v-model="systemForm.checkMessage"
                  ></el-input>
                </el-form-item>
                <div class="code-img">
                  <el-button
                    :disabled="!isActive || systemForm.checkCode === ''"
                    @click="sendCode();"
                    >{{ phonecode }}
                  </el-button>
                </div>
              </div>

              <div class="d-code">
                <el-form-item class="one-item" required prop="password">
                  <el-input
                    :type="passType"
                    maxlength="6"
                    placeholder="请输入注册密码"
                    :input="showIcon()"
                    v-model="systemForm.password"
                  >
                    <i
                      slot="suffix"
                      class="el-input__icon"
                      :class="{ 'icon-show': passShow, 'icon-hide': passHide }"
                      @click="showPass(passType);"
                    ></i>
                  </el-input>
                </el-form-item>
              </div>
            </el-form>
            <el-button class="btn-margin" @click="doSign();"
              ><i class="el-icon-loading" v-if="isLogin"></i>注册领红包
            </el-button>
          </div>
        </div>
      </div>
      <div class="hongbao-footer"></div>
      <div class="footer-conter">
        <div class="title-f">
          <span class="r-line-r"></span><span class="c-top">领取细则</span
          ><span class="r-line-l"></span>
        </div>
        <p>1.红包仅限未注册过“众帮互助”的新用户领取</p>
        <p>2. 注册后下载众帮互助APP登录即可领取红包</p>
        <p>3. 每个用户仅限领取一次</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import sessionManagement from "../utils/SessionManagement";

export default {
  data() {
    //      手机号验证
    var validatePhone = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入手机号码"));
        callback(this.notThrow());
        return false;
      } else {
        if (
          !/^((1[3,5,8][0-9])|(14[5,7])|(17[0,1,3,5,6,7,8]))\d{8}$/.test(value)
        ) {
          callback(new Error("号码格式错误"));
          callback(this.notThrow());
          return false;
        }
      }
      callback(this.throw());
    };
    return {
      id: "",
      passType: "password",
      phonecode: "获取验证码",
      passShow: true,
      passHide: true,
      loading: false,
      accountLength: 11,
      passwordLength: 6,
      isActive: false,
      checkCode_url: "",
      //点击登录按钮禁用
      isLogin: false,
      systemForm: {
        account: "",
        checkCode: "",
        checkMessage: "",
        password: ""
      },
      rules: {
        account: [
          {
            required: true,
            validator: validatePhone,
            trigger: ["blur", "change"]
          }
        ],
        checkCode: [
          {
            required: true,
            message: "请输入图形码",
            trigger: ["blur", "change"]
          }
        ],
        checkMessage: [
          {
            required: true,
            message: "请输入验证码",
            trigger: ["blur", "change"]
          }
        ],
        password: [
          {
            required: true,
            message: "请输入注册密码",
            trigger: ["blur", "change"]
          }
        ]
      }
    };
  },
  methods: {
    throw() {
      this.isActive = true;
    },
    //      输入框控制发送验证码按钮置灰
    notThrow() {
      let that = this;
      this.isActive = false;
      clearInterval(that.timer);
      this.phonecode = "发送验证码";
    },
    sendCode() {
      if (!this.systemForm.checkCode) {
        return;
      }
      this.codeSend();
    },
    // 发送验证码
    codeSend() {
      this.isActive = false;
      let num = 180;
      let that = this;
      this.phonecode = " 180 s ";
      that.timer = setInterval(() => {
        num--;
        this.phonecode = num + " s ";
        if (num === 0) {
          clearInterval(that.timer);
          this.phonecode = "发送验证码";
          if (
            !/^((1[3,5,8][0-9])|(14[5,7])|(17[0,1,3,5,6,7,8]))\d{8}$/.test(
              this.forgetForm.phone
            )
          ) {
            this.isActive = false;
          } else {
            this.isActive = true;
          }
        }
      }, 1000);
      this.sendValidCode();
    },
    //发送验证码api
    sendValidCode() {
      let that = this;
      axios
        .post(process.env.VUE_APP_HOST + "/sys/sms/send", {
          mobile: this.systemForm.account,
          purpose: 2,
          verifyCode: this.systemForm.checkCode
        })
        .then(
          res => {
            console.log(res);
            if (res.data.code === 200) {
              this.$message({
                message: "短信已发送",
                center: true
              });
            } else {
              this.$message({
                message: res.data.msg,
                center: true
              });
              this.changImg();
              clearInterval(that.timer);
              this.phonecode = "发送验证码";
              this.isActive = true;
            }
          },
          err => {
            this.changImg();
          }
        );
    },
    changImg() {
      let time = Date.parse(new Date());
      this.checkCode_url =
        "https://www.youchent.com/file/code.jpg?time=" + time;
    },
    // 输入密码时控制眼睛睁闭
    showIcon() {
      if (this.systemForm.password !== "") {
        this.passHide = true;
      } else {
        this.passHide = false;
        this.passShow = false;
      }
    },
    // 控制输入的密码是否为明文
    showPass(pass) {
      if (pass === "password") {
        this.passType = "text";
        this.passShow = true;
      } else {
        this.passType = "password";
        this.passShow = false;
      }
    },
    // 注册
    doSign() {
      if (!this.systemForm.account || this.isLogin) return;
      this.$refs.systemForm.validate(valid => {
        if (valid) {
          this.isLogin = true;
          let param = {};
          if (this.id) {
            param = {
              refenceId: this.id,
              mobile: this.systemForm.account,
              pwd: this.systemForm.password,
              verifyCode: this.systemForm.checkMessage
            };
          } else {
            param = {
              mobile: this.systemForm.account,
              pwd: this.systemForm.password,
              verifyCode: this.systemForm.checkMessage
            };
          }
          axios
            .post(process.env.VUE_APP_HOST + "/user/regist", param)
            .then(res => {
              this.isLogin = false;
              if (res.data.code === 200) {
                this.$message({
                  message: "注册成功",
                  center: true
                });
                window.location.href =
                  "https://sj.qq.com/myapp/detail.htm?apkName=com.youchen.mh";
              } else {
                this.changImg();
                this.$message({
                  message: res.data.msg,
                  center: true
                });
              }
            }),
            err => {
              this.$message("服务器故障，注册失败");
              this.changImg();
              this.isLogin = false;
            };
        } else {
          return false;
        }
      });
    },
    //解析url参数
    getParam(name) {
      var search = document.location.search;
      var pattern = new RegExp("[?&]" + name + "\=([^&]+)", "g");
      var matcher = pattern.exec(search);
      var items = null;
      if (null != matcher) {
        try {
          items = decodeURIComponent(decodeURIComponent(matcher[1]));
        } catch (e) {
          try {
            items = decodeURIComponent(matcher[1]);
          } catch (e) {
            items = matcher[1];
          }
        }
      }
      return items;
    }
  },
  mounted() {
    this.changImg();
    console.log("路由id", window.location.href);
    let href = window.location.href;
    if (href.indexOf("id=") > 0) {
      this.id = this.getParam("id");
    } else {
      this.id = "";
    }
    console.log("路由id", this.id);
  }
};
</script>
<style lang="scss">
::-ms-clear,
::-ms-reveal {
  display: none;
}

.el-form-item.is-success {
  .el-input__inner {
    border-color: #eee;
  }
}

.login_wrap {
  width: 100%;
  height: 100%;
  background: linear-gradient(#f4483c, #fc6044);
  .top-bg {
    width: 100%;
    height: 9.2rem;
    position: absolute;
    top: 0;
    left: 0;
    background: url(../assets/banner_top_1.png) 0 0 no-repeat;
    background-size: 100% 100%;
    z-index: 1;
  }
  .footer-bg {
    width: 100%;
    height: 4rem;
    position: absolute;
    bottom: 0;
    left: 0;
    background: url(../assets/banner_top_2.png) 0 0 no-repeat;
    background-size: 100% 100%;
    z-index: 1;
  }
  .btn-margin {
    width: 94%;
    background: linear-gradient(
      -90deg,
      rgba(253, 84, 41, 1) 0%,
      rgba(253, 122, 68, 1) 100%
    );
    margin: 0 auto;
    display: block;
    color: #fff;
    font-size: 1rem;
    font-weight: bold;
    outline: none;
  }

  .code-i {
    /*margin-right: 10px;*/
  }
  .el-input__prefix,
  .el-input__suffix {
    position: absolute;
    top: 0;
    line-height: 2.2rem;
    -webkit-transition: all 0.3s;
    height: 2.2rem;
    color: rgb(192, 196, 204);
    text-align: center;
  }
  .one-item {
    width: 100%;
    flex: 1;
  }

  .d-code {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    width: 100%;
  }
  .code-img {
    width: 64%;
    height: 2.2rem;
    img,
    button {
      line-height: 2.2rem;
      width: 100%;
      height: 100%;
      border-radius: 4px;
      border: 1px solid rgb(220, 223, 230);
      padding: 0;
      font-size: 0.8rem;
    }
  }

  .c-bg {
    width: 90%;
    position: relative;
    z-index: 2;
    top: 6rem;
    left: 5%;
    background: rgb(255, 255, 255);
    border-radius: 8px;
    padding-top: 2rem;
    padding-bottom: 1rem;
  }
  .system-form {
    padding: 0.8rem;
    padding-bottom: 0;
    margin-bottom: 1.1rem;
  }
  .el-form-item {
    margin-bottom: 0;
  }
  .el-form-item__error {
    padding: 0;
  }
  .hongbao-top {
    width: 86%;
    margin: 0 auto;
    height: 17.6rem;
    position: relative;
    background: url(../assets/hongb-top.png) 0 0 no-repeat;
    background-size: 100% 100%;
  }
  .hongbao-footer {
    width: 86%;
    margin: 0 auto;
    position: relative;
    background: url(../assets/hongb-footer.png) 0 0 no-repeat;
    background-size: 100% 100%;
    height: 3rem;
    z-index: 3;
    margin-top: -0.3rem;
  }
  .i-bg {
    width: 90%;
    background: rgb(255, 239, 224);
    position: absolute;
    border-radius: 7px;
    height: 21rem;
    left: 5%;
    top: -1rem;
    z-index: 3;
  }
  .i-bg-b {
    width: 92%;
    border: 2px solid #dbb985;
    position: absolute;
    left: 4%;
    top: 0.8rem;
    bottom: 0;
    z-index: 3;
  }
  .el-form-item__content {
    margin-left: 0 !important;
  }
  .el-input__inner {
    height: 2.2rem;
    line-height: 2.2rem;
    padding-left: 8px;
    padding-right: 2px;
    font-size: 0.8rem;
  }
  .footer-conter > p {
    margin: 0;
    padding: 0;
    font-size: 0.6rem;
    line-height: 1.2rem;
    padding-left: 1.8rem;
  }
  .title-f {
    text-align: center;
  }
  .title-f > span {
    display: inline-block;
  }
  .r-line-l {
    width: 1.5rem;
    height: 2px;
    margin-bottom: 0.3rem;
    background: linear-gradient(
      90deg,
      rgba(255, 67, 35, 1) 0%,
      rgba(255, 67, 35, 0.2) 100%
    );
  }
  .r-line-r {
    width: 1.4rem;
    height: 2px;
    margin-bottom: 0.3rem;
    background: linear-gradient(
      90deg,
      rgba(255, 67, 35, 0.2) 0%,
      rgba(255, 67, 35, 1) 100%
    );
  }
  .c-top {
    color: #ff4323;
    font-size: 1rem;
    padding: 0 0.3rem;
  }
  .icon-hide {
    display: inline-block;
    width: 20px;
    height: 20px;
    background: url(../assets/hide.png) 0 0 no-repeat;
    background-size: 100% 100%;
    vertical-align: middle;
  }
  .icon-show {
    display: inline-block;
    width: 20px;
    height: 20px;
    background: url(../assets/show.png) 0 0 no-repeat;
    background-size: 100% 100%;
    vertical-align: middle;
  }
}
</style>
