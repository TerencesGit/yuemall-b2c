<template>
	<section>
		<div class="banner" v-loading="loading">
			<el-carousel indicator-position height="600px">
		    <el-carousel-item v-for="(item, index) in bannerList" :key="index">
		      <router-link :to='item.url+"&&wareName="+item.wareName+"&wareImg="+item.imgUrl' :title="item.wareName" target="_blank">
		      	<img :src="item.imgUrl" :alt="item.wareName">
		      </router-link>
		    </el-carousel-item>
		  </el-carousel>
		</div>
		<div class="main">
			<div class="container">
				<div class="section1">
					<div class="title">
						<h2>全球100+旅拍目的地</h2>
						<h4 class="uppercase">GLOBAL TRAVEL DESTINATIONS</h4>
						<div class="line"></div>
					</div>
					<div class="destinations">
						<ul class="des-row">
							<li v-for="des in desRow1" :index="des.id">
								<router-link :to="des.href">{{des.name}}</router-link>
							</li>
						</ul>
						<ul class="des-row">
							<li v-for="des in desRow2" :index="des.id">
								<router-link :to="des.href">{{des.name}}</router-link>
							</li>
						</ul>
						<ul class="des-row">
							<li v-for="des in desRow3" :index="des.id">
								<router-link :to="des.href">{{des.name}}</router-link>
							</li>
						</ul>
					</div>
					<div class="product">
						<div class="recommend-row">	
							<div class="more">
								<router-link to="/">更多推荐>></router-link>
							</div>
							<ul class="recommend-list">
								<li v-for="item in recommendList">
									<img :src="item.imgUrl" alt="">
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>
<script>
	import { getBanners, getShowImgList } from '@/api'
	export default {
		data() {
			return {
				loading: false,
				bannerList: [],
				destinations: [
					{ id: 1, name: '丽江', href: '/', row: 1 },
					{ id: 2, name: '大理', href: '/', row: 1 },
					{ id: 3, name: '普吉岛', href: '/', row: 1 },
					{ id: 4, name: '巴厘岛', href: '/', row: 1 },
					{ id: 5, name: '马尔代夫', href: '/', row: 1 },
					{ id: 6, name: '巴黎', href: '/', row: 1 },
					{ id: 7, name: '圣托里尼', href: '/', row: 1 },
					{ id: 8, name: '罗马', href: '/', row: 1 },
					{ id: 9, name: '厦门', href: '/', row: 1 },
					{ id: 10, name: '北京', href: '/', row: 1 },
					{ id: 11, name: '上海', href: '/', row: 1 },
					
					{ id: 12, name: '高雄', href: '/', row: 2 },
					{ id: 13, name: '垦丁', href: '/', row: 2 },
					{ id: 14, name: '苏梅岛', href: '/', row: 2 },
					{ id: 15, name: '济州岛', href: '/', row: 2 },
					{ id: 16, name: '塞班岛', href: '/', row: 2 },
					{ id: 17, name: '新西兰', href: '/', row: 2 },
					{ id: 18, name: '墨尔本', href: '/', row: 2 },
					{ id: 19, name: '东京', href: '/', row: 2 },
					{ id: 20, name: '马来西亚', href: '/', row: 2 },
					{ id: 21, name: '意大利', href: '/', row: 2 },
					
					{ id: 22, name: '三亚', href: '/', row: 3 },
					{ id: 23, name: '大连', href: '/', row: 3 },
					{ id: 24, name: '青岛', href: '/', row: 3 },
					{ id: 25, name: '深圳', href: '/', row: 3 },
					{ id: 26, name: '布拉格', href: '/', row: 3 },
					{ id: 27, name: '西班牙', href: '/', row: 3 },
					{ id: 28, name: '维也纳', href: '/', row: 3 },
				],
				recommendList: [
					{ id: '20171115001', name: '日本东京旅拍婚纱照一天套系', imgUrl: 'http://fileServer.yueshijue.com/fileService/uploads/2017/11/01/415095265233560.jpg',},
					{ id: '20171115002', name: '日本东京旅拍婚纱照一天套系', imgUrl: 'http://fileServer.yueshijue.com/fileService/uploads/2017/11/01/415095265233560.jpg',},
					{ id: '20171115003', name: '日本东京旅拍婚纱照一天套系', imgUrl: 'http://fileServer.yueshijue.com/fileService/uploads/2017/11/01/415095265233560.jpg',},
				],
				hotImgList: [{
					url: '',
					imgUrl: '',
				},{
					url: '',
					imgUrl: ''
				}],
				hotSmallImgList: [{
					url: '',
					imgUrl: '',
				}],
				nationwideLargeImgList: [],
				nationwideImgList: [],
				overseasList: [{
					url: '',
					imgUrl: ''
				}],
				samplesImgList: [],
			}
		},
		methods: {
			getBannerList() {
				this.loading = true;
				getBanners().then(res => {
					this.loading = false;
					if(res.data.code === '0001') {
						this.bannerList = res.data.result.bannerList
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(err => {
					console.log(err)
					this.loading = false;
				})
			},
			getImgList() {
				getShowImgList().then(res => {
					// console.log(res)
					if(res.data.code === '0001') {
						let { hotImgList, hotSmallImgList, nationwideImgList, nationwideLargeImgList, overseasList, samplesImgList } = res.data.result;
						this.hotImgList = hotImgList;
						this.hotSmallImgList = hotSmallImgList;
						this.nationwideImgList = nationwideImgList;
						this.nationwideLargeImgList = nationwideLargeImgList;
						this.overseasList = overseasList;
						this.samplesImgList = samplesImgList;
					} else {
						this.$message.error(res.data.message)
					}
				})
			},
		},
		computed: {
			desRow1() {
				return this.destinations.filter(des => des.row === 1)
			},
			desRow2() {
				return this.destinations.filter(des => des.row === 2)
			},
			desRow3() {
				return this.destinations.filter(des => des.row === 3)
			},
		},
		created() {
			this.getBannerList()
			this.getImgList()
		}
	}
</script>
<style scoped lang="scss">
	.banner {
		width: 100%;
		overflow: hidden;
	}
  // .el-carousel__item {
  // 	a {
  // 		display: inline-block;
  // 		width: 100%;
  // 		height: 100%;
  // 	}
  // }
  .title {
		padding: 30px;
		h2 {
			font-size: 32px;
			letter-spacing: 2px;
		}
		h4 {
			margin: 15px 0;
			font-size: 12px;
		}
		.line {
			width: 50px;
			height: 2px;
			margin: auto;
			background: #c60c1a;
		}
	}
	.destinations {
		width: 100%;
		.des-row {
			display: flex;
			justify-content: center;
			margin-bottom: 15px;
			a {
				display: block;
				width: 105px;
				height: 30px;
				line-height: 30px;
				margin-left: 9px;
				color: #666;
				background: #ccc;
				border-radius: 5px;
				position: relative;
				&::before {
					content: '';
					position: absolute;
					top: 9px;
					left: 9px;
					width: 10px;
					height: 12px;
					background: url(../assets/img/coordinate.png) no-repeat center;
				}
				&:hover {
					color: #fff;
					background: #e50110;
					&::before {
						background: url(../assets/img/coordinate_hover.png) no-repeat center;
					}
				}
			}
		}
	}
	.product {
		margin: 50px 0;
		.recommend-row {
			.more {
				margin: 12px 0;
				text-align: right;
				a {
					color: #e50110;
				}
			}
		}
		.recommend-list {
			display: flex;
			li {
				flex: 1;
				margin-right: 9px;
				&:last-child {
					margin-right: 0;
				}
				img {
					display: block;
					width: 100%;
					height: auto;
				}
			}
		}
	}
  .main {
  	color: #fff;
  	background: #212121;
  	.section1 {
  		padding: 15px 0;
  		text-align: center;
  		
  	}
  }
</style>