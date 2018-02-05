<template>
	 <div class="dst-nav-wrap">
    <ul class="dst-nav">
      <li class="nav-item" v-for="(item, index) in dstNav" :key="index">
        <router-link :to="item.url">
          <img :src="item.imgSrc" alt="">
          <div class="panel">
            <div class="panel-icon">
              <img :src="item.icon" alt="">
            </div>
            <div class="panel-text">
              <h4>{{item.title}}</h4>
              <h5>{{item.enTitle}}</h5>
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
            title: '特别推荐',
            enTitle: 'Recommend',
            imgSrc: '/static/image/bg-1.png',
            icon: '/static/image/icon-1.png',
            url: '/',
          },
          {
            title: '本地拍',
            enTitle: 'local photo',
            imgSrc: '/static/image/bg-2.png',
            icon: '/static/image/icon-2.png',
            url: '/ware/list?wareKind=415057355555522',
          },
          {
            title: '全国拍',
            enTitle: 'native photo',
            imgSrc: '/static/image/bg-3.png',
            icon: '/static/image/icon-3.png',
            url: '/ware/list?wareKind=415057355808314',
          },
          {
            title: '亚洲拍',
            enTitle: 'Asia photo',
            imgSrc: '/static/image/bg-4.png',
            icon: '/static/image/icon-4.png',
            url: '/ware/list?wareKind=715060598102532',
          },
          {
            title: '全球拍',
            enTitle: 'global photo',
            imgSrc: '/static/image/bg-5.png',
            icon: '/static/image/icon-5.png',
            url: '/ware/list?wareKind=715060598613714',
          },
          {
            title: '客片展示',
            enTitle: 'photo show',
            imgSrc: '/static/image/bg-6.png',
            icon: '/static/image/icon-6.png',
            url: '/',
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
      transition: all .3s;
      &:hover {
        .panel {
          display: block;
        }
      }
      &:last-child {
        margin-right: 0;
      }
      img {
        width: 100%;
        height: 100%;
      }
      .panel {
        display: none;
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,.5);
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
            margin: 10px 0;
            font-size: 18px;
          }
          h5 {
            margin: 0;
            font-size: 12px;
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