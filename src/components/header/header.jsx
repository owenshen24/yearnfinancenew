import React, { Component } from 'react'
import { withStyles, withTheme } from '@material-ui/core/styles'
import { Typography, Button } from '@material-ui/core'
import { withRouter } from 'react-router-dom'

import { CONNECTION_CONNECTED, CONNECTION_DISCONNECTED } from '../../constants'

import UnlockModal from '../unlock/unlockModal.jsx'
import Home from '../home/home'

import Store from '../../stores'
const emitter = Store.emitter
const store = Store.store

const styles = (theme) => {
  const colors = theme.themeColors
  return {
    root: {
      verticalAlign: 'top',
      width: '100%',
      display: 'flex',
      background: colors.bg,
    },
    headerV2: {
      maxWidth: '1340px',
      margin: '0 auto',
      width: '100%',
      display: 'flex',
      padding: '16px 10px',
      alignItems: 'center',
      justifyContent: 'center',
      [theme.breakpoints.down('sm')]: {
        justifyContent: 'space-between',
        padding: '16px 10px',
      },
    },
    icon: {
      display: 'flex',
      alignItems: 'center',
      flex: 1,
      cursor: 'pointer',
    },
    links: {
      display: 'flex',
      '& .vaults': {
        '&:hover': {
          background: '#DB6162',
          '& .vaultsTitle': {
            color: '#fff',
          },
        },
      },
      '& .earn': {
        '&:hover': {
          background: '#C770EB',
          '& .earnTitle': {
            color: '#fff',
          },
        },
      },
      '& .zap': {
        '&:hover': {
          background: '#3C74EC',
          '& .zapTitle': {
            color: '#fff',
          },
        },
      },
      '& .apr': {
        '&:hover': {
          background: '#878787',
          '& .aprTitle': {
            color: '#fff',
          },
        },
      },
      '& .cover': {
        '&:hover': {
          background: '#46B96E',
          '& .coverTitle': {
            color: '#fff',
          },
        },
      },
      '& .vaultsActive': {
        background: '#DB6162',
        '& .vaultsTitle': {
          color: '#fff',
        },
      },
      '& .earnActive': {
        background: '#C770EB',
        '& .earnTitle': {
          color: '#fff',
        },
      },
      '& .zapActive': {
        background: '#3C74EC',
        '& .zapTitle': {
          color: '#fff',
        },
      },
      '& .aprActive': {
        background: '#878787',
        '& .aprTitle': {
          color: '#fff',
        },
      },
      '& .coverActive': {
        background: '#46B96E',
        '& .coverTitle': {
          color: '#fff',
        },
      },
    },
    link: {
      padding: '3px 14px',
      margin: '0px 15px',
      cursor: 'pointer',
      borderRadius: '20px',
      '& .vaultsTitle': {
        color: '#DB6162',
      },
      '& .earnTitle': {
        color: '#C770EB',
      },
      '& .zapTitle': {
        color: '#3C74EC',
      },
      '& .aprTitle': {
        color: '#878787',
      },
      '& .coverTitle': {
        color: '#46B96E',
      },
    },
    title: {
      fontWeight: 'bold;',
      fontSize: '18px;',
      lineHeight: '28px',
      textAlign: 'center',
    },
    account: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      flex: 1,
      [theme.breakpoints.down('sm')]: {
        flex: '0',
      },
    },
    walletTitle: {
      fontSize: '14px',
      lineHeight: '22px',
      letterSpacing: '0.02em',
      color: colors.header.text,
    },
    connectButton: {
      padding: '6px 13px',
      borderRadius: '4px',
      border: colors.header.connect.border,
    },
    connectedButton: {
      padding: '7px 13px',
      background: colors.header.connect.bg,
      boxShadow: colors.header.connect.shadow,
      borderRadius: '20px',
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer',
      '&:hover': {
        background: colors.header.connect.hover,
      },
      [theme.breakpoints.down('sm')]: {
        display: 'flex',
        position: 'absolute',
        top: '90px',
      },
    },
    connectedDot: {
      background: colors.connectGreen,
      boxShadow: colors.connectedShadow,
      opacity: '1',
      borderRadius: '10px',
      width: '12px',
      height: '12px',
      marginRight: '10px',
    },
    name: {
      paddingLeft: '24px',
      color: colors.header.text,
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
    },
    connectedArrow: {
      width: '0',
      height: '0',
      borderLeft: '6px solid transparent',
      borderRight: '6px solid transparent',
      borderTop: colors.header.connect.arrow,
      borderRadius: '2px',
      marginLeft: '12px',
    },
  }
}

class Header extends Component {
  constructor(props) {
    super()

    this.state = {
      account: store.getStore('account'),
      modalOpen: false,
      isMobile: window.innerWidth > 0 && window.innerWidth < 768,
      showMobileMenu: false,
    }
  }

  handleWindowResize = () => {
    this.setState({ isMobile: window.innerWidth > 0 && window.innerWidth < 768 })
  }

  componentWillMount() {
    window.addEventListener('resize', this.handleWindowResize)
    emitter.on(CONNECTION_CONNECTED, this.connectionConnected)
    emitter.on(CONNECTION_DISCONNECTED, this.connectionDisconnected)
  }

  componentWillUnmount() {
    emitter.removeListener(CONNECTION_CONNECTED, this.connectionConnected)
    emitter.removeListener(CONNECTION_DISCONNECTED, this.connectionDisconnected)
  }

  connectionConnected = () => {
    this.setState({ account: store.getStore('account') })
  }

  connectionDisconnected = () => {
    this.setState({ account: store.getStore('account') })
  }

  openMobileMenu = () => {
    this.setState({ showMobileMenu: true })
  }

  closeMobileMenu = () => {
    this.setState({ showMobileMenu: false })
  }

  render() {
    const { classes, theme } = this.props

    const { account, modalOpen, isMobile, showMobileMenu } = this.state

    var address = null
    if (account.address) {
      address =
        account.address.substring(0, 6) +
        '...' +
        account.address.substring(account.address.length - 4, account.address.length)
    }

    return (
      <div className={classes.root}>
        <div className={classes.headerV2}>
          <div className={classes.icon}>
            <img
              alt=''
              src={require('../../assets/YFI-logo.png')}
              height={'40px'}
              onClick={() => {
                this.nav('')
              }}
            />
            <Typography
              variant={'h3'}
              className={classes.name}
              onClick={() => {
                this.nav('')
              }}
            >
              yearn.finance
            </Typography>
          </div>
          {!isMobile && (
            <div className={classes.links}>
              {this.renderLink('vaults')}
              {this.renderLink('earn')}
              {this.renderLink('zap')}
              {this.renderLink('apr')}
              {this.renderLink('cover')}
            </div>
          )}
          <div className={classes.account}>
            {address && (
              <Button variant='text' color='primary' className={classes.connectedButton} onClick={this.addressClicked}>
                <div className={classes.connectedDot}></div>
                <Typography variant={'h4'} className={classes.walletTitle} noWrap>
                  {address}
                </Typography>
                <div className={classes.connectedArrow}></div>
              </Button>
            )}
            {!address && (
              <Button variant='text' color='primary' className={classes.connectButton} onClick={this.addressClicked}>
                <Typography variant={'h4'} className={classes.walletTitle} noWrap>
                  CONNECT WALLET
                </Typography>
              </Button>
            )}
          </div>
          {isMobile && <div onClick={this.openMobileMenu}>🍔</div>}
        </div>
        {showMobileMenu && (
          <div style={{ position: 'absolute', zIndex: 9999, width: '100%' }}>
            <div
              style={{
                position: 'absolute',
                zIndex: 99999,
                top: '0',
                right: '0',
                width: '50px',
                height: '50px',
                background: 'blue',
              }}
              onClick={this.closeMobileMenu}
            >
              ⤫
            </div>
            <Home closeMobileMenu={this.closeMobileMenu} />
          </div>
        )}
        {modalOpen && this.renderModal()}
      </div>
    )
  }

  renderLink = (screen) => {
    const { classes } = this.props

    return (
      <div
        className={
          window.location.pathname === '/' + screen
            ? `${screen + 'Active'} ${classes.link}`
            : `${screen} ${classes.link}`
        }
        onClick={() => this.nav(screen)}
      >
        <Typography variant={'h4'} className={`${classes.title} ${screen + 'Title'}`}>
          {screen}
        </Typography>
      </div>
    )
  }

  nav = (screen) => {
    if (screen === 'cover') {
      window.open('https://yinsure.finance', '_blank')
      return
    }
    this.props.history.push('/' + screen)
  }

  addressClicked = () => {
    this.setState({ modalOpen: true })
  }

  closeModal = () => {
    this.setState({ modalOpen: false })
  }

  renderModal = () => {
    return <UnlockModal closeModal={this.closeModal} modalOpen={this.state.modalOpen} />
  }
}

export default withRouter(withStyles(styles)(withTheme(Header)))
