<template>
	<section>
		<div class="banner">
			<el-carousel indicator-position height="400px">
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
					<h3>热门推荐</h3>
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
					<h3>国内旅拍</h3>
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
								<img :src="item.imgUrl" :alt="item.wareName"/>
								<div class="text transition">
									<span>{{item.wareName}}</span>
								</div>
							</router-link>
						</el-col>
					</el-row>
					<el-row :gutter="15">
						<el-col :span="6" v-for="(item, index) in nationwideImgList" :key="index">
							<router-link :to="item.url+'&&wareName='+item.wareName" :title="item.wareName" target="_blank">
								<img :src="item.imgUrl" :alt="item.wareName"/>
								<div class="text transition"><span>{{item.wareName}}</span></div>
							</router-link>
						</el-col>
					</el-row>
				</div>
			</section>
			<section>
				<div class="title">
					<h3>海外摄影</h3>
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
					<h3>景点/客片展示</h3>
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
								<img :src="item.imgUrl" :alt="item.wareName"/>
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
	export default {
		data() {
			return {
				bannerList: [
					{
						wareId: 1000000020170801,
						wareName: '【巴厘岛蜜月旅拍婚纱摄影6天4晚游】一对一司导+接送机+一日全天拍摄+国际五星',
						url: '/detail?wareId=1000000020170801',
						imgUrl: 'http://www.fookvision.com/Public/Wwwfookvisioncom/images/index/banner2.jpg'
					},
					{
						wareId: 1000000020170802,
						wareName: '【圣托里尼旅拍婚纱照2日1晚游】 赠送拍摄用车+酒店接送+一对一服务',
						url: '/detail?wareId=1000000020170802',
						imgUrl: 'http://www.fookvision.com/Public/Wwwfookvisioncom/images/index/banner3.jpg'
					},
					{
						wareId: 1000000020170803,
						wareName: '【美国塞班岛婚纱照2天1晚】碧海蓝天+悬崖码头+凤凰花',
						url: '/detail?wareId=1000000020170803',
						imgUrl: 'http://www.fookvision.com/Public/Wwwfookvisioncom/images/index/banner4.jpg'
					},
					{
						wareId: 1000000020170804,
						wareName: '【巴黎旅拍婚纱照2日1晚游】 任选5个景点+全天拍摄用车+一对一服务',
						url: '/detail?wareId=1000000020170804',
						imgUrl: 'http://www.fookvision.com/Public/Wwwfookvisioncom/images/index/banner6.jpg'
					},
					{
						wareId: 1000000020170805,
						wareName: '【三亚旅拍婚纱照2日1晚游】 赠送拍摄用车+酒店接送+一对一服务',
						url: '/detail?wareId=1000000020170805',
						imgUrl: 'http://www.fookvision.com/Public/Wwwfookvisioncom/images/index/banner12.jpg'
					}
				],
				hotImgList: [
					{
						wareId: 1000000020170806,
						wareName: '三亚婚纱摄影',
						url: '/detail?wareId=1000000020170806',
						imgUrl: 'http://www.fookshoot.com/v2/uploads/151231/1-151231141H0F1.jpg',
					},
					{
						wareId: 1000000020170807,
						wareName: '厦门婚纱摄影',
						url: '/detail?wareId=1000000020170807',
						imgUrl: 'http://www.fookshoot.com/v2/uploads/160112/1-1601121Q620301.jpg',
					},
				],
				hotSmallImgList: [
					{
						wareId: 1000000020170808,
						wareName: '马尔代夫婚纱摄影',
						url: '/detail?wareId=1000000020170808',
						imgUrl: 'http://www.fookvision.com//Public/Wwwfookvisioncom/images/index/box02-7.jpg',
					},
					{
						wareId: 1000000020170809,
						wareName: '巴厘岛婚纱摄影',
						url: '/detail?wareId=1000000020170809',
						imgUrl: 'http://www.fookvision.com/Public/Wwwfookvisioncom/images/index/box02-9.jpg',
					},
				],
				nationwideLargeImgList: [
					{
						wareId: 1000000020170810,
						wareName: '厦门鼓浪屿',
						url: '/detail?wareId=1000000020170810',
						imgUrl: 'http://www.fookshoot.com/v2/uploads/170424/1-1F42414225S00.jpg',
					},
					{
						wareId: 1000000020170811,
						wareName: '三亚旅拍',
						url: '/detail?wareId=1000000020170811',
						imgUrl: 'http://www.fookshoot.com/v2/uploads/170526/1-1F5261059454T.jpg',
					}
				],
				nationwideImgList: [
					{
						wareId: 1000000020170812,
						wareName: '马尔代夫·莉莉岛婚纱摄影',
						url: '/detail?wareId=1000000020170812',
						imgUrl: 'http://www.fookshoot.com/v2/uploads/160112/1-1601121Q620301.jpg',
					},
					{
						wareId: 1000000020170813,
						wareName: '马尔代夫·双鱼岛',
						url: '/detail?wareId=1000000020170813',
						imgUrl: 'http://www.fookshoot.com/v2/uploads/160309/1-160309195553M1.jpg',
					},
					{
						wareId: 1000000020170814,
						wareName: '马尔代夫·JD岛',
						url: '/detail?wareId=1000000020170814',
						imgUrl: 'http://www.fookshoot.com/v2/uploads/160309/1-160309192HO15.jpg',
					},
					{
						wareId: 1000000020170815,
						wareName: '马尔代夫·双鱼岛',
						url: '/detail?wareId=1000000020170815',
						imgUrl: 'http://www.fookshoot.com/v2/uploads/160112/1-160112160212P2.jpg',
					},
				],
				overseasList: [
					{
						wareId: 1000000020170816,
						wareName: '法国巴黎',
						url: '/detail?wareId=1000000020170816',
						imgUrl: 'http://www.fookshoot.com/v2/uploads/170317/1-1F31GA510L2.jpg',
					},
					{
						wareId: 1000000020170817,
						wareName: '普吉岛',
						url: '/detail?wareId=1000000020170817',
						imgUrl: 'http://www.fookshoot.com/v2/uploads/170504/1-1F50409521IL.jpg',
					},
					{
						wareId: 1000000020170818,
						wareName: '全球旅拍·普吉岛',
						url: '/detail?wareId=1000000020170818',
						imgUrl: 'http://www.fookshoot.com/v2/uploads/161123/1-161123143IRP.jpg',
					},
					{
						wareId: 1000000020170819,
						wareName: '全球旅拍·普吉岛',
						url: '/detail?wareId=1000000020170819',
						imgUrl: 'http://www.fookshoot.com/v2/uploads/160520/1-1605201U959A5.jpg',
					},
				],
				samplesImgList: [
					{
						wareId: 1000000020170820,
						wareName: '马尔代夫·神仙珊瑚岛',
						url: '/detail?wareId=1000000020170820',
						imgUrl: 'http://www.fookshoot.com/v2/uploads/151109/1-15110920091BO.jpg',
					},
					{
						wareId: 1000000020170821,
						wareName: '马尔代夫·莉莉岛婚纱摄影',
						url: '/detail?wareId=1000000020170821',
						imgUrl: 'http://www.fookshoot.com/v2/uploads/160112/1-1601121Q620301.jpg',
					},
					{
						wareId: 1000000020170822,
						wareName: '马尔代夫·双鱼岛',
						url: '/detail?wareId=1000000020170822',
						imgUrl: 'http://www.fookshoot.com/v2/uploads/160309/1-160309195553M1.jpg',
					},
					{
						wareId: 1000000020170823,
						wareName: '马尔代夫·JD岛',
						url: '/detail?wareId=1000000020170823',
						imgUrl: 'http://www.fookshoot.com/v2/uploads/160309/1-160309192HO15.jpg',
					},
					{
						wareId: 1000000020170824,
						wareName: '马尔代夫·满月岛',
						url: '/detail?wareId=1000000020170824',
						imgUrl: 'http://www.fookshoot.com/v2/uploads/160309/1-16030919314A48.jpg',
					},
					{
						wareId: 1000000020170825,
						wareName: '马尔代夫·波杜希蒂岛',
						url: '/detail?wareId=1000000020170825',
						imgUrl: 'http://www.fookshoot.com/v2/uploads/160309/1-160309191IY41.jpg',
					},
					{
						wareId: 1000000020170826,
						wareName: '马尔代夫·圣塔拉富士岛',
						url: '/detail?wareId=1000000020170826',
						imgUrl: 'http://www.fookshoot.com/v2/uploads/160309/1-160309194532240.jpg',
					},
					{
						wareId: 1000000020170827,
						wareName: '马尔代夫·香格里拉岛婚纱',
						url: '/detail?wareId=1000000020170827',
						imgUrl: 'http://www.fookshoot.com/v2/uploads/151231/1-151231141H0F1.jpg',
					},
				],
			}
		},
		methods: {
		},
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
  		// em {
  		// 	font-style: normal;
  		// 	font-weight: bold;
  		// 	&::before, &::after {
  		// 		content: '';
				// 	position: absolute;
				// 	top: 10px;
				// 	width: 200px;
  		// 		height: 2px;
  		// 		background: #eee
  		// 	}
  		// 	&::before {
  		// 		margin-left: -220px;
  		// 	}
  		// 	&::after {
				// 	margin-left: 20px;
  		// 	}
  		// }
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