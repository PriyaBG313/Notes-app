import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import '../viewStyle.css'

const Note = (props) => {
    return (
    <tr>
        <td>{props.note.title}</td>
        <td>
        <button className="btn btn-primary btn-sm" onClick={() => {props.editNote(props.note._id);}}>
            Edit
        </button>
        <button style={{marginLeft : 20}} className="btn btn-primary btn-sm" onClick={() => {props.deleteNote(props.note._id);}}>
            Delete
        </button>
        </td>
    </tr>
    );
}

class HomePage extends Component {
    constructor(props) {
        super(props);
        //console.log(this.props);
        this.deleteNote = this.deleteNote.bind(this);
        this.editNote = this.editNote.bind(this);
        this.state = {
            userID : props.loggedUserID,
            username : props.loggedUser,
            notes : [],
            redirect : null
        }
    }

    componentDidMount() {
        const user = {
            userID : this.state.userID,
            username : this.state.username
        }
        axios
            .post("http://localhost:3000/notes/", user)
            .then((response) => {
                this.setState({ notes : response.data});
            })
            .catch(function(error) {
                console.log(error);
            })
    }

    editNote(id) {
        //console.log(id);
        this.props.setCurrentNoteID(id);
        //console.log(this.props);
        this.setState({ redirect : "/edit/" + id})
    }

    deleteNote(id) {
        console.log(id);
        const ID = {
            _id : id
        }
        axios
            .post("http://localhost:3000/notes/delete/"+id, ID)
            .then((response) => {
                console.log(response.data);
            });
        
        this.setState({
            notes : this.state.notes.filter((el) => el._id !== id)
        });

        //this.props.history.push("/home");
    }

    noteList() {
        return this.state.notes.map((currentnote) => {
            return (
                <Note 
                    note = {currentnote}
                    editNote = {this.editNote}
                    deleteNote = {this.deleteNote}
                    key = {currentnote._id}
                />
            );
        })
    }

    render() { 
        if (this.state.redirect)
        {
            return (<Redirect to={this.state.redirect} />);
        }
        return ( 
            <div className="view-body">

                <table className="table table-light" style={{marginTop : 20}}>
                    <thead className="table-dark">
                        <tr>
                            <th>Title</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {this.noteList()}
                    </tbody>
                </table>
            </div>
        );
    }
}
 
export default HomePage;

/*
<Link className="btn btn-primary btn-sm" to={{
                    pathname : "/edit/"+ props.note._id,
                    params : {
                        id : props.note._id
                    }}} >Edit</Link>
                    */