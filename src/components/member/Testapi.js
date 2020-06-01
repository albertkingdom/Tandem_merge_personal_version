import React, { Component } from 'react'
import { FacebookProvider, LoginButton } from 'react-facebook'

export default class Testapi extends Component {
  handleResponse = data => {
    console.log(data)
  }

  handleError = error => {
    this.setState({ error })
  }

  render() {
    return (
      <FacebookProvider appId="2815526195178992">
        <LoginButton
          scope="email"
          onCompleted={this.handleResponse}
          onError={this.handleError}
        >
          <span>Login via Facebook</span>
        </LoginButton>
      </FacebookProvider>
    )
  }
}
