<template>
	<header class="header">
		<div class="topbar clearfix">
			<div class="topbar-left">
				<div class="top-logo">
					<router-link to="/" class="logo">logo</router-link>
				</div>
			</div>
			<div class="topbar-right">
				<div class="search" @click="searchEvent">
					<el-input placeholder="悦视觉全球摄影" icon="search" v-model.trim="searchContent" :on-icon-click="handleSearch" @focus="handleFocus" @blur="handleBlur" @input="handleInput" v-bind:style="{ width: inputWidth }" class="transition"/>
					<div class="search-suggest" v-show="suggestShow">
						<ul v-loading="loading">
							<li v-for="(item, index) in searchList" ref="suggest" @click="suggestSearch(index)">
								<i class="fa fa-search"></i>
								<span>搜索“{{searchContent}}”{{item}}</span>
							</li>
						</ul>
					</div>
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
						<router-link to="/list" class="title">
							{{item.name}}
							<i class="fa fa-angle-right"></i>
						</router-link>
						<div class="submenu-list">
							<router-link to="/list" v-for="(item, index) in item.children" :key="index" class="submenu-item">
								{{item.name}}
							</router-link>
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
</template>
<script>
	export default {
		data() {
			return {
				inputWidth: '200px',
				searchContent: '',
				suggestShow: false,
				loading: false,
				navList: [
					{
						name: '首页',
						to: '/home'
					},
					{
						name: '国内摄影',
						to: '/native'
					},
					{
						name: '海外摄影',
						to: '/oversea'
					},
					{
						name: '旅游',
						to: '/travel'
					},
				],
				menuList: [
					{
						name: '热门',
						children: [
							{
								name: '三亚',
								url: '/list',
							},
							{
								name: '丽江',
								url: '/list',
							},
							{
								name: '厦门',
								url: '/list',
							},
							{
								name: '大理',
								url: '/list',
							},
							{
								name: '普吉岛',
								url: '/list',
							},
							{
								name: '巴厘岛',
								url: '/list',
							},
							{
								name: '马尔代夫',
								url: '/list',
							},
							{
								name: '巴黎',
								url: '/list',
							},
							{
								name: '塞班',
								url: '/list',
							},
							{
								name: '圣托里尼',
								url: '/list',
							},
							{
								name: '济州岛',
								url: '/list',
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
				],
				searchList: ['相关的景点', '相关的拍摄','相关的攻略','相关的旅游','相关的金融','相关的门票','相关的团购'],
			}
		},
		methods: {
			searchEvent(e) {
				e.stopPropagation()
			},
			handleSearch() {
				if(!this.searchContent) return;
				this.loading = true;
				setTimeout(() => {
					this.$notify.warning({
	          title: '搜索失败',
	          message: `抱歉，未找到 “${this.searchContent}”相关内容`,
	        })
	        this.loading = false;
	        this.suggestShow = false;
				}, 2000)
			},
			handleFocus() {
				this.inputWidth = '300px';
				this.suggestShow = this.searchContent ? true : false;
				return false;
			},
			handleBlur() {
				if(this.searchContent) return;
				this.inputWidth = '200px'
			},
			handleInput() {
				this.suggestShow = this.searchContent ? true : false
			},
			suggestSearch(index) {
				let content = this.$refs.suggest[index].innerText.substr(3,)
				this.loading = true;
				setTimeout(() => {
					this.$notify.warning({
	          title: '搜索失败',
	          message: `抱歉，未找到${content}内容`,
	        })
	        this.loading = false
	        this.suggestShow = false
				}, 2000)
			}
		},
		mounted() {
			document.body.addEventListener('click', (e) => {
				this.suggestShow = false
			})
			let searchInput = document.querySelectorAll('.el-input__inner')[0];
    	searchInput.addEventListener('keydown', (e) => {
    		e.keyCode === 13 && this.handleSearch()
    	})
		}
	}
</script>
<style scoped lang="scss">
	.header {
		background: #333
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
	.search {
		position: relative;
		.search-suggest {
			position: absolute;
			top: 42px;
			left: 0;
			right: 15px;
			z-index: 999;
			color: #666;
			background: #fff;
			box-shadow: 0 3px 5px 3px rgba(0,0,0,.3);
			li {
				padding: 5px 15px;
				line-height: 1.5;
				cursor: pointer;
				word-wrap: break-word;
				&:hover {
					color: #fff;
					background: #0094DA
				}
				i {
					margin-right: 5px
				}
			}
		}
	}
	.navbar {
		width: 1180px;
		height: 60px;
		margin: 0 auto;
		line-height: 60px;
		background: #333
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
		}
		h3 {
			width: 200px;
			text-align: center;
			line-height: 60px;
			cursor: pointer;
			color: #fff;
			background: rgba(255,255,255,.2);
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
					position: relative;
					width: 100%;
					padding-left: 20px;
					color: #fff;
					letter-spacing: 2px;
					.fa {
						position: absolute;
						top: 17px;
						right: 10px;
					}
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
				color: #fff;
				font-size: 16px;
				&:hover {
					background: rgba(255,255,255,.3);
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
</style>