import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
class ResetPassword extends Component {

    state = {
        credentials: { email: '' },
        message: '',
    }




    handleSubmit = e => {
        e.preventDefault();
        var data = this.state.credentials;
        axios.post('http://localhost:8000/accounts/request-reset-email/', data).then(
            res => {
                this.setState({
                    message: res.data.success,
                    cls: 'success'
                })
            }
        ).catch(
            err => {
                this.setState({
                    message: err.response.data.email,
                    cls: 'danger'
                })
            }
        )

    };



    inputChanged = event => {
        const cred = this.state.credentials;
        cred[event.target.name] = event.target.value;
        this.setState({ credentials: cred });
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
                      Forgot Passoword
                    </span>
                    <div className="wrap-input100 validate-input" data-validate="Enter Email">
                      <input className="input100" type="email" name="email" placeholder="Email" 
                        value={this.state.credentials.email}
                        onChange={this.inputChanged} />
                      <span className="focus-input100" data-placeholder="" />
                    </div>
                        
                    <div className="container-login100-form-btn">
                      <button type="submit" className="login100-form-btn">
                        Submit
                      </button>
                    </div>
                    <div className="text-center p-t-90">
                      <Link to={'/password-reset'}><a className="txt1" href="">
                        Forgot Password?
                      </a></Link>
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

export default ResetPassword;