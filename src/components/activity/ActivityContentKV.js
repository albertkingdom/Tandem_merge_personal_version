import React from 'react'
import { Container, Row, Card } from 'react-bootstrap'

function ActivityContnetKV(props) {
  return (
    <>
      <Container className="aContentKV">
        <Row className="justify-content-center position-relative m-2">
          <div className="aContentCatgory position-absolute">
            <h3>{props.aData.aCategoryName}</h3>
          </div>
          <Card.Img variant="top" src={`/images/activity/${props.aData.aKV}`} />
          <div className="aContentPageName position-absolute">
            <h1>{props.aData.aName}</h1>
          </div>
        </Row>
      </Container>
    </>
  )
}

export default ActivityContnetKV
