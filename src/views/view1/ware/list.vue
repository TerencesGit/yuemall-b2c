<template>
  <div class="container">
  		<div v-title :data-title="this.$route.name"></div>
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
	        <div v-if="wareTypeList.length === 0" class="ware-box-empty">
	        	未查询到满足条件的商品
	        </div>
	       <!--  <ul class="ware-list">
						<li v-for="ware in wareTypeList" :index="ware.id" class="ware-item">
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
					</ul> -->
					<ul class="ware-list-horizontal">
						<li v-for="ware in wareTypeList" :index="ware.id" class="ware-item">
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
									<p v-else class="ware-price-hidden">
										<router-link to="/login">登录后价格可见</router-link>	
									</p>
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
	import { findWareKindsAndDstCities, findWareList, findWareListBySearch, recommendWare, warelistByContinent, datalist, findSrcAndDstListByWareKind, dstCityByContinent, localList } from '@/api'
	export default {
		data() {
	    return {
        storeId: '',
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
        wareType: '',
        wareTypeList: [],
        typeQuery: {
        	continent: '',
        	exclude: '',
        }
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
				if(val === 0) {
					this.getWareList()
					return;
				}
				let _wareKinds = {
	        '415057355555522': 'TourismPhoto',
	        '415057355808314': 'Tourism',
	        '715060598102532': 'DomesticPhoto',
	        '715060598613714': 'AbroadPhoto',
		    }
		    this.$router.push({
					path: '/ware/list',
					query: {
						type: _wareKinds[val]
					},
				})
				this.getWareList()
				// this.handlePageJump()
				this.getDstCitiesByWareKind()
			},
			handleTripDayChange(val) {
				// this.handlePageJump()
				this.getWareList()
			},
			handleDstCityChange(val) {
				// this.handlePageJump()
				this.getWareList()
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
				this.getWareList()
				// this.handlePageJump()
			},
			cancelServiceDate() {
				this.startDate = '';
				this.endDate = '';
			},
			handlePageJump() {
				let _wareKinds = {
	        '415057355555522': 'TourismPhoto',
	        '415057355808314': 'Tourism',
	        '715060598102532': 'DomesticPhoto',
	        '715060598613714': 'AbroadPhoto',
		    }
				let queryObj = {
					// wareKind: this.wareKind,
					type: _wareKinds[this.wareKind],
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
	    		providerId: this.storeId
	    	}
	    	findWareKindsAndDstCities(data).then(res => {
	    		// console.log(res)
	    		if(res.data.status === 1) {
	    			this.wareKinds = res.data.data.wareKinds;
	    			let _wareKinds = {
				        '415057355555522': '一价全包',
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
	    	let url = `/portal/api/waretripinfo/findSrcAndDstListByWareKind/${this.storeId}?wareKindId=${this.wareKind}`;
	    	axios.get(url).then(res => {
	    		// console.log(res)
	    		if(res.data.status === 1) {
	    			this.dstCities = res.data.data.dstCities;
	    		} else {
	    			this.$message.error(res.data.message)
	    		}
	    	})
	    },
	    getWareList() {
	    	let data = {
	    		providerId: this.storeId,
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
	    			this.wareTypeList = res.data.data.wares;
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
	    		providerId: this.storeId,
	    		searchCondition: this.searchName,
	    		page: {
	    			currentPage: this.page.pageNo,
	    			pageSize: this.page.pageSize
	    		},
	    	}
	    	this.loading = true;
	    	findWareListBySearch(data).then(res => {
	    		this.loading = false;
	    		if(res.data.status === 1) {
	    			console.log(res.data.data)
	    			this.wareTypeList = res.data.data.wareTripInfos;
	    			this.page.total =  res.data.data.page.totalCount;
	    		} else {
						this.$message.error(res.data.msg)
	    		}
	    	}).catch(err => {
	    		console.log(err)
	    	})
	    },
	    getHotCityList() {
        let url = `/portal/api/waretripinfo/findSrcAndDstListByWareKind/${this.storeId}?wareKindId=415057355555522`;
        axios.get(url).then(res => {
          // console.log(res)
          if(res.data.status === 1) {
            this.dstCities = res.data.data.dstCities;
          } else {
            this.$message.error(res.data.message)
          }
        })
      },
	    getRecommendWare() {
        let data = {
          dstCityCode: '',
          providerId: this.storeId,
        }
        this.loading = true;
        recommendWare(data).then(res => {
        	this.loading = false;
          if(res.data.status === 1) {
            this.wareTypeList = res.data.data;
            this.page.total = res.data.data.length;
          } else {
            this.$message.error(res.data.msg)
          }
        })
      },
      getLocalWareList() {
        let data = {
          storeId: this.storeId,
        }
        localList(data).then(res => {
          if(res.data.status === 1){
            this.wareTypeList = res.data.data;
            // .filter((w, index) => index >= 0 && index < 9);
          } else {
            this.$message.error(res.data.msg)
          }
        })
      },
      getCityListByContinent() {
        let params = {
          storeId: this.storeId,
          continent: this.typeQuery.continent,
          exclude: this.typeQuery.exclude,
        }
        dstCityByContinent(params).then(res => {
          if(res.data.status === 1) {
            this.dstCities = res.data.data;
          } else {
            this.$message.error(res.data.msg)
          }
        })
      },
	    handleWareType() {
	    	if(this.wareType === 'Recommend') {
	    		this.getRecommendWare()
	    		this.getHotCityList()
	    	} else if(this.wareType === 'Local') {
	    		this.getLocalWareList()
	    		this.dstCities = []
	    		// this.getHotCityList()
	    	} else if(this.wareType === 'TourismPhoto') {
	    		this.wareKind = '415057355555522';
	    		this.getWareList()
	    		this.getDstCitiesByWareKind()
	    		// this.typeQuery = {
	    		// 	continent: '100-101-000086',
	    		// 	exclude: '',
	    		// }
	    		// this.getWareTypeList()
	    		// this.getCityListByContinent()
	    	} else if(this.wareType === 'DomesticPhoto') {
	    		this.wareKind = '715060598102532';
	    		this.getWareList()
	    		this.getDstCitiesByWareKind()
	    		// this.typeQuery = {
	    		// 	continent: '100',
	    		// 	exclude: '100-101-000086',
	    		// }
	    		// this.getWareTypeList()
	    		// this.getCityListByContinent()
	    	} else if(this.wareType === 'AbroadPhoto') {
	    		this.wareKind = '715060598613714';
	    		this.getWareList()
	    		this.getDstCitiesByWareKind()
	    		// this.typeQuery = {
	    		// 	continent: '',
	    		// 	exclude: '100',
	    		// }
	    		// this.getWareTypeList()
	    		// this.getCityListByContinent()
	    	} else if(this.wareType === 'Tourism') {
	    		this.wareKind = '415057355808314';
	    		this.getWareList()
	    		this.getDstCitiesByWareKind()
	    		// this.typeQuery = {
	    		// 	continent: '',
	    		// 	exclude: '100',
	    		// }
	    		// this.getWareTypeList()
	    		// this.getCityListByContinent()
	    	}
	    },
	    getWareTypeList() {
        let data = {
          storeId: this.storeId,
          continent: this.typeQuery.continent,
          exclude: this.typeQuery.exclude,
        }
        this.loading = true;
        warelistByContinent(data).then(res => {
        	this.loading = false;
          if(res.data.status === 1){
            this.wareTypeList = res.data.data;
            this.page.total =  res.data.data.length;
            // .filter((w, index) => index >= 0 && index < 9);
          }
        })
      },
		},
		computed: {
			isLogin() {
				return this.$store.getters.isLogin;
			},
		},
		beforeRouteUpdate (to, from, next) {
			if(to.query && to.query.type) {
				this.wareType = to.query.type;
			}
			this.handleWareType()
			next()
		},
		created() {
			this.storeId = sessionStorage.getItem('storeId');
			this.searchName = this.$route.query.searchName;
			this.wareType = this.$route.query.type;
			// this.wareKind = this.$route.query.wareKind || 0;
			// this.tripDays = this.$route.query.tripDays || 0;
			// this.dstCityCode = this.$route.query.dstCityCode || 0;
			// this.getDstCitiesByWareKind()
			this.getWareKindsAndDstCites()
			if(this.searchName) {
				this.getWareListBySearchName()
			} else {
				this.handleWareType()
			}
		}
	}
</script>

<style lang="scss" scoped>
	$primaryColor: #41A9FE;
	.ware-filter {
		margin-top: 30px;
		margin-bottom: 20px;
		padding: 10px;
		border: 1px solid #ccc;
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
		width: 1200px;
		overflow: hidden;
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
    width: 1200px;
    margin: 50px auto 20px;
    line-height: 36px;
    border: 1px solid #ddd;
    li {
    	float: left;
      width: 90px;
      // padding-bottom: 10px;
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
	.ware-list-horizontal {
		display: flex;
		width: 100%;
		flex-wrap: wrap;
		margin-bottom: 20px;
		> li {
			width: 232px;
			margin-right: 10px;
			margin-bottom: 15px;
			border: 1px solid #ddd;
			transition: all .2s linear;
			&:nth-child(5n) {
				margin-right: 0;
			}
			&:hover {
				// border: 1px solid #00a0e9;
				box-shadow: 0 15px 30px rgba(0,0,0,.1);
				transform: translate3d(0, -1px, 0);
			}
			.ware-detail {
				padding: 10px;
				.ware-name {
					height: 38px;
					overflow: hidden;
					color: #666;
					font-size: 13px;
					font-weight: normal;
				}
				.ware-keywords {
					height: 28px;
					margin: 5px 0;
					overflow: hidden;
					li {
						float: left;
						padding: 2px 5px;
						margin-left: 5px;
						margin-bottom: 5px;
						font-size: 13px;
						color: #999;
						border: 1px solid #ddd;
						&:first-child {
							margin-left: 0;
						}
					}
				}
				.ware-price {
					margin-top: 20px;
					font-size: 14px;
					.price {
						color: #FF6701;
					}
				}
				.ware-price-hidden {
					a {
						margin-top: 15px;
						font-size: 14px;
						color: #FF6701;
					}
				}
			}
			img {
				width: 100%;
				max-height: 160px;
			}
		}
	}
</style>
