import React, { Component } from 'react';
import * as firebase from 'firebase';
import logo from './logo.svg';
import './App.css';
import RoomList from './components/Roomlist.js';
import MessageList from './components/MessageList.js';

  var config = {
    apiKey: "AIzaSyD8OKzrBfJcUEE789thujbk06NrCc9Njnc",
    authDomain: "bloc-chat-d1e1e.firebaseapp.com",
    databaseURL: "https://bloc-chat-d1e1e.firebaseio.com",
    projectId: "bloc-chat-d1e1e",
    storageBucket: "bloc-chat-d1e1e.appspot.com",
    messagingSenderId: "885653804968"
  };
    firebase.initializeApp(config);
   
class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      activeRoom: '',
    };
  }
  
  setActiveRoom(room){
    this.setState({
      activeRoom: room
    });
  }
  
  render() {
    const messagesList = this.state.activeRoom;
    return (
      <div className="App">
        <div className="sidebar">
        <h1>Bloc Chat</h1>
        <RoomList firebase={firebase} activeRoom={this.state.activeRoom} setActiveRoom={(room) => this.setActiveRoom(room)}></RoomList>
        </div>
        
          <MessageList firebase={firebase} activeRoom={this.state.activeRoom}/>
          
      </div>
    );
  }
}

export default App;
