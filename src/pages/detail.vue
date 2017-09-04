<template>
	<section>
		<div v-title :data-title="pageTitle"></div>
		<div class="main-wrap">
			<el-breadcrumb separator=">" class="breadcrumb-inner">
				<el-breadcrumb-item v-for="(item, index) in navList" :key="index">
					<router-link :to="item.url" replace>{{ item.name }}</router-link>
				</el-breadcrumb-item>
			</el-breadcrumb>
			<div class="ware-main">
				<el-row :gutter="20">
					<el-col :span="12" class="ware-img">
						<el-carousel indicator-position height="280px">
					    <el-carousel-item v-for="(item, index) in wareImgList" :key="index">
					      <img :src="item.imgUrl" :title="item.title">
					    </el-carousel-item>
					  </el-carousel>
					  <full-calendar 
				      :events="skuList" 
				      first-day='0' 
				      :selectedDay="startDate" 
				      @changeMonth="changeMonth" 
				      @dayClick="dayClick"
				      @eventClick="dayClick">
				    </full-calendar>
					</el-col>
					<el-col :span="12" class="ware-info">
						<div class="ware-desc">
							<div class="ware-name">
								<h2>{{ wareName }}</h2>
							</div>
							<div class="ware-price">
								<i class="fa fa-rmb"></i>
								<strong>12999</strong>/人起
								<span>新品上架</span>
							</div>
							<div class="ware-reserve">
								<span>预定须知</span>
								<span>提前预定</span>
								<span>建议提前30天预定</span>
							</div>
						</div>
						<div class="ware-choose">
							<div>
								<label>行程天数：</label>
								<span>6天4晚游</span>
							</div>
							<div>
								<label>出发城市：</label>
								<span>{{srcCity}}</span>
							</div>
							<div>
								<label>出发日期：</label>
								<span>{{startDate || skuList[0].start }}</span>
							</div>
							<div class="tourist-number">
								<label>出游人数：</label>
								<el-input-number size="small" :min="1" :max="100" v-model="adultNum"></el-input-number> 成人
								<el-input-number size="small" :min="0" :max="100" v-model="childNum"></el-input-number> 儿童
							</div>
							<div class="recommend">
								<dl>
									<dt>产品经理推荐</dt>
									<dd v-for="item in recommendList">
										<i class="el-icon-star-on"></i>
										{{item.text}}
									</dd>
								</dl>
							</div>
							<div class="total-price">
								<label>总价：</label>
								<div>
									<i class="fa fa-rmb"></i>
									<strong>{{totalPrice}}</strong>
								</div>
								<el-button type="warning" size="large" class="btn-reserve" :disabled="isDisabled" @click="handleBook">立即预定</el-button>
							</div>
						</div>
					</el-col>
				</el-row>
			</div>
			<div class="ware-service panel" v-show="serviceShow">
				<div class="panel-header">
					<h3 class="title">附加服务</h3>
					<router-link to="/list">更多产品 
						<i class="el-icon-d-arrow-right"></i>
					</router-link>
				</div>
				<div class="panel-body">
					<div class="additional-service">
						<h3 class="title">可选资源</h3>
						<div class="service-list">
							<div class="service-item">
							</div>
						</div>
					</div>
					<div class="hot-recommend">
						
					</div>
				</div>
			</div>
			<div class="ware-detail">
				<div ref="detailTab" class="detail-tab" v-bind:class="{'fixed': isTabFixed}">
					<ul>
						<li v-for="(item, index) in tabList" 
							:key="index" 
							v-bind:class="{active: index === tabIndex}" 
							@click="handleTabClick(item, index)">
							{{item.name}}
						</li>
					</ul>
				</div>
			</div>
			<div ref="intro" class="ware-intro tab-panel">
				<div class="panel-body">
					<div class="title">
						产品介绍
					</div>
					<div class="content">
						<img v-for="(item, index) in introImgList" :key="index" :src="item">
					</div>
				</div>
			</div>
			<div ref="cost" class="ware-cost tab-panel">
				<div class="panel-body">
					<div class="title">
						费用说明
					</div>
					<div class="content">
						<h4>费用包含</h4>
						<ol>
							<li>往返经济舱机票、燃油附加费（以实际收费标准为准）、机场建设费</li>
							<li>行程所列酒店住宿费用</li>
							<li>行程内所列餐食（行程中注明的自理餐除外，飞机餐是否收费请参照航空公司规定）。</li>
							<li>领队和当地中文导游服务。</li>
							<li>安排当地专属用车(除部分特殊路段因当地规定及安全考量，则依规定派遣小型车)。</li>
							<li>行程中所列景点首道大门票，详见行程</li>
							<li>新加坡团签、旅游签证费用。</li>
							<li>年龄2--12周岁（不含）,不占床,+600，占床+900，添加可选项，服务标准同成人</li>
						</ol>
						<h4>自理费用</h4>
						<ol>
							<li>您所支付的费用中不包含马来西亚300人民币/人的签证价格。请在出入境时自备有效签证，如需代办，请在预订时选择相应附加费用选项。</li>
							<li>团队中儿童的价格均为不占床含早餐的价格，如需占床，请在预订后续页面中选择儿童占床补差可选项；1位成人携带1位儿童出行，儿童必须占床，请选择15282512可选项。</li>
							<li>由于12岁以下儿童费用为含早餐不占床之报价，若需占床，请在预订后续页面中选择儿童占床费。</li>
							<li>1.2-12周岁以下儿童不占床+600
							2.2-12周岁儿童如占床+900元,12-18周岁为必须占床+900元
							3.60周岁以上老人+400</li>
							<li>出入境个人物品海关征税，超重行李的托运费、保管费。</li>
							<li>因交通延阻、罢工、天气、飞机、机器故障、航班取消或更改时间等不可抗力原因所导致的额外费用。</li>
							<li>酒店内洗衣、理发、电话、传真、收费电视、饮品、烟酒等个人消费。</li>
							<li>“费用包含”中不包含的其它项目。</li>
							<li>单房差</li>
							<li>不包含司导和领队小费，请您在当地随团支付给领队，共计200/人，以便随团人员为你提供更好的服务。</li>
						</ol>
					</div>
				</div>
			</div>
			<div ref="reserve" class="ware-reserve tab-panel">
				<div class="panel-body">
					<div class="title">
						预定须知
					</div>
					<div class="content">
						<h4>预定限制</h4>
						<ol>
							<li>本产品不接受非大陆籍客人预订，敬请谅解！</li>
							<li>本产品不接受81岁以上(含)客人预订，敬请原谅。</li>
							<li>18岁以下未成年人需要至少一名家长或成年旅客全程陪同。</li>
							<li>70周岁（含）以上老年人预订出行需确保身体健康适宜旅游，并有25周岁以上家属或朋友（因服务能力所限无法接待及限制接待的人除外）全程陪同出行。</li>
							<li>本产品不接受儿童按成人提交订单，敬请谅解。</li>
							<li>报价是按照2人入住1间房计算的价格，如您的订单产生单房，携程将安排您与其他客人拼房入住；在无法拼房的情况下，将会安排3人间加床（温馨提示：当地酒店面积小，加床可能会引起您的不便，敬请谅解）。如您要求享受单房，请在后续附加产品页面中选择单人房差选项。</li>
						</ol>
						<h4>预订说明</h4>
						<ol>
							<li>请您在预订时务必提供准确、完整的信息（姓名、性别、证件号码、国籍、联系方式、是否成人或儿童等），以免产生预订错误，影响出行。如因客人提供错误个人信息而造成损失，我社不承担任何责任。</li>
						</ol>
						<h4>产品说明</h4>
						<ol>
							<li>最终的航班信息请以出团说明会或出团通知书为准。</li>
							<li>如因意外事件及不可抗力，包括但不限于，航空公司运力调配、航权审核、机场临时关闭、天气原因、航空管制等，导致航班取消或延期的，旅行社将尽最大努力协助您办理变更事宜，如产生差价，多退少补。</li>
							<li>具体航班号及航班时刻，请以最终所出机票信息为准。</li>
						</ol>
						<h4>{{guide.title}}</h4>
						<ol>
							<li v-for="(item, index) in guide.content" :key="index">
								{{item}}
							</li>
						</ol>
					</div>
				</div>
			</div>
			<div ref="visa" class="ware-visa tab-panel">
				<div class="panel-body">
					<div class="title">
						签证/签注
					</div>
					<div class="content">
						<h4>签证须知</h4>
						<ol>
							<li>如您持外籍护照前往中国境外，请确保持有再次进入中国大陆的有效签证。</li>
							<li>未成年儿童预订说明：领馆不建议18周岁以下的未成年人与非直系亲属同行，请您斟酌。18周岁以下的未成年人，如父母双方均不出行，需额外再提供未成年人出生证明复印件，父母的身份证复印件以及父母双方的同意信、未成年人与同行人的亲属关系公证书原件（亲属提供）。</li>
							<li>如单女出行，请补交一份6000元存款证明。</li>
						</ol>
					</div>
				</div>
			</div>
			<div class="ad">
				<img src="http://www.fookvision.com//Public/Wwwfookvisioncom/images/index/advent.jpg" alt="">
			</div>
		</div>
	</section>
</template>
<script>
	import Utils from '@/assets/js/utils'
	export default {
		data() {
			return {
				pageTitle: '悦视觉全球旅拍',
				serviceShow: false,
				navList: [
					{
						name: '旅游',
						url: '/'
					},
					{
						name: '亚洲旅游',
						url: '/oversea'
					},
					{
						name: '印度尼西亚',
						url: '/oversea'
					},
					{
						name: '巴厘岛',
						url: '/detail'
					},
				],
				wareImgList: [
					{
						title: '巴厘岛婚纱摄影',
						url: '/detail',
						imgUrl: 'http://www.fookvision.com/Public/Wwwfookvisioncom/images/activity/anniversary/pic_16.png'
					},
					{
						title: '圣托里尼婚纱摄影',
						url: '/detail',
						imgUrl: 'http://www.fookvision.com/Public/Wwwfookvisioncom/images/activity/anniversary/pic_18.png'
					},
					{
						title: '塞班岛婚纱摄影',
						url: '/detail',
						imgUrl: 'http://www.fookvision.com/Public/Wwwfookvisioncom/images/activity/anniversary/pic_22.png'
					},
				],
				skuList: [],
				wareName: '【巴厘岛蜜月旅拍婚纱摄影6天4晚游】一对一司导+接送机+一日全天拍摄+国际五星',
				srcCity: '北京',
				startDate: '',
				adultNum: 1,
				childNum: 0,
				adultPrice: 0,
				childPrice: 0,
				recommendList: [
					{
						text:  '岛屿很大，活动多，有一个漂亮的长拖尾沙滩'
					},
					{
						text: '设施服务都很完善，新房型隔音好，晚上睡觉没有海浪声'
					},
					{
						text: '有中文GO，性价比很高，小黑都很淳朴，很友好，有求必应'
					},
					{
						text: '可以搭乘水上飞机，高空俯瞰马代全海景，这份体验不让你失望'
					}
				],
				tabList: [
					{ name: '产品介绍', ref: 'intro' },
					{ name: '费用说明', ref: 'cost' },
					{ name: '预定须知', ref: 'reserve' },
					{ name: '签证/签注', ref: 'visa' },
				],
				tabIndex: 0,
				isTabFixed: false,
				introImgList: [
					'https://dimg04.c-ctrip.com/images/300h0i0000009k0kr26D9.jpg',
					'https://dimg04.c-ctrip.com/images/300j0i0000009k152AABF.jpg',
					'https://dimg04.c-ctrip.com/images/300j0i0000009k153BA9E.jpg',
				],
				guide: {
					title: '出行指南及法规',
					content: [
						'新加坡出行指南',
						'禁忌提示：请尊重当地的饮食习惯、习俗禁忌、宗教礼仪等，入乡随俗，融入当地的民风民情。',
						'为了您人身、财产的安全，请您避免在公开场合暴露贵重物品及大量现金。上街时需时刻看管好首饰、相机等随身物品。',
						'游泳、漂流、潜水、滑雪、溜冰、戏雪等活动项目，均存在危险。参与前请根据自身条件，并充分参考当地相关部门及其它专业机构的相关公告和建议后量力而行。',
						'携程从出行常识、旅游活动（风险性项目）和特殊人群三方面为您提供旅游安全指南，请您仔细阅读, 安全指南及警示。',
						'为普及旅游安全知识及旅游文明公约，使您的旅程顺利圆满完成，特制定 《携程旅游告游客注意事项》，请您认真阅读并切实遵守。',
						'请务必仔细阅读关于 《国际航班手提行李规定》。',
						'为确保锂电池的安全运输，避免发生不安全事件，我们友情提醒您，民航局将对旅客携带锂电池乘机进行严格检查。详情请参考 民航局关于旅客行李中携带“锂电池、充电宝”乘机规定的公告。',
						'根据中国海关总署颁布的2010年第54号、2016年第19号、2016年第25号令，进境公民旅客携带在境外获取5000元以内（含5000元）个人自用进境物品的基础上，允许其在口岸进境免税店增加一定数量的免税购物额，连同境外免税购物额总计不超过8000元人民币的，海关予以免税放行，但烟草制品、酒精制品等国家规定应当征税的商品不在免税范围内，敬请知晓。详情请 点击。',
						'新加坡旅游游客退税指南',
						'根据发布的《中华人民共和国禁止携带、邮寄进境的动植物及其产品和其他检疫物名录》，将燕窝、新鲜水果、蔬菜、动物源性中药材、转基因生物材料等列入严禁携带或邮寄进境项目，敬请知晓。更多信息， 请点击。',
						'请您严格遵守境外旅游目的地有关国家法律法规，切勿从事象牙等濒危野生动植物及其制品交易或携带相关物品，避免因触犯法律损害自身利益。'
					]
				}
			}
		},
		methods: {
			changeMonth(e) {
				// console.log(e)
			},
			dayClick(day, event) {
				// console.log(event)
				if(event){
					this.childPrice = event.childPrice || 0;
					this.adultPrice = event.adultPrice || 0;
					this.startDate = day;
				}
			},
			handleTabClick (item, index) {
				this.tabIndex = index;
				let offsetTop = this.$refs[item.ref].offsetTop + 72;
				if (item.ref === 'intro') {
					window.scrollTo(0, 945)
				} else {
					window.scrollTo(0, offsetTop)
				}
			},
			scrollEvent () {
				this.isTabFixed = document.body.scrollTop > 945 ? true : false;
				let top = document.body.scrollTop;
				if (top > this.$refs['visa'].offsetTop) {
					this.tabIndex = 3
				} else if (top > this.$refs['reserve'].offsetTop) {
					this.tabIndex = 2
				} else if (top > this.$refs['cost'].offsetTop) {
					this.tabIndex = 1
				} else {
					this.tabIndex = 0
				}
			},
			handleBook () {
				if(!Utils.getCookie('userId')) {
					this.$notify.warning({
						title: '提示',
						message: '请登录先'
					})
					return;
				}
				let order = {
					wareName: this.wareName,
					startDate: this.startDate,
					srcCity: this.srcCity,
					adultPrice: this.adultPrice,
					adultNum: this.adultNum,
					childPrice: this.childPrice,
					childNum: this.childNum,
					totalPrice: this.totalPrice,
					wareImg: this.wareImgList[0].imgUrl
				};
				localStorage.setItem('order', JSON.stringify(order))
				this.$router.push({
					path: `order?wareName=${this.wareName}`
				})
			},
	    getCountDays(d) {
	    	let date = d || new Date();
	    	date.setMonth(date.getMonth() + 1)
	    	date.setDate(0)
	    	return date.getDate()
	    }
		},
		computed: {
			totalPrice () {
				return this.adultPrice * this.adultNum + this.childPrice * this.childNum || '---'
			},
			isDisabled() {
				return parseInt(this.totalPrice) ? false : true;
			}
		},
		created() {
			if (this.$route.query.wareName) {
				this.wareName = this.pageTitle = this.$route.query.wareName;
			}
			if(this.$route.query.wareImg) {
				let imgObj = {
					title: this.$route.query.wareName,
					url: '/detail',
					imgUrl: this.$route.query.wareImg
				}
				this.wareImgList.unshift(imgObj)
			}
			let skuList = [];
			let currDate = new Date(),
			    currYear = currDate.getFullYear(),
			    currMonth = currDate.getMonth(),
			    currDay = currDate.getDate() + 3;
			let nextYear = currMonth === 11 ? currYear + 1 : currYear,
					nextMonth = currMonth === 11 ? 0 : currMonth + 1;
			let currMonthCounts = this.getCountDays(new Date(currYear, currMonth, 1)),
					nextMonthCounts = this.getCountDays(new Date(nextYear, nextMonth, 1))
			// console.log(this.$moment(new Date(currYear, currMonth, currDay)).format('YYYY-MM-DD'))
			// console.log(this.$moment(new Date(nextYear, nextMonth, 1)).format('YYYY-MM-DD'))
			// console.log(this.getCountDays(new Date(currYear, currMonth, 1)))
			// console.log(this.getCountDays(new Date(nextYear, nextMonth, 1)))
			for(let i = currDay; i <= currMonthCounts; i++) {
				let skuItem = {
					start: this.$moment(new Date(currYear, currMonth, i)).format('YYYY-MM-DD'),
					adultPrice: 9900,
					childPrice: 8900,
					storageNum: Math.ceil(Math.random() * 100),
				}
				skuList.push(skuItem)
			}
			for(let i = 1; i <= nextMonthCounts; i++) {
				let skuItem = {
					start: this.$moment(new Date(currYear, currMonth + 1, i)).format('YYYY-MM-DD'),
					adultPrice: 9998,
					childPrice: 8998,
					storageNum: Math.floor(Math.random() * 100),
				}
				skuList.push(skuItem)
			}
			this.skuList = skuList;
		},
		mounted() {
			this.scrollEvent()
			document.addEventListener('scroll', this.scrollEvent)
			// document.onkeydown = this.keyDownEvent
		},
		beforeDestroy() {
			document.removeEventListener('scroll', this.scrollEvent)
		}
	}
</script>
<style scoped lang="scss">
	section {
		height: 100%;
		overflow: hidden;
		background: #f0f2f5;
	}
	.el-breadcrumb {
		margin: -10px 0 5px 5px;
		padding: 6px 0;
	} 
	.ware-main {
		margin-bottom: 20px;
		padding: 15px;
		border: 1px solid #ddd;
		background: #fff
	}
	.ware-info {
		padding: 0 15px;
	}
	.ware-desc {
		div {
			margin: 30px 0;
			&:first-child {
				margin: 0
			}
		}
		.ware-name {
			h2 {
				line-height: 1.5
			}
		}
		.ware-price {
			padding: 15px 20px;
			font-size: 12px;
			color: #999;
			background: rgba(0,0,0,.05);
			i, strong {
				color: #f60;
			}
			strong {
				font-size: 30px
			}
			span {
				margin-left: 60px
			}
		}
		.ware-reserve {
			margin-top: 30px;
			padding-bottom: 30px;
			border-bottom: 1px dashed #ccc;
			span {
				margin-right: 30px;
				&:nth-child(2) {
					padding: 3px 5px;
					color: #fff;
					background: #f90
				}
			}
		}
	}
	.ware-choose {
		margin-top: 60px;
		> div {
			margin: 20px 0;
		}
		label {
			display: inline-block;
			width: 80px;
			color: #666
		}
		span {
			display: inline-block;
			width: 130px;
			padding: 3px 15px;
			border: 1px solid #f90
		}
		.tourist-number {
			.el-input-number:last-child {
				margin-left: 15px;
			}
		}
		.total-price {
			label {
				color: #333;
				font-size: 15px;
				font-weight: bold;
			}
			div {
				display: inline-block;
				width: 150px;
				color: #f90;
				font-weight: bold;
				strong {
					font-size: 30px
				}
			}
			.btn-reserve {
				margin-left: 30px;
				border-radius: 0;
				vertical-align: top;
				font-weight: bold;
			}
		}
		.recommend {
			margin-top: 30px;
			color: #666;
			dt {
				margin: 5px 0;
				font-size: 16px
			}
			dd {
				margin-left: 20px
			}
		}
	}
	.panel {
		margin: 20px 0;
		border: 1px solid #ccc;
		background: #fff;
		.panel-header {
			display: flex;
			justify-content: space-between;
			padding: 10px 15px;
			color: #fff;
			background: #01afc7
		}
		.panel-body {
			padding: 15px
		}
	}
	.additional-service {
		display: flex;
		.service-item {
			display: flex
		}
	}
	.detail-tab {
		width: 1180px;
		padding: 0 15px;
		color: #fff;
		font-size: 15px;
		background: #535d63;
		&.fixed {
			position: fixed;
			top: 0;
			z-index: 99;
		}
		ul {
			display: flex;
			li {
				margin: 0 20px;
				padding: 15px 0;
				color: #fff;
				cursor: pointer;
				&.active {
					color: #75d24d;
					border-bottom: 2px solid #75d24d;
				}
			}
		}
	}
	.tab-panel {
		margin-bottom: 20px;
		.panel-body {
			display: flex;
			padding: 30px 40px 20px 20px;
			background: #fff;
			border: 1px solid #ccc;
			.title {
				width: 60px;
				height: 60px;
				color: #fff;
				padding: 10px;
				font-size: 16px;
				text-align: center;
				background: #75d24d 
			}
			.content {
				flex: 1;
				margin-left: 30px;
				img {
					width: 100%;
					margin-bottom: 10px;
				}
			}
		}
	}
	.ad {
		img {
			width: 100%
		}
	}
</style>