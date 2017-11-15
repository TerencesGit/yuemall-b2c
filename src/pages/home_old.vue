<template>
	<section>
		<div class="banner" v-loading="loading">
			<el-carousel indicator-position height="500px">
		    <el-carousel-item v-for="(item, index) in bannerList" :key="index">
		      <router-link :to='item.url+"&&wareName="+item.wareName+"&wareImg="+item.imgUrl' :title="item.wareName" target="_blank">
		      	<img :src="item.imgUrl" :alt="item.wareName">
		      </router-link>
		    </el-carousel-item>
		  </el-carousel>
		</div>
		<div class="main-wrap">
			<section> 
				<div class="title">
					<h3><em>热门推荐</em></h3>
					<h3>hot recommendation</h3>
					<router-link to="list?title=热门推荐" class="transition" target="_blank">
						show more
						<i class="el-icon-d-arrow-right"></i>
					</router-link>
				</div>
				<div class="hot image-list">
					<el-row :gutter="15">
						<el-col :span="9">
							<router-link to="list?title=热门推荐" target="_blank">
								<img :src="hotImgList[0].imgUrl" :alt="hotImgList[0].wareName"/>
								<div class="text transition">
									<span>{{hotImgList[0].wareName}}</span>
								</div>
							</router-link>
						</el-col>
						<el-col :span="8">
							<el-row v-for="(item, index) in hotSmallImgList" :key="index">
								<router-link :to="item.url" target="_blank">
									<img :src="item.imgUrl" :alt="item.wareName"/>
									<div class="text transition">
										<span>{{item.wareName}}</span>
									</div>
								</router-link>
							</el-row>
						</el-col>
						<el-col :span="7">
							<router-link to="list?title=热门推荐" target="_blank">
								<img :src="hotImgList[1].imgUrl" :alt="hotImgList[1].wareName"/>
								<div class="text transition"><span>{{hotImgList[1].wareName}}</span></div>
							</router-link>
						</el-col>
					</el-row>
				</div>
			</section>
			<section>
				<div class="title">
					<h3><em>国内旅拍</em></h3>
					<h3>native travel</h3>
					<router-link to="list?title=国内旅拍" class="transition" target="_blank">
						show more
						<i class="el-icon-d-arrow-right"></i>
					</router-link>
				</div>
				<div class="nationwide image-list">
					<el-row :gutter="15">
						<el-col :span="12" v-for="(item, index) in nationwideLargeImgList" :key="index">
							<router-link to="list?title=国内旅拍" target="_blank">
								<img v-lazyload="item.imgUrl" :alt="item.wareName"/>
								<div class="text transition">
									<span>{{item.wareName}}</span>
								</div>
							</router-link>
						</el-col>
					</el-row>
					<el-row :gutter="15">
						<el-col :span="6" v-for="(item, index) in nationwideImgList" :key="index">
							<router-link :to="item.url+'&&wareName='+item.wareName" :title="item.wareName" target="_blank">
								<img v-lazyload="item.imgUrl" :alt="item.wareName"/>
								<div class="text transition"><span>{{item.wareName}}</span></div>
							</router-link>
						</el-col>
					</el-row>
				</div>
			</section>
			<section>
				<div class="title">
					<h3><em>海外摄影</em></h3>
					<h3>overseas photography</h3>
					<router-link to="list?title=海外摄影" class="transition" target="_blank">
						show more
						<i class="el-icon-d-arrow-right"></i>
					</router-link>
				</div>
				<div class="overseas image-list">
					<el-row :gutter="15">
						<el-col :span="12">
							<router-link to="list?title=海外摄影" target="_blank">
								<img :src="overseasList[0].imgUrl" :alt="overseasList[0].wareName"/>
								<div class="text transition">
									<span>{{overseasList[0].wareName}}</span>
								</div>
							</router-link>
						</el-col>
						<el-col :span="12">
							<el-row :gutter="15">
								<el-col :span="12" v-for="(item, index) in overseasList" :key="index">
									<router-link :to="item.url" target="_blank">
										<img :src="item.imgUrl" :alt="item.wareName"/>
										<div class="text transition">
											<span>{{item.wareName}}</span>
										</div>
									</router-link>
								</el-col>
							</el-row>
						</el-col>
					</el-row>
					<el-row :gutter="15">
						<el-col :span="6">
							<el-row :gutter="15">
								<el-col :span="24" v-for="(item, index) in hotImgList" :key="index">
									<router-link :to="item.url" target="_blank">
										<img :src="item.imgUrl" :alt="item.wareName"/>
										<div class="text transition">
											<span>{{item.wareName}}</span>
										</div>
									</router-link>
								</el-col>
							</el-row>
						</el-col>
						<el-col :span="12">
							<router-link to="list?title=海外摄影" target="_blank">
								<img :src="hotImgList[0].imgUrl" :alt="hotImgList[0].wareName"/>
								<div class="text transition">
									<span>{{hotImgList[0].wareName}}</span>
								</div>
							</router-link>
						</el-col>
						<el-col :span="6">
							<el-row :gutter="15">
								<el-col :span="24" v-for="(item, index) in hotImgList" :key="index">
									<router-link :to="item.url" target="_blank">
										<img :src="item.imgUrl" :alt="item.wareName"/>
										<div class="text transition">
											<span>{{item.wareName}}</span>
										</div>
									</router-link>
								</el-col>
							</el-row>
						</el-col>
					</el-row>
				</div>
			</section>
			<section>
				<div class="title">
					<h3><em>景点/客片展示</em></h3>
					<h3>samples show</h3>
					<router-link to="list?title=景点/客片展示" class="transition" target="_blank">
						show more
						<i class="el-icon-d-arrow-right"></i>
					</router-link>
				</div>
				<div class="samples image-list">
					<el-row :gutter="15">
						<el-col :span="6" v-for="(item, index) in samplesImgList" :key="index">
							<router-link :to="item.url+'&wareName='+item.wareName" target="_blank">
								<img v-lazyload="item.imgUrl" :alt="item.wareName"/>
								<div class="text transition">
									<span>{{item.wareName}}</span>
								</div>
							</router-link>
						</el-col>
					</el-row>
				</div>
			</section>
			<section>
				<img src="http://www.fookvision.com//Public/Wwwfookvisioncom/images/index/advent.jpg">
			</section>
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
  .el-carousel__item {
  	a {
  		display: inline-block;
  		width: 100%;
  		height: 100%;
  	}
  }
  .main-wrap {
  	width: 1180px;
  	margin: 20px auto;
  	section {
  		margin: 60px 0;
  	}
  	.title {
  		position: relative;
  		margin: 30px 0;
  		text-align: center;
  		em {
  			font-style: normal;
  			font-weight: bold;
  			&::before, &::after {
  				content: '';
					position: absolute;
					top: 10px;
					width: 300px;
  				height: 1px;
  				background: #ddd
  			}
  			&::before {
  				margin-left: -320px;
  			}
  			&::after {
					margin-left: 20px;
  			}
  		}
  		h3 {
  			margin: 20px 0;
  			font-weight: bold;
  		}
  		h3:nth-child(2) {
  			color: #0095d9;
  			text-transform: uppercase;
  		} 
  		a {
  			position: absolute;
  			right: 10px;
  			bottom: -20px;
  			font-size: 13px;
  			color: #0094DA;
  			font-weight: bold;
  			text-transform: uppercase;
  			&:hover {
  				right: 0;
  				color: #0095d9;
  			}
  			i {
  				font-size: 12px
  			}
  		}
  	}
  	.image-list {
  		a {
  			position: relative;
  			display: block;
  			width: 100%;
  			height: 100%;
  			&:hover {
  				.text{
  					display: block;
  				}
  			}
  			.text {
  				display: none;
  				position: absolute;
  				top: 0;
  				width: 100%;
  				height: 100%;
  				text-align: center;
  				color: #fff;
  				background: rgba(0,0,0,.3);
  				span {
  					position: absolute;
  					bottom: 0;
  					left: 0;
  					right: 0;
  					padding: 8px 0;
  					background: rgba(0,0,0,.3)
  				}
  			}
  		}
  	}
  	img {
  		width: 100%;
  		height: 100%
  	}
  }
  .el-row {
  	margin-bottom: 20px;
  	.el-col {
  		height: 100%;
  	}
	}
  .hot {
  	.el-col {
			height: 275px
  	}
  	.el-col:nth-child(2) {
  		.el-row {
  			height: 130px;
  			&:first-child {
  				margin-bottom: 15px;
  			}
  		}
  	}
  }
  .nationwide {
  	.el-row {
  		margin-bottom: 15px
  	}
  	.el-col {
  		height: 260px
  	}
  }
  .overseas {
  	.el-row {
  		margin-bottom: 15px;
  	}
  	.el-col {
			height: 355px;
			.el-row {
				.el-col {
					height: 170px;
					margin-bottom: 15px
				}
			}
  	}
  }
  .samples {
  	.el-row {
  		margin-bottom: -20px;
  		.el-col{
				height: 200px;
				margin-bottom: 15px;
  		}
  	}
  }
</style>