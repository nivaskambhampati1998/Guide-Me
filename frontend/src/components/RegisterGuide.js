import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';


export class RegisterGuide extends Component {
  state = {
    credentials: { user: { username: '', email: '', first_name: '', last_name: '', languages: '', password: '' }, places_known: '', rating: 0, amount:null },
    password1:'',
    message: '',
    registered: false,
  }

  register = event => {
    let message1 = '';
    event.preventDefault();
    
    if(this.state.password1 != this.state.credentials.user.password){
      this.setState({
          message: 'Passwords do not match'
      });
    }
    else{
      var data = this.state.credentials;
      
      axios.post('http://localhost:8000/accounts/registerGuide/', data).then(
      res => {
        console.log(res)
        this.setState({
          registered: true
        })
      }).catch(
        err => {
          if (err.response && err.response.data.user && err.response.data.user.username) {
            message1 = err.response.data.user.username[0]
          }
          else if (err.response && err.response.data.user && err.response.data.user.email) {
            message1 = err.response.data.user.email[0]
          }
          else if (err.response && err.response.data.user && err.response.data.user.first_name) {
            message1 = err.response.data.user.first_name[0]
          }
          else if (err.response && err.response.data.user && err.response.data.user.last_name) {
            message1 = err.response.data.user.last_name[0]
          }
          else if (err.response && err.response.data.user && err.response.data.user.languages) {
            message1 = 'languages field cannot be blank'
          }
          else if (err.response && err.response && err.response.data.places_known) {
            message1 = "Locations known field cannot be blank"
          }
          else if (err.response && err.response && err.response.data.amount) {
            message1 = "Amount field cannot be blank"
          }
          else if (err.response && err.response && err.response.data.error) {
            message1 = err.response.data.error
          }
          else {
            if (err.response&& err.response.data.user && err.response.data.user.password) {
              message1 = err.response.data.user.password
            }
          }
          this.setState({
            message: message1
          })
        },

      ) 
    }
  }

  // inputImageChanged = event =>{
  //   const cred = this.state.credentials;
  //   let img = event.target.files[0];
  //   cred['user'][event.target.name] = img.name;
  //   this.setState({ credentials:cred });
  // }

  inputChanged = event => {
    const cred = this.state.credentials;
    const pass1 = this.state;
    if (event.target.name === 'places_known' || event.target.name === 'amount') {
      cred[event.target.name] = event.target.value;
      this.setState({ credentials: cred });
    }
    else if (event.target.name === 'password1') {
      pass1[event.target.name] = event.target.value;
      this.setState({ state: pass1 });
    }
    else {
      cred['user'][event.target.name] = event.target.value;
      this.setState({ credentials: cred });
    }
  }
  

  constructor(props) {
    super(props);
    this.autocompleteInput = React.createRef();
    this.autocomplete = null;
    this.handlePlaceChanged = this.handlePlaceChanged.bind(this);
  }

  componentDidMount() {
    const google = window.google;
    this.autocomplete = new google.maps.places.Autocomplete(this.autocompleteInput.current,
        {"types": ["geocode"]});

    this.autocomplete.addListener('place_changed', this.handlePlaceChanged);
  }

  handlePlaceChanged(){
    const place = this.autocomplete.getPlace();
    const cred = this.state.credentials;
    cred['places_known'] = place.formatted_address;
    this.setState({ credentials: cred });
  }


  render() {
    let error = '';
    
    if (this.state.registered) {
			window.location.pathname = '/message';
    }
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
            <div className="col-lg-10 wrap-login100">
              <form className="login100-form validate-form" onSubmit={this.register}>
                <span className="login100-form-logo">
                  <i className="zmdi zmdi-landscape" />
                </span>
                <span className="login100-form-title p-b-34 p-t-27">Register as Guide</span>
                <div className='row'>
                  <div className="col-md-6">
                    <div className="wrap-input100 validate-input" data-validate="Enter First Name">
                      <input className="input100" type="text" name="first_name" placeholder="First Name" 
                      value={this.state.credentials.first_name} 
                      onChange={this.inputChanged}/>
                      <span className="focus-input100" data-placeholder="" />
                    </div>

                    <div className="wrap-input100 validate-input" data-validate="Enter Last Name">
                      <input className="input100" type="text" name="last_name" placeholder="Last Name" 
                      value={this.state.credentials.last_name} 
                      onChange={this.inputChanged}/>
                      <span className="focus-input100" data-placeholder="" />
                    </div>

                    <div className="wrap-input100 validate-input" data-validate="Enter username">
                      <input className="input100" type="text" name="username" placeholder="Username" 
                      value={this.state.credentials.username} 
                      onChange={this.inputChanged}/>
                      <span className="focus-input100" data-placeholder="" />
                    </div>

                    <div className="wrap-input100 validate-input" data-validate="Enter mail">
                      <input className="input100" type="mail" name="email" placeholder="Mail ID" 
                      value={this.state.credentials.email} 
                      onChange={this.inputChanged}/>
                      <span className="focus-input100" data-placeholder="" />
                    </div>

                    <div className="wrap-input100 validate-input" data-validate="Enter amount">
                      <input className="input100" type="number" name="amount" placeholder="Amount in rupees per day" 
                      value={this.state.credentials.amount} 
                      onChange={this.inputChanged}/>
                      <span className="focus-input100" data-placeholder="" />
                    </div>

                  </div>
                  <div className='col-md-6'>
                    <div className="wrap-input100 validate-input" data-validate="Enter Gender">
                      <input className="input100" type="text" name="languages" placeholder="Languages Known" 
                      value={this.state.credentials.languages} 
                      onChange={this.inputChanged}/>
                      <span className="focus-input100" data-placeholder="" />
                    </div>
                    <div className="wrap-input100 validate-input" data-validate="Enter Locations">
                      <input className="input100" type="text" name="places_known" placeholder="Location's known" 
                      ref={this.autocompleteInput}  
                      id="autocomplete"
                      value={this.state.credentials.places_known} 
                      onChange={this.inputChanged}/>
                      <span className="focus-input100" data-placeholder="" />
                    </div>
                    <div className="wrap-input100 validate-input" data-validate="Enter password">
                      <input className="input100" type="password" name="password" placeholder="Password" 
                      value={this.state.credentials.password} 
                      onChange={this.inputChanged}/>
                      <span className="focus-input100" data-placeholder="" />
                    </div>
                    <div className="wrap-input100 validate-input" data-validate="Enter Confirm password">
                      <input className="input100" type="password" name="password1" placeholder="Confirm Password" 
                      value={this.state.password1} 
                      onChange={this.inputChanged}/>
                      <span className="focus-input100" data-placeholder="" />
                    </div>
                  </div>
                </div>
                <div className="container-login100-form-btn">
                  <button type="submit" className="login100-form-btn">
                    Register
            </button>
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

export default RegisterGuide;