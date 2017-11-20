<template>
	<section>
		<div class="banner" v-loading="loading">
			<el-carousel indicator-position height="880px">
		    <el-carousel-item v-for="(item, index) in bannerList" :key="index">
		      <router-link :to='item.url+"&&wareName="+item.wareName+"&wareImg="+item.imgUrl' target="_blank">
		      	<img :src="item.imgUrl" :alt="item.wareName">
		      </router-link>
		    </el-carousel-item>
		  </el-carousel>
		</div>
		<div class="main">
			<div class="container">
				<div class="photo-section">
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
							<div class="recommend-wrap">
								<ul ref="recommend" class="recommend-list clearfix" v-bind:style="{ width: recomendSlideNum * 100 +'%'}">
									<li v-for="item in recommendList">
										<router-link to="/">
											<img :src="item.imgUrl">
											<p class="item-name ellipsis">{{item.name}}</p>
										</router-link>
									</li>
								</ul>
							</div>
							<div class="switch-button">
								<i class="icon prev" @click="imageSlide(-1)"></i>
								<i class="icon next" @click="imageSlide(+1)"></i>
							</div>
						</div>
						<div class="product-show">
							<ul class="product-tab">
								<li class="tab" :class="{active: tabActive === 0}" @click="changeTabActive(0)">
									<div class="title">
										<h2>本地拍摄</h2>
										<h4 class="uppercase">GLOBAL TRAVEL DESTINATIONS</h4>
										<div class="line"></div>
									</div>
								</li>
								<li class="tab" :class="{active: tabActive === 1}" @click="changeTabActive(1)">
									<div class="title">
										<h2>全球旅拍</h2>
										<h4 class="uppercase">GLOBAL TRAVEL DESTINATIONS</h4>
										<div class="line"></div>
									</div>
								</li>
								<li class="tab" :class="{active: tabActive === 2}" @click="changeTabActive(2)">
									<div class="title">
										<h2>蜜月旅游</h2>
										<h4 class="uppercase">GLOBAL TRAVEL DESTINATIONS</h4>
										<div class="line"></div>
									</div>
								</li>
							</ul>
							<div class="product-list">
								<ul v-show="tabActive === 0" class="clearfix">
									<li class="product-item" v-for="item in products.photo" :index="item.id">
										<router-link to="/">
											<img :src="item.imgUrl" class="responsive-img">
											<i class="icon iocn-tag native"></i>
											<p class="item-name">{{item.name}}</p>
										</router-link>
									</li>
								</ul>
								<ul v-show="tabActive === 1" class="clearfix">
									<li class="product-item" v-for="item in products.global" :index="item.id">
										<router-link to="/">
											<img :src="item.imgUrl" class="responsive-img">
											<i class="icon iocn-tag photo"></i>
											<p class="item-name">{{item.name}}</p>
										</router-link>
									</li>
								</ul>
								<ul v-show="tabActive === 2" class="clearfix">
									<li class="product-item" v-for="item in products.travel" :index="item.id">
										<router-link to="/">
											<img :src="item.imgUrl" class="responsive-img">
											<i class="icon iocn-tag travel"></i>
											<p class="item-name">{{item.name}}</p>
										</router-link>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
				<div class="mv-section">
					<div class="title">
						<h2>微电影MV</h2>
						<h4 class="uppercase">GLOBAL TRAVEL DESTINATIONS</h4>
						<div class="line"></div>
					</div>
					<div class="mv-container">
						<video id="yueVideo" ref="yueVideo" class="yue-video" controls :poster="currMv.poster"  @play="handlePlay" @pause="handlePause">
			        <source id="videoSource" :src="currMv.source" type="video/mp4">
			      </video>
			      <div class="video-panel" @click="handlePlayed">
			      	<i v-show="!videoPlayed" class="play-button"></i>
			      </div>
					</div>
					<div class="mv-text">
						<div class="logo">
							<i class="icon yue-logo"></i>
						</div>
						<div class="text">
							<h2>拒绝套路<span>|</span>量身打造<span>|</span>真实情感<span>|</span>全程跟拍<span>|</span>顶级后期</h2>
							<h4>GLOBAL TRAVEL DESTINATIONS</h4>
						</div>
						<div class="arrow">
							<i class="icon arrow-down"></i>
						</div>
					</div>
					<div class="mv-more">
						<p class="more">
							<router-link to="/">更多推荐>></router-link>
						</p>
						<ul class="more-list">
							<li class="mv-item" v-for="item in mvList" :class="{active: item.id === currMv.id}">
								<img :src="item.poster">
								<i class="play-button" @click="videoSwitch(item)"></i>
							</li>
						</ul>
					</div>
				</div>
				<div class="travel-section">
					<div class="title">
						<h2>12项高端旅游定制</h2>
						<h4 class="uppercase">GLOBAL TRAVEL DESTINATIONS</h4>
						<div class="line"></div>
					</div>
					<div class="content">
						<ul class="travel-list clearfix">
							<li class="icon"></li>
							<li class="icon"></li>
							<li class="icon"></li>
							<li class="icon"></li>
							<li class="icon"></li>
							<li class="icon"></li>
							<li class="icon"></li>
							<li class="icon"></li>
							<li class="icon"></li>
							<li class="icon"></li>
							<li class="icon"></li>
							<li class="icon"></li>
						</ul>
					</div>
				</div>
				<div class="map-section">
					<div class="title">
						<h2>悦视觉全球蜜月旅拍</h2>
						<h2>在24个国家50个目的地开设常驻摄影机构</h2>
						<h4>GLOBAL TRAVEL DESTINATIONS</h4>
						<div class="line"></div>
					</div>
					<div class="content">
						<img src="../assets/img/map.png" class="responsive-img">
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
				videoPlayed: false,
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
					{ id: 29, name: '维也纳', href: '/', row: 3 },
					{ id: 30, name: '维也纳', href: '/', row: 3 },
				],
				recommendList: [
					{ id: '20171115001', name: '阿联酋迪拜旅拍婚纱摄影4天3晚套系', imgUrl: 'http://fileServer.yueshijue.com/fileService/uploads/2017/11/01/415095049872238.jpg',},
					{ id: '20171115002', name: '阿联酋迪拜旅拍婚纱照一天套系', imgUrl: 'http://fileServer.yueshijue.com/fileService/uploads/2017/11/01/415095301943684.jpg',},
					{ id: '20171115003', name: '阿联酋迪拜3天2晚旅拍婚纱摄影套系', imgUrl: 'http://fileServer.yueshijue.com/fileService/uploads/2017/11/06/415099541207583.jpg',},
					{ id: '20171115004', name: '阿联酋迪拜3天2晚旅拍婚纱摄影套系', imgUrl: 'http://fileServer.yueshijue.com/fileService/uploads/2017/11/06/415099541207583.jpg',},
					{ id: '20171115005', name: '阿联酋迪拜旅拍婚纱摄影4天3晚套系', imgUrl: 'http://fileServer.yueshijue.com/fileService/uploads/2017/11/01/415095049872238.jpg',},
					{ id: '20171115006', name: '阿联酋迪拜旅拍婚纱照一天套系', imgUrl: 'http://fileServer.yueshijue.com/fileService/uploads/2017/11/01/415095301943684.jpg',},
					{ id: '20171115001', name: '阿联酋迪拜旅拍婚纱摄影4天3晚套系', imgUrl: 'http://fileServer.yueshijue.com/fileService/uploads/2017/11/01/415095049872238.jpg',},
					{ id: '20171115007', name: '阿联酋迪拜3天2晚旅拍婚纱摄影套系', imgUrl: 'http://fileServer.yueshijue.com/fileService/uploads/2017/11/06/415099541207583.jpg',},
					{ id: '20171115002', name: '阿联酋迪拜旅拍婚纱照一天套系', imgUrl: 'http://fileServer.yueshijue.com/fileService/uploads/2017/11/01/415095301943684.jpg',},
				],
				tabActive: 1,
				imgSlideNum: 0,
				products: {
					photo: [
						{
							id: 20171116201,
							name: '阿联酋迪拜3天2晚旅拍婚纱摄影套系',
							imgUrl: 'http://fileServer.yueshijue.com/fileService/uploads/2017/11/06/415099541207583.jpg',
						},
						{
							id: 20171116202,
							name: '上海旅拍婚纱摄影1天套系',
							imgUrl: 'http://fileServer.yueshijue.com/fileService/uploads/2017/11/07/415100215997889.jpg',
						},
						{
							id: 20171116102,
							name: '马尔代夫玛娜法鲁岛旅拍婚纱照6天4晚',
							imgUrl: 'http://fileServer.yueshijue.com/fileService/uploads/2017/11/04/415097792405875.jpg'
						},
					],
					global: [
						{
							id: 20171116101,
							name: '阿联酋迪拜旅拍婚纱摄影4天3晚套系',
							url: '',
							imgUrl: 'http://fileServer.yueshijue.com/fileService/uploads/2017/11/01/415095049872238.jpg'
						},
						{
							id: 20171116102,
							name: '马尔代夫玛娜法鲁岛旅拍婚纱照6天4晚',
							imgUrl: 'http://fileServer.yueshijue.com/fileService/uploads/2017/11/04/415097792405875.jpg'
						},
						{
							id: 20171116103,
							name: '马尔代夫曼德芙仕岛旅拍婚纱照6天4晚套系',
							imgUrl: 'http://fileServer.yueshijue.com/fileService/uploads/2017/11/04/415097797422734.jpg'
						},
						{
							id: 20171116104,
							name: '圣托里尼旅拍婚纱摄影9天7晚套系',
							imgUrl: 'http://fileServer.yueshijue.com/fileService/uploads/2017/11/04/415097832020875.jpg'
						},
						{
							id: 20171116105,
							name: '马尔代夫阿雅达岛旅拍婚纱照6天4晚',
							imgUrl: 'http://fileServer.yueshijue.com/fileService/uploads/2017/11/04/415097805508655.jpg'
						},
						{
							id: 20171116106,
							name: '苏梅岛旅拍婚纱摄影6天4晚套系',
							imgUrl: 'http://fileServer.yueshijue.com/fileService/uploads/2017/11/04/415097847306484.jpg'
						},
						{
							id: 20171116107,
							name: '法国巴黎旅拍婚纱摄影8天6晚套系',
							imgUrl: 'http://fileServer.yueshijue.com/fileService/uploads/2017/11/04/415097857190947.jpg'
						},
						{
							id: 20171116108,
							name: '捷克布拉格旅拍婚纱摄影7天5晚套系',
							imgUrl: 'http://fileServer.yueshijue.com/fileService/uploads/2017/11/04/415097868660247.jpg'
						},
						{
							id: 20171116109,
							name: '马尔代夫神仙珊瑚岛旅拍婚纱照6天4晚',
							imgUrl: 'http://fileServer.yueshijue.com/fileService/uploads/2017/11/04/415097773489411.jpg'
						},  
					],
					travel: [
						{
							id: 20171116301,
							name: '新西兰皇后镇旅拍婚纱照一天套系',
							imgUrl: 'http://fileServer.yueshijue.com/fileService/uploads/2017/11/01/415095236434522.jpg',
						},
						{
							id: 20171116302,
							name: '法国普罗旺斯旅拍婚纱照一天套系',
							imgUrl: 'http://fileServer.yueshijue.com/fileService/uploads/2017/11/01/415095270295456.jpg',
						},
						{
							id: 20171116301,
							name: '马尔代夫阿雅达岛旅拍婚纱照一天套系',
							imgUrl: 'http://fileServer.yueshijue.com/fileService/uploads/2017/11/02/415095965326664.jpg',
						}
					],
				},
			  currMv: {},
				mvList: [
					{
						id: '20171117101',
						name: 'mv1',
						poster: 'http://fileserver.yueshijue.com/fileService/uploads/2017/11/15/15107121027842.jpg',
						source: 'http://1254456297.vod2.myqcloud.com/2f3b5ff4vodtransgzp1254456297/3388b0459031868223334457147/v.f20.mp4',
					},
					{
						id: '20171117102',
						name: 'mv2',
						poster: 'http://fileserver.yueshijue.com/fileService/uploads/2017/11/15/15107121263773.jpg',
						source: 'http://1254456297.vod2.myqcloud.com/2f3b5ff4vodtransgzp1254456297/fb24bb029031868223371331575/v.f30.mp4',
					},
					{
						id: '20171117103',
						name: 'mv3',
						poster: 'http://fileServer.yueshijue.com/fileService/uploads/2017/11/04/415097868660247.jpg',
						source: 'http://1254456297.vod2.myqcloud.com/2f3b5ff4vodtransgzp1254456297/bd6d303b9031868223502407514/v.f20.mp4'
					},
					{
						id: '20171117104',
						name: 'mv4',
						poster: 'http://fileServer.yueshijue.com/fileService/uploads/2017/11/04/415097773489411.jpg',
						source: 'http://1254456297.vod2.myqcloud.com/2f3b5ff4vodtransgzp1254456297/3388b0459031868223334457147/v.f40.mp4',
					}, 
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
			imageSlide(val) {
				this.imgSlideNum += val;
				if(this.imgSlideNum <= 0) {
					this.imgSlideNum = 0
				} else if(this.imgSlideNum >= (this.recomendSlideNum - 1)) {
					this.imgSlideNum = this.recomendSlideNum - 1
				}
				this.$refs.recommend.style.left = -(this.imgSlideNum * 100)+ '%';
			},
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
			changeTabActive(val) {
				this.tabActive = val;
			},
			handlePlay () {
				this.videoPlayed = true;
			},
			handlePause () {
				this.videoPlayed = false;
			},
			handlePlayed() {
				let yueVideo = this.$refs.yueVideo;
				if(!(yueVideo && yueVideo.readyState)) {
					this.$message('该视频暂无法播放')
					return;
				}
				yueVideo.paused ? yueVideo.play() : yueVideo.pause()
			},
			videoSwitch(video) {
				this.currMv = video;
				let yueVideo = this.$refs.yueVideo;
				let videoTop = document.querySelector('.mv-section').offsetTop;
				yueVideo.load();
				yueVideo.play();
				window.scrollTo(0, videoTop);
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
			autoImgSlide() {
				this.imgSlideNum += 1;
				this.imgSlideNum = this.imgSlideNum >= this.recomendSlideNum ? 0 : this.imgSlideNum
				document.querySelector('.recommend-list').style.left = -(this.imgSlideNum * 100)+ '%';
			}
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
			recomendSlideNum() {
				return Math.ceil(this.recommendList.length / 3);
			}
		},
		mounted() {
			this.getBannerList()
			this.getImgList()
			this.currMv = this.mvList[0];
			let timer = setInterval(() => {
				this.autoImgSlide()
			}, 3000)
			document.querySelector('.recommend-wrap').addEventListener('mouseenter', (e) => {
				clearInterval(timer)
			});
			document.querySelector('.recommend-wrap').addEventListener('mouseleave', (e) => {
				timer = setInterval(() => {
					this.autoImgSlide()
				}, 3000)
			});
		}
	}
</script>
<style scoped lang="scss">
	.banner {
		width: 100%;
		overflow: hidden;
	}
  .main {
  	color: #fff;
  	background: #212121;
  }
  .title {
		padding: 30px;
		text-align: center;
		h2 {
			margin: 15px 0;
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
	.photo-section {
		margin: 15px 0;
		padding: 15px 0;
  	text-align: center;
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
					background: #f0f0f0;
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
				position: relative;
				.more {
					margin: 12px 0;
					text-align: right;
					a {
						color: #e50110;
					}
				}
				.switch-button {
					position: absolute;
					top: 40%;
					left: 0;
					width: 100%;
					height: 1px;
					.icon {
						position: absolute;
						top: 40%;
				    width: 32px;
				    height: 57px;
				    cursor: pointer;
						&.prev {
							left: -50px;
							background-position: -138px -59px;
						}
						&.next {
							right: -50px;
							background-position: -106px -59px;
						}
					}
				}
				.recommend-wrap {
					position: relative;
					overflow: hidden;
					width: 100%;
					height: 221px;
				}
				.recommend-list {
					position: absolute;
					top: 0;
					left: 0;
					height: 221px;
					transition: all .8s;
					li {
						float: left;
						width: 394px;
						margin-right: 9px;
						overflow: hidden;
						cursor: pointer;
						position: relative;
						&:nth-child(3n) {
							margin-right: 0;
						}
						&:hover {
							.item-name {
								bottom: 0;
								background: #e50110;
							}
						}
						img {
							display: block;
							width: 100%;
							height: auto;
						}
						.item-name {
							position: absolute;
							bottom: -45px;
							width: 100%;
							padding: 10px 12px;
							text-align: left;
							font-size: 16px;
							color: #fff;
							background: transparent;
							transition: all .3s;
						}
					}
				}
			}
			
		}
		.product-show {
			margin: 50px 0;
			.product-tab {
				display: flex;
				.tab {
					flex: 1;
					cursor: pointer;
					background: #434343;
					&.active {
						background: #c60c1a;
						.line {
							background: #fff;
						}
					}
				} 
			}
			.product-list {
				.product-item {
					float: left;
					width: 394px;
					margin-top: 9px;
					margin-right: 9px;
					position: relative;
					&:nth-child(3n) {
						margin-right: 0;
					}
					&:hover {
						.item-name {
							background: #c60c1a;
						}
					}
					img {
						height: 221px;
					}
					.iocn-tag {
				    position: absolute;
				    top: 0;
				    right: 0;
				    width: 66px;
				    height: 66px;
						&.native {
							background-position: -66px -119px;
						}
						&.photo {
							background-position: -132px -119px;
						}
						&.travel {
							background-position: 0 -119px;
						}
					}
					.item-name {
						padding: 10px 15px;
						text-align: left;
						color: #fff;
						font-size: 16px;
						background: #414141;
						transition: all .3s;
					}
				}
			}
		}
	}
	.mv-section {
		.mv-container {
			position: relative;
	  	.yue-video {
				width: 100%;
				height: 100%;
				object-fit: cover;
			}
			.play-button {
				width: 66px;
				height: 66px;
			}
	  }
	  .video-panel {
	  	position: absolute;
	  	top: 0;
	  	left: 0;
	  	width: 100%;
	  	height: 88%;
	  	.play-button {
	  		top: 12%;
	  	}
	  }
	  .play-button {
			position: absolute;
			top: 0;
			bottom: 0;
			right: 0;
			left: 0;
			margin: auto;
			width: 48px;
			height: 48px;
			background: url(../assets/img/play_button.png) no-repeat center;
			background-size: cover;
			cursor: pointer;
		}
	  .mv-text {
	  	margin: 30px 0;
	  	text-align: center;
	  	.logo {
	  		margin: 15px auto;
	  		.yue-logo {
			    width: 35px;
			    height: 35px;
	  			background-position: -58px -185px;
	  		}
	  	}
	  	.text {
	  		h2 {
	  			margin: 15px 0;
	  			font-size: 18px;
	  			font-weight: bold;
	  			letter-spacing: 2px;
	  			span {
	  				margin: 0 3px;
	  				font-weight: normal;
	  			}
	  		}
	  	}
	  	.arrow {
	  		margin-top: 20px;
	  		.arrow-down {
			    width: 21px;
			    height: 20px;
		  		background-position: -182px -61px;
	  		}
	  	}
	  }
	  .mv-more {
	  	.more {
	  		margin: 12px 0;
	  		text-align: right;
	  		a {
	  			color: #e50110;
	  		}
	  	}
	  	.more-list {
		  	display: flex;
		  	.mv-item {
		  		width: 291px;
		  		height: 164px;
		  		margin-right: 12px;
		  		position: relative;
		  		&.active {
		  			border: 1px solid #fff;
		  		}
		  		&:nth-child(4n) {
		  			margin-right: 0;
		  		}
		  		img {
		  			width: 100%;
		  			height: 100%;
		  		}
		  	}
		  }
	  }
	}
	.travel-section {
		margin: 50px 0;
		.travel-list {
			li {
				float: left;
				width: 191px;
				height: 200px;
				margin: 10px 10px 0 0;
				transition: all .3s;
				&:hover {
					transform: scale(1.03);
				}
				&:nth-child(6n) {
					margin-right: 0;
				}
				&:nth-child(1) {
					background-position: 0 -260px;
				}
				&:nth-child(2) {
					background-position: -191px -260px;
				}
				&:nth-child(3) {
					background-position: -383px -260px;
				}
				&:nth-child(4) {
					background-position: -575px -260px;
				}
				&:nth-child(5) {
					background-position: -767px -260px;
				}
				&:nth-child(6) {
					background-position: -959px -260px;
				}
				&:nth-child(7) {
					background-position: 0 -460px;
				}
				&:nth-child(8) {
					background-position: -191px -460px;
				}
				&:nth-child(9) {
					background-position: -383px -460px;
				}
				&:nth-child(10) {
					background-position: -575px -460px;
				}
				&:nth-child(11) {
					background-position: -767px -460px;
				}
				&:nth-child(12) {
					background-position: -959px -460px;
				}
			}
		}
	}
	.map-section {
		margin-bottom: 30px;
		.content {
			padding: 60px 0;
		}
	}
</style>