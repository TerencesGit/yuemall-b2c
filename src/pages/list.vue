<template>
	<section>
		<div v-title :data-title="pageTitle"></div>
		<div class="main-wrap">
			<div class="searchbar">
				<div class="filter-item">
					<label>产品类型：</label>
					<el-radio-group v-model="filter.type" @change="handleChange">
				    <el-radio-button v-for="item in typeList" :key="item.label" :label="item.label">{{item.text}}</el-radio-button>
				  </el-radio-group>
			  </div>
			  <div class="filter-item">
					<label>出行日期：</label>
					<el-radio-group v-model="filter.month" @change="handleChange">
				    <el-radio-button v-for="item in monthList" :key="item.label" :label="item.label">{{item.text}}</el-radio-button>
				  </el-radio-group>
			  </div>
			  <div class="filter-item">
					<label>行程天数：</label>
					<el-radio-group v-model="filter.dayNum" @change="handleChange">
				    <el-radio-button v-for="item in dayNumList" :key="item.label" :label="item.label">{{item.text}}</el-radio-button>
				  </el-radio-group>
			  </div>
			</div>
			<el-row :gutter="30" class="m-t m-b">
				<el-col :span="18">
					<el-tabs v-model="activeName" type="card" @tab-click="tabClick">
				    <el-tab-pane label="综合排序" name="first">
				    </el-tab-pane>
				    <el-tab-pane label="销量优先" name="second"></el-tab-pane>
				    <el-tab-pane label="价格" name="third"></el-tab-pane>
				    <el-tab-pane label="今日新品" name="fourth"></el-tab-pane>
				  </el-tabs>
		  		<div class="ware-list" v-loading="loading">
		    		<el-row :gutter="15" class="ware-item" v-for="(item, index) in wareList" :key="index">
		    			<el-col :span="7" class="ware-img">
			    			<img :src="item.wareImgUrl">
		    			</el-col>
		    			<el-col :span="17" class="ware-detail">
		    				<h3 class="ware-name">
		    					{{item.wareName}}
		    				</h3>
		    				<div class="ware-tag">
		    					<span v-for="(tag, index) in item.wareTag" :key="index">
		    						{{tag}}
		    					</span>
		    				</div>
		    				<div class="ware-date">
		    					<span>行程天数：{{item.wareDayNum}}天</span>
		    					<span>出发日期：{{item.wareStartDate}}月</span>
		    				</div>
		    				<div class="ware-brand">
		    					商品品牌：{{item.wareBrandName}}
		    				</div>
		    				<div class="ware-price">
		    					<i class="fa fa-rmb"></i>
		    					<em>{{item.warePrice}}</em>起
		    					<!-- <el-button :plain="true" type="reserve" class="pull-right" @click="btnClick(item.wareId, item.wareName)">立即预定</el-button> -->
		    				</div>
		    			</el-col>
		    			<div class="mask" @click="showDetail(item)"></div>
		    		</el-row>
		    	</div>
		    	<div class="pagination">
		    		<el-pagination
				      @current-change="handleCurrentChange"
				      :current-page.sync="pageNo"
				      :page-size="20"
				      layout="prev, pager, next, jumper"
				      :total="200">
				    </el-pagination>
		    	</div>
				</el-col>
				<el-col :span="6">
					<div class="recommend">
						<h3 class="title">精品推荐</h3>
						<ul class="recommend-list">
							<li class="recommend-item clearfix" v-for="item in recommendList" :key="item.wareId">
								<router-link :to="item.wareUrl" :title="item.wareName">
									<div class="ware-img">
										<img :src="item.wareImgUrl">
									</div>
									<div class="ware-name" >
										{{item.wareName}}
									</div>
								</router-link>
							</li>
						</ul>
					</div>
					<div class="activity">
						<h3 class="title">
							最新活动
						</h3>
						<ul class="activity-list">
							<li v-for="item in recommendList" :key="item.wareId" class="activity-item">
								<router-link :to="item.wareUrl" class="ware-img" :title="item.wareName">
									<img :src="item.wareImgUrl">
								</router-link>
							</li>
						</ul>
					</div>
				</el-col>
			</el-row>
		</div>
	</section>
</template>
<script>
	import { getWares, getRecommends } from '@/api'
	export default {
		data () {
			return {
				pageTitle: '悦视觉全球旅拍',
				pageNo: 1,
				loading: false,
				filter: {
					type: 0,
					month: 0,
					dayNum: 0,
				},
				typeList: [
					{ label: 0, text: '不限'},
					{ label: 1, text: '拍摄'},
					{ label: 2, text: '拍摄+接/送机'},
					{ label: 3, text: '拍摄+酒店'},
					{ label: 4, text: '拍摄+行程'},
				],
				monthList: [
					{ label: 0, text: '不限'},
					{ label: 1, text: '一月'},
					{ label: 2, text: '二月'},
					{ label: 3, text: '三月'},
					{ label: 4, text: '四月'},
					{ label: 5, text: '五月'},
					{ label: 6, text: '六月'},
					{ label: 7, text: '七月'},
					{ label: 8, text: '八月'},
					{ label: 9, text: '九月'},
					{ label: 10, text: '十月'},
					{ label: 11, text: '十一月'},
					{ label: 12, text: '十二月'},
				],
				dayNumList: [
					{label: 0, text: '不限'},
					{label: 1, text: '1天'},
					{label: 2, text: '2天'},
					{label: 3, text: '3天'},
					{label: 4, text: '4天'},
					{label: 5, text: '5天'},
					{label: 6, text: '6天'},
					{label: 7, text: '7天'},
					{label: 8, text: '8天'},
					{label: 9, text: '9天'},
					{label: 10, text: '10天'},
					{label: 11, text: '10天以上'},
				],
				activeName: 'first',
				wareList: [],
				recommendList: [],
			}
		},
		methods: {
			// 商品列表
			getWareList() {
				this.loading = true;
				getWares().then(res => {
					this.loading = false
					if(res.data.code === '0001'){
						this.wareList = res.data.result.wareList;
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(err => {
					console.log(err)
					this.loading = false
				})
			},
			// 推荐列表
			getRecommendList() {
				getRecommends().then(res => {
					if(res.data.code === '0001'){
						this.recommendList = res.data.result.recommendList;
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(err => {
					console.log(err)
				})
			},
			handleChange(val) {
				this.loading = true;
      	setTimeout(() => {
      		this.wareList.sort(() => {
      			return 0.5 - Math.random()
      		})
      		this.loading = false;
      	}, 500)
			},
			tabClick(tab, event) {
        // console.log(tab)
        this.handleChange()
      },
      showDetail(item) {
      	window.open(`#/detail?wareId=${item.wareId}&&wareName=${item.wareName}&&wareImg=${item.wareImgUrl}`)
      },
      handleCurrentChange(val) {
      	this.handleChange()
      }
		},
		created() {
    	let title = this.$route.query.title || '';
    	this.pageTitle = title ? '悦视觉全球旅拍-' + title : '悦视觉全球旅拍'
    	this.getWareList()
    	this.getRecommendList()
    }
	}
</script>
<style scoped lang="scss">
	.searchbar {
		margin-bottom: 20px;
		padding: 10px;
		border-bottom: 1px solid #ccc;
	}
	.filter-item {
		padding: 10px 0;
		font-size: 13px;
	}
	.el-radio-button {
		margin-left: 15px
	}
	.el-radio-button__inner {
		border: 1px solid #bfcbd9;
	}
	.ware-list {
		min-height: 500px;
		overflow: hidden;
	}
	.ware-item {
		position: relative;
		padding: 15px 10px;
		cursor: pointer;
		border-bottom: 1px solid #f3f3f3;
		&:hover {
			.mask {
				display: block;
			}
		}
		.mask {
			display: none;
			position: absolute;
			top: 0;
			left: 0;
			bottom: 0;
			width: 100%;
			background: rgba(0,0,0,.05)
		}
		.ware-img {
			height: 160px;
		} 
		img {
			width: 100%;
			height: 100%
		}
	}
	.ware-detail {
		height: 160px;
		padding: 5px 15px;
		div {
			margin: 8px 0;
			font-size: 12px;
		}
		.ware-name {
			height: 40px;
			margin-bottom: 10px;
			font-weight: bold;
		}
		.ware-tag {
			span {
				margin-right: 15px;
				padding: 2px 6px;
				color: #3aaeff;
				border: 1px solid #3aaeff
			}
		}
		.ware-price {
			margin-bottom: 0;
			color: #f60;
			em {
				font-style: normal;
				font-size: 24px;
			}
			button {
				margin-top: -5px
			}
		}
	}
	.el-button--reserve {
		color: #ff9d00;
		border-radius: 0;
    border: 1px solid #ff9d00;
    &:hover,
    &:active,
    &:focus {
    	color: #fff;
    	background: #ff9d00;
    	border: 1px solid #ff9d00;
    }
	}
	.title {
		margin: 15px 15px 0 10px;
		padding: 10px 0;
	}
	.recommend-item {
		padding: 10px;
		overflow:hidden;
		.ware-img {
			float: left;
			width: 48%;
			height: 80px;
			margin-right: 2%;
		}
		img {
			width: 100%
		}
		.ware-name {
			float: left;
			width: 50%;
			height: 80px;
			font-size: 14px;
			color: #666;
			overflow: hidden
		}
	}
	.activity-item {
		padding: 5px 10px;
	}
	.pagination {
		display: flex;
		justify-content: flex-end;
		padding-top: 20px;
	}
</style>