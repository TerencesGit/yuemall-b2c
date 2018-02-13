<template>
  <div>
      <div class="addressDetail">
          <div class="header">
              <ul>
                  <li>
                      <span>地址信息</span>
                  </li>
              </ul>
          </div>
          <div class="content">
            <ul>
                <li>
                    <span>收件人</span> 
                    <em>{{name}}</em>
                </li>
                <li>
                    <span>所在地区</span> 
                    <em>{{provinceName}} {{cityName}} {{areaName}}</em>
                </li>
                <li>
                    <span>详细地址</span> 
                    <em>{{address}}</em>
                </li>
                <li>
                    <span>邮政编码</span> 
                    <em>{{postcode}}</em>
                </li>
                <li>
                    <span>联系电话</span> 
                    <em>{{phone}}</em>
                </li>
            </ul>
            <router-link to="deliveryAddress">
                <el-button type="primary">返回</el-button>
            </router-link>
          </div>
      </div>
  </div>
</template>

<script>
import { findUserAddressById } from '@/api'
export default {
    data() {
        return {
            id: '',
            name: '',
            provinceName: '',
            cityName: '',
            areaName: '',
            address: '',
            postcode: '',
            phone: ''
        }
    },
    created() {
        this.getId()
        this.getFindUserAddressById()
    },
    methods: {
        getId() {
            this.id = window.location.href.split('?')[1].split('=')[1]
        },
        getFindUserAddressById() {
            let data = {
                id: this.id
            }
            findUserAddressById(data).then( res => {
                if(res.data.status === 1) {
                    var info = res.data.data
                    this.name = info.name
                    this.provinceName = info.province.name
                    this.cityName = info.city.name
                    this.areaName = info.area.name
                    this.address = info.address
                    this.postcode = info.postcode
                    this.phone = info.phone
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.addressDetail {
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
                    margin-left: 40px;
                }
            }
        }
        .el-button {
            margin-left: 120px;
        }
    }
}
</style>
