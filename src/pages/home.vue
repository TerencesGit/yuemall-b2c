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
	</section>
</template>
<script>
	export default {
		data() {
			return {
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
</style>