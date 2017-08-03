<template>
  <section>
		<header>
			<div class="topbar clearfix">
				<div class="topbar-left">
					<div class="top-logo">
						<router-link to="/" class="logo">logo</router-link>
					</div>
				</div>
				<div class="topbar-right">
					<div class="search">
						<el-input placeholder="悦视觉全球摄影" icon="search" v-model="searchContent" :on-icon-click="handleSearch" @focus="handleFocus" @blur="handleBlur" v-bind:style="{ width: inputWidth }" class="transition"/>
					</div>
					<div class="link">
						<p>国内：010-56143517</p>
					</div>
					<div class="welcome">
						<p>欢迎，Transform</p>
					</div>
				</div>
			</div>
			<div class="navbar clearfix">
				<div class="nav-menu">
					<h3>全球旅拍</h3>
					<ul class="menu-list">
						<li v-for="(item, index) in menuList" :key="index" class="menu-item">
							<a href="#" class="title">{{item.name}}</a>
							<div class="submenu-list">
								<a href="#" v-for="(item, index) in item.children" :key="index" class="submenu-item">
									{{item.name}}
								</a>
							</div>
						</li>
					</ul>
				</div>
				<ul class="nav-list">
					<li v-for="(item, index) in navList" :key="index" class="nav-item">
						<router-link :to="item.to">{{item.name}}</router-link>
					</li>
				</ul>
			</div>
		</header>
		<div class="banner">
			<el-carousel indicator-position height="400px">
		    <el-carousel-item v-for="(item, index) in bannerList" :key="index">
		      <router-link :to="item.url" :title="item.title">
		      	<img :src="item.imgUrl" :alt="item.title">
		      </router-link>
		    </el-carousel-item>
		  </el-carousel>
		</div>
  </section>
</template>
<script>
	export default {
		data() {
			return {
				inputWidth: '200px',
				searchContent: '',
				navList: [
					{
						name: '首页',
						to: '/'
					},
					{
						name: '国内摄影',
						to: '/native'
					},
					{
						name: '海外摄影',
						to: '/outsea'
					},
					{
						name: '旅游',
						to: 'travel'
					},
				],
				bannerList: [
					{
						title: '巴厘岛婚纱摄影',
						url: '/balidao',
						imgUrl: 'http://www.fookvision.com/Public/Wwwfookvisioncom/images/index/banner2.jpg'
					},
					{
						title: '圣托里尼婚纱摄影',
						url: '/balidao',
						imgUrl: 'http://www.fookvision.com/Public/Wwwfookvisioncom/images/index/banner3.jpg'
					},
					{
						title: '塞班岛婚纱摄影',
						url: '/balidao',
						imgUrl: 'http://www.fookvision.com/Public/Wwwfookvisioncom/images/index/banner4.jpg'
					},
					{
						title: '巴黎婚纱摄影',
						url: '/balidao',
						imgUrl: 'http://www.fookvision.com/Public/Wwwfookvisioncom/images/index/banner6.jpg'
					},
				],
				menuList: [
					{
						name: '热门',
						children: [
							{
								name: '三亚',
								url: '/sanya',
							},
							{
								name: '丽江',
								url: '/sanya',
							},
							{
								name: '厦门',
								url: '/sanya',
							},
							{
								name: '大理',
								url: '/sanya',
							},
							{
								name: '普吉岛',
								url: '/sanya',
							},
							{
								name: '巴厘岛',
								url: '/sanya',
							},
							{
								name: '马尔代夫',
								url: '/sanya',
							},
							{
								name: '巴黎',
								url: '/sanya',
							},
							{
								name: '塞班',
								url: '/sanya',
							},
							{
								name: '圣托里尼',
								url: '/sanya',
							},
							{
								name: '济州岛',
								url: '/sanya',
							},
						]	
					},
					{
						name: '国内',
						children: [
							{
								name: '三亚'
							},
							{
								name: '丽江'
							},
							{
								name: '大理'
							},
							{
								name: '厦门'
							},
							{
								name: '青岛'
							},
							{
								name: '大连'
							},
						]
					},
					{
						name: '海岛',
						children: [
							{
								name: '普吉岛'
							},
							{
								name: '苏梅岛'
							},
							{
								name: '巴厘岛'
							},
							{
								name: '马尔代夫'
							},
							{
								name: '济州岛'
							},
							{
								name: '塞班岛'
							},
							{
								name: '斐济南迪'
							},
						]
					},
					{
						name: '欧洲',
						children: [
							{
								name: '希腊圣托里尼'
							},
							{
								name: '法国巴黎'
							},
							{
								name: '法国普罗旺斯'
							},
							{
								name: '德国科隆'
							},
							{
								name: '意大利罗马'
							},
							{
								name: '意大利威尼斯'
							},
							{
								name: '意大利佛罗伦萨'
							},
							{
								name: '意大利米兰'
							},
							{
								name: '捷克布拉格'
							},
							{
								name: '西班牙巴塞罗那'
							},
							{
								name: '西班牙马德里'
							},
						]	
					},
					{
						name: '美洲',
						children: [
							{
								name: '美国洛杉矶'
							},
							{
								name: '美国塞班岛'
							},
						]
					},
					{
						name: '亚洲',
						children: [
							{
								name: '日本东京',
							},
							{
								name: '日本北海道',
							},
							{
								name: '韩国首尔',
							},
							{
								name: '韩国济州岛',
							},
							{
								name: '泰国普吉岛',
							},
							{
								name: '泰国苏梅岛',
							},
							{
								name: '印尼巴厘岛',
							},
							{
								name: '马尔代夫',
							},
							{
								name: '迪拜',
							},
							{
								name: '马来西亚吉隆坡',
							},
							{
								name: '马来西亚槟城州',
							},
							{
								name: '马来西亚兰卡威',
							},
						]
					},
					{
						name: '澳新',
						children: [
							{
								name: '新西兰奥克兰',
							},
							{
								name: '新西兰基督城',
							},
							{
								name: '新西兰皇后镇',
							},
							{
								name: '澳大利亚悉尼',
							},
							{
								name: '澳大利亚墨尔本',
							}

						]
					},
				]
			}
		},
		methods: {
			handleSearch() {
				console.log(this.searchContent)
			},
			handleFocus() {
				this.inputWidth = '300px'
			},
			handleBlur() {
				if(!this.searchContent) {
					this.inputWidth = '200px'
				}
			}
		}
	}
</script>
<style scoped lang="scss">
	header {
		background: #fff
	}
	.topbar {
		height: 50px;
		padding: 0 30px;
		background: linear-gradient(90deg, #00B4E9, #0094DA);
	}
	.topbar-left {
		float: left;
		.top-logo {
			.logo {
				display: inline-block;
				width: 118px;
				height: 43px;
				margin-top: 4px;
				text-indent: -2000em;
				background: url(../assets/img/logo.png) no-repeat;
				background-size: cover
			}
		}
	}
	.topbar-right {
		float: right;
		line-height: 50px;
		color: #fff;
		div {
			display: inline-block;
			margin-right: 15px;
			font-size: 14px;
			&:last-child {
				margin-right: 0
			}
		}
	}
	.navbar {
		width: 1180px;
		height: 60px;
		margin: 0 auto;
		line-height: 60px;
		background: #fff
	}
	.nav-menu, .nav-list {
		float: left;
		color: #333;
		border: 0
	}
	.nav-menu {
		height: 60px;
		&:hover {
			.menu-list{
				display: block;
			}
			h3 {
				color: #0094DA
			}
		}
		h3 {
			width: 200px;
			text-align: center;
			line-height: 60px;
			cursor: pointer;
			background: rgba(0,0,0,.1);
		}
		.menu-list {
			display: none;
			position: absolute;
			z-index: 99;
			width: 200px;
			padding: 25px 0;
			color: #fff;
			font-size: 16px;
			background: rgba(0,0,0,.5);
			.menu-item {
				height: 50px;
				line-height: 50px;
				.title {
					display: inline-block;
					width: 100%;
					padding-left: 20px;
					color: #fff;
					letter-spacing: 2px;
				}
				&:hover {
					background: #0094DA;
					.submenu-list {
						display: block;
					}
				}
			}
		}
	}
	.submenu-list {
		display: none;
		position: absolute;
		top: 0;
		left: 200px;
		z-index: 100;
		width: 450px;
		height: 400px;
		line-height: 1.1;
		padding: 20px;
		border-top: 1px solid #e4e4e4;
		background: #fff;
		box-shadow: 1px 1px 3px rgba(0,0,0,.1);
		.submenu-item {
			display: inline-block;
			height: 30px;
			line-height: 30px;
			margin: 0 8px;
			word-wrap: break-word;  
			word-break: normal; 
			color: #333;
			&:hover {
				color: #0094DA;
			}
		}
	}
	.nav-list {
		margin-left: 40px;
		line-height: 60px;
		.nav-item {
			display: inline-block;
			a {
				display: inline-block;
				width: 100%;
				padding: 0 30px;
				color: #666;
				font-size: 16px;
				&:hover {
					background: rgba(0,0,0,.05);
				}
				&.router-link-active {
					height: 60px;
					color: #0094DA;
					// background: rgba(0,0,0,.05);
					// border-bottom: 3px solid #0094DA;
				}
			}
		}
	}
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
</style>