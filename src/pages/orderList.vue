<template>
	<section>
		<div class="main-wrap">
			<div class="page-header clearfix">
				<h2 class="pull-left">我的订单</h2>
			</div>
			<el-table
		    border
		    highlight-current-row
		    :data="orderList"
		    style="width: 100%">
				<el-table-column type="index" width="50"></el-table-column>
		    <el-table-column prop="orderId" label="订单编号" width="150" sortable></el-table-column>
		    <el-table-column prop="createTime" label="创建时间" width="180" sortable :formatter="formatTime"></el-table-column>
		    <el-table-column prop="name" label="订单名称"></el-table-column>
		    <el-table-column prop="contact" label="联系人" width="110"></el-table-column>
		    <el-table-column prop="method" label="支付方式" width="100" :formatter="formatMethod"></el-table-column>
		    <el-table-column prop="amount" label="金额" width="120" :formatter="formatAmount"></el-table-column>
		    <el-table-column prop="status" label="状态" width="90" :formatter="formatStatus"></el-table-column>
		    <el-table-column label="操作" width="150">
		      <template slot-scope="scope">
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
		  <el-row class="m-t">
	      <el-pagination
	        @size-change="handleSizeChange"
	        @current-change="handleCurrentChange"
	        :current-page="pageNo"
	        :page-size="pageSize"
	        :page-sizes="[10, 20, 30, 40]"
	        layout="total, sizes, prev, pager, next, jumper"
	        :total="total"
	        class="pull-right">
	      </el-pagination>
	    </el-row>
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
					<label>联系人：</label>
					<span>{{orderObj.contact}}</span>
				</div>
				<div class="order-item">
					<label>联系电话：</label>
					<span>{{orderObj.mobile}}</span>
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
				<el-button @click="dialogVisible = false">取消</el-button>
				<el-button type="primary" @click="dialogVisible = false">确定</el-button>
			</div>
		</el-dialog>
	</section>
</template>
<script>
	export default {
		data() {
			return {
				pageNo: 1,
				pageSize: 10,
				total: 0,
				orderList: [],
				orderObj: {},
				dialogVisible: false,
				userInfo: {},
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
			handleSizeChange(val) {
				this.pageSize = val
			},
			handleCurrentChange(val) {
				this.pageNo = pageNo
			}
		},
		mounted () {
			this.orderList = JSON.parse(localStorage.getItem('orderList')) || [];
			this.total = this.orderList.length;
		}
	}
</script>
<style scoped lang="scss">
	.page-header {
		margin-top: 30px;
		padding-bottom: 10px;
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