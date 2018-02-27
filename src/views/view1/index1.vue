<template>
  <section>
    <!-- header -->
    <div class="header-wrap">
        <el-carousel height="800px">
          <el-carousel-item v-for="item in bannerList" :key="item.id">
            <!-- <img :src="item.urlAddr" alt=""> -->
            <router-link to="/" :style="{background: 'url('+item.urlAddr+') center center no-repeat'}">
            </router-link>
          </el-carousel-item>
        </el-carousel>
    </div>
    <!-- destination -->
    <div class="destination-wrap container">
      <!-- <Searchbar class="header-search" :recommendList="recommendCities"></Searchbar> -->
      <!-- <IndexTitle :title="'全球100+目的地'" :EnTitle="'global destinations'"></IndexTitle> -->
      <ItemHeader :name="'全球100+目的地'" :enName="'global destinations'"></ItemHeader>
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
    </div>
    <!-- ad1 -->
    <!-- <div class="ad-box">
      <div class="part1">
        <div class="part1-1">
          <div class="part-1-1-1">
            <img src="/static/image/ad1-1.jpg" alt="">
          </div>
          <div class="part-1-1-2">
            <img src="/static/image/ad1-2.jpg" alt="">
          </div>
        </div>
        <div class="part1-2">
          <div class="part-1-2-1">
            <img src="/static/image/ad1-4.jpg" alt="">
          </div>
          <div class="part-1-2-2">
            <img src="/static/image/ad1-5.jpg" alt="">
          </div>
          <div class="part-1-2-3">
            <img src="/static/image/ad1-6.jpg" alt="">
          </div>
        </div>
      </div>
      <div class="part2">
        <img src="/static/image/ad1-3.jpg" alt="">
      </div>
    </div> -->
    <IndexNav></IndexNav>
    <!-- warelist -->
    <div class="container-fluid">
      <!-- 本地拍 -->
      <!-- <ShowHeader :showData="showHeader.localPhoto"></ShowHeader> -->
      <ItemHeader :name="'本地拍'" :enName="'local Photo'" :moreUrl="'/'" v-if="LocalWareList.length > 0"></ItemHeader>
      <ShowRows :span="3" :gutter="20" :showData="LocalWareList" :mapping="wareMapping" v-if="LocalWareList.length > 0"></ShowRows>
      <!-- 特别推荐 -->
      <!-- <ShowHeader :showData="showHeader.recommendPhoto"></ShowHeader> -->
      <ItemHeader :name="'特别推荐(旅游+摄影)'" :enName="'recommend(tourism + photography)'" :moreUrl="'/ware/list?type=TourismPhoto'"></ItemHeader>
      <ShowRows :span="4" :gutter="10" :showData="recommendList" :mapping="wareMapping"></ShowRows>
      
       <!-- 亚洲拍 -->
      <!-- <ShowHeader :showData="showHeader.asiaPhoto"></ShowHeader>
      <ShowRows :span="3" :gutter="20" :showData="AsiaWareList" :mapping="wareMapping"></ShowRows> -->
      <!-- 全国拍 -->
      <!-- <ShowHeader :showData="showHeader.nativePhoto"></ShowHeader> -->
      <ItemHeader :name="'全国拍'" :enName="'domestic photo'" :moreUrl="'/ware/list?type=DomesticPhoto'"></ItemHeader>
      <ShowRows :span="4" :gutter="10" :showData="NationalWareList" :mapping="wareMapping"></ShowRows>
      <!-- 全球拍 -->
      <!-- <ShowHeader :showData="showHeader.globalPhoto"></ShowHeader> -->
      <ItemHeader :name="'全球拍'" :enName="'global photo'" :moreUrl="'/ware/list?type=AbroadPhoto'"></ItemHeader>
      <ShowRows :span="4" :gutter="10" :showData="GlobalWareList" :mapping="wareMapping"></ShowRows>
    </div>
    <!-- map -->
    <div style="margin-top: -60px;">
      <img src="/static/image/map1.jpg" class="responsive-img">
    </div>
    <!-- show -->
    <div class="container-fluid"> 
      <!-- <ShowHeader :showData="showHeader.photoShow"></ShowHeader> -->
      <ItemHeader :name="'客片展示'" :enName="'photo show'" :moreUrl="'/show'"></ItemHeader>
      <ShowRows :span="4" :gutter="10" :showData="showList" :mapping="showMapping"></ShowRows>
    </div>
    <!-- ad2 -->
    <div style="margin-top: -50px;">
      <img src="/static/image/ad02.jpg" class="responsive-img">
    </div>
    <!-- 12项高端定制旅游 -->
    <div class="travel-wrap">
      <!-- <div class="container">  -->
        <ItemHeader :name="'12项高端定制'" :enName="'12 high-end customizing'"></ItemHeader>
      <!-- </div> -->
      <div class="content">
        <img src="/static/image/icon12_02.jpg" alt="">
      </div>
    </div>
  </section>
</template>

<script>
  import axios from 'axios'
  import { ShowList } from '@/data'
  import { findStoreByPcDoMain, findmerchantStoreBystoreId, bannerList, dstCityByContinent, 
    wareList, recommendWare, warelistByContinent, localList } from '@/api'
  import Searchbar from './components/index1/searchBar'
  import DstList from './components/index/dstList.vue'
  import IndexTitle from './components/index/indexTitle'
  import ItemHeader from './components/index1/itemHeader'
  import IndexNav from './components/index1/indexNav'
  import ShowHeader from './components/index/showHeader'
  import ShowRows from './components/index1/showRows'
  export default {
    name: "index",
    components: {
      Searchbar,
      ItemHeader,
      IndexTitle,
      IndexNav,
      ShowHeader,
      ShowRows,
      DstList,
    },
    data() {
      return {
        storeId: '',
        storeLogo: '',
        kindCode: '',
        bannerList: [],
        dstCityList: [],
        dstCityCode: '',
        localDstCity: [],
        abroadDstCity: [],
        recommendList: [],
        wareList: [],
        showList: [],
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
          name: 'name',
          imgUrl: 'imgUrl',
        },
        showHeader: {
          recommendPhoto: {
            title: '特别推荐(旅游+拍摄)',
            moreUrl: '/ware/list?type=TourismPhoto',
            headerBg: '/static/image/Journeytake.png'
          },
          localPhoto: {
            title: '本地拍',
            moreUrl: '/ware/list?type=LocalPhoto',
            headerBg: '/static/image/Localfilm.png'
          },
          nativePhoto: {
            title: '全国拍',
            moreUrl: '/ware/list?type=DomesticPhoto',
            headerBg: '/static/image/Thenational.png',
          },
          // asiaPhoto: {
          //   title: '亚洲拍',
          //   moreUrl: '/ware/list?type=TourismPhoto',
          //   headerBg: '/static/image/Asiashooting.png',
          // },
          globalPhoto: {
            title: '全球拍',
            moreUrl: '/ware/list?type=AbroadPhoto',
            headerBg: '/static/image/Globalfilm.png',
          },
          photoShow: {
            title: '客片展示',
            moreUrl: '/show',
            headerBg: '/static/image/Samplesshow.png',
          }
        },
        LocalWareList: [],
        NationalWareList: [],
        AsiaWareList: [],
        GlobalWareList: [],
        recommendCities: [],
      }
    },
    methods: {
      handleCityClick(city) {
        let { href } = this.$router.resolve('/ware/list?searchName='+city.name);
        window.open(href, '_blank')
      },
      getStore() {
        findStoreByPcDoMain().then(res => {
          if(res.data.status === 1) {
            this.storeId = res.data.data;
            window.location.reload()
          } else {
            this.$message.error(res.data.msg)
          }
        })
      },
      getBannerList() {
        this.loading = true;
        let data = {
          merchantId: this.storeId
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
          storeId: this.storeId,
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
        let url = `/portal/api/waretripinfo/findSrcAndDstListByWareKind/${this.storeId}?wareKindId=415057355555522`;
        axios.get(url).then(res => {
          if(res.data.status === 1) {
            this.globalDst['Hot'].cityList = res.data.data.dstCities;
            this.recommendCities = res.data.data.dstCities.filter((item, index) => index >=0 && index < 5);
          } else {
            this.$message.error(res.data.message)
          }
        })
      },
      getLocalCityList() {
        let params = {
          storeId: this.storeId,
          continent: '100-101-000086',
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
          storeId: this.storeId,
          continent: '100',
          exclude: '100-101-000086',
        }
        dstCityByContinent(params).then(res => {
          // console.log(res)
          if(res.data.status === 1) {
            this.globalDst['Asia'].cityList = res.data.data;
          } else {
            this.$message.error(res.data.msg)
          }
        })
      },
      getEuropeCityList() {
        let params = {
          storeId: this.storeId,
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
          storeId: this.storeId,
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
          storeId: this.storeId,
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
          dstCityCode: '',
          providerId: this.storeId,
        }
        recommendWare(data).then(res => {
          if(res.data.status === 1) {
            this.recommendList = res.data.data.filter((w, index) => index >= 0 && index < 6);
          } else {
            this.$message.error(res.data.msg)
          }
        })
      },
      getLocalWareList() {
        let data = {
          storeId: this.storeId,
        }
        localList(data).then(res => {
          if(res.data.status === 1){
            this.LocalWareList = res.data.data.filter((w, index) => index >= 0 && index < 9);
          } else {
            this.$message.error(res.data.msg)
          }
        })
      },
      getNationalWareList() {
        let data = {
          storeId: this.storeId,
          continent: '100-101-000086',
        }
        warelistByContinent(data).then(res => {
          if(res.data.status === 1){
            this.NationalWareList = res.data.data.filter((w, index) => index >= 0 && index < 9);
          }
        })
      },
      getAsiaWareList() {
        let data = {
          storeId: this.storeId,
          continent: '100-101',
          exclude: '100-101-000086',
        }
        warelistByContinent(data).then(res => {
          if(res.data.status === 1){
            this.AsiaWareList = res.data.data.filter((w, index) => index >= 0 && index < 9);
          }
        })
      },
      getGlobalWareList() {
        let data = {
          storeId: this.storeId,
          continent: '',
          exclude: '100',
        }
        warelistByContinent(data).then(res => {
          if(res.data.status === 1){
            this.GlobalWareList = res.data.data.filter((w, index) => index >= 0 && index < 9);
          }
        })
      },
    },
    mounted() {
      this.showList = ShowList;
      let store = JSON.parse(sessionStorage.getItem('store'));
      document.title = store && store.storeName || '首页';
      this.storeId = sessionStorage.getItem('storeId');
      if(this.storeId) {
        this.getBannerList()
        this.getDstCityList()
        this.getHotCityList()
        this.getLocalCityList()
        this.getAsiaCityList()
        this.getEuropeCityList()
        this.getAustraliaCityList()
        this.getAmericaCityList()
        this.getLocalWareList()
        this.getNationalWareList()
        this.getAsiaWareList()
        this.getGlobalWareList()
      } else {
        this.getStore()
      }
    }
  }
</script>

<style lang="scss" scoped>
  $color: #19A9E8;
  .header-wrap {
    position: relative;
    // top: -90px;
  }
  .header-search {
    width: 700px;
    margin: auto;
  }
  .el-carousel {
    a {
      display: block;
      width: 100%;
      height: 100%;
    }
    img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }
  .container-fluid {
    margin: 50px 10px;
  }
  .destination-wrap {
    position: relative;
    // top: -90px;
    .index-title {
      margin: 50px 0 30px;
    }
  }
  .global-dst {
    margin: 50px 100px;
  }
  .ad-box {
    display: flex;
    width: 100%;
    margin: 0 0 90px;
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
    padding: 60px 0;
    background: #fff;
    .content {
      margin: 50px 0;
      img {
        width: 100%;
      }
    }
  }
</style>
