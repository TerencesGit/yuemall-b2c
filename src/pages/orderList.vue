<template>
	<section>
		<div class="main-wrap">
			<div class="page-header clearfix">
				<h2 class="pull-left">我的订单</h2>
				<el-button size="small" class="pull-right" @click="showUserInfo">个人信息</el-button>
			</div>
			<el-table
		    :data="orderList"
		    border
		    style="width: 100%">
				<el-table-column type="index" width="50"></el-table-column>
		    <el-table-column prop="orderId" label="订单编号" width="150" sortable></el-table-column>
		    <el-table-column prop="createTime" label="创建时间" width="180" sortable :formatter="formatTime"></el-table-column>
		    <el-table-column prop="name" label="订单名称"></el-table-column>
		    <el-table-column prop="payer" label="下单人" width="110"></el-table-column>
		   <!--  <el-table-column prop="mobile" label="联系电话" width="130"></el-table-column> -->
		    <el-table-column prop="method" label="支付方式" width="100" :formatter="formatMethod"></el-table-column>
		    <el-table-column prop="amount" label="金额" width="120" :formatter="formatAmount"></el-table-column>
		    <el-table-column prop="status" label="状态" width="90" :formatter="formatStatus"></el-table-column>
		    <el-table-column label="操作" width="150">
		      <template scope="scope">
		        <el-button
		          size="small"
		          @click="handleShow(scope.$index, scope.row)">详情</el-button>
		        <el-button
		          size="small"
		          type="danger"
		          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
		      </template>
		    </el-table-column>
		  </el-table>
		</div>
		<el-dialog :visible.sync="dialogVisible" title="订单详情">
			<div class="order-detail">
				<div class="order-item">
					<label>订单编号：</label>
					<span>{{orderObj.orderId}}</span>
				</div>
				<div class="order-item">
					<label>订单名称：</label>
					<span>{{orderObj.name}}</span>
				</div>
				<div class="order-item">
					<label>下单人：</label>
					<span>{{orderObj.payer}}</span>
				</div>
				<div class="order-item">
					<label>支付方式：</label>
					<span>{{orderObj.method === 1 ? '支付宝' : '微信支付'}}</span>
				</div>
				<div class="order-item">
					<label>金额：</label>
					<span>{{'￥'+orderObj.amount}}</span>
				</div>
				<div class="order-item">
					<label>状态：</label>
					<span>{{orderObj.status || '已完成'}}</span>
				</div>
				<div class="order-item">
					<label>创建时间：</label>
					<span>{{this.$moment(orderObj.createTime).format('YYYY-MM-DD HH:mm:ss')}}</span>
				</div>
			</div>
			<div slot="footer">
				<el-button type="primary" @click="dialogVisible = false">确定</el-button>
			</div>
		</el-dialog>
		<el-dialog :visible.sync="userVisible" title="个人信息">
			<div class="user-info">
				<div class="info-item">
					<label>用户名：</label>
					<span>{{userInfo.name}}</span>
				</div>
				<div class="info-item">
					<label>姓名：</label>
					<span>{{userInfo.realName}}</span>
				</div>
				<div class="info-item">
					<label>性别：</label>
					<span>{{userInfo.gender === 1 ? '男' : '女'}}</span>
				</div>
				<div class="info-item">
					<label>邮箱：</label>
					<span>{{userInfo.email}}</span>
				</div>
				<div class="info-item">
					<label>手机号码：</label>
					<span>{{userInfo.mobile}}</span>
				</div>
				<div class="info-item">
					<label>出生日期：</label>
					<span>{{userInfo.birthday}}</span>
				</div>
				<div class="info-item">
					<label>所在地：</label>
					<span>{{userInfo.location}}</span>
				</div>
			</div>
			<div slot="footer">
				<el-button type="primary" @click="userVisible = false">确定</el-button>
			</div>
		</el-dialog>
	</section>
</template>
<script>
	export default {
		data() {
			return {
				orderList: [],
				// orderList: [{"orderId":1503226352913,"name":"【巴黎旅拍婚纱照2日1晚游】 任选5个景点 全天拍摄用车 一对一服务","payer":"Transform","mobile":"13212345678","amount":25998,"method":2,"createTime":"2017-08-20T10:52:32.913Z"}],
				orderObj: {},
				dialogVisible: false,
				userInfo: {},
				userVisible: false,
			}
		},
		methods: {
			formatMethod (row) {
				return row.method === 1 ? '支付宝' : row.method === 2 ? '微信支付' : '其他'
			},
			formatAmount (row) {
				return parseInt(row.amount) ? '￥'+(row.amount).toFixed(2) : row.amount;
			},
			formatTime (row) {
				return this.$moment(row.createTime).format('YYYY-MM-DD HH:mm:ss')
			},
			formatStatus (row) {
				return '已完成'
			},
			handleShow (index, row) {
				console.log(row)
				this.orderObj = Object.assign({}, row);
				this.dialogVisible = true
			},
			handleDelete (index, row) {
				console.log(index, row)
				this.$confirm('确定删除该条订单？', '提示', {type: 'warning'})
				.then(() => {
					this.orderList.splice(index, 1)
					this.$message.success('删除成功')
					console.log(this.orderList)
					localStorage.setItem('orderList', JSON.stringify(this.orderList))
				}).catch(err => {
					this.$message('已取消操作')
					console.log(err)
				})
			},
			showUserInfo() {
				this.userVisible = true;
			}
		},
		mounted () {
			this.orderList = JSON.parse(localStorage.getItem('orderList')) || [];
			this.userInfo = JSON.parse(localStorage.getItem('user'));
		}
	}
</script>
<style scoped lang="scss">
	.page-header {
		margin-top: 30px;
		padding-bottom: 0;
		h2 {
			line-height: 2;
			font-size: 18px
		}
	}
	.order-detail {
		width: 80%;
		margin: auto;
		.order-item {
			display: flex;
			margin: 10px 0;
			label {
				width: 90px;
			}
		}
	}
	.user-info {
		width: 60%;
		margin: auto;
		font-size: 15px;
		.info-item {
			display: flex;
			margin: 15px 0;
			label {
				width: 120px;
			}
		}
	}
</style>