import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

class UpdateProfile extends Component {

    state = {
        user:{
            first_name: null,
            last_name: null,
            languages: null,
            avatar: null,
        }
    }
    image=false;
    completed = false;
    componentDidMount = () => {
        const username = this.props.match.params.username;
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        if (localStorage.getItem('token') != null) {
            axios.get('http://localhost:8000/accounts/user/' + username + '/', config).then(
                res => {
                    this.updateUser(res.data);
                },
                err => {
                    console.log(err)
                }
            )
        }
    }
    updateUser = user => {
        this.setState({
            user:{
                first_name: user.user.first_name,
                last_name: user.user.last_name,
                languages: user.user.languages,
                avatar: user.user.avatar,
            }
        });
    };

    inputChanged = event => {
        const cred = this.state.user;
        if(event.target.name === 'avatar'){
            this.image = true;
            cred[event.target.name] = event.target.files[0];
        }
        else{
            cred[event.target.name] = event.target.value;
        }
        this.setState({user:cred});
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
            }
        };
        var data = this.state.user;
        const username = this.props.match.params.username;
        if (localStorage.getItem('token') != null) {
            let form_data = new FormData()
            form_data.append('first_name',this.state.user.first_name);
            form_data.append('last_name',this.state.user.last_name);
            form_data.append('languages',this.state.user.languages);
            if(this.image === true){
                form_data.append('avatar',this.state.user.avatar);
            }
            console.log(form_data);
            axios.post('http://localhost:8000/accounts/update-profile-user/' + username + '/', form_data, config)
            .then(res => {
                this.completed = true;
            })
            .catch(err => {
                console.log(err)
            })
        }
    }
    render() {
        if(this.completed === true){
            let profileurl = '/profile/'+localStorage.getItem('username')+'/';
            console.log(profileurl);
            return <Redirect to={profileurl} />
        }
        let profilepic;
        profilepic = 'http://localhost:3000'+this.state.user.avatar;
        return (
            <div>
                <div className="col-md-8 col-sm-6 col-xs-12 personal-info" style={{marginTop:'100px'}}>
                    <h3>Update your profile</h3>
                    <form className="form-horizontal" onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label className="col-lg-3 control-label">First name:</label>
                            <div className="col-lg-8">
                                <input className="form-control" value={this.state.user.first_name} onChange={this.inputChanged} name="first_name" type="text" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-lg-3 control-label">Last name:</label>
                            <div className="col-lg-8">
                                <input className="form-control" value={this.state.user.last_name} onChange={this.inputChanged} name="last_name" type="text" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-lg-3 control-label">Languages Known:</label>
                            <div className="col-lg-8">
                                <input className="form-control" value={this.state.user.languages} onChange={this.inputChanged} name="languages" type="text" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-lg-3 control-label">Profile Pic:</label>
                            <div className="col-lg-8">
                                <input type="file" onChange={this.inputChanged}  name="avatar" />
                            </div>
                        </div>
                        <div class="col-md-8">
                            <input class="btn btn-primary" value="Save Changes" type="submit"/>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default UpdateProfile;