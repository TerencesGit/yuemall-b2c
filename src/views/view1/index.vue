<template>
  <section>
    <!-- header -->
    <div class="header-wrap">
        <HeaderBar :logo="storeLogo" class="header-top"></HeaderBar>
        <el-carousel height="680px">
          <el-carousel-item v-for="item in bannerList" :key="item.id">
            <img :src="item.urlAddr" alt=""> 
          </el-carousel-item>
        </el-carousel>
        <Searchbar class="header-search"></Searchbar>
    </div>
    <!-- destination -->
    <div class="destination-wrap container">
      <IndexTitle :title="'全球100+旅拍目的地'" :EnTitle="'global travel destinations'"></IndexTitle>
      <div class="global-dst">
        <DstList 
          v-for="(item, index) in globalDst" 
          v-if="item.cityList.length !== 0"
          :key="index" 
          :title="item.name"
          :dstList="item.cityList"
          @cityClick="handleCityClick">
        </DstList>
      </div>
      <IndexNav></IndexNav>
    </div>
    <!-- ad1 -->
    <div class="ad-box">
      <div class="part1">
        <div class="part1-1">
          <div class="part-1-1-1">
            <img src="/static/img/ad1-1.jpg" alt="">
          </div>
          <div class="part-1-1-2">
            <img src="/static/img/ad1-2.jpg" alt="">
          </div>
        </div>
        <div class="part1-2">
          <div class="part-1-2-1">
            <img src="/static/img/ad1-4.jpg" alt="">
          </div>
          <div class="part-1-2-2">
            <img src="/static/img/ad1-5.jpg" alt="">
          </div>
          <div class="part-1-2-3">
            <img src="/static/img/ad1-6.jpg" alt="">
          </div>
        </div>
      </div>
      <div class="part2">
        <img src="/static/img/ad1-3.jpg" alt="">
      </div>
    </div>
    <!-- warelist -->
    <div class="container-fluid">
      <!-- 本地拍 -->
      <ShowHeader :showData="showHeader.localPhoto"></ShowHeader>
      <ShowRows :span="3" :gutter="10" :showData="wareList" :mapping="wareMapping"></ShowRows>
      <!-- 特别推荐 -->
      <ShowHeader :showData="showHeader.recommendPhoto"></ShowHeader>
      <ShowRows :span="3" :gutter="10" :showData="recommendList" :mapping="wareMapping"></ShowRows>
      <!-- 全国排 -->
      <ShowHeader :showData="showHeader.nativePhoto"></ShowHeader>
      <ShowRows :span="3" :gutter="10" :showData="LocalWareList" :mapping="wareMapping"></ShowRows>
      <!-- 亚洲拍 -->
      <ShowHeader :showData="showHeader.asiaPhoto"></ShowHeader>
      <ShowRows :span="3" :gutter="10" :showData="AsiaWareList" :mapping="wareMapping"></ShowRows>
      <!-- 全球拍 -->
      <ShowHeader :showData="showHeader.globalPhoto"></ShowHeader>
      <ShowRows :span="3" :gutter="10" :showData="GlobalWareList" :mapping="wareMapping"></ShowRows>
    </div>
    <!-- map -->
    <div>
      <img src="/static/img/map.jpg" class="responsive-img">
    </div>
    <!-- show -->
    <div class="container-fluid"> 
      <ShowHeader :showData="showHeader.photoShow"></ShowHeader>
      <ShowRows :span="2" :gutter="10" :showData="showList" :mapping="showMapping"></ShowRows>
    </div>
    <!-- ad2 -->
    <div>
      <img src="/static/img/ad.jpg" class="responsive-img">
    </div>
    <!-- 12项高端定制旅游 -->
    <div class="travel-wrap">
      <div class="container"> 
        <IndexTitle :title="'12项高端定制旅游'" :EnTitle="'global travel destinations'"></IndexTitle>
        <div class="content">
          <img src="../../assets/img/icon12.png" alt="">
          <!-- <ul class="travel-list clearfix">
            <li class="icon" v-for="index in 12"></li>
          </ul> -->
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import { findStoreByPcDoMain, findmerchantStoreBystoreId, bannerList, dstCityByContinent, 
    wareList, recommendWare, warelistByContinent } from '@/api'
  import HeaderBar from '~/components/headerBar'
  import Searchbar from '~/components/searchBar'
  import DstList from './components/index/dstList.vue'
  import IndexTitle from './components/index/indexTitle'
  import IndexNav from './components/index/indexNav'
  import ShowHeader from './components/index/showHeader'
  import ShowRows from './components/index/showRows'
  export default {
    name: "index",
    components: {
      HeaderBar,
      Searchbar,
      IndexTitle,
      IndexNav,
      ShowHeader,
      ShowRows,
      DstList,
    },
    data() {
      return {
        providerId: '',
        storeLogo: '',
        kindCode: '',
        bannerList: [],
        dstCityList: [],
        dstCityCode: '',
        localDstCity: [],
        abroadDstCity: [],
        recommendList: [],
        wareList: [],
        globalDst: {
          'Hot': {
            name: '热门：',
            cityList: [],
          },
          'Local': {
            name: '国内：',
            cityList: [],
          },
          'Asia': {
            name: '亚洲：',
            cityList: []
          },
          'Europe': {
            name: '欧洲：',
            cityList: []
          },
          'Oceania': {
            name: '大洋洲：',
            cityList: []
          },
          'America': {
            name: '美洲：',
            cityList: []
          },
        },
        wareMapping: {
          id: 'id',
          name: 'wareName',
          imgUrl: 'mainImg',
        },
        showMapping: {
          id: 'id',
          name: 'intro',
          imgUrl: 'imgUrl',
          desc: 'name',
        },
        showHeader: {
          localPhoto: {
            title: '本地拍',
            moreUrl: '/local',
            headerBg: '/static/image/Localfilm.png'
          },
          recommendPhoto: {
            title: '特别推荐（旅游+摄影）',
            moreUrl: '/recommend',
            headerBg: '/static/image/Journeytake.png'
          },
          nativePhoto: {
            title: '全国拍',
            moreUrl: '/Thenational',
            headerBg: '/static/image/Thenational.png',
          },
          asiaPhoto: {
            title: '亚洲拍',
            moreUrl: '/Asiaphoto',
            headerBg: '/static/image/Asiashooting.png',
          },
          globalPhoto: {
            title: '全球拍',
            moreUrl: '/globalphoto',
            headerBg: '/static/image/Globalfilm.png',
          },
          photoShow: {
            title: '客片展示',
            moreUrl: '/show',
            headerBg: '/static/image/Samplesshow.png',
          }
        },
        showList: [
          { id: 207, name: '巴黎', englishName: 'Paris', url: 'Paris', region: 'oversea', 
            imgUrl: 'http://fileServer.yueshijue.com/fileService/uploads/2017/11/01/415095254612761.jpg', intro: '浪漫之都',
            recommend: true, },
          { id: 218, name: '京都', englishName: 'Kyoto', url: 'Kyoto', region: 'oversea', 
            imgUrl: 'http://fileServer.yueshijue.com/fileService/uploads/2017/11/01/415095296051782.jpg', intro: '日本京都',
            recommend: true, },
          { id: 210, name: '悉尼', englishName: 'Sydney', url: 'Sydney', region: 'oversea', 
            imgUrl: 'http://fileserver.yueshijue.com/fileService/uploads/2017/11/17/15109115747544.jpg', intro: '异域风情，澳洲之旅',
            recommend: true,
          },
          { id: 206, name: '罗马', englishName: 'Rome', url: 'Rome', region: 'oversea', 
            imgUrl: 'http://fileServer.yueshijue.com/fileService/uploads/2017/11/04/415097793509155.jpg', intro: '罗马假日',
            recommend: true, },
          { id: 201, name: '巴厘岛', englishName: 'Bali', url: 'Bali', region: 'oversea',
            imgUrl: 'http://fileServer.yueshijue.com/fileService/uploads/2017/11/04/415097791012752.jpg', intro: '度假胜地，天堂巴厘岛',
            recommend: true, },
          { id: 216, name: '马尔代夫', englishName: 'Maldives', url: 'Maldives', region: 'oversea', 
            imgUrl: 'http://fileServer.yueshijue.com/fileService/uploads/2017/11/04/415097797423675.jpg', intro: '度假天堂',
            recommend: true, },
        ],
        LocalWareList: [],
        AsiaWareList: [],
        GlobalWareList: [],
      }
    },
    methods: {
      handleCityClick(city) {
        console.log(city.name)
      },
      getStore() {
        findStoreByPcDoMain().then(res => {
          if(res.data.status === 1) {
            this.providerId = '29';
            sessionStorage.setItem('providerId', this.providerId)
            this.getMerchantStoreInfo()
            this.getBannerList()
            this.getDstCityList()
            // this.getHotCityList()
            this.getLocalCityList()
            this.getAsiaCityList()
            this.getEuropeCityList()
            this.getAustraliaCityList()
            this.getAmericaCityList()
            // this.kindCode = 'trip-T';
            this.getWareList()
            this.getLocalWareList()
            this.getAsiaWareList()
            this.getGlobalWareList()
          } else {
            this.$message.error(res.data.msg)
          }
        })
      },
      getMerchantStoreInfo() {
        let data = {
          id: this.providerId
        }
        findmerchantStoreBystoreId(data).then(res => {
          if(res.data.status === 1) {
            let storeInfo = res.data.data;
            this.storeLogo = storeInfo.storeLogo;
            // sessionStorage.setItem('storeLogo', storeInfo.storeLogo)
            document.title = storeInfo.storeName;
          }
        })
      },
      getBannerList() {
        this.loading = true;
        let data = {
          merchantId: this.providerId
        }
        bannerList(data).then(res => {
          this.loading = false;
          if(res.data.status === 1) {
            this.bannerList = res.data.data;
          } else {
            this.$message.error(res.data.message)
          }
        }).catch(err => {
          console.log(err)
          this.loading = false;
        })
      },
      getDstCityList( ) {
        let params = {
          storeId: this.providerId,
          continent: '100-101',
        }
        dstCityByContinent(params).then(res => {
          if(res.data.status === 1) {
            this.dstCityList = res.data.data;
            // console.log(this.dstCityList)
            this.dstCityCode = this.dstCityList[0].dstCityCode;
            this.localDstCity = this.dstCityList.filter(city => city.mergerName)
            this.abroadDstCity = this.dstCityList.filter(city => !city.mergerName)
            this.getRecommendWare()
          } else {
            this.$message.error(res.data.msg)
          }
        })
      },
      getHotCityList() {
        let params = {
          storeId: this.providerId,
          continent: '100-101',
        }
        dstCityByContinent(params).then(res => {
          if(res.data.status === 1) {
            this.globalDst['Hot'].cityList = res.data.data;
          } else {
            this.$message.error(res.data.msg)
          }
        })
      },
      getLocalCityList() {
        let params = {
          storeId: this.providerId,
          continent: '100-101',
        }
        dstCityByContinent(params).then(res => {
          if(res.data.status === 1) {
            this.globalDst['Local'].cityList = res.data.data;
          } else {
            this.$message.error(res.data.msg)
          }
        })
      },
      getAsiaCityList() {
        let params = {
          storeId: this.providerId,
          continent: '100',
        }
        dstCityByContinent(params).then(res => {
          console.log(res)
          if(res.data.status === 1) {
            this.globalDst['Asia'].cityList = res.data.data;
          } else {
            this.$message.error(res.data.msg)
          }
        })
      },
      getEuropeCityList() {
        let params = {
          storeId: this.providerId,
          continent: '300',
        }
        dstCityByContinent(params).then(res => {
          if(res.data.status === 1) {
            this.globalDst['Europe'].cityList = res.data.data;
          } else {
            this.$message.error(res.data.msg)
          }
        })
      },
      getAustraliaCityList() {
        let params = {
          storeId: this.providerId,
          continent: '400',
        }
        dstCityByContinent(params).then(res => {
          if(res.data.status === 1) {
            this.globalDst['Oceania'].cityList = res.data.data;
          } else {
            this.$message.error(res.data.msg)
          }
        })
      },
      getAmericaCityList() {
        let params = {
          storeId: this.providerId,
          continent: '400-101',
        }
        dstCityByContinent(params).then(res => {
          if(res.data.status === 1) {
            this.globalDst['America'].cityList = res.data.data;
          } else {
            this.$message.error(res.data.msg)
          }
        })
      },
      dstCityClick(cityCode) {
        this.dstCityCode = cityCode;
        this.getRecommendWare();
      },
      getRecommendWare() {
        let data = {
          dstCityCode: this.dstCityCode,
          providerId: this.providerId,
        }
        recommendWare(data).then(res => {
          if(res.data.status === 1) {
            this.recommendList = res.data.data;
          } else {
            this.$message.error(res.data.msg)
          }
        })
      },
      getWareList() {
        let data = {
          // kindCode: this.kindCode,
          storeId: this.providerId,
          continent: '100-101',
        }
        warelistByContinent(data).then(res => {
          if(res.data.status === 1){
            this.wareList = res.data.data.filter((w, index) => index >= 0 && index < 9);
            console.log(this.wareList)
          }
        })
      },
      getLocalWareList() {
        let data = {
          // kindCode: this.kindCode,
          storeId: this.providerId,
          continent: '100-101',
        }
        warelistByContinent(data).then(res => {
          if(res.data.status === 1){
            this.LocalWareList = res.data.data.filter((w, index) => index >= 0 && index < 9);
            console.log(this.LocalWareList)
          }
        })
      },
      getAsiaWareList() {
        let data = {
          // kindCode: this.kindCode,
          storeId: this.providerId,
          continent: '100-101',
        }
        warelistByContinent(data).then(res => {
          if(res.data.status === 1){
            this.AsiaWareList = res.data.data.filter((w, index) => index >= 0 && index < 9);
          }
        })
      },
      getGlobalWareList() {
        let data = {
          // kindCode: this.kindCode,
          storeId: this.providerId,
          continent: '',
        }
        warelistByContinent(data).then(res => {
          if(res.data.status === 1){
            this.GlobalWareList = res.data.data.filter((w, index) => index >= 0 && index < 9);
            console.log(this.GlobalWareList)
          }
        })
      },
    },
    created() {
      this.getStore()
    }
  }
</script>

<style lang="scss" scoped>
  $color: #19A9E8;
  .header-wrap {
    position: relative;
    .header-top {
      display: flex;
      justify-content: center;
      position: absolute;
      top: 30px;
      left: 50%;
      margin-left: -600px;
      z-index: 99;
    }
    .header-search {
      position: absolute;
      bottom: 50px;
      z-index: 99;
      width: 700px;
      left: 50%;
      margin-left: -350px;
    }
  }
  .container-fluid {
    margin: 50px;
  }
  .destination-wrap {
    margin-top: 80px;
    .global-dst {
      margin: 30px 0;
    }
  }
  .ad-box {
    display: flex;
    width: 100%;
    margin: 80px 0;
    .part1-1, .part1-2 {
      display: flex;
    }
    img {
      display: block;
      width: 100%;
      height: auto;
    }
  }
  .travel-wrap {
    padding: 30px 0;
    background: #FAF8F8;
    .content {
      margin: 50px 0;
      img {
        width: 100%;
      }
    }
    .travel-list {
      margin: 50px 0;
      li {
        float: left;
        width: 191px;
        height: 200px;
        margin: 10px 10px 0 0;
        transition: all .3s;
        &:hover {
          transform: scale(1.03);
        }
        &:nth-child(6n) {
          margin-right: 0;
        }
        &:nth-child(1) {
          background-position: 0 -260px;
        }
        &:nth-child(2) {
          background-position: -191px -260px;
        }
        &:nth-child(3) {
          background-position: -383px -260px;
        }
        &:nth-child(4) {
          background-position: -575px -260px;
        }
        &:nth-child(5) {
          background-position: -767px -260px;
        }
        &:nth-child(6) {
          background-position: -959px -260px;
        }
        &:nth-child(7) {
          background-position: 0 -460px;
        }
        &:nth-child(8) {
          background-position: -191px -460px;
        }
        &:nth-child(9) {
          background-position: -383px -460px;
        }
        &:nth-child(10) {
          background-position: -575px -460px;
        }
        &:nth-child(11) {
          background-position: -767px -460px;
        }
        &:nth-child(12) {
          background-position: -959px -460px;
        }
      }
    }
  }
</style>
