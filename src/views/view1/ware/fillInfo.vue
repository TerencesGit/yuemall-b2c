<template>
  <section>
    <div v-title :data-title="this.$route.name"></div>
   <div class="fill_order">
    <div class="fill_steps_con">
        <el-steps :active="active" finish-status="success" class="fill_steps" align-center>
            <el-step title="选择产品"></el-step>
            <el-step title="填写订单"></el-step>
            <el-step title="在线支付"></el-step>
            <el-step title="完善信息"></el-step>
          </el-steps>
    </div> 
   <p class="fill-order_title"></p>

  <el-form :model="ruleForm" status-icon ref="ruleForm" label-width="100px" class="ruleForm1">
   <div class="routMes fl"> 
     <p class="routMes_title">{{orderMess.wareName}}</p>
     <div class="txtDate">服务日期：<span class="riqi">{{format_date}}</span> 基础：<span class="cr">{{orderMess.adultNum}}</span></div>
     <div class="routMessage">
        <h3><i class="el-icon-setting"></i>出游人信息</h3>
        <div class="tourist-tips">
            <p class="first-tip">请确保您填写的信息真实准确，否则会影响您的顺利出行。</p>
        </div>

        <div class="traver"  v-for="(item,index) in ruleForm.customerOrderCustomers" :key="index">
          <div class="fl-panel fl">
               <div class="top">
                 <input class="field_input touristType" type="hidden">第<span class="num">{{index+1}}</span>位
               </div>
               <div class="bottom ">
                    成人
               </div>
           </div>
          <div class="fl-input fl">
              <el-form-item label="中文姓名" class="l_input1"  :prop="'customerOrderCustomers.' + index + '.name'" :rules="{required: true, message: '姓名不能为空', trigger: 'blur'}">
                <el-input  v-model="item.name" auto-complete="off"></el-input>
              </el-form-item>
              <div class="l_card">
                  <el-form-item label="证件类型">
                    <el-col :span="9">
                      <el-select v-model="item.cardType" placeholder="请选择证件类型" class="sle_card fl">
                            <el-option label="身份证" value="1"></el-option>
                            <el-option label="护照" value="2"></el-option>
                            <el-option label="军官证" value="3"></el-option>
                            <el-option label="驾照" value="4"></el-option>
                      </el-select>
                     </el-col>
                   <el-col :span="10">
                    <el-form-item class='fl'   :prop="'customerOrderCustomers.' + index + '.cardNum'" :rules="{required: true, message: '证件号码不能为空', trigger: 'blur'}">
                      <el-input  v-model="item.cardNum" :key="item.cardType" placeholder="证件号码" class="l_input2"></el-input>
                   </el-form-item>
                   </el-col>
                     <el-button type="info" plain @click="dialogVisible = true" class="explain">填写说明</el-button>

                  </el-form-item>
            </div>

            <el-form-item label="手机号码"  class="routData l_input1" :prop="'customerOrderCustomers.' + index + '.mobile'" :rules="{
      required: true,validator: validatePass, trigger: 'blur'}">

            <el-input v-model="item.mobile"></el-input>

            </el-form-item>
            <el-form-item label="国籍" class="routData l_input1" :prop="'customerOrderCustomers.' + index + '.hometownName'" :rules="{
      required: true, message: '国籍不能为空', trigger: 'blur'}">
              <el-input  v-model="item.hometownName"></el-input>
            </el-form-item>
            <el-form-item label="性别"  class="routData l_input1">
              <el-radio v-model="item.sex" label="1">男</el-radio>
              <el-radio v-model="item.sex" label="2">女</el-radio>
            </el-form-item>
            <el-form-item label="是否孕期"  class="routData l_input1">
              <el-radio v-model="item.isPregnancy" label="1">是</el-radio>
              <el-radio v-model="item.isPregnancy" label="2">否</el-radio>
            </el-form-item>
            <el-form-item label="出生日期" class="routData l_input1"  :prop="'customerOrderCustomers.' + index + '.birthday'" :rules="{type: 'date',required: true, message: '出生日期不能为空', trigger: 'blur'}">
              <el-date-picker v-model="item.birthday" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
            <p class="tel_tips">请至少填写一个出游人手机号，以便旅途中联系您</p>
          </div>
        </div>
     </div>

<!-- 选择收货地址 -->
 <div class="myOrderListBox">
    <div style="font-size: 20px;color: #282828;margin:40px 0 40px 0;" class="cb">
        <p class="fl" style="line-height: 28px;">选择收货地址</p>
        <el-button type="primary" class="add_address" @click="dialogFormVisible = true"><i class="el-icon-plus el-icon--left"></i>添加收货地址</el-button>
    </div>
   <el-table ref="singleTable" :data="tableData"  highlight-current-row @current-change="handleCurrentChange" style="width: 100%"> 
     <el-table-column  prop="name" label="收件人"  width="100"> </el-table-column>
      <el-table-column prop="isDefault" label="所在地区"  width="180"></el-table-column>
      <el-table-column prop="address" label="详细地址"  width="300"> </el-table-column>
      <el-table-column prop="postcode" label="邮编"> 
      </el-table-column>
  </el-table>
</div>
<!-- 选择收货地址 -->
    <ul class="clearfix2 btn-Go">
       <li class="fl preDo"><a href="javascript:history.go(-1)"> &lt; 上一步</a></li>
       <el-button class="subGo"  type="danger" @click="submitForm('ruleForm')">确认保存信息</el-button>
    </ul>
   </div>
</el-form>
<!-- 右侧悬浮  start-->
  <div class="routMes fr" id="routMes" :class="searchBarFixed == true ? 'isFixed' :''">
    <div class="orderMessage">
    <div class="orderPic">
        <img class="goImg" :src="orderMess.wareImg" alt="图片">
    </div>
    <h2 class="bigTitle">订单信息</h2>
    <ul class="cb orderList">
        <li>服务时间</li>
        <li class="goDate">{{format_date}}</li>
    </ul>
    <ul class="cb orderList">
        <li>服务数量</li>
        <li>基础：<span class="goCr">{{orderMess.adultNum}}</span> 
     </li>
    </ul>
    <ul class="cb orderList">
        <li>基础价格</li>
        <li>¥<span class="goTcPrice">{{orderMess.totalPrice}}</span></li>
    </ul>
    <ul class="cb orderList">
        <li>单人差价</li>
        <li>¥<span class="goDrCjPrice">{{orderMess.singleAmount}}</span></li>
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
        <li class="totalPrice">¥<span class="goAllPrice">{{orderMess.totalAmount}}</span></li>
    </ul>
</div>
   </div>
<!-- 右侧悬浮  end-->
<el-dialog title="填写说明" :visible.sync="dialogVisible" width="60%" class="explain_tan">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="填写说明" name="1">
          <p>填写说明</p>
             <div class="showFillRule-box">
                <ul>
                    <li>1. 乘客姓名需与所选证件上的名字一致。</li>
                    <li>2. 中文姓名：</li>
                    <li>若持护照登机，必须确认护照上有中文姓名。</li>
                    <li>生僻字可用拼音代替，例如：“王鬳”可输入为“王yan”。</li>
                </ul>
            </div>
      </el-tab-pane>
      <el-tab-pane label="老版护照" name="2">
         <img src="/static/image/huzhao1.jpg" width="100%">
      </el-tab-pane>
      <el-tab-pane label="新版护照" name="3">
         <img src="/static/image/huzhao2.jpg" width="100%">
      </el-tab-pane>
      <el-tab-pane label="港澳通行证" name="4">
        <img src="/static/image/huzhao5.jpg" width="100%">
      </el-tab-pane>
      <el-tab-pane label="台湾通行证" name="5">
        <img src="/static/image/huzhao4.jpg" width="100%">
      </el-tab-pane>
      <el-tab-pane label="台胞证" name="6">
        <img src="/static/image/huzhao3.jpg" width="100%">
      </el-tab-pane>

  </el-tabs>
</el-dialog>

<!-- 添加新地址弹出框   start -->
  <el-dialog title="添加新地址" :visible.sync="dialogFormVisible">
      <el-form :model="addressForm" status-icon :rules="rules1" ref="addressForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="姓名" prop="name" >
          <el-input v-model="addressForm.name" style="width:360px"></el-input>
        </el-form-item>
        <div class="get-Area"> 
           <el-form-item label="所在地区" required>
                <el-select v-model="get_Area1.province"  placeholder="省" style="width:120px;" @change="handleChange" >
                   <el-option v-for="item in get_Area.province" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
            <span>省</span>
            <el-select v-model="get_Area1.city" placeholder="市" style="width:120px"  @change="handleChange1">
               <el-option v-for="item in get_Area.city" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
            <span>市</span>
            <el-select v-model="get_Area1.area" placeholder="区/县" style="width:120px" @change="handleChange2">
               <el-option v-for="item in get_Area.area" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
            <span>区/县</span>

          </el-form-item>
        </div>

        <el-form-item label="详细地址" prop="address" >
          <el-input v-model="addressForm.address" style="width:360px"></el-input>
        </el-form-item>

        <el-form-item label="邮政编码" prop="postcode" >
          <el-input v-model="addressForm.postcode" style="width:200px"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="phone" >
          <el-input v-model="addressForm.phone" style="width:200px"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary"  @click="sub_address('addressForm')" >确 定</el-button>
      </div>
    </el-dialog>
 </div> 
<!-- 添加新地址弹出框  end -->
  </section>
</template>

<script>
  import {findchinaarea,create_user_address,find_user_address,perfectInformation,findOrderInfomation,personalCenter,orderList} from '@/api'  

  export default {
    name: "fillInfo",
    data() {
      var validatePass = (rule, value, callback) => {
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
       var postcode = (rule, value, callback) => {
        let reg = /^1[3|4|5|8]\d{9}$/;
        if (value === '') {
          callback(new Error('邮政编码不能为空'));
        }
        else if (! /^[0-9][0-9]{5}$/.test(value)){
           callback(new Error('请输入正确的邮政编码'));
        }
        else{
          callback()
        }
      };
      var card = (rule, value, callback) => {
        let reg = /^1[3|4|5|8]\d{9}$/;
        console.log(rule)
        if (value === '') {
          callback(new Error('证件号码不能为空'));
        }
        else if (! /^[0-9][0-9]{5}$/.test(value)){
           callback(new Error('请输入正确的邮政编码'));
        }
        else{23432
          callback()
        }
      };
      return {
        radio: '1',
        validatePass:validatePass,
        card:card,
        searchBarFixed:false,
        active: 3,
        t_contract:false,
        centerDialogVisible: false,
        dialogVisible:false,
        format_date:'',
        d_area:[],
        activeName: '1',
        get_Area:{
          province:[],
          city:[],
          area:[],
        },
        orderMess: {
            // activityInfos:[],
            // activityPrice:0,
            // adultNum:3,
            // adultPrice:55299,
            // childNum:0,
            // childPrice:55299,
            // cityName:"中国",
            // homeNum:0,
            // serviceInfos:[],
            // servicePrice:10400,
            // singleAmount:55299,
            // skuDate:1520438400000,
            // totalAmount:120998,
            // totalPrice:55299,
            // wareImg:"http://fileServer.yueshijue.com/fileService/uploads/2017/11/04/415097792407276.jpg",
            // wareName:"马尔代夫玛娜法鲁岛旅拍婚纱照6天4晚（含摄影+旅游）"
        },
        ruleForm:{
          addressId:"",
          customerOrderCustomers:[]
        },
        tableData: [
          // {address:"马尔代夫玛娜法鲁岛旅拍婚纱照6马尔代夫玛娜法鲁岛旅拍婚",area:{id: 500, name: "东城区"},areaId:500,city:{id: 52, name: "北京"},cityId:52,createTime:1517711315000,id:415177113148207,isDefault:1,memId:415176513489897,name:"123",phone:"15923223223",postcode:"100000",province:{id: 2, name: "北京"},provinceId:2},
          // {address:"马尔代夫玛娜法鲁岛旅拍婚纱照6马尔代夫玛娜法鲁岛旅拍婚",area:{id: 500, name: "东城区"},areaId:500,city:{id: 52, name: "北京"},cityId:52,createTime:1517711315000,id:415177113148207,isDefault:1,memId:415176513489897,name:"123",phone:"15923223223",postcode:"100000",province:{id: 2, name: "北京"},provinceId:2},
        ],
        dialogFormVisible: false,
        addressForm: {
          address:"",
          areaId:"",
          cityId:"",
          name:"",
          phone:"",
          postcode:"",
          provinceId:"",
        },   
         get_Area1:{
          province:'北京',
          city:'北京',
          area:'东城区',
        },
         rules1: {
          name: [
            { required: true, message: '请输入您的姓名', trigger: 'blur' },
          ],
          address: [
            {required: true, message: '请输入您的详细地址', trigger: 'blur' }
          ],
          phone: [
            { required: true, validator: validatePass, trigger: 'blur' }
          ],
          postcode: [
            { required: true, validator:postcode, trigger: 'blur' }
          ],
        }
      }
    }, 
    methods: {
      // 保存信息(整体)
        submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
               if(this.tableData ==''){
                  this.$message.error('请您添加收货地址');
                  return false
               }
               let data = this.ruleForm;
               console.log(data)
               perfectInformation(data).then(res => {
                 if(res.data.status === 1) {
                     this.$message({
                      message: '恭喜你，信息保存成功',
                      type: 'success'
                    })
                 }
                 else{
                    this.$message.error('信息保存失败')
                 }
                 })
               }

            else {
            console.log('error submit!!');
            return false;
          }
         })
       },
       // 添加新地址信息
       sub_address(formName) {
        console.log(this.$refs[formName])
        this.$refs[formName].validate((valid) => {
          if (valid) {  
          let data = this.addressForm;
            create_user_address(data).then(res => {
                if(res.data.status === 1) {
                   this.$message({
                      message: '恭喜你，地址添加成功',
                      type: 'success'
                    });
                   // 调用一遍获取地址接口，更新
                   this.getAddress()
                   this.dialogFormVisible = false

                 }
                 else{
                  this.$message.error('地址添加失败');
                 }
              })
          } else {
            console.log('error submit!!');
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
       handleClick(tab, event) {
        console.log(tab, event);
      },
      handleChange(value) {
         let data = {
          id:value,
          }
          console.log("省"+value)
         findchinaarea(data).then(res => {
          if(res.data.status === 1) {
             this.get_Area.city = res.data.data
             this.get_Area1.city =res.data.data[0].name
             let data1 = {
                      id:res.data.data[0].id,
                      }
             this.addressForm.provinceId = value  
             this.addressForm.cityId = res.data.data[0].id                          
             findchinaarea(data1).then(res => {
                if(res.data.status === 1) {
                   this.get_Area.area = res.data.data
                   this.get_Area1.area =res.data.data[0].name
                   this.addressForm.areaId = res.data.data[0].id
                 }
              })
           }
         })
       },
       handleChange1(value) {
         console.log(value)
         let data = {
          id:value,
          }
         findchinaarea(data).then(res => {
          if(res.data.status === 1) {
             this.get_Area.area = res.data.data
             this.get_Area1.area = ''
             this.addressForm.areaId = ''
           }
        })
         this.addressForm.cityId = value
       },

       getAddress(value) {
         find_user_address().then(res => {
          if(res.data.status === 1) {
             this.tableData = res.data.data;
           }
        })
       },

        handleChange2(value) {
         this.addressForm.areaId = value
       },
      setCurrent(row) {
        this.$refs.singleTable.setCurrentRow(row);
      },
       handleCurrentChange(val) {
        this.currentRow = val;
      },

      getArea() {
        let data = {
          id1:{id:1},
          id2:{id:2},
          id3:{id:52},
        }
        findchinaarea(data.id1).then(res => {
          if(res.data.status === 1) {
             this.get_Area.province = res.data.data
             this.addressForm.provinceId = 1
             this.addressForm.cityId = 2
             this.addressForm.areaId = 52
           }
        })
        findchinaarea(data.id2).then(res => {
          if(res.data.status === 1) {
             this.get_Area.city = res.data.data
           }
        })
        findchinaarea(data.id3).then(res => {
          if(res.data.status === 1) {
             this.get_Area.area = res.data.data
           }
        })
      },
      // 获取完善信息页面的信息
      getRecommendWare() {
        let data = {
          id:this.ruleForm.addressId
        }
        findOrderInfomation(data).then(res => {
          if(res.data.status === 1) {
             console.log(res.data.data)
             this.orderMess = res.data.data;
              // 获取成人数，调整出游人数量 start----
              let _orderInfo = {
                birthday:"",
                cardNum:"",
                cardType:"1",
                email:"",
                height:"",
                hometownName:"",
                isPregnancy:"2",
                mobile:"",
                name:"",
                orderId:this.ruleForm.addressId,pantsSize:"",
                qq:"",
                sex:"1",
                shirtSize:"",
                type:"",
                wechat:"",
                weight:""
              }
              for(let i=0; i < this.orderMess.adultNum; i++){
                this.ruleForm.customerOrderCustomers.push(_orderInfo)
              }
           } else {
            this.$message.error(res.data.msg);
          }
        })
      },
      getPersonalMess() {
        let data = {
          page:{
            currentPage:1,
            pageSize:5
          },
          status:""
        }
        orderList(data).then(res => {
          if(res.data.status === 1) {
             console.log(res.data.data)
           } else {
            this.$message.error('信息获取失败');
          }
        })
      },
      getPersonalMess1() {
          personalCenter().then(res => {
          if(res.data.status === 1) {
             console.log(res.data.data)
           } else {
            this.$message.error('信息获取失败');
          }
        })
      },
      // 滚动监听
      handleScroll () {
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        var offsetTop = document.querySelector('#routMes').offsetTop;
        let screen_w = (document.body.clientWidth - 1200)/2;
          if (scrollTop > offsetTop) {
            this.searchBarFixed = true;
            document.querySelector('#routMes').style.right=screen_w+"px";
          } else {
            this.searchBarFixed = false;
            document.querySelector('#routMes').style.right=0;
          }
      }
    },
    computed:{

        },
    created(){
      // 从地址栏获取goodsid
        var urlF=window.location.href.split("?")[1];
        this.ruleForm.addressId = urlF;
         // 获取完善信息接口 
          this.getRecommendWare()
      
          // 获取所在地区列表
         this.getArea() 
          //获取地址接口 
         this.getAddress()
         
          //格式化日期
         this.format_date = this.fmtDate(Number(this.orderMess.skuDate)) 
      // 获取成人数，调整出游人数量 end-----
        this.getPersonalMess1()
         this.getPersonalMess()
        },
    mounted () {
      // 滚动监听
      window.addEventListener('scroll', this.handleScroll);
      // 默认地址第一个
      if(this.tableData){
        this.setCurrent(this.tableData[0])
      };
      // 格式化收货地址的 所在地区
      for(let i=0;i<this.tableData.length;i++){
      this.d_area.push(this.tableData[i].province.name+","+this.tableData[i].city.name+","+this.tableData[i].area.name)
       this.tableData[i].isDefault = this.d_area[i]
      }
      },

    destroyed () {
      window.removeEventListener('scroll', this.handleScroll)
    },
  }
</script>

<style lang="scss" scoped>
 .fill_order{
  width:1200px;
  margin:0 auto;
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
    margin: 20px 0 0 0;
    width: 100%;
    border-top: 1px solid #c60c1a;
    padding-top: 13px;
}
.fl{float:left;}
.fr{float:right;}
.cb{height:auto;overflow: hidden;}
.routMes_title{
    font-size: 25px;
    color: #282828;
    font-weight: bold;
    line-height: 35px;
}
.txtDate {
    font-size: 14px;
    color: #282828;
    line-height: 19px;
    margin-top: 15px;
    span {
    display: inline-block;
    margin: 0 5px;
    }
    .riqi{
      margin-right:15px;
    }
}
.routMessage {
    width: 800px;
    height: auto;
    overflow: hidden;
    border: 1px solid #DEDEDE;
    margin-top: 20px;
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
.l_input1{
  width:450px;
}
.l_input2{
  width:215px;
  margin-left:4px;
}
.traver{
  padding:30px 5% 10px;
  margin:10px 0 30px 2%; 
  height: auto;
  overflow: hidden;
  border:1px solid #efefef;
  width:96%;
}
.fl-panel{
    margin-left:30px;
    width: 64px;
    height: 37px;
    line-height: 48px;
    margin-right: 10px;
    border: 1px solid #e9e9e9;
    text-align: center;
    .top{
      height: 22px;
      line-height: 22px;
      font-size: 12px;
      color: #999;
      .num{
        font-size: 12px;
      }
    }
    .bottom{
      background: #699bc3;
      height: 16px;
      line-height: 16px;
      font-size: 12px;
      color: #fafafa;
    }
}
.sle_card{width:130px;}
.l_card{width:450px;}

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
.allprice{
  border-top:1px dashed #dedede;
  margin-top:12px;
}
.isFixed{
  position: fixed;
  top:0;
  right:0;
  z-index:999;
  .orderMessage{
     margin-top:0;
  }
}
.btn-Go {
    margin-top: 40px;
    float: left;
    a {
    display: block;
    width: 100px;
    height: 60px;
    line-height: 60px;
    font-size: 16px;
    color: #808080;
    &:hover{
      color:#e4393c;
    }
    }
    .preDo {
    width: 620px;
    height: 60px;
    background-color: #F2F2F2;
    padding-left: 20px;
    margin-bottom:40px;
    }
    .subGo {
    width: 180px;
    height: 60px;
    text-align: center;
    color: #FFFFFF;
    font-size: 20px;
    border:none;
    cursor: pointer;
   } 
}
.myOrderListBox{
  margin-bottom: 40px;
}
.add_address{
  margin-left:20px;
}
.get-Area{
  display: block;
  span{
    display: inline-block;
    margin:0 5px;
  }
}
.explain{
  position: absolute;
  top:2px;
  right:-130px;
  font-size: 12px;
}
.explain_tan{
  .el-tab-pane{
    height:400px;
    overflow: auto;
  }
}
</style>
