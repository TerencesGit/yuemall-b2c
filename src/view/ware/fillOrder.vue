<template>
  <section>
    <div v-title :data-title="this.$route.name"></div>
   <div id="fill_order">
    <div class="fill_steps_con">
          <el-steps :active="active" finish-status="success" class="fill_steps" align-center>
            <el-step title="选择产品"></el-step>
            <el-step title="填写订单"></el-step>
            <el-step title="在线支付"></el-step>
            <el-step title="完善信息"></el-step>
          </el-steps>
    </div> 
   <p class="fill-order_title">{{orderMess.wareName}}</p>

  <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="ruleForm1">
   <div class="routMes fl">
      <div class="routMessage">
        <h3><i class="el-icon-upload"></i>    预定信息</h3>
        <div class="routData cb">
            <p class="fl rout-data-p"><i>*</i>服务日期</p>
            <input id="fillOrdCx" class="fl rout-data-inp" placeholder="请选择日期" type="text"  v-model="f_date">
        </div>
        <div class="routData cb">
            <p class="fl rout-data-p"><i>*</i>基础套餐</p>
            <el-input-number v-model="orderMess.adultNum" :min="1" class="adult_num fl"></el-input-number>
            <p class="routePrice fl"><i class="el-icon-close"></i><span class="price_cr">￥{{orderMess.adultPrice}}</span></p>
        </div>
        <div class="routData cb">
            <p class="fl rout-data-p"><i>*</i>单人差价</p>
            <el-input-number  v-model="orderMess.singleNum" :min="0" :max="orderMess.adultNum" class="adult_num fl"></el-input-number>
            <p class="routePrice fl"><i class="el-icon-close"></i><span class="price_cr">￥{{orderMess.adultPrice}}</span></p>
        </div>
     </div>

     <div class="routMessage">
        <h3><i class="el-icon-menu"></i>联系人信息</h3>
          <el-form-item label="姓名" prop="contactName" class="routData l_input">
            <el-input  v-model="ruleForm.contactName"></el-input>
          </el-form-item>
          <div class="r_sex">
             <el-radio v-model="ruleForm.sex" label="1">先生</el-radio>
             <el-radio v-model="ruleForm.sex" label="2">女士</el-radio>  
          </div> 
          <el-form-item label="电话" prop="contactMobile" class="routData l_input">
            <el-input  v-model="ruleForm.contactMobile"></el-input>
          </el-form-item>

          <el-form-item label="邮箱" prop="contactEmail" class="routData l_input">
            <el-input  v-model="ruleForm.contactEmail"></el-input>
          </el-form-item>
     </div>

     <el-input type="textarea" :rows="2" placeholder="添加一些备注吧" v-model="ruleForm.memberNote" class="remarks">
    </el-input>
     
   </div>
   <!-- 底部  start -->
   <div class="f_footer" id="m-footer" :class="footerTop == true ? 'isFixed1' :''">
    <div class="footer-main">
        <div class="click-to-agree">
           <label class="input_checkbox enabled">
            <el-checkbox v-model="t_contract" class="t-contract">我已阅读并同意</el-checkbox>
           </label>
            <em class="contract-name"  @click="centerDialogVisible = true">旅游合同、保险条款、保险经纪委托合同、特别预订提示、安全提示</em>
        </div>
        <div class="next">
           <el-button type="primary" @click="submitForm('ruleForm')">提交订单</el-button>
        </div>
        <div class="clear-float"></div>
    </div></div>
    <!-- 底部   end -->
</el-form>
<!-- 右侧悬浮  start-->
   <div class="routMes fr" id="routMes" :class="searchBarFixed == true ? 'isFixed' : ''">
    <div class="orderMessage">
    <div class="orderPic">
        <img class="goImg" :src="orderMess.wareImg" alt="图片">
    </div>
    <h2 class="bigTitle">订单信息</h2>
    <ul class="cb orderList">
        <li>服务时间</li>
        <li class="goDate">{{f_date}}</li>
    </ul>
    <ul class="cb orderList">
        <li>服务数量</li>
        <li>基础：<span class="goCr">{{orderMess.adultNum}}</span> 
     </li>
    </ul>
    <ul class="cb orderList">
        <li>基础价格</li>
        <li>¥<span class="goTcPrice">{{adult_P}}</span></li>
    </ul>
    <ul class="cb orderList">
        <li>单人差价</li>
        <li>¥<span class="goDrCjPrice">{{single}}</span></li>
    </ul>
    <ul class="cb orderList">
        <li>附加项</li>
        <li>¥<span class="goBxPrice">{{orderMess.servicePrice}}</span></li>
    </ul>
    <ul class="cb orderList">
        <li>可选产品</li>
        <li>¥<span class="goBxPrice">{{orderMess.activityPrice}}</span></li>
    </ul>
    <ul class="cb orderList allprice">
        <li class="totalPrice_name">总价</li>
        <li class="totalPrice">¥<span class="goAllPrice">{{total}}</span></li>
    </ul>
</div>
   </div>
<!-- 右侧悬浮  end-->
<!-- 合同信息弹出框 -->
     <el-dialog
        title="预定合同" :visible.sync="centerDialogVisible" width="1000px" center>
        <div class="reamnd_cen_txt" v-for="item in r_contract">
            <p> 
                <b class="cen_txt_title">{{item.title}}</b>
                {{item.content}}
            </p>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
        </span>
     </el-dialog>
   </div>
  </section> 
</template>

<script>  
    import { createOrder } from '@/api'

  export default {
    name: "fillorder",
    data() {
      var f_phone = (rule, value, callback) => {
        let reg = /^1[3|4|5|8]\d{9}$/;
        if (value === '') {
          callback(new Error('请输入联系人手机号码'));
        }
        else if (!reg.test(value)){
           callback(new Error('请输入11位正确格式手机号码'));
        }
        else{
          callback()
        }
      };
      var f_email = (rule, value, callback) =>{
        let isEmail = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
         if (value === '') {
          callback(new Error('邮箱不能为空'));
        }
        else if (!isEmail.test(value)){
           callback(new Error('邮箱格式不正确'));
        }
         else{
          callback()
        }
      };
      return {
        searchBarFixed:false,
        active: 1,
        t_contract:false,
        centerDialogVisible: false,
        f_date:"",
        footerTop:false,
        orderMess:{
         // activityInfos:[
         //   {activityNum:2,brandId:0,briefName:"普吉岛芭东与我同眠设计酒店一晚住宿",businessActivityId:315155657414951,cashReserveMinute:0,createBy:1613,createName:"fenxiao2@ysj.com",createTime:1516935132000,dstCityCode:0,id:215169351327260,isRemoved:1,keyWords:"旅拍，婚纱照，海外婚纱照，酒店",nocashReserveMinute:0,orgId:0,parentId:215169351323276,providerId:1613,providerName:"fenxiao2@ysj.com",sellPreDays:0,srcCityCode:0,status:1,suggestedPrice:0,updateBy:0,verifyBy:1678,verifyName:"wangyao",verifyTime:1516935529000,versionId:1,wareCode:"215169351327260",wareDesc:"普吉岛芭东与我同眠设计酒店 ↵高级房 含双早↵如遇房满，推荐同级别酒店", wareGroupId:0,wareKind:0,wareName:"普吉岛芭东与我同眠设计酒店一晚住宿",wareType:0},
         //   {activityNum:2,brandId:0,briefName:"普吉岛芭东与我同眠设计酒店一晚住宿",businessActivityId:315155657414951,cashReserveMinute:0,createBy:1613,createName:"fenxiao2@ysj.com",createTime:1516935132000,dstCityCode:0,id:215169351327260,isRemoved:1,keyWords:"旅拍，婚纱照，海外婚纱照，酒店",nocashReserveMinute:0,orgId:0,parentId:215169351323276,providerId:1613,providerName:"fenxiao2@ysj.com",sellPreDays:0,srcCityCode:0,status:1,suggestedPrice:0,updateBy:0,verifyBy:1678,verifyName:"wangyao",verifyTime:1516935529000,versionId:1,wareCode:"215169351327260",wareDesc:"普吉岛芭东与我同眠设计酒店 ↵高级房 含双早↵如遇房满，推荐同级别酒店",wareGroupId:0,wareKind:0,wareName:"普吉岛芭东与我同眠设计酒店一晚住宿",wareType:0}],
         //      activityPrice:10,
         //      adultNum:3,
         //      adultPrice:4500,
         //      childNum:0,
         //      childPrice:4000,
         //      cityName:" ",
         //      homeNum:1,
         //      serviceInfos:[
         //      {brandId:0, briefName:"大象",businessServiceId:315155657274048,cashReserveMinute:0,createBy:1613,createName:"fenxiao2@ysj.com",createTime:1516935131000,dstCityCode:0,id:215169351325287,keyWords:"旅拍，婚纱照，海外婚纱照，大象",nocashReserveMinute:0,orgId:0,parentId:215169351323276,providerId:1613,providerName:"fenxiao2@ysj.com",sellPreDays:0,serviceNum:2,srcCityCode:0,status:1,suggestedPrice:0,updateBy:0,verifyBy:1678,verifyName:"wangyao",verifyTime:1516935529000,versionId:1,wareCode:"215169351325287",wareDesc:"大象 ",wareKind:0,wareName:"大象",wareType:0,}
         //      ],
         //      servicePrice:1004,
         //      singleAmount:12000,
         //      singleNum:1,
         //      skuDate:1519862400000,
         //      totalAmount:26514,
         //      totalPrice:13500,
         //      wareId:215169351323276,
         //      wareImg:"http://fileServer.yueshijue.com/fileService/uploads/2017/11/01/415095077847938.jpg",
         //      wareName:"运营测试--泰国普吉岛旅拍婚纱照1天套系",
         //      status:1
        },
        ruleForm:{
          activityInfos:[],
          adultNum:"",
          childNum:"",
          contactEmail:"",
          contactMobile:"",
          contactName:"",
          homeNum:"",
          memberNote:"",
          serviceInfos:[],
          sex:"1",   
          singleNum:"",
          skuDate:"",
          wareId:""
        },
        rules: {
          contactName: [
            { required: true, message: '请输入联系人姓名', trigger: 'blur' },
          ],
          contactMobile: [
            { required: true,validator: f_phone, trigger: 'blur' }
          ],
          contactEmail: [
            { required: true,validator: f_email, trigger: 'blur' }
          ],
        },
        r_contract:[
          {title:"第一条 .特别提示",content:"悦百分代理预订平台展示的产品由具备相关资质的商家直接提供，悦百分仅作为网络预订平台。商家充分借用悦百分预订平台，推出全方位的产品，并负责产品销售、资源确认、合同签署、发票开具、行程安排等全部环节的服务。悦百分作为产品的展示平台，您对本协议的接受并不意味着悦百分成为产品交易的参与者，对前述交易悦百分仅提供技术支持，不对商家行为的合法性、有效性及产品的真实性、合法性及有效性作任何明示或暗示的担保。在预订开始前，请仔细阅读本须知，产品页面中的附件条款也作为协议的补充内容。当您开始预订该产品时，表明您已仔细阅读并接受协议中的所有条款。"},
          {title:"第二条词语定义",content:"1.商家：通过悦百分代理预订平台展示产品的具有合法资质的的公司/旅行社。2. 悦百分预订平台：由悦百分提供系统平台技术，商家自行进行产品上线及售卖服务的第三方服务平台。"},
          {title:"第三条.产品内容与价格",content:"悦百分展示的产品价格仅为参考价格，由于产品价格的波动性，商家可能因为机票、酒店等的价格变动而适度调整其在悦百分网上已公布的产品的价格。您预订的所有产品的价格及产品价格包含的内容，以商家与您最后确认为准。非特别标明，产品价格不包含办理护照、入台证、签证或签注费、行李物品的保管及超重费、个人消费、航空人身意外保险费及您应自行投保的其它保险费用。"},
          {title:"第四条.订单生效与合同生效",content:"您在悦百分预订产品成功后，商家会给您关于订单的确认，您应在与商家约定的付款期前及时付清给您确认的应付款，您确认的订单才生效。但如您未及时付清相关费用，而此时产品的价格、内容或标准等有发生变化，悦百分及其商家对此不承担任何责任。待您付款成功，并且商家给予您最终确认后，商家与您之间的合同生效。"},
          {title:"第五条.您主动更改或取消已生效订单",content:"订单生效后，您若需要更改或取消该订单内的任何项目，请务必在行程开始前通知商家更改或取消需求。商家会尽量满足您的需求，但您必须全额承担因变更或取消带来的损失及可能增加的费用，包括但不限于签证或签注费、订房损失费、机票费及其它车船交通费用等。若您所预订的产品在目的地停留的日期部分或全部处在国家法定节假日或其它部分国际性、国家性、地方性重大节日期间，鉴于资源的特殊状况，已生效订单如进行更改或取消将产生全额损失。"},
          {title:"第六条.因商家原因变更或取消已生效订单",content:"在您按要求付清应付费用并经商家最终确认后，如因商家原因，致使您的产品不能成行或内容发生更改的，商家会第一时间通知您。或在经您同意后，调整产品中的行程内容或接待标准，退还差额费用。如调整后的产品价格高于原来价格，您须补足多出的相应差额。"},
          {title:"第七条. 安全事项",content:"1. 您应确保被服务人身体条件适合本次服务/出行，如被服务人为孕妇或有心脏病、高血压、呼吸系统疾病等病史，请在征得医院专业医生同意后服务/出行。2. 您保证提供的证件、通讯联络方式、配送地址等相关资料均真实有效。3. 您应尊重当地的法律法规、宗教信仰、民族习惯和风土人情，自觉保护当地自然环境。4. 您在服务中应注意人身财产安全，妥善保管自己的证件及行李物品，如果发生人身意外、伤害或随身携带行李物品遗失、被盗、被抢等情况，由您自行承担。5. 您在服务过程中如对产品商家的服务质量有异议，应积极与产品商家沟通积极争取在服务过程中解决。"},
          {title:"第八条．第三方责任",content:"由于出入境管理局、各国领馆、航空公司、保险公司、及其他有权机构等不可控制的第三方、原因导致您人身、财产权益受到损害的，包括但不限于，航班延误或取消、护照延期、签证拒签或未按时出签、不得出入境等，应由您方自行协商解决，必要时请及时联系商家协助处理。"}
        ]
      }
    },
    methods: {
       submitForm(formName){
          this.ruleForm.activityInfos=this.orderMess.activityInfos;
          this.ruleForm.adultNum = this.orderMess.adultNum;
          this.ruleForm.childNum = this.orderMess.childNum;
          this.ruleForm.homeNum = this.orderMess.homeNum;
          this.ruleForm.serviceInfos=this.orderMess.serviceInfos;
          this.ruleForm.singleNum=this.orderMess.singleNum;
          this.ruleForm.skuDate=this.orderMess.skuDate;
          this.ruleForm.wareId=this.orderMess.wareId;
          this.$refs[formName].validate((valid) => {
            if (valid) {
               if(!this.t_contract){
                 this.$message.error("请阅读预定合同并同意")
                  return false;
                }
                 let data = Object.assign({}, this.ruleForm);
                 createOrder(data).then(res => {
                  if(res.data.status === 1) {
                    let payId = res.data.data;
                    this.$router.push('/ware/pay?payId='+payId)
                  }
                  else{
                    console.log(res.data.msg)
                  }
                })
            } else {
              return false;
            }
          });
      },
      fmtDate(obj){
            var date =  new Date(obj);
            var y = 1900+date.getYear();
            var m = "0"+(date.getMonth()+1);
            var d = "0"+date.getDate();
            return y+"-"+m.substring(m.length-2,m.length)+"-"+d.substring(d.length-2,d.length);
        }, 
      getadvanceorder() {
        this.orderMess = JSON.parse(sessionStorage.getItem("orderInfo"));
      },
      // 滚动监听
      handleScroll () {
        // 滚动高度
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        var offsetTop = document.querySelector('#routMes').offsetTop;
        var remarksTop = document.querySelector('.site-footer').offsetTop;
        let screen_w = (document.body.clientWidth - 1200)/2;
          if (scrollTop > offsetTop) {
            this.searchBarFixed = true;
            document.querySelector('#routMes').style.right=screen_w+"px";
          } else {
            this.searchBarFixed = false;
            document.querySelector('#routMes').style.right=0;
          }
        // 页面总高度
         var scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
      　　if(document.body){
      　　　　bodyScrollHeight = document.body.scrollHeight;
      　　}
      　　if(document.documentElement){
      　　　　documentScrollHeight = document.documentElement.scrollHeight;
      　　}
      　　scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight; 
         // 可视区域高度
         var windowHeight = 0;
      　　if(document.compatMode == "CSS1Compat"){
      　　　　windowHeight = document.documentElement.clientHeight;
      　　}else{
      　　　　windowHeight = document.body.clientHeight;
      　　}

          if(scrollHeight == scrollTop + windowHeight){

             this.footerTop = true
          }else{
             this.footerTop = false
          }  
    }},

    computed:{
      // 总价
        total:function(){
          let totalPrice = 0;
          return totalPrice = this.orderMess.adultNum*this.orderMess.adultPrice+this.orderMess.servicePrice+this.orderMess.singleNum*this.orderMess.adultPrice+this.orderMess.activityPrice;
        },
     // 基础价格
        adult_P:function(){
         let adultPrice = 0;
         return adultPrice = this.orderMess.adultNum*this.orderMess.adultPrice;
       },
     //单人差价
        single:function(){
        let singlePrice = 0;
        return singlePrice = this.orderMess.singleNum*this.orderMess.adultPrice;
       },  
       
        },
     mounted () {
      window.addEventListener('scroll', this.handleScroll);
      this.f_date = this.fmtDate(this.orderMess.skuDate);
    },
    created() {
      this.getadvanceorder();
    },
    destroyed () {
      window.removeEventListener('scroll', this.handleScroll)
    },
  }
   
  
</script>

<style lang="scss" scoped>
         #fill_order{
          width:1200px;
          margin:0 auto;
          height:auto;
          overflow: hidden;
          position: relative;
         }
         .fill_steps_con{
          width:1200px;
          margin:0 auto;
          overflow:hidden;
           .fill_steps{
              text-align:center;
              padding:40px 0px;
              width:1200px;
              margin:0 auto;
              position:relative;
              /*left:8%;*/
              }}
        .fill-order_title{
            font-size: 20px;
            color: #48576a;
            margin: 20px 0 0 0;
            width: 100%;
            border-bottom: 1px solid #c60c1a;
            font-weight: normal;
            padding-bottom: 13px;
        }
        .fl{float:left;}
        .fr{float:right;}
        .cb{height:auto;overflow: hidden;}
        .routMessage {
            width: 800px;
            position: relative;
            height: auto;
            overflow: hidden;
            border: 1px solid #DEDEDE;
            margin-top: 20px;
            .r_sex{
              position: absolute; 
              top:95px;
              right:340px;
            }
            .tourist-tips {
            background: #fffced;
            width:96%;
            border: 1px solid #f3dbba;
            color: #999;
            font-size: 14px;
            margin:20px auto;
            padding: 12px 17px 11px 10px;
             }
            .tel_tips {
            width: 288px;
            margin-left: 100px;
            margin-top: 10px;
            padding: 5px 10px;
            line-height: 22px;
            background: #fffced;
            border: 1px solid #f3dcbb;
            font-size: 12px;
            color: #999;
            }
            .often_travel{
              margin-left:23px;
              color:#48576a;
              margin-top:10px;
            }
            h3 {
                font-size: 16px;
                color: #444;
                padding: 20px 0;
                border-bottom: 2px solid #DEDEDE;
                padding-left: 30px;
                font-weight: normal;
            }
            .routData {
              position: relative;
              margin: 20px 0;
              .rout-data-p {
                line-height: 36px;
                width:150px;
                height:36px;
                overflow: hidden;
                margin-right: 12px;
                font-size: 13px;
                color: #48576a;
                i {
                  color:#ff4949;
                  display: inline-block;
                  vertical-align: middle;
                  border-radius: 50%;
                  margin: 0 4px 0 50px;}
              }
              .rout-data-inp {
                  cursor: pointer;
                  border: none;
                  border: 1px solid #DEDEDE;
                  width: 168px;
                  height: 36px;
                  border-radius: 5px;
                  text-align: center;}
             }
           .adult_num{
            width:168px;
          }
          .routePrice {
            font-size: 16px;
            color: #48576a;
            line-height: 36px;
            margin-left: 18px;
            span {
              color: #c60c1a;
              font-size: 13px;
              margin-left: 12px;}
        }
        }
        .ruleForm1{
          width:300px;
          margin-top:20px;}
        .l_input{
          width:300px
        }
        .remarks{
          margin-top:20px;
          margin-bottom:200px;
        }
        .cen_txt_title{
          display: block;
          font-size: 16px;
          margin-top:10px;
        }
        .orderMessage{
            width: 350px;
            padding:15px;
            background: #FFFFFF;
            border: 1px solid #DEDEDE;
            margin-top: 20px;
            .orderPic {
              width: 320px;
              img {
                width: 100%;
                height: auto;
              }
              }
            .bigTitle{
              font-size:22px;
              color:#444;
              font-weight:normal;
              margin-top:10px;
            }  
            .orderList li:nth-child(1) {
            float: left;
            color: #808080;
            margin-top: 15px;
           }
           .orderList li:nth-child(2) {
            float: right;
            color: #282828;
            margin-top: 15px;
           }
           .totalPrice_name{
            font-size: 18px;
           }
           .goAllPrice{
            font-size: 18px;
            color:#e4393c;
           }
        }
        @media screen and (max-width: 1400px) {
            .orderMessage{
               .orderPic {
                  img {
                  width: 100%;
                  height: 170px;
                 }
               }
               .orderList li:nth-child(1) {
                  margin-top: 5px;
                 }
               .orderList li:nth-child(2) {
                  margin-top: 5px;
                 }

            }
        }
        .allprice{
          border-top:1px dashed #dedede;
          margin-top:12px;
        }
        .isFixed{
          position: fixed;
          top:0;
          right:0;
          z-index:9999;
          .orderMessage{
             margin-top:0;
          }
        }
        .f_footer{
            color: #666;
            background: #fff;
            -webkit-box-shadow: 0px 0px 5px 0px rgba(76, 89, 101, 0.10);
            -moz-box-shadow: 0px 0px 5px 0px rgba(76, 89, 101, 0.10);
            box-shadow: 0px 0px 5px 0px rgba(76, 89, 101, 0.10);
            width: 100%;
            position: fixed;
            bottom: 0;
            left: 0;
            line-height: 80px;
            z-index: 98;
            border-top: 1px solid #eee;
            border-bottom: 1px solid #eee;
            .footer-main {
                width: 1200px;
                margin: 0 auto;
               .click-to-agree {
                  float: left;
                  display: inline-block;
                  .input_checkbox {
                      cursor: pointer;
                  }
                  em {
                       color: #22c233;
                       cursor: pointer;
                        }
                  .tn_fontface {
                      vertical-align: -2px;
                      margin-right: 5px;
                  }
                }
              .next {
                  float: right;
                  display: inline-block;
                  button {
                      min-width: 140px;
                      background: #c60c1a;
                      -moz-border-radius: 2px;
                      -webkit-border-radius: 2px;
                      border-radius: 2px;
                      height: 50px;
                      font-size: 18px;
                      color: #fff;
                      border: 1px solid #c60c1a;
                      padding: 0 25px;
                      cursor: pointer;
                      line-height: 50px;
                      box-sizing: content-box;
                  }
              }
             }
             .clear-float {
               clear: both;
             }
        } 
        .isFixed1{
          position: fixed;
          bottom:100px;
          right:0;
          transition: all 1s;
          }
        .el-checkbox__inner{
          border:1px solid #409EFF!important
        }
        .el-checkbox__input.is-checked .el-checkbox__inner{

        }
</style>
