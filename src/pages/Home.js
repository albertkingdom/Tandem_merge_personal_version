import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import { NavLink } from 'react-bootstrap'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'
import { Parallax } from 'react-parallax'
import $ from 'jquery'

// import Header from '../components/Header'
// import Footer from '../components/Footer'

import '../css/home.scss'

// const styles = {
//   fontFamily: 'sans-serif',
//   textAlign: 'center',
// }
// const insideStyles = {
//   // background: 'white',
//   padding: 20,
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%,-50%)',
// }
const imageh1 = 'images/home-caro1.jpg'
const imageh2 = 'images/home-caro2.jpg'
const imageh3 = 'images/home-caro3.jpg'
const imageh4 = 'images/home-caro4.jpg'
const image1 = 'images/home1.jpg'
const image2 = 'images/home2.jpg'
const image3 = 'images/home3.jpg'
const image4 = 'images/home4.jpg'
const hfore2 = 'images/home_side_1.jpg'
const hfore3 = 'images/home_side_2.jpg'
const hfore4 = 'images/home_side_3.jpg'
const hfore5 = 'images/home_side_4.jpg'
const hfore6 = 'images/home_side_5.jpg'
const hfore7 = 'images/home_side_6.jpg'
const hback1 = 'images/hback1.png'

function Home() {
  useEffect(() => {
    $(function() {
      /* 按下GoTop按鈕時的事件 */
      $('#gotop').click(function() {
        // window.scrollTo(0, 0)
        // document.querySelector('.parallax').scrollTo(0, 0)
        $('window,.parallax').animate(
          { scrollTop: 0 },
          'slow'
        ) /* 返回到最頂上 */
        return false
      })
    })
  }, [])

  useEffect(() => {
    var body = document.querySelector('.parallax'),
      scrollTop = 0,
      prevThreshold = 0
    var lv0 = body.querySelector('.parallax__layer--deep'),
      lv1 = body.querySelector('.parallax__layer--back'),
      lv2 = body.querySelector('.parallax__layer--base'),
      lv3 = body.querySelector('.parallax__layer--fore'),
      doScroll = function(newScrollTop) {
        lv1.style.top = parseInt(newScrollTop * -0.5) + 'px'
        // lv1.style.top = newScrollTop + 'px'
        lv2.style.top = newScrollTop * -2 + 'px'
        lv3.style.top = newScrollTop * -3.5 + 'px'
      },
      getProgress = function() {
        return parseInt((body.scrollTop * 100) / document.body.clientHeight)
      },
      fadeInOutHandler = function(progress) {
        opacityImage(progress, 20, 44, '.fade1')
        opacityImage(progress, 83, 117, '.fade2')
        opacityImage(progress, 200, 300, '.fade3', fadeOutEffect)
        opacityImage(progress, 130, 170, '.cycle1', memoryEffect)
        opacityImage(progress, 150, 200, '.cycle2', memoryEffect)
        // opacityImage(progress, 20, 44, '.fade1')
        // opacityImage(progress, 83, 117, '.fade2')
        // opacityImage(progress, 200, 300, '.fade3', fadeOutEffect)
        // opacityImage(progress, 130, 170, '.cycle1', memoryEffect)
        // opacityImage(progress, 150, 200, '.cycle2', memoryEffect)
      },
      opacityImage = function(
        progress,
        start,
        end,
        imgSelector,
        customizedFunc
      ) {
        if (progress > start && progress < end) {
          var img = document.querySelector(imgSelector)
          if (img && img.style) {
            img.style.opacity =
              (customizedFunc && customizedFunc(progress, start, end)) ||
              (progress - start) / (end - start)
          }
        }
      },
      memoryEffect = function(progress, start, end) {
        // Range : 0.1 ~ 1
        return 0.1 + (Math.sin((Math.PI * progress) / 10) + 1) * 0.45
      },
      fadeOutEffect = function(progress, start, end) {
        return 1 - (progress - start) / (end - start)
      }
    body.addEventListener('scroll', function(e) {
      scrollTop = body.scrollTop
      // console.log('scroll', window.pageYOffSet)
      var progress = getProgress(),
        // Gate 33 233 433 = 33 + n * 200
        threshold = Math.floor((progress + 167) / 200)
      doScroll(scrollTop)
      fadeInOutHandler(progress)
      if (prevThreshold === threshold) {
        return
      }
      prevThreshold = threshold
    })
  }, [])
  return (
    <>
      <div class="parallax">
        {/* <Header /> */}
        <Carousel autoPlay="true" infiniteLoop="true">
          <div>
            <img src={imageh1} />
            <p className="legend">
              <a href="https://www.e3expo.com/">
                2020 E3電玩展 因武漢肺炎疫情 停辦一次
              </a>
            </p>
          </div>
          <div>
            <img src={imageh2} />
            <p className="legend">
              <a href="https://tgs.tca.org.tw/index_portal.php">
                2020 台北國際電玩展 因武漢肺炎疫情 停辦一次
              </a>
            </p>
          </div>
          <div>
            <img src={imageh3} />
            <p className="legend">
              <a href="https://www.playstation.com/en-us/explore/ps5/">
                PlayStation5 即將上市
              </a>
            </p>
          </div>
          <div>
            <img src={imageh4} />
            <p className="legend">
              <a href="https://www.nintendo.co.jp/">
                無料アップデートで広がる島ぐらし。『あつまれ
                どうぶつの森』で季節のイベント「イースター」開催！
              </a>
            </p>
          </div>
        </Carousel>

        <div class="parallax__group">
          <div
            class="parallax__layer parallax__layer--fore"
            style={{ top: -17489.5 }}
          >
            {/* <div class="full-screen" style={{ backgroundColor: `#79cee2` }}>
              <div class="title">FIRST PAGE</div>
            </div> */}
            <div class="fore fade1" style={{ opacity: 0 }}>
              <div class="title"></div>
            </div>
            <div class="fore right">
              <div class="title f-fore2">
                熱門遊戲 <img src={hfore2} />
              </div>
            </div>
            <div class="fore center">
              <div class="title f-fore3">
                活躍會員 <img src={hfore3} />
              </div>
            </div>
            <div class="fore center">
              <div class="title f-fore4">
                熱門活動 <img src={hfore4} />
              </div>
            </div>
            <div class="fore right ">
              <div class="title f-fore5">
                熱門文章 <img src={hfore5} />
              </div>
            </div>
            <div class="fore center">
              <div class="title f-fore6">
                年度最佳遊戲 <img src={hfore6} />
              </div>
            </div>
            <div class="fore">
              <div class="title f-fore7">
                一起協作開發遊戲~ <img src={hfore7} />
              </div>
            </div>
            <div class="fore right">
              <div class="title"></div>
            </div>
          </div>

          <div
            class="parallax__layer parallax__layer--base"
            style={{ top: -9994 }}
          >
            <div class="card" style={{ marginTop: 300, opacity: 0.8 }}>
              <div class="title h-base1">
                這裡是基以程式技術與原畫創作交流為初衷的遊戲平台
                <br />
                <p />
                讓會員能在玩遊戲之餘，也能一同
                <p>
                  T<span>Δ</span>NDEM
                </p>
                開發者和設計師的自由創作
              </div>
            </div>
            <div class="shot fade2" style={{ opacity: 0.970588 }}>
              <div class="title"></div>
            </div>
            <div class="shot cycle2" style={{ opacity: 0.1 }}>
              <div class="title"></div>
            </div>
            <div class="shot">
              <div class="title"></div>
            </div>
            <div class="shot">
              <div class="title"></div>
            </div>
            {/* <div class="shot">
              <div class="title">BASE6</div>
            </div> */}
            {/* <div class="shot">
              <div class="title">BASE7</div>
            </div> */}
          </div>

          <div
            class="parallax__layer parallax__layer--back"
            style={{ top: -2498 }}
          >
            <div class="card" style={{ marginTop: 100 }}>
              <div class="title h-back1">
                <img src={hback1} />
              </div>
            </div>
            <div class="card" style={{ opacity: 0.8 }}>
              <div class="title h-back2">
                這裡有眾多活躍會員與你一起分享遊戲大小事
                <br />
                <p />
                還有許多新奇有趣的活動等著你一同參與~
              </div>
            </div>
            <div class="card fade3" style={{ opacity: 0.03 }}>
              <div class="title h-back3">
                全新的遊戲社群體驗
                <br />
                <p />
                讓你一起沉浸在遊戲協作開發的樂趣中~
              </div>
            </div>
            <div class="card" style={{ opacity: 0.7 }}>
              <div class="title h-back4">
                即時更新、一起串聯
                <br />
                <p />
                在這裡
                <br />
                <p />
                讓你不錯過遊戲任何相關的訊息~
              </div>
            </div>
            <div class="card" style={{ background: `rgba(0,0,0,0.6)` }}>
              <div class="title h-back5">
                <a href="" id="gotop">
                  <p>Let's</p> T<p>Δ</p>NDEM！
                </a>
              </div>
            </div>
            {/* <div class="card">
              <div class="title">BACK6</div>
            </div> */}
          </div>

          <div class="parallax__layer parallax__layer--deep">
            <div class="full-screen">
              <img src={image1} />
            </div>
            <div class="full-screen">
              <img src={image2} />
            </div>
            <div class="full-screen">
              <img src={image3} />
            </div>
            <div class="full-screen">
              <img src={image4} />
            </div>
            {/* <Footer /> */}
            {/* <div class="full-screen"><img src={imageh3} /></div> */}
            {/* <div class="full-screen">
              <img src={image2} />
            </div> */}
          </div>
        </div>
        {/* <Footer /> */}
      </div>
    </>
  )
}

export default Home
