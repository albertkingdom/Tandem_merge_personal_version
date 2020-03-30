import React, { Component } from 'react'
import '../../css/community.css'

export default class BackToTop extends React.Component {
  state = {
    intervalId: 0,
    thePosition: false,
  }

  componentDidMount() {
    document.addEventListener('scroll', () => {
      if (window.scrollY > 170) {
        this.setState({ thePosition: true })
      } else {
        this.setState({ thePosition: false })
      }
    })
    window.scrollTo(0, 0)
  }

  onScrollStep = () => {
    if (window.pageYOffset === 0) {
      clearInterval(this.state.intervalId)
    }
    window.scroll(0, window.pageYOffset - this.props.scrollStepInPx)
  }

  scrollToTop = () => {
    let intervalId = setInterval(this.onScrollStep, this.props.delayInMs)
    this.setState({ intervalId: intervalId })
  }

  renderGoTopIcon = () => {
    if (this.state.thePosition) {
      return (
        <div className="go-top" onClick={this.scrollToTop}>
          回到頁首
        </div>
      )
    }
  }

  render() {
    return <React.Fragment>{this.renderGoTopIcon()}</React.Fragment>
  }
}
