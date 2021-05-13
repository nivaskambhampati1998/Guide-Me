import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {Redirect} from 'react-router-dom';
import axios from 'axios';

class BlogWriting extends Component {

    constructor(props) {
        super(props);
        this.autocompleteInput = React.createRef();
        this.autocomplete = null;
    }
  state = {
    blogdata: { user:null, city: '', title: '', content:null },
  }
  register = event => {
      
      axios.get('http://localhost:8000/accounts/user/'+localStorage.getItem('username')+'/').then(
          res=>{
            console.log(res)
            this.setState({user: res.data})
          }
      )
      var data = this.state.blogdata;
      axios.post('http://localhost:8000/posting/', data).then(
      res => {
        console.log(res)
      })
  }
  inputChanged = event => {
    const cred = this.state.blogdata;
    if (event.target.name === 'title' || event.target.name === 'content' || event.target.name === 'city') {
      cred[event.target.name] = event.target.value;
      this.setState({ blogdata: cred });
    }
  }

  componentDidMount = () => {
      	
  }
 
  


render(){
    return(
        <div>
            <div className="page-heading about-heading header-text" style={{ backgroundImage: 'url(assets/images/heading-6-1920x500.jpg)' }}>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="text-content">
                                    <h4 />
                                    <h2>Blog details</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="send-message">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-10">
                                <div className="contact-form">
                                    <form id="contact" action method="post">
                                        <div className="row">
                                            <div className="col-lg-12 col-md-12 col-sm-12">
                                                <fieldset>
                                                    <input name="name" type="text" className="form-control" style={{border:'1px solid black', borderRadius:'10px'}} id="name" placeholder="Title" required />
                                                </fieldset>
                                            </div>
                                            <div className="col-lg-12 col-md-12 col-sm-12">
                                                <fieldset>
                                                    <input name="name" type="text" className="form-control" style={{border:'1px solid black', borderRadius:'10px'}} id="name" placeholder="City" required />
                                                </fieldset>
                                            </div>
                                            <div className="col-lg-12">
                                                <fieldset>
                                                    <textarea name="message" rows={12} className="form-control" style={{border:'1px solid black', borderRadius:'10px'}} id="message" placeholder="Your content" required defaultValue={""} />
                                                </fieldset>
                                            </div>
                                            <div className="col-lg-12">
                                                <fieldset>
                                                    <button type="submit" id="form-submit" className="filled-button">Submit</button>
                                                </fieldset>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
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
                <div className="modal fade" id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Book Now</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="contact-form">
                                    <form action="#" id="contact">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <fieldset>
                                                    <input type="text" className="form-control" placeholder="Pick-up location" required />
                                                </fieldset>
                                            </div>
                                            <div className="col-md-6">
                                                <fieldset>
                                                    <input type="text" className="form-control" placeholder="Return location" required />
                                                </fieldset>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <fieldset>
                                                    <input type="text" className="form-control" placeholder="Pick-up date/time" required />
                                                </fieldset>
                                            </div>
                                            <div className="col-md-6">
                                                <fieldset>
                                                    <input type="text" className="form-control" placeholder="Return date/time" required />
                                                </fieldset>
                                            </div>
                                        </div>
                                        <input type="text" className="form-control" placeholder="Enter full name" required />
                                        <div className="row">
                                            <div className="col-md-6">
                                                <fieldset>
                                                    <input type="text" className="form-control" placeholder="Enter email address" required />
                                                </fieldset>
                                            </div>
                                            <div className="col-md-6">
                                                <fieldset>
                                                    <input type="text" className="form-control" placeholder="Enter phone" required />
                                                </fieldset>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                <button type="button" className="btn btn-primary">Book Now</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
      );
}

}

export default BlogWriting;