import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import axios from 'axios';

export class Footer extends Component {

    render(){
    return (
        <div>
            <footer className="container-fluid">
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
        </div>
    )
  }
}

export default Footer;