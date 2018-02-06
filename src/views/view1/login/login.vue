<template>
  <div>
      <div class="dMain-container">
          <div class="login-register" v-bind:style="{background: 'url('+bgImg+') no-repeat center bottom'}">
              <div class="login-register-box container clearfix2">
                  <div class="fr login-register-container">
                      <h3 class="loginP-title">会员登录</h3>
                      <ul class="loginP-main">
                        <div>
                            <li class="clearfix2 loginP-pBox">
                                <a class="fl clearfix2" href="javascript:;" @click="telLogin">
                                    <span class="fl loginP-pointer" :class="isChangeLoginType ? 'active' : ''"></span>
                                    <span class="fl loginP-txt">普通登录</span>
                                </a>
                                <a class="fl clearfix2" href="javascript:;" @click="normalLogin">
                                    <span class="fl loginP-pointer" :class="isChangeLoginType ? '' : 'active'"></span>
                                    <span class="fl loginP-txt">手机动态密码登录</span>
                                </a>
                            </li>
                            <div class="normalLogin" v-if="isChangeLoginType">
                                <li class="clearfix2 loginP-nameBox">
                                  <p class="fl">登录名</p>
                                  <input class="loginP-name J_inputFocus" type="text" placeholder="用户名/手机号/邮箱" v-model="username" @blur="usernameValidate">
                                  <span class="loginP-errorInfo">{{uernameErrorInfo}}</span>
                                </li>
                                <li class="clearfix2 loginP-nameBox">
                                    <p class="fl">密　码</p>
                                    <input class="loginP-name" type="password" placeholder="请输入密码" v-model="password" @blur="passwordValidate">
                                    <span class="loginP-errorInfo">{{passwordErrorInfo}}</span>
                                </li>
                                <li class="loginP-go clearfix2">
                                    <a id="loginGo" class="fr" href="javascript:void(0)" @click="login1">登录</a>
                                </li>
                            </div>
                            <div class="normalLogin" v-else>
                                <li class="clearfix2 loginP-nameBox">
                                    <p class="fl">登录名</p>
                                    <input class="fr loginP-name" type="text" placeholder="请输入手机号" v-model="telephone" @blur="teleValidate">
                                    <span class="loginP-errorInfo">{{teleErrorInfo}}</span>
                                </li>
                                <li class="clearfix2 loginP-nameBox">
                                    <p class="fl">验证码</p>
                                    <input type="text" class="fl code-input" value="" placeholder="请输入验证码" v-model="codeInput1"  @blur="codeInput1Validate">
                                    <input type="text" readonly="readonly" class="code_readOnly fl" v-model="randomCode" @click="randomCodeFn">
                                    <span class="loginP-errorInfo">{{codeInput1ErrorInfo}}</span>
                                </li>
                                <li class="clearfix2 loginP-nameBox" style="position: relative;">
                                    <p class="fl">动态码</p>
                                    <input type="text" class="fl code-input" value="" placeholder="动态密码" v-model="codeInput2"  @blur="codeInput2Validate">
                                    <input type="text" readonly="readonly" class="code_readOnly fl" placeholder="点击发送" v-model="sendCode" >
                                    <div class="mengCeng hide cursor" style="width:101px;height:36px;position: absolute;z-index: 2;top:0;right:0;" @click="dynamicVerificationCode1()"></div>
                                    <span class="loginP-errorInfo">{{codeInput2ErrorInfo}}</span>
                                </li>
                                <li class="loginP-go clearfix2">
                                    <a id="loginGo" href="javascript:void(0)" @click="login2">登录</a>
                                </li>
                            </div>
                        </div>    
                           

                        <!-- <div class="forgetPassword" v-show="isforgetPassword">
                          <li class="clearfix2 loginP-nameBox">
                                <p class="fl">手机号</p>
                                <input class="fr loginP-name" type="text" placeholder="请输入手机号" v-model="telephoneForget" @blur="telephoneForgetValidate">
                                <span class="loginP-errorInfo">{{teleForgetErrorInfo}}</span>
                            </li>
                            <li class="clearfix2 loginP-nameBox">
                                <p class="fl">密　码</p>
                                <input class="loginP-name" type="password" placeholder="请输入密码" v-model="passwordForget" @blur="passwordForgetValidate">
                                <span class="loginP-errorInfo">{{passwordForgetErrorInfo}}</span>
                            </li>
                            <li class="clearfix2 loginP-nameBox" style="position: relative;">
                                <p class="fl">动态码</p>
                                <input type="text" class="fl code-input" value="" placeholder="动态密码" v-model="codeInput2Forget"  @blur="codeInput2ForgetValidate">
                                <input type="text" readonly="readonly" class="code_readOnly fl" placeholder="点击发送" v-model="sendCode" >
                                <div class="mengCeng hide cursor" style="width:101px;height:36px;position: absolute;z-index: 2;top:0;right:0;" @click="dynamicVerificationCode2()"></div>
                                <span class="loginP-errorInfo">{{codeInput2ForgetErrorInfo}}</span>
                            </li>
                            <li class="loginP-go clearfix2">
                                <a id="loginGo" href="javascript:void(0)" @click="login3">登录</a>
                            </li>
                        </div> -->
                             <li class="clearfix2 loginP-nameBox">
                              <span class="loginP-span"><router-link to="/register">尚未注册</router-link><em>|</em><a href="javascript:;" @click="forgetPswd">忘记密码</a>  </span>
                            </li>
                      </ul>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import { memberLogin, forgetPassword } from "@/api";
export default {
  data() {
    return {
      storeId: '',
      isChangeLoginType: true,
      isforgetPassword: true,
      username: "",
      password: "",
      telephone: "",
      codeInput1: "",
      codeInput2: "",
      randomCode: '',
      sendCode: "",
      count: '',
      timer: null,
      uernameErrorInfo: '',
      passwordErrorInfo: '',
      teleErrorInfo: '',
      codeInput1ErrorInfo: '',
      codeInput2ErrorInfo: '',
      isChecked:true,
      telephoneForget: '',
      passwordForget: '',
      codeInput2Forget: '',
      teleForgetErrorInfo: '',
      passwordForgetErrorInfo: '',
      codeInput2ForgetErrorInfo: '',
      bgImg: 'http://pai.yueshijue.com/assets/img/img/background.png'
    };
  },
  methods: {
    randomCodeFn() {
      this.randomCode = ''
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
    getCreateUser() {
            let data = {
                phone: this.telephone
            }
            createuser(data).then( res => {
                if(res.data.status == 1){
                    this.$message('验证码发送成功')
                }else{
                    this.$message('验证码发送失败')
                }
            })
    },
    normalLogin() {
      this.isChangeLoginType = false;
    },
    telLogin() {
      this.isChangeLoginType = true;
    },
    login1() {
      this.usernameValidate();
      this.passwordValidate();
      if(this.username == '' || this.password == '') return false
      
      let data = {
        username: this.username,
        loginType: '1',
        password: this.password,
        storeId: this.storeId,
        autoLogin: '1',
      };
      memberLogin(data).then(res => {
        console.log(res);
        if (res.data.status == 1) {
          this.$message("登录成功");
          this.$router.push("/index");
        } else {
          this.$message(res.data.msg)
        }
      });
    },
    login2() {
      this.teleValidate();
      this.codeInput1Validate();
      this.codeInput2Validate();
      if (!(this.codeInput1 == this.randomCode)) return false
      if(this.telephone == '' || this.codeInput1 == '' || this.codeInput2 == '') return false
      let data = {
        username: this.telephone,
        loginType: '2',
        code: this.codeInput2,
        storeId: sessionStorage.getItem("providerId"),
        autoLogin: '1'
      };
      memberLogin(data).then(res => {
        console.log(res);
        if (res.data.status == 1) {
          this.$message("登录成功");
          this.$router.push("/index");
        } else {
          this.$message('res.data.msg')
        }
      });
    },
    login3() {
      this.telephoneForgetValidate();
      this.passwordForgetValidate();
      this.codeInput2ForgetValidate();
      if(this.telephoneForget == '' && this.passwordForget == '' && this.codeInput2Forget == '') return false
      let data = {
        username: this.telephoneForget,
        password: this.passwordForget,
        loginType: '3',
        code: this.codeInput2,
        storeId: sessionStorage.getItem("providerId"),
        autoLogin: '1'
      };
      memberLogin(data).then(res => {
        console.log(res);
        if (res.data.status == 1) {
          this.$message("登录成功");
          this.$router.push("/index");
        } else {
        }
      });
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
    dynamicVerificationCode1() {
      this.teleValidate();
      if(this.telephone == '') return false
      let data = {
          phone: this.telephone,
          storeId: sessionStorage.getItem("providerId"),
        };
        forgetPassword(data).then(res => {
          console.log(res)
          if (res.data.status == 1) {
            this.$message('验证码发送成功')
            this.timerFn() 
          }else{
            this.$message(res.data.msg)
            return false
          }
        });
      
    },
    dynamicVerificationCode2() {
     
      let data = {
          phone: this.telephoneForget,
          storeId: sessionStorage.getItem("providerId")
        };
        forgetPassword(data).then(res => {
          console.log(res)
          if (res.data.status == 1) {
            this.$message('验证码发送成功')
             this.timerFn();
          }else{
            this.$message(res.data.msg)
            return false
          }
        });

    },
    usernameValidate() {
      if (this.username.trim().length == "") return this.uernameErrorInfo = "用户名不能为空";
      var uernameReg = /^([\u4e00-\u9fa5]{0,}|[a-zA-Z0-9_-]{2,6}|1[3|4|5|7|8][0-9]\d{8}|(\w-*\.*)+@(\w-?)+(\.\w{2,})+)$/; //中文、英文、手机号码、邮箱
      if (!uernameReg.test(this.username)) return this.uernameErrorInfo = "用户名格式不对";
      this.uernameErrorInfo = ''
    },
    passwordValidate() {
      if (this.password.trim().length == "") return this.passwordErrorInfo = "密码不能为空";
      this.passwordErrorInfo = ''
    },
    teleValidate() {
      if (this.telephone.trim().length == "") return this.teleErrorInfo = "手机号码不能为空";
      var telephoneReg = /^1[3|4|5|7|8][0-9]\d{8}$/;
      if (!telephoneReg.test(this.telephone))
      return this.teleErrorInfo = "请输入正确的手机格式";
      this.teleErrorInfo = ''
    },
    codeInput1Validate() {
      if (this.codeInput1.trim().length == "") return this.codeInput1ErrorInfo = "验证码不能为空";
      if (this.codeInput1.toUpperCase() !== this.randomCode.toUpperCase()) return this.codeInput1ErrorInfo = "验证码不正确";
      this.codeInput1ErrorInfo = ''
    },
    codeInput2Validate() {
      if (this.codeInput2.trim().length == "") return this.codeInput2ErrorInfo = "动态码不能为空";
      this.codeInput2ErrorInfo = ''
    },
    telephoneForgetValidate() {
      if (this.telephoneForget.trim().length == "") return this.teleForgetErrorInfo = "手机号码不能为空";
      var telephoneForgetReg = /^1[3|4|5|7|8][0-9]\d{8}$/;
      if (!telephoneForgetReg.test(this.telephoneForget))
      return this.teleForgetErrorInfo = "请输入正确的手机格式";
      this.teleForgetErrorInfo = ''
    },
    passwordForgetValidate() {
      if (this.passwordForget.trim().length == "") return this.passwordForgetErrorInfo = "密码不能为空";
      this.passwordForgetErrorInfo = ''
    },
    codeInput2ForgetValidate() {
      if (this.codeInput2Forget.trim().length == "") return this.codeInput2ForgetErrorInfo = "动态码不能为空";
      this.codeInput2ForgetErrorInfo = ''
    },
    forgetPswd() {
      this.isforgetPassword = !this.isforgetPassword;
    }
  },
  created() {
    this.randomCodeFn();
    this.storeId = sessionStorage.getItem('providerId')
  }
};
</script>

<style lang="scss" scoped>
.dMain-container {
  .login-register {
    .login-register-container {
      .loginP-main {
        padding-bottom: 10px;
        .forgetPassword{
          margin-top: 35px;
        }
        .loginP-pBox {
          margin-left: 12px;
        }
        .loginP-nameBox {
          input {
            width: 220px;
            height: 30px;
            line-height: 30px;
            border: none;
            padding-left: 20px;
          }
          span{
            color: #ff4949;
            height: 30px;
            line-height: 30px;
            padding-left: 70px;
          }
          .loginP-span{
            height: 40px;
            line-height: 40px;
            color: #fff;
            a{
              color: #fff;
              padding: 0 10px;
              &:hover{
                text-decoration: underline;
              }
            }
          }
          .code-input {
            width: 130px;
            height: 30px;
           
          }
          .code_readOnly {
               width: 80px;
              height: 30px;
              padding-left: 0;
          }
        }
        .loginP-go {
          width: 290px;
          margin: 0 auto;
          a {
            display: block;
            color: #fff;
            font-size: 16px;
            width: 290px;
            height: 36px;
            text-align: center;
            line-height: 36px;
            background-color: #19a9e8;
          }
        }
      }
    }
  }
}
</style>
