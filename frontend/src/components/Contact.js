import React, { Component } from 'react';
import * as emailjs from 'emailjs-com';
import { Button, FromFeedback, Form, FormGroup, Label, Input } from 'reactstrap';

class Contact extends React.Component{
  constructor(){
      super();
      this.state={
          name:'',
          email:'',
          subject:'',
          message:''
      }
      this.changeHandler=this.changeHandler.bind(this);
      this.submitForm=this.submitForm.bind(this);
  }

  // Input Change Handler
  changeHandler(event){
      this.setState({
          [event.target.name]:event.target.value
      });
  }

  // Submit Form
  submitForm(){
      fetch('http://127.0.0.1:8000/contact/',{
          method:'POST',
          body:JSON.stringify(this.state),
          headers:{
              'Content-type': 'application/json; charset=UTF-8',
          },
      })
      .then(response=>response.json())
      .then((data)=>console.log(data));

      this.setState({
          name:'',
          email:'',
          subject:'',
          message:''
     
      });
  }

// class Contact extends Component {
//   state = {
//     name: '',
//     email: '',
//     subject: '',
//     message: '',
//   }
//   handleSubmit(e) {
//     e.preventDefault()
//     const { name, email, subject, message } = this.state
//     let templateParams = {
//       from_name: email,
//       to_name: 'YOUR_EMAIL_ID',
//       subject: subject,
//       message_html: message,
//     }
//     emailjs.send(
//       'gmail',
//       'template_XXXXXXXX',
//       'templateparams',
//       'user_XXXXXXXXXXXXXXXXXX'
//     )
//     this.resetForm()
//   }
//   resetForm() {
//     this.setState({
//       name: '',
//       email: '',
//       subject: '',
//       message: '',
//     })
//   }
//   handleChange = (param, e) => {
//     this.setState({ [param]: e.target.value })
//   }
//   submitForm(){
//     fetch('http://127.0.0.1:8000/contact/',{
//         method:'POST',
//         body:JSON.stringify(this.state),
//         headers:{
//             'Content-type': 'application/json; charset=UTF-8',
//         },
//     })
//     .then(response=>response.json())
//     .then((data)=>console.log(data));

//     this.setState({
//         name: '',
//         email: '',
//         subject: '',
//         message: '',
   
//     });
//   }

  render() {
    return (
      <div>
        <div className="page-heading contact-heading header-text" style={{ backgroundImage: 'url(assets/images/heading-4-1920x500.jpg)' }}>
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="text-content">
                  <h4></h4>
                  <h2>Contact Us</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="find-us">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="section-heading">
                  <h2>Our Location on Maps</h2>
                </div>
              </div>
              <div className="col-md-8">
                {/* How to change your own map point
	1. Go to Google Maps
	2. Click on your location point
	3. Click "Share" and choose "Embed map" tab
	4. Copy only URL and paste it within the src="" field below
*/}
                <div id="map">
                  <iframe src="https://maps.google.com/maps?q=Av.+L%C3%BAcio+Costa,+Rio+de+Janeiro+-+RJ,+Brazil&t=&z=13&ie=UTF8&iwloc=&output=embed" width="100%" height="330px" frameBorder={0} style={{ border: 0 }} allowFullScreen />
                </div>
              </div>
              <div className="col-md-4">
                <div className="left-content">
                  <h4>About our office</h4>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisic elit. Sed voluptate nihil eumester consectetur similiqu consectetur.<br /><br />Lorem ipsum dolor sit amet, consectetur adipisic elit. Et, consequuntur, modi mollitia corporis ipsa voluptate
              corrupti.</p>
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
        <div className="send-message">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="section-heading">
                  <h2>Send us a Message</h2>
                </div>
              </div>
              <div className="col-md-8">
                <div className="contact-form">
                  <form id="contact" onSubmit={this.submitForm}>
                    <div className="row">
                      <FormGroup className="col-lg-12 col-md-12 col-sm-12" controlId="formBasicName">
                        <Label className="text-muted">Name</Label>
                        <Input className="form-control"
                          type="text"
                          name="name"
                          value={this.state.name}
                          className="text-primary"
                          onChange={this.changeHandler}
                          placeholder="Name"
                        />
                      </FormGroup>
                      <FormGroup className="col-lg-12 col-md-12 col-sm-12" controlId="formBasicEmail">
                        <Label className="text-muted">Email address</Label>
                        <Input className="form-control"
                          type="email"
                          name="email"
                          value={this.state.email}
                          className="text-primary"
                          onChange={this.changeHandler}
                          placeholder="Enter email"
                        />
                      </FormGroup>
                      <FormGroup className="col-lg-12 col-md-12 col-sm-12" controlId="formBasicSubject">
                        <Label className="text-muted">Subject</Label>
                        <Input className="form-control"
                          type="text"
                          name="subject"
                          className="text-primary"
                          value={this.state.subject}
                          onChange={this.changeHandler}
                          placeholder="Subject"
                        />
                      </FormGroup>
                      <FormGroup className="col-lg-12" controlId="formBasicMessage">
                        <Label className="text-muted">Message</Label>
                        <Input className="form-control"
                          type="textarea"
                          name="message"
                          className="text-primary"
                          value={this.state.message}
                          onChange={this.changeHandler}
                        />
                      </FormGroup>
                      <div className="col-lg-12">
                        <fieldset>
                          <Button type="submit"  className="filled-button">Send Message</Button>
                        </fieldset>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="col-md-4">
                <img src="assets/images/team_01.jpg" className="img-fluid" alt="" />
                <h5 className="text-center" style={{ marginTop: '15px' }}>Venkatesh</h5>
              </div>
            </div>
          </div>
        </div>
      </div>

    )
  }
}

export default Contact;