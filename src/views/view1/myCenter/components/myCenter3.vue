<template>
    <div class="clearfix">
        <div class="collect fr">
            <div class="header">
                <ul id="header-ul" @click="active">
                    <li>
                        <span :class="isActive ? 'active' : ''" @click="all">全部( <em>{{allNum}}</em> )</span>  
                    </li>
                    <li>
                        <span @click="photography">全球旅拍( <em>{{photographyNum}}</em> )</span>  
                    </li>
                    <li>
                        <span @click="domesticPhotography">国内摄影( <em>{{domesticPhotographyNum}}</em> )</span>  
                    </li>
                    <li>
                        <span @click="foreignPhotography"> 国外摄影( <em>{{foreignPhotographyNum}}</em> )</span>  
                    </li>
                    <li>
                        <span @click="tourism">旅游( <em>{{tourismNum}}</em> )</span>  
                    </li>
                </ul>
            </div>
            <div class="content">
                <ul>
                    <li v-for="item in collectList" :key="item.id">
                        <router-link :to="'../../ware/detail?id=' + item.customerWareMainImgInfo.wareId" target="_blank">
                        <img :src="item.customerWareMainImgInfo.filePath" alt="">
                        <p>{{item.wareTripInfo.wareName}}</p>
                        <span class="price">
                            <i class="icon-rmb">￥</i><strong></strong>
                        </span>
                        <span>{{item.wareTripInfo.suggestedPrice}}</span><em>/起</em>
                        </router-link>
                    </li>
                </ul>
            </div>

            <div class="block" v-show="isShow">
                <el-pagination
                @current-change="handleCurrentChange"
                :page-size="12"
                layout="total, prev, pager, next"
                :total="allNum">
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
            isActive: '',
            isShow: false
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
                    if(this.allNum > 12) {
                        this.isShow = true
                    }
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
            this.currentPage = '' + val + ''
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
            span{
                display: inline-block;
                width: 100%;
                height: 53px;
                line-height: 53px;
                padding: 0 20px;
                font-size: 16px;
                cursor: pointer;
               em {
                   color: #19A9E8;
               }
            } 
        }
        .active {
            border-bottom: 3px solid #19A9E8;
        }

    }
    .content{
        width: 100%;
        display: flex;
        justify-content: space-around;
        ul{
            width: 100%;
            li{
                display: inline-block;
                width: 23%;
                margin: 14px;
                margin-right: 0;
                cursor: pointer;
                p {
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
                img{
                    height: 132px;
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
