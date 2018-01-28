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
      <div class="dst-wrap">
        <DstList :title="'热门：'" :dstList="localCityList"></DstList>
        <DstList :title="'国内：'" :dstList="localCityList"></DstList>
        <DstList :title="'亚洲：'" :dstList="AsiaCityList"></DstList>
        <DstList :title="'欧洲：'" :dstList="EuropeCityList"></DstList>
        <DstList :title="'大洋洲：'" :dstList="AustraliaCityList"></DstList>
        <DstList v-show="AmericaCityList.length" :title="'北美：'" :dstList="AmericaCityList"></DstList>
      </div>
      <IndexNav></IndexNav>
    </div>
    <!-- ad1 -->
    <div class="ad-section">
      <div class="part1">
        <div class="part1-1">
          <div class="part-1-1-1">
            <img src="../assets/img/ad1-1.jpg" alt="">
          </div>
          <div class="part-1-1-2">
            <img src="../assets/img/ad1-2.jpg" alt="">
          </div>
        </div>
        <div class="part1-2">
          <div class="part-1-2-1">
            <img src="../assets/img/ad1-4.jpg" alt="">
          </div>
          <div class="part-1-2-2">
            <img src="../assets/img/ad1-5.jpg" alt="">
          </div>
          <div class="part-1-2-3">
            <img src="../assets/img/ad1-6.jpg" alt="">
          </div>
        </div>
      </div>
      <div class="part2">
        <img src="../assets/img/ad1-3.jpg" alt="">
      </div>
    </div>
    <!-- warelist -->
    <div class="warelist-wrap">
      <!-- 本地拍 -->
      <ShowHeader :showData="showHeader.localPhoto"></ShowHeader>
      <ShowRows :span="3" :gutter="10" :showData="wareList"></ShowRows>
      <!-- 亚洲拍 -->
      <ShowHeader :showData="showHeader.asiaPhoto"></ShowHeader>
      <ShowRows :span="3" :gutter="10" :showData="wareList"></ShowRows>
    </div>
    <!-- map -->
    <div>
      <img src="../assets/img/map.jpg" class="responsive-img">
    </div>
    <!-- show -->
    <div class="show-wrap"> 
      <ShowHeader :showData="showHeader.photoShow"></ShowHeader>
      <ShowRows :span="2" :gutter="10" :showData="custom.customList"></ShowRows>
    </div>
    <!-- ad2 -->
    <div>
      <img src="../assets/img/ad.jpg" class="responsive-img">
    </div>
    <!-- 12项高端定制旅游 -->
    <div class="container"> 
      <IndexTitle :title="'12项高端定制旅游'" :EnTitle="'global travel destinations'"></IndexTitle>
      <div class="content">
        <ul class="travel-list clearfix">
          <li class="icon" v-for="index in 12"></li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
  import { findStoreByPcDoMain, findmerchantStoreBystoreId, bannerList, dstCityByContinent, 
    wareList, recommendWare, warelistByContinent } from '@/api'
  import HeaderBar from '@/components/HeaderNew'
  import Searchbar from '@/components/searchbar'
  import IndexTitle from './index/components/indexTitle'
  import IndexNav from './index/components/indexNav'
  import ShowHeader from './index/components/showHeader'
  import ShowRows from './index/components/showRows'
  import DstList from '@/components/destinationList.vue'
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
        localCityList: [],
        AsiaCityList: [],
        EuropeCityList: [],
        AustraliaCityList: [],
        AmericaCityList: [],
        bannerList: [],
        dstCityList: [],
        dstCityCode: '',
        localDstCity: [],
        abroadDstCity: [],
        recommendList: [],
        wareList: [],
        film: {
          msg: '本地拍',
          filmList: [
            {
              img: '/static/img/local-film.jpg',
              title: '泰国普吉岛6天4晚私人订制行程（纯旅游）泰国普吉岛6天4晚私人订制行程（纯旅游）泰国普吉岛6天4晚私人订制行程（纯旅游）泰国普吉岛6天4晚私人订制行程（纯旅游）'
            },
            {
              img: '/static/img/local-film.jpg',
              title: '泰国普吉岛6天4晚私人订制行程（纯旅游）'
            },
            {
              img: '/static/img/local-film.jpg',
              title: '泰国普吉岛6天4晚私人订制行程（纯旅游）'
            },
            {
              img: '/static/img/local-film.jpg',
              title: '泰国普吉岛6天4晚私人订制行程（纯旅游）'
            },
            {
              img: '/static/img/local-film.jpg',
              title: '泰国普吉岛6天4晚私人订制行程（纯旅游）'
            },
            {
              img: '/static/img/local-film.jpg',
              title: '泰国普吉岛6天4晚私人订制行程（纯旅游）'
            }
          ],
        },
        custom:{
            msg: '客片展示',
            customList: [
              {
                img: '/static/img/kepianshow.jpg',
                title: '泰国普吉岛6天4晚私人订制行程（纯旅游）',
                pTitle: '三亚SANYA'
              },
              {
                img: '/static/img/kepianshow.jpg',
                title: '泰国普吉岛6天4晚私人订制行程（纯旅游）',
                pTitle: '三亚SANYA'
              },
              {
                img: '/static/img/kepianshow.jpg',
                title: '泰国普吉岛6天4晚私人订制行程（纯旅游）',
                pTitle: '三亚SANYA'
              },
              {
                img: '/static/img/kepianshow.jpg',
                title: '泰国普吉岛6天4晚私人订制行程（纯旅游）',
                pTitle: '三亚SANYA'
              },
              {
                img: '/static/img/kepianshow.jpg',
                title: '泰国普吉岛6天4晚私人订制行程（纯旅游）',
                pTitle: '三亚SANYA'
              },
              {
                img: '/static/img/kepianshow.jpg',
                title: '泰国普吉岛6天4晚私人订制行程（纯旅游）',
                pTitle: '三亚SANYA'
              }
            ]
        },
        showHeader: {
          localPhoto: {
            title: '本地拍',
            moreUrl: '/local',
            headerBg: '/static/image/Localfilm.png'
          },
          asiaPhoto: {
            title: '亚洲拍',
            moreUrl: '/Asiaphoto',
            headerBg: '/static/image/Asiashooting.png',
          },
          photoShow: {
            title: '客片展示',
            moreUrl: '/show',
            headerBg: '/static/image/Samplesshow.png',
          }
        }
      }
    },
    methods: {
      getStore() {
        findStoreByPcDoMain().then(res => {
          if(res.data.status === 1) {
            this.providerId = '29';
            sessionStorage.setItem('providerId', this.providerId)
            this.getMerchantStoreInfo()
            this.getBannerList()
            this.getDstCityList()
            this.getLocalCityList()
            this.getAsiaCityList()
            this.getEuropeCityList()
            this.getAustraliaCityList()
            this.getAmericaCityList()
            // this.kindCode = 'trip-T';
            this.getWareList()
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
      getLocalCityList() {
        let params = {
          storeId: this.providerId,
          continent: '100-101',
        }
        dstCityByContinent(params).then(res => {
          if(res.data.status === 1) {
            this.localCityList = res.data.data;
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
          if(res.data.status === 1) {
            this.AsiaCityList = res.data.data;
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
            this.EuropeCityList = res.data.data;
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
            this.AustraliaCityList = res.data.data;
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
            this.AmericaCityList = res.data.data;
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
            this.wareList = res.data.data;
            console.log(this.wareList)
          }
        })
      },
    },
    computed: {
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
  .dst-wrap {
    margin: 30px 0;
  }
  .destination-wrap {
    margin-top: 80px;
  }
  .ad-section {
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
  .warelist-wrap {
    margin: 50px;
  }
  .show-wrap {
    margin: 50px;
  }
  .travel-list {
    background: #666;
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
</style>
