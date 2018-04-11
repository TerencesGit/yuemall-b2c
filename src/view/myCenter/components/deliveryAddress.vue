<template>
  <div>
      <div class="delivery-address">
          <div class="header">
              <ul>
                    <li>
                        <span>收获地址</span>
                    </li>
                    <router-link to="addressAdd" style="float:right; margin-top: 18px; margin-right:0px;width: 150px;">新增地址</router-link>
              </ul>
          </div>
          <div class="content">
              <ul>
                  <li>
                      <span>收件人</span>
                  </li>
                  <li>
                      <span>所在地区</span>
                  </li>
                  <li>
                      <span>详细地址</span>
                  </li>
                  <li>
                      <span>邮编</span>
                  </li>
                  <li>
                      <span>操作</span>
                  </li>
              </ul>
              <div class="address-content">
                  <ul v-for="item in addressList" :key="item.id">
                        <li>
                            <span>{{item.name}}</span>
                        </li>
                        <li>
                            <span>{{item.province.name}} {{item.city.name}} {{item.area.name}}</span>
                        </li>
                        <li>
                            <span>{{item.address}}</span>
                        </li>
                        <li>
                            <span>{{item.postcode}}</span>
                        </li>
                        <li>
                            <span><router-link :to="'addressDetail?id='+item.id">查看</router-link> </span>
                            <span><router-link :to="'addressEdit?id='+item.id">编辑</router-link></span>
                            <span><a href="#" @click="deleteAdd(item.id)">删除</a></span>
                        </li>
                  </ul>
              </div>
          </div>
      </div>
      <el-dialog
            title="温馨提示"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose">
            <span>您确认要删除记录吗？</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteBtn">确 定</el-button>
            </span>
            </el-dialog>
  </div>
</template>

<script>
import { findUserAddress, deleteUserAddressById } from '@/api'
export default {
    data() {
        return {
            addressList: [],
            dialogVisible: false,
        }
    },
    created() {
        this.getFindUserAddress()
    },
    methods: {
        getFindUserAddress() {
            let data = {}
            findUserAddress(data).then( res => {
                if(res.data.status === 1) {
                    var info = res.data.data;
                    this.addressList = info
                }
            })
        },
        handleClose(done) {
            this.$confirm('确认关闭？')
            .then(_ => {
                done();
            })
            .catch(_ => {});
        },
        deleteAdd(id){
           sessionStorage.setItem('de_id',id);
           this.dialogVisible = true;
        },
        deleteBtn(){
            let de_id =  sessionStorage.getItem('de_id');
            let data = {
                ids: [de_id]
            }
            deleteUserAddressById(data).then( res => {
                if(res.data.status === 1) {
                    this.$message(res.data.data)
                    this.getFindUserAddress()
                }else {
                    this.$message(res.data.msg)
                }
            })
            this.dialogVisible = false
        }
    }
}
</script>

<style lang="scss" scoped>
.delivery-address {
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
        min-height: 642px;
        ul {
            width: 100%;
            height: 45px;
            background-color: #F5F5F5;
            color: #a8a8a8;
            li {
                float: left;
                width: 20%;
                // &:first-child{
                //     width: 25%;
                // }
                // &:nth-child(2){
                //     width: 25%;
                // }
                // &:nth-child(3){
                //     width: 15%;
                // }
                span {
                    text-align: center;
                    height: 100%;
                    line-height: 45px;
                    padding-left: 20px;
                }
            }  
        }
        .address-content {
            ul {
                li {
                    span {
                        color: #000;
                        &:last-child{
                            a {
                              color: red;  
                            }
                        }
                    }
                }
            }
        }
    }
}

</style>
