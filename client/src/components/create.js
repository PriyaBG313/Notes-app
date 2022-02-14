import axios from 'axios';
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../viewStyle.css'

class Create extends Component {
    constructor(props) {
        super(props);
        this.onChangeNoteTitle = this.onChangeNoteTitle.bind(this);
        this.onChangeNoteBody = this.onChangeNoteBody.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            userID : this.props.loggedUserID,
            noteTitle : "",
            noteBody : ""
        };
    }

    onChangeNoteTitle(e) {
        this.setState({ noteTitle : e.target.value });
    }

    onChangeNoteBody(e) {
        this.setState({ noteBody : e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        const newNote = {
            userID : this.state.userID,
            noteTitle : this.state.noteTitle,
            noteBody : this.state.noteBody
        }

        axios
            .post("http://localhost:3000/note/add", newNote)
            .then((res) => console.log(res.data));
    }
    render() { 
        return ( 
            <div style={{marginTop: 20}}>
                <h3>Create new note</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group view-form-group">
                        <label>Title: </label>
                        <input 
                            type="text"
                            className="form-control view-form-control"
                            value={this.state.noteTitle}
                            onChange={this.onChangeNoteTitle}
                        />
                    </div>

                    <div className="form-group view-form-group">
                        <label>Body: </label>
                        <textarea 
                            className="form-control view-form-control" 
                            rows="10"
                            value={this.state.noteBody}
                            onChange={this.onChangeNoteBody}>
                        </textarea>
                    </div>

                    <div className="form-group view-form-group">
                        <input
                            type="submit"
                            value="Save"
                            className="btn btn-primary btn-save"
                        />
                    </div>
                </form>
            </div>
        );
    }
}
 
export default Create;