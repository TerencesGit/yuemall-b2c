<template>   
  <section>              
    <div class="my-order" v-show="!myItem" >
        <el-row class="myOrder-title">
		  <el-col :span="10">商品信息</el-col>
		  <el-col :span="6">服务信息</el-col>
		  <el-col :span="3">金额</el-col>
		  <el-col :span="3">状态</el-col>
		  <el-col :span="2">操作</el-col>
		</el-row>
        <el-row class="myOrder-txt"  v-for="item in orderList.customerOrders" :key="orderList.customerOrders.id">
		  <el-col :span="24">
                <el-row class="order-number">
				  <el-col :span="8">订单号：{{item.id}}</el-col>
				  <el-col :span="10">{{item.createTime}}</el-col>
				</el-row>
          </el-col>
          <el-col :span="24" class="order-txt"> 
			  <el-col :span="10" class="c-info">
               <router-link :to="'/ware/orderDetail?'+item.orderCode" >
			  	 <el-row>
					  <el-col :span="12">
					  	<p class="order-img">
					  	  <img :src="item.wareImg" width="100%" class="order-imgs">
					  	  <span :class="item.cName">{{item.statusDesc}}</span>
					  	</p>
					  </el-col>
					  <el-col :span="12" class="my-txt-mess"> 
					  	{{item.customerOrderItem.wareName}}
					  </el-col>
				 </el-row>
                </router-link>
			  </el-col>
			  <el-col :span="6" class="service-message">
                  <p>开始：{{item.customerOrderItem.dateDepart}}</p>
                  <p>结束：{{item.customerOrderItem.dateReturn}}</p>
			  </el-col>
			  <el-col :span="3" class="m-money">¥ {{item.customerOrderInfoPay.payCashValue}}
			  </el-col>
			  <el-col :span="3" class="m-status">{{item.statusDesc}}
			  </el-col>
			  <el-col :span="2" class="m-operation">
			  	  <el-button type="primary" v-show="item.b_status1" size="small" class="my-btn" @click="payBtn(item.customerOrderInfoPay.id)">立即支付</el-button>
		          <el-button type="info" v-show="item.b_status1" size="small"  class="my-btn" @click="cancelOpen(item.orderCode)">取消订单</el-button>
		          <el-button type="danger" v-show="item.b_status0" size="small" class="my-btn my-btn1 " @click="deleteOpen(item.orderCode)">删除订单</el-button>
		          <el-button type="success" v-show="item.b_status2" size="small" class="my-btn" @click="orderFillBtn(item.orderCode)">完善订单</el-button>
		          <!--  <el-button type="danger" v-show="b_status2" size="small" class="my-btn my-btn1">申请退款</el-button> -->
		          <el-button type="warning" v-show="item.b_status2" size="small" class="my-btn">申请改签</el-button>
			  </el-col>  
		  </el-col>	
		</el-row>    
        <el-row class="myOrder-page">
		  <el-col :span="24" style="text-align:center">
		  	  <div class="block">
			    <el-pagination
			      @size-change="handleSizeChange"
			      @current-change="handleCurrentChange"
			      :current-page="orderList.page.currentPage"
			      :page-sizes="[5, 10, 15, 20]"
			      :page-size="orderList.page.pageSize"
			      layout="total, sizes, prev,pager,next,jumper"
			      :total="orderList.page.totalCount">
			    </el-pagination>
			  </div>
			
		  </el-col>	
		</el-row>
    </div>
    <div class="no-content" v-show="myItem">
   	      暂无商品信息
    </div>
    <el-dialog
	  title="温馨提示"
	  :visible.sync="deleteMess"
	  width="25%"
	  center
	  >
	  <span class="can-title"><span class="el-icon-error can-icon"></span>您确定要删除记录吗？</span>
	  <span slot="footer" class="dialog-footer">
	    <el-button @click="deleteMess = false">取 消</el-button>
	    <el-button type="primary" @click="deleteBtn">确 定</el-button>
	  </span>
    </el-dialog>
    <el-dialog
	  title="温馨提示"
	  :visible.sync="cancelMess"
	  width="25%"
	  center
      class="cancel-mess"
	  >
	  <span class="can-title"><span class="el-icon-error can-icon" style="color:#aaa"></span>您确定要取消订单吗？</span>
	  <span slot="footer" class="dialog-footer">
	    <el-button @click="cancelMess = false">取 消</el-button>
	    <el-button type="primary" @click="cancelBtn">确 定</el-button>
	  </span>
    </el-dialog>
  </section>   
</template>    
<script>
   import {orderList,deleteOrder,cancelOrder} from '@/api'
   export default {
   	name:'myTable',
   	props: ['myItem','orderList'],  
    data() {
      return {
      	cancelMess: false,
      	deleteMess: false
      }},
    methods: {
       formatProData(data){
             let cMess = data;
          	 if(cMess == ""){
          	 	 this.myItem = true;
          	 }else{
          	 	 this.myItem = false;
          	  }
            	 for(let i = 0;i < cMess.customerOrders.length;i++){
          	 	cMess.customerOrders[i].customerOrderItem.dateDepart = this.fmtDate(cMess.customerOrders[i].customerOrderItem.dateDepart);
          	 	cMess.customerOrders[i].customerOrderItem.dateReturn = this.fmtDate(
          	 		cMess.customerOrders[i].customerOrderItem.dateReturn);  

	          	 if(cMess.customerOrders[i].status == 0){
	                   cMess.customerOrders[i].cName = 'img-status img-status0';
	                   cMess.customerOrders[i].b_status0 = true;
	                   cMess.customerOrders[i].b_status1 = false;
	                   cMess.customerOrders[i].b_status2 = false;
	                   cMess.customerOrders[i].b_status3 = false;
	          	 	}
	          	 	else if(cMess.customerOrders[i].status == 1){
	                   cMess.customerOrders[i].cName = 'img-status img-status1';
	                   cMess.customerOrders[i].b_status0 = false;
	                   cMess.customerOrders[i].b_status1 = true;
	                   cMess.customerOrders[i].b_status2 = false;
	                   cMess.customerOrders[i].b_status3 = false;
	          	 	}
	          	 	else if(cMess.customerOrders[i].status == 2){
	                   cMess.customerOrders[i].cName = 'img-status img-status2';
	                   cMess.customerOrders[i].b_status0 = false;
	                   cMess.customerOrders[i].b_status1 = false;
	                   cMess.customerOrders[i].b_status2 = true;
	                   cMess.customerOrders[i].b_status3 = false;    
	          	 	} 
	          	 	else if(cMess.customerOrders[i].status == 3){
	          	 	   cMess.customerOrders[i].cName = 'img-status img-status3';
	          	 	   cMess.customerOrders[i].b_status0 = false;
	                   cMess.customerOrders[i].b_status1 = false;
	                   cMess.customerOrders[i].b_status2 = false;
	                   cMess.customerOrders[i].b_status3 = true;   
	                }
              }
          	  this.orderList = cMess;   
        },	
       fmtDate(obj){
	       var date =  new Date(obj);
	       var y = 1900+date.getYear();
	       var m = "0"+(date.getMonth()+1);
	       var d = "0"+date.getDate();
	       return y+"-"+m.substring(m.length-2,m.length)+"-"+d.substring(d.length-2,d.length);
       },
       handleSizeChange(val) {
    	   let m = sessionStorage.getItem('status');
           let data = {
		          page:{
		          	currentPage: "1", 
		          	pageSize: val,
		          },
		          status:m,
		        }
		        orderList(data).then(res => {
		          if(res.data.status === 1) {
		             this.formatProData(res.data.data)
		          }
		        })  
        },
	   handleCurrentChange(val) { 
		        let data = {
		          page:{
		          	currentPage: val, 
		          	pageSize: "5",
		          }
		        }
		        orderList(data).then(res => {
		          if(res.data.status === 1) {
		             this.formatProData(res.data.data)
		          }
		        })   
	   },
	   cancelOpen(val){
          this.cancelMess = true; 
          sessionStorage.setItem("orderCode1",val);
	   },
	   cancelBtn(){
	   	 let orderCode = sessionStorage.getItem("orderCode1"); 	 
         let data = {
          id:orderCode
         }
       cancelOrder(data).then(res => {
	      if(res.data.status === 1) { 
	      	   this.cancelMess = false;
	      	   for(let i = 0;i < this.orderList.customerOrders.length;i++){
	      	   	  if(this.orderList.customerOrders[i].orderCode == orderCode){
	      	   	  	  this.orderList.customerOrders[i].statusDesc = "已取消";
	      	   	  	  this.orderList.customerOrders[i].cName = "img-status img-status0";
	      	   	  	  this.orderList.customerOrders[i].b_status0 = true;
	                  this.orderList.customerOrders[i].b_status1 = false;
	                  this.orderList.customerOrders[i].b_status2 = false;
	                  this.orderList.customerOrders[i].b_status3 = false; 
	      	   	  }
	      	   } 
	           this.$message({
		          message: '订单已取消',
		          type: 'success'
		        });
	          }
	       })
	   },
	   deleteOpen(val){
          this.deleteMess = true;
          sessionStorage.setItem("orderCode",val);
	   },
	   deleteBtn(){
	   	 let orderCode = sessionStorage.getItem("orderCode"); 	 
         let data = {
          id:orderCode
         }
         deleteOrder(data).then(res => {
	      if(res.data.status === 1) { 
	      	   this.deleteMess = false;
	      	   for(let i = 0;i < this.orderList.customerOrders.length;i++){
	      	   	  if(this.orderList.customerOrders[i].orderCode == orderCode){
	      	   	  	  this.orderList.customerOrders.splice(i,1)
	      	   	  }
	      	   } 
	           this.$message({
		          message: '信息删除成功',
		          type: 'success'
		        });
	          }
	       })
	   },
       payBtn(payId){
           console.log(payId);
           this.$router.push('/ware/pay?payId='+payId)
       },
       orderFillBtn(id){
           this.$router.push('/ware/fillInfo?'+id)
       }

    }
  }
</script>    
<style lang="scss" scoped>
	.my-order{
	    min-height: 640px;
	    .my-btn{margin:0 0 5px;}
	    .myOrder-title{
	     	text-align:center;
	     	padding:10px 0;
	     	background:#efefef;
	     	color:#A8A8A8;
	     	font-size:12px;
	      }
	    .myOrder-txt{
	     	text-align:center;
	     	font-size:12px;
	     	color:#444;
	     	padding:0 8px 20px;
	     	border-bottom:1px solid #bbb;
	     	transition:all 0.6s;
	     	margin-bottom:5px;
	     	&:hover{
	     		background:#F2F6FC;
	     	}
	     	p{
	     	  line-height:25px;	
	     	}
	     	.order-txt{
	     		height:auto;
	     		overflow:hidden;
	     	}
	     	.service-message{
	     		margin-top:15px;
	     	}
	     	.m-money{
	     		margin-top:30px;
	     		color:#e4393c;
	     	}
	     	.m-status{
	     		margin-top:31px;
	     	}
	     	.m-operation{
	     		text-align:right;
	     		margin-top:8px;
	     	    .my-btn1{
	     	    	margin-top:17px;
	     	    }
	    }
	    .c-info{
	     	cursor:pointer;
	     	.order-img{
     			position:relative;
     			width:140px;
     			height:78px;
     			overflow:hidden;
     			.order-imgs{
     			   transition:all 0.6s;
     	         }
     			.img-status{
     				width:50px;
     				height:24px;
     				position:absolute;
     				top:0;
     				left:0;
     				color:#fff;
     			}
     			.img-status0{
                   background-color:#a8a8a8; 
     			}
     			.img-status1{
     				background-color:#e4393c; 
     			}
     			.img-status2{
     				background-color:#41aaff; 
     			}
     			.img-status3{
     				background-color:#E6A23C;
     			}
	     	}
	     	&:hover{
     			.order-imgs{
                   transform:scale(1.1);
     			}
	     	}
	    }
	    .my-txt-mess{
	     	text-align: left;
	     	line-height:25px;
	     	padding-left:10px;
	     	margin-top:15px;
	     	height:50px;
	     	color:#444;
	        overflow: hidden;
			text-overflow:ellipsis;
			display: -webkit-box;
		    -webkit-line-clamp: 2;
		    -webkit-box-orient: vertical;
	     }
	     .order-number{
	     	padding:12px 0;
	     	text-align:left;
	     	border-bottom:1px solid #dfdfdf;
	     	margin-bottom:15px;
	     	color:#A8A8A8;
	     }
	   } 
	    .myOrder-page{
		   	margin:20px 0;
		}
     }
.no-content{
 	   	min-height:500px;
	   	text-align:center;
	   	padding-top:200px;
	   	font-size:22px;
	   	color:#999;
    	 }
.can-title{
	display:block;
	width:100%;
	font-size:14px;
	text-align:center;
	.can-icon{
		font-size:30px;
		color:#F56C6C;
		margin:0 20px 0 0;
		position:relative;
		top:4px;
	}
}    	 	   
</style>