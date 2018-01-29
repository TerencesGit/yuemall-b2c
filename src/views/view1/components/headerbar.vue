<template>
	<header class="header container">
		<div class="site-logo">
			<router-link to="/" class="logo">
				<img :src="logo" alt="">
			</router-link>
		</div>
		<nav class="nav">
			<ul class="nav-list">
				<li v-for="(item, index) in navList" :key="index" class="nav-item">
					<router-link :to="item.url">{{item.title}}</router-link>
				</li>
				<li class="nav-link login">
					<a href="#">登录</a>
				</li>
				<li class="nav-link register">
					<a href="#">注册</a>
				</li>
			</ul>
		</nav>
	</header>	
</template>
<script>
	export default {
		name: 'headerBar',
		props: ['logo'],
		data() {
			return {
				navList: [
					{
						title: '首页',
						url: '/',
					},
					{
						title: '特别推荐',
						url: '/',
					},
					{
						title: '本地拍',
						url: '/',
					},
					{
						title: '全国拍',
						url: '/',
					},
					{
						title: '亚洲拍',
						url: '/',
					},
					{
						title: '全球拍',
						url: '/',
					},
					{
						title: '客片展示',
						url: '/',
					},
				]
			}
		}
	}
</script>
<style scoped lang="scss">
	.header {
		.site-logo {
			margin: -7px 60px;
			.logo {
				display: inline-block;
				width: 118px;
				height: 43px;
				margin-top: 4px;
				img {
					display: block;
					width: 100%;
					height: 100%;
				}
			}
		}
	}
	.nav-list {
		display: flex;
		background: #fff;
		.nav-item {
			height: 40px;
			padding: 10px 0;
			a {
				display: inline-block;
				padding: 0 15px;
				line-height: 1;
				color: #666;
				border-right: 1px solid #ccc;
			}
			&:last-child {
				a {
					border-right: 0;
					&:last-child {
						padding-left: 0;
					}
				}
			}
			&:hover {
				border-bottom: 2px solid #19A9E8;
				a {
					color: #19A9E8;
				}
			}
		}
		.nav-link {
			line-height: 40px;
			a {
				padding-left: 15px;
				color: #666;
			}
			&:hover {
				a {
					color: #19A9E8;
				}
			}
			&.register {
				padding-right: 15px;
			}
		}
	}
</style>