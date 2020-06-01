import React, { useState, useEffect } from 'react'
import { withRouter, NavLink, Switch, Route } from 'react-router-dom'
import '../../css/shop.scss'

function Comment(props) {
  const [starLength, setStarLength] = useState(0)
  useEffect(() => {}, [])
  const comment = (
    <>
      <div className="">
        <div className="d-flex justify-content-center my-2">
          <div className="col col-sm-5 col-lg-2 avator">
            <img
              class="img-fluid"
              src="https://via.placeholder.com/150x150"
              alt=""
            />
          </div>
          <div className="col col-sm-7 col-lg-5 post mx-1 p-2">
            <div class="ratings">
              <div class="empty_star">★★★★★</div>
              <div class="full_star">
                <input type="checkbox" style={{ visibility: 'hidden' }} />★
              </div>
            </div>
            <div>
              <form>
                <div className="form-group">
                  <textarea
                    type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder="請發表留言"
                  />
                </div>

                <button  className="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center my-2">
          <div className="col col-sm-5 col-lg-2 avator">
            <img
              class="img-fluid"
              src="https://via.placeholder.com/150x150"
              alt=""
            />
          </div>
          <div className="col col-sm-7 col-lg-5 post mx-1 p-2">
            <div class="ratings">
              <div class="empty_star">★★★★★</div>
              <div class="full_star">★★★★★</div>
            </div>
            <div>這個遊戲屌炸天</div>
          </div>
        </div>

        <div className="d-flex justify-content-center my-2">
          <div className="col col-sm-5 col-lg-2 avator">
            <img
              class="img-fluid"
              src="https://via.placeholder.com/150x150"
              alt=""
            />
          </div>
          <div className="col col-sm-7 col-lg-5 post mx-1 p-2">
            <div class="ratings">
              <div class="empty_star">★★★★★</div>
              <div class="full_star">★★★★★</div>
            </div>
            <div>這個遊戲屌炸天</div>
          </div>
        </div>
      </div>
    </>
  )
  return <>{comment}</>
}

export default withRouter(Comment)
