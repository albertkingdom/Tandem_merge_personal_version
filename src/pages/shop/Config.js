import React from 'react'
import { withRouter } from 'react-router-dom'
import styles from './Config.module.scss'

function Config(props) {
  const table = (
    <>
      <div className="d-flex justify-content-center">
        <table className={`${styles.table} col-md-8 col-10 h6`}>
          <thead></thead>
          <tbody>
            <tr>
              <th style={{ width: '30%' }} className="text-right">
                作業系統:{' '}
              </th>
              <td>Windows 7/10 (latest service pack)</td>
            </tr>
            <tr>
              <th className="text-right">處理器:</th>
              <td> AMD Ryzen™ 5 2600 (Intel i7-4770)</td>
            </tr>
            <tr>
              <th className="text-right">記憶體:</th>
              <td>16 GB 記憶體</td>
            </tr>
            <tr>
              <th className="text-right">顯示卡:</th>
              <td>AMD Radeon™ RX 590 or NVIDIA GeForce GTX 1060 6GB</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
  return <>{table}</>
}

export default withRouter(Config)
