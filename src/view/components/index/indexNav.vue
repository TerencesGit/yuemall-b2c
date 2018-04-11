<template>
	 <div class="dst-nav-wrap">
    <ul class="dst-nav">
      <li class="nav-item" v-for="(item, index) in dstNav" :key="index">
        <router-link :to="item.url" target="_blank">
          <img :src="item.imgSrc" alt="">
          <div class="panel">
            <div class="panel-icon">
              <img :src="item.icon" alt="">
            </div>
            <div class="panel-text">
              <h4>{{item.name}}</h4>
              <h5>{{item.englishName}}</h5>
              <p class="line"></p>
            </div>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
	export default {
		data() {
			return {
				dstNav: [
          { 
            name: '本地拍',
            englishName: 'Local Photo',
            imgSrc: '/static/image/bg-1.png',
            icon: '/static/image/icon-1.png',
            url: '/ware/list?type=LocalPhoto',
          },
          {
            name: '特别推荐',
            englishName: 'Recommend',
            imgSrc: '/static/image/bg-2.png',
            icon: '/static/image/icon-2.png',
            url: '/ware/list?type=TourismPhoto',
          },
          {
            name: '全国拍',
            englishName: 'domestic photo',
            imgSrc: '/static/image/bg-3.png',
            icon: '/static/image/icon-3.png',
            url: '/ware/list?type=DomesticPhoto',
          },
          {
            name: '全球拍',
            englishName: 'abroad photo',
            imgSrc: '/static/image/bg-4.png',
            icon: '/static/image/icon-4.png',
            url: '/ware/list?type=AbroadPhoto',
          },
          {
            name: '蜜月旅游',
            englishName: 'Tourism',
            imgSrc: '/static/image/bg-5.png',
            icon: '/static/image/icon-5.png',
            url: '/ware/list?type=Tourism',
          },
          {
            name: '客片展示',
            englishName: 'photo show',
            imgSrc: '/static/image/bg-6.png',
            icon: '/static/image/icon-6.png',
            url: '/show',
          },
        ]
			}
		}
	}
</script>
<style scoped lang="scss">
	.dst-nav {
    display: flex;
    .nav-item {
      position: relative;
      margin-right: 12px;
      cursor: pointer;
      overflow: hidden;
      transition: all .3s;
      &:hover {
        img {
          transform: scale(1.2);
        }
        .panel {
          background: rgba(0,0,0,.1);
        }
      }
      &:last-child {
        margin-right: 0;
      }
      img {
        width: 100%;
        height: 100%;
        transition: all .3s;
      }
      .panel {
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,.5);
        transition: all .3s;
        .panel-icon {
          width: 50px;
          margin: 30% auto;
        }
        .panel-text {
          position: absolute;
          bottom: 20px;
          width: 100%;
          color: #fff;
          text-align: center;
          h4 {
            font-weight: normal;
            margin: 10px 0;
            font-size: 18px;
          }
          h5 {
            margin: 0;
            font-size: 12px;
            font-weight: normal;
            text-transform: uppercase;
          }
          .line {
            display: inline-block;
            width: 40px;
            height: 2px;
            background: #fff;
          }
        }
      }
    }
  }
</style>