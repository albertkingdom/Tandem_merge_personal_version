import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import ActivityContentKV from '../../components/activity/ActivityContentKV'
import ActivityContentInfo from '../../components/activity/ActivityContentInfo'
import ActivityComment from '../../components/activity/ActivityComment'
import { Col, Container } from 'react-bootstrap'

function ActivityContentPage(props) {
  const [aData, setAData] = useState([])

  async function activityData() {
    let data = await fetch(
      `http://localhost:6001/activity${props.location.pathname}`
    )
    let activityData = await data.json()
    setAData(activityData)
    // console.log('activityData', activityData)
  }

  useEffect(() => {
    activityData()
  }, [])

  useEffect(() => {
    activityData()
  }, [props.location.pathname])

  return (
    <>
      <Container className="activityWrap">
        {/* 活動圖 */}
        <ActivityContentKV aData={aData} />
        {/* 活動內容 + icon */}
        <ActivityContentInfo aData={aData} />
        <br />
        {/* 留言標題 */}
        <Col md={{ span: 10, offset: 1 }}>
          <h3 className="f-latest-title">
            <span>
              <span>留言</span>
            </span>
          </h3>
        </Col>
        {/* 留言內容 */}
        <ActivityComment aData={aData} />
      </Container>
    </>
  )
}

export default withRouter(ActivityContentPage)
