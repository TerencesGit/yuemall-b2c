<template>
  <div>
    <!-- 头部 -->
      <header>
        <!-- 轮播图 -->
        <div class="swiper">
          <div class="block">
          <el-carousel height="880px">
            <el-carousel-item>
              <img src="http://fileserver.yueshijue.com/fileService/uploads/2017/12/28/15144285476756.jpg" alt=""> 
            </el-carousel-item>
            <el-carousel-item>
              <img src="http://fileserver.yueshijue.com/fileService/uploads/2017/12/28/15144282241981.jpg" alt=""> 
            </el-carousel-item>
            <el-carousel-item>
              <img src="http://fileserver.yueshijue.com/fileService/uploads/2017/12/28/15144284369625.jpg" alt=""> 
            </el-carousel-item>
          </el-carousel>
        </div>
        </div>
        <!-- 导航栏 -->
        <div class="navbar w">
          <div class="logo">
            <span>YOU</span><span>LOGO</span>
            </div>
            <div class="navbarList">
              <ul>
                <li>
                    <a href="#" class="active"><span>首页</span></a>
                </li>
                <li>
                    <a href="#"><span>特别推荐</span></a>
                </li>
                <li>
                    <a href="#"><span>本地拍</span></a>
                </li>
                <li>
                    <a href="#"><span>全国拍</span></a>
                </li>
                <li>
                    <a href="#"><span>亚洲拍</span></a>
                </li>
                <li>
                    <a href="#"><span>全球拍</span></a>
                </li>
                <li>
                    <a href="#"><span>客片展示</span></a>
                </li>
                <li>
                  <a href="#">
                    <span>
                      <a href="#">
                        登录
                      </a>
                      <a href="#">
                        注册
                      </a>
                    </span>
                  </a>
                  
                </li>
              </ul>
          </div>
          <!-- 搜索框 -->
        <div class="search">
          <p>
            目的地：三亚 海南 深圳 云南 澳洲 美国 法国 迪拜
          </p>
          <input type="text" name="" id="" placeholder="搜索你想要的目的地/行程......">
          <button>搜索</button>
        </div>
        </div>
        
      </header>

      <!-- 旅拍目的地 -->
      <nav>
        <div class="destination w">
          <div class="des-header">
            <p>全球100+旅拍目的地</p>
            <p>GLOBAL TRAVEL DESTINATIONS</p>
            <div class="header-box"></div>
          </div>
          <div class="des-body">
            <ul>
              <li>
                <span>热门：</span>
                <ul class="des-list">
                  <li>
                    <a href="#">三亚</a>
                    <a href="#">厦门</a>
                    <a href="#">丽江</a>
                    <a href="#">大理</a>
                    <a href="#">巴厘岛</a>
                    <a href="#">马尔代夫</a>
                    <a href="#">巴黎</a>
                    <a href="#">罗马</a>
                    <a href="#">皇后镇</a>
                    <a href="#">悉尼</a>
                  </li>
                </ul>
              </li>
              <li>
                <span>国内：</span>
                <ul class="des-list">
                  <li>
                    <a href="#">北京</a>
                    <a href="#">三亚</a>
                    <a href="#">厦门</a>
                    <a href="#">丽江</a>
                    <a href="#">大理</a>
                    <a href="#">大连</a>
                    <a href="#">上海</a>
                    <a href="#">青岛</a>
                    <a href="#">深圳</a>
                    <a href="#">呼和浩特</a>
                    <a href="#">厦门</a>
                    <a href="#">高雄</a>
                    <a href="#">垦丁</a>
                  </li>
                </ul>
              </li>
              <li>
                <span>欧洲：</span>
                <ul class="des-list">
                  <li>
                    <a href="#">巴黎</a>
                    <a href="#">普罗旺斯</a>
                    <a href="#">罗马</a>
                    <a href="#">米兰</a>
                    <a href="#">威尼斯</a>
                    <a href="#">佛罗伦萨</a>
                    <a href="#">布拉格</a>
                    <a href="#">巴塞罗那</a>
                    <a href="#">马德里</a>
                    <a href="#">布鲁塞尔</a>
                    <a href="#">维也纳</a>
                    <a href="#">阿姆斯特丹</a>
                    <a href="#">布达佩斯</a>
                    <a href="#">苏黎世</a>
                  </li>
                </ul>
              </li>
              <li>
                <span>亚洲：</span>
                <ul class="des-list">
                  <li>
                    <a href="#">普吉岛</a>
                    <a href="#">苏海岛</a>
                    <a href="#">巴厘岛</a>
                    <a href="#">济州岛</a>
                    <a href="#">马尔代夫</a>
                    <a href="#">奈良</a>
                    <a href="#">东京</a>
                    <a href="#">冲绳</a>
                    <a href="#">吉隆坡</a>
                    <a href="#">兰卡威</a>
                    <a href="#">维也纳</a>
                    <a href="#">阿姆斯特丹</a>
                    <a href="#">布达佩斯</a>
                    <a href="#">苏黎世</a>
                  </li>
                </ul>
              </li>
              <li>
                <span>大洋洲：</span>
                <ul class="des-list">
                  <li>
                    <a href="#">奥克兰</a>
                    <a href="#">皇后镇</a>
                    <a href="#">基督城</a>
                    <a href="#">墨尔本</a>
                    <a href="#">悉尼</a>
                  </li>
                </ul>
              </li>
              <li>
                <span>美洲：</span>
                <ul class="des-list">
                  <li>
                    <a href="#">洛杉矶</a>
                    <a href="#">皇后镇</a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <div class="des-footer">
            <ul>
              <li>
                <a href="#">
                  <p>特别推荐</p>
                  <p>GLOBAL TRAWEL DESTINATIONS</p>
                  <div class="des-box"></div>
                </a>
              </li>
              <li>
                <a href="#">
                  <p>特别推荐</p>
                  <p>GLOBAL TRAWEL DESTINATIONS</p>
                  <div class="des-box"></div>
                </a>
              </li>
              <li>
                <a href="#">
                  <p>特别推荐</p>
                  <p>GLOBAL TRAWEL DESTINATIONS</p>
                  <div class="des-box"></div>
                </a>
              </li>
              <li>
                <a href="#">
                  <p>特别推荐</p>
                  <p>GLOBAL TRAWEL DESTINATIONS</p>
                  <div class="des-box"></div>
                </a>
              </li>
              <li>
                <a href="#">
                  <p>特别推荐</p>
                  <p>GLOBAL TRAWEL DESTINATIONS</p>
                  <div class="des-box"></div>
                </a>
              </li>
              <li>
                <a href="#">
                  <p>特别推荐</p>
                  <p>GLOBAL TRAWEL DESTINATIONS</p>
                  <div class="des-box"></div>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <!-- <main>
        <div class="main-ad">
          <div class="ad-body">
            <div class="ad-body-left">
              <ul>
                <li><div class="ad1-1"></div></li>
                <li><div class="ad1-2"></div></li>
                <li><div class="ad1-3"></div></li>
                <li><div class="ad1-4"></div></li>
                <li><div class="ad1-5"></div></li>
              </ul>
            </div>
            <div class="ad-body-right">
              <div class="ad1-6"></div>              
            </div>
          </div>
        </div>

        <div class="mian-loacl-film">
          <div class="local-film-header">
            <p>本地拍</p>
            <a href="#">查看更多>></a>
            <div class="header-box"></div>
          </div>
          <div class="local-film-body">
            <ul>
              <li>
                <img src="../assets/img/local-film.jpg" alt="">
                <p>泰国普吉岛6天4晚私人订制行程（纯旅游）</p>
              </li>
              <li>
                <img src="../assets/img/local-film.jpg" alt="">
                <p>泰国普吉岛6天4晚私人订制行程（纯旅游）</p>
              </li>
              <li>
                <img src="../assets/img/local-film.jpg" alt="">
                <p>泰国普吉岛6天4晚私人订制行程（纯旅游）</p>
              </li>
              <li>
                <img src="../assets/img/local-film.jpg" alt="">
                <p>泰国普吉岛6天4晚私人订制行程（纯旅游）</p>
              </li>
              <li>
                <img src="../assets/img/local-film.jpg" alt="">
                <p>泰国普吉岛6天4晚私人订制行程（纯旅游）</p>
              </li>
              <li>
                <img src="../assets/img/local-film.jpg" alt="">
                <p>泰国普吉岛6天4晚私人订制行程（纯旅游）</p>
              </li>
            </ul>
          </div>
        </div>

         <div class="mian-loacl-film">
          <div class="local-film-header">
            <p>特别推荐(旅游+摄影)</p>
            <a href="#">查看更多>></a>
            <div class="header-box"></div>
          </div>
          <div class="local-film-body">
            <ul>
              <li>
                <img src="../assets/img/local-film.jpg" alt="">
                <p>泰国普吉岛6天4晚私人订制行程（纯旅游）</p>
              </li>
              <li>
                <img src="../assets/img/local-film.jpg" alt="">
                <p>泰国普吉岛6天4晚私人订制行程（纯旅游）</p>
              </li>
              <li>
                <img src="../assets/img/local-film.jpg" alt="">
                <p>泰国普吉岛6天4晚私人订制行程（纯旅游）</p>
              </li>
              <li>
                <img src="../assets/img/local-film.jpg" alt="">
                <p>泰国普吉岛6天4晚私人订制行程（纯旅游）</p>
              </li>
              <li>
                <img src="../assets/img/local-film.jpg" alt="">
                <p>泰国普吉岛6天4晚私人订制行程（纯旅游）</p>
              </li>
              <li>
                <img src="../assets/img/local-film.jpg" alt="">
                <p>泰国普吉岛6天4晚私人订制行程（纯旅游）</p>
              </li>
            </ul>
          </div>
        </div>
        
         <div class="mian-loacl-film">
          <div class="local-film-header">
            <p>全国拍</p>
            <a href="#">查看更多>></a>
            <div class="header-box"></div>
          </div>
          <div class="local-film-body">
            <ul>
              <li>
                <img src="../assets/img/local-film.jpg" alt="">
                <p>泰国普吉岛6天4晚私人订制行程（纯旅游）</p>
              </li>
              <li>
                <img src="../assets/img/local-film.jpg" alt="">
                <p>泰国普吉岛6天4晚私人订制行程（纯旅游）</p>
              </li>
              <li>
                <img src="../assets/img/local-film.jpg" alt="">
                <p>泰国普吉岛6天4晚私人订制行程（纯旅游）</p>
              </li>
              <li>
                <img src="../assets/img/local-film.jpg" alt="">
                <p>泰国普吉岛6天4晚私人订制行程（纯旅游）</p>
              </li>
              <li>
                <img src="../assets/img/local-film.jpg" alt="">
                <p>泰国普吉岛6天4晚私人订制行程（纯旅游）</p>
              </li>
              <li>
                <img src="../assets/img/local-film.jpg" alt="">
                <p>泰国普吉岛6天4晚私人订制行程（纯旅游）</p>
              </li>
              <li>
                <img src="../assets/img/local-film.jpg" alt="">
                <p>泰国普吉岛6天4晚私人订制行程（纯旅游）</p>
              </li>
              <li>
                <img src="../assets/img/local-film.jpg" alt="">
                <p>泰国普吉岛6天4晚私人订制行程（纯旅游）</p>
              </li>
              <li>
                <img src="../assets/img/local-film.jpg" alt="">
                <p>泰国普吉岛6天4晚私人订制行程（纯旅游）</p>
              </li>
            </ul>
          </div>
        </div>

        <div class="mian-loacl-film">
          <div class="local-film-header">
            <p>亚洲拍</p>
            <a href="#">查看更多>></a>
            <div class="header-box"></div>
          </div>
          <div class="local-film-body">
            <ul>
              <li>
                <img src="../assets/img/local-film.jpg" alt="">
                <p>泰国普吉岛6天4晚私人订制行程（纯旅游）</p>
              </li>
              <li>
                <img src="../assets/img/local-film.jpg" alt="">
                <p>泰国普吉岛6天4晚私人订制行程（纯旅游）</p>
              </li>
              <li>
                <img src="../assets/img/local-film.jpg" alt="">
                <p>泰国普吉岛6天4晚私人订制行程（纯旅游）</p>
              </li>
              <li>
                <img src="../assets/img/local-film.jpg" alt="">
                <p>泰国普吉岛6天4晚私人订制行程（纯旅游）</p>
              </li>
              <li>
                <img src="../assets/img/local-film.jpg" alt="">
                <p>泰国普吉岛6天4晚私人订制行程（纯旅游）</p>
              </li>
              <li>
                <img src="../assets/img/local-film.jpg" alt="">
                <p>泰国普吉岛6天4晚私人订制行程（纯旅游）</p>
              </li>
            </ul>
          </div>
        </div>

        <div class="mian-loacl-film">
          <div class="local-film-header">
            <p>全球拍</p>
            <a href="#">查看更多>></a>
            <div class="header-box"></div>
          </div>
          <div class="local-film-body">
            <ul>
              <li>
                <img src="../assets/img/local-film.jpg" alt="">
                <p>泰国普吉岛6天4晚私人订制行程（纯旅游）</p>
              </li>
              <li>
                <img src="../assets/img/local-film.jpg" alt="">
                <p>泰国普吉岛6天4晚私人订制行程（纯旅游）</p>
              </li>
              <li>
                <img src="../assets/img/local-film.jpg" alt="">
                <p>泰国普吉岛6天4晚私人订制行程（纯旅游）</p>
              </li>
              <li>
                <img src="../assets/img/local-film.jpg" alt="">
                <p>泰国普吉岛6天4晚私人订制行程（纯旅游）</p>
              </li>
              <li>
                <img src="../assets/img/local-film.jpg" alt="">
                <p>泰国普吉岛6天4晚私人订制行程（纯旅游）</p>
              </li>
              <li>
                <img src="../assets/img/local-film.jpg" alt="">
                <p>泰国普吉岛6天4晚私人订制行程（纯旅游）</p>
              </li>
            </ul>
          </div>
        </div>

        <div class="main-map">
          <img src="../assets/img/map.jpg" alt="">
        </div>

        <div class="mian-loacl-film">
          <div class="local-film-header">
            <p>客片展示</p>
            <a href="#">查看更多>></a>
            <div class="header-box"></div>
          </div>
          <div class="local-film-body">
            <ul>
              <li>
                <img src="../assets/img/kepianshow.jpg" alt="">
                <p>泰国普吉岛6天4晚私人订制行程（纯旅游）</p>
                <span>澳大利亚-墨尔本</span>
              </li>
              <li>
                <img src="../assets/img/kepianshow.jpg" alt="">
                <p>泰国普吉岛6天4晚私人订制行程（纯旅游）</p>
                <span>澳大利亚-墨尔本</span>
              </li>
              <li>
                <img src="../assets/img/kepianshow.jpg" alt="">
                <p>泰国普吉岛6天4晚私人订制行程（纯旅游）</p>
                <span>澳大利亚-墨尔本</span>
              </li>
              <li>
                <img src="../assets/img/kepianshow.jpg" alt="">
                <p>泰国普吉岛6天4晚私人订制行程（纯旅游）</p>
                <span>澳大利亚-墨尔本</span>
              </li>
              <li>
                <img src="../assets/img/kepianshow.jpg" alt="">
                <p>泰国普吉岛6天4晚私人订制行程（纯旅游）</p>
                <span>澳大利亚-墨尔本</span>
              </li>
              <li>
                <img src="../assets/img/kepianshow.jpg" alt="">
                <p>泰国普吉岛6天4晚私人订制行程（纯旅游）</p>
                <span>澳大利亚-墨尔本</span>
              </li>
            </ul>
          </div>
        </div>

        <div class="main-ad2">
          <img src="../assets/img/ad.jpg" alt="">
        </div>

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
      </main> -->

  </div>
</template>

<script>
export default {
  name: "index"
};
</script>

<style lang="scss" scoped>
  $color: #19A9E8;
*{
  padding: 0;
  margin: 0;
}
a{
  text-decoration: none;
  color: #000;
}
ul{
  list-style: none;
}
.w{
   width: 1280px;
   margin: 0 auto;
}
.active{
  color: $color;
}
// 头部开始
header {
  position: relative;
  .swiper{
    position: absolute;
    // margin: 0 auto;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    height: 880px;
    z-index: 1;
  }
  .navbar{
    position: relative;
    height: 880px;
    background-color: pink;
    .logo{
      position: absolute;
      top: 58px;
      left: 25px;
      z-index: 9999;
      span{
        font-size: 30px;
        font-weight: 800;
      }
      span:first-child{
        color: $color;
      }
      span:last-child{
        color: #fff;
      }
    }
    .navbarList{
      width: 844px;
      height: 55px;
      background-color: #fff;
      position: absolute;
      top: 52px;
      left: 280px;
      z-index: 9999;
      ul{
        list-style: none;
        li{
          float: left;
            a{
              font-weight: bold;
              padding: 17px 0 17px 26px;
              span{
                line-height: 52px;
                border-right: 1px solid #ddd;
                padding-right: 26px;
                }
            }
            a:hover{
                color: $color;
                border-bottom: 2px solid $color;
              }
        }
        li:last-child{
          span{
            border-right: 0;
            padding: 17px 26px;
          }
          a{
            padding: 0 0 17px 0;
            a:last-child{
              padding: 0;
              background-color: $color;
            }
            a:last-child:hover{
                color: #fff;
              }
          }
        }
      }
    }
    .search{
      position: absolute;
      top: 670px;
      left: 210px;
      width: 800px;
      height: 160px;
      background-color: rgba(255, 255, 255, .6);
      z-index: 9999;
      border-radius: 14px;
      padding: 36px 46px;
      box-sizing: border-box;
      input{
        width: 625px;
        height: 40px;
        border: none;
        background-color: #fff;
        padding-left: 10px;
        outline: none;
      }
      button{
        position: absolute;
        width: 80px;
        height: 40px;
        border: none;
        background-color: #00A0EA;
        color: #fff;
      }
    }
  } 
}
// nav开始
nav{
  position: relative;
  margin-bottom: 30px;
  .destination{
    box-sizing: border-box;
      .des-header{
        padding-top: 112px;
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
    .des-body{
      margin-top: 45px;
      ul{
        list-style: none;
        li{
          display: flex;
          // justify-content: flex-start;
          margin-top: 20px;
          flex-wrap: wrap;
          span{
            color: $color;
          }
          .des-list{
            display: inline;
            padding-left: 20px;
            li{
              margin: 0;
              a{
                border: 1px solid #888;
                color: #888;
                padding: 3px 6px;
                border-radius: 4px;
                margin-left: 5px;
                margin-bottom: 5px;
                font-size: 12px;
              }
            }
          }
        }
      }
    }
    .des-footer{
      margin-top: 60px;
      ul{
        display: flex;
        justify-content: space-around;
        li{
          width: 190px;
          height: 255px;
          display: inline-block;
          background-color: pink;
          a{
            display: block;
            padding-top: 120px;
            p{
              text-align: center;
              font-size: 25px;
              font-weight: bold;
              color: #fff;
              letter-spacing: 3px;
              
            }
            p:nth-child(2){
              font-size: 12px;
              font-weight: normal;
              letter-spacing: 1px;
            }
            .des-box{
              width: 70px;
              height: 5px;
              background-color: #fff;
              margin: 10px auto;
            }
          }
        }
      }
    }
  }
}

// 广告开始
.main-ad{
  width: 1930px;
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

// 本地拍开始
.mian-loacl-film{
  width: 1820px;
  position: relative;
  margin: 120px auto;
  .local-film-header{
    border-bottom: 1px solid #eee;
    p{
      text-align: center;
      font-size: 25px;
      font-weight: bold;
      color: $color;
      letter-spacing: 3px;
      padding-bottom: 25px;
    }
    a{
      position: absolute;
      top: 15px;
      right: 0;
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
  .local-film-body{
    margin-top: 68px;
    display: flex;
    justify-content: space-around;
    ul{
      li{
        display: inline-block;
        margin-top: 30px;
        p{
          padding-top: 24px;
          color: #646464;
          font-size: 20px;
          font-weight: bold;
        }
        span{
          color: #aeaeae;
          font-size: 12px;
        }
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
  width: 1920px;
  margin: 0 auto;
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
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
      ul{
        li{
          display: inline-block;
          width: 195px;
          height: 205px;
          border: 2px solid #666;
          margin: 4px;
          img{
            display: block;
            width: 100px;
            position: relative;
            margin: 20px auto;
          }
          P{
            text-align: center;
            color: #666;
            font-weight: bold;
          }
        }
      }
    }
}
</style>
