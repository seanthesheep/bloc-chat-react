import React, { Component } from 'react';
import * as firebase from 'firebase';

class User extends Component {
  constructor(props){
    super(props);
  }
  
  componentDidMount(){
    this.props.firebase.auth().onAuthStateChanged( user => {
      this.props.setUser(user);
    })
  }
  
  signIn = () => {
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup(provider);
  }
  
  signOut = () => {
    this.props.firebase.auth().signOut();
  }

  render() {
    let user;
    if (!this.props.user){
      user = <h4>Guest</h4>
    } else {
      user = <h4>{this.props.user.displayName}</h4>
    }
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