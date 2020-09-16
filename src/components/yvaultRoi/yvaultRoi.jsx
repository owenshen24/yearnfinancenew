import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { withStyles, withTheme } from '@material-ui/core/styles'
import Skeleton from '@material-ui/lab/Skeleton'
import { Typography } from '@material-ui/core'

const styles = (theme) => {
  const colors = theme.themeColors
  return {
    container: {
      display: 'flex',
      alignItems: 'center',
      width: '100%',
    },
    titleContainer: {
      display: 'flex',
      flexDirection: 'column',
      minWidth: '80px',
    },
    valueContainer: {
      minWidth: '207px',
      maxWidth: 'fit-content',
      width: '100%',
    },
    title: {
      fontWeight: 'bold',
      fontSize: '14px',
      lineHeight: '22px',
      letterSpacing: '0.02em',
      color: colors.page.asset.apy.title,
    },
    cellTitle: {
      fontWeight: 'normal',
      fontSize: '14px',
      lineHeight: '22px',
      color: colors.page.asset.apy.cellTitle,
      display: 'flex',
    },
    description: {
      fontWeight: 'bold',
      fontSize: '14px',
      lineHeight: '22px',
      letterSpacing: '0.02em',
      color: colors.page.asset.apy.description,
      marginLeft: '8px',
    },
  }
}

const YvaultRoi = ({ theme, address, classes }) => {
  const [yvaultRoiData, setYvaultRoiData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const {
    themeColors: { colors },
  } = theme

  const getDataProp = (propertyName) => {
    if (isLoading) return <Skeleton style={{ display: 'inline-block', width: '50px' }} />
    return yvaultRoiData && yvaultRoiData[propertyName] ? yvaultRoiData[propertyName] : 'N/A'
  }

  useEffect(() => {
    ;(async () => {
      setIsLoading(true)
      const {
        body: { data: newData },
      } = (
        await axios({
          method: 'POST',
          url: '/api/yvaultroi',
          data: { address },
        })
      ).data
      setYvaultRoiData(newData)
      setIsLoading(false)
    })()
  }, [address])
  return (
    <div className={classes.container}>
      <div className={classes.titleContainer}>
        <Typography className={classes.title} variant="h5">
          yVault
        </Typography>
        <Typography className={classes.title} variant="h5">
          ROI
        </Typography>
      </div>
      <div className={classes.valueContainer}>
        <Typography className={classes.cellTitle} variant="h5">
          Earnings:<span className={classes.description}>{getDataProp('earnings')}</span>
        </Typography>
        <Typography className={classes.cellTitle} variant="h5">
          Net Deposits:<span className={classes.description}>{getDataProp('netDeposits')}</span>
        </Typography>
      </div>
      <div className={classes.valueContainer}>
        <Typography className={classes.cellTitle} variant="h5">
          IRR:<span className={classes.description}>{getDataProp('irr')}</span>
        </Typography>
        <Typography className={classes.cellTitle} variant="h5">
          IRR Annualized:<span className={classes.description}>{getDataProp('irrAnnualized')}</span>
        </Typography>
      </div>
      <div className={classes.valueContainer}>
        <Typography className={classes.cellTitle} variant="h5">
          Simple Returndddddd:<span className={classes.description}>{getDataProp('simpleReturn')}</span>
        </Typography>
        <Typography className={classes.cellTitle} variant="h5">
          Simple Return Annualized:
          <span className={classes.description}>{getDataProp('simpleReturnAnnualized')}</span>
        </Typography>
      </div>
    </div>
  )
}

export default withStyles(styles)(withTheme(YvaultRoi))
