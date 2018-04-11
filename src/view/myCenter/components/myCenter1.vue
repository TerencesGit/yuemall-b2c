<template>
    <div class="dMid">
        <div class="mine-ord">
        	<div class="mine-message">
		        <div class="portrait">
		        	<img :src="userInfo.picUrl" alt="头像">
		        </div>
		        <span>{{userInfo.nickname}}</span>
		        <router-link to="deliveryAddress">
		        	<el-button type="danger" plain  class="my-address">我的收货地址</el-button>
				</router-link>
            </div>
            <el-tabs v-model="activeName" @tab-click="handleClick" class="my-tab" >
			    <el-tab-pane label="全部订单" name="1" class="my-tab-item1">
			         <myTable 
				         :myItem='myItem' 
				         :orderList="orderList" 		
			         ></myTable>
			    </el-tab-pane>
			    <el-tab-pane label="待付款" name="2" class="my-tab-item1">
			        <myTable 
				        :myItem='myItem' 
				        :orderList="orderList" 
				        >
			        </myTable>
		    	</el-tab-pane>
			    <el-tab-pane label="未服务" name="3" class="my-tab-item1">
			         <myTable 
				         :myItem='myItem' 
				         :orderList="orderList"
				         >
			          </myTable>
			    </el-tab-pane>
			    <el-tab-pane label="已结束" name="4" class="my-tab-item1">
				     <myTable 
					     :myItem='myItem' 
					     :orderList="orderList" 
					     >
				      </myTable>
			    </el-tab-pane>
            </el-tabs>  
          </div>
         <div class="mine-right">
        	<div class="mine-message1">
		        <div class="mine-mestitle">
		            <p class="fl">个人信息</p>
		        </div>
		        <ul class="my-details">
		            <li class="li1">
		                <div class="pic"><img :src="userInfo.picUrl"></div>
		                <p class="name">{{userInfo.nickname}}</p>
		            </li>
		            <li class="li2">手机<span>{{userInfo.phone}}</span></li>
		            <li class="li3">邮箱<span v-show="noEmail">未设置</span><span>{{userInfo.email}}</span></li>
		        </ul>
		    </div>
        </div>
    </div>
</template>
<script>
  import {orderList, personalCenter } from '@/api'
  import myTable from './myTable'
   export default {
   	components: {
      myTable,
    },
    data() {
      return {
      	 noEmail:true,
      	 b_status:{
            b_status0:false,
	      	b_status1:true,
	      	b_status2:false,
	      	b_status3:false,
      	 },
	     myItem:false,	          
      	 activeName: '1',
      	 currentPage: 1,
         userInfo:{
	         	createTime:1517651349000,
				email:"",
				id:415176513489897,
				modifyTime:1518162163000,
				nickname:"15910828527",
				phone:"15910828527",
				picUrl:"http://fileServer.yueshijue.com/fileService/uploads/2017/10/24/415088337254488_thum.jpg",
				realName:"高哥哥",
				sex:1,
				status:0,
				storeId:23,
				type:0,
				username:"15910828527",
				contactName:"高宏飞",
		   },
         orderList: {
	           customerOrders:[
	               {
	               	cName:'img-status img-status1',
	               	b_status0:false,
			      	b_status1:true,
			      	b_status2:false,
			      	b_status3:false,
		           	contactEmail:"123@qq.com",
					contactMobile:"15910828527",
					contactName:"高宏飞",
					countNum:0,
					createTime:1518242479000,
	           	    deleteStatus:0,
					id:415182425104962,
					isPerfect:0,
					memberId:415176513489897,
					memerName:"15910828527",
					orderCode:"415182425104962",
					orderType:0,
					paidTime:1518242507000,
					payOrderSn:"4200000079201802100365459525",
					providerId:23,
					providerName:"分销商测试",
					reservedBefore:1518244279000,
					sex:1,
					status:2,
					statusComplain:0,
					statusDesc:"已取消",
					statusFreeze:1,
					statusRefund:0,
					tripDays:6,
					updateTime:1518242507000,
					versionId:1,
					wareImg:"http://fileServer.yueshijue.com/fileService/uploads/2017/11/04/415097791011350.jpg",
					customerOrderItem:{
						adultCount:1,  
						adultPrice:1,
						childCount:0,
						childPrice:1,
						dateDepart:"1520352000000",
						dateReturn:"1521302400000",
						singleNumber:0,
						singlePrice:1,
						wareId:115144400786328,
						wareName:"测试巴厘岛旅拍婚纱摄影6天4晚套系（含摄影+旅游）"
					},	
					customerOrderInfoPay:{
						id: 415182425104994,
						amountAll: 1,
						payCashValue: 113423
					}
		          },
		          {
		          	cName:'img-status img-status0',
	               	b_status0:true,
			      	b_status1:false,
			      	b_status2:false,
			      	b_status3:false,
		           	contactEmail:"123@qq.com",
					contactMobile:"15910828527",
					contactName:"高宏飞",
					countNum:0,
					createTime:1518242479000,
	           	    deleteStatus:0,
					id:415182425104962,
					isPerfect:0,
					memberId:415176513489897,
					memerName:"15910828527",
					orderCode:"415182425104962",
					orderType:0,
					paidTime:1518242507000,
					payOrderSn:"4200000079201802100365459525",
					providerId:23,
					providerName:"分销商测试",
					reservedBefore:1518244279000,
					sex:1,
					status:2,
					statusComplain:0,
					statusDesc:"未出行",
					statusFreeze:1,
					statusRefund:0,
					tripDays:6,
					updateTime:1518242507000,
					versionId:1,
					wareImg:"http://fileServer.yueshijue.com/fileService/uploads/2017/11/04/415097791011350.jpg",
					customerOrderItem:{
						adultCount:1,  
						adultPrice:1,
						childCount:0,
						childPrice:1,
						dateDepart:"1518796800000",
						dateReturn:"1519660800000",
						singleNumber:0,
						singlePrice:1,
						wareId:115144400786328,
						wareName:"测试巴厘岛旅拍婚纱摄影6天4晚套系（含摄影+旅游）"
					},	
					customerOrderInfoPay:{
						id: 415182425104994,
						amountAll: 1,
						payCashValue: 113423
					}
		          },
	           ],
	           page:{
		           	currentPage: 1,
		            pageSize: 5,
		            skipCount: 0,
		            totalPage: 300,
		            totalCount: 23
	                }
	       },
      }},
    methods:{
       formatProData(data){

           let cMess = data;      
          	 if(cMess.customerOrders == ""){
          	 	 this.myItem = true;
          	 }else{
          	 	 this.myItem = false;
          	 }
          	 console.log(this.myItem);
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
       getOrderList(){
        let data = {
          page:{
          	currentPage: "1", 
          	pageSize: "5"
          }
        }
        orderList(data).then(res => {
          if(res.data.status === 1) { 
          	 this.formatProData(res.data.data)
          }

        })
      },
      getPersonalCenter(){
      	 personalCenter().then(res => {
  	 	    if(res.data.status === 1) { 
  	 	    	if(res.data.data.email == ""){
  	 	    		this.noEmail = true;
  	 	    	}else{
  	 	    		this.noEmail = false;
  	 	    	}
  	 	    	this.userInfo = res.data.data;
                console.log("信息获取成功")
  	 	    }
      	 })
      },
    	//判断有没有Emaill
       getEmail(){
          if(this.userInfo.email == ""){
          	 this.isEmail = true;
          }
          else{
          	this.isEmail = false;
          }
       },
	   fmtDate(obj){
	       var date =  new Date(obj);
	       var y = 1900+date.getYear();
	       var m = "0"+(date.getMonth()+1);
	       var d = "0"+date.getDate();
	       return y+"-"+m.substring(m.length-2,m.length)+"-"+d.substring(d.length-2,d.length);
      },
      getProStatu(n){
      	 let m = n;
      	 sessionStorage.setItem("status",m);
      	 console.log(m); 
      	 if(n = 0){
      	 	m = "";
      	 }
         let data = {
          page:{
          	currentPage: "1", 
          	pageSize: "5"
          },
          status:m,
        }
        orderList(data).then(res => {
	      if(res.data.status === 1) { 
	          this.formatProData(res.data.data)
	          }
	       })
      },
      handleClick(tab, event) {
        if(tab.index == 0){
         this.getProStatu(0)
        }
        else if(tab.index == 1){
         this.getProStatu(1)
        }else if(tab.index == 2){
         this.getProStatu(2)  
        }else if(tab.index == 3){
         this.getProStatu(3)   
        }

      },
    }
    ,
    created(){
      	this.getOrderList();
      	this.getPersonalCenter();
    }  
  }
</script>

<style lang="scss" scoped>
   .mine-ord{
      padding-bottom:50px;
      width:700px;
      float:left;
      .mine-message{
	      border: 1px solid #DEDEDE;
	      .portrait {
	      	    float:left;
			    width: 55px;
			    height: 55px;
			    margin: 10px 10px 10px 20px;
			    img {
				    width: 100%;
				    height: 100%;
				    display: block;
				    border-radius: 50%;
			     	}
			}
	        span {
			    line-height: 75px;
			}		 
			.my-address{
				margin: 20px;
				float:right;
			}    
       }
     }    
   .my-tab{
   	 border:1px solid #ddd;
   	 margin-top:20px;
   	 padding:0 10px;
   }
   
   .mine-right{
     	float:left;
     	width:310px;
     	margin-left:20px;
     	.mine-message1 {
		    border: 1px solid #dedede;
		    .mine-mestitle {
			    border-bottom: 1px solid #dedede;
			    overflow: hidden;
			    p {
				    font-size: 16px;
				    line-height: 46px;
				    margin-left: 20px;
				}
			}
			.my-details {
			    width: 270px;
			    margin: 0 auto;
			    padding-bottom: 20px;
			    .li1 {
				    display: flex;
				    align-items: center;
				    margin-top: 20px;
				    .pic{
					    width: 88px;
					    height: 88px;
					    img {
						    width: 100%;
						    height: 100%;
						}
					}
					.name {
						    margin-left: 20px;
						}
				 }
				.li2,.li3{
				    color: #808080;
				    margin-top: 20px;
				    span {
					    color: #282828;
					    margin-left: 20px;
					}
				}
			}

		}
   }    
</style>