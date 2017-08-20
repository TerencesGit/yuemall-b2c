<template>
	<section>
		<div v-title data-title="确认支付-悦视觉全球旅拍"></div>
		<div class="main-wrap">
			<el-row :gutter="20">
				<el-col :span="16">
					<el-card>
						<h2>感谢您在悦视觉预订！</h2>
						<div class="contacts-info">
							<h3 class="title">预订人信息</h3>
							<div class="content">
								<span>姓名：{{contacts.name}}</span>
								<span>手机：{{contacts.mobile}}</span>
							</div>
						</div>
						<div class="order-info">
							<h3 class="title">订单信息</h3>
							<div class="content">
								<div class="table">
									<div class="table-row">
										<span class="table-cell">名称</span>
										<span class="table-cell">数量</span>
										<span class="table-cell">单价</span>
										<span class="table-cell">总价</span>
									</div>
									<div class="table-row">
										<span class="table-cell name">{{order.wareName}}</span>
										<div class="table-cell">
											<span>成人：{{order.adultNum}}</span>
											<span v-if="order.childNum">儿童：{{order.childNum}}</span>
										</div>
										<span class="table-cell money"><i class="fa fa-rmb">￥</i>{{order.adultPrice}}</span>
										<span class="table-cell money"><i class="fa fa-rmb">￥</i>{{order.totalPrice}}</span>
									</div>
								</div>
								<div class="payPrice">
									<span>支付总金额：
										<strong class="money">
											<i class="fa fa-rmb">￥</i>
											{{order.totalPrice}}
										</strong>
									</span>
								</div>
							</div>
						</div>
					</el-card>
					<div class="pay-methods">
						<h3>支付方式</h3>
						<ul class="method-list">
							<li class="method-item alipay" v-bind:class="{active : payMethod === 1}">
								<el-radio class="radio" v-model="payMethod" :label="1">
								<img src="https://t.alipayobjects.com/images/T11rdgXbFkXXXXXXXX.png" class="alipay-icon">
								</el-radio>
							</li>
							<li class="method-item wxpay" v-bind:class="{active : payMethod === 2}">
								<el-radio class="radio" v-model="payMethod" :label="2">
								<img src="https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=199783060,2774173244&amp;fm=58&amp;s=188FA15AB1206D1108400056000040F6&amp;bpow=121&amp;bpoh=75" class="weixin-icon">
								</el-radio>
							</li>
						</ul>
						<el-button type="warning" size="large" class="pay-button" @click="confirmPay">确定支付</el-button>
					</div>
				</el-col>
				<el-col :offset="1" :span="7">
					<el-card class="ware-card">
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
										<div>
											<span>成人：{{order.adultNum}}</span>  
											<span v-if="order.childNum">儿童： {{order.childNum}}</span>
										</div>
									</div>
								</div>
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
				payMethod: 1
			}
		},
		methods: {
			confirmPay() {
				let orderObj = {
					orderId: new Date().getTime(),
					name: this.order.wareName,
					payer: this.contacts.name,
					mobile: this.contacts.mobile,
					amount: this.order.totalPrice,
					method: this.payMethod,
					createTime: new Date()
				}
				let orderList = JSON.parse(localStorage.getItem('orderList')) || [];
				orderList.push(orderObj)
				localStorage.setItem('orderList', JSON.stringify(orderList))
				this.$router.push('completed')
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
		box-shadow: none
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
</style>