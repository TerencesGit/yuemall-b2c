<template>
	<div class="login-page" :style="{background: 'url('+bgImg+') no-repeat center top'}">
		<div v-title :data-title="this.$route.name"></div>
		<div class="container relative">
			<div class="login-box">
				<div class="login-header">
					<h3>会员登录</h3>
				</div>
				<el-form 
					:model="form" 
					:rules="rules" 
					ref="loginForm" 
					label-width="70px" 
					label-position="left" 
					class="login-form"
					@submit.native.prevent>
				  <el-form-item label="" class="login-type" label-width="0">
				    <el-radio-group v-model="form.loginType">
	       			<el-radio :label="1">普通登录</el-radio>
	  					<el-radio :label="2">短信动态码登录</el-radio>
	    			</el-radio-group>
				  </el-form-item>
				  <div v-show="form.loginType === 1">
					  <el-form-item label="登录名" prop="username">
					  	<el-input v-model="form.username" placeholder="用户名/手机号/邮箱"></el-input>
					  </el-form-item>
					  <el-form-item label="密  码" prop="password">
					  	<el-input type="password" v-model="form.password" placeholder="请输入密码"></el-input>
					  </el-form-item>
				  </div>
				  <div v-show="form.loginType === 2">
				   	<el-form-item label="手机号" prop="mobile">
					  	<el-input v-model="form.mobile" placeholder="请输入手机号"></el-input>
					  </el-form-item>
					  <el-form-item label="验证码" prop="authcode" :autofocus="true" class="authcode">
	            <el-input type="text" v-model="form.authcode" placeholder="请输入验证码" style="width: 140px;"></el-input>
	            <canvas id="canvasCode" width="95px" height="32px" class="canvas-code" @click="drawCode"></canvas>
	          </el-form-item>
	          <el-form-item label="动态码" prop="smscode" :autofocus="true" class="smscode">
	            <el-input type="text" v-model="form.smscode" placeholder="请输入动态码" style="width: 140px;"></el-input>
	            <button class="code-button" @click="getSmsCode" :disabled="disabled">{{buttonText}}</button>
	          </el-form-item>
          </div>
				  <el-form-item label-width="0">
				    <el-button type="primary" @click="submitForm" class="submit-button" :loading="loading">提 交</el-button>
				  </el-form-item>
				</el-form>
				<div class="login-footer">
					<router-link to="/register">尚未注册</router-link>
					<span>|</span>
					<a href="javascript:;">忘记密码</a>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import Utils from '@/assets/js/utils'
	import { findStoreByPcDoMain, memberLogin, sendSmsCode } from "@/api";
	export default {
		data() {
			const validateMobile = (rule, value, callback) => {
        if (!value.match(/^(13|14|15|17|18)\d{9}$/)) {
           callback(new Error('手机号码格式不正确'))
        } else {
          callback()
        }
      }
      const validateCode = (rule, value, callback) => {
        if (value.toUpperCase() !== this.authCode.toUpperCase()) {
          callback(new Error('验证码错误'))
        } else {
          callback()
        }
      }
			return {
				form: {
					loginType: 1,
					username: '',
	        password: '',
	        mobile: '',
	        authcode: '',
	        smscode: '',
				},
				rules: {
					username: [
						{ required: true, message: '请输入登录名', trigger: 'blur' },
					],
					password: [
						{ required: true, message: '请输入密码', trigger: 'blur' },
					],
					mobile: [
						{ required: true, message: '请输入手机号', trigger: 'blur' },
						{ validator: validateMobile, trigger: 'blur'}
					],
					authcode: [
						{ required: true, message: '请输入验证码', trigger: 'blur' },
						{ validator: validateCode, trigger: 'blur'}
					],
					smscode: [
						{ required: true, message: '请输入动态码', trigger: 'blur' },
					],
				},
				storeId: '',
				authCode: '',
				autoLogin: '1',
				loading: false,
				disabled: false,
				buttonText: '获取动态码',
				bgImg: 'http://pai.yueshijue.com/assets/img/img/background.png',
			}
		},
		methods: {
			drawCode () {
        this.authCode = Utils.canvasCode('canvasCode')
      },
      getStore() {
        findStoreByPcDoMain().then(res => {
          if(res.data.status === 1) {
            this.storeId = res.data.data;
            sessionStorage.setItem('storeId', this.storeId)
          } else {
            this.$message.error(res.data.msg)
          }
        }).catch(err => {
        	console.log(err)
        })
      },
      countDown() {
				let count = 60;
				let timer = null;
				this.disabled = true;
				timer = setInterval(() => {
					if(count > 0) {
						this.buttonText = `重新获取 ${count}s`
						count --;
					} else {
						this.buttonText = '重新获取';
						this.disabled = false;
						clearInterval(timer)
					}
				}, 1000)	
			},
      getSmsCode() {
      	this.$refs.loginForm.validateField('mobile', error => {
					if(error) return;
					let data = {
						phone: this.form.mobile,
						storeId: this.storeId,
					}
					sendSmsCode(data).then(res => {
						if(res.data.status === 1) {
							this.countDown()
							this.$message.success('短信动态码已发送，请注意查收')
						} else {
							this.$message.error(res.data.msg)
						}
					})
				})
      },
      userLogin() {
      	let data = {}
      	if(this.form.loginType === 1) {
      		data = {
      			username: this.form.username,
						password: this.form.password,
						loginType: this.form.loginType,
						autoLogin: this.autoLogin,
						storeId: this.storeId,
      		}
      	} else {
      		data = {
      			username: this.form.mobile,
						loginType: this.form.loginType,
						autoLogin: this.autoLogin,
						storeId: this.storeId,
						code: this.form.smscode,
      		}
      	}
      	this.loading = true;
				memberLogin(data).then(res => {
					this.loading = false;
					if(res.data.status === 1) {
						let userInfo = res.data.data;
						this.$store.dispatch('changeLogin', 1)
						this.$store.dispatch('saveUserInfo', userInfo)
						if(this.$fromPath.indexOf('register') === 1) {
	            this.$router.replace('/index')
	          } else {
	            window.history.back()
	          }
					} else {
						this.$message.error(res.data.msg)
					}
				})
      },
			submitForm() {
				if(this.form.loginType === 1) {
					this.$refs.loginForm.validateField('username', error => {
						if(error) return;
						this.$refs.loginForm.validateField('password', error => {
							if(error) return;
							this.userLogin()
						})
					})
				} else if(this.form.loginType === 2) {
					this.$refs.loginForm.validateField('mobile', error => {
						if(error) return;
						this.$refs.loginForm.validateField('authcode', error => {
							if(error) return;
							this.$refs.loginForm.validateField('smscode', error => {
								if(error) return;
								this.userLogin()
							})
						})
					})
				} else {
					this.$message.error('提交有误！')
				}
			},
		},
		mounted() {
			this.storeId = sessionStorage.getItem('storeId');
			if(!this.storeId) {
				this.getStore()
			}
			this.drawCode()
		}
	}
</script>
<style scoped lang="scss">
	.login-page {
		width: 100%;
		height: 813px;
		background-size: cover;
		@at-root .login-box {
			position: absolute;
			top: 100px;
			right: 100px;
			width: 400px;
			padding: 20px 30px;
			background: rgba(0,0,0,.5);
			.login-header {
				padding-bottom: 10px;
				margin-bottom: 20px;
				border-bottom: 1px solid #fff;
				h3 {
					color: #fff;
					font-size: 18px;
					font-weight: normal;
				}
			}
			.login-form {
				padding: 0 10px;
				.login-type {
					.el-radio {
						color: #fff;
					}
				}
				.el-form-item {
					.el-form-item__label {
						color: #fff;
						font-size: 16px;
						vertical-align: middle;
					}
				}
				.canvas-code {
					margin-left: 10px;
			    vertical-align: middle;
			    border-radius: 0;
			    box-shadow: none;
			    letter-spacing: 4px;
			    background: rgba(255,255,255,.8);
			    cursor: pointer;
				}
				.code-button {
					width: 95px;
					height: 32px;
					margin-left: 10px;
					line-height: 32px;
					text-align: center;
					color: #fff;
					background: #909399;
				}
				.submit-button {
					width: 100%;
					padding: 8px 20px;
					margin-top: 10px;
				}
			}
			.login-footer {
				text-align: center;
				color: #fff;
				a {
					color: #fff;
				}
				span {
					margin: 0 5px;
					line-height: 0;
				}
			}
		}
	}
</style>