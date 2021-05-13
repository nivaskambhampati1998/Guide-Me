import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import './ProfilePage.css';

class ProfilePage extends Component {
	constructor() {
		super();
		this.state = {
			user: {
				username: null,
				email: null,
				first_name: null,
				last_name: null,
				languages: null,
				is_guide: null,
				is_tourist: null,
				is_staff: null,
				avatar: null,
			},
			rating: null,
			amount: null,
			places_known: null,
			reviews: [],
			bookings: [],
			queries: [],
		}
		this.changeHandler = this.changeHandler.bind(this);
		this.submitForm = this.submitForm.bind(this);
	}
	changeHandler(event) {
		this.setState({
			author: localStorage.getItem('username'),
			guide: this.state.user.username,
			[event.target.name]: event.target.value
		});
	}
	// Submit Form
	submitForm() {
		fetch('http://127.0.0.1:8000/reviewOnGuides/', {
			method: 'POST',
			body: JSON.stringify(this.state),
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
		})
			.then(response => response.json())
			.then((data) => console.log(data));

		this.setState({
			review: '',
			rating: ''
		});
		window.location.pathname = '/profile/' + this.state.user.username;
	}
	errmessage;

	handleLogout = () => {
		localStorage.clear();
		try {
			this.props.setUser(null);
		}
		finally {
			window.location.pathname = '/message';
			// window.location.reload();
		}
	}

	accountDelete = () => {
		const username = this.props.match.params.username;
		const config = {
			headers: {
				Authorization: localStorage.getItem('token')
			}
		};
		if (config.headers.Authorization != null) {
			axios.delete('http://localhost:8000/accounts/user/' + username + '/', config).then(
				res => {
					this.setUser(res.data);
				},
				err => {
					console.log(err)
				}
			)
		}
		this.handleLogout();
	}

	componentDidMount = () => {
		const username = this.props.match.params.username;
		const config = {
			headers: {
				Authorization: localStorage.getItem('token')
			}
		};
		if (config.headers.Authorization != null) {
			axios.get('http://localhost:8000/accounts/user/' + username + '/', config).then(
				res => {
					this.setUser(res.data);
					console.log(res.data);
					if (res.data.user.is_guide === true) {
						axios.get('http://127.0.0.1:8000/reviewOnGuides/' + username + '/', config).then(
							res => {
								this.setState({ reviews: res.data });
							},
							err => {
								console.log(err);
							}
						)
					}
					axios.get('http://127.0.0.1:8000/booking/getbooking/' + username + '/', config).then(
						res => {
							this.setState({ bookings: res.data });

						},
						err => {
							console.log(err);
						}
					)
				},
				err => {
					console.log(err)
				}
			)
		}
	}
	getqueries = e => {
		// console.log(this.state.queries.length)
		if (this.state.queries.length === 0) {
			axios.get('http://localhost:8000/contact/').then(
				res => {
					this.setState({ queries: res.data })
					console.log("...", res.data, "...")
				},
				err => {
					console.log(err)
				}
			)
		}


	}
	handleChangePassword = e => {
		e.preventDefault();
		var data = { email: this.state.user.email };
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
		this.handleLogout();
	};
	setUser = user => {
		this.setState({
			user: {
				username: user.user.username,
				email: user.user.email,
				first_name: user.user.first_name,
				last_name: user.user.last_name,
				languages: user.user.languages,
				is_guide: user.user.is_guide,
				is_tourist: user.user.is_tourist,
				avatar: user.user.avatar,
			},
			rating: user.rating,
			places_known: user.places_known,
			amount: user.amount
		});
	};

	deleteBooking(id) {
		axios.delete("http://127.0.0.1:8000/booking/getbooking/delete/" + id + '/').then(
			res => {
				console.log(res.data)
			},
			err => {
				console.log(err)
			}
		)
	}

	render() {
		let addreview, rating, profilepic, reviewtab, err, updateprofile, accountsettings;
		const username = this.props.match.params.username;
		updateprofile = '/update-profile/' + username + '/';
		profilepic = 'http://localhost:3000' + this.state.user.avatar;
		if (this.state.user.is_guide === true) {
			rating = (
				<p className="proile-rating">RATING : <span> {this.state.rating}/5</span></p>
			)
			reviewtab = (
				<h3>Reviews</h3>
			)
			if (this.state.user.username != localStorage.getItem('username'))
				addreview = (
					<table className="table table-bordered" style={{ marginTop: '100px' }}>
						<tbody>
							<tr>
								<th>Review</th>
								<td>
									<input value={this.state.review} name="review" onChange={this.changeHandler} type="text" className="form-control" />
								</td>
							</tr>
							<tr>
								<th>Rating</th>
								<td>
									<input value={this.state.rating} name="rating" min='1' max='5' onChange={this.changeHandler} type="number" className="form-control" />
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
		if (this.state.user.username === localStorage.getItem('username')) {
			accountsettings = (
				<div className="profile-work">
					<p>Account Settings</p>
					<a href=""><NavLink to={updateprofile}>Update profile</NavLink></a><br />
					<a href="">Notifications</a><br />
					<a onClick={this.handleChangePassword} href="">Change Password</a><br />
					<a onClick={this.accountDelete} href="" style={{ color: 'red' }}>Delete Account</a><br />
				</div>
			)
		}
		const book = this.state.bookings.map(d => {
			return (
				<div key={d.booking_id}>
					<blockquote>Guidename: {d.guidename}<br />Place: {d.place}<br />Booking date: {d.booking_date}</blockquote>
					<button onClick={this.deleteBooking(d.booking_id)} className='btn btn-danger'>Delete</button>
					<hr />
				</div>
			)
		})
		const reviews = this.state.reviews.reverse().map(d => {
			return (
				<div>
					<blockquote><q>{d.review}</q><br />rating:{d.rating}/5&nbsp;-{d.author}</blockquote>
					<hr />
				</div>
			)
		})
		const queries = this.state.queries.map(d => {
			return (
				<div className="col-lg-4 col-md-4 col-sm-4">
					<div className="box" style={{ margin: '10px', width: '100%' }}>
						<div className="service-item" style={{ padding: "10px" }}>
							<NavLink to={{ pathname: '/contactlist/' }} className="services-item-image">
								<div className="down-content">
									<h6>{d.subject}</h6>
									<p style={{ margin: 0, color: 'solid black' }}> {d.message}</p>
									<p style={{ textAlign: 'right', marginBottom: '10px', paddingBottom: '0px', fontSize: '10px' }}> -from {d.name}</p>
								</div>
							</NavLink>
						</div>
					</div>
				</div>

			)
		})
		if (localStorage.getItem('token') === null) {
			return (
				<div>
					<div className="container jumbotron" style={{ marginTop: '100px', marginBottom: '4%', textAlign: 'center', backgroundColor: 'lightcoral' }}>
						<h4>Please login to continue.</h4>
						<br />
						<p>Having trouble? <Link to={'/contact'}><a href="">Contact us</a></Link></p>
					</div>
				</div>
			)
		}
		const reviewData = this.state.queries;
		const rows = reviewData.reverse().map((review) =>
			<tr key={review.id}>
				<td>{review.name}</td>
				<td>{review.email}</td>
				<td>{review.subject}</td>
				<td>{review.message}</td>
				<td>
					<a href={"mailto:" + review.email + "?subject=Re: " + review.subject} className="btn btn-info mr-2">Reply</a>
					<button onClick={() => this.deleteData(review.id)} className="btn btn-danger">Delete</button>
				</td>
			</tr>
		);
		if (this.state.user.is_staff === null) {
			if(this.props.match.params.username === localStorage.getItem('username')){
				this.getqueries()
				return (
					<div>
						<div className="container" style={{ marginTop: '100px' }}>
							<h3>Welcome Admin</h3>
							<br />
							<h5>Here are some of the queries for you :)</h5>
							<table className="table table-bordered" style={{ marginTop: '100px' }}>
								<thead>
									<tr>
										<th>Name</th>
										<th>Email</th>
										<th>Subject</th>
										<th>Message</th>
										<th>Action</th>
	
									</tr>
								</thead>
								<tbody>
									{rows}
								</tbody>
							</table>
						</div>
					</div>
				)
			}
				
		}
		return (
			<div>
				{err}
				{this.errmessage}
				<div className="container emp-profile" style={{ marginTop: '100px' }}>
					<div className="row">
						<div className="col-md-4">
							<div className="profile-img">
								<img src={profilepic} style={{ height: '125px', width: '125px', borderRadius: '40%' }} alt="" />
							</div>
						</div>
						<div className="col-md-6">
							<div className="profile-head">
								<h5>
									{this.state.user.first_name} {this.state.user.last_name}
								</h5>
								<h6>
									@{this.state.user.username}
								</h6>
								{rating}
								<ul className="nav nav-tabs" id="myTab" role="tablist">
									<li className="nav-item">
										<a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">About</a>
									</li>
									<li className="nav-item">
										<a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Timeline</a>
									</li>
								</ul>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-md-4">
							{accountsettings}
						</div>
						<div className="col-md-8">
							<div className="tab-content profile-tab" id="myTabContent">
								<div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
									<div className="row">
										<div className="col-md-6">
											<label>Email</label>
										</div>
										<div className="col-md-6">
											<p>{this.state.user.email}</p>
										</div>
									</div>
									{addreview}
									{reviewtab}
									{reviews}
								</div>
								<div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
									<div className="row">
										<div className="col-md-6">
											<label>Experience</label>
										</div>
										<div className="col-md-6">
											<p>Expert</p>
										</div>
									</div>
									<div className="row">
										<div className="col-md-6">
											<label>Hourly Rate</label>
										</div>
										<div className="col-md-6">
											<p>Rs. {this.state.amount}/day</p>
										</div>
									</div>
									<div className="row">
										<div className="col-md-6">
											<label>English Level</label>
										</div>
										<div className="col-md-6">
											<p>Expert</p>
										</div>
									</div>

									<hr />
									<h2>Bookings</h2>
									{book}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}

}

export default ProfilePage;