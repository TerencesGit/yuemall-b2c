<template>
  <div>
      <div class="dMain-container">
            <div class="login-register" v-bind:style="{background: 'url('+bgImg+') no-repeat center bottom'}">
                <div class="login-register-box container clearfix2">
                    <!-- 账户注册 -->
                    <div class="fr login-register-container">
                            <h3 class="loginP-title">账户注册</h3>
                            <ul class="loginP-main">
                                <li class="clearfix2 loginP-nameBox">
                                    <p class="fl">手机号</p>
                                    <input class="fr loginP-name" type="text" placeholder="请输入注册的手机号" v-model="telephone" @blur="telephoneValidate">
                                    <span class="loginP-errorInfo">{{telephoneErrorInfo}}</span>
                                </li>
                                <li class="clearfix2 loginP-nameBox">
                                    <p class="fl">密　码</p>
                                    <input class="loginP-name" type="password" placeholder="请输入密码" v-model="password" @blur="passwordValidate">
                                    <span class="loginP-errorInfo">{{passwordErrorInfo}}</span>
                                </li>
                                
                                <li class="clearfix2 loginP-nameBox">
                                    <p class="fl">验证码</p>
                                        <input type="text" class="fl code-input" value="" placeholder="请输入验证码" v-model="codeInput1"  @blur="codeInput1Validate">
                                        <input type="text" readonly="readonly" class="code_readOnly fl" v-model="randomCode" @click="randomCodeFn">
                                        <span class="loginP-errorInfo">{{codeInput1ErrorInfo}}</span>
                                </li>
                                <li class="clearfix2 loginP-nameBox" style="position: relative;">
                                    <p class="fl">动态码</p>
                                    <input type="text" class="fl code-input" value="" placeholder="动态密码" v-model="codeInput2" @blur="codeInput2Validate">
                                    <input type="text" readonly="readonly" class="code_readOnly fl" placeholder="点击发送" v-model="sendCode">
                                    <div class="mengCeng hide cursor" style="width:101px;height:36px;position: absolute;z-index: 2;top:0;right:0;" @click="dynamicVerificationCode()"></div>
                                    <span class="loginP-errorInfo">{{codeInput2ErrorInfo}}</span>
                                </li>
                                <li class="clearfix2 loginP-help">
                                    <div data-i="1" class="fl iconJ iAgree" :class="isAgree ? 'iconXz' : 'iconWxz'" @click="isAgree = !isAgree"></div>
                                    <p class="fl" style="margin-right:0;">我已同意服务协议
                                        <prototype></prototype>
                                    </p>
                                </li>
                                <li class="loginP-go clearfix2">
                                    <a class="fr blue" href="javascript:void(0)" @click="login1">同意协议并注册</a>
                                </li>
                                <!-- <li class="loginP-go clearfix2">
                                    <a class="fr" href="javascript:void(0)" @click="login2">使用邮箱注册</a>
                                </li> -->

                                <li class="clearfix2 loginP-nameBox loginP-last">
                                <span class="loginP-span">已有账号？<router-link to="/login">立即登录</router-link></span>
                                </li>
                            </ul>
                    </div>
                    <!-- 邮箱注册 -->
                    <!-- <div class="fr login-register-container" v-else>
                        <div class="loginP-title">邮箱注册</div>
                            <ul class="loginP-main" style="border-bottom: none;padding-bottom: 20px;">
                                <li class="clearfix2 loginP-nameBox">
                                    <p class="fl">邮箱</p>
                                    <input class="loginP-name J_inputFocus" type="text" placeholder="请输入邮箱" v-model="email" @blur="emailValidate">
                                    <span class="loginP-errorInfo">{{emailErrorInfo}}</span>
                                </li>
                                <li class="clearfix2 loginP-nameBox">
                                    <p class="fl">密　码</p>
                                    <input class="loginP-name" type="password" placeholder="请输入密码" v-model="password" @blur="passwordValidate">
                                    <span class="loginP-errorInfo">{{passwordErrorInfo}}</span>
                                </li>
                                <li class="clearfix2 loginP-nameBox">
                                    <p class="fl">验证码</p>
                                    <input type="text" class="fl code-input" value="" placeholder="请输入验证码" v-model="codeInput1"  @blur="codeInput1Validate">
                                    <input type="text" readonly="readonly" class="code_readOnly fl" v-model="randomCode" @click="randomCodeFn">
                                    <span class="loginP-errorInfo">{{codeInput1ErrorInfo}}</span>
                                </li>
                                <li class="clearfix2 loginP-help">
                                    <div data-i="1" class="fl iconJ iAgree" :class="isAgree ? 'iconXz' : 'iconWxz'" @click="isAgree = !isAgree"></div>
                                    <p class="fl">我已同意服务协议</p>
                                </li>
                                <li class="loginP-go clearfix2" style="width:290px;">
                                    <a class="fr blue" href="javascript:void(0)" style="width:290px;">同意协议并注册</a>
                                </li>
                                <li class="loginP-go clearfix2" style="width:290px;">
                                    <a class="fr" href="javascript:void(0)" @click="isEmailRegister = !isEmailRegister">使用手机注册</a>
                                </li>
                            </ul>
                        </div>
                    </div> -->
                </div>
            </div>
      </div>


    
  </div>
</template>

<script>
import { memberCreate, sendSmsCode, memberLogin } from "@/api";
import prototype from "./prototype.vue";
export default {
  data() {
    return {
      storeId: '',
      isChangeLoginType: true,
      isAgree: true,
      username: "",
      password: "",
      telephone: "",
      codeInput1: "",
      codeInput2: "",
      telephone: "",
      randomCode: "",
      sendCode: "",
      count: "",
      timer: null,
      telephoneErrorInfo: "",
      passwordErrorInfo: "",
      codeInput1ErrorInfo: "",
      codeInput2ErrorInfo: "",
      isEmailRegister: true,
      email: "",
      emailErrorInfo: "",
      bgImg: 'http://pai.yueshijue.com/assets/img/img/background.png'
    };
  },
  created() {
    this.randomCodeFn();
  },
  methods: {
    getCreate() {
      let data = {
        username: this.telephone,
        password: this.password,
        registerType: "1",
        storeId: sessionStorage.getItem("providerId"),
        code: this.codeInput2
      };
      memberCreate(data).then(res => {
        if (res.status == 1) {
          this.$message("注册成功");
          let data1 = {
            username: this.telephone,
            loginType: "1",
            password: this.password,
            storeId: sessionStorage.getItem("providerId"),
            autoLogin: "1"
          };
          memberLogin(data1).then(res => {
            console.log(res);
            if (res.data.status == 1) {
              this.$message.success("登录成功");
              this.$router.push("/index");
            } else {  
              this.$message.error(res.data.msg)
            }
          });
        } else {
          this.$message(res.data.msg);
          console.log(res);
        }
      });
    },
    randomCodeFn() {
      this.randomCode = "";
      var codeLength = 4;
      var random = new Array(
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z"
      );
      for (var i = 0; i < codeLength; i++) {
        var index = Math.floor(Math.random() * 36);
        this.randomCode += random[index];
      }
    },
    normalLogin() {
      this.isChangeLoginType = false;
    },
    telLogin() {
      this.isChangeLoginType = true;
    },
    login1() {
      this.isAgree = true;
      this.telephoneValidate();
      this.passwordValidate();
      this.codeInput1Validate();
      this.codeInput2Validate();
      if (!(this.codeInput1.toUpperCase() == this.randomCode)) return false

      if (
        this.telephone == "" ||
        this.password == "" ||
        this.codeInput1 == "" ||
        this.codeInput2 == ""
      ) {
        return false;
      }
      this.getCreate();
    },
    // login2() {
    //     this.isEmailRegister = !this.isEmailRegister;
    // },
    telephoneValidate() {
      if (this.telephone.trim().length == "")
        return (this.telephoneErrorInfo = "手机号码不能为空");
      var telephoneReg = /^1[3|4|5|7|8][0-9]\d{8}$/;
      if (!telephoneReg.test(this.telephone))
        return (this.telephoneErrorInfo = "请输入正确的手机格式");
      this.telephoneErrorInfo = "";
    },
    passwordValidate() {
      if (this.password.trim().length == "")
        return (this.passwordErrorInfo = "密码不能为空");
      var passwordReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/;
      if (!passwordReg.test(this.password))
        return (this.passwordErrorInfo = "输入包含字母和数字的6-12位密码");
      this.passwordErrorInfo = "";
    },
    codeInput1Validate() {
        if (this.codeInput1.trim().length == "")
            return (this.codeInput1ErrorInfo = "验证码不能为空");
        if (!(this.codeInput1.toUpperCase() == this.randomCode.toUpperCase())) 
        return (this.codeInput1ErrorInfo = '验证码输入错误')
        this.codeInput1ErrorInfo = "";
    },
    codeInput2Validate() {
      if (this.codeInput2.trim().length == "")
        return (this.codeInput2ErrorInfo = "动态码不能为空");
      this.codeInput2ErrorInfo = "";
    },
    timerFn() {
        clearInterval(this.timer)
        this.timer = null;
        const TIME_COUNT = 60;
        if (!this.timer) {
          this.count = TIME_COUNT;
          // this.show = false;
          this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
              this.count--;
          } else {
              this.show = true;
              clearInterval(this.timer);
              this.timer = null;
          }
          // console.log(this.count)
              this.sendCode = this.count + 's'
              if(this.count == 0){
                  this.sendCode = '点击发送'
              }
          }, 1000)
        }
    },
    dynamicVerificationCode() {
        this.telephoneValidate();
      let data = {
        phone: this.telephone
      };
      sendSmsCode(data).then(res => {
        if (res.data.status == 1) {
          this.$message("验证码发送成功");
          this.timerFn()
        } else {
          this.$message(res.data.msg);
          return false
        }
      });
    },
    emailValidate() {
      if (this.email.trim().length == "")
        return (this.emailErrorInfo = "邮箱不能为空");
      var emailReg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/; //邮箱
      if (!emailReg.test(this.email)) return (this.emailErrorInfo = "邮箱格式不对");
      this.emailErrorInfo = "";
    },
    prototype() {
         this.$alert('<strong>这是 <i>HTML</i> 片段</strong>', 'HTML 片段', {
          dangerouslyUseHTMLString: true
        });
    },
    randomColor(){
        var color = "rgb(" + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + ")";
        return color;
    }
  },
  components: {
    prototype
  }
};
</script>

<style lang="scss" scoped>
.dMain-container {
    position: relative;
  .login-register {
    .login-register-container {
      .loginP-title {
        padding-left: 20px;
      }
      .loginP-main {
        padding-top: 23px;
        padding-bottom: 20px;
        .loginP-nameBox {
          height: 60px;
          input {
            height: 30px;
            line-height: 30px;
            padding-left: 20px;
          }
          .loginP-errorInfo {
            color: #ff4949;
            height: 30px;
            line-height: 30px;
            padding-left: 70px;
          }
          .code-input {
            height: 30px;
          }
          .code_readOnly {
            padding-left: 0px;
            height: 30px;
          }
        }
        .loginP-last {
          height: 40px;
          padding-top: 10px;
          .loginP-span {
            font-size: 12px;
            height: 30px;
            line-height: 30px;
            color: #fff;
            padding-left: 80px;
            a {
              color: #fff;
              padding-right: 10px;
              &:hover {
                text-decoration: underline;
              }
            }
          }
        }
        .loginP-go {
          width: 290px;
          margin: 0 auto;
          a {
            display: block;
            color: #41aaff;
            font-size: 16px;
            width: 290px;
            height: 34px;
            text-align: center;
            line-height: 34px;
            margin-top: 20px;
            background-color: #fff;
          }
          .blue {
            color: #fff;
            background-color: #41aaff;
          }
        }
        .loginP-help {
          width: 290px;
          margin: auto;
          p {
            color: #ffffff;
            font-size: 12px;
            margin-right: 49px;
            a {
              color: #41aaff;
              text-decoration: underline;
            }
          }
          .iconJ {
            width: 14px;
            height: 14px;
            margin: 0 10px 0 20px;
            background: url(../../../assets/img/icon.png) no-repeat;
            display: inline-block;
          }
          .iconXz {
            background-position: -532px -16px;
          }
          .iconWxz {
            background-position: -518px -16px;
          }
        }
        
        
      }
    }
  }
    
}
</style>
