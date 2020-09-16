import React from 'react'
import Skeleton from '@material-ui/lab/Skeleton'
import { withNamespaces } from 'react-i18next'
import LinkIcon from '../icons/linkIcon'
import AssetLinear from '../icons/assetLinear'
import { Typography } from '@material-ui/core'
import { withStyles, withTheme } from '@material-ui/core/styles'
import YvaultRoi from '../yvaultRoi'
import ApyMiddleLinear from '../icons/apyMiddleLinear'

const styles = (theme) => {
  const colors = theme.themeColors
  return {
    root: {
      width: '100%',
      padding: '18px 16px',
      background: colors.page.asset.apy.bg,
    },
    row: {
      display: 'flex',
      justifyContent: 'space-between',
      width: '100%',
    },
    container: {
      display: 'flex',
      alignItems: 'center',
      width: '100%',
    },
    lineContainer: {
      display: 'flex',
      justifyContent: 'center',
    },
    middleLineContainer: {
      display: 'flex',
      justifyContent: 'center',
      margin: '15px 0',
    },
    apy: {
      fontWeight: 'bold',
      fontSize: '14px',
      lineHeight: '22px',
      letterSpacing: '0.02em',
      color: colors.page.asset.apy.title,
      minWidth: '80px',
    },
    title: {
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
      marginLeft: '12px',
    },
    linkContainer: {
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer',
    },
    link: {
      fontWeight: 'bold',
      fontSize: '16px',
      lineHeight: '25px',
      color: colors.page.asset.apy.link,
      marginRight: '10px',
    },
  }
}

const ApyTable = ({ pyEarnData, classes, theme, address, showYvaultRoi }) => {
  const colors = theme.themeColors
  return (
    <>
      <div className={classes.lineContainer}>
        <AssetLinear
          id={colors.page.asset.linear.id}
          color={colors.page.asset.linear.color}
          middle={colors.page.asset.linear.middle}
        />
      </div>
      <div className={classes.root}>
        <div className={classes.container}>
          <Typography className={classes.apy} variant="h5">
            APY
          </Typography>
          <div className={classes.row}>
            <Typography className={classes.title} variant="h6">
              Dayly{' '}
              <span className={classes.description}>
                {!pyEarnData ? (
                  <Skeleton style={{ width: '50px' }} />
                ) : pyEarnData.day === 'N/A' ? (
                  'N/A'
                ) : (
                  `${pyEarnData.day}%`
                )}{' '}
              </span>
            </Typography>
            <Typography className={classes.title} variant="h6">
              Weekly{' '}
              <span className={classes.description}>
                {!pyEarnData ? (
                  <Skeleton style={{ width: '50px' }} />
                ) : pyEarnData.day === 'N/A' ? (
                  'N/A'
                ) : (
                  `${pyEarnData.week}%`
                )}
              </span>
            </Typography>
            <Typography className={classes.title} variant="h6">
              Monthly{' '}
              <span className={classes.description}>
                {!pyEarnData ? (
                  <Skeleton style={{ width: '50px' }} />
                ) : pyEarnData.day === 'N/A' ? (
                  'N/A'
                ) : (
                  `${pyEarnData.month}%`
                )}
              </span>
            </Typography>
            <Typography className={classes.title} variant="h6">
              Yearly{' '}
              <span className={classes.description}>
                {!pyEarnData ? (
                  <Skeleton style={{ width: '50px' }} />
                ) : pyEarnData.day === 'N/A' ? (
                  'N/A'
                ) : (
                  `${pyEarnData.year}%`
                )}
              </span>
            </Typography>
            <div className={classes.linkContainer} onClick={() => window.open('/', '_blank')}>
              <Typography className={classes.link} variant="h6">
                tutorial
              </Typography>
              <LinkIcon color={colors.page.asset.linear.middle} />
            </div>
            <div className={classes.linkContainer} onClick={() => window.open('/', '_blank')}>
              <Typography className={classes.link} variant="h6">
                strategy
              </Typography>
              <LinkIcon color={colors.page.asset.linear.middle} />
            </div>
          </div>
        </div>
        {showYvaultRoi && (
          <>
            <div className={classes.middleLineContainer}>
              <ApyMiddleLinear id={colors.page.asset.apy.middleId} color={colors.page.asset.apy.middleLinear} />
            </div>
            <YvaultRoi address={address} />
          </>
        )}
      </div>
      <div className={classes.lineContainer}>
        <AssetLinear
          id={colors.page.asset.linear.id}
          color={colors.page.asset.linear.color}
          middle={colors.page.asset.linear.middle}
        />
      </div>
    </>
  )
}

export default withNamespaces()(withStyles(styles)(withTheme(ApyTable)))
