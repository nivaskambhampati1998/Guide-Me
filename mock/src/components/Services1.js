import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import axios from 'axios';

export class Services1 extends Component {
    constructor(props){
        super(props)
        this.state = {
            days: [],
            guides: [],
            data: [],
            date: '',
            city: '',
            search:null,
        }
      }
    componentDidMount = () => {
         console.log(this.props,"--")
        axios.get('http://localhost:8000/places/'+this.props.match.params.monument_id).then(
            res => {
                var data = res.data
                var city = data.city.slice(0, data.city.indexOf(","))
                var today = new Date();
                var dd = String(today.getDate()).padStart(2, '0');
                var mm = String(today.getMonth() + 1).padStart(2, '0');
                var yyyy = today.getFullYear();

                today = yyyy + '-' + mm + '-' + dd;
                this.setState({data : data,city:city,date:today})

                if(localStorage.getItem('token')){

                    console.log(this.state.city,'--',this.state.date)

                    axios.get('http://localhost:8000/booking/'+ this.state.city + '/' + this.state.date).then(
                        res => {
                            this.setState({guides:res.data})
                            console.log(this.state.guides)
                    },
                    err => {
                        console.log(err)
                        }
                    )
                }
          },
          err => {
              console.log(err)
            }
        )
    }

    inputChanged = (event) =>{
        this.setState({date:event.target.value})
    }
    Submitted = (event) => {


        event.preventDefault();
        this.setState({date:event.target.value})

        console.log('http://localhost:8000/booking/'+ this.state.city + '/' + this.state.date)

        axios.get('http://localhost:8000/booking/'+ this.state.city + '/' + this.state.date).then(
            res => {
                this.setState({guides:res.data})
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
        const items = this.state.guides.filter((d)=>{
            if(this.state.search == null)
            {
              return d
            }
            else if(d.guidename.toLowerCase().includes(this.state.search.toLowerCase())){
              return d
            }
        }).map(d=>{
            return (
                <div className="col-md-5 col-sm-11">
                    <div className="box" style={{float:'left',margin:'10px'}}>
                        <div className="service-item">
                                <div className="down-content">
                                    <NavLink to={{pathname:'/profile/'+d.guidename}} className="services-item-image">
                                        <h6 style={{ margin: 0 }}>{d.guidename}</h6>
                                    </NavLink>
                                    <p style={{ margin: 0 }}>Rating {d.rating}/5</p>
                                    <p style={{ margin: 0 }}>Rs. {d.amount}</p>
                                </div>
                            <NavLink to={{
                                pathname:'/checkout',
                                state:{
                                    details:d,
                                    place:this.state.data.monument_name,
                                    city:this.state.city,
                                    date:this.state.date
                                }
                            }}><a className="btn btn-primary" href="">Book Now</a></NavLink>
                        </div>
                    </div>
                </div>
            )
        })
        return (
            <div>
                <div className="container" style={{marginTop : "10px"}}>
                    <h3 style={{textAlign:"center"}}>Book your Guides</h3>
                    {items}
                </div>
            </div>

        )
    }
}

export default Services1;