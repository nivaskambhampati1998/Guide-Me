import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {Redirect} from 'react-router-dom';
import axios from 'axios';

export class Place extends Component {
  constructor(props){
    super(props)
    this.state = {
      data: [],
      search:null
    }
  }
  componentDidMount = () => {
      
        axios.get('http://localhost:8000/places/').then(
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
      {
        return d
      }
      else if(d.monument_name.toLowerCase().includes(this.state.search.toLowerCase()) || d.city.toLowerCase().includes(this.state.search.toLowerCase())){
        return d
      }
    }).map(d=>{
      return (
        <div className="col-md-5 col-sm-11" style={{minHeight:'400px'}}>
          <NavLink to={{pathname:'/placedetails/'+d.monument_id,state:{details:d}}} className="services-item-image">
            <div className="box">
              <div className="service-item">
                <img src={"http://localhost:3000"+d.image} className="img-fluid" alt="" />
                <div className="down-content">
                  <h4>{d.monument_name}</h4>
                  <h6>{d.city}</h6>
                  <p style={{ margin: 0 }}>  {d.basicinfo} &nbsp;...&nbsp;&nbsp;</p>
                </div>
              </div>
            </div>
          </NavLink>
        </div>
      )
    })
    let addplace;
    if(localStorage.getItem('username') != null){
      addplace = (
        <Link to={'/addPlace'}><button style={{border:'2px blue',borderRadius:'10px',padding:'10px',paddingLeft:'20px',paddingRight:'20px',color:'white',fontWeight:'bold',backgroundColor:'blue'}}>Add a Place</button></Link>
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
                  <h4>The journey is the destination.</h4>
                  <h2>Place</h2>
                  {addplace}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="products">
          <div className="container">
            <div className="row">
              <div className="col-md-8">
                <div className="col-md-2 float-right">
                  <div className="contact-form">
                    <div className="row">
                      <div className="col-5">
                        <input type="text" placeholder="Search city/place" onChange={(e)=>this.searchSpace(e)} style={{ border:'none',backgroundColor:'#f33f3f99',color:'white',padding: '12px 20px',margin: '8px 0',boxSizing: 'border-box',borderRadius:'5%' }} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  {items}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Modal */}
      </div>

    )
  }
}

export default Place;