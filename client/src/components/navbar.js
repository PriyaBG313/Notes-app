import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../navbarStyle.css';

class Navbar extends Component {
    constructor(props) {
        super (props);

        this.state = {
            userID : props.loggedUserID,
            username : props.loggedUser
        }
    }
    render() { 
        return ( 
            <div className="navbar">
                <h3 className="welcome-text">Welcome {this.state.username}</h3>
                <Link className="link" to={"/home/" + this.state.userID}>Home</Link>
                <Link className="link" to={"/create/" + this.props.loggedUserID}>Create</Link>
                <Link className="link" to={"/editprofile/"+this.props.loggedUserID}>Edit Profile</Link>
                <Link className="link" to={"/"}>Log Out</Link>      
            </div>
         );
    }
}
 
export default Navbar;