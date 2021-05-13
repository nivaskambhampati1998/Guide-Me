import React, { Component } from 'react'
import axios from 'axios';


class Blogdetails extends Component {
    constructor(props){
        super(props)
        this.state = {
          data: []
        }
      }
    componentDidMount = () => {
      
        axios.get('http://localhost:8000/posting/'+this.props.match.params.pk).then(
          res => {
              console.log(res.data,"...........................----------------")
            var data = res.data
            this.setState({data : data})
            console.log(this.state.data)
          },
          err => {
            console.log(err)
          }
        )	
    }

    render() {
        console.log(this.state,"11111111.................  ")
        return (
            <div>
                {/* Page Content */}
                <div >
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="text-content" style={{color:"#f33f3f", textAlign:"center"}}>
                                    <h2>Blog details</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="products">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="section-heading">
        <h2>{this.state.data.title}</h2>
                                </div>
                            </div>
                            <div className="col-md-8">
        <p>{this.state.data.content}</p>
                            </div>
                            
                        </div>
                        <br />
                        <div>
                            <img src="assets/images/blog-image-fullscren-1-1920x700.jpg" className="img-fluid" alt="" />
                        </div>
                    </div>
                </div>
                <div className="send-message">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="section-heading">
                                    <h2>Leave a Comment</h2>
                                </div>
                            </div>
                            <div className="col-md-8">
                                <div className="contact-form">
                                    <form id="contact" action method="post">
                                        <div className="row">
                                            <div className="col-lg-12 col-md-12 col-sm-12">
                                                <fieldset>
                                                    <input name="name" type="text" className="form-control" id="name" placeholder="Full Name" required />
                                                </fieldset>
                                            </div>
                                            <div className="col-lg-12 col-md-12 col-sm-12">
                                                <fieldset>
                                                    <input name="email" type="text" className="form-control" id="email" placeholder="E-Mail Address" required />
                                                </fieldset>
                                            </div>
                                            <div className="col-lg-12">
                                                <fieldset>
                                                    <textarea name="message" rows={6} className="form-control" id="message" placeholder="Your Message" required defaultValue={""} />
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
                            <div className="col-md-4">
                                <div className="left-content">
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisic elit. Sed voluptate nihil eumester consectetur similiqu consectetur. Lorem ipsum dolor sit amet, consectetur adipisic elit. Et, consequuntur, modi mollitia corporis ipsa voluptate
              corrupti.</p>
                                    <br />
                                    <ul className="social-icons">
                                        <li><a href="#"><i className="fa fa-facebook" /></a></li>
                                        <li><a href="#"><i className="fa fa-twitter" /></a></li>
                                        <li><a href="#"><i className="fa fa-linkedin" /></a></li>
                                        <li><a href="#"><i className="fa fa-behance" /></a></li>
                                    </ul>
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

        )
    }
}

export default Blogdetails;