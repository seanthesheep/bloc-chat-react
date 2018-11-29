import React, { Component } from 'react';
import * as firebase from 'firebase';

class RoomList extends Component {
  constructor(props){
    super(props);
    this.state = {
      rooms: [],
      newRoomName: ''
    }
    this.roomsRef = this.props.firebase.database().ref('rooms');
  }
  componentDidMount() {
   this.roomsRef.on('child_added', snapshot => {
     const room = snapshot.val();
     room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat(room)});
    });
  }
  
  handleChange = (e) => {
    this.setState({ newRoomName: e.target.value});
  }
  
  createRoom = (e) => {
    e.preventDefault();
    this.roomsRef.push({
      name: this.state.newRoomName
    });
    this.setState({
      newRoomName: ''
    });
  }
  
  render(){
 
    return(
      <div>
      { this.state.rooms.map( (data, index) =>
        <li>{ data.name }</li>
      )}
        <form onSubmit={this.createRoom}>
          <input type="text" name="newRoomName" value={this.state.newRoomName} onChange={this.handleChange}/>
          <button>Submit</button>
        </form>
      </div>
    );
  }
}

export default RoomList;