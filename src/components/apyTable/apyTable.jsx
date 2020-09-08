import React from 'react'
import Skeleton from '@material-ui/lab/Skeleton'
import { withNamespaces } from 'react-i18next'

const ApyTable = ({ pyEarnData }) => {
  return (
    <div style={{ padding: '10px' }}>
      <div style={{ display: 'inline-block' }}>APY</div>
      <div style={{ paddingLeft: '10px', display: 'inline-block' }}>
        {!pyEarnData ? <Skeleton style={{ width: '50px' }} /> : pyEarnData.day === 'N/A' ? 'N/A' : `${pyEarnData.day}%`}
      </div>
      <div style={{ paddingLeft: '10px', display: 'inline-block' }}>
        {!pyEarnData ? (
          <Skeleton style={{ width: '50px' }} />
        ) : pyEarnData.day === 'N/A' ? (
          'N/A'
        ) : (
          `${pyEarnData.week}%`
        )}
      </div>
      <div style={{ paddingLeft: '10px', display: 'inline-block' }}>
        {!pyEarnData ? (
          <Skeleton style={{ width: '50px' }} />
        ) : pyEarnData.day === 'N/A' ? (
          'N/A'
        ) : (
          `${pyEarnData.month}%`
        )}
      </div>
      <div style={{ paddingLeft: '10px', display: 'inline-block' }}>
        {!pyEarnData ? (
          <Skeleton style={{ width: '50px' }} />
        ) : pyEarnData.day === 'N/A' ? (
          'N/A'
        ) : (
          `${pyEarnData.year}%`
        )}
      </div>
    </div>
  )
}

export default withNamespaces()(ApyTable)
