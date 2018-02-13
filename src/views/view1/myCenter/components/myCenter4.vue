<template>
    <div>
        <div class="message fr">
            <div class="header">
                    <ul>
                        <li>
                            <span>全部</span>  
                        </li>
                    </ul>
            </div>
            <div class="content">
                <ul class="clearfix">
                    <li>
                        <span>主题</span>
                    </li>
                    <li>
                        <span>时间</span>
                    </li>
                    <li>
                        <span>操作</span>
                    </li>
                </ul>
                <div class="msgContent" v-show="isInfo">
                    <p>暂无消息</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { findWareInfomation } from '@/api'
export default {
    data() {
        return {
            isInfo: false,
        }
    },
    created() {
        this.getWareInfomation()
    },
    methods: {
        getWareInfomation() {
            let data = {
                pageNum: '1',
                numPerPage: '12',
            }
            findWareInfomation(data).then( res => {
                if(res.data.status === 1) {
                    if(res.data.data.length == 0) {
                        this.isInfo = true
                    }
                }else {
                    this.$message(res.data.msg)
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.message{
    width: 1028px;
    height: auto;
    border: 1px solid #dedede;
    margin-bottom: 50px;
    .header{
        height: 57px;
        border-bottom: 1px solid #dedede;
        li{
            float: left;
            position: relative;
            &:first-child {
                border-bottom: 3px solid #19A9E8;
            }
            &:hover{
                 border-bottom: 3px solid #19A9E8;
            }
            span{
                    height: 100%;
                    line-height: 53px;
                    padding: 0 20px;
                    font-size: 16px;
                    cursor: pointer;
            }  
        }
    }
    .content{
        min-height: 642px;
        ul{
            width: 100%;
            height: 45px;
            background-color: #F5F5F5;
            color: #a8a8a8;
            li{
                float: left;
                &:first-child{
                    width: 50%;
                }
                &:nth-child(2){
                    width: 25%;
                }
                &:nth-child(3){
                    width: 15%;
                }
                span{
                    text-align: center;
                    height: 100%;
                    line-height: 45px;
                    padding-left: 20px;
                }
            }  
        }
        .msgContent {
            p {
                font-size: 26px;
                color: #ddd;
                text-align: center;
                margin-top: 150px;
            }
        }
        
    }
}

</style>
