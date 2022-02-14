import React, { Component } from 'react';
import axios from 'axios';

class EditProfile extends Component {
    constructor (props) {
        super (props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            username : "",
            password : "",
            confirmPassword : "",
            error : null
        };
    }
    
    onChangeUsername(e) {
        this.setState ({username : e.target.value})
    }

    onChangePassword(e) {
        this.setState ({password : e.target.value})
    }

    onChangeConfirmPassword(e) {
        this.setState ({confirmPassword : e.target.value})
    }

    onSubmit(e){
        e.preventDefault();

        if (this.state.password===this.state.confirmPassword)
        {
        const newuser = {
            userID : this.props.loggedUserID,
            username : this.state.username,
            password : this.state.password
        };

        axios
            .post("http://localhost:3000/searchuser", newuser)
            .then((res) => {//console.log(res.data);
                if(res.data)
                this.setState({ error : "This username has been taken" });
                else
                {
                    axios
                    .post("http://localhost:3000/editprofile", newuser)
                    .then((res) => { console.log(res.data);
                        this.setState({ error: "changes saved successfully" })
                        //this.props.setLoggedUserID(res.data._id);
                        this.props.setLoggedUser(res.data.username);
                    });
                }
               });
        }
        else 
        { this.setState({ error : "Passwords do not match "})}

       
    }
    render() { 
        if (this.state.error) {
            document.getElementById("display").innerHTML = this.state.error;
        }
        return ( 
            <div>
            <div>
                <h3>Edit Profile</h3>
                <form onSubmit = {this.onSubmit}>
                    <div className="form-group">
                        <label className="edit-label">New Username: </label>
                        <input
                            type="text"
                            className="form-control auth-form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}
                        />
                    </div>

                    <div className="form-group">
                        <label className="edit-label"> New Password: </label>
                        <input
                            type="password"
                            className="form-control auth-form-control"
                            value={this.state.password}
                            onChange={this.onChangePassword}
                        />
                    </div>

                    <div className="form-group">
                        <label className="edit-label">Confirm New Password: </label>
                        <input
                            type="password"
                            className="form-control auth-form-control"
                            value={this.state.confirmPassword}
                            onChange={this.onChangeConfirmPassword}
                        />
                    </div>

                    <div className="form-group">
                        <input
                            type="submit"
                            value="Save Changes"
                            className="btn btn-primary edit-user-btn"
                            style={{marginTop: 10}}
                        />
                    </div>
                </form>
                <p id="display"></p>
            </div>
            </div>
         );
    }
}
 
export default EditProfile;