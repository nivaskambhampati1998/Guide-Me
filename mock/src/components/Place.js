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
    return (
      <div className="services" style={{backgroundImage : 'url(assets/images/mock-1.jpg)'}}>
        <div className="header-text" style={{textAlign : "center"}}>
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="text-content">
                  <h1 style={{color:"white" , fontSize:"100px"}}>Place</h1>
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
                        <input type="text" placeholder="Search city/place" onChange={(e)=>this.searchSpace(e)} style={{width:"220px" ,border:'none',backgroundColor:'#f33f3f99',color:'white',padding: '12px 20px',margin: '8px 0',boxSizing: 'border-box',borderRadius:'5%' }} />
                        <Link to={'/addPlace'}><a className='btn btn-primary' href="" style={{width:"220px" ,border:'none',backgroundColor:'#f33f3f99',color:'white',padding: '12px 20px',margin: '8px 0',boxSizing: 'border-box',borderRadius:'5%' }}>Add Place</a></Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card1">
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