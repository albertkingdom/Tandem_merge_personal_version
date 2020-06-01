import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'

function LeftCard(props) {
  const topData = props.topData
  const [RUOK, setRUOK] = useState(false)
  const [topId, setTopId] = useState('')
  const [topKV, setTopKV] = useState('')
  const [topName, setTopName] = useState('')

  useEffect(() => {
    if (topData) {
      setRUOK(true)
      setTopId(topData.aId)
      setTopKV(topData.aKV)
      setTopName(topData.aName)
    } else {
      setRUOK(false)
    }
  }, [topData])

  const NO = (
    <>
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </>
  )

  const OK = (
    <>
      <Link
        className="position-absolute aCarousel"
        to={'/activitycontentpage/' + topId}
        style={{
          right: props.data[0],
          maxHeight: props.data[1],
          maxWidth: props.data[2],
          zIndex: props.data[3],
          transition: props.data[4],
        }}
      >
        <img
          style={{
            filter: 'grayscale(' + props.data[5] + ')',
            transition: '0s',
          }}
          src={'/images/activity/' + topKV}
          className="aImg"
          alt="hotactivity_sideKV"
        />

        <div
          style={{ marginLeft: props.data[6], transition: '2s' }}
          className="aCarouselInfo position-absolute"
        >
          <Card.Title className="m-1">{topName}</Card.Title>
        </div>
      </Link>
    </>
  )

  return <>{RUOK ? OK : NO}</>
}

export default LeftCard
