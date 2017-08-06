<template>
	<section>
		<div class="main-wrap">
			<el-breadcrumb separator=">" class="breadcrumb-inner">
				<el-breadcrumb-item v-for="(item, index) in navList" :key="index">
					<router-link :to="item.url">{{ item.name }}</router-link>
				</el-breadcrumb-item>
			</el-breadcrumb>
			<div class="ware-main">
				<el-row :gutter="20">
					<el-col :span="12" class="ware-img">
						<el-carousel indicator-position height="280px">
					    <el-carousel-item v-for="(item, index) in wareImgList" :key="index">
					      <router-link :to="item.url" title="巴厘岛蜜月旅拍">
					      	<img :src="item.imgUrl">
					      </router-link>
					    </el-carousel-item>
					  </el-carousel>
					  <full-calendar 
				      :events="skuList" 
				      first-day='0' 
				      :selectedDay="selectedDay" 
				      @changeMonth="changeMonth" 
				      @dayClick="dayClick"
				      @eventClick="dayClick">
				    </full-calendar>
					</el-col>
					<el-col :span="12" class="ware-info">
						<div class="ware-desc">
							<div class="ware-name">
								<h2>{{ wareName }}</h2>
							</div>
							<div class="ware-price">
								<i class="fa fa-rmb">￥</i>
								<strong>12999</strong>/人起
								<span>新品上架</span>
							</div>
							<div class="ware-reserve">
								<span>预定须知</span>
								<span>提前预定</span>
								<span>建议提前30天预定</span>
							</div>
						</div>
						<div class="ware-choose">
							<div class="ware-daynum">
								<label>行程天数</label>
								<span>6天4晚游</span>
							</div>
							<div class="ware-date">
								<label>出发日期</label>
								<span>{{selectedDay || '2017-08-15'}}</span>
							</div>
							<div class="ware-adultnum">
								<label>成人数量</label>
								 <el-input-number size="small" :min="1" v-model="adultNum"></el-input-number>
							</div>
							<div class="ware-childnum">
								<label>儿童数量</label>
								 <el-input-number size="small" :min="0" v-model="childNum"></el-input-number>
							</div>
						</div>
					</el-col>
				</el-row>
			</div>
		</div>
	</section>
</template>
<script>
	export default {
		data() {
			return {
				navList: [
					{
						name: '旅游',
						url: '/'
					},
					{
						name: '亚洲旅游',
						url: '/oversea'
					},
					{
						name: '印度尼西亚',
						url: '/oversea'
					},
					{
						name: '巴厘岛',
						url: '/detail'
					},
				],
				wareImgList: [
					{
						title: '巴厘岛婚纱摄影',
						url: '/detail',
						imgUrl: 'http://www.fookvision.com/Public/Wwwfookvisioncom/images/activity/anniversary/pic_16.png'
					},
					{
						title: '圣托里尼婚纱摄影',
						url: '/detail',
						imgUrl: 'http://www.fookvision.com/Public/Wwwfookvisioncom/images/activity/anniversary/pic_18.png'
					},
					{
						title: '塞班岛婚纱摄影',
						url: '/detail',
						imgUrl: 'http://www.fookvision.com/Public/Wwwfookvisioncom/images/activity/anniversary/pic_22.png'
					},
					{
						title: '巴黎婚纱摄影',
						url: '/detail',
						imgUrl: 'http://www.fookvision.com/Public/Wwwfookvisioncom/images/activity/anniversary/pic_23.png'
					},
				],
				skuList: [
					{
						start: '2017-08-10',
						adultPrice: 12999,
						childPrice: 11990,
						storageNum: 1590
					},
					{
						start: '2017-08-11',
						adultPrice: 12999,
						childPrice: 11990,
						storageNum: 1590
					},
					{
						start: '2017-08-12',
						adultPrice: 12999,
						childPrice: 11990,
						storageNum: 1590
					},
					{
						start: '2017-08-13',
						adultPrice: 12999,
						childPrice: 11990,
						storageNum: 1590
					},
					{
						start: '2017-08-14',
						adultPrice: 12999,
						childPrice: 11990,
						storageNum: 1590
					},
					{
						start: '2017-08-15',
						adultPrice: 12999,
						childPrice: 11990,
						storageNum: 1590
					},
					{
						start: '2017-08-16',
						adultPrice: 12999,
						childPrice: 11990,
						storageNum: 1590
					},
					{
						start: '2017-08-17',
						adultPrice: 12999,
						childPrice: 11990,
						storageNum: 1590
					},
					{
						start: '2017-08-18',
						adultPrice: 12999,
						childPrice: 11990,
						storageNum: 1590
					},
					{
						start: '2017-08-19',
						adultPrice: 12999,
						childPrice: 11990,
						storageNum: 1590
					},
					{
						start: '2017-08-20',
						adultPrice: 12999,
						childPrice: 11990,
						storageNum: 1590
					},
					{
						start: '2017-08-21',
						adultPrice: 12999,
						childPrice: 11990,
						storageNum: 1590
					},
					{
						start: '2017-08-22',
						adultPrice: 12999,
						childPrice: 11990,
						storageNum: 1590
					},
					{
						start: '2017-08-23',
						adultPrice: 12999,
						childPrice: 11990,
						storageNum: 1590
					},
					{
						start: '2017-08-31',
						adultPrice: 12999,
						childPrice: 11990,
						storageNum: 1590
					},
					{
						start: '2017-09-01',
						adultPrice: 12999,
						childPrice: 11990,
						storageNum: 1590
					},
					{
						start: '2017-09-02',
						adultPrice: 12999,
						childPrice: 11990,
						storageNum: 1590
					},
					{
						start: '2017-09-03',
						adultPrice: 12999,
						childPrice: 11990,
						storageNum: 1590
					},
					{
						start: '2017-09-04',
						adultPrice: 12999,
						childPrice: 11990,
						storageNum: 1590
					},
				],
				selectedDay: '',
				wareName: '【巴厘岛蜜月旅拍婚纱摄影6天4晚游】一对一司导+接送机+一日全天拍摄+国际五星',
				adultNum: 1,
				childNum: 0
			}
		},
		methods: {
			changeMonth(e) {
				// console.log(e)
			},
			dayClick(day, event) {
				// console.log(day)
				this.selectedDay = day;
			}
		}
	}
</script>
<style scoped lang="scss">
	section {
		height: 100%;
		overflow: hidden;
		background: #f0f2f5;
	}
	.el-breadcrumb {
		margin: -10px 0 5px 5px;
		padding: 6px 0;
	} 
	.ware-main {
		padding: 15px;
		border: 1px solid #ddd;
		background: #fff
	}
	.ware-desc {
		div {
			margin: 20px 0;
		}
		.ware-price {
			padding: 10px 20px;
			font-size: 12px;
			color: #999;
			background: rgba(0,0,0,.1);
			i, strong {
				color: #f60;
			}
			strong {
				font-size: 30px
			}
			span {
				margin-left: 60px
			}
		}
		.ware-reserve {
			margin-top: 30px;
			padding-bottom: 30px;
			border-bottom: 1px dashed #ccc;
			span {
				margin-right: 30px;
				&:nth-child(2) {
					padding: 3px 5px;
					color: #fff;
					background: #f90
				}
			}
		}
	}
	.ware-choose {
		margin-top: 100px;
		> div {
			margin: 30px 0;
		}
		label {
			display: inline-block;
			width: 100px;
			color: #666
		}
		span {
			display: inline-block;
			width: 130px;
			padding: 3px 15px;
		}
		.ware-daynum {
			span {
				border: 1px solid #f90
			}
		}
		.ware-date {
			span {
				border: 1px solid #ccc
			}
		}
	}
</style>