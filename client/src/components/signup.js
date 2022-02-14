import React, { Component } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import '../authStyle.scoped.css';

class SignUp extends Component {

    constructor(props)
    {
        super(props);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username : "",
            password : "",
            confirmPassword : "",
            redirect : null,
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
            username : this.state.username,
            password : this.state.password
        };

        axios
            .post("http://localhost:3000/signup", newuser)
            .then((res) => {//console.log(res.data);
                if(res.data)
                this.setState({ error : "This username has been taken" });
                else
                {
                    axios
                    .post("http://localhost:3000/getID", newuser)
                    .then((res) => { console.log(res.data);
                        this.setState({ redirect : "/home/" + res.data._id })
                        this.props.setLoggedUserID(res.data._id);
                        this.props.setLoggedUser(res.data.username);
                    });
                }
               });
        }
        else 
        { this.setState({ error : "Passwords do not match "})}

       
    }
    render() { 
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        else if (this.state.error) {
            document.getElementById("display").innerHTML = this.state.error;
        }
        return ( 
            <div className="auth-body">
            <div className="form-div">
                <h3>Sign Up</h3>
                <form onSubmit = {this.onSubmit}>
                    <div className="form-group auth-form-group">
                        <label className="auth-label">Username : </label>
                        <input
                            type="text"
                            className="form-control auth-form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}
                        />
                    </div>

                    <div className="form-group auth-form-group">
                        <label className="auth-label">Password : </label>
                        <input
                            type="password"
                            className="form-control auth-form-control"
                            value={this.state.password}
                            onChange={this.onChangePassword}
                        />
                    </div>

                    <div className="form-group auth-form-group">
                        <label className="auth-label">Confirm Password : </label>
                        <input
                            type="password"
                            className="form-control auth-form-control"
                            value={this.state.confirmPassword}
                            onChange={this.onChangeConfirmPassword}
                        />
                    </div>

                    <div className="form-group auth-form-group">
                        <input
                            type="submit"
                            value="Sign Up"
                            className="btn btn-primary"
                            style={{marginTop: 10}}
                        />
                    </div>
                </form>
                <p id="display"></p>
                <p>Already have an account? <Link to="/">Click here to log in</Link></p>
            </div>
            </div>
         );
    }
}
 
export default SignUp;