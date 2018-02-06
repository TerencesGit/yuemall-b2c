<template>
  <div class="container">
      <div class="ware-filter">
				<div class="filter-item">
					<label class="item-title">产品类型：</label>
					<el-radio-group v-model="wareKind" @change="handleWareKindChange">
					  <el-radio-button :label="0">不限</el-radio-button>
				    <el-radio-button v-for="kind in wareKinds" :key="kind.id" :label="kind.id">{{kind.kindName}}</el-radio-button>
				  </el-radio-group>
			  </div>
			  <div class="filter-item service-date">
					<label class="item-title">服务时间：</label>
					<el-date-picker
            v-model="startDate"
            size="mini"
            type="month"
            align="center"
            :editable="false"
            placeholder="最早时间"
            value-format="yyyy-MM"
            @change="handleStartDate">
          </el-date-picker>
          <el-date-picker
	          v-model="endDate"
	          size="mini"
	          type="month"
	          :editable="false"
	          placeholder="最晚时间"
	          value-format="yyyy-MM"
	          @change="handleEndDate">
	        </el-date-picker>
	        <el-button type="primary" size="mini" @click="confirmSeriveDate">确定</el-button>
	        <el-button size="mini" @click="cancelServiceDate">取消</el-button>
			  </div>
			  <div class="filter-item">
					<label class="item-title">服务天数：</label>
					<el-radio-group v-model="tripDays" @change="handleTripDayChange">
						<el-radio-button :label="0">不限</el-radio-button>
				    <el-radio-button v-for="day in 11" :key="day" :label="day">{{day}}天</el-radio-button>
				  </el-radio-group>
			  </div>
			  <div class="filter-item">
					<label class="item-title">目的城市：</label>
					<el-radio-group v-model="dstCityCode" @change="handleDstCityChange">
						<el-radio-button :label="0">不限</el-radio-button>
				    <el-radio-button v-for="(city, index) in dstCities" :key="index" :label="city.dstCityCode">{{city.name}}</el-radio-button>
				  </el-radio-group>
			  </div>
			</div>
      <div class="ware-wrap">
      	<ul class="ware-header clearfix">
          <li @click="saleSort = false">
              销量(<span>↑</span>)
          </li>
          <li @click="handleSaleSort">
              价格(<span v-show="saleSort === 0">↑</span><span v-show="saleSort === 1">↓</span>)
          </li> 
        </ul>
        <div class="ware-list-box" v-loading="loading">
	        <div v-if="wareList.length === 0" class="ware-box-empty">
	        	未查询到满足条件的商品
	        </div>
	        <ul class="ware-list">
						<li v-for="ware in wareList" :index="ware.id" class="ware-item">
							<router-link :to="'/ware/detail?id='+ware.id" target="_blank">
								<img :src="ware.mainImg" class="ware-img">
								<div class="ware-detail">
									<h4 class="ware-name">{{ware.wareName}}</h4>
									<ul class="ware-keywords clearfix">
										<li v-for="item in ware.keyWords.split(',')">{{item}}</li>
									</ul>
									<p v-if="isLogin === 1" class="ware-price">
										<span class="price">
											<i class="icon-rmb">￥</i><strong>{{ware.suggestedPrice}}</strong>
										</span>
										<span>{{ware.unit}}</span>/起
									</p>
									<p v-else class="ware-price-hidden">登录后价格可见</p>
								</div>
							</router-link>
						</li>
					</ul>
        </div>
        <el-pagination
		      @size-change="handleSizeChange"
		      @current-change="handleCurrentChange"
		      :current-page="page.pageNo"
		      :page-sizes="[10, 20, 30, 40]"
		      :page-size="10"
		      layout="total, sizes, prev, pager, next, jumper"
		      :total="page.total">
		    </el-pagination>
      </div>
  </div>
</template>

<script>
	import axios from 'axios';
	import { findWareKindsAndDstCities, findWareList, findWareListBySearch, recommendWare, warelistByContinent, datalist, findSrcAndDstListByWareKind } from '@/api'
	export default {
		data() {
	    return {
        providerId: '',
        isLogin: 0,
        wareKinds: [],
        dstCities: [],
        wareList: [],
        tripDays: 0,
        wareKind: 0,
        dstCityCode: 0,
        srcCityCode: 0,
        startDate: '',
        endDate: '',
        saleSort: 1,
        priceSort: 1,
        page: {
        	pageNo: 1,
        	pageSize: 10,
        	total: 0,
        },
        searchName: '',
        loading: false,
	    }
		},
		methods: {
			handleSizeChange(val) {
				this.page.pageSize = val;
				this.getWareList()
			},
			handleCurrentChange(val) {
				this.page.pageNo = val;
				this.getWareList()
			},
			handleWareKindChange(val) {
				this.wareKind = val;
				this.handlePageJump()
				this.getDstCitiesByWareKind()
			},
			handleTripDayChange(val) {
				this.handlePageJump()
			},
			handleDstCityChange(val) {
				this.handlePageJump()
			},
			handleStartDate(val){
				this.startDate = val;
			},
			handleEndDate(val) {
				this.endDate = val;
			},
			confirmSeriveDate() {
				if(!(this.startDate || this.endDate)) {
					this.$notify({
						type: 'warning',
						title: '提示',
						message: '请选择服务时间'
					})
					return;
				}
				this.handlePageJump()
			},
			cancelServiceDate() {
				this.startDate = '';
				this.endDate = '';
			},
			handlePageJump() {
				let queryObj = {
					wareKind: this.wareKind,
					startDate: this.startDate,
					endDate: this.endDate,
					tripDays: this.tripDays,
					dstCityCode: this.dstCityCode,
				}
				for(let o in queryObj) {
					if(!queryObj[o]) {
						delete queryObj[o]
					}
				}
				this.$router.push({
					path: '/ware/list',
					query: queryObj,
				})
			},
	    handleSaleSort() {
	      this.saleSort = this.saleSort === 0 ? 1 : 0;
	      // console.log(this.saleSort)
	      this.getWareList()
	    },
	    getWareKindsAndDstCites() {
	    	let data = {
	    		providerId: this.providerId
	    	}
	    	findWareKindsAndDstCities(data).then(res => {
	    		console.log(res)
	    		if(res.data.status === 1) {
	    			this.wareKinds = res.data.data.wareKinds;
	    			let _wareKinds = {
				        '415057355555522': '特别推荐',
				        '415057355808314': '旅游',
				        '715060598102532': '国内旅拍',
				        '715060598613714': '国外旅拍',
				    }
				    this.wareKinds.forEach((kind) => {
				      kind.kindName = _wareKinds[kind.id]
				    })
	    		} else {
	    			this.$message.error(res.data.msg)
	    		}
	    	}).catch(err => {
	    		console.log(err)
	    	})
	    },
	    getDstCitiesByWareKind() {
	    	let url = `/portal/api/waretripinfo/findSrcAndDstListByWareKind/${this.providerId}?wareKindId=${this.wareKind}`;
	    	console.log(url)
	    	axios.get(url).then(res => {
	    		console.log(res)
	    		if(res.data.status === 1) {
	    			this.dstCities = res.data.data.dstCities;
	    		} else {
	    			this.$message.error(res.data.message)
	    		}
	    	})
	    },
	    getWareList() {
	    	let data = {
	    		providerId: this.providerId,
	    		wareKind: this.wareKind || '',
	    		tripDays: this.tripDays || '',
	    		srcCityCode: this.srcCItyCode || '',
	    		dstCityCode: this.dstCityCode || '',
	    		startDate: this.startDate,
	    		endDate: this.endDate,
	    		page: {
	    			currentPage: this.page.pageNo,
	    			pageSize: this.page.pageSize,
	    		},
	    		query: {
	    			salesSort: this.salesSort,
	    			priceSort: this.priceSort,
	    		}
	    	}
	    	this.loading = true;
	    	findWareList(data).then(res => {
	    		this.loading = false;
	    		if(res.data.status === 1) {
	    			// console.log(res.data.data)
	    			this.wareList = res.data.data.wares;
	    			this.page.total =  res.data.data.page.totalCount;
	    		} else {
						this.$message.error(res.data.msg)
	    		}
	    	}).catch(err => {
	    		this.loading = false;
	    		console.log(err)
	    	})
	    },
	    getWareListBySearchName() {
	    	let data = {
	    		providerId: this.providerId,
	    		searchCondition: this.searchName,
	    		page: {
	    			currentPage: this.page.pageNo,
	    			pageSize: this.page.pageSize
	    		},
	    	}
	    	findWareListBySearch(data).then(res => {
	    		if(res.data.status === 1) {
	    			console.log(res.data.data)
	    			this.wareList = res.data.data.wareTripInfos;
	    			this.page.total =  res.data.data.page.totalCount;
	    		} else {
						this.$message.error(res.data.msg)
	    		}
	    	}).catch(err => {
	    		console.log(err)
	    	})
	    }
		},
		computed: {
		},
		beforeRouteUpdate (to, from, next) {
			if(to.query && to.query.wareKind) {
				this.wareKind = to.query.wareKind;
			}
			this.getWareList()
			next()
		},
		created() {
			this.providerId = sessionStorage.getItem('providerId');
			this.isLogin = Number(sessionStorage.getItem('isLogin'));
			this.searchName = this.$route.query.searchName;
			this.wareKind = this.$route.query.wareKind || 0;
			this.tripDays = this.$route.query.tripDays || 0;
			this.dstCityCode = this.$route.query.dstCityCode || 0;
			this.getWareKindsAndDstCites()
			this.getDstCitiesByWareKind()
			if(this.searchName) {
				this.getWareListBySearchName()
			} else {
				this.getWareList()
			}
		}
	}
</script>

<style lang="scss" scoped>
	$primaryColor: #41A9FE;
	.ware-filter {
		margin-bottom: 20px;
		padding: 10px;
		border-bottom: 1px solid #ccc;
		.filter-item {
			display: flex;
			padding: 10px 0;
			font-size: 13px;
			.item-title {
				width: 70px;
				margin-top: 5px;
			}
			.el-radio-group {
				flex: 1;
				.el-radio-button {
					margin: 0 10px 10px 0;
				}
				.el-radio-button__inner {
					border: 1px solid #bfcbd9;
				}
			}
			.el-date-editor.el-input {
				width: 150px;
				margin-right: 20px;
				.el-input__inner {
					border-radius: 0;
				}
			}
			.el-button {
				border-radius: 0;
			}
		}
	}
	.ware-list-box {
		.ware-box-empty {
			min-height: 100px;
			line-height: 100px;
			text-align: center;
		}
	}
	.ware-wrap {
		width: 900px;
		margin-bottom: 50px;
	}
	.ware-header {
    width: 900px;
    margin-top: 50px;
    border-bottom: 1px solid #ccc;
    li {
    	float: left;
      width: 90px;
      padding-bottom: 10px;
      text-align: center;
      font-size: 16px;
      color: #292929;
      font-weight: bold;
      cursor: pointer;
      margin-right: 20px;
      border-bottom: 3px solid #fff;
      &:hover{
        border-bottom: 3px solid #00a0e9;
      }
    }
  }
  .ware-list {
		padding-bottom: 15px;
		.ware-item {
			padding: 15px 0 15px;
			border-bottom: 1px solid #f0f0f0;
			&:hover {
				background: #fcfcfc;
			}
			a {
				display: flex;
				color: #333;
			}
			.ware-img {
				width: 240px;
				height: 135px;
				margin-right: 20px;
			}
			.ware-detail {
				flex: 1;
				.ware-name {
					margin-bottom: 10px;
					font-size: 18px;
					color: #292929;
				}
				.ware-keywords {
					li {
						float: left;
						margin: 3px 6px 0 0;
						padding: 5px 10px;
						font-size: 14px;
						color: #41A9FE;
						border: 1px solid #41A9FE;
					}
				}
				.ware-price {
					margin-top: 20px;
					font-size: 16px;
					.price {
						color: #FF6701;
					}
				}
				.ware-price-hidden {
					margin-top: 15px;
					font-size: 16px;
					color: #FF6701;
				}
			}
		}
	}
</style>
