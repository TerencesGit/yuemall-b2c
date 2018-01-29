<template>
	<div class="container">
		<div class="ware-detail-wrap">
			<div class="ware-detail-l">
				<el-carousel height="280px">
          <el-carousel-item v-for="item in bannerList" :key="item.id">
            <img :src="item.filePath" alt=""> 
          </el-carousel-item>
        </el-carousel>
			</div>
			<div class="ware-detail-r">
				<div class="ware-code">
					<label for="">编号：</label>
					<p>{{wareDetail.id}}</p>
				</div>
				<div class="ware-name">
					<h2>{{wareDetail.wareName}}</h2>
				</div>
				<div class="trip-detail">
					<label for="">日程概述：</label>
					<ul>
						<li v-for="item in wareDetail.customerWareTripDetailDos">{{item.programTitle}}</li>
					</ul>
				</div>
				<div class="ware-feature">
					<label for="">产品特色：</label>
					<ul>
						<li v-for="item in keyWords">{{item}}</li>
					</ul>
				</div>
			</div>
		</div>
		<div class="ware-service">
			<div class="service-header">
				<div class="service-date">
					<label for="">基础套餐：</label>
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
		<div class="ware-desc"></div>
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
		}
	}
</style>