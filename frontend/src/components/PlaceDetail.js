import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import WeatherCard from './WeatherCard';

class PlaceDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            days: [],
            guides: [],
            data: [],
            date: '',
            city: '',
            search: null,
            author: '',
            place: '',
            details: '',
            review: '',
            reviews:[]
        }
        this.changeHandler = this.changeHandler.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }
    // Input Change Handler
    changeHandler(event) {
        this.setState({
            author: localStorage.getItem('username'),
            place: this.state.data.monument_name,
            [event.target.name]: event.target.value
        });
    }

    // Submit Form
    submitForm() {
        fetch('http://127.0.0.1:8000/reviewOnPlaces/', {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then(response => response.json())
            .then((data) => console.log(data));

        window.location.pathname = '/placedetails/' + this.props.match.params.monument_id;
    }

    componentDidMount = () => {

        axios.get('http://localhost:8000/places/' + this.props.match.params.monument_id).then(
            res => {
                var data = res.data
                var city = data.city.slice(0, data.city.indexOf(","))
                var today = new Date();
                var dd = String(today.getDate()).padStart(2, '0');
                var mm = String(today.getMonth() + 1).padStart(2, '0');
                var yyyy = today.getFullYear();

                today = yyyy + '-' + mm + '-' + dd;
                this.setState({ data: data, city: city, date: today })

                if (localStorage.getItem('token')) {

                    console.log(this.state.city, '--', this.state.date)

                    axios.get('http://localhost:8000/booking/' + this.state.city + '/' + this.state.date).then(
                        res => {
                            this.setState({ guides: res.data })
                            console.log(this.state.guides)
                        },
                        err => {
                            console.log(err)
                        }
                    )
                }

                const weatherURL = `http://api.openweathermap.org/data/2.5/forecast?q=${this.state.city}&units=metric&APPID=ac1fc125c6cac921012ddf10347ad8d9`
                fetch(weatherURL)
                    .then(res => res.json())
                    .then(d => {
                        if (d.cod != 404) {
                            const dailyData = d.list.filter(reading => reading.dt_txt.includes("12:00:00"))
                            this.setState({ days: dailyData })
                        }
                    })
            },
            err => {
                console.log(err)
            }
        )
        axios.get('http://127.0.0.1:8000/reviewOnPlaces/city/'+this.props.match.params.monument_id).then(
            res=>{
                this.setState({reviews:res.data});
            },
            err=>{
                console.log(err);
            }
        )
    }

    inputChanged = (event) => {
        this.setState({ date: event.target.value })
    }
    Submitted = (event) => {
        event.preventDefault();

        console.log('http://localhost:8000/booking/' + this.state.city + '/' + this.state.date)

        axios.get('http://localhost:8000/booking/' + this.state.city + '/' + this.state.date).then(
            res => {
                this.setState({ guides: res.data })
                console.log(res.data);
            },
            err => {
                console.log(err)
            }
        )
        console.log(this.state)
    }
    searchSpace = (event) => {
        let keyword = event.target.value;
        this.setState({ search: keyword })
    }
    formatCards = () => {
        return this.state.days.map((day, index) => <WeatherCard day={day} key={index} />)
    }
    render() {
        let guideslist, datecal, datesearch;
        if (localStorage.getItem('token')) {
            datecal = (
                <div className="col-lg-6 col-md-12 col-sm-12 " style={{ minWidth: '100%', marginLeft: '22%', marginTop: '20px' }} >
                    <form onSubmit={this.Submitted}>
                        <h5>Date Availability</h5>
                        <input type='text' placeholder="Date in yyyy-mm-dd" style={{ width: '89px', border: '#f33f3f' }} onChange={this.inputChanged} value={this.state.date} autoFocus />
                    </form>
                </div>
            )
            datesearch = (
                <div>
                    <div className="form-group">
                        <h5>Guide Search</h5>
                    </div>
                    <div className="row">
                        <div className="col-8">
                            <input type="text" placeholder="Search Keywords" onChange={(e) => this.searchSpace(e)} style={{ border: 'none', backgroundColor: '#f33f3f99', color: 'white', padding: '12px 20px', margin: '8px 0', boxSizing: 'border-box', borderRadius: '5%' }} />
                        </div>
                    </div>
                </div>
            )
        }
        else {
            guideslist = (
                <div>
                    <div className="container jumbotron" style={{ marginTop: '100px', marginBottom: '4%', textAlign: 'center', backgroundColor: 'lightcoral' }}>
                        <h4>Please login to check the guide availability.</h4>
                        <br />
                        <p>Having trouble? <NavLink to={'/contact'}><a href="">Contact us</a></NavLink></p>
                    </div>
                </div>
            )
        }
        console.log(this.state.guides)
        const items = this.state.guides.filter((d) => {
            if (this.state.search == null) {
                return d
            }
            else if (d.guidename.toLowerCase().includes(this.state.search.toLowerCase())) {
                return d
            }
        }).map(d => {
            console.log(this.state.date)
            return (
                <div className="col-md-5 col-sm-11">
                    <div className="box" style={{ width: '150px', float: 'left', margin: '10px' }}>
                        <div className="service-item">
                            <div className="down-content">
                                <NavLink to={{ pathname: '/profile/' + d.guidename }} className="services-item-image">
                                    <h6 style={{ margin: 0 }}>{d.guidename}</h6>
                                </NavLink>
                                <p style={{ margin: 0 }}>Rating {d.rating}/5</p>
                                <p style={{ margin: 0 }}>Rs. {d.amount}</p>
                            </div>
                            <NavLink to={{
                                pathname: '/checkout',
                                state: {
                                    details: d,
                                    place: this.state.data.monument_name,
                                    city: this.state.city,
                                    date: this.state.date
                                }
                            }}><a className="btn btn-primary" href="">Book Now</a></NavLink>
                        </div>
                    </div>
                </div>
            )
        })
        console.log(this.state.reviews)
        const reviews = this.state.reviews.reverse().map(d=>{
            return (
				<div>
					<blockquote><h5>{d.details}</h5><br/><q>{d.review}</q><br/>&nbsp;-{d.author}</blockquote>
					<hr />
				</div>
			)
		})
        let addreview;
        if (localStorage.getItem('username') != null) {
            addreview = (
                <table className="table table-bordered">
                    <tbody>
                        <tr>
                            <th>Details</th>
                            <td>
                                <input value={this.state.details} name="details" onChange={this.changeHandler} type="text" className="form-control" />
                            </td>
                        </tr>
                        <tr>
                            <th>Review</th>
                            <td>
                                <input value={this.state.review} name="review" onChange={this.changeHandler} type="text" className="form-control" />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2">
                                <input type="submit" onClick={this.submitForm} className="btn btn-dark" />
                            </td>
                        </tr>
                    </tbody>
                </table>
            )
        }
        let image;
        image = 'http://localhost:3000' + this.state.data.image;
        return (
            <div>
                {/* Page Content */}

                <div className="page-heading about-heading header-text" style={{ backgroundImage: 'url(assets/images/heading-6-1920x500.jpg)' }}>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="text-content">
                                    <h4 />
                                    <h2>Place details</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6 col-md-12 col-sm-12 " style={{ minWidth: '100%', marginLeft: '22%', marginTop: '20px' }}>
                    {this.formatCards()}
                </div>
                {datecal}
                <br />
                <div className="products" style={{ marginTop: '250px' }}>
                    <div className="container">
                        <div className="row">
                            <div className='col-md-4'>
                                <img src={image} className="img-fluid" alt="" />
                            </div>
                            <div className="col-md-8">
                                <h2>{this.state.data.monument_name}</h2>
                                <hr />
                                <h6>{this.state.data.city}</h6>
                                <br />
                                <p>{this.state.data.description}</p>
                            </div>

                        </div>
                        <br />
                    </div>
                </div>
                <div className="container">
                    {datesearch}
                    {items}
                    {guideslist}
                </div>
                {/* Modal */}
                <div className="container" style={{marginTop:'250px'}}>
                    <h2>Reviews</h2>
                    {addreview}
                    {reviews}
                </div>
            </div>

        )
    }
}

export default PlaceDetail;