import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
class ResetPasswordConfirm extends Component {

    state = {
        reset: false,
        message: '',
    }
    password = {};
    confirmpassword = {};

    handleSubmit = e => {
        e.preventDefault();
        if (this.password !== this.confirmpassword) {
            this.setState({
                message: 'Passwords do not match'
            });
        }
        else {
            const data = {
                password: this.password,
                confirmpassword: this.confirmpassword,
                token: this.props.match.params.token,
                uidb64: this.props.match.params.uidb64,
            }

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                }
            };
            axios.patch('http://localhost:8000/accounts/password-reset-complete/', data, config).then(
                res => {
                    this.setState({
                        reset: true,
                    })
                }
            ).catch(
                err => {
                    this.setState({
                        message: err.response.data.email,

                    })
                }
            );
        }
    }

    render() {
        let error = '';
        if (this.state.message) {
            error = (
              <div class="alert alert-danger alert-dismissible" style={{ marginTop:'100px' }}>
                <button type="button" class="close" data-dismiss="alert">&times;</button>
                <strong>{this.state.message}</strong>
              </div>
            )
        };


        if (this.state.reset) {
            return <Redirect to='/' />
        }
        return (
            <div>
            <div className="header-text">
    
            </div>
            {error}
            <div className="limiter">
              <div className="container-login100" style={{ backgroundImage: "url("+process.env.PUBLIC_URL+'/assets/images/bg-01.jpg'+")" }}>
                <div className="wrap-login100">
                  <form className="login100-form validate-form" onSubmit={this.handleSubmit}>
                    <span className="login100-form-logo">
                      <i className="zmdi zmdi-landscape" />
                    </span>
                    <span className="login100-form-title p-b-34 p-t-27">
                      Reset your password
                    </span>
                    <div className="wrap-input100 validate-input" data-validate="Enter password">
                      <input className="input100" type="password" name="password" placeholder="Password" 
                      onChange={e => this.password = e.target.value} />
                      <span className="focus-input100" data-placeholder="" />
                    </div>
    
                    <div className="wrap-input100 validate-input" data-validate="Enter password">
                      <input className="input100" type="password" name="confirmpassword" placeholder="Re enter your Password" 
                      onChange={e => this.confirmpassword = e.target.value} />
                      <span className="focus-input100" data-placeholder="" />
                    </div>
                    
                    <div className="container-login100-form-btn">
                      <button type="submit" className="login100-form-btn">
                        Confirm
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div id="dropDownSelect1" />
          </div>
        );
    }
}

export default ResetPasswordConfirm;