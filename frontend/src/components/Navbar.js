import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import axios from 'axios';

export class Navbar extends Component {
  state = {}
  
  componentDidMount = () => {
    this.setState({user:this.props.user});
  }
  handleLogout=()=>{
    localStorage.clear();
    this.props.setUser(null);
  }
  
  render(){
    let  but_logout,but_login,rguide,rtourist,profile;
    if(localStorage.getItem('token')!=null)
    {
        profile = (
          <li className="nav-item"><NavLink className="nav-link" to={this.props.username}>Hi! {localStorage.getItem('username')}</NavLink></li>
        )
        but_logout=(
          <li className="nav-item"><NavLink className="nav-link" to={"/"} onClick={this.handleLogout}>Logout</NavLink></li>
        )
    }
    else{
      but_login=(
        <li className="nav-item"><NavLink className="nav-link" to='/login'>Login</NavLink></li>
      )
      rguide=(
        <li className="nav-item"><NavLink className="nav-link" to='/registerGuide'>Register as Guide</NavLink></li>
      )
      rtourist=(
        <li className="nav-item"><NavLink className="nav-link" to='/registerTourist'>Register as Tourist</NavLink></li>
      )
    }
    return (
      <div>
        <header className='fixed-top'>
          <nav className="navbar navbar-expand-lg">
            <div className="container">
              <NavLink className="navbar-brand" exact to='/'><h2>Guide<em>Me</em></h2></NavLink>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon" />
              </button>
              <div className="collapse navbar-collapse" id="navbarResponsive">
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <NavLink className="nav-link" to='/'>Home</NavLink>
                  </li>
                  <li className="nav-item"><NavLink className="nav-link" to='/place'>Place</NavLink></li>
                  <li className="nav-item"><NavLink className="nav-link" to='/blog'>Blog</NavLink></li>
                  <li className="nav-item"><NavLink className="nav-link" to='/contact'>Contact us</NavLink></li>
                    {but_login}
                    {rguide}
                    {rtourist}
                    {profile}
                    {but_logout}
                </ul>
              </div>
            </div>
          </nav>
        </header>
      </div>
    )
  }
}

export default Navbar;