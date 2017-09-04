<template>
	<section>
		<header class="header">
			<div class="center">
				<div class="logo">
					<a href="#">
						<img src="../assets/img/logo.png" alt="logo">
					</a>
					<h3>欢迎登录</h3>
				</div>
			</div>
		</header>
		<div class="login-wrap">
			<div class="login-box">
				<h3 class="login-title">账户登录</h3>
				<el-form :model="loginForm" ref="loginForm" :rules="rules" class="login-form" label-position="left">
					<el-form-item label="用户名" prop="username" label-width="65px">
						<el-input v-model.trim="loginForm.username" placeholder="邮箱/用户名"></el-input>
					</el-form-item>
					<el-form-item label="密  码" prop="password" label-width="65px">
						<el-input type="password" v-model.trim="loginForm.password" placeholder="密码"></el-input>
					</el-form-item>
					<el-form-item label="">
						<el-button type="primary" style="width: 100%" @click="submitForm" :loading="logging">登 录</el-button>
					</el-form-item>
					<el-form-item label="" class="form-item-bottom">
						<a href="#">忘记密码</a>
						<span>|</span>
						<a href="#">立即注册</a>
					</el-form-item>
				</el-form>
			</div>
			<div class="login-bg">
				<img src="http://static.8photo.cn/ad_pic/index/ng_header_news4x.jpg" alt="login_bg">
			</div>
		</div>
		<footer class="footer">
			<div class="center">
				<p>Copyright © 2017 yueshijue.com版权所有</p>
			</div>
		</footer>
	</section>
</template>
<script>
	import MD5 from '@/assets/js/md5'
	import { requestLogin } from '@/api'
	export default {
		data() {
			return {
				loginForm: {
					username: '',
					password: '',
				},
				logging: false,
				rules: {
					username: [
	          { required: true, message: '请输入用户名', trigger: 'blur' },
	        ],
	        password: [
	          { required: true, message: '请输入密码', trigger: 'blur' },
	        ],
				}
			}
		},
		methods: {
			submitForm() {
				this.$refs.loginForm.validate(valid => {
					if(valid){
						this.logging = true;
						let data = {
							username: this.loginForm.username,
							password: MD5.hex_md5(this.loginForm.password),
							isAdmin: 1
						}
						requestLogin(data).then(res => {
							// console.log(res)
							if(res.data.code === '0001') {
								let user = {
	                username: this.loginForm.username,
	                password: escape(btoa(this.loginForm.password)),
	                isAdmin: 1
	              }
	              localStorage.setItem('user', JSON.stringify(user))
	              sessionStorage.setItem('userId', res.data.result.userInfo.userId)
	              this.$message.success('登录成功')
	              this.$router.replace({ path: '/home' })
							} else {
								this.$message.error(res.data.message)
							}
							this.logging = false
						}).catch(err => {
							console.log(err)
							this.logging = false
						})
					} else {
						console.log('err submit')
					}
				})
			},
			keyEnter(e) { 
				e.keyCode === 13 && this.submitForm()
			}
		},
		mounted() {
			document.addEventListener('keydown', this.keyEnter)
			let user = JSON.parse(localStorage.getItem('user'))
			if(user) {
	      this.loginForm.username = user.username
	      this.loginForm.password = atob(unescape(user.password))
	    }
		},
		beforeDestroy() {
			document.removeEventListener('keydown', this.keyEnter)
		}
	}
</script>
<style scoped lang="scss">
	.header {
		padding: 10px 0;
		background: #0095d9;
		.center {
			width: 990px;
			margin: auto;
			a {
				display: inline-block;
				width: 118px;
				height: 43px;
				vertical-align: middle;
			}
			h3 {
				display: inline-block;
				margin-left: 15px;
				font-size: 26px;
				color: #fff;
				vertical-align: middle;
			}
		}
	}
	.login-wrap {
		position: relative;
		height: 550px;
		.login-bg {
			width: 100%;
			height: 100%;
			img {
				width: 100%;
				height: 100%;
			}
		}
		.login-box {
			position: absolute;
			top: 5%;
			right: 10%;
			width: 350px;
			margin-top: 40px;
			background: rgba(255,255,255,.8);
			.login-title {
				padding: 15px 20px;
				margin-bottom: 15px;
				border-bottom: 1px solid #ccc;
			}
		}
	}
	.el-form {
		padding: 20px;
		.form-item-bottom {
			margin: -10px 0 10px; 
			text-align: center;
			span {
				margin: 0 5px;
				color: #999
			}
		}
	}
	.footer {
		.center {
			width: 990px;
			margin: auto;
			padding: 15px;
			text-align: center;
			color: #666
		}
	}
</style>