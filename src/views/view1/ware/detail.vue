<template>
	<div class="container">
		<div class="ware-detail-wrap">
			<div class="ware-detail-l">
				<el-carousel height="320px">
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
					@dayClick="dayClick"
					@prevMonth="handlePrevMonth"
					@nextMonth="handleNextMonth">
				</price-calendar>
			</div>
			<div class="ware-detail-r">
				<div class="ware-detail-item ware-code">
					<label for="">产品编号：</label>
					<p>{{wareDetail.id}}</p>
				</div>
				<div class="ware-detail-item ware-name">
					<h2>{{wareDetail.wareName}}</h2>
				</div>
				<div class="ware-detail-item collection">
					<button class="collect-button"><i class="el-icon-star-off"></i>收藏</button>
				</div>
				<div class="ware-detail-item ware-trip">
					<label for="">日程概述：</label>
					<ul class="trip-list">
						<li v-for="(item, index) in wareDetail.customerWareTripDetailDos">
							<span class="trip-day">D{{index+1}}</span>
							<span class="trip-name">{{item.programTitle}}</span>
							<i v-if="index < wareDetail.customerWareTripDetailDos.length - 1" class="el-icon-arrow-right">	</i>
						</li>
					</ul>
				</div>
				<div class="ware-detail-item ware-feature">
					<label for="">产品特色：</label>
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
					<label for="" class="date-label">服务日期：</label>
					<input type="text" v-model="selectedDay" class="date-picker" placeholder="请选择出发日期" disabled>
				</div>
				<div class="base-number">
					<label for="">基础套餐：</label>
					<el-input-number v-model="baseNum" @change="handleChange" :min="1" :max="10"></el-input-number>
				</div>
				<div class="total-price">
					<label>总价：</label>
					<p class="price"><i class="icon-rmb">￥</i><span>{{totalPrice}}</span></p>
				</div>
				<div class="reserve">
					<button class="reserve-button">立即预定</button>
				</div>
			</div>
			<div class="service-body">
				<h4 class="title">可额外选购</h4>
				<div class="service-content">
					<label for="">附加项</label>
					<ul class="service-list">
						<li v-for="item in serviceList" :key="item.id">
							<span>{{item.wareName}}</span>
							<span>{{item.wareSkuInfos[0].adultPrice}}</span>
							<el-input-number v-model="baseNum" @change="handleChange" :min="1" :max="10"></el-input-number>
							<span>0</span>
						</li>
					</ul>
				</div>
				<div class="single-content">
					<label for="">附加项</label>
					<div>
						<span>单人差数</span>
						<span>{{singlePrice}}</span>
						<el-input-number v-model="baseNum" @change="handleChange" :min="1" :max="10"></el-input-number>
						<span>0</span>
					</div>
				</div>
			</div>
		</div>
		<div class="ware-desc-tabs">
			<div ref="tabsHeader" class="tabs-header" :class="{fixed : isTabFixed}">
				<ul class="tabs-nav">
					<li v-for="(item, index) in  attributeList" :key="index" :class="{active : index === tabActive}" @click="tabClick(index)">
						<a href="javascript:;">{{attributeName[item.title]}}</a>
					</li>
				</ul>
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
	import { wareDetail, wareAttribut, wareSkuOfMonth, wareResource, createWareCollection, cancelWareCollection } from '@/api'
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
				singleNum: 0,
				singlePrice: 0,
				serviceList: [],
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
			}
		},
		methods: {
			handleChange() {

			},
			dayClick(cell) {
				if(cell.data) {
					console.log(cell.data)
					this.basePrice = cell.data.adultPrice;
					this.singlePrice = cell.data.singlePrice;
					this.selectedDay = cell.date;
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
				let length = panes.length - 1;
				for(let i = 0; i < panes.length; i++) {
					panesTop[i] = panes[i].offsetTop - 42;
				}
				length >= 0 && panesTop.push(panesTop[length] + panes[length].clientHeight)
				this.panesTop = panesTop;
			},
			scrollEvent() {
				this.tabTop = this.$refs.tabsContent.offsetTop - 84;
				// console.log('tabTop-----'+this.tabTop)
				// console.log('scrollTop-----'+document.body.scrollTop)
				this.isTabFixed = document.body.scrollTop >= this.tabTop ? true : false;
				this.panesTop.length === 0 && this.getTabPanesTop();
				for(let i = 0; i < this.panesTop.length; i++) {
					if(this.panesTop[i] <= document.body.scrollTop && this.panesTop[i+1] > document.body.scrollTop) {
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
					console.log(res)
						if(res.data.status === 1) {
							// res.data.data.currentMonthSku.splice(0, date)
							this.skuData = res.data.data.currentMonthSku;
							this.endDate = res.data.data.sellSkuPeriod.maxDate;
							// let  = res.data.data.currentMonthSku;
							// skuData.map(d => d.skuDate).sort((a, b) => {
							// 	return a > b;
							// })
							// this.skuData = skuData;
						}
					}).catch(err => {
						console.log(err)
					})
			},
			getWareDetail() {
				let data = {
					id: this.wareId
				}
				wareDetail(data).then(res => {
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
				wareResource(data).then(res => {
					if(res.data.status === 1) {
						console.log(res.data.data)
						this.serviceList.push(res.data.data.serviceInfo)
					} else {
						this.$message.error(res.data.msg)
					}
				})
			},
		},
		computed: {
			totalPrice() {
				return this.baseNum * this.basePrice + this.singleNum * this.singlePrice;
			}
		},
		mounted() {
			document.addEventListener('scroll', this.scrollEvent)
		},
		created() {
			this.wareId = this.$route.query.id;
			if(this.wareId) {
				this.skuDate = this.$moment().format('YYYY-MM-DD');
				this.getSkuData()
				this.getWareDetail()
				this.getWareAttribute()
			}
		},
		beforeDestroy() {
			document.removeEventListener('scroll', this.scrollEvent)
		}
	}
</script>
<style scoped lang="scss">
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
				justify-content: flex-end;
				padding: 5px 10px;
				background: #f5f5f5;
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
							background: #c60c1a;
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
	.el-input-number {
		width: 130px;
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
					height: 30px;
					padding: 0 10px;
				}
			}
			.base-number {
				line-height: 30px;
				.el-input-number {
					width: 130px;
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
			.reserve {
				.reserve-button {
					padding: 6px 30px;
					color: #fff;
					font-size: 14px;
					font-family: 'Microsoft Yahei';
					background: #c60c1a;
				}
			}
		}
		.service-body {
			padding: 15px;
		}
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
					/*&:hover {
						border-bottom: 3px solid #41AAFF;
					}*/
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