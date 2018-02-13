<template>
  <div>
      <div class="addressAdd">
          <div class="header">
              <ul>
                  <li>
                      <span>地址信息</span>
                  </li>
                  <router-link to="deliveryAddress" style="float:right; margin-top: 18px; margin-right:0px;width: 150px;">查看收货地址</router-link>
              </ul>
          </div>
          <div class="content">
            <ul>
                <li>
                    <span>收件人</span> 
                    <em><el-input v-model="name" placeholder="请输入收件人姓名" @blur="nameValidate"></el-input></em>
                    <p>{{nameErrorInfo}}</p>
                </li>
                <li>
                    <span>所在地区</span> 
                    <el-select v-model="provinceName" placeholder="请选择省份"  @change="provinceChange">
                        <el-option
                        v-for="item in province"
                        :key="item.id"
                        :label="item.label"
                        :value="item.name">
                        </el-option>
                    </el-select>
                    省
                    <el-select v-model="cityName" placeholder="请选择城市" @change="cityChange">
                        <el-option
                        v-for="item in city"
                        :key="item.id"
                        :label="item.label"
                        :value="item.name">
                        </el-option>
                    </el-select>
                    市
                    <el-select v-model="areaName" placeholder="请选择地区" @change="areaChange" @blur="areaValidate">
                        <el-option
                        v-for="item in area"
                        :key="item.id"
                        :label="item.label"
                        :value="item.name">
                        </el-option>
                    </el-select>
                    区
                    <p>{{areaErrorInfo}}</p>
                </li>
                <li>
                    <span>详细地址</span> 
                    <em><el-input v-model="address" placeholder="请输入详细地址" @blur="addressValidate"></el-input></em>
                    <p>{{addressErrorInfo}}</p>
                </li>
                <li>
                    <span>邮政编码</span> 
                    <em><el-input v-model="postcode" placeholder="请输入邮政编码" @blur="postcodeValidate"></el-input></em>
                    <p>{{postcodeErrorInfo}}</p>
                </li>
                <li>
                    <span>联系电话</span> 
                    <em><el-input v-model="phone" placeholder="请输入联系电话" @blur="phoneValidate"></el-input></em>
                    <p>{{phoneErrorInfo}}</p>
                </li>
            </ul>
            <el-button type="primary" @click="saveAddress">保存</el-button>
            <router-link to="deliveryAddress">
                <el-button type="info">返回</el-button>
            </router-link>
          </div>
      </div>
  </div>
</template>

<script>
import { findchinaarea, create_user_address } from '@/api'
export default {
    data() {
        return {
            name: '',
            provinceName: '',
            cityName: '',
            areaName: '',
            address: '',
            postcode: '',
            phone: '',
            province: [],
            city: [],
            area: [],
            provinceId: '',
            areaId: '',
            cityId: '',
            nameErrorInfo: '',
            areaErrorInfo: '',
            addressErrorInfo: '',
            postcodeErrorInfo: '',
            phoneErrorInfo: ''
        }
    },
    created() {
        this.getFindChinaArea()
    },
    methods: {
        getFindChinaArea() {
            let data = {
                id: '1'
            }
            findchinaarea(data).then( res => {
                if(res.data.status === 1) {
                    this.province = res.data.data
                    
                } 
            })
        },
        saveAddress() {
            this.nameValidate() 
            this.areaValidate()
            this.addressValidate()
            this.postcodeValidate()
            this.phoneValidate()
           if(this.name == '' || this.provinceName == '' || this.cityName == '' || this.areaName == '' || this.address == '' || this.postcode == '' || this.phone == '') return
            let data = {
                address: this.address,
                provinceId: this.provinceId,
                areaId: this.areaId,
                cityId: this.areaId,
                name: this.name,
                phone: this.phone,
                postcode: this.postcode,
            }
            create_user_address(data).then( res => {
                if(res.data.status === 1) {
                    this.$message(res.data.msg)
                }else {
                    this.$message(res.data.msg)
                }
            })
            this.$router.push('/myCenter/deliveryAddress')
        },
        provinceChange() {
            for(var i in this.province) {
                if(this.province[i].name == this.provinceName) {
                    this.provinceId = this.province[i].id
                    let data = {
                        id: this.provinceId
                    }
                    findchinaarea(data).then( res => {
                        if(res.data.status === 1) {
                            this.city = res.data.data
                        }
                    })
                }
            }
        },
        cityChange() {
           for(var i in this.city) {
                if(this.city[i].name == this.cityName) {
                    this.cityId = this.city[i].id
                    let data = {
                        id: this.cityId
                    }
                    findchinaarea(data).then( res => {
                        if(res.data.status === 1) {
                            this.area = res.data.data
                        }
                    })
                }
                 
            }
        },
        areaChange() {
            for(var i in this.area) {
                if(this.area[i].name == this.areaName) {
                    this.areaId = this.area[i].id
                }
            }
        },
         nameValidate() {
            if(this.name.trim().length <= 0) {
                return this.nameErrorInfo = '请输入收件人姓名'
            }else {
                this.nameErrorInfo = ''
            }
        },
        areaValidate() {
            if(this.provinceName.trim().length <= 0 && this.cityName.trim().length <= 0 && this.areaName.trim().length <= 0) {
                return this.areaErrorInfo = '请输入完整地区信息'
            }else {
                this.areaErrorInfo = ''
            }
        },
        addressValidate() {
            if(this.address.trim().length <= 0) {
                return this.addressErrorInfo = '请输入地址'
            }else {
                this.addressErrorInfo = ''
            }
        },
        postcodeValidate() {
            if(this.postcode.trim().length <= 0) 
            return this.postcodeErrorInfo = '请输入邮政编码'
            var postcodeReg = /^\d{6}$/
            if(!postcodeReg.test(this.postcode)) return this.postcodeErrorInfo = '输入正确的邮政编码！'
            this.postcodeErrorInfo = ''
        },
        phoneValidate() {
            if(this.phone.trim().length <= 0) 
            return this.phoneErrorInfo = '请输入联系电话'
            var phoneReg = /^1[3|4|5|7|8]\d{9}$/;
            if(!phoneReg.test(this.phone)) return this.phoneErrorInfo = '输入正确的手机号格式！'
            this.phoneErrorInfo = ''
        }
    }
}
</script>

<style lang="scss" scoped>
.addressAdd {
    width: 1028px;
    height: auto;
    border: 1px solid #dedede;
    margin-bottom: 50px;
    .header {
        height: 57px;
        border-bottom: 1px solid #dedede;
        li {
            float: left;
            position: relative;
            border-bottom: 3px solid #19A9E8;
            span {
                display: inline-block;
                width: 100%;
                height: 53px;
                line-height: 53px;
                padding: 0 20px;
                font-size: 16px;
                cursor: pointer;
            } 
            
        }
    }
    .content {
        margin-bottom: 60px;
        ul {
            margin: 60px;
            li {
                margin: 40px;
                span {
                    display: inline-block;
                    width: 70px;
                }
                em {
                    width: 200px;
                    display: inline-block;
                    .el-input {
                        width: 400px;
                    }
                    
                }
                .el-select {
                    width: 118px;
                }
                p {
                    color: red;
                    margin-left: 75px;
                }
            }
        }
        .el-button {
            margin-left: 170px;
            &:last-child {
                margin-left: 20px;
            }
        }
    }
}
</style>
