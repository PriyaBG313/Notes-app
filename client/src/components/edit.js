import React, { Component } from 'react';
import axios from 'axios';

class Edit extends Component {
    constructor(props)
    {
        super(props);
        this.onChangeNoteTitle = this.onChangeNoteTitle.bind(this);
        this.onChangeNoteBody = this.onChangeNoteBody.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            id : this.props.currentNoteID,
            noteTitle : "",
            noteBody : ""
        }
    }

    componentDidMount(){
        const ID = {
            _id : this.state.id
        }
        axios 
            .post("http://localhost:3000/notes/view/"+ID._id, ID)
            .then ((res) => {
                //console.log(res.data);
                this.setState({ noteTitle : res.data.title, 
                                noteBody : res.data.body
                              });
            })
    }

    onChangeNoteTitle (e) {
        this.setState({ noteTitle : e.target.value })
    }

    onChangeNoteBody (e) {
        this.setState({ noteBody : e.target.value })
    }

    onSubmit(e) {
        e.preventDefault();
        const newEditedNote = {
            id : this.state.id,
            noteTitle : this.state.noteTitle,
            noteBody : this.state.noteBody
        }

        axios
            .post("http://localhost:3000/notes/update/" + this.state.id, newEditedNote)
            .then((res) => console.log(res.data));

    }
    
    render() { 
        return ( 
            <div style={{marginTop: 20}}>
                <h3>Update note</h3>
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
 
export default Edit;