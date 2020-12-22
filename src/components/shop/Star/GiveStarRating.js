import React, { useState } from 'react'

import { AiOutlineStar, AiTwotoneStar } from 'react-icons/ai'
import styles from './GiveStarRating.module.css'

export default function GiveStarRating({ toSetRating, rating }) {
  const ratingStar = Array.from([1, 2, 3, 4, 5])
  // const [currentRating, setCurrentRating] = useState(0)
  const handleClick = event => {
    // console.log(event.currentTarget.value)

    // setCurrentRating(parseInt(event.currentTarget.value))
    toSetRating(event.currentTarget.value)
  }
  return (
    <span>
      {ratingStar.map(item => (
        <button
          key={item}
          value={item}
          onClick={handleClick}
          className={styles.button}
        >
          {parseInt(rating) >= item ? (
            <AiTwotoneStar style={{ color: '#ffc107' }} />
          ) : (
            <AiOutlineStar />
          )}
        </button>
      ))}
    </span>
  )
}
