import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

export class Login extends Component {
  state = {
    credentials: { username: '', password: '' },
    loggedIn: false,
    message: '',

  };

  login = event => {
    event.preventDefault();
    console.log(this.state.credentials);
    var data = this.state.credentials

    axios.post('http://localhost:8000/accounts/login/', data).then(
      res => {
        localStorage.setItem('token', res.data.tokens.access);

        localStorage.setItem('username', res.data.username);
        this.setState({
          loggedIn: true
        });
        this.props.setUser(res.data);

      }).catch(
        err => {

          this.setState({
            message: err.response.data.detail
          })
        },
    
      )
  };


  inputChanged = event => {
    const cred = this.state.credentials;
    cred[event.target.name] = event.target.value;
    this.setState({ credentials: cred });
  };





  render() {
    if (this.state.loggedIn) {
      return <Redirect to={'/'} />;
    }
    console.log(this.props)

    let error = '';
    if (this.state.message) {
      error = (
        <div class="alert alert-danger alert-dismissible" style={{ marginTop:'100px' }}>
          <button type="button" class="close" data-dismiss="alert">&times;</button>
          <strong>{this.state.message}</strong>
        </div>
      )
    };

    return (
      <div>
        <div className="header-text">

        </div>
        {error}
        <div className="limiter">
          <div className="container-login100" style={{ backgroundImage: "url("+process.env.PUBLIC_URL+'/assets/images/bg-01.jpg'+")" }}>
            <div className="wrap-login100">
              <form className="login100-form validate-form" onSubmit={this.login}>
                <span className="login100-form-logo">
                  <i className="zmdi zmdi-landscape" />
                </span>
                <span className="login100-form-title p-b-34 p-t-27">
                  Login
                </span>
                <div className="wrap-input100 validate-input" data-validate="Enter username">
                  <input className="input100" type="text" name="username" placeholder="Username"
                    value={this.state.credentials.username}
                    onChange={this.inputChanged} />
                  <span className="focus-input100" data-placeholder="" />
                </div>

                <div className="wrap-input100 validate-input" data-validate="Enter password">
                  <input className="input100" type="password" name="password" placeholder="Password"
                    value={this.state.credentials.password}
                    onChange={this.inputChanged} />
                  <span className="focus-input100" data-placeholder="" />
                </div>

                <div className="container-login100-form-btn">
                  <button type="submit" className="login100-form-btn">
                    Login
                  </button>
                </div>
                <div className="text-center p-t-90">
                  <Link to={'/accounts/password-reset/'}><a className="txt1" href="">
                    Forgot Password?
                  </a></Link>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div id="dropDownSelect1" />
      </div>

    )
  }
}

export default Login;