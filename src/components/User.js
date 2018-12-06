import React, { Component } from 'react';
import * as firebase from 'firebase';

class User extends Component {
  constructor(props){
    super(props);
  }
  
  componentDidMount(){
    this.props.setUser("Guest")
    this.props.firebase.auth().onAuthStateChanged( user => {
      this.props.setUser(user.displayName);
    })
  }
  
  signIn = () => {
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup(provider);
  }
  
  signOut = () => {
    this.props.firebase.auth().signOut();
    this.props.setUser("Guest");
  }

  render() {
    let user = this.props.user;
    return (
      <div>
        <button className="sign-in-button" onClick={this.signIn}>Sign In</button>
        <button className="sign-out-button" onClick={this.signOut}>Sign Out</button>
        <h4>{user}</h4>
      </div>
    )
  }
}

export default User;