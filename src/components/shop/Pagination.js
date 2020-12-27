import React from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineCaretLeft, AiOutlineCaretRight } from 'react-icons/ai'

function Pagination({ totalpage, paginate, currentpage }) {
  //創造頁數list

  const pageNumbers = Array.from({ length: totalpage }, (_, i) => i + 1)
  return (
    <>
      <div className="row my-3">
        <div className="col-12">
          {/* 新的頁數bar開始 */}
          <ul className="d-flex flex-wrap justify-content-center">
            <li className="s-pageItem">
              <Link
                className=""
                onClick={() => paginate(currentpage - 1)}
                to="#"
              >
                <AiOutlineCaretLeft />
              </Link>
            </li>
            {pageNumbers.map((number, index) => {
              return (
                <li
                  key={index}
                  className={`s-pageItem ${
                    number === currentpage ? 's-pageItem-Active' : ''
                  }`}
                >
                  <Link
                    className=""
                    onClick={() => {
                      paginate(number)
                    }}
                    to="#"
                  >
                    {number}
                  </Link>
                </li>
              )
            })}
            <li className="s-pageItem">
              <Link
                className=""
                onClick={() => paginate(currentpage + 1)}
                to="#"
              >
                <AiOutlineCaretRight />
              </Link>
            </li>
          </ul>
          {/* 新的頁數bar結束 */}
        </div>
      </div>
    </>
  )
}

export default Pagination
