<template>
    <div class="clearfix">
        <div class="collect fr">
            <div class="header">
                <ul id="header-ul" @click="active">
                    <li>
                        <el-badge :value="12" class="item"></el-badge>
                        <span :class="isActive ? 'active' : ''" @click="all">全部{{allNum}}</span>  
                    </li>
                    <li>
                        <el-badge :value="2" class="item"></el-badge>
                        <span @click="photography">全球旅拍{{photographyNum}}</span>  
                    </li>
                    <li>
                        <el-badge :value="4" class="item"></el-badge>
                        <span @click="domesticPhotography">国内摄影{{domesticPhotographyNum}}</span>  
                    </li>
                    <li>
                        <el-badge :value="5" class="item"></el-badge>
                        <span @click="foreignPhotography"> 国外摄影{{foreignPhotographyNum}}</span>  
                    </li>
                    <li>
                        <el-badge :value="5" class="item"></el-badge>
                        <span @click="tourism">旅游{{tourismNum}}</span>  
                    </li>
                </ul>
            </div>
            <div class="content">
                <ul>
                    <li v-for="item in collectList" :key="item.id">
                        <router-link :to="'#/ware/detail?id=' + item.id" target="_blank">
                        <img :src="item.customerWareMainImgInfo.filePath" alt="">
                        <p>{{item.wareTripInfo.wareName}}</p>
                        <span class="price">
                            <i class="icon-rmb">￥</i><strong></strong>
                        </span>
                        <span>{{item.wareTripInfo.suggestedPrice}}</span><em>/起</em>
                        </router-link>
                    </li>
                     <li>
                        <!-- <router-link :to="'#/ware/detail?id=' + item.id" target="_blank"> -->
                            <img src="http://fileServer.yueshijue.com/fileService/uploads/2017/10/31/415094392283953.jpg" alt="">
                            <p>海南三亚旅拍婚纱摄影1天套系</p>
                            <span class="price">
                                <i class="icon-rmb">￥</i><strong></strong>
                            </span>
                            <span>56666</span><em>/起</em>
                        <!-- </router-link> -->
                    </li>
                    <li>
                        <img src="http://fileServer.yueshijue.com/fileService/uploads/2017/10/31/415094392283953.jpg" alt="">
                        <p>海南三亚旅拍婚纱摄影1天套系</p>
                        <span class="price">
                            <i class="icon-rmb">￥</i><strong></strong>
                        </span>
                        <span>56666</span>/起
                    </li>
                    <li>
                        <img src="http://fileServer.yueshijue.com/fileService/uploads/2017/10/31/415094392283953.jpg" alt="">
                        <p>海南三亚旅拍婚纱摄影1天套系</p>
                        <span class="price">
                            <i class="icon-rmb">￥</i><strong></strong>
                        </span>
                        <span>56666</span>/起
                    </li>
                    <li>
                        <img src="http://fileServer.yueshijue.com/fileService/uploads/2017/10/31/415094392283953.jpg" alt="">
                        <p>海南三亚旅拍婚纱摄影1天套系</p>
                        <span class="price">
                            <i class="icon-rmb">￥</i><strong></strong>
                        </span>
                        <span>56666</span><em>/起</em>
                    </li>
                    <li>
                        <img src="http://fileServer.yueshijue.com/fileService/uploads/2017/10/31/415094392283953.jpg" alt="">
                        <p>海南三亚旅拍婚纱摄影1天套系</p>
                        <span class="price">
                            <i class="icon-rmb">￥</i><strong></strong>
                        </span>
                        <span>56666</span><em>/起</em>
                    </li>
                    <li>
                        <img src="http://fileServer.yueshijue.com/fileService/uploads/2017/10/31/415094392283953.jpg" alt="">
                        <p>海南三亚旅拍婚纱摄影1天套系</p>
                        <span class="price">
                            <i class="icon-rmb">￥</i><strong></strong>
                        </span>
                        <span>56666</span><em>/起</em>
                    </li>
                    <li>
                        <img src="http://fileServer.yueshijue.com/fileService/uploads/2017/10/31/415094392283953.jpg" alt="">
                        <p>海南三亚旅拍婚纱摄影1天套系</p>
                        <span class="price">
                            <i class="icon-rmb">￥</i><strong></strong>
                        </span>
                        <span>56666</span><em>/起</em>
                    </li>
                    <li>
                        <img src="http://fileServer.yueshijue.com/fileService/uploads/2017/10/31/415094392283953.jpg" alt="">
                        <p>海南三亚旅拍婚纱摄影1天套系</p>
                        <span class="price">
                            <i class="icon-rmb">￥</i><strong></strong>
                        </span>
                        <span>56666</span><em>/起</em>
                    </li>
                    <li>
                        <img src="http://fileServer.yueshijue.com/fileService/uploads/2017/10/31/415094392283953.jpg" alt="">
                        <p>海南三亚旅拍婚纱摄影1天套系</p>
                        <span class="price">
                            <i class="icon-rmb">￥</i><strong></strong>
                        </span>
                        <span>56666</span><em>/起</em>
                    </li>
                    <li>
                        <img src="http://fileServer.yueshijue.com/fileService/uploads/2017/10/31/415094392283953.jpg" alt="">
                        <p>海南三亚旅拍婚纱摄影1天套系</p>
                        <span class="price">
                            <i class="icon-rmb">￥</i><strong></strong>
                        </span>
                        <span>56666</span><em>/起</em>
                    </li>
                    <li>
                        <img src="http://fileServer.yueshijue.com/fileService/uploads/2017/10/31/415094392283953.jpg" alt="">
                        <p>海南三亚旅拍婚纱摄影1天套系</p>
                        <span class="price">
                            <i class="icon-rmb">￥</i><strong></strong>
                        </span>
                        <span>56666</span><em>/起</em>
                    </li>
                    <li>
                        <img src="http://fileServer.yueshijue.com/fileService/uploads/2017/10/31/415094392283953.jpg" alt="">
                        <p>海南三亚旅拍婚纱摄影1天套系</p>
                        <span class="price">
                            <i class="icon-rmb">￥</i><strong></strong>
                        </span>
                       <span>56666</span> <em>/起</em>
                    </li> 
                </ul>
            </div>

            <div class="block">
                <el-pagination
                @current-change="handleCurrentChange"
                :page-size="12"
                layout="total, prev, pager, next"
                :total="14">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import { findListByMemId } from '@/api'
export default {
    data() {
        return {
            allNum: '',
            photographyNum: '',
            domesticPhotographyNum: '',
            foreignPhotographyNum: '',
            tourismNum: '',
            collectList: [],
            currentPage: '1',
            pageNum: '1',
            nextPage: '',
            prePage:'',
            kindId: '',
            isActive: ''
        }
    },
    created() {
        this.all()
    },
    methods: {
        getFindListByMemId(data) {
            findListByMemId(data).then(res => {
                console.log(res)
                if(res.data.status == 1) {
                    const customer = res.data.data.customerUsermemberCollectVo
                    const page = res.data.data.page
                    this.allNum = customer.allNum;
                    this.photographyNum = customer.photographyNum;
                    this.domesticPhotographyNum = customer.domesticPhotographyNum;
                    this.foreignPhotographyNum = customer.foreignPhotographyNum;
                    this.tourismNum = customer.tourismNum;
                    this.collectList = customer.customerUsermemberCollectDos;
                    this.nextPage = page.nextPage;
                    this.prePage = page.prePage;
                }
            })
        },
        all() {
            this.kindId = ''
            let data = {
                kindId: "",
                numPerPage: "12",
                pageNum: this.currentPage
            }
            this.getFindListByMemId(data)
        },
        photography() {
            this.kindId = '415057355555522'
            let data = {
                kindId: '415057355555522',
                numPerPage: '12',
                pageNum: this.currentPage
            }
            this.getFindListByMemId(data)
        },
        domesticPhotography() {
            this.kindId = '715060598102532'
            let data = {
                kindId: '715060598102532',
                numPerPage: '12',
                pageNum: this.currentPage
            }
            this.getFindListByMemId(data)
        },
        foreignPhotography() {
            this.kindId = '715060598613714'
            let data = {
                kindId: '715060598613714',
                numPerPage: '12',
                pageNum: this.currentPage
            }
            this.getFindListByMemId(data)
        },
        tourism() {
            this.kindId = '415057355808314'
            let data = {
                kindId: '415057355808314',
                numPerPage: '12',
                pageNum: this.currentPage
            }
            this.getFindListByMemId(data)
        },
        handleCurrentChange(val) {
            this.currentPage = "'" + val + "'"
            console.log(this.currentPage)
            let data = {
                kindId: this.kindId,
                numPerPage: '12',
                pageNum: this.currentPage
            }
            this.getFindListByMemId(data)
        },
        active() {
            var oUl =  document.getElementById('header-ul')
                var aLi = oUl.getElementsByTagName('li')
                for(var i=0;i<aLi.length;i++){
                    aLi[i].onclick = function(){
                        for(var j = 0; j < aLi.length; j++) {
                            aLi[j].className = ''
                        }
                        this.className = 'active'
                    }
                }
        },
    }
}
</script>

<style lang="scss" scoped>
.collect{
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
            &:hover{
                border-bottom: 3px solid #19A9E8;
            }
            .el-badge{
                position: absolute;
                top: 20px;
                right: -10px;
                sup{
                    line-height: 0px;
                }
            }
            span{
                display: inline-block;
                width: 100%;
                height: 53px;
                line-height: 53px;
                padding: 0 20px;
                font-size: 16px;
                cursor: pointer;
               
            } 
        }
        .active {
            border-bottom: 3px solid #19A9E8;
        }

    }
    .content{
        // margin: 20px;
        width: 100%;
        display: flex;
        justify-content: space-around;
        ul{
            li{
                display: inline-block;
                width: 23%;
                margin: 14px;
                margin-right: 0;
                cursor: pointer;
                img{
                    height: auto;
                    width: 100%;
                }
                span{
                    color: #c60c1a;
                    font-weight: bold;
                }
                em{
                    color: #c60c1a;
                }
            }
        }
    }
    .block{
        position: relative;
        margin: 30px 250px;
    }
}
</style>
