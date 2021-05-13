import React, { Component } from 'react'
import axios from 'axios';

class PlaceDetail extends Component {
    constructor(props){
        super(props)
        this.state = {
            days: [],
            data: []
        }
      }
    componentDidMount = () => {
      
        axios.get('http://localhost:8000/places/'+this.props.match.params.monument_id).then(
          res => {
            var data = res.data
            this.setState({data : data})
            var city = data.city.slice(0, data.city.indexOf(","))
            const weatherURL = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&APPID=ac1fc125c6cac921012ddf10347ad8d9`
            fetch(weatherURL)
            .then(res => res.json())
            .then(d => {
                if(d.cod != 404){
                    const dailyData = d.list.filter(reading => reading.dt_txt.includes("12:00:00"))
                    this.setState({days: dailyData})
                }
            })
          },
          err => {
            console.log(err)
          }
        )	
    }

    
    render() {
        let image;
        image = 'http://localhost:3000'+this.state.data.image;
        return (
            <div>
                {/* Page Content */}
                
                <div className="page-heading about-heading header-text" style={{ backgroundImage: 'url(assets/images/heading-6-1920x500.jpg)' }}>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="text-content" style={{textAlign:"center" , color:"#f33f3f"}}>
                                    <h2>Place details</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {this.formatCards()}
                <br/>
                <div className="products">
                    <div className="container">
                        <div className="row">
                            <div className='col-md-4'>
                                <img src={image} className="img-fluid" alt="" />
                            </div>
                            <div className="col-md-8">
                                <h2>{this.state.data.monument_name}</h2>
                                <hr/>
                                <h6>{this.state.data.city}</h6>
                                <br />
                                <p>{this.state.data.description}</p>
                            </div>
                            
                        </div>
                        <br />
                    </div>
                </div>
                <footer>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="inner-content">
                                    <p>Copyright © 2020 Company Name - Template by: <a href="https://www.phpjabbers.com/">PHPJabbers.com</a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
                {/* Modal */}
                
            </div>

        )
    }
}

export default PlaceDetail;