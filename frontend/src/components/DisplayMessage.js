import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom';   

export class DisplayMessage extends Component {
    render() {
        return (
            <div>
                <div className="container jumbotron" style={{marginTop:'100px',marginBottom:'4%',textAlign:'center',backgroundColor: '#bbf0a3'}}>
                    <h4>Please Check your email for further instructions.</h4>
                    <br />
                    <p>Having trouble? <Link to={'/contact'}><a href="">Contact us</a></Link></p>
                </div>
            </div>
        )
    }
}

export default DisplayMessage;