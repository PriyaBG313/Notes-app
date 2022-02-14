import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import SignUp from './components/signup';
import LogIn from './components/login';
import HomePage from './components/homepage';
import Create from './components/create';
import Navbar from './components/navbar';
import Edit from './components/edit';
import EditProfile from './components/editprofile';
import React, { Component } from 'react';

class App extends Component {
 //const [loggedUser, setLoggedUser] = useState("");
  state = {
      loggedUser : "",
      loggedUserID : "",
      currentNoteID : ""
  };

  setLoggedUser = (username) => {
    this.setState({ loggedUser : username})
    //console.log(this.state.loggedUser);
  }

  setLoggedUserID = (userID) => {
    this.setState({ loggedUserID : userID})
    //console.log(this.state.loggedUserID);
  }

  setCurrentNoteID = (noteID) => {
    this.setState({ currentNoteID : noteID})
    //console.log(this.state.currentNoteID);
  }

  render() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path={"/home/"+this.state.loggedUserID}>
            <Navbar loggedUser = {this.state.loggedUser}
                      loggedUserID = {this.state.loggedUserID}
            />
            <HomePage loggedUser = {this.state.loggedUser}
                      loggedUserID = {this.state.loggedUserID}
                      currentNoteID = {this.state.currentNoteID}
                      setCurrentNoteID = {this.setCurrentNoteID} />
          </Route>
          <Route exact path="/signup">
            <SignUp setLoggedUser = {this.setLoggedUser}
                    setLoggedUserID = {this.setLoggedUserID}
            />
          </Route>
          <Route exact path="/">
            <LogIn loggedUser = {this.state.loggedUser}
                   setLoggedUser = {this.setLoggedUser}
                   loggedUserID = {this.state.loggedUserID}
                   setLoggedUserID = {this.setLoggedUserID}
            />
          </Route>
          <Route exact path="/create/:id">
              <Navbar loggedUser = {this.state.loggedUser}
                      loggedUserID = {this.state.loggedUserID}
              />
              <Create loggedUserID = {this.state.loggedUserID}/>
          </Route>

          <Route exact path="/editprofile/:id">
              <Navbar loggedUser = {this.state.loggedUser}
                      loggedUserID = {this.state.loggedUserID}
              />
              <EditProfile loggedUser = {this.state.loggedUser}
                      loggedUserID = {this.state.loggedUserID}
              />
          </Route>

          <Route exact path="/edit/:id">
              <Navbar loggedUser = {this.state.loggedUser}
                      loggedUserID = {this.state.loggedUserID}
              />
              <Edit loggedUserID = {this.state.loggedUserID}
                    currentNoteID = {this.state.currentNoteID}
              />
          </Route>
        </Switch>
      </Router>
    </div>
  );
  }
}

export default App;
