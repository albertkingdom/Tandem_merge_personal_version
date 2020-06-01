import React, { Component } from 'react'
import FacebookLogin from 'react-facebook-login'

export default class Mfacebook extends Component {
  initialState = {
    isLoggedIn: false,
    userID: '',
    name: '',
    email: '',
    picture: '',
  }
  responseFacebook = response => {
    // console.log(response)
    this.setState({
      isLoggedIn: true,
      userID: response.userID,
      name: response.name,
      email: response.email,
      picture: response.picture.data.url,
    })
  }
  componentClicked = () => {
    console.log('clicked')
  }

  render() {
    let fbContent
    if (this.initialState.isLoggedIn) {
      // 登陸後狀態清空??
      //   fbContent = null
      fbContent = (
        <div
          style={{
            width: '20rem',
          }}
        >
          <h2>{this.initialState.email}</h2>
        </div>
      )
    } else {
      fbContent = (
        <FacebookLogin
          appId="2815526195178992"
          autoLoad={true}
          fields="name,email,picture"
          //加this
          onClick={this.componentClicked}
          callback={this.responseFacebook}
        />
      )
    }
    return <div>{fbContent}</div>
  }
}
