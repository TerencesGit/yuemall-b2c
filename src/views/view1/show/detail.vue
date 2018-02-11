<template>
	<section class="show-page" v-bind:style="{background: bgColor}">
		<div v-title :data-title="this.$route.name"></div>
		<header class="show-header">
			<img :src="headerImg" alt="">
		</header>
		<main class="show-main">
			<div class="container">
				<img v-for="(item, index) in imageList" :src="item" :index="index + 1">
			</div>
		</main>
	</section>
</template>
<script>
	import { ShowLists } from '@/mock/data/data'
	export default {
		data() {
			return {
				destination: '',
				imageList: [],
				headerImg: '',
				bgColor: '',
				bgColorList: {
					Auckland: '#326307',
					Bali: '#235E80',
					Chejudo: '#088ADE',
					Kyoto: '#983037',
					Maldives: '#3496EF',
					Nara: '#EB6075',
					Paris: '#292637',
					Queenstown: '#014EA8',
					Rome: '#6B4F4B',
					Saipan: '#056CAE',
					Santorini: '#34A0E1',
					Sydney: '#1F2C18',
				}
			}
		},
		methods: {
		},
		mounted() {
			if(this.$route.query.destination) {
				this.destination = this.$route.query.destination;
				this.bgColor = this.bgColorList[this.destination];
				this.imageList = ShowLists[this.destination];
				this.headerImg = this.imageList[0];
				this.imageList.splice(0, 1);
			} else {
				this.$router.push('/')
			}
		}
	}
</script>
<style scoped lang="scss">
	.show-page {
	  .show-header {
	    width: 100%;
	    min-height: 400px;
	    margin-top: 11px;
	    img {
	      display: block;
	      width: 100%;
	    }
	  }
	  .container {
	    position: relative;
	    top: -90px;
	    z-index: 2;
	    img {
	      display: block;
	      width: 100%;
	      height: auto;
	    }
	  }
	}
</style>