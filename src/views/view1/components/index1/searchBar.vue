<template>
	<div class="searchbar">
		<div class="search-tip" v-show="tipVisible">
			<dl class="dst-list">
				<dt>目的地：</dt>
				<dd v-for="item in recommendList">
					<a href="javascript:;" @click="recommendClick(item.name)">{{item.name}}</a>
				</dd>
			</dl>
		</div>
		<div class="search-inner">
			<i class="el-icon-location"></i>
			<input type="text" class="search-input" v-model="searchValue" placeholder="搜索你想要去的目的地/行程">
			<button class="search-button" @click="handleSearch"><i class="el-icon-search"></i>搜索</button>
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
				tipVisible: true,
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
				this.searchValue = '';
			},
			handleEnter(e) {
				e.keyCode === 13 && this.handleSearch()
			},
			handleFocus () {
				this.tipVisible = false;
			},
			handleBlur() {
				if(this.searchValue.length === 0) {
					this.tipVisible = true;
				}
			}
		},
		mounted() {
			document.querySelector('.search-input').addEventListener('keydown', this.handleEnter)
			document.querySelector('.search-input').addEventListener('focus', this.handleFocus)
			document.querySelector('.search-input').addEventListener('blur', this.handleBlur)
		},
	}
</script>
<style scoped lang="scss">
	$color1: #ff7900;
	.searchbar {
		margin: 40px auto;
		border-radius: 10px;
		background: rgba(255,255,255,.5);
		position: relative;
		.search-tip {
			position: absolute;
			top: 0;
			left: 200px;
			z-index: 2;
			.dst-list {
				display: flex;
				margin: 8px 0;
				dd {
					margin: 0 2px;
					a {
						padding: 1px 3px;
						color: #333;
						&:hover {
							color: #fff;
							background: $color1;
						}
					}
				}
			}
		}
		.search-inner {
			display: flex;
			width: 100%;
			position: relative;
			.el-icon-location {
				position: absolute;
				top: 11px;
				left: 10px;
				color: #999;
			}
			.search-input {
				flex: 1;
				padding: 10px 10px 10px 30px;
				border: 1px solid #ccc;
				border-right: 0;
			}
			.search-button {
				padding: 5px 20px;
				color: #fff;
				font-size: 14px;
				background: $color1;
				i {
					margin-right: 5px;
				}
			}
		}
	}
</style>