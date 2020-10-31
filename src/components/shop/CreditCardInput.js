import React, { useState, useRef, useEffect } from 'react'

export default function CreditCardInput() {
  const [cardnumberLength, setCardnumberLength] = useState('')
  const [numberPart1, setNumberPart1] = useState('')
  const [numberPart2, setNumberPart2] = useState('')
  const [numberPart3, setNumberPart3] = useState('')
  const [numberPart4, setNumberPart4] = useState('')

  const numberPart1Ref = useRef(null)
  const numberPart2Ref = useRef(null)
  const numberPart3Ref = useRef(null)
  const numberPart4Ref = useRef(null)
  const cardLengthWarnRef = useRef(null)
  useEffect(() => {
    if (numberPart3.length === 4) {
      //   console.log('4')
      numberPart4Ref.current.focus()
    } else if (numberPart2.length === 4) {
      numberPart3Ref.current.focus()
    } else if (numberPart1.length === 4) {
      numberPart2Ref.current.focus()
    }
    setCardnumberLength(
      numberPart1.length +
        numberPart2.length +
        numberPart3.length +
        numberPart4.length
    )
    if (cardnumberLength < 16) {
      cardLengthWarnRef.current.innerHTML = '卡號長度不足'
    } else {
      cardLengthWarnRef.current.innerHTML = ''
    }
  }, [numberPart2, numberPart3, numberPart4, numberPart1, cardnumberLength])
  return (
    <>
      <div className="form-group row pl-2">
        <div className="col-sm-2">
          <input
            type="password"
            onKeyUp={e => setNumberPart1(e.target.value)}
            ref={numberPart1Ref}
            className="form-control"
          ></input>
        </div>

        <input
          type="text"
          defautvalue="-"
          style={{ width: '10px' }}
          readOnly
          className="form-control-plaintext"
        ></input>
        <div className="col-sm-2">
          <input
            type="password"
            onKeyUp={e => setNumberPart2(e.target.value)}
            ref={numberPart2Ref}
            className="form-control"
          ></input>
        </div>
        <input
          type="text"
          defautvalue="-"
          style={{ width: '10px' }}
          className="form-control-plaintext"
        ></input>
        <div className="col-sm-2">
          <input
            type="password"
            onKeyUp={e => setNumberPart3(e.target.value)}
            ref={numberPart3Ref}
            className="form-control"
          ></input>
        </div>
        <input
          type="text"
          defautvalue="-"
          style={{ width: '10px' }}
          className="form-control-plaintext"
        ></input>
        <div className="col-sm-2">
          <input
            type="password"
            onKeyUp={e => setNumberPart4(e.target.value)}
            ref={numberPart4Ref}
            className="form-control"
            maxLength="4"
          ></input>
        </div>
      </div>
      <p ref={cardLengthWarnRef} style={{ color: 'red', fontSize: '12px' }}></p>
    </>
  )
}
