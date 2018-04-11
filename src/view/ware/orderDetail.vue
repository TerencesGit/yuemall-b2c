<template>
   <section>
     <div class="mine-contain">
        <div class="contain-left fl">
          <div class="order-det1">
            <div class="Mytitle-box">
              <p class="Mytitle">订单详情</p>
            </div>
            <div>
                <p class="el-icon-error status-error" v-show="!oStatus"></p>
                <p class="error-txt" v-show="!oStatus">订单已取消</p>
            </div>
            <el-steps :active="orderStatus" align-center class="order-step" v-show="oStatus">
                <el-step title="已提交"></el-step>
                <el-step title="已付款"></el-step>
                <el-step title="已服务"></el-step>
                <el-step title="已结束"></el-step>
            </el-steps>
            <div class="pre-time">
                <p class="fl">预订日期：<span class="ydTime">{{orderDetail.createTime}}</span></p>
            </div>
            <h2 class="title order-title">{{orderDetail.customerOrderItemList[0].wareName}}</h2>
            <ul class="start-mes clearfix2">
                <li>出发城市：<span class="cfCs">{{orderDetail.srcCity}}</span></li>
                <li>开始时间：<span>{{orderDetail.customerOrderItemList[0].dateDepart}}</span></li>
                <li>结束时间：<span>{{orderDetail.customerOrderItemList[0].dateReturn}}</span></li>
                <li>基础：<span class="cr-nuML">
                  {{orderDetail.customerOrderItemList[0].adultCount}}
                </span></li>
            </ul>
            <ul class="look-mes">
                <el-button type="text" @click="getOrderJourney(orderDetail.orderCode)">查看内容</el-button>
                <el-button type="text" @click="safeMess = true">查看安全信息</el-button>
                <!-- <el-button type="text">查看客户信息</el-button> -->
            </ul>
          </div>
          <div class="order-det2">
              <div class="Mytitle-box">
                  <p class="Mytitle">联  系  人</p>
              </div>
              <ul class="lxrTxt">
                  <el-row class="lxr-row">
                    <el-col :span="3" :offset="1">姓<span></span><span></span>名</el-col>
                    <el-col :span="6" >{{orderDetail.contactName}}</el-col>
                  </el-row>
                  <el-row class="lxr-row">
                    <el-col :span="3" :offset="1">手机号码</el-col>
                    <el-col :span="6">{{orderDetail.contactMobile}}</el-col>
                  </el-row>
                  <el-row class="lxr-row">
                    <el-col :span="3" :offset="1">邮<span></span><span></span>箱</el-col>
                    <el-col :span="6">{{orderDetail.contactEmail}}</el-col>
                  </el-row>
              </ul>
           </div>
          <div class="order-det3">
             <div class="Mytitle-box">
               <p class="Mytitle">订单明细</p>
             </div>
             <div>
                <el-row class="lxr-row lxr-row-head">
                    <el-col :span="4" ><b class="lxr-row-b"></b>订单信息</el-col>
                    <el-col :span="4" class="colorRed " :offset="16" style="font-size:16px;text-align:right;padding-right:20px;">
                      ¥{{orderDetail.customerOrderItemList[0].singleNumber * orderDetail.customerOrderItemList[0].singlePrice + orderDetail.customerOrderItemList[0].adultPrice * orderDetail.customerOrderItemList[0].adultCount}}
                    </el-col>
                </el-row>
                <el-row class="lxr-row">
                    <el-col :span="4"><b class="lxr-c"></b>基<span></span><span></span>础</el-col>
                    <el-col :span="4"  :offset="16" style="font-size:14px;text-align:right;padding-right:30px;">
                      ¥{{orderDetail.customerOrderItemList[0].adultPrice}} x {{orderDetail.customerOrderItemList[0].adultCount}}
                    </el-col>
                </el-row>
                <el-row class="lxr-row lxr-row-bottom">
                    <el-col :span="4"><b class="lxr-c"></b>差<span></span><span></span>价</el-col>
                    <el-col :span="4"  :offset="16" style="font-size:14px;text-align:right;padding-right:30px;">
                      ¥{{orderDetail.customerOrderItemList[0].singleNumber * orderDetail.customerOrderItemList[0].singlePrice}}
                    </el-col>
                </el-row>

                <el-row class="lxr-row lxr-row-head">
                    <el-col :span="4" ><b class="lxr-row-b"></b>其<span></span><span></span>它</el-col>
                    <el-col :span="4" class="colorRed " :offset="16" style="font-size:16px;text-align:right;padding-right:20px;">
                      ¥{{orderDetail.customerOrderInfoPay.amountAll - (orderDetail.customerOrderItemList[0].singleNumber * orderDetail.customerOrderItemList[0].singlePrice + orderDetail.customerOrderItemList[0].adultPrice * orderDetail.customerOrderItemList[0].adultCount) 
                  }}
                    </el-col>
                </el-row>
              <!--   <ul class="orderTxtBox orderBxBox" v-for="item in orderDetail.customerOrderItemList">
                    <li>
                        <p class="fl">{{wareName}}</p>
                        <p class="fr">¥<span>{{adultPrice}}</span> x <span>{{adultCount}}</span></p>
                    </li>
                </ul> -->
             <!--    <ul class="orderTxtTitle tjHdTitle clearfix2">
                    <li class="fl"><b></b>推荐活动</li>
                    <li class=" fr colorGreen tjHdPrice">¥<span>-</span></li>
                </ul> -->
          <!--       <ul class="orderTxtBox tjHd Box">

                </ul>   -->       
                <el-row class="lxr-row lxr-row-headr">
                    <el-col :span="4" ><b class="lxr-row-b lxr-row-r"></b>总<span></span><span></span>价</el-col>
                    <el-col :span="4" class="colorRed " :offset="16" style="font-size:18px;text-align:right;padding-right:20px;">
                      ¥{{orderDetail.customerOrderInfoPay.amountAll}}
                    </el-col>
                </el-row>

                <div class="orderTxtFoot">
                    <p>订单编号：<span>{{orderDetail.orderCode}}</span></p>
                    <p v-show="ifPay">交易号：<span>{{orderDetail.payOrderSn}}</span></p>
                    <p>创建时间：<span>{{orderDetail.createTime}}</span></p>
                    <p v-show="ifPay">付款时间：<span>{{orderDetail.paidTime}}</span></p>
                </div>
                  </div>
              </div>
        </div>     
        <div class="contain-right fr">
            <div class="fr orderFrbox">
              <h3 class="title">总  价</h3>
              <p class="allPrice colorRed">￥{{orderDetail.customerOrderInfoPay.amountAll}}</p>
              <el-button type="primary" size="medium" class="completeMess" @click="rePerson">返回个人中心</el-button>
              <el-button type="warning" size="medium" class="completeMess" @click="toOrderInfo" v-show="ifPerfect">您的信息未完善，去完善</el-button>
          </div>
        </div>
        <el-dialog
          title="产看内容"
          :visible.sync="Journey"
          width="50%"
          >
          <span>订单号 {{orderDetail.orderCode}}</span>
            <div style="height:500px;overflow:auto;">
              <div v-for="item in orderJour">
                 <p v-html="item.programDetail"></p>
              </div>
            </div>
        </el-dialog>
           <el-dialog
          title="产看安全信息"
          :visible.sync="safeMess"
          width="50%"
          >
          <span class="safeMess">安全告知</span>
            <div class="safe-mess" style="height:500px;overflow:auto;color:#444;">
                 <p v-html="orderSafeMess"></p>
            </div>
        </el-dialog>
     </div>
   </section>
</template>
<script>
import {orderDetail,orderJourney} from "@/api";
  export default {
    data() {
      return {
         ifPay:false,
         Journey:false,
         safeMess:false,
         orderStatus:1,
         oStatus:false,
         ifPerfect:true,
         orderDetail:{
            contactEmail:"12312@qq.com",
            contactMobile:"15923232323",
            contactName:"234",
            countNum:0,
            createTime:'',
            deleteStatus:0,
            id:415184328144968,
            isPerfect:0,
            kind:1,
            memberId:415176513489897,
            memerName:"15910828527",
            orderCode:"415184328144968",
            providerId:23,
            providerName:"分销商测试",
            reservedBefore:1518434564000,
            srcCity:"中华人民共和国",
            status:2,
            statusComplain:0,
            statusDesc:"1",
            statusFreeze:1,
            statusRefund:0,
            tripDays:9,
            versionId:1,
            payOrderSn:'',
            paidTime:'',
            wareImg:"",
            customerOrderInfoPay:{
                amountAll:126994,
                createBy:415176513489897,
                createTime:1518432764000,
                deliverFee:0,
                id:415184328145083,
                orderId:415184328144968,
                payCashValue:126994,
                payCouponValue:0,
                payOpValue:0,
                strategyReduceValue:0,
            },
            customerOrderItemList:[
                 {
                    adultCount:1,
                    adultPrice:53997,
                    amountAll:53997,
                    childCount:0,
                    childPrice:53997,
                    dateDepart:1520524800000,
                    dateReturn:1521302400000,
                    orderWareType:0,
                    roomNum:0,
                    singleNumber:1,
                    singlePrice:53997,
                    wareId:115143790537678,
                    wareName:"新西兰皇后镇旅拍婚纱摄影9天7晚套系（含摄影+旅游）",
                 },
                 {
                    adultCount:2,
                    adultPrice:6500,
                    amountAll:13000,
                    childCount:0,
                    childPrice:6500,
                    orderWareType:1,
                    singlePrice:6500,
                    wareId:115143790543642,
                    wareName:"直升机",
                 },
                   {
                    adultCount:2,
                    adultPrice:6500,
                    amountAll:13000,
                    childCount:0,
                    childPrice:6500,
                    orderWareType:1,
                    singlePrice:6500,
                    wareId:115143790543642,
                    wareName:"直升机1",
                 },
                   {
                    adultCount:2,
                    adultPrice:6500,
                    amountAll:13000,
                    childCount:0,
                    childPrice:6500,
                    orderWareType:1,
                    singlePrice:6500,
                    wareId:115143790543642,
                    wareName:"直升机2",
                 }
            ]
         },
         orderJour:[
            {
              id:115143790537750,
              motifStatus:1,
              programDetail:'"<p style="line-height: 2em;"><span style="font-size: 14px;">日程明细：</span></p><p style="line-height: 2em;"><span style="font-size: 14px;">各地乘航班飞往新西兰-专车接机-抵达酒店 ★凭护照办理酒店入住</span></p><p style="line-height: 2em;"><span style="font-size: 14px;">请提前3小时抵达机场，办理登机和行李托运手续。</span></p><p style="line-height: 2em;"><span style="font-size: 14px;">抵达后办理出关手续，提取行李。乘车前往酒店入住。</span></p><p style="line-height: 2em;"><span style="font-size: 14px;">奥克兰游览</span></p>"',
            },
            {
              programDetail:'"<p style="line-height: 2em;"><span style="font-size: 14px;">日程明细：</span></p><p style="line-height: 2em;"><span style="font-size: 14px;">乘坐航班飞往基督城，抵达基督城到机场门店取车，开启新西兰自驾</span></p><p style="line-height: 2em;"><span style="font-size: 14px;">抵达办理酒店入住后开始游览</span></p><p style="line-height: 2em;"><span style="font-size: 14px;">前往柳堤野生保护区，柳堤野生保护区是新西兰重要的几维鸟繁育基地之一，历史也比较悠久</span></p><p style="line-height: 2em;"><span style="font-size: 14px;">前往基督城植物园，基督城植物园这里比较安静，这里让你感觉到不一样的安静</span></p><p style="line-height: 2em;"><span style="font-size: 14px;">前往坎特伯雷博物馆，坎特伯雷博物馆里面有一系列对新西兰独具意义的杰出藏品</span></p><p style="line-height: 2em;"><span style="font-size: 14px;">前往基督城大教堂，基督城大教堂是基督城最重要的地标与精神象征</span></p><p style="line-height: 2em;"><span style="font-size: 14px;">前往基督城集装箱购物中心</span></p><p style="line-height: 2em;"><span style="font-size: 14px;">驱车回酒店 &nbsp;</span></p>"'
            },
            {
              programDetail:'"<p style="line-height: 2em;"><span style="line-height: 2em; font-size: 14px;">日程明细：</span></p><p style="line-height: 2em;"><span style="font-size: 14px;">驾车前往特卡波胡镇</span></p><p style="line-height: 2em;"><span style="font-size: 14px;">抵达办理酒店入住后开始游览</span></p><p style="line-height: 2em;"><span style="font-size: 14px;">前往 阿斯特罗（Astro）咖啡厅，这里被誉为世界上景观最好的咖啡馆</span></p><p style="line-height: 2em;"><span style="font-size: 14px;">前往牧羊人教堂，牧羊人教堂被称为是新西兰最小的教堂</span></p><p style="line-height: 2em;"><span style="font-size: 14px;">前往雪山森林下的特卡波湖-观看夜景</span></p><p style="line-height: 2em;"><span style="font-size: 14px;">这里的夜景会是你见过最美丽的夜景，</span></p><p style="line-height: 2em;"><span style="font-size: 14px;">驱车回酒店 &nbsp;&nbsp;</span></p>"'
            },
         ],
         orderSafeMess:"<p>尊敬的客人您好，</p><p>感谢您预订携程产品，外出旅游还请自觉遵守《中国公民旅游文明行为公约》，并注重自身出行安全。</p><p>吃：在旅游行程期间，注意饮食安全，确保吃的健康吃的开心。</p><p>1、在旅游期间购买食物需注意商品质量，不要购买“三无”（无生产厂家、生产日期、厂家地址）的商品，发现食物不卫生或有异味等变质情况，切勿食用。</p><p>2、不要接受和食用陌生人送的香烟、食物和饮品，防止他人暗算。</p><p>3、旅游期间要合理饮食，不要暴饮暴食和贪吃零食、冷食冷饮。</p><p>4、为防止在旅途中水土不服，游客应自备一些常用药品，以备不适之需，切勿随意服用他人所提供的药品。</p><p>5、喜欢喝酒的旅客在旅途中应注意控制自已的饮酒量，饮酒时最好不超过本人酒量的三分之一，若出现酗酒闹事，扰乱社会秩序，侵犯她人或造成他人财物损失的一切责任由肇事者承担。</p><p>6、旅客要十分注意饮食卫生，预防避免中毒和胃肠道疾病的发生。</p><p>住：在旅游行程期间，提高警惕意识，住的舒服睡的踏实。</p><p>1、游客入住酒店后，应了解酒店安全须知，熟悉酒店的安全出路、安全路梯的位置及安全转移的路线。</p><p>2、注意检查酒店所配备的用品是否齐全，有无破损。如有不全或破损，请立即向酒店服务员或导游反馈，以免发生纠纷。</p><p>3、贵重物品应存放于酒店总台保险柜，不要随身携带或放在房间内。</p><p>4、不要将自已住宿的酒店、房间随便告诉陌生人，不要让陌生人或自称酒店的维修人员随便进入房间，出入房间要锁好房门，睡觉前注意房门窗是否关好，保险锁是否锁上，物品最好放于身边，不要放在靠窗的地方。</p><p>5、游客入住酒店需要外出时，应告知随团导游，在酒店总台领一张饭店卡，卡上有饭店地址、电话，如果你迷路时，可以按卡片上地址询问或搭出租车，你就会安全顺利回到住地。</p><p>6、如遇紧急情况，千万不要慌张。发生火警时不要搭电梯或随意跳楼；镇定地判断火情，主动地实行自救。若身上着火，可就地打滚或用重衣服压盖，必须穿过有浓烟的走廊、通道时，用浸湿的衣服披裹身体，捂着口鼻贴近地顺墙爬行，大火封门无法逃生时，用浸湿的衣服披裹身体，被褥堵门或泼水降温的办法等待救援或摇动鲜艳的衣服呼唤救援人员。</p>",
      }
    },
    methods: {
      rePerson(){
           this.$router.push('/myCenter')
                 },
       toOrderInfo(){
          let id = this.orderDetail.id
          this.$router.push('/ware/fillInfo?'+id)
       },
       getOrderDetail(){
         var uid=window.location.href.split("?")[1];
          let data = {
              id : uid     
          }
          orderDetail(data).then(res => {
              if(res.data.status === 1) {
                 this.orderDetail = res.data.data; 
                 this.orderStatus = this.orderDetail.status;        
                 if(this.orderDetail.status == 0){
                     this.oStatus = false;
                 }else{
                     this.oStatus = true;
                 }
                 if(this.orderDetail.status != 0 || this.orderDetail.status != 1){
                       this.ifPay =  false;
                       this.orderDetail.paidTime = this.fmtDate(this.orderDetail.paidTime);
                 }else{
                       this.ifPay =  true;
                 }
                 if(this.orderDetail.status != 0 && this.orderDetail.status != 1){
                      if(this.orderDetail.isPerfect == 0){
                        this.ifPerfect =true;
                      }else{
                         this.ifPerfect =false;
                      }
                    }
                 else{
                     this.ifPerfect =false;
                 }
                 
                 console.log('oStatus'+this.oStatus+"---"+'ifPay'+this.ifPay+"---"+'ifPerfect'+this.ifPerfect);
                 this.orderDetail.createTime = this.fmtDate(this.orderDetail.createTime);
                 this.orderDetail.customerOrderItemList[0].dateDepart = this.fmtDate(this.orderDetail.customerOrderItemList[0].dateDepart);
                 this.orderDetail.customerOrderItemList[0].dateReturn = this.fmtDate(this.orderDetail.customerOrderItemList[0].dateReturn);

              }
           })
        },
       getOrderJourney(uid){
           this.Journey = true;
           let data = {
              id : uid 
           }
           orderJourney(data).then(res => {
              if(res.data.status === 1) {
                  this.orderJour = res.data.data
              }
           })
       }, 
       fmtDate(obj){
         var date =  new Date(obj);
         var y = 1900+date.getYear();
         var m = "0"+(date.getMonth()+1);
         var d = "0"+date.getDate();
         return y+"-"+m.substring(m.length-2,m.length)+"-"+d.substring(d.length-2,d.length);
       },
  
    },
    created() {
       this.getOrderDetail();
    },
  }
</script>

<style lang="scss" scoped>
.mine-contain{
    width:1200px;
    margin:0 auto;
    padding-top:40px;
    .contain-left{
      width:850px;
      margin-bottom: 40px;
      .order-step{margin:50px 0 30px;}
      .order-det1,.order-det2,.order-det3 {
         border: 1px solid #dedede;
         .Mytitle-box {
              border-bottom: 1px solid #dedede;
              margin-bottom:20px;
              .Mytitle {
                font-size: 16px;
                color: #292929;
                padding: 0 20px;
                line-height: 55px;
                border-bottom: 2px solid #00aaef;
                display: inline-block;
                }

          }
          .pre-time {
              border-bottom: 1px dashed #dedede;
              width: 94%;
              margin: 0 auto;
              padding-bottom: 20px;
              font-size: 12px;
          }
          .title {
              font-size: 25px;
              color: #282828;
              width: 94%;
              margin: 14px auto;
              line-height: 35px;
              font-weight: normal;
          }
          .start-mes {
              width: 94%;
              overflow:hidden;
              margin: 0 auto;
              li {
                    float: left;
                    font-size: 12px;
                    margin-right: 20px;
                    margin-top: 5px;
               }
          }
          .look-mes {
              display:block;
              margin: 20px auto;
              width: 94%;
              overflow:hidden;
              li {
                  float: left;
                  font-size: 12px;
                  margin-right: 20px;
                  text-decoration: underline;
              }
          }
      }

    }
    .fl {
    float: left;
    }
    .clearfix2 {
        overflow: hidden;
    }
    .colorRed {
        color: #c60c1a;
    }
    .fr {
        float: right;
    }
    .order-det2{
      margin-top:20px; 
    }
    .lxr-row{
         margin:10px 0;
         span{
           width:14px;
           display:inline-block;
         }
         .lxr-row-b{
            display: inline-block;
            width: 2px;
            height: 14px;
            background: #41AAFF;
            margin-right:31px;
                  }
         .lxr-row-r{
            background: red;
                  }         
         .lxr-c{
            margin-left:32px; 
         }         
      }
    .lxr-row-head{
       border-bottom:1px dashed #ddd;
       padding-bottom:8px;
       font-size:14px;
    }
    .lxr-row-headr{
      color:red;
      font-size:14px;
    }
    .lxr-row-bottom{
      padding-bottom:15px;
       border-bottom:1px solid #ddd;

    }
    .order-det3{
      margin-top:20px;
       .orderTxtFoot {
            border-top: 1px solid #dedede;
            p {
                width: 94%;
                margin: 20px auto;
                color: #808080;
            }
        }
    }
    .contain-right{
        width: 310px;
        border: 1px solid #dedede;
        .title {
            width:310px;
            text-align: center;
            color: #282828;
            margin: 20px 0 10px;
            font-weight: normal;
        }
        .allPrice {

            width:310px;
            text-align: center;
            font-size: 20px;
        }
        .completeMess{
                display: block;
                width: 270px;
                font-size: 16px;
                color: #FFFFFF;
                margin: 20px auto;
        }
    }
  }
.safeMess{
  width:100%;
  height:50px;
  display:block;
  text-align:center;
  font-size:24px;
  color:#444;
}
.status-error{
  font-size:40px;
  width:100%;
  color:#e4393c;
  text-align:center;
  margin:30px 0 10px;
}
.error-txt{
  text-align:center;
  margin-bottom:30px;
  color:#444;
  font-size:14px;
}
</style>
