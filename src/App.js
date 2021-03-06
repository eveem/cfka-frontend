import React, { Component } from 'react';
import FB from 'fb';
import FacebookLogin from 'react-facebook-login';
import axios from 'axios';
import logo from './cfkalogo.png';
import './App.css';
import groupcut from './groupHandler.js'

class App extends Component {
  state = {
    keytext: '',
    keysuccess: false,
    linktext: '',
    linksuccess: false
  }


  sendRequest = () => {
    axios({
      method: 'post',
      url: 'https://fcabc8bc.ngrok.io/fetch',
      data: JSON.stringify({
        firstName: this.state.userName.split(' ')[0],
        lastName: this.state.userName.split(' ')[1],
        group_id: groupcut(this.state.linktext).id,
        keyword: this.state.keytext,
        access_token: this.state.accessToken,
      })
    });
    // axios.post('https://fcabc8bc.ngrok.io/fetch',
    //   {
    //     firstName: this.state.userName.split(' ')[0],
    //     lastName: this.state.userName.split(' ')[1],
    //     group_id: groupcut(this.state.linktext).id,
    //     keyword: this.state.keytext,
    //     access_token: this.state.accessToken
    //   }
    // ).then((res)=> {
    //   console.log(res);
    // }).catch((e) => {
    //   console.log(e);
    // })
  }

resetInput = () => {
  this.setState({
    keytext: '',
    keysuccess: true,
    linktext: '',
    linksuccess: true
  })
}

test = async () => {
  await this.sendRequest()
  this.resetInput()
  window.open("https://m.me/502138216822140?ref=hello", "_blank");
}

handleChangeKey = e => {
  this.setState({
    keytext: e.target.value,
    keysuccess: false
  })
}

handleChangeLink = e => {

  this.setState({
    linktext: e.target.value,
    linksuccess: false
  })
}

  constructor(props) {
    super(props)
    this.state = {
      userName: '',
      accessToken: ''
    }

    // window.fbAsyncInit = function() {
    //   FB.init({
    //     appId      : '132412297417604',
    //     cookie     : true,
    //     xfbml      : true,
    //     version    : 'v2.10'
    //   });
    // }
  }

  // statusChangeCallback(response) {
  //   console.log('statusChangeCallback');
  //   console.log(response);
  //   if (response.status === 'connected') {
  //     console.log('you are already login')
  //     this.testAPI();
  //   } else {
  //     console.log('please login')
  //   }
  // }
  //
  // checkLoginState() {
  //   FB.getLoginStatus(function(response) {
  //     this.statusChangeCallback(response);
  //   });
  // }
  //
  // testAPI() {
  //   console.log('Welcome!  Fetching your information.... ');
  //   FB.api('/me', function(response) {
  //     console.log('Successful login for: ' + response.name);
  //   });
  // }

  responseFacebook(response) {
    console.log(response);
    this.setState({
      userName: response.name,
      accessToken: response.accessToken
    })
    console.log(this.state.userName.split(' ')[1], this.state.accessToken)
  }

  render() {
    if(this.state.userName)
      return (
        <div className="App">
          <div className="logo">
            <img className="resize" src={logo}/>
          </div>
          <div className="form-inline" id="form-input">
            <input
              className="form-control mb-2 mr-sm-2 mb-sm-0"
              id="input-text"
              type="text"
              placeholder="Key word"
              value={this.state.keytext}
              onChange={this.handleChangeKey}></input>
            <input
              className="form-control mb-2 mr-sm-2 mb-sm-0"
              id="input-text"
              type="text"
              placeholder="Group link"
              value={this.state.linktext}
              onChange={this.handleChangeLink}></input>
              <button
                className="btn btn-secondary"
                onClick={this.test}>Get start</button>
          </div>
        </div>
      )
    else
      return (
        <div className="App">
          <FacebookLogin
            appId="132412297417604"
            autoLoad={true}
            fields="name,email"
            callback={this.responseFacebook.bind(this)}
          />
        </div>
      );
  }
}

export default App;
