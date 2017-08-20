<template>
	<section>
		<div v-title data-title="产品预订-悦视觉全球旅拍"></div>
		<div class="main-wrap">
			<el-row :gutter="20">
				<el-col :span="16">
					<el-card class="box-card">
					  <div slot="header">
					    <span><i class="fa fa-user contact">&#9818;</i>联系人信息</span>
					  </div>
					  <div class="card-body">
					  	<el-form :model="contacts" ref="contacts" :rules="rules" label-width="100px" class="contacts-form">
					  		<el-form-item label="姓名：" prop="name">
							    <el-input v-model="contacts.name" placeholder="如：张三"></el-input>
							  </el-form-item>
							  <el-form-item label="手机号码：" prop="mobile">
							    <el-input v-model="contacts.mobile" placeholder="暂只支持大陆手机号码"></el-input>
							  </el-form-item>
					  	</el-form>
					  </div>
					</el-card>
					<el-card class="box-card">
					  <div slot="header">
					    <span><i class="fa fa-user tourist">&#9821;</i>出游人信息</span>
					  </div>
					  <div class="card-body">
					  	<el-form :model="tourist" ref="tourist" :rules="rules" label-width="100px" class="tourist-form">
					  		<el-form-item label="中文姓名：" prop="zhName">
							    <el-input v-model="tourist.zhName" placeholder="如：张三"></el-input>
							  </el-form-item>
							  <el-form-item label="英文姓名：" prop="enName" class="name-input">
							    <el-input v-model="tourist.enSurName" placeholder="拼音姓"></el-input>
							    <el-input v-model="tourist.enName" placeholder="拼音名"></el-input>
							  </el-form-item>
							  <el-form-item label="身份证号：" prop="idcard">
							    <el-input v-model="tourist.idcard" placeholder="请输入身份证号"></el-input>
							  </el-form-item>
							  <el-form-item label="性别：" prop="gender">
							    <el-select v-model="tourist.gender" placeholder="请选择性别">
								    <el-option :value="1" label="男"></el-option>
								    <el-option :value="2" label="女"></el-option>
								  </el-select>
							  </el-form-item>
							  <el-form-item label="出生日期：" prop="birthday">
						      <el-date-picker
							      v-model="tourist.birthday"
							      type="date"
							      placeholder="请选择出生日期"
							      @change="handleDateChange">
							    </el-date-picker>
							  </el-form-item>
							  <el-form-item label="手机号码：" prop="mobile">
							    <el-input v-model="tourist.mobile" placeholder="暂只支持大陆手机号码"></el-input>
							  </el-form-item>
					  	</el-form>
					  </div>
					</el-card>
				</el-col>
				<el-col :span="8">
					<el-card class="ware-card" v-bind:class="{fixed : isCardFixed}">
						<div class="card-body">
							<div class="ware-img">
								<img :src="order.wareImg">
							</div>
							<div class="price-main">
								<div class="price-title">
									{{ order.wareName }}
								</div>
								<div class="tourist-info">
									<div class="info-item">
										<label>出发城市</label>
										<span>{{order.srcCity}}</span>
									</div>
									<div class="info-item">
										<label>出发日期</label>
										<span>{{order.startDate}}</span>
									</div>
									<div class="info-item">
										<label>出发人数</label>
										<span>成人：{{order.adultNum}}  儿童： {{order.childNum}}</span>
									</div>
								</div>
							</div>
							<div class="total-price">
								<label>总价</label>
								<span>
									<i class="fa fa-rmb">￥</i>
									<strong>{{order.totalPrice}}</strong>
								</span>
							</div>
						</div>
					</el-card>
				</el-col>
			</el-row>
		</div>
		<div class="submit" v-bind:class="{up : isFooterUp}">
			<p>
				<el-checkbox v-model="checked"></el-checkbox>
				<span>我已阅读并同意 旅游合同、保险条款、保险经纪委托合同、特别预订提示、安全提示</span>
			</p>
			<el-button type="warning" size="large" @click="submitForm">提交订单</el-button>
		</div>
	</section>
</template>
<script>
	export default {
		data() {
			const validateMobile = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入手机号码'));
        }
        setTimeout(() => {
          if (!value.match(/^(13|14|15|17|18)\d{9}$/)) {
            callback(new Error('请输入正确手机号码'));
          } else {
          	callback()
          }
        }, 0);
      };
      const validateChinese = (rule, value, callback) => {
      	if (!value) {
      		return callback(new Error('请输入中文姓名'));
      	}
      	if (!value.match(/^[\u4e00-\u9fa5]{2,}$/)) {
          callback(new Error('请输入正确中文姓名'));
        } else {
        	callback()
        }
      }
      const validateEnglish = (rule, value, callback) => {
      	if (!value) {
      		return callback(new Error('请输入英文姓名'));
      	}
      	if (!value.match(/^[A-Za-z]+$/)) {
          callback(new Error('请输入正确英文姓名'));
        } else {
        	callback()
        }
      }
      const validateIdCard = (rule, value, callback) => {
      	if (!value) {
      		return callback(new Error('请输入身份证号'));
      	}
      	if (!value.match(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/)) {
          callback(new Error('请输入正确身份证号'));
        } else {
        	callback()
        }
      }
			return {
				user: {},
				order: {
					wareName: '',
					startDate: '',
					srcCity: '',
					adultPrice: '',
					adultNum: '',
					childPrice: '',
					childNum: '',
					totalPrice: ''
				},
				contacts: {
					name: '',
					mobile: ''
				},
				tourist: {
					zhName: '',
					enName: '',
					enSurName: '',
					idcard: '',
					gender: '',
					birthday: '',
					mobile: ''
				},
				checked: false,
				rules: {
					name: [
						{ required: true, message: '请输入联系人姓名', trigger: 'blur' },
					],
					mobile: [
						{ required: true, validator: validateMobile, trigger: 'blur' },
					],
					zhName: [
						{ required: true, validator: validateChinese, trigger: 'blur' },
					],
					enName: [
						{ required: true, validator: validateEnglish, trigger: 'blur' },
					],
					enSurName: [
						{ required: true, validator: validateEnglish, trigger: 'blur' },
					],
					idcard: [
						{ required: true, validator: validateIdCard, trigger: 'blur' },
					],
					gender: [
						{ type: 'number', required: true, message: '请选择性别', trigger: 'change' },
					],
					birthday: [
						{ required: true, message: '请选择出生日期', trigger: 'change' },
					],
				},
				isCardFixed: false,
				isFooterUp: false,
			}
		},
		methods: {
			handleDateChange(val) {
				console.log(val)
				this.tourist.birthday = val;
			},
			handleScroll () {
				// console.log(document.body.scrollTop)
				this.isCardFixed = document.body.scrollTop > 125 ? true : false;
				this.isFooterUp = document.body.scrollTop > 360 ? true : false;
			},
			submitForm() {
				this.$refs.contacts.validate(valid =>  {
					if(valid) {
						if(this.contacts.name !== this.user.name) {
							this.$notify.warning({
								title: '提示',
								message: '联系人必须是本人真实姓名'
							})
							return;
						}
						this.$refs.tourist.validate(valid =>  {
							if(valid){
								if(!this.checked) {
									this.$notify.warning({
										title: '提示',
										message: '请同意旅游合同并勾选'
									})
									return;
								}
								let contacts = JSON.stringify(Object.assign({}, this.contacts))
								localStorage.setItem('contacts', contacts)
								this.$router.push({
									path: 'payment'
								})
							} else {
								console.log(Object.assign({}, this.tourist))
								this.$notify.warning({
									title: '提示',
									message: '请将出游人信息填写完整'
								})
							}
						})
					} else {
						this.$notify.warning({
							title: '提示',
							message: '请将联系人信息填写完整'
						})
					}
				})
			}
		},
		created() {
			// if (this.$route.query.wareName) {
			// 	this.order.wareName = this.$route.query.wareName;
			// }
			this.order = JSON.parse(localStorage.getItem('order'))
			this.user = JSON.parse(localStorage.getItem('user'))
		},
		mounted () {
			document.addEventListener('scroll', this.handleScroll)
		},
		beforeDestroy() {
			document.removeEventListener('scroll', this.handleScroll)
		}
	}
</script>
<style scoped lang="scss">
	.box-card {
		margin-bottom: 30px;
	}
	.contacts-form,
	.tourist-form {
		width: 50%;
		margin-left: 15%
	}
	.el-date-editor.el-input {
    width: 217px;
	}
	.ware-card {
		width: 380px;
		padding: 0;
		box-shadow: none;
		&.fixed {
			position: fixed;
			top: 0
		}
	}
	.ware-img {
		height: 200px;
		img {
			width: 100%;
			height: 100%;
		}
	}
	.price-title {
		padding-bottom: 15px;
		color: #666;
		font-size: 16px;
		border-bottom: 1px solid #ccc;
	}
  .price-main {
  	padding: 15px 20px;
  	.tourist-info {
  		> div {
  			display: flex;
  			justify-content: space-between;
	  		margin: 15px 0;
	  		color: #999;
	  	}
  	}
  }
  .total-price {
  	display: flex;
  	justify-content: space-between;
		padding: 15px 20px;
  	background: #fffced;
  	label {
  		color: #666;
  		font-size: 16px;
  		font-weight: bold;
  		line-height: 2;
  	}
		span {
			color: #f60;
			font-size: 26px;
			i {
				margin-right: -10px;
				font-size: 24px;
			}
		}
  }
  .fa-user {
  	margin-right: 5px;
  	font-size: 20px;
  	&.contact {
			color: #FFB444
  	}
  	&.tourist {
			color: #9B6DDD
  	}
  }
  .submit {
  	position: fixed;
  	bottom: 0;
  	z-index: 999;
  	display: flex;
  	justify-content: space-between;
  	width: 100%;
  	padding: 15px 50px;
  	line-height: 1;
  	background: #fff;
  	box-shadow: 1px 1px 3px 3px #f0f0f0;
  	&.up {
  		bottom: 73px;
  	}
  	p {
  		color: #f60;
  		margin-top: 15px;
  	}
  	button {
  		font-size: 20px;
  		padding: 10px 40px;
  		background: #f80
  	}
  }
</style>