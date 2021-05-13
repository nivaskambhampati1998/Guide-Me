import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import './CheckOut.css';

import {
    Elements,
} from '@stripe/react-stripe-js';
  
import {loadStripe} from "@stripe/stripe-js/pure";
import CheckoutForm from "./CheckoutForm";
  
  

class CheckOut extends Component{

    state = {}
	stripePromise = loadStripe('pk_test_51Hss5uLJ8P6R9SpjsBrPMTyoyO7L5zIWcP2W8Q8P61VPGI4m6cf7pZUvqdnvmMTstbDxtaidBdApDAMlAzykmT4N00nZpt9Rm9');
    render(){
        return(
            <div>
                <Elements stripe={this.stripePromise}>
					<CheckoutForm state={this.props.history.location.state} />
				</Elements>
            </div>
        )
    }
}

export default CheckOut;