<template>
	<div class="searchbar">
		<div class="search-tip">
			<dl class="dst-list">
				<dt>目的地：</dt>
				<dd v-for="item in recommendList">
					<a href="javascript:;" @click="recommendClick(item)">{{item}}</a>
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
		data() {
			return {
				searchValue: '',
				recommendList: [
					'三亚',
					'海南',
					'深圳',
					'云南',
					'澳洲',
					'美国',
				]
			}
		},
		methods: {
			recommendClick(value) {
				this.searchValue = value;
			},
			handleSearch() {
				if(!this.searchValue) return;
				this.$notify({
					type: 'warning',
					title: '提示',
					message: `暂无${this.searchValue}相关内容`,
				})
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
						color: #01A0E7;
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