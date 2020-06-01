import React, { useState, useEffect, useRef } from 'react'

import LeftCard from './LeftCard'
import RightCard from './RightCard'
import MidCard from './MidCard'

function AcitvityHomeCarousel() {
  const [carousel, setCarousel] = useState(0)
  const [topThreeData, setTopThreeData] = useState([])

  async function getTopThree() {
    let data = await fetch(`http://localhost:6001/activity/hotTopThree`)
    const processData = await data.json()
    setTopThreeData(processData)
  }

  useEffect(() => {
    getTopThree()
  }, [])

  function useInterval(callback, delay) {
    const savedCallback = useRef()

    // Remember the latest callback.
    useEffect(() => {
      savedCallback.current = callback
    }, [callback])

    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current()
      }
      if (delay !== null) {
        let id = setInterval(tick, delay)
        return () => clearInterval(id)
      }
    }, [delay])
  }

  useInterval(() => {
    // Your custom logic here
    // console.log('carousel% 3=', carousel % 3)
    setCarousel(carousel + 1)
  }, 3500)

  const leftStyleArray = [
    ['calc(100vw - 600px - 60px)', '400px', '600px', '1', '3s', '90%', '60px'],
    ['60px', '400px', '600px', '2', '3s', '90%', '451px'],
    ['calc(50vw - 450px)', '600px', '900px', '3', '3s', '0', '60px'],
  ]

  return (
    <>
      <div>
        <div className="aKV d-flex justify-content-between position-relative">
          <LeftCard
            topData={topThreeData[2]}
            data={leftStyleArray[carousel % 3]}
          />
          <RightCard
            topData={topThreeData[1]}
            data={
              leftStyleArray[(carousel % 3) + 1 > 2 ? 0 : (carousel % 3) + 1]
            }
          />
          <MidCard
            topData={topThreeData[0]}
            data={
              leftStyleArray[(carousel % 3) - 1 < 0 ? 2 : (carousel % 3) - 1]
            }
          />
        </div>
      </div>
    </>
  )
}

export default AcitvityHomeCarousel
