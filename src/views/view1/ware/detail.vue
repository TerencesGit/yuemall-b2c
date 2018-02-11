<template>
	<div class="container">
		<div class="ware-detail-wrap">
			<div class="ware-detail-l">
				<el-carousel height="320px" v-loading="bannerLoading">
          <el-carousel-item v-for="item in bannerList" :key="item.id">
            <img :src="item.filePath" alt=""> 
          </el-carousel-item>
        </el-carousel>
        <price-calendar 
					:data="skuData"
					style="margin-top: 20px;"
					:firstDayOfWeek="0"
					:endDate="endDate"
					:selectedDay="selectedDay" 
					:headerBg="calendarBg"
					@dayClick="dayClick"
					@prevMonth="handlePrevMonth"
					@nextMonth="handleNextMonth">
				</price-calendar>
			</div>
			<div class="ware-detail-r">
				<div class="ware-detail-item ware-code">
					<label>产品编号：</label>
					<p>{{wareDetail.wareCode}}</p>
				</div>
				<div class="ware-detail-item ware-name">
					<h2>{{wareDetail.wareName}}</h2>
				</div>
				<div class="ware-detail-item collection">
					<p v-if="isLogin === 1" class="ware-price">
						<strong class="price"><i>￥</i>{{wareDetail.suggestedPrice}}</strong>/
						<span>{{wareDetail.unit}}起</span>
					</p>
					<p v-else class="ware-price-hidden">
						<router-link to="/login">登录</router-link>	
						后价格可见
					</p>
					<button class="collect-button" @click="handleCollect">
						<span v-if="!isCollected"><i class="el-icon-star-off"></i>收藏</span>
						<span v-else><i class="el-icon-star-on"></i>已收藏</span>
					</button>
				</div>
				<div class="ware-detail-item ware-trip">
					<label>日程概述：</label>
					<ul class="trip-list">
						<li v-for="(item, index) in wareDetail.customerWareTripDetailDos">
							<span class="trip-day">D{{index+1}}</span>
							<span class="trip-name">{{item.programTitle}}</span>
							<i v-if="index < wareDetail.customerWareTripDetailDos.length - 1" class="el-icon-arrow-right">	</i>
						</li>
					</ul>
				</div>
				<div class="ware-detail-item ware-feature">
					<label>产品特色：</label>
					<ul class="feature-list">
						<li v-for="item in keyWords">{{item}}</li>
					</ul>
				</div>
				<div class="ware-detail-item ware-recommend">
					<h4>店长推荐</h4>
					<div v-html="wareDetail.wareDesc"></div>
				</div>
			</div>
		</div>
		<div class="ware-service">
			<div class="service-header">
				<div class="service-date">
					<label class="date-label">服务日期：</label>
					<input type="text" v-model="selectedDay" class="date-picker" placeholder="服务日期" disabled>
				</div>
				<div class="base-number">
					<label>基础套餐：</label>
					<el-input-number v-model="baseNum" size="small" :min="1" :max="baseStorageNum"></el-input-number>
				</div>
				<div class="total-price">
					<label>总价：</label>
					<p class="price"><i class="icon-rmb">￥</i><span>{{totalPrice}}</span></p>
				</div>
				<div class="reserve">
					<button class="reserve-button" @click="handleReserve">立即预定</button>
				</div>
			</div>
			<div class="service-body" v-loading="serviceLoading">
				<h4 class="title">可额外选购</h4>
				<div class="service-content">
					<div class="additional-service" v-show="serviceList.length > 0">
						<label class="service-label">附加项</label>
						<ul class="service-list">
							<li v-for="(item, index) in serviceList" :key="item.id" class="service-item">
								<div class="service-name">{{item.wareName}}</div>
								<div class="service-price">单价 
									<strong class="price"><i>￥</i>{{item.servicePrice}}</strong class="price">
								</div>
								<el-input-number v-model="item.serviceNum" size="small" :min="0" :max="10"></el-input-number>
								<div class="total-price"><strong class="price"><i>￥</i>{{item.serviceNum * item.servicePrice}}</strong></div>
							</li>
						</ul>
					</div>
					<div class="additional-service" v-show="activityList.length > 0">
						<label class="service-label">附加项</label>
						<ul class="service-list">
							<li v-for="(item, index) in activityList" :key="item.id" class="service-item">
								<div class="service-name">{{item.wareName}}</div>
								<div class="service-price">单价 
									<strong class="price"><i>￥</i>{{item.servicePrice}}</strong class="price">
								</div>
								<el-input-number v-model="item.activityNum" size="small" :min="0" :max="10"></el-input-number>
								<div class="total-price"><strong class="price"><i>￥</i>{{item.activityNum * item.servicePrice}}</strong></div>
							</li>
						</ul>
					</div>
					<div class="single-content" v-show="selectedDay">
						<label class="service-label">单人差数</label>
						<div class="single-desc service-item">
							<div class="service-name">单人差数</div>
							<div class="service-price">单价 
								<strong class="price"><i>￥</i>{{singlePrice}}</strong>
							</div>
							<el-input-number v-model="singleNum" size="small" :min="0" :max="10"></el-input-number>
							<div class="total-price"><strong class="price"><i>￥</i>{{singleTotalPrice}}</strong></div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="ware-desc-tabs">
			<div ref="tabsHeader" class="tabs-header relative" :class="{fixed : isTabFixed}">
				<ul class="tabs-nav">
					<li v-for="(item, index) in  attributeList" :key="index" :class="{active : index === tabActive}" @click="tabClick(index)">
						<a href="javascript:;">{{attributeName[item.title]}}</a>
					</li>
				</ul>
				<button class="reserve-button pull-right" @click="handleReserve">立即预定</button>
			</div>
			<div ref="tabsContent" class="tabs-content">
				<div ref="pane" class="tabs-content-pane" v-for="(item, index) in attributeList" :key="index">
					<h3 class="tabs-content-title">{{attributeName[item.title]}}</h3>
					<div class="tabs-content-detail" v-html="item.content"></div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import { wareDetail, wareAttribut, wareSkuOfMonth, wareResource, advanceOrder, createWareCollection, cancelWareCollection } from '@/api'
	export default {
		data () {
			return {
				wareId: '',
				bannerList: [],
				wareDetail: {},
				selectedDay: '',
				skuData: [],
				startDate: '',
				endDate: '',
				skuDate: '',
				baseNum: 1,
				basePrice: 0,
				baseStorageNum: 1,
				singleNum: 0,
				singlePrice: 0,
				serviceList: [],
				activityList: [],
				wareAttribute: {},
				attrOrder: [
					'CHANPINJIESHAO',
					'CHANPINCANSHU',
					'FEIYONGSHUOMING',
					'FEIYONGBAOHAN',
					'YUDINGXUZHI',
					'ZILIFEIYONG',
					'TUIGAIGUIZE',
					'QIANZHENGQIANZHU',
				],
				attributeName: {
					CHANPINJIESHAO: '产品介绍',
					CHANPINCANSHU: '产品参数',
					FEIYONGSHUOMING: '费用说明',
					FEIYONGBAOHAN: '费用包含',
					YUDINGXUZHI: '预定须知',
					ZILIFEIYONG: '自理费用',
					TUIGAIGUIZE: '退改规则',
					QIANZHENGQIANZHU: '签证/签注',
				},
				tabTop: 900,
				tabActive: 0,
				isTabFixed: false,
				attributeList: [],
				keyWords: [],
				panesTop: [],
				serviceLoading: false,
				isCollected: false,
				bannerLoading: false,
				calendarBg: '#009ce8',
			}
		},
		methods: {
			dayClick(cell) {
				if(cell.date === this.selectedDay) return;
				if(cell.data) {
					this.selectedDay = cell.date;
					console.log(Object.assign({}, cell.data))
					this.basePrice = cell.data.adultPrice;
					this.baseStorageNum = cell.data.skuStock.storageNum;
					this.singlePrice = cell.data.singlePrice;
					this.getWareResource()
				}
			},
			handlePrevMonth(date) {
				this.skuDate = this.$moment(date).format('YYYY-MM-DD')
				this.getSkuData()
			},
			handleNextMonth(date) {
				this.skuDate = this.$moment(date).format('YYYY-MM-DD')
				this.getSkuData()
			},
			tabClick(index) {
				this.tabActive = index;
				let tabPaneTop = this.$refs.pane[index].offsetTop - 42;
				window.scrollTo(0, tabPaneTop)
			},
			getTabPanesTop() {
				const panesTop = [];
				const panes = this.$refs.pane || [];
				let lastPane = panes.length - 1;
				for(let i = 0; i < panes.length; i++) {
					panesTop[i] = panes[i].offsetTop - 124;
				}
				panesTop.length > 0 && panesTop.push(panesTop[lastPane] + panes[lastPane].clientHeight)
				this.panesTop = panesTop;
			},
			scrollEvent() {
				this.tabTop = this.$refs.tabsContent.offsetTop - 84;
				// console.log('tabTop----'+this.tabTop)
				// console.log('document.body.scrollTop----'+document.body.scrollTop)
				// console.log('document.documentElement.scrollTop----'+document.documentElement.scrollTop)
				// console.log('window.pageYOffset----'+window.pageYOffset)
				let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
				this.isTabFixed = scrollTop >= this.tabTop ? true : false;
				this.panesTop.length < 2 && this.getTabPanesTop();
				for(let i = 0; i < this.panesTop.length; i++) {
					if(this.panesTop[i] <= scrollTop && this.panesTop[i+1] > scrollTop) {
						this.tabActive = i;
						return;
					}
				}
			},
			getSkuData() {
				let data = {
					wareId: this.wareId,
					skuDate: this.skuDate,
				}
				wareSkuOfMonth(data).then(res => {
					// console.log(res)
					if(res.data.status === 1) {
						this.skuData = res.data.data.currentMonthSku;
						this.endDate = res.data.data.sellSkuPeriod.maxDate;
					}
				}).catch(err => {
					console.log(err)
				})
			},
			getWareDetail() {
				let data = {
					id: this.wareId
				}
				this.bannerLoading = true;
				wareDetail(data).then(res => {
					this.bannerLoading = false;
					if(res.data.status === 1) {
						 // console.log(res.data.data)
						 this.wareDetail = res.data.data;
						 document.title = this.wareDetail.wareName;
						 this.keyWords = this.wareDetail.keyWords.split(',');
						 this.bannerList = this.wareDetail.wareImgInfos;
						 this.getTabPanesTop();
					}
				})
			},
			getWareAttribute() {
				let data = {
					wareId: this.wareId
				}
				wareAttribut(data).then(res => {
					if(res.data.status === 1) {
						this.attrOrder.forEach(attr => {
							let attrObj = {
								title: attr,
								content: res.data.data[attr]
							}
							if(attrObj.content) {
								this.attributeList.push(attrObj)
							}
						})
					}
				})
			},
			getWareResource() {
				let data = {
					id: this.wareId,
					skuDate: this.selectedDay,
				}
				this.serviceLoading = true;
				wareResource(data).then(res => {
					this.serviceLoading = false;
					if(res.data.status === 1) {
						// console.log(res.data.data)
						this.serviceList = [];
						this.activityList = [];
						let serviceInfos = res.data.data.serviceInfo,
								wareActivitys = res.data.data.wareActivitys;
						if(serviceInfos.length > 0) {
							serviceInfos.forEach((service, index) => {
								let _service = {
									id: service.id,
									wareName: service.wareName,
									wareDesc: service.wareDesc,
									servicePrice: service.wareSkuInfos[0].adultPrice,
									serviceNum: 0,
								}
								this.serviceList.push(_service)
							})
						}
						if(wareActivitys.length > 0) {
							wareActivitys.forEach((activity, index) => {
								let _activity = {
									id: activity.id,
									wareName: activity.wareName,
									wareDesc: activity.wareDesc,
									servicePrice: activity.wareSkuInfos[0].adultPrice,
									activityNum: 0,
								}
								this.activityList.push(_activity)
							})
						}
					} else {
						this.$message.error(res.data.msg)
					}
				}).catch(err => {
					this.serviceLoading = false;
				})
			},
			handleReserve() {
				if(!this.isLogin) {
					this.$notify({
					 	type: 'warning',
					 	title: '提示',
					 	message: '请登录先',
					 })
					 return;
				}
				if(!this.selectedDay) {
					 this.$notify({
					 	type: 'warning',
					 	title: '提示',
					 	message: '请选择预定日期',
					 })
					 return;
				}
				let _serviceList = this.serviceList.filter(service => service.serviceNum > 0)
				let _activityList = this.activityList.filter(activity => activity.activityNum > 0)
				let wareOrderInfo = {
					wareId: this.wareId,
					skuDate: this.selectedDay,
					adultNum: this.baseNum,
					singleNum: this.singleNum,
					childNum: 0,
					activityInfos: _activityList,
					serviceInfos: _serviceList,
          wareName: this.wareDetail.wareName,
					wareImg: this.wareDetail.wareImgInfos[0].filePath,
          adultPrice: this.basePrice,
          totalPrice: this.baseNum * this.basePrice,
          childNum: 0,
          childPrice: 4000,
          singleAmount: this.singleTotalPrice,
          // cityName: '',
          // homeNum: 1,
          servicePrice: this.serviceTotalPrice,
          activityPrice: this.activityTotalPrice,
          totalAmount: this.totalPrice,
				}
				// console.log(wareOrderInfo)
				advanceOrder(wareOrderInfo).then(res => {
					// console.log(res)
					// sessionStorage.setItem('orderInfo', JSON.stringify(wareOrderInfo))
					// this.$router.push('/ware/fillInfo?orderId=415177136070425')
					if(res.data.status === 1) {
						let orderInfo = res.data.data;
						sessionStorage.setItem('orderInfo', JSON.stringify(orderInfo))
						this.$router.push('/ware/reserve?wareId='+this.wareId)
					} else {
						this.$message.error(res.data.msg)
					}
				}).catch(err => {
					console.log(err)
					this.$catchError(err)
				})
			},
			handleCollect() {
				if(!this.isLogin) {
					this.$notify({
					 	type: 'warning',
					 	title: '提示',
					 	message: '请登录先',
					})
					return;
				}
				let data = {
					wareId: this.wareId
				}
				if(!this.isCollected) {
					createWareCollection(data).then(res => {
						console.log(res)
						if(res.data.status === 1) {
							this.isCollected = true;
							this.$message.success(res.data.msg)
						} else {
							res.data.msg = res.data.msg || '收藏失败，请稍后再试';
							this.$message.error(res.data.msg)
						}
					}).catch(err => {
						console.log(err)
					})
				} else {
					cancelWareCollection(data).then(res => {
						if(res.data.status === 1) {
							this.isCollected = false;
							this.$message.success('取消收藏成功')
						} else {
							this.$message.error(res.data.msg)
						}
					}).catch(err => {
						console.log(err)
					})
				}
			}
		},
		computed: {
			isLogin() {
				if(this.$store.getters.isLogin === 1 && this.skuData.length === 0) {
					this.getSkuData()
				}
				return this.$store.getters.isLogin;
			},
			totalPrice() {
				return this.baseNum * this.basePrice + this.singleTotalPrice + this.serviceTotalPrice + this.activityTotalPrice;
			},
			singleTotalPrice() {
				return this.singleNum * this.singlePrice;
			},
			serviceTotalPrice() {
				let totalPrice = 0;
				for(let i = 0; i < this.serviceList.length; i++) {
					totalPrice += (this.serviceList[i].servicePrice * this.serviceList[i].serviceNum);
				}
				return totalPrice;
			},
			activityTotalPrice() {
				let totalPrice = 0;
				for(let i = 0; i < this.activityList.length; i++) {
					totalPrice += (this.activityList[i].servicePrice * this.activityList[i].activityNum);
				}
				return totalPrice;
			},
		},
		mounted() {
			
		},
		created() {
			this.wareId = this.$route.query.id;
			this.skuDate = this.$moment().format('YYYY-MM-DD');
			if(this.wareId) {
				this.getWareDetail()
				this.getWareAttribute()
			}
			document.addEventListener('scroll', this.scrollEvent)
		},
		beforeDestroy() {
			document.removeEventListener('scroll', this.scrollEvent)
		}
	}
</script>
<style scoped lang="scss">
	$color: #009ce8;
	.ware-detail-wrap {
		display: flex;
		justify-content: space-between;
		margin-top: 30px;
		@at-root .ware-detail-l {
			width: 570px;
		}
		@at-root .ware-detail-r {
			width: 600px;
			.ware-detail-item {
				margin: 15px 0;
				label {
					width: 90px;
				}
			}
			.ware-code {
				display: flex;
				padding-bottom: 10px;
				border-bottom: 1px solid #ddd;
			}
			.ware-name {
				h2 {
					font-size: 24px;
					font-weight: normal;
				}
			}
			.collection {
				display: flex;
				justify-content: space-between;
				padding: 5px 10px;
				background: #f5f5f5;
				.ware-price {
					line-height: 24px;
					.price {
						color: #c60c1a;
					}
				}
				.ware-price-hidden {
					padding: 0 10px;
					line-height: 24px;
					color: #FF6701;
					border: 1px dashed #41A9FE;
				}
				.collect-button {
					color: #c60c1a;
					font-size: 14px;
					padding: 3px 15px;
					border: 1px solid #c60c1a;
					background: transparent;
					i {
						margin-right: 5px;
					}
				}
			}
			.ware-trip {
				.trip-list {
					margin-top: 10px;
					li {
						display: inline-block;
						height: 24px;
						margin: 0 7px 10px 0;
						line-height: 24px;
						span {
							display: inline-block;
							height: 24px;
							line-height: 24px;
							padding: 0 5px;
							vertical-align: middle;
						}
						.trip-day {
							font-size: 12px;
							color: #fff;
							background: $color;
						}
						.trip-name {
							padding: 0 10px;
							margin-left: -4px;
							margin-right: 3px;
							border: 1px solid #ccc;
							border-left: 0;
						}
					}
				}
			}
			.ware-feature {
				display: flex;
				.feature-list {
					li {
						display: inline-block;
						line-height: 1;
						padding-right: 10px;
						margin-right: 10px;
						border-right: 1px solid #ccc;
						&:last-child {
							margin-right: 0;
							padding-right: 0;
							border-right: 0;
						}
					}
				}
			}
		}
	}
	.ware-service {
		margin: 30px 0;
		border: 1px solid #ddd;
		.service-header {
			display: flex;
			justify-content: space-between;
			padding: 15px;
			border-bottom: 1px solid #ddd;
			> div {
				display: flex;
				margin-right: 15px;
				line-height: 30px;
				&:last-child {
					margin-right: 0;
				}
				label {
					margin-right: 10px;
				}
			}
			.service-date {
				.date-picker {
					width: 150px;
					height: 30px;
					padding: 0 10px;
					border: 1px solid #ddd;
					background: transparent;
				}
			}
			.total-price {
				.price {
					color: #c60c1a;
					font-size: 18px;
					font-weight: bolder;
					i {
						font-size: 14px;
					}
				}
			}
		}
		.service-body {
			min-height: 100px;
			padding: 20px 15px;
			.title {
				display: inline-block;
				margin-right: 20px;
				font-size: 16px;
				vertical-align: top;
			}
			.service-content {
				display: inline-block;
				width: 1000px;
				.additional-service {
					position: relative;
					.service-list {
					}
				}
				.single-content {
					position: relative;
					.single-desc {
						display: flex;
					}
				}
				.service-label {
					position: absolute;
					top: 15px;
					left: 0;
					padding: 2px 5px;
					color: #41AAFF;
					border: 1px solid #41AAFF;
				}
				.service-item {
					display: flex;
					justify-content: space-between;
					padding: 10px 15px 10px 100px;
					border-bottom: 1px solid #ddd;
					> div {
						line-height: 32px;
					}
					.service-name {
						width: 240px;
					}
					.service-price {
						width: 240px;
					}
					.el-input-number {
						line-height: 29px;
					}
					.price {
						color: #c60c1a;
					}
					.total-price {
						flex: 1;
						text-align: right;
					}
				}
			}
		}
	}
	.reserve-button {
		padding: 6px 30px;
		color: #fff;
		font-size: 14px;
		font-family: 'Microsoft Yahei';
		background: $color;
	}
	.ware-desc-tabs {
		margin-bottom: 50px;
		border: 1px solid #ddd;
		@at-root .tabs-header {
			background: #f5f7fa;
			&.fixed {
				position: fixed;
				top: 0;
				left: 50%;
				z-index: 999;
				width: 1200px;
				margin-left: -600px;
				border: 1px solid #ddd;
				border-bottom-width: 0;
				.reserve-button {
					display: block;
				}
			}
			.tabs-nav {
				display: flex;
				height: 42px;
				border-bottom: 1px solid #ccc;
				li {
					padding: 10px 20px;
					&:last-child {
						margin-right: 0;
					}
					&.active {
						position: relative;
						top: 1px;
						border: 1px solid #ddd;
						border-top-width: 0;
						border-bottom-color: #fff;
						background: #fff;
						&:first-child {
							border-left-width: 0;
						}
						a {
							color: #20a0ff;
						}
					}
					a {
						display: block;
						color: #444;
						font-size: 16px;
					}
				}
			}
			.reserve-button {
				display: none;
				position: absolute;
				top: 5px;
				right: 20px;
				transition: all .3s;
			}
		}
		@at-root .tabs-content {
			padding: 20px;
			margin-top: 42px;
			.tabs-content-pane {
				margin-bottom: 30px;
				&:last-child {
					padding-bottom: 50px;
				}
			}
			.tabs-content-title {
				display: inline-block;
			  width: 55px;
			  height: 55px;
			  padding: 5px;
			  text-align: center;
				margin-right: 20px;
				color: #fff;
				font-size: 16px;
				font-weight: normal;
				vertical-align: top;
				background: #6bc2fa;
			}
			.tabs-content-detail {
				display: inline-block;
				width: 1050px;
			}
		}
	}	
</style>