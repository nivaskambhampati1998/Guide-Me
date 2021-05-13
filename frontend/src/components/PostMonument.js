import React, { Component } from 'react';
import { Link,Redirect } from 'react-router-dom';
import axios from 'axios';

class PostMonument extends Component {
    state = {
        credentials: { monument_name: '', city: '', basicinfo: '', description: '', image: null },
        completed : false,
    }
    inputChanged = event => {
        const cred = this.state.credentials;
        if (event.target.name === 'image') {
            this.image = true;
            cred[event.target.name] = event.target.files[0];
        }
        else {
            cred[event.target.name] = event.target.value;
        }
        this.setState({ credentials: cred });
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
            }
        };
        if (localStorage.getItem('token') != null) {
            let form_data = new FormData()
            form_data.append('monument_name', this.state.credentials.monument_name);
            form_data.append('city', this.state.credentials.city);
            form_data.append('basicinfo', this.state.credentials.basicinfo);
            form_data.append('description', this.state.credentials.description);
            form_data.append('image', this.state.credentials.image);
            console.log(form_data);
            axios.post('http://localhost:8000/places/add/', form_data, config)
                .then(res => {
                    this.setState({completed:true});
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }
    constructor(props) {
        super(props);
        this.autocompleteInput = React.createRef();
        this.autocomplete = null;
        this.handlePlaceChanged = this.handlePlaceChanged.bind(this);
    }

    componentDidMount() {
        const google = window.google;
        this.autocomplete = new google.maps.places.Autocomplete(this.autocompleteInput.current,
            { "types": ["geocode"] });

        this.autocomplete.addListener('place_changed', this.handlePlaceChanged);
    }

    handlePlaceChanged() {
        const place = this.autocomplete.getPlace();
        const cred = this.state.credentials;
        cred['city'] = place.formatted_address;
        this.setState({ credentials: cred });
    }
    render() {
        if(this.state.completed){
            window.location.pathname= '/place';
        }
        if(localStorage.getItem('token') === null){
            return (
                <div>
                    <div className="container jumbotron" style={{marginTop:'100px',marginBottom:'4%',textAlign:'center',backgroundColor: 'lightcoral'}}>
                        <h4>Please login to continue.</h4>
                        <br />
                        <p>Having trouble? <Link to={'/contact'}><a href="">Contact us</a></Link></p>
                    </div>
                </div>
            )
        }
        return (
            <div>
                <div className="col-md-8 col-sm-6 col-xs-12 personal-info" style={{ marginTop: '100px' }}>
                    <h3>Add a place</h3>
                    <form className="form-horizontal" onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label className="col-lg-3 control-label">Place name:</label>
                            <div className="col-lg-8">
                                <input className="form-control" value={this.state.credentials.monument_name} onChange={this.inputChanged} name="monument_name" type="text" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-lg-3 control-label">City:</label>
                            <div className="col-lg-8">
                                <input className="form-control" 
                                    ref={this.autocompleteInput}  
                                    id="autocomplete"
                                    value={this.state.credentials.city} onChange={this.inputChanged} name="city" type="text" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-lg-3 control-label">Short description:</label>
                            <div className="col-lg-8">
                                <input className="form-control" value={this.state.credentials.basicinfo} onChange={this.inputChanged} name="basicinfo" type="text" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-lg-3 control-label">Description:</label>
                            <div className="col-lg-8">
                                <textarea className="form-control" value={this.state.credentials.description} onChange={this.inputChanged} name="description" type="message" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-lg-3 control-label">Images:</label>
                            <div className="col-lg-8">
                                <input type="file" onChange={this.inputChanged} name="image" required />
                            </div>
                        </div>
                        <div class="col-md-8">
                            <input class="btn btn-primary" value="Save Changes" type="submit" />
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
export default PostMonument;
