import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {Redirect} from 'react-router-dom';
import axios from 'axios';

class WriteBlog extends Component {
    constructor(props) {
        super(props);
        this.autocompleteInput = React.createRef();
        this.autocomplete = null;
    }
  state = {
    blogdata: { user:null, city: '', title: '', content:null },
  }
  register = event => {
      
      axios.get('http://localhost:8000/accounts/user/'+localStorage.getItem('username')+'/').then(
          res=>{
            console.log(res)
            this.setState({user: res.data})
          }
      )
      var data = this.state.blogdata;
      axios.post('http://localhost:8000/posting/', data).then(
      res => {
        console.log(res)
      })
  }
  inputChanged = event => {
    const cred = this.state.blogdata;
    if (event.target.name === 'title' || event.target.name === 'content' || event.target.name === 'city') {
      cred[event.target.name] = event.target.value;
      this.setState({ blogdata: cred });
    }
  }

  componentDidMount = () => {
      	
  }
 
  

  render() {
    //   console.log(localStorage.getItem('username'),".........",localStorage.getItem('token'))
    return (
        <div>

        <div className="header-text">

        </div>
        <div className="limiter">
          <div className="container-login100">
            <div className="col-lg-10 wrap-login100">
              <form className="login100-form validate-form" onSubmit={this.register}>
                <span className="login100-form-logo">
                  <i className="zmdi zmdi-landscape" />
                </span>
                <span className="login100-form-title p-b-34 p-t-27">Write a Blog</span>
                <div className='row'>
                  <div className="col-md-6">
                    <div className="wrap-input100 validate-input" data-validate="Enter Title">
                      <input className="input100" type="text" name="title" placeholder="Title" 
                      value={this.state.blogdata.title} 
                      onChange={this.inputChanged}/>
                      <span className="focus-input100" data-placeholder="" />
                    </div>

                    <div className="wrap-input100 validate-input" data-validate="Enter City">
                      <input className="input100" type="text" name="city" placeholder="City" 
                      value={this.state.blogdata.city} 
                      onChange={this.inputChanged}/>
                      <span className="focus-input100" data-placeholder="" />
                    </div>

                    <div className="wrap-input100 validate-input" data-validate="Enter content">
                      <input className="input100" type="text" name="content" placeholder="Content" 
                      value={this.state.blogdata.content} 
                      onChange={this.inputChanged}/>
                      <span className="focus-input100" data-placeholder="" />
                    </div>

                  </div>
                </div>
                <div className="container-login100-form-btn">
                  <button type="submit" className="login100-form-btn">
                    Submit
            </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default WriteBlog;