<template>
	<section>
		<div class="banner">
			<el-carousel indicator-position height="400px">
		    <el-carousel-item v-for="(item, index) in bannerList" :key="index">
		      <router-link :to="item.url" :title="item.title">
		      	<img :src="item.imgUrl" :alt="item.title">
		      </router-link>
		    </el-carousel-item>
		  </el-carousel>
		</div>
		<div class="main-wrap">
			<section>
				<h3 class="title">
					<em>热门推荐</em>
					<router-link to="list">更多
						<i class="fa fa-angle-double-right"></i>
					</router-link>
				</h3>
				<div class="hot image-list">
					<el-row :gutter="20">
						<el-col :span="9">
							<router-link to="/detail">
								<img :src="hotImgList[0].imgUrl" :alt="hotImgList[0].title"/>
								<div class="text transition">
									<span>{{hotImgList[0].title}}</span>
								</div>
							</router-link>
						</el-col>
						<el-col :span="9">
							<el-row v-for="(item, index) in hotSmallImgList" :key="index">
								<router-link :to="item.url">
									<img :src="item.imgUrl" :alt="item.title"/>
									<div class="text transition">
										<span>{{item.title}}</span>
									</div>
								</router-link>
							</el-row>
						</el-col>
						<el-col :span="6">
							<router-link to="/detail">
								<img :src="hotImgList[1].imgUrl" :alt="hotImgList[1].title"/>
								<div class="text transition"><span>{{hotImgList[1].title}}</span></div>
							</router-link>
						</el-col>
					</el-row>
				</div>
			</section>
			<section>
				<h3 class="title">
					<em>国内旅拍</em>
					<router-link to="list">更多
						<i class="fa fa-angle-double-right"></i>
					</router-link>
				</h3>
				<div class="nationwide image-list">
					<el-row :gutter="20">
						<el-col :span="12" v-for="(item, index) in nationwideLargeImgList" :key="index">
							<router-link to="/detail">
								<img :src="item.imgUrl" :alt="item.title"/>
								<div class="text transition">
									<span>{{item.title}}</span>
								</div>
							</router-link>
						</el-col>
					</el-row>
					<el-row :gutter="20">
						<el-col :span="6" v-for="(item, index) in nationwideImgList" :key="index">
							<a :href="item.url" :title="item.title">
								<img :src="item.imgUrl" :alt="item.title"/>
								<div class="text transition"><span>{{item.title}}</span></div>
							</a>
						</el-col>
					</el-row>
				</div>
			</section>
			<section>
				<h3 class="title">
					<em>海外摄影</em>
					<router-link to="list">更多
						<i class="fa fa-angle-double-right"></i>
					</router-link>
				</h3>
				<div class="overseas image-list">
					<el-row :gutter="20">
						<el-col :span="12">
							<router-link to="/detail">
								<img :src="overseasList[0].imgUrl" :alt="overseasList[0].title"/>
								<div class="text transition">
									<span>{{overseasList[0].title}}</span>
								</div>
							</router-link>
						</el-col>
						<el-col :span="12">
							<el-row :gutter="20">
								<el-col :span="12" v-for="(item, index) in overseasList" :key="index">
									<router-link :to="item.url">
										<img :src="item.imgUrl" :alt="item.title"/>
										<div class="text transition">
											<span>{{item.title}}</span>
										</div>
									</router-link>
								</el-col>
							</el-row>
						</el-col>
					</el-row>
					<el-row :gutter="20">
						<el-col :span="6">
							<el-row :gutter="20">
								<el-col :span="24" v-for="(item, index) in hotImgList" :key="index">
									<router-link :to="item.url">
										<img :src="item.imgUrl" :alt="item.title"/>
										<div class="text transition">
											<span>{{item.title}}</span>
										</div>
									</router-link>
								</el-col>
							</el-row>
						</el-col>
						<el-col :span="12">
							<router-link to="/detail">
								<img :src="hotImgList[0].imgUrl" :alt="hotImgList[0].title"/>
								<div class="text transition">
									<span>{{hotImgList[0].title}}</span>
								</div>
							</router-link>
						</el-col>
						<el-col :span="6">
							<el-row :gutter="20">
								<el-col :span="24" v-for="(item, index) in hotImgList" :key="index">
									<router-link :to="item.url">
										<img :src="item.imgUrl" :alt="item.title"/>
										<div class="text transition">
											<span>{{item.title}}</span>
										</div>
									</router-link>
								</el-col>
							</el-row>
						</el-col>
					</el-row>
				</div>
			</section>
			<section>
				<h3 class="title">
					<em>景点/客片展示</em>
					<router-link to="list">更多
						<i class="fa fa-angle-double-right"></i>
					</router-link>
				</h3>
				<div class="samples image-list">
					<el-row :gutter="20">
						<el-col :span="6" v-for="(item, index) in samplesImgList" :key="index">
							<router-link to="/detail">
								<img :src="item.imgUrl" :alt="item.title"/>
								<div class="text transition">
									<span>{{item.title}}</span>
								</div>
							</router-link>
						</el-col>
					</el-row>
				</div>
			</section>
			<section>
				<img src="http://www.fookvision.com//Public/Wwwfookvisioncom/images/index/advent.jpg" alt="">
			</section>
		</div>
	</section>
</template>
<script>
	export default {
		data() {
			return {
				bannerList: [
					{
						title: '巴厘岛婚纱摄影',
						url: '/detail',
						imgUrl: 'http://www.fookvision.com/Public/Wwwfookvisioncom/images/index/banner2.jpg'
					},
					{
						title: '圣托里尼婚纱摄影',
						url: '/detail',
						imgUrl: 'http://www.fookvision.com/Public/Wwwfookvisioncom/images/index/banner3.jpg'
					},
					{
						title: '塞班岛婚纱摄影',
						url: '/detail',
						imgUrl: 'http://www.fookvision.com/Public/Wwwfookvisioncom/images/index/banner4.jpg'
					},
					{
						title: '巴黎婚纱摄影',
						url: '/detail',
						imgUrl: 'http://www.fookvision.com/Public/Wwwfookvisioncom/images/index/banner6.jpg'
					},
					{
						title: '三亚婚纱摄影',
						url: '/detail',
						imgUrl: 'http://www.fookvision.com/Public/Wwwfookvisioncom/images/index/banner12.jpg'
					}
				],
				hotImgList: [
					{
						title: '三亚婚纱摄影',
						url: '/detail',
						imgUrl: 'http://www.fookshoot.com/v2/uploads/151231/1-151231141H0F1.jpg',
					},
					{
						title: '厦门婚纱摄影',
						url: '/detail',
						imgUrl: 'http://www.fookshoot.com/v2/uploads/160112/1-1601121Q620301.jpg',
					},
				],
				hotSmallImgList: [
					{
						title: '马尔代夫婚纱摄影',
						url: '/detail',
						imgUrl: 'http://www.fookvision.com//Public/Wwwfookvisioncom/images/index/box02-7.jpg',
					},
					{
						title: '巴厘岛婚纱摄影',
						url: '/detail',
						imgUrl: 'http://www.fookvision.com/Public/Wwwfookvisioncom/images/index/box02-9.jpg',
					},
				],
				nationwideLargeImgList: [
					{
						title: '厦门鼓浪屿',
						url: '/detail',
						imgUrl: 'http://www.fookshoot.com/v2/uploads/170424/1-1F42414225S00.jpg',
					},
					{
						title: '三亚旅拍',
						url: '/detail',
						imgUrl: 'http://www.fookshoot.com/v2/uploads/170526/1-1F5261059454T.jpg',
					}
				],
				nationwideImgList: [
					{
						title: '马尔代夫·莉莉岛婚纱摄影',
						url: '/detail',
						imgUrl: 'http://www.fookshoot.com/v2/uploads/160112/1-1601121Q620301.jpg',
					},
					{
						title: '马尔代夫·双鱼岛',
						url: '/detail',
						imgUrl: 'http://www.fookshoot.com/v2/uploads/160309/1-160309195553M1.jpg',
					},
					{
						title: '马尔代夫·JD岛',
						url: '/detail',
						imgUrl: 'http://www.fookshoot.com/v2/uploads/160309/1-160309192HO15.jpg',
					},
					{
						title: '马尔代夫·双鱼岛',
						url: '/detail',
						imgUrl: 'http://www.fookshoot.com/v2/uploads/160112/1-160112160212P2.jpg',
					},
				],
				overseasList: [
					{
						title: '法国巴黎',
						url: '/detail',
						imgUrl: 'http://www.fookshoot.com/v2/uploads/170317/1-1F31GA510L2.jpg',
					},
					{
						title: '普吉岛',
						url: '/detail',
						imgUrl: 'http://www.fookshoot.com/v2/uploads/170504/1-1F50409521IL.jpg',
					},
					{
						title: '全球旅拍·普吉岛',
						url: '/detail',
						imgUrl: 'http://www.fookshoot.com/v2/uploads/161123/1-161123143IRP.jpg',
					},
					{
						title: '全球旅拍·普吉岛',
						url: '/detail',
						imgUrl: 'http://www.fookshoot.com/v2/uploads/160520/1-1605201U959A5.jpg',
					},
				],
				samplesImgList: [
					{
						title: '马尔代夫·神仙珊瑚岛',
						url: '/detail',
						imgUrl: 'http://www.fookshoot.com/v2/uploads/151109/1-15110920091BO.jpg',
					},
					{
						title: '马尔代夫·莉莉岛婚纱摄影',
						url: '/detail',
						imgUrl: 'http://www.fookshoot.com/v2/uploads/160112/1-1601121Q620301.jpg',
					},
					{
						title: '马尔代夫·双鱼岛',
						url: '/detail',
						imgUrl: 'http://www.fookshoot.com/v2/uploads/160309/1-160309195553M1.jpg',
					},
					{
						title: '马尔代夫·JD岛',
						url: '/detail',
						imgUrl: 'http://www.fookshoot.com/v2/uploads/160309/1-160309192HO15.jpg',
					},
					{
						title: '马尔代夫·满月岛',
						url: '/detail',
						imgUrl: 'http://www.fookshoot.com/v2/uploads/160309/1-16030919314A48.jpg',
					},
					{
						title: '马尔代夫·波杜希蒂岛',
						url: '/detail',
						imgUrl: 'http://www.fookshoot.com/v2/uploads/160309/1-160309191IY41.jpg',
					},
					{
						title: '马尔代夫·圣塔拉富士岛',
						url: '/detail',
						imgUrl: 'http://www.fookshoot.com/v2/uploads/160309/1-160309194532240.jpg',
					},
					{
						title: '马尔代夫·香格里拉岛婚纱',
						url: '/detail',
						imgUrl: 'http://www.fookshoot.com/v2/uploads/151231/1-151231141H0F1.jpg',
					},
				],
			}
		}
	}
</script>
<style scoped lang="scss">
	.banner {
		width: 100%;
		overflow: hidden;
	}
	.el-carousel {
		width: 100%;
	}
	.el-carousel__container {
		height: 400px
	}
  .el-carousel__item {
  	a {
  		display: inline-block;
  		width: 100%;
  		height: 100%;
  		img {
  			width: 100%;
  			height: 100%;
  		}
  	}
  }
  .main-wrap {
  	width: 1180px;
  	margin: 20px auto;
  	// section {
  	// 	margin: 40px 0;
  	// }
  	.title {
  		position: relative;
  		margin: 40px 0;
  		text-align: center;
  		em {
  			font-style: normal;
  			font-weight: bold;
  			&::before, &::after {
  				content: '';
					position: absolute;
					top: 10px;
					width: 200px;
  				height: 2px;
  				background: #eee
  			}
  			&::before {
  				margin-left: -220px;
  			}
  			&::after {
					margin-left: 20px;
  			}
  		}
  		a {
  			position: absolute;
  			top: 0;
  			right: 5px;
  			padding: 5px 15px;
  			font-size: 14px;
  			color: #fff;
  			background: #0094DA
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
  		margin-bottom: 20px
  	}
	}
  .hot {
  	.el-col {
			height: 260px
  	}
  	.el-col:nth-child(2) {
  		.el-row {
  			height: 120px;
  			&:first-child {
  				margin-bottom: 20px;
  			}
  		}
  	}
  }
  .nationwide {
  	.el-col {
  		height: 260px
  	}
  }
  .overseas {
  	.el-col {
			height: 340px;
			.el-row {
				.el-col {
					height: 160px;
					margin-bottom: 20px
				}
			}
  	}
  }
  .samples {
  	.el-row {
  		.el-col{
				height: 200px
  		}
  	}
  }
</style>