<template>
	<section>
		<div v-title data-title="确认支付-悦视觉全球旅拍"></div>
		<div class="main-wrap">
			<el-row :gutter="20">
				<el-col :span="16">
					<el-card>
						<h3>感谢您在悦视觉订购！</h3>
						<h3 class="success"><i class="el-icon-circle-check"></i>支付成功</h3>
						<router-link to="/list">继续订购</router-link>
						<router-link to="/">查看订单</router-link>
					</el-card>
				</el-col>
				<el-col :offset="1" :span="7">
					<el-card class="ware-card">
						<div class="card-body">
							<div class="ware-img">
								<img src="http://www.fookvision.com/Public/Wwwfookvisioncom/images/activity/anniversary/pic_16.png" alt="">
							</div>
							<div class="price-main">
								<div class="price-title">
									{{ order.wareName }}
								</div>
								<!-- <div class="tourist-info">
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
										<div>
											<span>成人：{{order.adultNum}}</span>  
											<span v-if="order.childNum">儿童： {{}}</span>
										</div>
									</div>
								</div> -->
							</div>
						</div>
					</el-card>
				</el-col>
			</el-row>
		</div>
	</section>
</template>
<script>
	export default {
		data() {
			return {
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
				radio: '1'
			}
		},
		methods: {
			confirmPay() {
				this.$notify.info({
					title: '稍等',
					message: '后面的尚未完成'
				})
			}
		},
		created() {
			this.order = JSON.parse(localStorage.getItem('order'))
			this.contacts = JSON.parse(localStorage.getItem('contacts'))
		},
	}
</script>
<style scoped lang="scss">
	.el-card {
		box-shadow: none;
		.success {
			margin: 50px 0;
			font-size: 28px;
			color: #75d24d;
			i {
				margin-right: 10px;
			}
		}
		a {
			margin-right: 15px
		}
	}
	.title {
		padding-bottom: 15px;
		border-bottom: 1px solid #ccc;
	}
	.content {
		padding: 15px 20px;
	}
	.contacts-info {
		margin: 20px 0;
		span {
			margin-right: 30px
		}
	}
	.table {
		display: table;
		text-align: center;
		vertical-align: middle;
		border: none;
		.table-row {
			display: table-row;
		}
		.table-cell {
			display: table-cell;
			padding: 5px 0;
			&.name {
				max-width: 130px
			}
		}
	}
	.money {
		color: #f60
	}
	.payPrice {
		margin-top: 15px;
		text-align: right;
		.money {
			font-size: 28px;
			i {
				font-size: 18px
			}
		}
	}
	.pay-methods {
		h3 {
			margin: 30px 0;
			font-size: 20px;
			color: #666
		}
		.method-list {
			padding-left: 30px
		}
		.method-item {
			margin: 15px 0;
			padding: 15px 20px;
			border: 4px solid #e7e7e7;
			&.active {
				border: 4px solid #ff944f;
			}
			&.wxpay {
				padding: 5px 20px;
			}
			.el-radio {
				width: 100%
			}
			.alipay-icon {
				width: 80px; 
				height: 25px;
				margin-left: 10px;
				vertical-align: middle;
			}
			.weixin-icon {
				width: 80px; 
				height: 40px;
				margin-left: 10px;
				vertical-align: middle; 
			}
		}
	}
	.pay-button {
		float: right;
		margin-top: 15px;
		background: #f60;
		font-weight: bold
	}
	.ware-card {
		// width: 380px;
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
		// border-bottom: 1px solid #ccc;
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
</style>