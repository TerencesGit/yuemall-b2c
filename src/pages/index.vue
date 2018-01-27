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
    <div class="destination-wrap container">
      <div class="section-title">
        <h2>全球100+旅拍目的地</h2>
        <h4 class="uppercase">global travel destinations</h4>
        <p class="line"></p>
      </div>
      <div class="dst-wrap">
        <dstlist :title="'热门：'" :dstList="localCityList"></dstlist>
        <dstlist :title="'国内：'" :dstList="localCityList"></dstlist>
        <dstlist :title="'亚洲：'" :dstList="AsiaCityList"></dstlist>
        <dstlist :title="'欧洲：'" :dstList="EuropeCityList"></dstlist>
        <dstlist :title="'大洋洲：'" :dstList="AustraliaCityList"></dstlist>
        <dstlist v-show="AmericaCityList.length" :title="'北美：'" :dstList="AmericaCityList"></dstlist>
      </div>
      <destinationfilm></destinationfilm>
    </div>
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
    <div class="warelist-wrap">
        <!-- 本地拍 -->
        <navheader :ishave="true" :header-title="film.msg"></navheader>
        <filmlist :isthird="true" :film-list="film.filmList"></filmlist>

        <!-- 亚洲拍 -->
        <navheader :ishave="true" :header-title="film.msg"></navheader>
        <filmlist :isthird="true" :film-list="film.filmList"></filmlist>

        <div>
          <img src="../assets/img/map.jpg" class="responsive-img">
        </div>
    </div>
        <!-- 客片展示 -->
        <navheader :ishave="true" :header-title="custom.msg"></navheader>
        <filmlist :isthird="false" :film-list="custom.customList"></filmlist>
        <div>
          <img src="../assets/img/ad.jpg" class="responsive-img">
        </div>
        <!-- 12项高端定制旅游 -->
        <div class="main-customization-travel w">
          <div class="travel-header">
            <p>12项高端定制旅游</p>
            <p>GLOBAL TRAWEL DESTINATIONS</p>
            <div class="header-box"></div>
          </div>
          <div class="travel-body">
            <ul>
              <li>
                <img src="../assets/img/icon.jpg" alt="">
                <p>售前售后</p>
                <p>24小时管家式服务</p>
              </li>
              <li>
                <img src="../assets/img/icon.jpg" alt="">
                <p>售前售后</p>
                <p>24小时管家式服务</p>
              </li>
              <li>
                <img src="../assets/img/icon.jpg" alt="">
                <p>售前售后</p>
                <p>24小时管家式服务</p>
              </li>
              <li>
                <img src="../assets/img/icon.jpg" alt="">
                <p>售前售后</p>
                <p>24小时管家式服务</p>
              </li>
              <li>
                <img src="../assets/img/icon.jpg" alt="">
                <p>售前售后</p>
                <p>24小时管家式服务</p>
              </li>
              <li>
                <img src="../assets/img/icon.jpg" alt="">
                <p>售前售后</p>
                <p>24小时管家式服务</p>
              </li>
              <li>
                <img src="../assets/img/icon.jpg" alt="">
                <p>售前售后</p>
                <p>24小时管家式服务</p>
              </li>
              <li>
                <img src="../assets/img/icon.jpg" alt="">
                <p>售前售后</p>
                <p>24小时管家式服务</p>
              </li>
              <li>
                <img src="../assets/img/icon.jpg" alt="">
                <p>售前售后</p>
                <p>24小时管家式服务</p>
              </li>
              <li>
                <img src="../assets/img/icon.jpg" alt="">
                <p>售前售后</p>
                <p>24小时管家式服务</p>
              </li>
              <li>
                <img src="../assets/img/icon.jpg" alt="">
                <p>售前售后</p>
                <p>24小时管家式服务</p>
              </li>
              <li>
                <img src="../assets/img/icon.jpg" alt="">
                <p>售前售后</p>
                <p>24小时管家式服务</p>
              </li>
            </ul>
          </div>
        </div>
  </section>
</template>

<script>
  import { findStoreByPcDoMain, findmerchantStoreBystoreId, bannerList, dstCityByContinent, 
    wareList,  recommendWare, warelistByContinent } from '@/api'
  import HeaderBar from '@/components/HeaderNew'
  import Searchbar from '@/components/searchbar'
  import destination from '@/components/destination.vue'
  import filmshow from '@/components/filmShow.vue'
  import desheader from '@/components/desHeader.vue'
  import navheader from '@/components/navheader.vue'
  import dstlist from '@/components/destinationList.vue'
  import destinationfilm from '@/components/destinationfilm.vue'
  import filmlist from '@/components/filmList.vue'
  export default {
    name: "index",
    components: {
      HeaderBar,
      Searchbar,
      destination,
      filmshow,
      navheader,
      dstlist,
      destinationfilm,
      filmlist,
      desheader,
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
        desHeader: {
          headerTitle: '全球100+旅拍目的地',
          headerPtitle: 'GLOBAL TRAWEL DESTINATIONS'
        },
      }
    },
    methods: {
      getStore() {
        findStoreByPcDoMain().then(res => {
          if(res.data.status === 1) {
            this.providerId = res.data.data;
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
            // this.getWareList()
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
            console.log(this.dstCityList)
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
          kindCode: this.kindCode,
          providerId: this.providerId,
        }
        wareList(data).then(res => {
          if(res.data.status === 1){
            this.wareList = res.data.data;
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
  .destination-wrap {
    margin-top: 80px;
  }
  .section-title {
    position: relative;
    text-align: center;
    color: $color;
    border-bottom: 1px solid #f0f0f0;
    h2 {
      margin-top: 30px;
      font-size: 32px;
      font-weight: normal;
    }
    h4 {
      margin: 15px 0;
      font-size: 12px;
      font-weight: normal;
    }
    .line {
      position: absolute;
      bottom: -2px;
      left: 50%;
      margin-left: -40px;
      width: 80px;
      height: 4px;
      background-color: $color;
    }
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
  .w{
     width: 1260px;
     margin: 0 auto;
  }
  .active{
    color: $color;
  }
  // 广告开始
  .main-ad{
    width: 100%;
    height: 688px;
    position: relative;
    margin: 0 auto;
    box-sizing: border-box;
    background-color: pink;
    .ad-body{
      .ad-body-left{
        width: 1570px;
        ul{
          li{
            float: left;
          }
        }
        .ad1-1{
          width: 860px;
          height: 365px;
          background-color: red;
        }
        .ad1-2{
          width: 708px;
          height: 365px;
          background-color: yellow;
        }
        .ad1-3{
           width: 355px;
          height: 320px;
          background-color: yellowgreen;
        }
        .ad1-4{
           width: 502px;
          height: 320px;
          background-color: black;
        }
        .ad1-5{
           width: 708px;
          height: 320px;
          background-color: blue;
        }
      }
      .ad-body-right{
        position: absolute;
        top: 0;
        right: 0;
        .ad1-6{
          width: 353px;
          height: 688px;
          background-color: green;
        }
      }
    }
  }
  // 地图
  .main-map{
    position: relative;
    width: 1920px;
    margin: 0 auto;
  }
  // 广告2
  .main-ad2{
    position: relative;
    margin: 0 auto;
    width: 100%;
    height: 100%;
    .ad2-img{
      img{
        width: 100%;
        height: 100%;
      }
    }
  }
  // 12项高端定制
  .main-customization-travel{
    margin-top: 125px;
    border-bottom: 1px solid #eee;
      .travel-header{
        border-bottom: 1px solid #eee; 
        p{
            text-align: center;
            font-size: 35px;
            font-weight: bold;
            color: $color;
            letter-spacing: 3px;
          }
          p:nth-child(2){
            font-size: 12px;
            font-weight: normal;
            letter-spacing: 1px;
          }
          .header-box{
            width: 70px;
            height: 5px;
            background-color: $color;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
          }
      }
      .travel-body{
        position: relative;
        margin-top: 70px;
        padding: 0 150px;
        // display: flex;
        // justify-content: space-around;
        ul{
          li{
            width: 15%;
            display: inline-block;
            // width: 100%;
            // height: 100%;
            border: 2px solid #666;
            margin-top: 10px;
            padding: 10px 0;
            img{
              display: block;
              width: 100px;
              position: relative;
              margin: 0 auto;
            }
            p{
              font-size: 12px;
              text-align: center;
              color: #666;
              font-weight: bold;
            }
          }
        }
      }
  }
</style>
