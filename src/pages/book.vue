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
							    <el-input v-model="tourist.idcard" placeholder="身份证号"></el-input>
							  </el-form-item>
							  <el-form-item label="性别：" prop="gender">
							    <el-select v-model="tourist.gender" placeholder="请选择">
								    <el-option :value="1" label="男"></el-option>
								    <el-option :value="2" label="女"></el-option>
								  </el-select>
							  </el-form-item>
							  <el-form-item label="出生日期：" prop="birthday">
						      <el-date-picker
							      v-model="tourist.birthday"
							      type="date"
							      placeholder="选择日期"
							      @change="handleDateChange">
							    </el-date-picker>
							  </el-form-item>
							  <el-form-item label="手机号码：" prop="mobile">
							    <el-input v-model="tourist.mobile" placeholder="手机号码"></el-input>
							  </el-form-item>
					  	</el-form>
					  </div>
					</el-card>
				</el-col>
				<el-col :span="8">
					<el-card class="ware-card" v-bind:class="{fixed : isCardFixed}">
						<div class="card-body">
							<div class="ware-img">
								<img src="http://www.fookvision.com/Public/Wwwfookvisioncom/images/activity/anniversary/pic_16.png" alt="">
							</div>
							<div class="price-main">
								<div class="price-title">
									{{ wareInfo.wareName }}
								</div>
								<div class="tourist-info">
									<div class="depart-city">
										<label>出发城市</label>
										<span>北京</span>
									</div>
									<div class="depart-city">
										<label>出发日期</label>
										<span>2017-08-15</span>
									</div>
									<div class="depart-city">
										<label>出发人数</label>
										<span>成人：2  儿童： 0</span>
									</div>
								</div>
								<div class="price-info"></div>
							</div>
							<div class="total-price">
								<label>总价</label>
								<span>
									<i class="fa fa-rmb">￥</i>
									<strong>25998</strong>
								</span>
							</div>
						</div>
					</el-card>
				</el-col>
			</el-row>
		</div>
		<div class="submit" v-bind:class="{up : isFooterUp}">
			<p>
				<el-checkbox checked></el-checkbox>
				<span>我已阅读并同意 旅游合同、保险条款、保险经纪委托合同、特别预订提示、安全提示</span>
			</p>
			<el-button type="warning" size="large" @click="submitForm">提交订单</el-button>
		</div>
	</section>
</template>
<script>
	export default {
		data() {
			return {
				wareInfo: {
					wareName: '【巴厘岛蜜月旅拍婚纱摄影6天4晚游】一对一司导+接送机+一日全天拍摄+国际五星'
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
				rules: {
					name: [
						{ required: true, message: '请输入联系人姓名', trigger: 'blur' },
					],
					mobile: [
						{ required: true, message: '请输入手机号码', trigger: 'blur' },
					],
					zhName: [
						{ required: true, message: '请输入中文姓名', trigger: 'blur' },
					],
					enName: [
						{ required: true, message: '请输入英文名', trigger: 'blur' },
					],
					enSurName: [
						{ required: true, message: '请输入英文姓', trigger: 'blur' },
					],
					idcard: [
						{ required: true, message: '请输入身份证号', trigger: 'blur' },
					],
					gender: [
						{ required: true, message: '请选择性别', trigger: 'blur' },
					],
					birthday: [
						{ required: true, message: '请选择出生日期', trigger: 'blur' },
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
				this.$notify.warning({
					title: '提示',
					message: '请将订单填写完整'
				})
			}
		},
		created() {
			if (this.$route.query.wareName) {
				this.wareInfo.wareName = this.$route.query.wareName;
			}
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