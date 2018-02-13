<template>
	<div class="item-header">
		<div class="header-title">
			<h3 class="en-name uppercase">{{enName}}</h3>
			<h3 class="name">{{name}}</h3>
		</div>
		<div class="more" v-if="moreUrl">
			<router-link :to="moreUrl">查看更多>></router-link>
		</div>
	</div>
</template>
<script>
	export default {
		name: 'itemheader',
		props: ['name', 'enName', 'moreUrl'],
		data () {
			return {

			}
		}
	}
</script>
<style scoped lang="scss">
	$color1: #ff7900; 
	$color2: #058D99; 
	.item-header {
		margin: 30px auto;
		.header-title {
			margin: auto;
			text-align: center;
			h3 {
				display: inline-block;
				height: 50px;
				padding: 0 30px;
				line-height: 50px;
				color: #fff;
				font-size: 20px;
				font-weight: normal;
				&.en-name {
					background: $color2;
				}
				&.name {
					margin-left: -5px;
					background: $color1;
				}
			}
		}
		.more {
			display: flex;
			justify-content: flex-end;
			margin-top: 15px;
			a {
				padding: 5px 15px;
				color: #666;
				border-radius: 6px;
				border: 1px solid #ccc;
				&:hover {
					color: $color1;
					border-color: $color1;
				}
			}
		}
	}
</style>