import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Header from './components/Header'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'

import Home from './pages/Home'
import Bulletin from './pages/bulletin/Bulletin'
//---------------------------------------------------------------//

//                    community pages                          //
import Community from './pages/community/Community'
import AddPost from './pages/community/AddPost'
import Posts from './pages/community/Posts'
import PostDetail from './pages/community/PostDetail'
import PostDetailProfile from './pages/community/PostDetailProfile'
import PostProfile from './pages/community/PostProfile'
// import PostCollectionProfile from './components/community/PostCollectionProfile'
//---------------------------------------------------------------//
//                            bulletin                           //
import News from './pages/bulletin/News'
import Sales from './pages/bulletin/Sales'
//--------------------------------------------------------------//
//                         forum pages                          //
import Forum from './pages/forum/Forum'
import Article from './pages/forum/Article'
import ArticlePost from './pages/forum/ArticlePost'
//---------------------------------------------------------------//
//                        activity pages                         //
import Activity from './pages/activity/Activity'
import ActivityContentPage from './pages/activity/ActivityContentPage'
import ActivityAddNew from './pages/activity/ActivityAddNew'
//css
import '../src/css/activity.css'
import Mbcenterindex from './pages/member/Mbcenterindex'

//---------------------------------------------------------------//
//                         shop pages                            //
import ProductList from './pages/shop/ProductList'
import Product from './pages/shop/Product'
import Payment from './pages/shop/Payment'
import Order from './pages/shop/Order'
import Cart_new from './pages/shop/Cart_new'
import Mbtestpage from './pages/member/Mbtestpage'

function App() {
  return (
    <Router>
      <>
        <Header />

        <ScrollToTop>
          {/* <Mbtestpage /> */}
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            {/* activity */}
            <Route path="/activity">
              <Activity />
            </Route>
            <Route path="/activityContentPage">
              <ActivityContentPage />
            </Route>
            <Route path="/activityAddNew">
              <ActivityAddNew />
            </Route>
            <Route path="/bulletin">
              <Bulletin />
            </Route>
            <Route path="/news/:newsId">
              <News />
            </Route>
            <Route path="/sales/:salesId">
              <Sales />
            </Route>
            {/* //community */}
            <Route path={`/addpost`}>
              <AddPost />
            </Route>
            <Route path={`/posts`}>
              <Posts />
            </Route>
            <Route path={'/postdetail/:id?'}>
              <PostDetail />
            </Route>
            <Route path={'/postDetailProfile/:id?'}>
              <PostDetailProfile />
            </Route>
            <Route path={'/Communityprofile/:id?'}>
              <PostProfile />
            </Route>
            <Route path="/community">
              <Community />
            </Route>
            <Route path="/forum">
              <Forum />
            </Route>
            <Route path="/article/:articleId?">
              <Article />
            </Route>
            <Route path="/articlepost">
              <ArticlePost />
            </Route>
            <Route path="/member">
              <Mbcenterindex />
            </Route>
            <Route path="/cart_new">
              <Cart_new />
            </Route>
            <Route path="/productlist/:type?/:page?">
              <ProductList />
            </Route>
            <Route path="/product/:type?/:id?">
              <Product />
            </Route>
            <Route path="/payment">
              <Payment />
            </Route>
            <Route path="/order">
              <Order />
            </Route>
          </Switch>
        </ScrollToTop>
        <Footer />
      </>
    </Router>
  )
}

export default App
