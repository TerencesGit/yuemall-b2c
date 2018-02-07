<template>
  <div class="container">
    <div v-title :data-title="this.$route.name"></div>
    <div class="order-pay">
      <ul class="pay-method-list clearfix">
        <li :class="{'active': payChannel === 'WXP'}">
          <el-radio v-model="payChannel" label="WXP">
            <img src="../../../assets/img/logo_wxpay.png">
          </el-radio>
        </li>
       <!--  <li :class="{'active': payChannel === 'ALP'}">
          <el-radio v-model="payChannel" label="ALP">
            <img src="../../../assets/img/logo_alipay.png">
          </el-radio>
        </li> -->
        <li class="payway-ybf" :class="{'active': payChannel === 'YBF'}">
          <el-radio v-model="payChannel" label="YBF">
            <img src="../../../assets/img/logo_ybfpay1.png">
            <img src="../../../assets/img/logo_ybfpay2.png" class="icon-ybf2">
          </el-radio>
        </li>
      </ul>
      <div class="pay-button">
        <el-button type="primary" size="small" @click="confirmPay">确认支付</el-button>
      </div>
    </div>
    <!-- 支付二维码 -->
    <el-dialog 
      width="30%"
      :title="payTitle"
      :visible.sync="payQrCodeVisible">
        <div class="dialog-body">
          <img :src="payCodeImg">
        </div>
    </el-dialog>
  </div>
</template>

<script>
  import { getPayCode, getOrderInfoByPayId, yueInstalment, orderQuery } from "@/api";
  export default {
    data() {
      return {
        payId: '',
        payType: 1,
        payChannel: "WXP",
        orderId: '',
        orderType: '',
        payCodeImg: '',
        payTitle: '打开微信扫一扫',
        payQrCodeVisible: false,
        timer: null,
        queryNum: 0,
      }
    },
    methods: {
      getOrderByPayId() {
        let data = {
          id: this.payId,
          payType: this.payType,
        }
        getOrderInfoByPayId(data).then(res => {
          if (res.data.status == 1) {
           this.orderType = res.data.data.orderType;
           this.orderId = res.data.data.orderId;
          } else {
            this.$message.error(res.data.msg)
          }
        }).catch(err => {
          console.log(err)
        })
      },
      yuePay() {
        let params = {
          orderPayId: this.payId,
        }
        yueInstalment(params).then(res => {
          if(res.data && res.data.url) {
             window.location.href = res.data.url;
          } else {
            this.$message.error(res.data.msg)
          }
        }).catch(err => {
          console.log(err)
        })
      },
      queryOrderTimer() {
        this.timer = setInterval(this.queryOrderStatus, 8000)
      },
      queryOrderStatus() {
        let data = {
          id: this.orderId
        }
        orderQuery(data).then(res => {
          if(res.data.status === 1) {
            if(res.data.data === 'SUCCESS') {
              clearInterval(this.timer)
              this.$message.success('支付成功')
              this.payQrCodeVisible = false;
            } else {
              this.queryNum++;
              if(this.queryNum === 10) {
                clearInterval(this.timer)
                this.payQrCodeVisible = false;
                this.$message.success('支付超时，请重试')
              }
            }
          } else {
            this.$message.error(res.data.msg)
          }
        })
      },
      getPaymentCode() {
        let data = {
          id: this.payId,
          payType: this.payType
        }
        getPayCode(data).then(res => {
          if(res.data.status === 1) {
            this.payCodeImg = res.data.data.qrUrl;
            this.payQrCodeVisible = true;
            this.queryOrderTimer()
          } else {
            this.$message.error(res.data.msg)
          }
        }).catch(err => {
          console.log(err)
        })
      },
      confirmPay() {
        if (this.payChannel === "YBF") {
          this.yuePay()
        } else if(this.payChannel === "WXP") {
          this.getPaymentCode()
        }
      },
    },
    created() {
      this.payId = this.$route.query.payId;
      this.payId && this.getOrderByPayId()
    },
  }
</script>

<style lang="scss" scoped>
  .order-pay {
    margin-top: 100px;
  }
  .pay-method-list {
    display: inline-block;
    vertical-align: middle;
    > li {
      float: left;
      margin-right: 30px;
      &:last-child {
        margin-right: 0;
      }
      img {
        /*width: 118px;*/
        margin-top: -5px;
        vertical-align: middle;
      }
      &.payway-ybf {
        margin-left: 15px;
        .el-radio {
          width: 114px;
          position: relative;
          .icon-ybf2 {
            position: absolute;
            left: 25px;
            bottom: -30px;
            width: 127px;
            height: 0;
            transition: all .5s;
          }
        }
        &:hover {
          .icon-ybf2 {
            height: 24px;
            transition: all .3s;
          }
        }
      }
    }
    > .active {
      border-color: #1380E2;
    }
    .recharge {
      font-size: 12px; 
      vertical-align: bottom;
    }
  }
  .pay-button {
    display: inline-block;
    margin-left: 150px;
    .el-button {
      font-size: 16px;
      border-radius: 0;
    }
  }
  .dialog-body {
    text-align: center;
  }
</style>
