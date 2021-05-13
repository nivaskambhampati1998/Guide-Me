import React, { Component } from 'react';
import './bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import Home from './components/Home';
import Login from './components/Login';
import RegisterGuide from './components/RegisterGuide';
import RegisterTourist from './components/RegisterTourist';
import ResetPassword from './components/ResetPassword';
import ResetPasswordConfirm from './components/ResetPasswordConfirm';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CheckOut from './components/CheckOut';

import Contact from './components/Contact';
import ContactList from './components/ContactList';
import Blog from './components/Blog';
import Place from './components/Place';
import ProfilePage from './components/ProfilePage';
import Testimonial from './components/Testimonial';
import Blogdetails from './components/Blogdetails';
import PlaceDetail from './components/PlaceDetail';
import UpdateProfile from './components/UpdateProfile';
import DisplayMessage from './components/DisplayMessage';
import PostMonument from './components/PostMonument';
import './App.css';

import ReviewsOnPlaces from './components/ReviewsOnPlaces';
import AddReviewOnPlaces from './components/AddReviewsOnPlaces';
import UpdateReviewOnPlaces from './components/UpdateReviewOnPlaces';
import ReviewsOnGuides from './components/ReviewsOnGuides';
import AddReviewsOnGuides from './components/AddReviewsOnGuides';
import UpdateReviewsOnGuides from './components/UpdateReviewsOnGuides';
import BlogWriting from './components/BlogWriting';



class App extends Component {
	state = {
		user:null,
	}
	
	componentDidMount = () => {
		const config = {
			headers: {
				Authorization: localStorage.getItem('token')
			}
		};

		if(config.headers.Authorization != null){
			axios.get('http://localhost:8000/accounts/user/' + localStorage.getItem('username') + '/', config).then(
				res => {
					console.log(res);
					this.setUser(res.data);
				},
				err => {
					console.log(err)
				}
			)
		}
	};
	setUser = user => {
		console.log(user)
		this.setState({
			user: user
		});
	};


	render() {
		let username = '/profile/'+localStorage.getItem('username');
		return (
			<div>
				<Router>
					<Navbar user={this.state.user} setUser={this.setUser} username={username}/>
					<Switch>
						<Route exact path='/' component={Home} />
						<Route path='/login' component={() => <Login setUser={this.setUser} />} />
						<Route path='/registerGuide' component={RegisterGuide} />
						<Route path='/registerTourist' component={RegisterTourist} />
						<Route path='/accounts/password-reset/' component={ResetPassword} />
						<Route path='/accounts/password-reset/:uidb64/:token/' component={ResetPasswordConfirm} />

						<Route path='/profile/:username/' setUser={this.setUser} component={ProfilePage} />
						<Route path='/update-profile/:username/' setUser={this.setUser} component={UpdateProfile} />
						<Route path='/blog' component={Blog} />
						<Route path='/blogWriting' component={BlogWriting} />
						<Route path='/blogdetails/:pk' component={Blogdetails} />
						<Route path='/place' component={Place} />
						<Route path='/placedetails/:monument_id' component={PlaceDetail} />
						<Route path='/addPlace' component={PostMonument} />
						<Route path='/testimonial' component={Testimonial} />
						<Route path='/message' component={DisplayMessage} />
						<Route path='/contact' component={Contact} />
						<Route path='/contactlist' component={ContactList} />
						<Route path='/login' component={Login} />
						<Route path='/checkout' component={CheckOut} />
						<div className="container">
							<Route path="/reviewOnPlaces" component={ReviewsOnPlaces} exact />
							<Route path="/reviewOnPlaces/add" component={AddReviewOnPlaces} />
							<Route path="/reviewOnPlaces/update/:id" component={UpdateReviewOnPlaces} />
							<Route path="/reviewOnGuides" component={ReviewsOnGuides} exact />
							<Route path="/reviewOnGuides/add" component={AddReviewsOnGuides} />
							<Route path="/reviewOnGuides/update/:id" component={UpdateReviewsOnGuides} />
						</div>
					</Switch>
					<Footer />
				</Router>
			</div>
		);
	}
}

export default App;
