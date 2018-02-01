<template>
	<div class="container">
		<div class="ware-detail-wrap">
			<div class="ware-detail-l">
				<el-carousel height="320px">
          <el-carousel-item v-for="item in bannerList" :key="item.id">
            <img :src="item.filePath" alt=""> 
          </el-carousel-item>
        </el-carousel>
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
					<label for="">服务日期：</label>
					<input type="text" placeholder="请选择出发日期">
				</div>
				<div class="base-number">
					<label for="">基础套餐：</label>
					<el-input-number v-model="num1" @change="handleChange" :min="1" :max="10" label="描述文字"></el-input-number>
				</div>
				<div class="total-price">
					<label for="">总价</label>
					<p><i class="icon-rmb">￥</i><span>0</span></p>
				</div>
				<div class="reserve-button">
					<button>立即预定</button>
				</div>
			</div>
			<div class="service-body">
				<h4>可额外选购</h4>
				<ul class="service-list">
					<li></li>
				</ul>
			</div>
		</div>
		<div class="ware-desc-tabs">
			<div class="tabs-header">
				<ul class="tabs-nav">
					<li v-for="(item, index) in attributeList" :key="index">
						<a href="javascript:;">{{attributeName[item.title]}}</a>
					</li>
				</ul>
			</div>
			<div class="tabs-content">
				<div class="tabs-content-pane" v-for="(item, index) in attributeList">
					<h3 class="tabs-content-title">{{attributeName[item.title]}}</h3>
					<div class="tabs-content-detail" v-html="item.content"></div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import { wareDetail, wareAttribut, createWareCollection, cancelWareCollection } from '@/api'
	export default {
		data () {
			return {
				num1: 1,
				wareId: '',
				bannerList: [],
				wareDetail: {},
				wareAttribute: {},
				wareDescTitle: ['产品介绍', '产品参数', '费用说明', '费用包含', '预定须知', '自理费用','退改规则', '签证/签注'],
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
				attributeList: [],
				keyWords: [],
			}
		},
		methods: {
			handleChange() {

			},
			getWareDetail(wareId) {
				let data = {
					id: wareId
				}
				wareDetail(data).then(res => {
					if(res.data.status === 1) {
						 console.log(res.data.data)
						 this.wareDetail = res.data.data;
						 document.title = this.wareDetail.wareName;
						 this.keyWords = this.wareDetail.keyWords.split(',').splice(0,3);
						 this.bannerList = this.wareDetail.wareImgInfos;
					}
				})
			},
			getWareAttribute(wareId) {
				let data = {
					wareId
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
		},
		created() {
			this.wareId = this.$route.query.id;
			console.log(this.wareId)
			if(this.wareId) {
				this.getWareDetail(this.wareId)
				this.getWareAttribute(this.wareId)
			}
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
	.ware-service {
		.service-header {
			display: flex;
			> div {
				display: flex;
			}
		}
	}
	.ware-desc-tabs {
		margin-bottom: 50px;
		border: 1px solid #ddd;
		@at-root .tabs-header {
			background: #f5f7fa;
			.tabs-nav {
				display: flex;
				height: 42px;
				border-bottom: 1px solid #ccc;
				li {
					padding: 10px;
					margin-right: 20px;
					&:last-child {
						margin-right: 0;
					}
					a {
						display: block;
						color: #444;
						font-size: 16px;
					}
					&:hover {
						border-bottom: 3px solid #41AAFF;
					}
				}
			}
		}
		@at-root .tabs-content {
			padding: 20px;
			.tabs-content-pane {
			}
			.tabs-content-title {
				display: inline-block;
				padding: 8px;
			  /*width: 60px;
			  height: 60px;	
			  line-height: 1;*/
			  text-align: center;
				margin-right: 20px;
				color: #fff;
				letter-spacing: 2px;
				font-weight: normal;
				background: #6bc2fa;
			}
			.tabs-content-detail {
				display: inline-block;
			}
		}
	}
	
</style>