<template>
	<div class="main transition" @mousewheel.native="scroll">
		<div class="wrapper">
			<div class="container-fluid">
				<!-- <el-breadcrumb separator="/" class="breadcrumb-inner">
					<el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
						<router-link :to="item.path">{{ item.name }}</router-link>
					</el-breadcrumb-item>
				</el-breadcrumb> -->
				<transition name="fade" mode="out-in">
					<router-view></router-view>
				</transition>
				<div class="wrap-footer"></div>
				<div class="btn-top transition" v-show="backShow" @click="toTop">
					<i class="fa fa-angle-up"></i>
					<span>顶部</span>
				</div>
			</div>
		</div>
		<FooterComp></FooterComp>
	</div>
</template>
<script>
// import { mapGetters } from 'vuex'
import FooterComp from './Footer'
export default {
	name: 'main',
	data () {
		return {
			backShow: false
		}
	},
	components: {
		FooterComp
	},
  methods: {
  	scroll () {
  		// console.log(window.scrollY)
  		this.backShow = window.scrollY >= 100 ? true : false
  	},
    toTop () {
    	let timer = null;
      let gotoTop = () => {
        let currentPosition = document.documentElement.scrollTop || document.body.scrollTop;
        currentPosition -= 50;
        if (currentPosition > 0) {
          window.scrollTo(0, currentPosition);
        } else {
          window.scrollTo(0, 0);
          clearInterval(timer);
          timer = null;
        }
      }
      timer = setInterval(gotoTop, 1)
    }
  },
  mounted () {
  	document.addEventListener('scroll', this.scroll)
  }
}
</script>
<style scoped lang="scss">
	.main {
		position: absolute;
    top: 110px;
    left: 0;
    right: 0;
    height: calc(100% - 110px);
    .wrapper {
	    min-height: 100%;
	    height: auto !important;
	    height: 100%;
	    margin-bottom: -145px;
	  }
	}
	.main.spread {
		left: 0;
	}
  .container-fluid {
    margin-right: auto;
    margin-left: auto;
    padding: 0;
  }
  .el-breadcrumb {
		padding: 0 0 10px;
		font-size: 14px;
  }
  .wrap-footer {
		height: 145px;
	}
	.btn-top {
		position: fixed;
		right: 30px;
		bottom: 100px;
		z-index: 999;
		width: 45px;
		height: 45px;
		line-height: 45px;
		text-align: center;
		color: #999;
		cursor: pointer;
		background: #fff;
		border: 1px solid #e5e5e5;
		&:hover {
			i {
				display: none;
			}
			span {
				display: block;
			}
		}
		i {
			margin-top: 5px;
			font-size: 32px
		}
		span {
			display: none;
			font-size: 12px;
		}
	}
	.fade-enter-active, .fade-leave-active {
	  transition: all .3s;
	}
	.fade-enter, .fade-leave-active {
	  opacity: 0;
		// transform: translateX(30px);
	}
</style>
