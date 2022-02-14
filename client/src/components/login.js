import React, { Component } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import '../authStyle.scoped.css';

class LogIn extends Component {

    constructor(props)
    {
        super(props);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username : this.props.loggedUser,
            password : "",
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

    onSubmit(e){
        e.preventDefault();
        const newuser = {
            username : this.state.username,
            password : this.state.password
        };

        axios
            .post("http://localhost:3000/login", newuser)
            .then((res) => {console.log(res.data);
                 if (res.data) 
                 {
                    this.props.setLoggedUser(this.state.username); 
                    this.props.setLoggedUserID(res.data._id);
                    this.setState({ redirect : "/home/" + this.props.loggedUserID })
                 }
                 else
                 this.setState({ error : "Incorrect username or password" });
                });
           
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
                <h3>Log In</h3>
                <form onSubmit = {this.onSubmit}>
                    <div className="form-group auth-form-group">
                        <label className="auth-label">Username: </label>
                        <input
                            type="text"
                            className="form-control auth-form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}
                        />
                    </div>

                    <div className="form-group auth-form-group">
                        <label className="auth-label">Password: </label>
                        <input
                            type="password"
                            className="form-control auth-form-control"
                            value={this.state.password}
                            onChange={this.onChangePassword}
                        />
                    </div>

                    <div className="form-group auth-form-group">
                        <input
                            type="submit"
                            value="Log In"
                            className="btn btn-primary"
                            style={{marginTop: 10}}
                        />
                    </div>
                </form>
                <p id="display"></p>
                <p>Don't have an account? <Link to="/signup">Click here to sign up</Link></p>
            </div>
            </div>
         );
    }
}
 
export default LogIn;