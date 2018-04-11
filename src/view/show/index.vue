<template>
	<section>
		<div v-title :data-title="this.$route.name"></div>
		<div class="main">
			<div class="container">
				<div class="destination">
					<div class="title">
						<h2>全球100+旅拍目的地</h2>
						<h4 class="uppercase">GLOBAL TRAVEL DESTINATIONS</h4>
						<div class="line"></div>
					</div>
					<div class="des-rows">
						<ul class="des-row">
							<li v-for="des in desRow1" :index="des.id">
								<router-link :to='des.url !== "/" ? "show/detail?destination="+des.url : "/show"' :target="des.url === '/' ? '' : '_blank'">{{des.name}}</router-link>
							</li>
						</ul>
						<ul class="des-row">
							<li v-for="des in desRow2" :index="des.id">
								<router-link :to='des.url !== "/" ? "show/detail?destination="+des.url : "/show"' :target="des.url === '/' ? '' : '_blank'">{{des.name}}</router-link>
							</li>
						</ul>
						<ul class="des-row">
							<li v-for="des in desRow3" :index="des.id">
								<router-link :to='des.url !== "/" ? "show/detail?destination="+des.url : "/show"' :target="des.url === '/' ? '' : '_blank'">{{des.name}}</router-link>
							</li>
						</ul>
					</div>
				</div>
				<div class="recommend-section">
					<div class="recommend-title">
						<h3>热门推荐</h3>
					</div>
					<div class="recommend-list">
						<ul class="show-list clearfix">
							<li class="show-item" v-for="item in recommendList" :index="item.id">
								<router-link :to='"show/detail?destination="+item.url' target="_blank">
									<img :src="item.imgUrl" class="responsive-img">
									<p class="item-name">
										{{item.name}} 
										<span class="uppercase">{{item.englishName}}</span>
									</p>
								</router-link>
							</li>
						</ul>
					</div>
				</div>
				<div class="native-section">
					<div class="title has-line">
						<h2>国内作品</h2>
						<h4 class="uppercase">GLOBAL TRAVEL DESTINATIONS</h4>
						<div class="line"></div>
					</div>
					<div class="des-rows">
						<ul class="des-row">
							<li v-for="des in nativeDesRow1" :index="des.id">
								<router-link :to='des.url !== "/" ? "show/detail?destination="+des.url : "/show"'>{{des.name}}</router-link>
							</li>
						</ul>
						<ul class="des-row">
							<li v-for="des in nativeDesRow2" :index="des.id">
								<router-link :to='des.url !== "/" ? "show/detail?destination="+des.url : "/show"'>{{des.name}}</router-link>
							</li>
						</ul>
					</div>
					<div class="native-show">
						<ul class="show-list clearfix">
							<li class="show-item" v-for="des in nativeShow" :index="des.id">
								<router-link :to='des.url !== "/" ? "show/detail?destination="+des.url : "/show"'>
									<img :src="des.imgUrl" class="responsive-img">
									<!-- <i class="icon iocn-tag native"></i> -->
									<p class="item-name">
										{{des.name}} 
										<span class="uppercase">{{des.englishName}}</span>
									</p>
								</router-link>
							</li>
						</ul>
					</div>
				</div>
				<div class="oversea-section">
					<div class="title has-line">
						<h2>国外作品</h2>
						<h4 class="uppercase">GLOBAL TRAVEL DESTINATIONS</h4>
						<div class="line"></div>
					</div>
					<div class="des-rows">
						<ul class="des-row">
							<li v-for="des in overseaDesRow1" :index="des.id">
								<router-link :to='des.url !== "/" ? "show/detail?destination="+des.url : "/show"' :target="des.url === '/' ? '' : '_blank'">{{des.name}}</router-link>
							</li>
						</ul>
						<ul class="des-row">
							<li v-for="des in overseaDesRow2" :index="des.id">
								<router-link :to='des.url !== "/" ? "show/detail?destination="+des.url : "/show"' :target="des.url === '/' ? '' : '_blank'">{{des.name}}</router-link>
							</li>
						</ul>
					</div>
					<div class="recommend-list">
						<ul class="show-list clearfix">
							<li class="show-item" v-for="item in overseaShow" :index="item.id">
								<router-link :to='item.url !== "/" ? "show/detail?destination="+item.url : "/show"' :target="item.url === '/' ? '' : '_blank'">
									<img :src="item.imgUrl" class="responsive-img">
									<p class="item-name">
										{{item.name}} 
										<span class="uppercase">{{item.englishName}}</span>
									</p>
								</router-link>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>
<script>
	import { DstShowList } from '@/data'
	export default {
		data() {
			return {
				loading: false,
				bannerList: [],
				destinations: [],
			}
		},
		methods: {
			getBanners() {
				this.loading = true;
				getIndexBanner().then(res => {
					this.loading = false;
					if(res.data.code === '0001') {
						this.bannerList = res.data.result.bannerList;
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(err => {
					console.log(err)
					this.loading = false;
				})
			},
			getDestination() {
				getDestinations().then(res => {
					this.destinations = res.data.result.destinations;
					this.destinations.sort(() => {
      			return 0.5 - Math.random()
      		})
				})
			},
		},
		computed: {
			desRow1() {
				// return this.destinations.filter((des, index) => index >= 0 && index < 10 )
				return this.nativeList.filter((des, index) => index >= 0 && index < 8 )
			},
			desRow2() {
				return this.overseaList.filter((des, index) => index >= 0 && index < 7 )
			},
			desRow3() {
				return this.overseaList.filter((des, index) => index >= 7 && index < 13 )
			},
			nativeList(){
				return this.destinations.filter(des => des.region === 'native')
			},
			nativeDesRow1(){
				return this.nativeList.filter((des, index) => index >= 0 && index < 6 )
			},
			nativeDesRow2(){
				return this.nativeList.filter((des, index) => index >= 6 && index < 15 )
			},
			nativeShow(){
				return this.nativeList.filter(des => des.imgUrl)
			},
			recommendList() {
				return this.destinations.filter(des => des.recommend === true)
			},
			overseaList(){
				return this.destinations.filter(des => des.region === 'oversea')
			},
			overseaDesRow1(){
				return this.overseaList.filter((des, index) => index >= 0 && index < 7 )
			},
			overseaDesRow2(){
				return this.overseaList.filter((des, index) => index >= 7 && index < 13 )
			},
			overseaShow() {
				return this.overseaList.filter((des, index) => des.imgUrl && des.recommend)
			}
		},
		mounted() {
			this.destinations = DstShowList;
		}
	}
</script>
<style scoped lang="scss">
	.banner {
		width: 100%;
		overflow: hidden;
		.el-carousel {
			a {
				display: block;
				width: 100%;
				height: 100%;
			}
			img{
				display: block;
				width: 100%;
				height: 100%;
			}
		}
	}
  .main {
  	color: #333;
  	background: #F4F3EE;
  }
  .title {
		padding: 30px;
		text-align: center;
		position: relative;
		h2 {
			font-size: 28px;
			letter-spacing: 2px;
		}
		h4 {
			font-size: 12px;
		}
		.line {
			display: block;
			width: 50px;
			height: 2px;
			margin: 8px auto;
			background: #00AAEF;
		}
		&.has-line {
			h2, h4 {
				display: block;
				width: 200px;
				margin: auto;
			}
			h4 {
				font-weight: normal;
			}
			&::before, &::after {
				content: '';
				position: absolute;
				top: 68px;
				width: calc(50% - 150px);
				height: 1px;
				background: #999;
			}
			&::before {
				left: 0;
			}
			&::after {
				right: 0;
			}
		}
	}
	.destination {
		margin: 15px 0;
		padding: 15px 0;
  	text-align: center;
	}
	div[class$="-section"] {
		margin: 30px 0;
	}
	.des-rows {
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
				text-align: center;
				color: #444;
				background: #F5F4EF;
				border-radius: 5px;
				border: 1px solid #555;
				position: relative;
				&::before {
					content: '';
					position: absolute;
					top: 9px;
					left: 9px;
					width: 10px;
					height: 12px;
					background: url(../../assets/img/coordinate.png) no-repeat center;
				}
				&:hover {
					color: #fff;
					background: #009FE9;
					border: none;
					&::before {
						background: url(../../assets/img/coordinate_hover.png) no-repeat center;
					}
				}
			}
		}
	}
	.recommend-section {
		.recommend-title {
			position: relative;
			margin: 15px 0;
			text-align: center;
			&::before, &::after {
				content: '';
				position: absolute;
				top: 18px;
				width: calc(50% - 65px);
				height: 1px;
				background: #999;
			}
			&::before {
				left: 0;
			}
			&::after {
				right: 0;
			}
			h3 {
				display: inline-block;
				width: 130px;
				padding: 5px 30px;
				font-weight: normal;
				border: 1px solid #999;
				&:hover {
					color: #fff;
					background: #00AAEF;
					border: 1px solid #00AAEF;
				}
			}
		}
	}
	.show-list {
		margin: 30px 0;
		.show-item {
			float: left;
			width: 394px;
			margin-top: 9px;
			margin-right: 9px;
			position: relative;
			transition: all .2s linear;
			&:nth-child(3n) {
				margin-right: 0;
			}
			&:hover {
				box-shadow: 0 15px 30px rgba(255,255,255,.1);
				transform: translate3d(0, -2px, 0);
				.item-name {
					color: #fff;
					background: #00AAEF;
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
				text-align: center;
				color: #333;
				font-size: 16px;
				// background: #414141;
				transition: all .3s;
			}
		}
	}
</style>