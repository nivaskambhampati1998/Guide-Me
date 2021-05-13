import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {Redirect} from 'react-router-dom';
import axios from 'axios';

class Blog extends Component {
  constructor(props){
    super(props)
    this.state = {
      data: [],
      serach:null
    }
  }
  componentDidMount = () => {
      
        axios.get('http://localhost:8000/posting/').then(
          res => {
            var data = res.data
            this.setState({data : data})
          },
          err => {
            console.log(err)
          }
        )	
  }
  searchSpace=(event)=>{
    let keyword = event.target.value;
    this.setState({search:keyword})
  }
  

  render() {
    const items = this.state.data.filter((d)=>{
      if(this.state.search == null)
          return d
      else if(d.title.toLowerCase().includes(this.state.search.toLowerCase())){
          return d
      }
    }).map(d=>{
      return(
        <div className="col-lg-11 col-md-11 col-sm-11">
          <div className="box" style={{ margin: '10px',width:'100%' }}>
            <div className="service-item">
              <NavLink to={{pathname:'/blogdetails/'+d.pk,state:{details:d}}} className="services-item-image">
                <div className="down-content">
                  <h4><NavLink to={{pathname:'/blogdetails/'+d.pk,blogstate:{details:d}}}>{d.title}</NavLink></h4>
                  <p style={{ margin: 0 }}>  {d.content.substring(0,99)} &nbsp;...&nbsp;&nbsp;</p>
                  <p>|&nbsp;&nbsp; {d.timestamp.substring(0,10)} &nbsp; {d.timestamp.substring(11,19)}&nbsp;</p>
                </div>
              </NavLink>
            </div>
          </div>
        </div>
      )
    })
    let addblog;
    if(localStorage.getItem('username') != null){
      addblog = (
        <NavLink to={{pathname:'/BlogWriting/'}}><button style={{border:'2px blue',borderRadius:'10px',padding:'10px',paddingLeft:'20px',paddingRight:'20px',color:'white',fontWeight:'bold',backgroundColor:'blue'}}>Write a blog</button></NavLink>
      )
    }
    return (
      <div>
        {/* ***** Preloader Start ***** */}

        {/* ***** Preloader End ***** */}
        {/* Header */}
        {/* Page Content */}
        <div className="page-heading about-heading header-text" style={{ backgroundImage: 'url(assets/images/heading-6-1920x500.jpg)' }}>
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="text-content">
                  <h4>Worth seeing? Yes; but not worth going to see.</h4>
                  <h2>Blog</h2>
                  {addblog}
                 </div>
              </div>
            </div>
          </div>
        </div>
        <div className="products">
          <div className="container">
            <div className="row">
              <div className="col-md-8">
                <div className="row">
                  {items}
                  <div className="col-md-12">
                    <ul className="pages">
                      <li className="active"><a href="#">1</a></li>
                      <li><a href="#">2</a></li>
                      <li><a href="#">3</a></li>
                      <li><a href="#">4</a></li>
                      <li><i className="fa fa-angle-double-right"></i></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="contact-form">
                  <div className="form-group">
                    <h5>Blog Search</h5>
                  </div>
                  <div className="row">
                    <div className="col-8">
                      <input type="text" placeholder="Search Keywords" onChange={(e)=>this.searchSpace(e)} style={{ border:'none',backgroundColor:'#f33f3f99',color:'white',padding: '12px 20px',margin: '8px 0',boxSizing: 'border-box',borderRadius:'5%' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    )
  }
}

export default Blog;