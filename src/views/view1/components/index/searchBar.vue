<template>
	<div class="searchbar">
		<div class="search-tip">
			<dl class="dst-list">
				<dt>目的地：</dt>
				<dd v-for="item in recommendList">
					<a href="javascript:;" @click="recommendClick(item.name)">{{item.name}}</a>
				</dd>
			</dl>
		</div>
		<div class="search-inner">
			<input type="text" class="search-input" v-model="searchValue" placeholder="搜索你想要的目的地">
			<button class="search-button" @click="handleSearch">搜索</button>
		</div>
	</div>
</template>
<script>
	export default {
		name: 'searchbar',
		props: ['recommendList'],
		data() {
			return {
				searchValue: '',
				recommendLists: [
					'三亚',
					'大理',
					'巴黎',
					'罗马',
					'济州岛',
					'巴厘岛',
					'普吉岛',
					'塞班岛',
					'马尔代夫',
					'圣托里尼',
				]
			}
		},
		methods: {
			recommendClick(value) {
				// this.searchValue = value;
				const { href } = this.$router.resolve('/ware/list?searchName='+ value)
				window.open(href, '_blank')
			},
			handleSearch() {
				if(!this.searchValue) return;
				const { href } = this.$router.resolve('/ware/list?searchName='+ this.searchValue)
				window.open(href, '_blank')
			}
		}
	}
</script>
<style scoped lang="scss">
	.searchbar {
		padding: 10px 30px 40px;
		border-radius: 10px;
		background: rgba(255,255,255,.5);
		.dst-list {
			display: flex;
			margin: 10px 0;
			dd {
				margin: 0 5px;
				a {
					color: #333;
					&:hover {
						color: #000;
					}
				}
			}
		}
		.search-inner {
			display: flex;
			width: 100%;
			.search-input {
				flex: 1;
				padding: 10px;
				border: 1px solid #ccc;
			}
			.search-button {
				padding: 5px 20px;
				color: #fff;
				font-size: 14px;
				background: #01A0E7;
			}
		}
	}
</style>