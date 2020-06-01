import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'

function ActivityListCard(props) {
  return (
    <>
      <div className="m-2 aListCardWrap">
        <div className="aListCard">
          <Link to={`/activitycontentpage/${props.activity.Id}`}>
            <Card.Img
              variant="top"
              src={`/images/activity/${props.activity.aKV}`}
            />
            <Card.Body className="aListCardBody">
              <Card.Title>{props.activity.aName}</Card.Title>
              <Card.Text>日期：{props.activity.aDate}</Card.Text>
            </Card.Body>
          </Link>
        </div>
      </div>
    </>
  )
}

export default ActivityListCard
