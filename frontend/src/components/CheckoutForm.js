import {CardElement, useElements, useStripe} from "@stripe/react-stripe-js";
import React, {useState} from "react";
import { Redirect } from "react-router-dom";
import ApiService from "../api";


// import './App.css';



  const handleClick = () => {
    var gapi = window.gapi
    /* 
      Update with your own Client Id and Api key 
    */
   console.log("Calender test")
    var CLIENT_ID = "924935785238-086fasifqa45foo7n3ms4im4hko82l7v.apps.googleusercontent.com"
    var API_KEY = "AIzaSyATna9b1YZCPR_erly-Rs3wvzdYl_COryI"
    var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"]
    var SCOPES = "https://www.googleapis.com/auth/calendar.events"
    gapi.load('client:auth2', () => {
      console.log('loaded client')

      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      })

      gapi.client.load('calendar', 'v3', () => console.log('bam!'))

      gapi.auth2.getAuthInstance().signIn()
      .then(() => {
        
        var event = {
          'summary': 'Awesome Event!',
          'location': '800 Howard St., San Francisco, CA 94103',
          'description': 'Really great refreshments',
          'start': {
            'dateTime': '2020-12-13T09:00:00-07:00',
            'timeZone': 'IST'
          },
          'end': {
            'dateTime': '2020-12-14T17:00:00-07:00',
            'timeZone': 'IST'
          },
          'recurrence': [
            'RRULE:FREQ=DAILY;COUNT=2'
          ],
          'attendees': [
            {'email': 'sriranga@iiits.in'},
            {'email': 'sriranga@gmail.com'}
          ],
          'reminders': {
            'useDefault': false,
            'overrides': [
              {'method': 'email', 'minutes': 24 * 60},
              {'method': 'popup', 'minutes': 10}
            ]
          }
        }

        var request = gapi.client.calendar.events.insert({
          'calendarId': 'primary',
          'resource': event,
        })

        request.execute(event => {
          console.log(event)
          window.open(event.htmlLink)
        })
        

        /*
            Uncomment the following block to get events
        */
        /*
        // get events
        gapi.client.calendar.events.list({
          'calendarId': 'primary',
          'timeMin': (new Date()).toISOString(),
          'showDeleted': false,
          'singleEvents': true,
          'maxResults': 10,
          'orderBy': 'startTime'
        }).then(response => {
          const events = response.result.items
          console.log('EVENTS: ', events)
        })
        */
    

      })
    })
  }


const CheckoutForm = (props) => {
        const [error, setError] = useState(null);
        const [email, setEmail] = useState('');
        const stripe = useStripe();
        const elements = useElements();

        // Handle real-time validation errors from the card Element.
        const handleChange = (event) => {
            if (event.error) {
                setError(event.error.message);
            } else {
                setError(null);
            }
        }

        // Handle form submission.
        const handleSubmit = async (event) => {
                event.preventDefault();
                const card = elements.getElement(CardElement);

                const {paymentMethod, error} = await stripe.createPaymentMethod({
                    type: 'card',
                    card: card,
                });
                console.log(paymentMethod)
                // this.handleClick()
                if (error) {
                    setError(error.response.data)
                }
                else {
                    console.log(props);
                    ApiService.saveStripeInfo({
                        email,
                        guidename:props.state.details.guidename,
                        username:localStorage.getItem('username'),
                        date:props.state.date,
                        amount:props.state.details.amount,
                        place:props.state.place,
                        city:props.state.city,
                        payment_method_id: paymentMethod.id
                    }).then(response => {
                        console.log(response)
                        if(response.status === 200){
                            window.location.pathname = '/';
                            // this.handleClick()
                        }
                    }).catch(error => {
                        console.log(error)
                    })
                }
            }
        ;

        return (
            <form onSubmit={handleSubmit} className="stripe-form">
                <div className="form-row">
                    <button onClick={handleClick}></button>
                    <label htmlFor="email">
                        Email Address
                    </label>
                    <input
                        className="form-input"
                        id="email"
                        name="name"
                        type="email"
                        placeholder="jenny.rosen@example.com"
                        required
                        value={email}
                        onChange={(event) => {
                            setEmail(event.target.value);
                        }}
                    />
                </div>
                <div className="form-row">
                    <label htmlFor="card-element">
                        Credit or debit card
                    </label>
                    {}
                    <CardElement
                        id="card-element"
                        onChange={handleChange}
                    />
                    <div className="card-errors" role="alert">{error}</div>
                </div>
                <button type="submit" className="submit-btn">Submit Payment</button>
            </form>
        );

    }
;

export default CheckoutForm;