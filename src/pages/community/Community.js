import React, { useState } from 'react'
import { withRouter, Route, Switch, NavLink } from 'react-router-dom'

// import { cartIncrement } from '../../actions'
import AddPost from './AddPost'
import IndexSearchBar from '../../components/community/IndexSearchBar'
import InfiniteScroll from '../../components/community/InfiniteScroll'

// import { gsap } from 'gsap'
// import Localstorage from '../../Shadow_Data_ver2'

function Community(props) {
  // const dispatch = useDispatch()
  const [categoryfromchild, getStateCategoryfromchild] = useState([])
  console.log(props.match.url)
  console.log(props.match.path)
  // let url = props.match.url
  let path = props.match.path

  return (
    <>
      {/* <Localstorage /> */}

      <IndexSearchBar />

      <div className="container">
        <Switch>
          <Route path={path} exact>
            <></>
          </Route>
          <Route path={`${path}/addpost`}>
            <AddPost />
          </Route>
        </Switch>
      </div>
    </>
  )
}

export default withRouter(Community)
